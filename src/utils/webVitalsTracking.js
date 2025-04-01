import { getCLS, getFID, getLCP, getFCP, getTTFB } from 'web-vitals';

const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    getCLS(onPerfEntry); // Cumulative Layout Shift
    getFID(onPerfEntry); // First Input Delay
    getLCP(onPerfEntry); // Largest Contentful Paint
    getFCP(onPerfEntry); // First Contentful Paint
    getTTFB(onPerfEntry); // Time to First Byte
  }
};

// Funkcja do wysyłania metryk do Google Analytics
export const sendToGoogleAnalytics = ({ name, delta, id }) => {
  if (window.gtag) {
    window.gtag('event', name, {
      event_category: 'Web Vitals',
      event_label: id,
      value: Math.round(name === 'CLS' ? delta * 1000 : delta),
      non_interaction: true,
    });
  }
  
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'web_vitals',
      web_vitals: {
        metric_name: name,
        metric_value: Math.round(name === 'CLS' ? delta * 1000 : delta),
        metric_id: id
      }
    });
  }
};

export default reportWebVitals;