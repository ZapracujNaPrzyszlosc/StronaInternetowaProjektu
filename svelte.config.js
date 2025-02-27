import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  // Preprocess Svelte files for better Vite compatibility
  preprocess: vitePreprocess(),
  
  // Use Svelte 5 runes
  compilerOptions: {
    runes: true
  },

  // Extra options
  kit: {
    // Add any SvelteKit-specific options here if needed in the future
  }
};