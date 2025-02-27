<script>
    import Header from '../../components/Header.svelte';
    import Footer from '../../components/Footer.svelte';
    import AboutUs from '../../components/AboutUs.svelte';
  </script>
  
  <svelte:head>
    <title>Zapracuj na przyszłość | O nas</title>
    <meta name="description" content="Poznaj nasz zespół i dowiedz się więcej o naszej misji pomagania młodym ludziom w odnalezieniu się na rynku pracy." />
  </svelte:head>
  
  <Header />
  <main>
    <div class="py-8 md:py-12 bg-gray-50">
      <div class="container mx-auto px-4">
        <h1 class="text-3xl md:text-4xl font-bold text-center text-secondary">O nas</h1>
      </div>
    </div>
    <AboutUs />
  </main>
  <Footer />