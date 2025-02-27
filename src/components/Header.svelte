<script>
    import { onMount } from 'svelte';
    import ThemeToggle from './ThemeToggle.svelte';
    import LanguageSelector from './LanguageSelector.svelte';
    import BlurElement from './ui/BlurElement.svelte';
    import { t } from '$lib/i18n.js';
    
    // Props
    let {
      class: className = ''
    } = $props();
    
    // Stan dla obsługi menu mobilnego
    let isMenuOpen = $state(false);
    let isScrolled = $state(false);
    let lastScrollTop = 0;
    let isHeaderVisible = $state(true);
    
    // Funkcja przełączająca menu mobilne
    function toggleMenu() {
      isMenuOpen = !isMenuOpen;
      
      // Blokada przewijania strony gdy menu jest otwarte
      if (isMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
    
    // Obsługa przewijania strony
    function handleScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Sprawdź czy strona została przewinięta
      isScrolled = scrollTop > 10;
      
      // Ukryj/pokaż nagłówek podczas przewijania
      if (scrollTop > 100) {
        isHeaderVisible = scrollTop < lastScrollTop;
      } else {
        isHeaderVisible = true;
      }
      
      lastScrollTop = scrollTop;
    }
    
    onMount(() => {
      window.addEventListener('scroll', handleScroll);
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    });
    
    // Nasłuchiwanie zmian rozmiaru okna (aby zamknąć menu mobilne po zmianie na desktop)
    function handleResize() {
      if (window.innerWidth >= 768 && isMenuOpen) {
        isMenuOpen = false;
        document.body.style.overflow = '';
      }
    }
    
    onMount(() => {
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    });
    
    // Linki nawigacyjne
    const navLinks = [
      { href: '/', label: 'nav.home' },
      { href: '/about', label: 'nav.about' },
      { href: '/projects', label: 'nav.projects' },
      { href: '/contact', label: 'nav.contact' }
    ];
  </script>
  
  <header 
    class="header {className} {isScrolled ? 'header--scrolled' : ''} {isHeaderVisible ? 'header--visible' : 'header--hidden'}"
    data-testid="header"
  >
    <BlurElement glass={isScrolled} intensity="md" class="header-blur">
      <div class="container">
        <div class="header-content">
          <!-- Logo -->
          <a href="#/" class="logo" aria-label="Zapracuj na przyszłość - Strona główna">
            <img src="/logo.svg" alt="Zapracuj na przyszłość" width="40" height="40" />
            <span class="logo-text">Zapracuj na przyszłość</span>
          </a>
          
          <!-- Nawigacja desktopowa -->
          <nav class="nav-desktop">
            <ul class="nav-list">
              {#each navLinks as { href, label }}
                <li class="nav-item">
                  <a href={'#' + href} class="nav-link">{$t(label)}</a>  // Dodaj '#' przed href
                </li>
              {/each}
            </ul>
          </nav>
          
          <!-- Przyciski akcji -->
          <div class="actions">
            <LanguageSelector />
            <ThemeToggle />
            
            <!-- Przycisk menu mobilnego -->
            <button 
              type="button" 
              class="menu-toggle" 
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              on:click={toggleMenu}
            >
              <span class="sr-only">Menu</span>
              <div class="hamburger {isMenuOpen ? 'active' : ''}">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </BlurElement>
    
    <!-- Menu mobilne -->
    <div 
      id="mobile-menu" 
      class="mobile-menu {isMenuOpen ? 'open' : ''}"
      aria-hidden={!isMenuOpen}
    >
      <BlurElement glass={true} intensity="lg" class="mobile-menu-content">
        <nav class="mobile-nav">
          <ul class="mobile-nav-list">
            {#each navLinks as { href, label }}
            <li class="mobile-nav-item">
              <a 
                href={'#' + href} 
                class="mobile-nav-link"
                on:click={() => isMenuOpen = false}
              >
                {$t(label)}
              </a>
            </li>
          {/each}
          </ul>
        </nav>
      </BlurElement>
    </div>
  </header>
  
  <style>
    .header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 100;
      transition: 
        transform var(--duration-normal) var(--ease-out),
        background-color var(--duration-normal) var(--ease-out);
    }
    
    .header--scrolled {
      box-shadow: var(--shadow-md);
    }
    
    .header--visible {
      transform: translateY(0);
    }
    
    .header--hidden {
      transform: translateY(-100%);
    }
    
    .header-blur {
      width: 100%;
    }
    
    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 70px;
    }
    
    /* Logo */
    .logo {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      color: var(--color-text-primary);
      font-weight: var(--font-bold);
      font-size: var(--text-lg);
      text-decoration: none;
    }
    
    .logo-text {
      display: none;
    }
    
    @media (min-width: 640px) {
      .logo-text {
        display: inline;
      }
    }
    
    /* Nawigacja desktopowa */
    .nav-desktop {
      display: none;
    }
    
    @media (min-width: 768px) {
      .nav-desktop {
        display: block;
      }
    }
    
    .nav-list {
      display: flex;
      gap: var(--spacing-lg);
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .nav-link {
      color: var(--color-text-primary);
      text-decoration: none;
      font-weight: var(--font-medium);
      position: relative;
      padding: 0.25rem 0;
      transition: color var(--duration-fast) var(--ease-out);
    }
    
    .nav-link:hover {
      color: var(--color-primary);
    }
    
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 2px;
      background-color: var(--color-primary);
      transition: width var(--duration-normal) var(--ease-out);
    }
    
    .nav-link:hover::after {
      width: 100%;
    }
    
    /* Przyciski akcji */
    .actions {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
    }
    
    /* Menu mobilne */
    .menu-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0;
    }
    
    @media (min-width: 768px) {
      .menu-toggle {
        display: none;
      }
    }
    
    .hamburger {
      position: relative;
      width: 24px;
      height: 18px;
    }
    
    .hamburger span {
      position: absolute;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: var(--color-text-primary);
      border-radius: 4px;
      transition: all var(--duration-fast) var(--ease-out);
    }
    
    .hamburger span:nth-child(1) {
      top: 0;
    }
    
    .hamburger span:nth-child(2) {
      top: 8px;
    }
    
    .hamburger span:nth-child(3) {
      top: 16px;
    }
    
    .hamburger.active span:nth-child(1) {
      transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active span:nth-child(2) {
      opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
      transform: translateY(-8px) rotate(-45deg);
    }
    
    .mobile-menu {
      position: fixed;
      top: 70px;
      left: 0;
      width: 100%;
      height: calc(100vh - 70px);
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 99;
      opacity: 0;
      visibility: hidden;
      transition: 
        opacity var(--duration-normal) var(--ease-out),
        visibility var(--duration-normal) var(--ease-out);
    }
    
    .mobile-menu.open {
      opacity: 1;
      visibility: visible;
    }
    
    .mobile-menu-content {
      height: 100%;
      width: 100%;
      padding: var(--spacing-lg);
      overflow-y: auto;
    }
    
    .mobile-nav-list {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg);
      list-style: none;
      padding: 0;
      margin: var(--spacing-2xl) 0;
    }
    
    .mobile-nav-link {
      display: block;
      color: var(--color-text-primary);
      font-size: var(--text-xl);
      font-weight: var(--font-bold);
      text-decoration: none;
      padding: var(--spacing-md) 0;
      text-align: center;
      transition: color var(--duration-fast) var(--ease-out);
    }
    
    .mobile-nav-link:hover {
      color: var(--color-primary);
    }
    
    /* Screen reader only */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }
  </style>