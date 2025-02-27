<script>
    import { onMount } from 'svelte';
    import { theme, THEMES, toggleTheme } from '$lib/theme.js';
    import { t } from '$lib/i18n.js';
    
    // Props
    let {
      size = '24px',
      class: className = ''
    } = $props();
    
    // Wylicz dostępność JavaScript po stronie klienta
    let mounted = false;
    
    onMount(() => {
      mounted = true;
    });
  </script>
  
  {#if mounted}
    <button 
      type="button" 
      class="theme-toggle {className}" 
      aria-label={$theme === THEMES.DARK ? $t('theme.light') : $t('theme.dark')}
      title={$theme === THEMES.DARK ? $t('theme.light') : $t('theme.dark')}
      on:click={toggleTheme}
      data-testid="theme-toggle"
    >
      {#if $theme === THEMES.DARK}
        <!-- Ikona słońca (tryb jasny) -->
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      {:else}
        <!-- Ikona księżyca (tryb ciemny) -->
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      {/if}
    </button>
  {/if}
  
  <style>
    .theme-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      color: var(--color-text-primary);
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: var(--radius-full);
      transition: all var(--duration-fast) var(--ease-out);
    }
    
    .theme-toggle:hover {
      background-color: var(--color-bg-tertiary);
      transform: scale(1.1);
    }
    
    .theme-toggle svg {
      transition: transform var(--duration-fast) var(--ease-out);
    }
    
    .theme-toggle:active svg {
      transform: scale(0.9);
    }
  </style>