/**
 * @fileoverview First-run setup script.
 *
 * Prompts for a new admin password, hashes it with bcrypt, and writes
 * the hash into content.json. Run once after cloning the repo:
 *
 *   node setup.js
 */

const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const CONTENT_FILE = path.join(__dirname, 'content.json');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Prompts the user for a password without echoing input.
 *
 * @param {string} prompt - Question to display.
 * @returns {Promise<string>} The entered password.
 */
function askPassword(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  console.log('\nCreate the Future — Admin Setup\n');

  const password = await askPassword('Enter admin password (min 8 chars): ');

  if (!password || password.length < 8) {
    console.error('❌  Password must be at least 8 characters.');
    process.exit(1);
  }

  const confirm = await askPassword('Confirm password: ');

  if (password !== confirm) {
    console.error('❌  Passwords do not match.');
    process.exit(1);
  }

  console.log('\nHashing password…');
  const hash = await bcrypt.hash(password, 12);

  const content = JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf-8'));
  content.adminPasswordHash = hash;
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(content, null, 2));

  console.log('✅  Password set successfully!');
  console.log('\nStart the server with:  bun start');
  console.log('Admin panel:            http://localhost:3001/admin\n');

  rl.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});