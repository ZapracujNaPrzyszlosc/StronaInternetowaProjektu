<script>
    // Props
    let {
      variant = 'default', // default, elevated, outlined
      hover = false,
      class: className = ''
    } = $props();
    
    // Wyliczane klasy na podstawie propów
    $derived(() => {
      const classes = ['card', `card--${variant}`];
      
      if (hover) {
        classes.push('card--hover');
      }
      
      if (className) {
        classes.push(className);
      }
      
      return classes.join(' ');
    }, cardClasses);
  </script>
  
  <div class={cardClasses}>
    <slot />
  </div>
  
  <style>
    .card {
      border-radius: var(--radius-lg);
      overflow: hidden;
      transition: 
        transform var(--duration-normal) var(--ease-out),
        box-shadow var(--duration-normal) var(--ease-out),
        background-color var(--duration-normal) var(--ease-out);
    }
    
    /* Warianty */
    .card--default {
      background-color: var(--color-bg-secondary);
      padding: var(--spacing-lg);
    }
    
    .card--elevated {
      background-color: var(--color-bg-secondary);
      padding: var(--spacing-lg);
      box-shadow: var(--shadow-md);
    }
    
    .card--outlined {
      background-color: transparent;
      padding: var(--spacing-lg);
      border: 1px solid var(--color-border);
    }
    
    /* Hover efekt */
    .card--hover {
      cursor: pointer;
    }
    
    .card--hover:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }
    
    .card--outlined.card--hover:hover {
      background-color: var(--color-bg-tertiary);
    }
  </style>