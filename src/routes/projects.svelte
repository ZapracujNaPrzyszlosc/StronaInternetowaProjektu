<script>
    import Projects from '../components/Projects.svelte';
    import Button from '../components/ui/Button.svelte';
    import Card from '../components/ui/Card.svelte';
    import Gradient from '../components/ui/Gradient.svelte';
    import BlurElement from '../components/ui/BlurElement.svelte';
    import { t } from '../lib/i18n.js';
    
    // Pełna lista projektów (więcej niż na stronie głównej)
    const allProjects = [
      {
        id: 1,
        title: 'projects.item1.title',
        description: 'projects.item1.description',
        image: '/assets/images/workshop.jpg',
        color: 'var(--color-primary)',
        longDescription: 'Cykl warsztatów rozwijających umiejętności miękkie i techniczne potrzebne na rynku pracy. Warsztaty obejmują takie tematy jak: komunikacja, praca zespołowa, zarządzanie czasem, podstawy programowania, tworzenie prezentacji i wiele innych. Zajęcia prowadzone są przez doświadczonych specjalistów z różnych branż.',
        date: '15.03.2025'
      },
      {
        id: 2,
        title: 'projects.item2.title',
        description: 'projects.item2.description',
        image: '/assets/images/mentoring.jpg',
        color: 'var(--color-secondary)',
        longDescription: 'Program mentoringowy, w ramach którego łączymy uczniów z doświadczonymi specjalistami. Mentorzy dzielą się swoją wiedzą, doświadczeniem i kontaktami, pomagając młodym ludziom w planowaniu kariery i rozwijaniu umiejętności zawodowych. Program trwa 6 miesięcy i obejmuje regularne spotkania, zadania i projekty.',
        date: '01.04.2025'
      },
      {
        id: 3,
        title: 'projects.item3.title',
        description: 'projects.item3.description',
        image: '/assets/images/job-fair.jpg',
        color: 'var(--color-accent-blue)',
        longDescription: 'Organizujemy targi pracy, na których młodzi ludzie mogą spotkać się z potencjalnymi pracodawcami, zapoznać się z ofertami praktyk i staży oraz uzyskać informacje o wymaganiach rekrutacyjnych. Targi odbywają się dwa razy w roku - wiosną i jesienią.',
        date: '10.05.2025'
      },
      {
        id: 4,
        title: 'Warsztaty CV i rozmów kwalifikacyjnych',
        description: 'Praktyczne warsztaty przygotowujące do procesu rekrutacji',
        image: '/assets/images/cv-workshop.jpg',
        color: 'var(--color-accent-pink)',
        longDescription: 'Podczas tych warsztatów uczestnicy uczą się, jak przygotować profesjonalne CV, list motywacyjny oraz jak zaprezentować się podczas rozmowy kwalifikacyjnej. Warsztaty obejmują również symulacje rozmów rekrutacyjnych z udziałem profesjonalnych rekruterów.',
        date: '22.06.2025'
      },
      {
        id: 5,
        title: 'Hackathon umiejętności zawodowych',
        description: 'Intensywne wydarzenie, podczas którego uczestnicy rozwiązują realne problemy biznesowe',
        image: '/assets/images/hackathon.jpg',
        color: 'var(--color-accent-orange)',
        longDescription: 'Hackathon to intensywne, 48-godzinne wydarzenie, podczas którego zespoły uczestników pracują nad rozwiązaniem realnych problemów biznesowych przedstawionych przez firmy partnerskie. To doskonała okazja do zdobycia praktycznego doświadczenia, nawiązania kontaktów i zaprezentowania swoich umiejętności potencjalnym pracodawcom.',
        date: '15.09.2025'
      },
      {
        id: 6,
        title: 'Szkolenie z przedsiębiorczości',
        description: 'Kurs dla osób zainteresowanych założeniem własnej działalności',
        image: '/assets/images/entrepreneurship.jpg',
        color: 'var(--color-tertiary)',
        longDescription: 'Ten kurs skierowany jest do osób zainteresowanych założeniem własnej działalności gospodarczej. Podczas szkolenia uczestnicy poznają podstawy prawne, finansowe i marketingowe prowadzenia firmy, uczą się jak przygotować biznesplan i pozyskać finansowanie na start.',
        date: '05.10.2025'
      }
    ];
  </script>
  
  <svelte:head>
    <title>Zapracuj na przyszłość | Projekty</title>
    <meta name="description" content="Nasze projekty - warsztaty, programy mentoringowe, targi pracy i inne inicjatywy wspierające rozwój zawodowy młodych ludzi." />
  </svelte:head>
  
  <main>
    <section class="page-header">
      <div class="page-header-gradients">
        <Gradient variant="primary" size="lg" opacity={0.4} class="gradient-1" />
        <Gradient variant="accent" size="md" opacity={0.3} class="gradient-2" />
      </div>
      
      <div class="container">
        <BlurElement glass={true} intensity="md" class="page-title-container">
          <h1 class="page-title">{$t('projects.title')}</h1>
          <p class="page-subtitle">{$t('projects.subtitle')}</p>
        </BlurElement>
      </div>
    </section>
    
    <!-- Lista wszystkich projektów -->
    <section class="projects-list">
      <div class="container">
        <div class="projects-grid">
          {#each allProjects as project}
            <Card variant="outlined" hover={true} class="project-card">
              <div class="project-card-content">
                <div class="project-image-wrapper">
                  <div class="project-image-placeholder" style="background-color: {project.color}"></div>
                </div>
                
                <div class="project-info">
                  <div class="project-header">
                    <h2 class="project-title">
                      {project.title.startsWith('projects.') ? $t(project.title) : project.title}
                    </h2>
                    <span class="project-date">{project.date}</span>
                  </div>
                  
                  <p class="project-description">
                    {project.description.startsWith('projects.') ? $t(project.description) : project.description}
                  </p>
                  
                  <p class="project-long-description">{project.longDescription}</p>
                  
                  <div class="project-actions">
                    <Button variant="outline" size="sm">Więcej szczegółów</Button>
                  </div>
                </div>
              </div>
            </Card>
          {/each}
        </div>
      </div>
    </section>
    
    <!-- Sekcja CTA -->
    <section class="projects-cta">
      <div class="container">
        <BlurElement glass={true} intensity="md" class="cta-container">
          <div class="cta-content">
            <h2 class="cta-title">Chcesz dołączyć do jednego z naszych projektów?</h2>
            <p class="cta-description">Skontaktuj się z nami, aby dowiedzieć się więcej o nadchodzących wydarzeniach i możliwościach współpracy.</p>
            <div class="cta-actions">
              <Button variant="primary" href="/contact">Skontaktuj się z nami</Button>
            </div>
          </div>
        </BlurElement>
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
      margin: 0 0 var(--spacing-sm);
    }
    
    .page-subtitle {
      font-size: var(--text-lg);
      color: var(--color-text-secondary);
      margin: 0;
    }
    
    .projects-list {
      padding: var(--spacing-2xl) 0 var(--spacing-3xl);
    }
    
    .projects-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--spacing-xl);
    }
    
    @media (min-width: 640px) {
      .projects-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (min-width: 992px) {
      .projects-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    
    .project-card {
      height: 100%;
      transition: transform var(--duration-normal) var(--ease-out);
    }
    
    .project-card:hover {
      transform: translateY(-8px);
    }
    
    .project-card-content {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    
    .project-image-wrapper {
      margin-bottom: var(--spacing-md);
      border-radius: var(--radius-md);
      overflow: hidden;
    }
    
    .project-image-placeholder {
      width: 100%;
      height: 0;
      padding-bottom: 60%;
      border-radius: var(--radius-md);
    }
    
    .project-info {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    
    .project-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: var(--spacing-sm);
    }
    
    .project-title {
      font-size: var(--text-lg);
      font-weight: var(--font-semibold);
      color: var(--color-text-primary);
      margin: 0;
    }
    
    .project-date {
      font-size: var(--text-sm);
      color: var(--color-text-secondary);
      white-space: nowrap;
      margin-left: var(--spacing-sm);
    }
    
    .project-description {
      color: var(--color-text-secondary);
      margin: 0 0 var(--spacing-md);
      font-weight: var(--font-medium);
    }
    
    .project-long-description {
      color: var(--color-text-secondary);
      margin: 0 0 var(--spacing-md);
      font-size: var(--text-sm);
      flex: 1;
    }
    
    .project-actions {
      margin-top: auto;
    }
    
    .projects-cta {
      padding: 0 0 var(--spacing-3xl);
    }
    
    .cta-container {
      padding: var(--spacing-xl);
      border-radius: var(--radius-lg);
      text-align: center;
    }
    
    .cta-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--spacing-lg);
    }
    
    .cta-title {
      font-size: var(--text-2xl);
      font-weight: var(--font-bold);
      margin: 0;
    }
    
    .cta-description {
      font-size: var(--text-lg);
      color: var(--color-text-secondary);
      max-width: 600px;
      margin: 0 auto;
    }
    
    .cta-actions {
      margin-top: var(--spacing-md);
    }
  </style>