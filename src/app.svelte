<script>
    import { onMount } from 'svelte';
    import { router } from './lib/simple-router.js';
    import { initTheme } from '$lib/theme.js';
    import { locale, defaultLocale } from '$lib/i18n.js';
    import Header from './components/Header.svelte';
    import Footer from './components/Footer.svelte';
    
    import Home from './routes/index.svelte';
    import About from './routes/about.svelte';
    import Projects from './routes/projects.svelte';
    import Contact from './routes/contact.svelte';
    
    // Aktualny URL
    const currentPath = router.path;
    
    // Inicjalizacja motywu
    onMount(() => {
      initTheme();
      
      // Wykrywanie języka przeglądarki (jeśli nie ustawiono)
      if (typeof window !== 'undefined' && !localStorage.getItem('locale')) {
        const browserLang = navigator.language.split('-')[0];
        if (browserLang === 'en' || browserLang === 'pl') {
          locale.set(browserLang);
        } else {
          locale.set(defaultLocale);
        }
      }
    });
  </script>
  
  <div class="app">
    <Header />
    
    <main>
      {#if $currentPath === '/' || $currentPath === ''}
        <Home />
      {:else if $currentPath === '/about'}
        <About />
      {:else if $currentPath === '/projects'}
        <Projects />
      {:else if $currentPath === '/contact'}
        <Contact />
      {:else}
        <!-- Ścieżka domyślna (404) - przekieruj na stronę główną -->
        <Home />
      {/if}
    </main>
    
    <Footer />
  </div>
  
  <style>
    .app {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    
    main {
      flex: 1;
    }
    
    :global(html, body) {
      scroll-behavior: smooth;
      overscroll-behavior: none;
    }
    
    :global(*) {
      box-sizing: border-box;
    }
  </style>