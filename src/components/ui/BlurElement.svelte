<script>
    // Props
    let {
      intensity = 'md', // sm, md, lg
      rounded = true,
      glass = true,
      class: className = ''
    } = $props();
    
    // Wyliczane klasy na podstawie propów
    $derived(() => {
      const classes = ['blur-element', `blur-${intensity}`];
      
      if (rounded) {
        classes.push('blur-rounded');
      }
      
      if (glass) {
        classes.push('blur-glass');
      }
      
      if (className) {
        classes.push(className);
      }
      
      return classes.join(' ');
    }, blurClasses);
  </script>
  
  <div class={blurClasses} data-testid="blur-element">
    <slot />
  </div>
  
  <style>
    .blur-element {
      position: relative;
      overflow: hidden;
    }
    
    .blur-rounded {
      border-radius: var(--radius-lg);
    }
    
    .blur-glass {
      backdrop-filter: blur(var(--blur-md));
      -webkit-backdrop-filter: blur(var(--blur-md));
      background-color: var(--blur-bg);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    /* Intensywność rozmycia */
    .blur-sm {
      backdrop-filter: blur(var(--blur-sm));
      -webkit-backdrop-filter: blur(var(--blur-sm));
    }
    
    .blur-md {
      backdrop-filter: blur(var(--blur-md));
      -webkit-backdrop-filter: blur(var(--blur-md));
    }
    
    .blur-lg {
      backdrop-filter: blur(var(--blur-lg));
      -webkit-backdrop-filter: blur(var(--blur-lg));
    }
  </style>