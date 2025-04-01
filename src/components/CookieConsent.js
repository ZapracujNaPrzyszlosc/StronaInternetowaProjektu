import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/cookie-consent.css';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [consentOptions, setConsentOptions] = useState({
    necessary: true, // Zawsze wymagane i włączone
    analytics: true
  });
  
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
      // Ustaw odpowiednie opcje zgody na podstawie zapisanych preferencji
      const savedOptions = JSON.parse(localStorage.getItem('cookieOptions')) || {};
      if (savedOptions) {
        setConsentOptions({
          ...consentOptions,
          ...savedOptions
        });
      }
      
      // Jeśli użytkownik zaakceptował, włącz odpowiednie narzędzia analityczne
      if (cookieConsent === 'accepted' || cookieConsent === 'customized') {
        enableAnalytics(savedOptions || consentOptions);
      }
    }
  }, [consentOptions]);
  
  const acceptAllCookies = () => {
    const options = {
      necessary: true,
      analytics: true
    };
    
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookieOptions', JSON.stringify(options));
    setConsentOptions(options);
    setShowConsent(false);
    enableAnalytics(options);
  };
  
  const acceptCustomized = () => {
    localStorage.setItem('cookieConsent', 'customized');
    localStorage.setItem('cookieOptions', JSON.stringify(consentOptions));
    setShowConsent(false);
    setShowCustomize(false);
    enableAnalytics(consentOptions);
  };
  
  const declineAllCookies = () => {
    const options = {
      necessary: true, // Zawsze wymagane
      analytics: false
    };
    
    localStorage.setItem('cookieConsent', 'declined');
    localStorage.setItem('cookieOptions', JSON.stringify(options));
    setConsentOptions(options);
    setShowConsent(false);
    disableAnalytics();
  };
  
  const disableNonEssential = () => {
    const options = {
      necessary: true, // Zawsze wymagane
      analytics: false
    };
    
    setConsentOptions(options);
  };
  
  const handleOptionChange = (option) => {
    setConsentOptions({
      ...consentOptions,
      [option]: !consentOptions[option]
    });
  };
  
  const enableAnalytics = (options) => {
    // Włącz narzędzia zależnie od opcji zgody
    
    // Włącz Google Analytics, jeśli zgoda na analytics
    if (window.gtag && options.analytics) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    } else if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'denied'
      });
    }
    
    // Włącz Google Tag Manager
    if (window.dataLayer) {
      window.dataLayer.push({
        'event': 'cookie_consent_update',
        'cookie_consent': {
          'analytics': options.analytics
        }
      });
    }
    
    // Włącz Hotjar, jeśli zgoda na analytics
    if (window.hj && options.analytics) {
      window.hj('consent', true);
    } else if (window.hj) {
      window.hj('consent', false);
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
          className={`cookie-banner ${showCustomize ? 'expanded' : ''}`}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {!showCustomize ? (
            // Podstawowy banner
            <>
              <p>Ta strona używa cookies dla lepszego doświadczenia użytkownika.</p>
              <div className="cookie-actions">
                <button className="cookie-btn secondary" onClick={declineAllCookies}>
                  Odrzuć
                </button>
                <button className="cookie-btn secondary" onClick={() => setShowCustomize(true)}>
                  Dostosuj wybór
                </button>
                <button className="cookie-btn primary" onClick={acceptAllCookies}>
                  Akceptuję wszystkie
                </button>
              </div>
            </>
          ) : (
            // Rozszerzony panel dostosowania wyboru
            <>
              <div className="cookie-customize-header">
                <h3>Ustawienia prywatności</h3>
                <button className="cookie-close" onClick={() => setShowCustomize(false)}>
                  &times;
                </button>
              </div>
              
              <div className="cookie-options">
                <div className="cookie-option">
                  <div className="cookie-option-header">
                    <label className="cookie-option-label">
                      <input 
                        type="checkbox" 
                        checked={consentOptions.necessary}
                        disabled={true} // Zawsze wymagane
                        readOnly
                      />
                      <span className="cookie-option-title">Niezbędne</span>
                      <span className="cookie-required-badge">Wymagane</span>
                    </label>
                  </div>
                  <p className="cookie-option-description">
                    Niezbędne pliki cookie są konieczne do prawidłowego działania strony. Nie możesz ich wyłączyć.
                  </p>
                </div>
                
                <div className="cookie-option">
                  <div className="cookie-option-header">
                    <label className="cookie-option-label">
                      <input 
                        type="checkbox" 
                        checked={consentOptions.analytics}
                        onChange={() => handleOptionChange('analytics')}
                      />
                      <span className="cookie-option-title">Analityczne</span>
                    </label>
                  </div>
                  <p className="cookie-option-description">
                    Pozwalają nam mierzyć ruch na stronie i analizować, w jaki sposób odwiedzający korzystają z naszej witryny,
                    co pomaga nam ją ulepszać (Google Analytics, Hotjar).
                  </p>
                </div>
              </div>
              
              <div className="cookie-customize-footer">
                <button className="cookie-btn secondary" onClick={disableNonEssential}>
                  Wyłącz analityczne
                </button>
                <button className="cookie-btn primary" onClick={acceptCustomized}>
                  Zapisz wybór
                </button>
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;