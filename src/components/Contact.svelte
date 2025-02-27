<script>
    import { onMount } from 'svelte';
    import { createScrollAnimation } from '$lib/animations.js';
    import Button from './ui/Button.svelte';
    import BlurElement from './ui/BlurElement.svelte';
    import Gradient from './ui/Gradient.svelte';
    import { t } from '$lib/i18n.js';
    
    // Props
    let {
      class: className = ''
    } = $props();
    
    // Referencje do elementów dla animacji
    let sectionTitle;
    let sectionSubtitle;
    let contactForm;
    let contactInfo;
    
    // Stan formularza
    let name = $state('');
    let email = $state('');
    let message = $state('');
    let isSubmitting = $state(false);
    let formSubmitted = $state(false);
    let formError = $state(null);
    
    // Obsługa formularza
    function handleSubmit(event) {
      event.preventDefault();
      
      // Walidacja formularza
      if (!name || !email || !message) {
        formError = 'Wypełnij wszystkie pola formularza';
        return;
      }
      
      if (!validateEmail(email)) {
        formError = 'Podaj poprawny adres e-mail';
        return;
      }
      
      // Reset błędów
      formError = null;
      isSubmitting = true;
      
      // Symulacja wysyłki formularza
      setTimeout(() => {
        isSubmitting = false;
        formSubmitted = true;
        
        // Reset formularza
        name = '';
        email = '';
        message = '';
        
        // Ukryj komunikat po 5 sekundach
        setTimeout(() => {
          formSubmitted = false;
        }, 5000);
      }, 1000);
    }
    
    // Prosta walidacja e-mail
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }
    
    onMount(() => {
      // Animacje
      const fadeIn = createScrollAnimation('animate-fade-in');
      const slideUp = createScrollAnimation('animate-slide-up');
      
      fadeIn(sectionTitle);
      setTimeout(() => fadeIn(sectionSubtitle), 200);
      setTimeout(() => slideUp(contactForm), 400);
      setTimeout(() => slideUp(contactInfo), 600);
    });
  </script>
  
  <section class="contact {className}" id="contact" data-testid="contact">
    <!-- Gradienty tła -->
    <div class="contact-gradients">
      <Gradient variant="primary" size="lg" opacity={0.3} class="gradient-1" />
      <Gradient variant="secondary" size="md" opacity={0.2} class="gradient-2" />
    </div>
    
    <div class="container">
      <div class="contact-header">
        <h2 class="section-title" bind:this={sectionTitle}>{$t('contact.title')}</h2>
        <p class="section-subtitle" bind:this={sectionSubtitle}>{$t('contact.subtitle')}</p>
      </div>
      
      <div class="contact-content">
        <!-- Formularz kontaktowy -->
        <BlurElement glass={true} intensity="md" class="contact-form-container" bind:this={contactForm}>
          <form class="contact-form" on:submit={handleSubmit}>
            <div class="form-group">
              <label for="name">{$t('contact.form.name')}</label>
              <input 
                type="text" 
                id="name" 
                bind:value={name} 
                required
                disabled={isSubmitting}
              />
            </div>
            
            <div class="form-group">
              <label for="email">{$t('contact.form.email')}</label>
              <input 
                type="email" 
                id="email" 
                bind:value={email} 
                required
                disabled={isSubmitting}
              />
            </div>
            
            <div class="form-group">
              <label for="message">{$t('contact.form.message')}</label>
              <textarea 
                id="message" 
                bind:value={message} 
                rows="5" 
                required
                disabled={isSubmitting}
              ></textarea>
            </div>
            
            {#if formError}
              <div class="form-error">
                {formError}
              </div>
            {/if}
            
            {#if formSubmitted}
              <div class="form-success">
                Dziękujemy za wiadomość! Odpowiemy najszybciej jak to możliwe.
              </div>
            {/if}
            
            <div class="form-submit">
              <Button 
                type="submit" 
                variant="primary" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Wysyłanie...' : $t('contact.form.submit')}
              </Button>
            </div>
          </form>
        </BlurElement>
        
        <!-- Informacje kontaktowe -->
        <div class="contact-info" bind:this={contactInfo}>
          <h3 class="contact-info-title">{$t('contact.info.title')}</h3>
          
          <div class="contact-info-items">
            <div class="contact-info-item">
              <div class="contact-info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div class="contact-info-content">
                <h4 class="contact-info-label">Email</h4>
                <a href="mailto:kontakt@zapracujnaprzyszlosc.pl" class="contact-info-value">
                  {$t('contact.info.email')}
                </a>
              </div>
            </div>
            
            <div class="contact-info-item">
              <div class="contact-info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div class="contact-info-content">
                <h4 class="contact-info-label">Telefon</h4>
                <a href="tel:+48123456789" class="contact-info-value">
                  {$t('contact.info.phone')}
                </a>
              </div>
            </div>
            
            <div class="contact-info-item">
              <div class="contact-info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div class="contact-info-content">
                <h4 class="contact-info-label">Adres</h4>
                <p class="contact-info-value">
                  {$t('contact.info.address')}
                </p>
              </div>
            </div>
          </div>
          
          <div class="social-links">
            <a href="https://facebook.com" aria-label="Facebook" class="social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="https://instagram.com" aria-label="Instagram" class="social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn" class="social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <style>
    .contact {
      padding: var(--spacing-3xl) 0;
      position: relative;
      overflow: hidden;
    }
    
    .contact-gradients {
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
      bottom: 0%;
      left: -10%;
    }
    
    .gradient-2 {
      position: absolute;
      top: 20%;
      right: -10%;
    }
    
    .contact-header {
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
      margin: 0 auto;
      opacity: 0;
    }
    
    .contact-content {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--spacing-2xl);
    }
    
    @media (min-width: 992px) {
      .contact-content {
        grid-template-columns: 1.5fr 1fr;
      }
    }
    
    /* Formularz */
    .contact-form-container {
      padding: var(--spacing-xl);
      opacity: 0;
    }
    
    .contact-form {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
    }
    
    .form-group {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
    }
    
    .form-group label {
      font-weight: var(--font-medium);
      color: var(--color-text-primary);
    }
    
    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: var(--spacing-sm) var(--spacing-md);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      background-color: var(--color-bg-primary);
      color: var(--color-text-primary);
      font-family: var(--font-sans);
      font-size: var(--text-base);
      transition: all var(--duration-fast) var(--ease-out);
    }
    
    .form-group input:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-primary) 20%, transparent);
    }
    
    .form-error {
      color: #e53e3e;
      font-size: var(--text-sm);
      padding: var(--spacing-sm);
      background-color: color-mix(in srgb, #e53e3e 10%, transparent);
      border-radius: var(--radius-md);
    }
    
    .form-success {
      color: #38a169;
      font-size: var(--text-sm);
      padding: var(--spacing-sm);
      background-color: color-mix(in srgb, #38a169 10%, transparent);
      border-radius: var(--radius-md);
    }
    
    .form-submit {
      margin-top: var(--spacing-md);
    }
    
    /* Informacje kontaktowe */
    .contact-info {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xl);
      opacity: 0;
    }
    
    .contact-info-title {
      font-size: var(--text-xl);
      font-weight: var(--font-semibold);
      color: var(--color-text-primary);
      margin-bottom: var(--spacing-lg);
    }
    
    .contact-info-items {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg);
    }
    
    .contact-info-item {
      display: flex;
      gap: var(--spacing-md);
    }
    
    .contact-info-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: var(--radius-full);
      background-color: var(--primary-light);
      color: var(--color-text-primary);
      flex-shrink: 0;
    }
    
    .contact-info-content {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
    }
    
    .contact-info-label {
      font-weight: var(--font-medium);
      color: var(--color-text-primary);
      margin: 0;
    }
    
    .contact-info-value {
      color: var(--color-text-secondary);
      text-decoration: none;
      transition: color var(--duration-fast) var(--ease-out);
    }
    
    .contact-info-value:hover {
      color: var(--color-primary);
    }
    
    /* Social icons */
    .social-links {
      display: flex;
      gap: var(--spacing-md);
      margin-top: var(--spacing-xl);
    }
    
    .social-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: var(--radius-full);
      background-color: var(--color-bg-tertiary);
      color: var(--color-text-primary);
      transition: all var(--duration-fast) var(--ease-out);
    }
    
    .social-link:hover {
      background-color: var(--color-primary);
      color: var(--color-text-primary);
      transform: translateY(-2px);
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