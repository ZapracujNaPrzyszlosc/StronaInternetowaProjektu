import React, { useEffect, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import TikTok from "./pages/TikTok";
import Contact from "./pages/Contact";
import SchemaOrg from "./components/SEO/SchemaOrg";
import CookieConsent from "./components/CookieConsent";
import { AnalyticsProvider } from "./context/AnalyticsContext";
import reportWebVitals from "./utils/webVitalsTracking";
import { sendToGoogleAnalytics } from "./utils/webVitalsTracking";
import "./i18n"; // Import konfiguracji i18n

// Inicjalizacja śledzenia wskaźników Web Vitals
reportWebVitals(sendToGoogleAnalytics);

// Komponent loading fallback
const LoadingFallback = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
    }}
  >
    <div className="loader"></div>
  </div>
);

function App() {
  // Rejestracja globalnego handlera do śledzenia błędów
  useEffect(() => {
    const originalOnError = window.onerror;

    window.onerror = (message, source, lineno, colno, error) => {
      // Śledzenie błędu w Google Analytics
      if (window.gtag) {
        window.gtag("event", "exception", {
          description: message,
          fatal: false,
        });
      }

      // Śledzenie błędu w Google Tag Manager
      if (window.dataLayer) {
        window.dataLayer.push({
          event: "javascript_error",
          error: {
            message: message,
            source: source,
            line: lineno,
            column: colno,
            stack: error ? error.stack : "N/A",
          },
        });
      }

      // Wywołanie oryginalnego handlera, jeśli istnieje
      if (originalOnError) {
        return originalOnError(message, source, lineno, colno, error);
      }

      return false;
    };

    return () => {
      window.onerror = originalOnError;
    };
  }, []);

  return (
    <Suspense fallback={<LoadingFallback />}>
      <HelmetProvider>
        <Router>
          <AnalyticsProvider>
            <div className="app">
              <SchemaOrg />
              <Header />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/o-nas" element={<About />} />
                  <Route path="/tiktok" element={<TikTok />} />
                  <Route path="/kontakt" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
              <CookieConsent />
            </div>
          </AnalyticsProvider>
        </Router>
      </HelmetProvider>
    </Suspense>
  );
}

export default App;
