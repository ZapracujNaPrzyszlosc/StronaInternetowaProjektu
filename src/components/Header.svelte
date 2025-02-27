<script>
  import { page } from '$app/stores';
  
  // Poprawna deklaracja stanu w Svelte 5
  let activePath = $state('/');
  let mobileMenuOpen = $state(false);
  
  $effect(() => {
    // Sprawdzenie aktywnej trasy dla nawigacji
    activePath = $page.url.pathname;
  });
  
  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }
</script>

<header class="bg-white shadow-sm sticky top-0 z-10">
  <div class="container mx-auto px-4 py-4">
    <div class="flex justify-between items-center">
      <a href="/" class="text-2xl font-bold text-primary">
        Zapracuj na przyszłość
      </a>
      
      <!-- Menu na komputery -->
      <nav class="hidden md:flex space-x-8">
        <a 
          href="/" 
          class="font-medium {activePath === '/' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary'}"
        >
          Strona główna
        </a>
        <a 
          href="/about" 
          class="font-medium {activePath === '/about' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary'}"
        >
          O nas
        </a>
        <a 
          href="https://www.tiktok.com/@zapracujnaprzyszlosc" 
          target="_blank" 
          rel="noopener noreferrer"
          class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          TikTok
        </a>
      </nav>
      
      <!-- Przycisk menu mobilnego -->
      <button 
        class="md:hidden text-gray-600" 
        onclick={toggleMobileMenu}
        aria-label="Menu mobilne"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>
    </div>
    
    <!-- Menu mobilne -->
    {#if mobileMenuOpen}
      <div class="md:hidden mt-4 pb-2 space-y-4">
        <a 
          href="/" 
          class="block font-medium py-2 {activePath === '/' ? 'text-primary' : 'text-gray-600'}"
          onclick={() => mobileMenuOpen = false}
        >
          Strona główna
        </a>
        <a 
          href="/about" 
          class="block font-medium py-2 {activePath === '/about' ? 'text-primary' : 'text-gray-600'}"
          onclick={() => mobileMenuOpen = false}
        >
          O nas
        </a>
        <a 
          href="https://www.tiktok.com/@zapracujnaprzyszlosc" 
          target="_blank" 
          rel="noopener noreferrer"
          class="block px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors text-center"
        >
          TikTok
        </a>
      </div>
    {/if}
  </div>
</header>