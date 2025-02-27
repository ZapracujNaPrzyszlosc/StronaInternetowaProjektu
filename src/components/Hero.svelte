<script>
    import { onMount } from 'svelte';
    import { createScrollAnimation } from '$lib/animations.js';
    import Button from './ui/Button.svelte';
    import Gradient from './ui/Gradient.svelte';
    import { t } from '$lib/i18n.js';
    
    // Props
    let {
      class: className = ''
    } = $props();
    
    // Referencje do elementów dla animacji
    let heroTitle;
    let heroSubtitle;
    let heroDescription;
    let heroActions;
    let heroImage;
    
    onMount(() => {
      // Tworzenie animacji dla poszczególnych elementów
      const animateIn = createScrollAnimation('animate-fade-in');
      const animateUp = createScrollAnimation('animate-slide-up');
      
      animateIn(heroTitle);
      setTimeout(() => animateUp(heroSubtitle), 200);
      setTimeout(() => animateUp(heroDescription), 400);
      setTimeout(() => animateUp(heroActions), 600);
      setTimeout(() => animateIn(heroImage), 800);
    });
  </script>
  
  <section class="hero {className}" data-testid="hero">
    <!-- Gradienty tła -->
    <div class="hero-gradients">
      <Gradient variant="primary" size="lg" opacity={0.7} class="gradient-1" />
      <Gradient variant="secondary" size="md" opacity={0.5} class="gradient-2" />
      <Gradient variant="accent" size="xl" opacity={0.4} class="gradient-3" />
    </div>
    
    <div class="container">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title" bind:this={heroTitle}>{$t('hero.title')}</h1>
          <p class="hero-subtitle" bind:this={heroSubtitle}>{$t('hero.subtitle')}</p>
          <p class="hero-description" bind:this={heroDescription}>{$t('hero.description')}</p>
          <div class="hero-actions" bind:this={heroActions}>
            <Button variant="primary" size="lg" href="#/about">{$t('hero.cta')}</Button>
          </div>
        </div>
        
        <div class="hero-image" bind:this={heroImage}>
          <!-- Ilustracja -->
          <img src="/logo.svg" alt="Zapracuj na przyszłość" class="main-image" />
          
          <!-- Unosząca się dekoracja -->
          <div class="floating-elements">
            <div class="floating-element floating-question">?</div>
            <div class="floating-element floating-exclamation">!</div>
            <div class="floating-element floating-star">✦</div>
            <div class="floating-element floating-circle">○</div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <style>
    .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      position: relative;
      overflow: hidden;
      padding: var(--spacing-3xl) 0;
    }
    
    .hero-gradients {
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
      top: -10%;
      right: -10%;
    }
    
    .gradient-2 {
      position: absolute;
      bottom: -10%;
      left: 10%;
    }
    
    .gradient-3 {
      position: absolute;
      top: 40%;
      left: -20%;
    }
    
    .hero-content {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--spacing-2xl);
      align-items: center;
      padding-top: 70px; /* Wysokość nagłówka */
    }
    
    @media (min-width: 992px) {
      .hero-content {
        grid-template-columns: 1fr 1fr;
      }
    }
    
    .hero-text {
      padding: var(--spacing-xl) 0;
    }
    
    .hero-title {
      font-size: var(--text-4xl);
      font-weight: var(--font-bold);
      margin-bottom: var(--spacing-md);
      color: var(--color-text-primary);
      opacity: 0;
    }
    
    @media (min-width: 768px) {
      .hero-title {
        font-size: var(--text-5xl);
      }
    }
    
    .hero-subtitle {
      font-size: var(--text-xl);
      font-weight: var(--font-medium);
      margin-bottom: var(--spacing-md);
      color: var(--color-primary);
      opacity: 0;
    }
    
    .hero-description {
      font-size: var(--text-lg);
      margin-bottom: var(--spacing-xl);
      color: var(--color-text-secondary);
      max-width: 500px;
      opacity: 0;
    }
    
    .hero-actions {
      display: flex;
      gap: var(--spacing-md);
      opacity: 0;
    }
    
    .hero-image {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      opacity: 0;
    }
    
    .main-image {
      width: 100%;
      max-width: 400px;
      height: auto;
      z-index: 1;
    }
    
    /* Animowane elementy unoszące się */
    .floating-elements {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    
    .floating-element {
      position: absolute;
      font-size: 2rem;
      opacity: 0.7;
      animation-duration: 3s;
      animation-iteration-count: infinite;
      animation-timing-function: ease-in-out;
    }
    
    .floating-question {
      top: 20%;
      left: 15%;
      color: var(--color-accent-blue);
      animation-name: float1;
      font-size: 2.5rem;
    }
    
    .floating-exclamation {
      bottom: 25%;
      right: 10%;
      color: var(--color-accent-orange);
      animation-name: float2;
      animation-delay: 0.5s;
    }
    
    .floating-star {
      top: 10%;
      right: 20%;
      color: var(--color-accent-pink);
      animation-name: float3;
      animation-delay: 1s;
    }
    
    .floating-circle {
      bottom: 15%;
      left: 20%;
      color: var(--color-secondary);
      animation-name: float4;
      animation-delay: 1.5s;
    }
    
    @keyframes float1 {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-15px) rotate(5deg); }
    }
    
    @keyframes float2 {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(15px) rotate(-5deg); }
    }
    
    @keyframes float3 {
      0%, 100% { transform: translateX(0) rotate(0deg); }
      50% { transform: translateX(-15px) rotate(10deg); }
    }
    
    @keyframes float4 {
      0%, 100% { transform: translateX(0) rotate(0deg); }
      50% { transform: translateX(15px) rotate(-10deg); }
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