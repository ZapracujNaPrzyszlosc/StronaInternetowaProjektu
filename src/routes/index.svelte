<script>
    import Hero from '../components/Hero.svelte';
    import About from '../components/About.svelte';
    import Projects from '../components/Projects.svelte';
    import Contact from '../components/Contact.svelte';
  </script>
  
  <svelte:head>
    <title>Zapracuj na przyszłość | Strona główna</title>
    <meta name="description" content="Zapracuj na przyszłość - Projekt społeczny w ramach Olimpiady Zwolnionych z Teorii. Pomagamy młodym ludziom rozwijać umiejętności zawodowe i przygotować się do wejścia na rynek pracy." />
  </svelte:head>
  
  <main>
    <Hero />
    <About />
    <Projects limit={3} />
    <Contact />
  </main>