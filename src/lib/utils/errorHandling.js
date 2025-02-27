/**
 * Funkcja pomocnicza do obsługi błędów i logowania
 */
export function handleError(error, component = 'Nieznany komponent') {
    console.error(`Błąd w komponencie ${component}:`, error);
    
    // Tutaj możesz dodać kod do wysyłania błędów do serwisu monitoringu
    // np. Sentry, LogRocket itp.
    
    return {
      message: 'Wystąpił błąd podczas ładowania treści',
      details: error.message || 'Nieznany błąd',
      component
    };
  }