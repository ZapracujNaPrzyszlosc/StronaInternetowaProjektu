<script>
    // Wykorzystanie Svelte 5 runes
    
    // Props
    let {
      variant = 'primary', // primary, secondary, outline, text
      size = 'md', // sm, md, lg
      disabled = false,
      type = 'button',
      href = null,
      fullWidth = false,
      class: className = ''
    } = $props();
    
    // Wyliczane klasy na podstawie propów
    $derived(() => {
      const classes = ['button', `button--${variant}`, `button--${size}`];
      
      if (fullWidth) {
        classes.push('button--full-width');
      }
      
      if (className) {
        classes.push(className);
      }
      
      return classes.join(' ');
    }, variantClasses);
  </script>
  
  {#if href}
    <a {href} class={variantClasses} class:disabled data-testid="button-link">
      <slot />
    </a>
  {:else}
    <button {type} class={variantClasses} {disabled} data-testid="button">
      <slot />
    </button>
  {/if}
  
  <style>
    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: var(--font-medium);
      border-radius: var(--radius-md);
      transition: all var(--duration-fast) var(--ease-out);
      position: relative;
      overflow: hidden;
      cursor: pointer;
      text-decoration: none;
    }
    
    /* Warianty */
    .button--primary {
      background-color: var(--color-primary);
      color: var(--color-text-primary);
      border: 2px solid transparent;
    }
    
    .button--primary:hover {
      background-color: color-mix(in srgb, var(--color-primary) 90%, black);
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
    
    .button--secondary {
      background-color: var(--color-secondary);
      color: var(--color-text-primary);
      border: 2px solid transparent;
    }
    
    .button--secondary:hover {
      background-color: color-mix(in srgb, var(--color-secondary) 90%, black);
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
    
    .button--outline {
      background-color: transparent;
      color: var(--color-primary);
      border: 2px solid var(--color-primary);
    }
    
    .button--outline:hover {
      background-color: color-mix(in srgb, var(--color-primary) 10%, transparent);
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
    
    .button--text {
      background-color: transparent;
      color: var(--color-primary);
      border: 2px solid transparent;
      padding-left: 0;
      padding-right: 0;
    }
    
    .button--text:hover {
      color: color-mix(in srgb, var(--color-primary) 80%, black);
      text-decoration: underline;
    }
    
    /* Rozmiary */
    .button--sm {
      font-size: var(--text-sm);
      padding: 0.5rem 1rem;
    }
    
    .button--md {
      font-size: var(--text-base);
      padding: 0.75rem 1.5rem;
    }
    
    .button--lg {
      font-size: var(--text-lg);
      padding: 1rem 2rem;
    }
    
    /* Pełna szerokość */
    .button--full-width {
      width: 100%;
    }
    
    /* Disabled */
    .button[disabled],
    .button.disabled {
      opacity: 0.6;
      cursor: not-allowed;
      pointer-events: none;
    }
    
    /* Efekt przy kliknięciu */
    .button:active:not([disabled]):not(.disabled) {
      transform: translateY(0);
    }
    
    /* Efekt animacji ripple */
    .button::after {
      content: "";
      position: absolute;
      background-color: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      opacity: 1;
    }
    
    @keyframes ripple {
      to {
        transform: scale(2.5);
        opacity: 0;
      }
    }
  </style>