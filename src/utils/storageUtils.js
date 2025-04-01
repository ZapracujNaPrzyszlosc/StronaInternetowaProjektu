/**
 * Funkcje pomocnicze do bezpiecznej pracy z localStorage
 */

// Sprawdza czy localStorage jest dostępny
export const isStorageAvailable = () => {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  };
  
  // Bezpiecznie zapisuje do localStorage
  export const saveToStorage = (key, value) => {
    if (!isStorageAvailable()) {
      console.warn('localStorage is not available');
      return false;
    }
    
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  };
  
  // Bezpiecznie pobiera z localStorage
  export const getFromStorage = (key, defaultValue = null) => {
    if (!isStorageAvailable()) {
      console.warn('localStorage is not available');
      return defaultValue;
    }
    
    try {
      const item = localStorage.getItem(key);
      return item !== null ? item : defaultValue;
    } catch (error) {
      console.error('Error getting from localStorage:', error);
      return defaultValue;
    }
  };
  
  // Bezpiecznie usuwa z localStorage
  export const removeFromStorage = (key) => {
    if (!isStorageAvailable()) {
      console.warn('localStorage is not available');
      return false;
    }
    
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  };
  
  // Alternatywne rozwiązanie z użyciem cookies zamiast localStorage
  export const setCookie = (name, value, days = 365) => {
    let expires = '';
    
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toUTCString();
    }
    
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
    return true;
  };
  
  export const getCookie = (name, defaultValue = null) => {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    
    return defaultValue;
  };
  
  export const eraseCookie = (name) => {
    document.cookie = name + '=; Max-Age=-99999999; path=/';
    return true;
  };