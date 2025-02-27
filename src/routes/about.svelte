<script>
    import About from '../components/About.svelte';
    import Gradient from '../components/ui/Gradient.svelte';
    import BlurElement from '../components/ui/BlurElement.svelte';
    import { t } from '../lib/i18n.js';
  </script>
  
  <svelte:head>
    <title>Zapracuj na przyszłość | O projekcie</title>
    <meta name="description" content="Dowiedz się więcej o projekcie Zapracuj na przyszłość - nasza misja, wizja i cele." />
  </svelte:head>
  
  <main>
    <section class="page-header">
      <div class="page-header-gradients">
        <Gradient variant="primary" size="lg" opacity={0.4} class="gradient-1" />
        <Gradient variant="secondary" size="md" opacity={0.3} class="gradient-2" />
      </div>
      
      <div class="container">
        <BlurElement glass={true} intensity="md" class="page-title-container">
          <h1 class="page-title">{$t('about.title')}</h1>
        </BlurElement>
      </div>
    </section>
    
    <About class="about-full-page" />
    
    <!-- Dodatkowe informacje o projekcie -->
    <section class="about-extended">
      <div class="container">
        <div class="about-extended-content">
          <div class="about-extended-image">
            <!-- Tutaj można dodać zdjęcie zespołu lub inne obrazy -->
            <div class="image-placeholder"></div>
          </div>
          
          <div class="about-extended-text">
            <h2 class="about-extended-title">Historia projektu</h2>
            <p>Projekt "Zapracuj na przyszłość" powstał w ramach Olimpiady Zwolnionych z Teorii jako odpowiedź na wyzwania, z którymi mierzą się młodzi ludzie wchodzący na rynek pracy. Nasz zespół zauważył potrzebę wsparcia uczniów i studentów w zdobywaniu praktycznych umiejętności zawodowych.</p>
            <p>Od początku naszym celem było stworzenie platformy, która będzie łączyć młodych ludzi z profesjonalistami z różnych branż, umożliwiając im zdobycie cennego doświadczenia i wiedzy.</p>
            
            <h2 class="about-extended-title">Nasz zespół</h2>
            <p>Jesteśmy grupą zaangażowanych młodych ludzi, którzy wierzą w moc edukacji i praktycznego doświadczenia. Nasz zespół składa się z uczniów i studentów z różnych dziedzin, połączonych wspólnym celem - pomóc innym w rozwijaniu ich potencjału zawodowego.</p>
            
            <h2 class="about-extended-title">Partnerzy</h2>
            <p>Współpracujemy z lokalnymi firmami, instytucjami edukacyjnymi i doświadczonymi profesjonalistami, którzy wspierają naszą misję poprzez dzielenie się wiedzą, mentoring i oferowanie możliwości staży i praktyk.</p>
          </div>
        </div>
      </div>
    </section>
  </main>
  
  <style>
    .page-header {
      padding: 120px 0 60px;
      position: relative;
      overflow: hidden;
    }
    
    .page-header-gradients {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      z-index: -1;
    }
    
    .gradient-1 {
      position: absolute;
      top: 20%;
      right: -10%;
    }
    
    .gradient-2 {
      position: absolute;
      bottom: 0;
      left: 10%;
    }
    
    .page-title-container {
      display: inline-block;
      padding: var(--spacing-lg) var(--spacing-xl);
      margin-bottom: var(--spacing-xl);
    }
    
    .page-title {
      font-size: var(--text-4xl);
      font-weight: var(--font-bold);
      margin: 0;
    }
    
    .about-full-page {
      padding-top: 0;
    }
    
    .about-extended {
      padding: var(--spacing-3xl) 0;
      background-color: var(--color-bg-secondary);
    }
    
    .about-extended-content {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--spacing-2xl);
    }
    
    @media (min-width: 992px) {
      .about-extended-content {
        grid-template-columns: 1fr 1fr;
      }
    }
    
    .about-extended-image {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .image-placeholder {
      width: 100%;
      aspect-ratio: 4/3;
      background-color: var(--color-primary);
      border-radius: var(--radius-lg);
      opacity: 0.7;
    }
    
    .about-extended-text {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg);
    }
    
    .about-extended-title {
      font-size: var(--text-2xl);
      font-weight: var(--font-semibold);
      margin-bottom: var(--spacing-md);
      color: var(--color-text-primary);
    }
    
    .about-extended-text p {
      color: var(--color-text-secondary);
      line-height: 1.6;
      margin: 0 0 var(--spacing-md);
    }
  </style>