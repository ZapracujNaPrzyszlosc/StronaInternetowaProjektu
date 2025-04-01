import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/cookie-consent.css';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  
  useEffect(() => {
    // Sprawdź, czy użytkownik już zaakceptował pliki cookie
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      // Pokaż baner po krótkim opóźnieniu
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      // Jeśli użytkownik zaakceptował, włącz narzędzia analityczne
      if (cookieConsent === 'accepted') {
        enableAnalytics();
      }
    }
  }, []);
  
  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowConsent(false);
    enableAnalytics();
  };
  
  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowConsent(false);
    disableAnalytics();
  };
  
  const enableAnalytics = () => {
    // Włącz Google Analytics
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
    
    // Włącz Google Tag Manager
    if (window.dataLayer) {
      window.dataLayer.push({
        'event': 'cookie_consent_given'
      });
    }
    
    // Włącz Hotjar
    if (window.hj) {
      window.hj('consent', true);
    }
  };
  
  const disableAnalytics = () => {
    // Wyłącz Google Analytics
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'denied'
      });
    }
    
    // Poinformuj Google Tag Manager
    if (window.dataLayer) {
      window.dataLayer.push({
        'event': 'cookie_consent_declined'
      });
    }
    
    // Wyłącz Hotjar
    if (window.hj) {
      window.hj('consent', false);
    }
  };
  
  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div 
          className="cookie-banner"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p>Ta strona używa cookies dla lepszego doświadczenia użytkownika.</p>
          <div className="cookie-actions">
            <button className="cookie-btn decline" onClick={declineCookies}>
              Odrzuć
            </button>
            <button className="cookie-btn accept" onClick={acceptCookies}>
              Akceptuję
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;