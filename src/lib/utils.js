/**
 * Utility functions for the Zapracuj na przyszłość project
 */

/**
 * Formats a date string to localized format
 * @param {string} dateStr - Date string in format YYYY-MM-DD or DD.MM.YYYY
 * @param {string} locale - Locale for date formatting (e.g. 'pl', 'en')
 * @returns {string} - Formatted date
 */
export function formatDate(dateStr, locale = 'pl') {
    if (!dateStr) return '';
    
    // Convert DD.MM.YYYY to YYYY-MM-DD if needed
    let formattedDateStr = dateStr;
    if (dateStr.includes('.')) {
      const parts = dateStr.split('.');
      formattedDateStr = `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    
    const date = new Date(formattedDateStr);
    
    // Handle invalid date
    if (isNaN(date.getTime())) return dateStr;
    
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    
    return date.toLocaleDateString(locale, options);
  }
  
  /**
   * Debounce function to limit the rate at which a function can fire
   * @param {Function} func - Function to debounce
   * @param {number} wait - Milliseconds to wait
   * @returns {Function} - Debounced function
   */
  export function debounce(func, wait = 300) {
    let timeout;
    
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  /**
   * Generates a random ID
   * @param {number} length - Length of the ID
   * @returns {string} - Random ID
   */
  export function generateId(length = 6) {
    return Math.random().toString(36).substring(2, 2 + length);
  }
  
  /**
   * Handles form submission errors
   * @param {Error} error - Error object
   * @returns {string} - Error message
   */
  export function handleFormError(error) {
    console.error('Form error:', error);
    
    if (error?.message) {
      return error.message;
    }
    
    return 'Wystąpił błąd podczas przetwarzania formularza. Spróbuj ponownie.';
  }
  
  /**
   * Validate an email address
   * @param {string} email - Email address to validate
   * @returns {boolean} - True if valid, false otherwise
   */
  export function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  /**
   * Truncate text to a specific length and add ellipsis
   * @param {string} text - Text to truncate
   * @param {number} length - Maximum length
   * @returns {string} - Truncated text with ellipsis if needed
   */
  export function truncateText(text, length = 100) {
    if (!text || text.length <= length) return text;
    return text.substring(0, length).trim() + '...';
  }
  
  /**
   * Helper for handling async operations with error handling
   * @param {Promise} promise - Promise to handle
   * @returns {Array} - [data, error] tuple
   */
  export async function handleAsync(promise) {
    try {
      const data = await promise;
      return [data, null];
    } catch (error) {
      console.error('Async operation error:', error);
      return [null, error];
    }
  }
  
  /**
   * Scroll to an element with smooth behavior
   * @param {string} elementId - ID of the element to scroll to
   */
  export function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }