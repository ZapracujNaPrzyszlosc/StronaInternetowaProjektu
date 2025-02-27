<script>
  import { toast } from 'svelte-french-toast';
  
  let { fallback = 'Wystąpił błąd podczas ładowania tej sekcji.' } = $props();
  
  let error = $state(null);
  
  try {
    // W Svelte 5 nie ma już onError, zamiast tego używamy zwykłego try/catch
    // lub logikę obsługi błędów umieszczamy w komponentach rodzica
  } catch (e) {
    console.error('Caught error:', e);
    error = e;
    toast.error('Wystąpił błąd. Odśwież stronę lub wróć później.');
  }
</script>

{#if error}
  <div class="p-4 my-4 bg-red-50 rounded-lg border border-red-200">
    <h2 class="font-bold text-red-700">Ups! Coś poszło nie tak</h2>
    <p class="text-red-600">{fallback}</p>
    <button 
      class="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      onclick={() => window.location.reload()}
    >
      Odśwież stronę
    </button>
  </div>
{:else}
  <slot />
{/if}