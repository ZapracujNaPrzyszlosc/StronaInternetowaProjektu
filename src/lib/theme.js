import { writable } from 'svelte/store';

// Definicje motywów
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark'
};

// Funkcja wykrywająca preferowany motyw z systemu
function getPreferredTheme() {
  if (typeof window === 'undefined') return THEMES.LIGHT;
  
  // Sprawdzenie zapisanego motywu w localstorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) return savedTheme;
  
  // Sprawdzenie preferencji systemowych
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 
    THEMES.DARK : 
    THEMES.LIGHT;
}

// Tworzenie store dla motywu
export const theme = writable(THEMES.LIGHT);

// Inicjalizacja motywu
export function initTheme() {
  if (typeof window === 'undefined') return;
  
  const preferredTheme = getPreferredTheme();
  setTheme(preferredTheme);
  
  // Nasłuchiwanie zmian preferencji systemowych
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Aktualizuj motyw tylko jeśli użytkownik nie wybrał własnego
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? THEMES.DARK : THEMES.LIGHT);
    }
  });
}

// Ustawienie motywu
export function setTheme(newTheme) {
  if (typeof window === 'undefined') return;
  
  // Zapisanie do store
  theme.set(newTheme);
  
  // Zapisanie do local storage
  localStorage.setItem('theme', newTheme);
  
  // Aktualizacja atrybutu data-theme na dokumencie
  document.documentElement.setAttribute('data-theme', newTheme);
  
  // Aktualizacja meta tag dla koloru motywu na urządzeniach mobilnych
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute(
      'content',
      newTheme === THEMES.DARK ? '#121212' : '#FFFFFF'
    );
  }
}

// Przełączanie motywu
export function toggleTheme() {
  theme.update(currentTheme => {
    const newTheme = currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
    setTheme(newTheme);
    return newTheme;
  });
}