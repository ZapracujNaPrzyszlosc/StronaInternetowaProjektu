<script>
    import { onMount } from 'svelte';
    import { locale, languages, t } from '$lib/i18n.js';
    
    // Props
    let {
      class: className = ''
    } = $props();
    
    // Stan rozwinięcia menu
    let isOpen = $state(false);
    let selectorRef;
    
    // Obsługa zmiany języka
    function changeLanguage(lang) {
      locale.set(lang);
      isOpen = false;
    }
    
    // Obsługa kliknięcia poza selektorem
    function handleClickOutside(event) {
      if (selectorRef && !selectorRef.contains(event.target)) {
        isOpen = false;
      }
    }
    
    onMount(() => {
      document.addEventListener('click', handleClickOutside);
      
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    });
  </script>
  
  <div class="language-selector {className}" bind:this={selectorRef} data-testid="language-selector">
    <button 
      type="button" 
      class="selector-button"
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      on:click={() => isOpen = !isOpen}
    >
      <span class="selector-label">{$t('language')}: {languages[$locale]}</span>
      <svg 
        class="selector-icon" 
        class:open={isOpen} 
        xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>
    
    {#if isOpen}
      <div class="dropdown" role="listbox">
        {#each Object.entries(languages) as [code, name]}
          <button 
            type="button" 
            class="dropdown-item"
            class:active={$locale === code}
            role="option"
            aria-selected={$locale === code}
            on:click={() => changeLanguage(code)}
          >
            {name}
          </button>
        {/each}
      </div>
    {/if}
  </div>
  
  <style>
    .language-selector {
      position: relative;
      display: inline-block;
    }
    
    .selector-button {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      background-color: var(--color-bg-secondary);
      color: var(--color-text-primary);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      padding: 0.5rem 1rem;
      font-size: var(--text-sm);
      cursor: pointer;
      transition: all var(--duration-fast) var(--ease-out);
    }
    
    .selector-button:hover {
      background-color: var(--color-bg-tertiary);
    }
    
    .selector-icon {
      transition: transform var(--duration-fast) var(--ease-out);
    }
    
    .selector-icon.open {
      transform: rotate(180deg);
    }
    
    .dropdown {
      position: absolute;
      top: 100%;
      right: 0;
      margin-top: 0.25rem;
      background-color: var(--color-bg-secondary);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      overflow: hidden;
      box-shadow: var(--shadow-md);
      z-index: 10;
      min-width: 150px;
      animation: fadeIn var(--duration-fast) var(--ease-out);
    }
    
    .dropdown-item {
      display: block;
      width: 100%;
      padding: 0.5rem 1rem;
      text-align: left;
      background: none;
      border: none;
      cursor: pointer;
      color: var(--color-text-primary);
      transition: background-color var(--duration-fast) var(--ease-out);
    }
    
    .dropdown-item:hover {
      background-color: var(--color-bg-tertiary);
    }
    
    .dropdown-item.active {
      background-color: var(--color-primary);
      color: var(--color-text-primary);
      font-weight: var(--font-medium);
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  </style>