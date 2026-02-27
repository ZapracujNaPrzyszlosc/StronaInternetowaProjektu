/**
 * @fileoverview CMS backend server for Create the Future admin panel.
 *
 * Provides REST API for managing site content: TikTok videos, theme colors,
 * and key text values. Persists data to a local JSON file.
 *
 * Also serves the admin SPA:
 *   - Production: https://admin.create-the-future.org  (nginx proxy → this server)
 *   - Development: http://localhost:3001/admin
 *
 * Environment variables (see .env.example):
 *   PORT           - Server port (default: 3001)
 *   JWT_SECRET     - Secret key for JWT signing (CHANGE IN PRODUCTION)
 *   ADMIN_PASSWORD - Plain-text admin password (stored only in .env, never committed)
 *
 * No setup script needed — just set ADMIN_PASSWORD in .env and start.
 */

const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || "ctf-change-this-secret-in-prod";
const CONTENT_FILE = path.join(__dirname, "content.json");
const ENV_FILE = path.join(__dirname, ".env");

// ---------------------------------------------------------------------------
// Admin password — hashed once at startup, kept in memory
// ---------------------------------------------------------------------------

/**
 * In-memory bcrypt hash of ADMIN_PASSWORD.
 * Initialised at startup; updated in-place when the password is changed.
 * @type {string|null}
 */
let adminHash = null;

/**
 * Hashes the value of ADMIN_PASSWORD from process.env and stores it in
 * `adminHash`. Called once at startup and again after a password change.
 *
 * @returns {Promise<void>}
 */
async function initAdminHash() {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) {
    console.warn(
      "\n⚠️  ADMIN_PASSWORD is not set in .env — login will not work.\n",
    );
    adminHash = null;
    return;
  }
  adminHash = await bcrypt.hash(pw, 12);
}

// ---------------------------------------------------------------------------
// Admin panel static files
// ---------------------------------------------------------------------------

const ADMIN_DIR = path.join(__dirname, "public/admin");
console.log("ADMIN_DIR:", ADMIN_DIR);
console.log("__dirname:", __dirname);

app.use((req, res, next) => {
  const host = (req.headers["x-forwarded-host"] || req.hostname || "")
    .split(",")[0]
    .trim()
    .toLowerCase();

  if (host.startsWith("admin.") && !req.path.startsWith("/api/")) {
    return express.static(ADMIN_DIR)(req, res, () => {
      res.sendFile(path.join(ADMIN_DIR, "index.html"));
    });
  }
  next();
});

// ---------------------------------------------------------------------------
// CORS
// ---------------------------------------------------------------------------

app.use(
  cors({
    origin: [
      "https://zapracujnaprzyszlosc.pl",
      "https://www.zapracujnaprzyszlosc.pl",
      "https://admin.create-the-future.org",
      "http://localhost:3000",
      "http://localhost:3001",
    ],
    credentials: true,
  }),
);

app.use(express.json({ limit: "1mb" }));

app.use("/admin", express.static(ADMIN_DIR));
app.get("/admin", (_req, res) =>
  res.sendFile(path.join(ADMIN_DIR, "index.html")),
);

// ---------------------------------------------------------------------------
// Content file helpers
// ---------------------------------------------------------------------------

/**
 * Reads and parses the content JSON file.
 *
 * @returns {Promise<Object>} Parsed content object.
 */
async function readContent() {
  const raw = await fs.readFile(CONTENT_FILE, "utf-8");
  return JSON.parse(raw);
}

/**
 * Serializes and writes the content object to disk.
 *
 * @param {Object} content - Content object to persist.
 * @returns {Promise<void>}
 */
async function writeContent(content) {
  await fs.writeFile(CONTENT_FILE, JSON.stringify(content, null, 2), "utf-8");
}

// ---------------------------------------------------------------------------
// .env helpers
// ---------------------------------------------------------------------------

/**
 * Updates or inserts a single key=value pair in the .env file without
 * touching any other variables already present.
 * Normalises CRLF to LF to avoid issues on Windows.
 *
 * @param {string} key   - Environment variable name.
 * @param {string} value - New value (must not contain newlines).
 * @returns {Promise<void>}
 */
async function updateEnvVar(key, value) {
  let raw = "";
  try {
    raw = await fs.readFile(ENV_FILE, "utf-8");
  } catch {
    // .env does not exist yet — we will create it.
  }

  const lines = raw.replace(/\r\n/g, "\n").split("\n");
  const idx = lines.findIndex((l) => l.startsWith(`${key}=`));

  if (idx >= 0) {
    lines[idx] = `${key}=${value}`;
  } else {
    if (lines[lines.length - 1] !== "") lines.push("");
    lines.push(`${key}=${value}`);
  }

  await fs.writeFile(ENV_FILE, lines.join("\n"), "utf-8");
}

