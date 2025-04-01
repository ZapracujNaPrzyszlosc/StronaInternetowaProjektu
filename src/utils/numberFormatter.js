/**
 * Formatuje liczby używając skrótów literowych (K, M)
 * dla bardziej estetycznego wyświetlania dużych wartości.
 * 
 * @param {number} number - Liczba do sformatowania
 * @param {number} digits - Liczba miejsc po przecinku (domyślnie 1)
 * @returns {string} Sformatowana liczba ze skrótem
 */
export const formatNumber = (number, digits = 1) => {
    // Liczby poniżej 1000 bez zmian
    if (number < 1000) {
      return number.toString();
    }
    
    // Liczby od 1000 do 999999 z "K"
    if (number < 1000000) {
      return (number / 1000).toFixed(digits).replace(/\.0$/, '') + 'K';
    }
    
    // Liczby od 1000000 z "M"
    return (number / 1000000).toFixed(digits).replace(/\.0$/, '') + 'M';
  };