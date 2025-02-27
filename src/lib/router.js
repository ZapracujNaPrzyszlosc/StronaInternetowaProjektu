import { writable, derived } from 'svelte/store';

// Funkcja do parsowania URL i pobierania aktualnej ścieżki
function getPathFromLocation() {
  return window.location.hash.slice(1) || '/';
}

// Store przechowujący aktualną ścieżkę
const path = writable(typeof window !== 'undefined' ? getPathFromLocation() : '/');

// Nasłuchiwanie zmian w URL (zdarzenie hashchange)
if (typeof window !== 'undefined') {
  window.addEventListener('hashchange', () => {
    path.set(getPathFromLocation());
  });
}

// Funkcja do nawigacji
export function navigate(to) {
  if (typeof window !== 'undefined') {
    window.location.hash = to;
  }
}

// Router API
export const router = {
  // Aktualny URL jako store
  path,
  
  // Nawigacja do podanej ścieżki
  goto: navigate,
  
  // Sprawdź, czy aktualna ścieżka pasuje do wzorca
  match: (pattern) => {
    return derived(path, ($path) => {
      // Dokładne dopasowanie
      if (pattern === $path) return true;
      
      // Obsługa parametrów ścieżki (:param)
      const patternSegments = pattern.split('/');
      const pathSegments = $path.split('/');
      
      if (patternSegments.length !== pathSegments.length) return false;
      
      for (let i = 0; i < patternSegments.length; i++) {
        const patternSegment = patternSegments[i];
        const pathSegment = pathSegments[i];
        
        // Jeśli segment zaczyna się od :, to to jest parametr
        if (patternSegment.startsWith(':')) continue;
        
        // W przeciwnym razie segmenty muszą się zgadzać
        if (patternSegment !== pathSegment) return false;
      }
      
      return true;
    });
  },
  
  // Pobierz parametry z URL
  params: (pattern) => {
    return derived(path, ($path) => {
      const params = {};
      
      const patternSegments = pattern.split('/');
      const pathSegments = $path.split('/');
      
      if (patternSegments.length !== pathSegments.length) return params;
      
      for (let i = 0; i < patternSegments.length; i++) {
        const patternSegment = patternSegments[i];
        const pathSegment = pathSegments[i];
        
        // Jeśli segment zaczyna się od :, to to jest parametr
        if (patternSegment.startsWith(':')) {
          const paramName = patternSegment.slice(1);
          params[paramName] = pathSegment;
        }
      }
      
      return params;
    });
  }
};

// Komponent Route do użycia w szablonach
export const Route = {
  // Props komponentu
  props: {
    path: { required: true },
    component: { required: true }
  },
  
  // Renderowanie komponentu
  render(props, context) {
    const { path: routePath, component } = props;
    const isActive = router.match(routePath);
    
    return {
      c() {
        return isActive ? component : null;
      }
    };
  }
};