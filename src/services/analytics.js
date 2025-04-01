/**
 * Centralny serwis do zarządzania wszystkimi narzędziami analitycznymi
 */
import * as hotjar from './hotjar';

// Funkcja sprawdzająca zgodę użytkownika
const hasConsent = () => {
  const cookieConsent = localStorage.getItem('cookieConsent');
  
  // Jeśli brak zgody w ogóle
  if (!cookieConsent || cookieConsent === 'declined') {
    return false;
  }
  
  // Jeśli zaakceptowano wszystkie
  if (cookieConsent === 'accepted') {
    return true;
  }
  
  // Jeśli dostosowano - sprawdź analytics
  if (cookieConsent === 'customized') {
    const options = JSON.parse(localStorage.getItem('cookieOptions')) || {};
    return !!options.analytics;
  }
  
  return false;
};

// Śledzenie odsłony strony
export const trackPageView = (path, title) => {
  if (!hasConsent()) return;
  
  // Google Analytics
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title
    });
  }
  
  // Google Tag Manager
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'page_view',
      page: {
        path: path,
        title: title
      }
    });
  }
  
  // Hotjar - oznaczenie wizyt na konkretnych stronach
  hotjar.trackPageView(path);
};

// Śledzenie kliknięć w linki do TikToka
export const trackTikTokClick = (tiktokTitle, tiktokUrl) => {
  if (!hasConsent()) return;

  if (window.gtag) {
    window.gtag('event', 'tiktok_click', {
      event_category: 'Engagement',
      event_label: tiktokTitle,
      value: 1
    });
  }
  
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'social_interaction',
      social_network: 'TikTok',
      social_action: 'click',
      social_target: tiktokUrl,
      content_title: tiktokTitle
    });
  }
  
  // Dodaj wywołanie do Hotjar
  hotjar.trackTikTokClick(tiktokTitle);
};

// Śledzenie czasu spędzonego na stronie
export const trackTimeOnPage = () => {
  if (!hasConsent()) return;
  
  let startTime = Date.now();
  let intervalId;
  
  // Co 30 sekund wysyłaj aktualizację czasu spędzonego na stronie
  intervalId = setInterval(() => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    
    if (window.gtag) {
      window.gtag('event', 'time_on_page', {
        event_category: 'Engagement',
        event_label: document.title,
        value: timeSpent
      });
    }
    
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'time_on_page',
        engagement: {
          time_on_page: timeSpent
        }
      });
    }
  }, 30000); // co 30 sekund
  
  // Wyczyść interwał przy opuszczaniu strony
  return () => clearInterval(intervalId);
};

// Śledzenie przewijania strony
export const trackScrollDepth = () => {
  if (!hasConsent()) return;
  
  let maxScrollPercent = 0;
  const checkpoints = [25, 50, 75, 90, 100];
  const reached = new Set();
  
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) return;
    
    const scrollPercent = Math.floor((window.scrollY / scrollHeight) * 100);
    
    if (scrollPercent > maxScrollPercent) {
      maxScrollPercent = scrollPercent;
      
      // Sprawdź osiągnięte punkty kontrolne
      for (const checkpoint of checkpoints) {
        if (scrollPercent >= checkpoint && !reached.has(checkpoint)) {
          reached.add(checkpoint);
          
          if (window.gtag) {
            window.gtag('event', 'scroll_depth', {
              event_category: 'Engagement',
              event_label: `${checkpoint}%`,
              non_interaction: true
            });
          }
          
          if (window.dataLayer) {
            window.dataLayer.push({
              event: 'scroll_depth',
              scroll_percentage: checkpoint
            });
          }
        }
      }
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  
  // Usuń event listener przy opuszczaniu strony
  return () => window.removeEventListener('scroll', handleScroll);
};

// Śledzenie błędów
export const trackError = (errorMessage, errorSource) => {
  // Błędy śledzić powinniśmy zawsze, niezależnie od zgody na pliki cookie
  
  if (window.gtag) {
    window.gtag('event', 'exception', {
      description: errorMessage,
      fatal: false
    });
  }
  
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'javascript_error',
      error: {
        message: errorMessage,
        source: errorSource
      }
    });
  }
};

// Inicjalizacja wszystkich mechanizmów śledzenia
export const initAnalytics = () => {
  // Inicjalizacja Hotjar
  if (hasConsent()) {
    hotjar.initHotjar();
  }
  
  // Śledzenie czasu na stronie tylko, jeśli zgoda na analytics
  let clearTimeTracking;
  if (hasConsent()) {
    clearTimeTracking = trackTimeOnPage();
  }
  
  // Śledzenie scrollowania tylko, jeśli zgoda na analytics
  let clearScrollTracking;
  if (hasConsent()) {
    clearScrollTracking = trackScrollDepth();
  }
  
  // Usuń wszystkie śledzenia przy opuszczaniu strony
  return () => {
    if (clearTimeTracking) clearTimeTracking();
    if (clearScrollTracking) clearScrollTracking();
  };
};