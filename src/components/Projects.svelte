<script>
    import { onMount } from 'svelte';
    import { createScrollAnimation, staggerAnimation } from '$lib/animations.js';
    import Button from './ui/Button.svelte';
    import Card from './ui/Card.svelte';
    import Gradient from './ui/Gradient.svelte';
    import { t } from '$lib/i18n.js';
    
    // Props
    let {
      class: className = '',
      limit = 3 // Liczba wyświetlanych projektów
    } = $props();
    
    // Referencje do elementów
    let sectionTitle;
    let sectionSubtitle;
    let projectCards;
    let projectCardsWrapper;
    
    // Przykładowe projekty
    const projects = [
      {
        id: 1,
        title: 'projects.item1.title',
        description: 'projects.item1.description',
        image: '/assets/images/workshop.jpg',
        color: 'var(--color-primary)'
      },
      {
        id: 2,
        title: 'projects.item2.title',
        description: 'projects.item2.description',
        image: '/assets/images/mentoring.jpg',
        color: 'var(--color-secondary)'
      },
      {
        id: 3,
        title: 'projects.item3.title',
        description: 'projects.item3.description',
        image: '/assets/images/job-fair.jpg',
        color: 'var(--color-accent-blue)'
      }
    ];
    
    onMount(() => {
      // Animacje
      const fadeIn = createScrollAnimation('animate-fade-in');
      const slideUp = createScrollAnimation('animate-slide-up');
      
      fadeIn(sectionTitle);
      setTimeout(() => fadeIn(sectionSubtitle), 200);
      
      // Po załadowaniu struktury projektów
      if (projectCardsWrapper) {
        setTimeout(() => {
          const cards = projectCardsWrapper.querySelectorAll('.project-card');
          staggerAnimation(cards, 'animate-slide-up', 200);
        }, 400);
      }
    });
    
    // Filtruj projekty na podstawie limitu
    $derived(projects.slice(0, limit), limitedProjects);
  </script>
  
  <section class="projects {className}" id="projects" data-testid="projects">
    <!-- Gradienty tła -->
    <div class="projects-gradients">
      <Gradient variant="primary" size="xl" opacity={0.3} class="gradient-1" />
      <Gradient variant="accent" size="lg" opacity={0.2} class="gradient-2" />
    </div>
    
    <div class="container">
      <div class="projects-header">
        <h2 class="section-title" bind:this={sectionTitle}>{$t('projects.title')}</h2>
        <p class="section-subtitle" bind:this={sectionSubtitle}>{$t('projects.subtitle')}</p>
      </div>
      
      <div class="projects-content" bind:this={projectCardsWrapper}>
        {#each limitedProjects as project}
          <Card variant="outlined" hover={true} class="project-card">
            <div class="project-card-content">
              <div class="project-image-wrapper">
                <div class="project-image-placeholder" style="background-color: {project.color}"></div>
              </div>
              <div class="project-info">
                <h3 class="project-title">{$t(project.title)}</h3>
                <p class="project-description">{$t(project.description)}</p>
              </div>
            </div>
          </Card>
        {/each}
      </div>
      
      {#if limit < projects.length || limit === projects.length}
      <div class="projects-footer">
        <Button variant="outline" href="#/projects">{$t('projects.cta')}</Button>
      </div>
      {/if}
    </div>
  </section>
  
  <style>
    .projects {
      padding: var(--spacing-3xl) 0;
      position: relative;
      overflow: hidden;
    }
    
    .projects-gradients {
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
      top: -30%;
      left: -20%;
    }
    
    .gradient-2 {
      position: absolute;
      bottom: -10%;
      right: -10%;
    }
    
    .projects-header {
      text-align: center;
      margin-bottom: var(--spacing-2xl);
    }
    
    .section-title {
      font-size: var(--text-3xl);
      font-weight: var(--font-bold);
      color: var(--color-text-primary);
      margin-bottom: var(--spacing-md);
      opacity: 0;
    }
    
    .section-subtitle {
      font-size: var(--text-lg);
      color: var(--color-text-secondary);
      max-width: 600px;
      margin: 0 auto var(--spacing-xl);
      opacity: 0;
    }
    
    .projects-content {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--spacing-xl);
    }
    
    @media (min-width: 640px) {
      .projects-content {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (min-width: 992px) {
      .projects-content {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    
    .project-card {
      opacity: 0;
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
    }
    
    .project-title {
      font-size: var(--text-lg);
      font-weight: var(--font-semibold);
      margin-bottom: var(--spacing-sm);
      color: var(--color-text-primary);
    }
    
    .project-description {
      color: var(--color-text-secondary);
      margin: 0;
      line-height: 1.6;
    }
    
    .projects-footer {
      display: flex;
      justify-content: center;
      margin-top: var(--spacing-2xl);
    }
    
    /* Animacje */
    .animate-fade-in {
      animation: fadeIn 1s forwards;
    }
    
    .animate-slide-up {
      animation: slideUp 1s forwards;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  </style>