// ---------------------------------------------------------------------------
// Auth middleware
// ---------------------------------------------------------------------------

/**
 * Express middleware that validates the Bearer JWT in the Authorization header.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "Missing token" });
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

// ---------------------------------------------------------------------------
// Routes — Auth
// ---------------------------------------------------------------------------

/**
 * POST /api/auth/login
 *
 * Body:    { password: string }
 * Returns: { token: string } on success.
 */
app.post("/api/auth/login", async (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: "Password required" });
  }

  if (!adminHash) {
    return res
      .status(500)
      .json({ error: "Server not configured — set ADMIN_PASSWORD in .env" });
  }

  try {
    const valid = await bcrypt.compare(password, adminHash);
    if (!valid) {
      return res.status(401).json({ error: "Wrong password" });
    }
    const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "8h" });
    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ---------------------------------------------------------------------------
// Routes — Content
// ---------------------------------------------------------------------------

/** GET /api/content — public */
app.get("/api/content", async (req, res) => {
  try {
    res.json(await readContent());
  } catch (err) {
    console.error("Read error:", err);
    res.status(500).json({ error: "Could not read content" });
  }
});

/**
 * PUT /api/content — protected
 * Body: { theme?: Object, tiktoks?: Array, texts?: Object }
 */
app.put("/api/content", requireAuth, async (req, res) => {
  try {
    const content = await readContent();
    const { theme, tiktoks, texts } = req.body;
    if (theme) content.theme = { ...content.theme, ...theme };
    if (tiktoks) content.tiktoks = tiktoks;
    if (texts) content.texts = { ...content.texts, ...texts };
    await writeContent(content);
    res.json(content);
  } catch (err) {
    console.error("Write error:", err);
    res.status(500).json({ error: "Could not save content" });
  }
});

/**
 * POST /api/content/tiktoks — protected
 * Body: { title, titlePl?, description?, descriptionPl?, embedUrl, profileUrl? }
 */
app.post("/api/content/tiktoks", requireAuth, async (req, res) => {
  try {
    const { title, titlePl, description, descriptionPl, embedUrl, profileUrl } =
      req.body;
    if (!title || !embedUrl) {
      return res.status(400).json({ error: "title and embedUrl are required" });
    }
    const content = await readContent();
    const newEntry = {
      id: Date.now(),
      title,
      titlePl: titlePl || "",
      description: description || "",
      descriptionPl: descriptionPl || "",
      embedUrl,
      profileUrl: profileUrl || "https://www.tiktok.com/@create_the_future_",
    };
    content.tiktoks.push(newEntry);
    await writeContent(content);
    res.status(201).json(newEntry);
  } catch (err) {
    console.error("Add TikTok error:", err);
    res.status(500).json({ error: "Could not add TikTok" });
  }
});

/** DELETE /api/content/tiktoks/:id — protected */
app.delete("/api/content/tiktoks/:id", requireAuth, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const content = await readContent();
    const before = content.tiktoks.length;
    content.tiktoks = content.tiktoks.filter((t) => t.id !== id);
    if (content.tiktoks.length === before) {
      return res.status(404).json({ error: "TikTok not found" });
    }
    await writeContent(content);
    res.json({ ok: true });
  } catch (err) {
    console.error("Delete TikTok error:", err);
    res.status(500).json({ error: "Could not delete TikTok" });
  }
});

/**
 * POST /api/auth/change-password — protected
 * Writes new plain-text password to .env and re-hashes in memory.
 * Body: { newPassword: string }
 */
app.post("/api/auth/change-password", requireAuth, async (req, res) => {
  const { newPassword } = req.body;
  if (!newPassword || newPassword.length < 8) {
    return res
      .status(400)
      .json({ error: "Password must be at least 8 characters" });
  }
  try {
    await updateEnvVar("ADMIN_PASSWORD", newPassword);
    process.env.ADMIN_PASSWORD = newPassword;
    adminHash = await bcrypt.hash(newPassword, 12);
    res.json({ ok: true });
  } catch (err) {
    console.error("Change password error:", err);
    res.status(500).json({ error: "Could not change password" });
  }
});

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------

initAdminHash().then(() => {
  app.listen(PORT, () => {
    console.log(`CMS server running on http://localhost:${PORT}`);
    console.log(`Admin panel (dev):  http://localhost:${PORT}/admin`);
    console.log(`Admin panel (prod): https://admin.create-the-future.org`);
  });
});
