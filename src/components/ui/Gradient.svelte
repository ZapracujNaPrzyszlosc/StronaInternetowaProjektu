<script>
    import { onMount } from 'svelte';
    import { animateGradientBlur } from '$lib/animations.js';
    
    // Props
    let {
      variant = 'primary', // primary, secondary, accent
      size = 'md', // sm, md, lg, xl
      opacity = 0.6,
      animated = true,
      class: className = ''
    } = $props();
    
    // Refs
    let gradientElement;
    
    // Wyliczane klasy na podstawie propów
    $derived(() => {
      const classes = [
        'gradient-blur',
        `gradient-${variant}`,
        `gradient-size-${size}`
      ];
      
      if (className) {
        classes.push(className);
      }
      
      return classes.join(' ');
    }, gradientClasses);
    
    onMount(() => {
      if (animated && gradientElement) {
        return animateGradientBlur(gradientElement);
      }
    });
  </script>
  
  <div 
    class={gradientClasses} 
    style="opacity: {opacity};" 
    bind:this={gradientElement}
    data-testid="gradient"
  ></div>
  
  <style>
    .gradient-blur {
      position: absolute;
      border-radius: 50%;
      filter: blur(var(--blur-lg));
      z-index: -1;
      pointer-events: none;
      will-change: transform;
      transition: transform 10s ease-in-out;
    }
    
    /* Warianty gradientów */
    .gradient-primary {
      background: var(--gradient-primary);
    }
    
    .gradient-secondary {
      background: var(--gradient-secondary);
    }
    
    .gradient-accent {
      background: linear-gradient(135deg, var(--color-accent-blue) 0%, var(--color-accent-pink) 100%);
    }
    
    /* Rozmiary */
    .gradient-size-sm {
      width: 150px;
      height: 150px;
    }
    
    .gradient-size-md {
      width: 300px;
      height: 300px;
    }
    
    .gradient-size-lg {
      width: 500px;
      height: 500px;
    }
    
    .gradient-size-xl {
      width: 800px;
      height: 800px;
    }
  </style>