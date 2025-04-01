import React, { createContext, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as analytics from '../services/analytics';

// Utworzenie kontekstu
const AnalyticsContext = createContext();

// Hook do używania analityki
export const useAnalytics = () => {
  return useContext(AnalyticsContext);
};

// Provider kontekstu
export const AnalyticsProvider = ({ children }) => {
  const location = useLocation();
  
  // Śledzenie zmiany strony
  useEffect(() => {
    // Przewijanie do góry strony przy zmianie ścieżki
    window.scrollTo(0, 0);
    
    // Śledzenie odsłony strony
    analytics.trackPageView(
      location.pathname + location.search,
      document.title
    );
    
    // Inicjalizacja pozostałych mechanizmów śledzenia
    const cleanup = analytics.initAnalytics();
    
    // Sprzątanie przy opuszczaniu strony
    return () => {
      if (cleanup) cleanup();
    };
  }, [location]);
  
  // Udostępniane wartości i funkcje
  const value = {
    trackTikTokClick: analytics.trackTikTokClick,
    trackFormSubmission: analytics.trackFormSubmission,
    trackError: analytics.trackError
  };
  
  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export default AnalyticsProvider;