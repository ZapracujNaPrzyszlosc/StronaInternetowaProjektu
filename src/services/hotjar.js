/**
 * Serwis do zarządzania Hotjar
 */

// Inicjalizacja dodatkowych ustawień Hotjar
export const initHotjar = () => {
    if (window.hj) {
      // Dodanie informacji o wersji strony
      window.hj('tagRecording', ['v1.0.0']);
      
      // Ustaw event Hotjar dla pierwszej wizyty
      const isFirstVisit = !localStorage.getItem('returningVisitor');
      if (isFirstVisit) {
        window.hj('event', 'first_visit');
        localStorage.setItem('returningVisitor', 'true');
      }
    }
  };
  
  // Oznaczenie zmiany stanu w aplikacji (np. po nawigacji)
  export const trackPageView = (pagePath) => {
    if (window.hj) {
      window.hj('stateChange', pagePath);
    }
  };
  
  // Śledzenie zdarzenia oglądania TikToka
  export const trackTikTokView = (tiktokTitle) => {
    if (window.hj) {
      window.hj('event', 'tiktok_view', {
        tiktok_title: tiktokTitle
      });
    }
  };
  
  // Śledzenie zdarzenia kliknięcia w TikToka
  export const trackTikTokClick = (tiktokTitle) => {
    if (window.hj) {
      window.hj('event', 'tiktok_click', {
        tiktok_title: tiktokTitle
      });
    }
  };
  
  // Włączenie/wyłączenie śledzenia Hotjar w zależności od zgody użytkownika
  export const updateConsent = (hasConsent) => {
    if (window.hj) {
      window.hj('consent', hasConsent);
    }
  };
  
  // Dodanie niestandardowego atrybutu użytkownika (np. dla segmentacji)
  export const identifyUser = (userAttribute, value) => {
    if (window.hj) {
      window.hj('identify', userAttribute, value);
    }
  };