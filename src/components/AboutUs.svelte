<script>
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  
  // Poprawna składnia $state w Svelte 5
  let isVisible = $state(false);
  
  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        isVisible = true;
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    
    const element = document.getElementById('about-us-section');
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      observer.disconnect();
    };
  });
  
  // Zespół projektu
  const team = [
    {
      name: "Imię Nazwisko",
      role: "Koordynator projektu",
      photo: "https://picsum.photos/200/200?random=1"
    },
    {
      name: "Imię Nazwisko",
      role: "Wywiadowca",
      photo: "https://picsum.photos/200/200?random=2"
    },
    {
      name: "Imię Nazwisko",
      role: "Montażysta",
      photo: "https://picsum.photos/200/200?random=3"
    },
    {
      name: "Imię Nazwisko",
      role: "Social Media",
      photo: "https://picsum.photos/200/200?random=4"
    }
  ];
</script>

<section id="about-us-section" class="py-16">
  <div class="container mx-auto px-4">
    <div class="max-w-4xl mx-auto">
      {#if isVisible}
        <div in:fade={{ duration: 800 }}>
          <h2 class="text-3xl font-bold mb-8 text-secondary text-center">O projekcie</h2>
          
          <div class="mb-12">
            <p class="text-lg mb-4 text-gray-700">
              <strong>Zapracuj na przyszłość</strong> to projekt społeczny stworzony w ramach Olimpiady Zwolnionych z Teorii, 
              który ma na celu pomóc młodym ludziom w lepszym zrozumieniu rynku pracy i różnorodnych ścieżek kariery.
            </p>
            
            <p class="text-lg mb-4 text-gray-700">
              Naszym głównym działaniem jest tworzenie krótkich wywiadów z ludźmi różnych zawodów - spotykamy się z przedstawicielami
              różnych branż i rozmawiamy z nimi o ich codziennej pracy, ścieżce kariery, wyzwaniach i satysfakcji.
            </p>
            
            <p class="text-lg mb-4 text-gray-700">
              Wierzymy, że prawdziwe historie i doświadczenia są najlepszym źródłem wiedzy i inspiracji dla młodych osób,
              które dopiero poszukują swojej drogi zawodowej.
            </p>
          </div>
          
          <div class="mb-12">
            <h3 class="text-2xl font-bold mb-6 text-secondary text-center">Nasz zespół</h3>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {#each team as member, i}
                <div 
                  class="bg-white p-4 rounded-lg shadow-md text-center"
                  in:fly={{ y: 20, duration: 500, delay: 200 + i * 150 }}
                >
                  <img 
                    src={member.photo} 
                    alt={member.name} 
                    class="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                  />
                  <h4 class="font-bold text-lg">{member.name}</h4>
                  <p class="text-gray-600">{member.role}</p>
                </div>
              {/each}
            </div>
          </div>
          
          <div class="bg-primary/10 rounded-xl p-8">
            <h3 class="text-2xl font-bold mb-4 text-primary">Nasza misja</h3>
            <p class="text-lg mb-6 text-gray-700">
              Naszą misją jest dostarczanie młodym ludziom praktycznej wiedzy o różnych zawodach i ścieżkach kariery,
              poprzez autentyczne rozmowy z osobami, które już odnalazły swoją drogę zawodową.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="bg-white p-4 rounded-lg shadow-sm">
                <h4 class="font-bold text-lg mb-2 text-secondary">Informacja</h4>
                <p class="text-gray-600">
                  Dostarczamy praktyczną wiedzę o różnych zawodach i wymaganiach.
                </p>
              </div>
              <div class="bg-white p-4 rounded-lg shadow-sm">
                <h4 class="font-bold text-lg mb-2 text-secondary">Inspiracja</h4>
                <p class="text-gray-600">
                  Pokazujemy różne ścieżki kariery i możliwości rozwoju.
                </p>
              </div>
              <div class="bg-white p-4 rounded-lg shadow-sm">
                <h4 class="font-bold text-lg mb-2 text-secondary">Motywacja</h4>
                <p class="text-gray-600">
                  Zachęcamy do świadomego planowania przyszłości zawodowej.
                </p>
              </div>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</section>