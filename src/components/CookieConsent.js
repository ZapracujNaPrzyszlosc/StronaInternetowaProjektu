import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/cookie-consent.css';
import { isStorageAvailable, saveToStorage, getFromStorage, setCookie, getCookie } from '../utils/storageUtils';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [consentOptions, setConsentOptions] = useState({
    necessary: true, // Zawsze wymagane i włączone
    analytics: true
  });
  
  // Określ czy używać localStorage czy cookies
  const useLocalStorage = isStorageAvailable();
  
  // Funkcja do zapisu preferencji
  const savePreference = (key, value) => {
    if (useLocalStorage) {
      return saveToStorage(key, value);
    } else {
      return setCookie(key, value);
    }
  };
  
  // Funkcja do pobierania preferencji
  const getPreference = React.useCallback((key, defaultValue = null) => {
    if (useLocalStorage) {
      return getFromStorage(key, defaultValue);
    } else {
      return getCookie(key, defaultValue);
    }
  }, [useLocalStorage]);
  
  useEffect(() => {
    const fetchPreferences = () => {
      // Sprawdź, czy użytkownik już podjął decyzję
      const cookieConsent = getPreference('cookieConsent');
      console.log('Stored consent:', cookieConsent);
      
      // Wyświetl baner tylko jeśli nie ma zapisanej decyzji
      if (!cookieConsent) {
        const timer = setTimeout(() => {
          setShowConsent(true);
        }, 1500);
        return () => clearTimeout(timer);
      } else {
        try {
          // Pobierz zapisane opcje
          const savedOptionsStr = getPreference('cookieOptions', '{}');
          const savedOptions = JSON.parse(savedOptionsStr);
          console.log('Saved options:', savedOptions);
          
          // Aktualizuj stan komponentu
          if (savedOptions && Object.keys(savedOptions).length > 0) {
            setConsentOptions({
              necessary: true, // Zawsze włączone
              analytics: savedOptions.analytics === true
            });
          }
          
          // Aktywuj narzędzia analityczne jeśli zgoda została udzielona
          if (cookieConsent === 'accepted' || 
              (cookieConsent === 'customized' && savedOptions.analytics === true)) {
            enableAnalytics({ analytics: true });
          } else {
            disableAnalytics();
          }
        } catch (error) {
          console.error('Error processing saved preferences:', error);
        }
      }
    };

    fetchPreferences();
  }, [getPreference]);
  
  const acceptAllCookies = () => {
    const options = {
      necessary: true,
      analytics: true
    };
    
    savePreference('cookieConsent', 'accepted');
    savePreference('cookieOptions', JSON.stringify(options));
    
    setConsentOptions(options);
    setShowConsent(false);
    enableAnalytics(options);
  };
  
  const acceptCustomized = () => {
    savePreference('cookieConsent', 'customized');
    savePreference('cookieOptions', JSON.stringify(consentOptions));
    
    setShowConsent(false);
    setShowCustomize(false);
    
    if (consentOptions.analytics) {
      enableAnalytics(consentOptions);
    } else {
      disableAnalytics();
    }
  };
  
  const declineAllCookies = () => {
    const options = {
      necessary: true,
      analytics: false
    };
    
    savePreference('cookieConsent', 'declined');
    savePreference('cookieOptions', JSON.stringify(options));
    
    setConsentOptions(options);
    setShowConsent(false);
    disableAnalytics();
  };
  
  const disableNonEssential = () => {
    setConsentOptions({
      necessary: true,
      analytics: false
    });
  };
  
  const handleOptionChange = (option) => {
    setConsentOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };
  
  const enableAnalytics = (options) => {
    // Włącz Google Analytics
    if (window.gtag && options.analytics) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
    
    // Poinformuj Google Tag Manager
    if (window.dataLayer) {
      window.dataLayer.push({
        'event': 'cookie_consent_update',
        'cookie_consent': {
          'analytics': options.analytics
        }
      });
    }
    
    // Włącz Hotjar
    if (window.hj && options.analytics) {
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
                <button 
                  className="cookie-btn secondary" 
                  onClick={declineAllCookies}
                >
                  Odrzuć
                </button>
                <button 
                  className="cookie-btn secondary" 
                  onClick={() => setShowCustomize(true)}
                >
                  Dostosuj wybór
                </button>
                <button 
                  className="cookie-btn primary" 
                  onClick={acceptAllCookies}
                >
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
                <button 
                  className="cookie-btn secondary" 
                  onClick={disableNonEssential}
                >
                  Wyłącz analityczne
                </button>
                <button 
                  className="cookie-btn primary" 
                  onClick={acceptCustomized}
                >
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