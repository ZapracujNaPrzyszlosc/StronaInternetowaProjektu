/**
 * Proste funkcje do tworzenia animacji z wykorzystaniem Intersection Observer API
 * dla efektu pojawiania się elementów podczas scrollowania
 */

// Domyślne opcje dla Intersection Observer
const defaultOptions = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.1 // 10% elementu musi być widoczne
  };
  
  /**
   * Tworzy obserwator, który dodaje klasę animacji do elementów, gdy są widoczne
   * @param {string} animationClass - Klasa CSS z animacją do dodania
   * @param {Object} options - Opcje dla IntersectionObserver
   */
  export function createScrollAnimation(animationClass = 'animate-fade-in', options = {}) {
    if (typeof window === 'undefined') return () => {};
    
    const observerOptions = { ...defaultOptions, ...options };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Dodaj klasę animacji
          entry.target.classList.add(animationClass);
          // Odłącz obserwator po animacji
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Zwraca funkcję do rozpoczęcia obserwacji elementu
    return (element) => {
      if (element) {
        observer.observe(element);
        
        // Zwraca funkcję do czyszczenia
        return () => {
          observer.unobserve(element);
        };
      }
    };
  }
  
  /**
   * Tworzy animację pojawiania się elementów z opóźnieniem (stagger)
   * @param {Array<HTMLElement>} elements - Lista elementów do animacji
   * @param {string} animationClass - Klasa CSS z animacją
   * @param {number} delay - Opóźnienie między elementami (ms)
   */
  export function staggerAnimation(elements, animationClass = 'animate-fade-in', delay = 100) {
    if (!elements || !elements.length) return;
    
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add(animationClass);
      }, index * delay);
    });
  }
  
  /**
   * Animacja dla rozmytych gradientów w tle
   * @param {HTMLElement} element - Element do animacji
   */
  export function animateGradientBlur(element) {
    if (!element) return;
    
    let x = 0;
    let y = 0;
    let scale = 1;
    
    // Losowe początkowe położenie
    const randomizePosition = () => {
      const rect = element.parentElement.getBoundingClientRect();
      const maxX = rect.width * 0.8;
      const maxY = rect.height * 0.8;
      
      x = Math.random() * maxX;
      y = Math.random() * maxY;
      scale = 0.8 + Math.random() * 0.4;
      
      updatePosition();
    };
    
    // Aktualizacja pozycji elementu
    const updatePosition = () => {
      element.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
    };
    
    // Rozpocznij animację
    randomizePosition();
    
    // Zmiana pozycji co jakiś czas
    setInterval(() => {
      const rect = element.parentElement.getBoundingClientRect();
      const maxX = rect.width * 0.8;
      const maxY = rect.height * 0.8;
      
      // Powolne przejście do nowego położenia
      const targetX = Math.random() * maxX;
      const targetY = Math.random() * maxY;
      const targetScale = 0.8 + Math.random() * 0.4;
      
      // Animacja z requestAnimationFrame
      const startTime = Date.now();
      const duration = 10000; // 10 sekund
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Funkcja easing dla płynnego ruchu
        const easeInOut = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        const easeValue = easeInOut(progress);
        
        // Interpolacja liniowa
        x = (1 - easeValue) * x + easeValue * targetX;
        y = (1 - easeValue) * y + easeValue * targetY;
        scale = (1 - easeValue) * scale + easeValue * targetScale;
        
        updatePosition();
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }, 10000); // Zmiana co 10 sekund
    
    // Zwróć funkcję czyszczącą
    return () => {
      // Zatrzymaj wszystkie interwały i animacje
    };
  }
  
  /**
   * Utwórz efekt falowania tekstu
   * @param {string} text - Tekst do animacji
   * @param {function} onWaveComplete - Callback po zakończeniu animacji
   */
  export function createTextWave(text, onWaveComplete = () => {}) {
    const characters = text.split('');
    const delays = characters.map((_, i) => i * 50); // 50ms opóźnienia na znak
    
    // Zwraca HTML do renderowania
    const html = characters.map((char, i) => {
      return `<span class="inline-block opacity-0 animate-character" style="animation-delay: ${delays[i]}ms;">${char === ' ' ? '&nbsp;' : char}</span>`;
    }).join('');
    
    // Timer dla zakończenia animacji
    setTimeout(() => {
      onWaveComplete();
    }, characters.length * 50 + 500); // Dodatkowe 500ms na zakończenie
    
    return html;
  }
  
  // CSS do dodania:
  /*
  @keyframes characterAppear {
    0% { opacity: 0; transform: translateY(10px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  
  .animate-character {
    animation: characterAppear 0.5s forwards;
  }
  */