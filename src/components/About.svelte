<script>
    import { onMount } from 'svelte';
    import { createScrollAnimation } from '$lib/animations.js';
    import Card from './ui/Card.svelte';
    import Gradient from './ui/Gradient.svelte';
    import BlurElement from './ui/BlurElement.svelte';
    import { t } from '$lib/i18n.js';
    
    // Props
    let {
      class: className = ''
    } = $props();
    
    // Referencje do elementów dla animacji
    let sectionTitle;
    let missionCard;
    let visionCard;
    let goalsCard;
    
    onMount(() => {
      // Tworzenie animacji dla poszczególnych elementów
      const fadeIn = createScrollAnimation('animate-fade-in');
      const slideUp = createScrollAnimation('animate-slide-up');
      
      fadeIn(sectionTitle);
      setTimeout(() => slideUp(missionCard), 200);
      setTimeout(() => slideUp(visionCard), 400);
      setTimeout(() => slideUp(goalsCard), 600);
    });
    
    // Cele projektu
    const goals = [
      { key: 'about.goals.item1', icon: '🎓' },
      { key: 'about.goals.item2', icon: '🚀' },
      { key: 'about.goals.item3', icon: '🤝' },
      { key: 'about.goals.item4', icon: '💡' }
    ];
  </script>
  
  <section class="about {className}" id="about" data-testid="about">
    <!-- Gradienty tła -->
    <div class="about-gradients">
      <Gradient variant="secondary" size="lg" opacity={0.4} class="gradient-1" />
      <Gradient variant="accent" size="md" opacity={0.3} class="gradient-2" />
    </div>
    
    <div class="container">
      <div class="about-header">
        <h2 class="section-title" bind:this={sectionTitle}>{$t('about.title')}</h2>
      </div>
      
      <div class="about-content">
        <!-- Misja -->
        <Card variant="elevated" hover={true} class="about-card" bind:this={missionCard}>
          <div class="card-content">
            <div class="card-icon">
              <span class="icon-bg">🎯</span>
            </div>
            <h3 class="card-title">{$t('about.mission.title')}</h3>
            <p class="card-description">{$t('about.mission.description')}</p>
          </div>
        </Card>
        
        <!-- Wizja -->
        <Card variant="elevated" hover={true} class="about-card" bind:this={visionCard}>
          <div class="card-content">
            <div class="card-icon">
              <span class="icon-bg">🔭</span>
            </div>
            <h3 class="card-title">{$t('about.vision.title')}</h3>
            <p class="card-description">{$t('about.vision.description')}</p>
          </div>
        </Card>
        
        <!-- Cele -->
        <BlurElement class="goals-container" intensity="sm" glass={true} bind:this={goalsCard}>
          <div class="goals-content">
            <h3 class="goals-title">{$t('about.goals.title')}</h3>
            <ul class="goals-list">
              {#each goals as goal}
                <li class="goal-item">
                  <span class="goal-icon">{goal.icon}</span>
                  <span class="goal-text">{$t(goal.key)}</span>
                </li>
              {/each}
            </ul>
          </div>
        </BlurElement>
      </div>
    </div>
  </section>
  
  <style>
    .about {
      padding: var(--spacing-3xl) 0;
      position: relative;
      overflow: hidden;
    }
    
    .about-gradients {
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
      bottom: -20%;
      right: -10%;
    }
    
    .gradient-2 {
      position: absolute;
      top: 10%;
      left: -10%;
    }
    
    .about-header {
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
    
    .about-content {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--spacing-xl);
    }
    
    @media (min-width: 768px) {
      .about-content {
        grid-template-columns: 1fr 1fr;
      }
      
      .goals-container {
        grid-column: 1 / -1;
      }
    }
    
    .about-card {
      opacity: 0;
      height: 100%;
    }
    
    .card-content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      height: 100%;
    }
    
    .card-icon {
      margin-bottom: var(--spacing-md);
    }
    
    .icon-bg {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      height: 60px;
      border-radius: var(--radius-full);
      background-color: var(--primary-light);
      font-size: 1.75rem;
    }
    
    .card-title {
      font-size: var(--text-xl);
      font-weight: var(--font-semibold);
      margin-bottom: var(--spacing-md);
      color: var(--color-text-primary);
    }
    
    .card-description {
      color: var(--color-text-secondary);
      margin: 0;
      line-height: 1.6;
    }
    
    .goals-container {
      padding: var(--spacing-xl);
      opacity: 0;
    }
    
    .goals-content {
      width: 100%;
    }
    
    .goals-title {
      font-size: var(--text-xl);
      font-weight: var(--font-semibold);
      margin-bottom: var(--spacing-lg);
      color: var(--color-text-primary);
      text-align: center;
    }
    
    .goals-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--spacing-lg);
    }
    
    @media (min-width: 768px) {
      .goals-list {
        grid-template-columns: 1fr 1fr;
      }
    }
    
    .goal-item {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
    }
    
    .goal-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: var(--radius-full);
      background-color: var(--primary-light);
      font-size: 1.25rem;
      flex-shrink: 0;
    }
    
    .goal-text {
      color: var(--color-text-primary);
      line-height: 1.5;
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