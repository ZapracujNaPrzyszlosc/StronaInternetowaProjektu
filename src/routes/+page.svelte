<script>
    import Header from '../components/Header.svelte';
    import Footer from '../components/Footer.svelte';
    import Hero from '../components/Hero.svelte';
    import TikTokPromo from '../components/TikTokPromo.svelte';
  </script>
  
  <svelte:head>
    <title>Zapracuj na przyszłość | Strona główna</title>
    <meta name="description" content="Projekt społeczny pomagający młodym ludziom odnaleźć swoją drogę na rynku pracy poprzez rozmowy z ludźmi o ich zawodach." />
  </svelte:head>
  
  <Header />
  <main>
    <Hero />
    <TikTokPromo />
  </main>
  <Footer />
  