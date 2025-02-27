<script>
    import { fade, fly } from 'svelte/transition';
    import { onMount } from 'svelte';
    
    // Poprawna składnia $state w Svelte 5
    let visible = $state(false);
    
    onMount(() => {
      visible = true;
    });
  </script>
  
  <section class="relative py-16 md:py-24 overflow-hidden">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto text-center">
        {#if visible}
          <h1 
            class="text-4xl md:text-5xl font-bold mb-6 text-secondary"
            in:fly={{ y: 20, duration: 800, delay: 200 }}
          >
            Zapracuj na przyszłość
          </h1>
          
          <p 
            class="text-xl md:text-2xl mb-8 text-gray-600"
            in:fade={{ duration: 800, delay: 600 }}
          >
            Poznaj prawdziwe historie ludzi i ich pracy. Zainspiruj się i znajdź swoją drogę.
          </p>
          
          <div 
            class="flex flex-col sm:flex-row gap-4 justify-center"
            in:fade={{ duration: 800, delay: 1000 }}
          >
            <a 
              href="https://www.tiktok.com/@zapracuj.na.przyszlosc" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors font-medium text-lg"
            >
              Oglądaj na TikToku
            </a>
            
            <a 
              href="/about" 
              class="px-6 py-3 bg-white text-secondary border border-secondary rounded-md hover:bg-gray-50 transition-colors font-medium text-lg"
            >
              Poznaj nasz projekt
            </a>
          </div>
        {/if}
      </div>
    </div>
    
    <!-- Stylizowane elementy tła -->
    <div class="absolute -top-24 -right-24 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
    <div class="absolute -bottom-32 -left-32 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
  </section>