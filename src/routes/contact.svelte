<script>
    import Contact from '../components/Contact.svelte';
    import Gradient from '../components/ui/Gradient.svelte';
    import BlurElement from '../components/ui/BlurElement.svelte';
    import { t } from '../lib/i18n.js';
  </script>
  
  <svelte:head>
    <title>Zapracuj na przyszłość | Kontakt</title>
    <meta name="description" content="Skontaktuj się z nami - masz pytania? Chcesz dołączyć do projektu? Napisz do nas lub zadzwoń." />
  </svelte:head>
  
  <main>
    <section class="page-header">
      <div class="page-header-gradients">
        <Gradient variant="primary" size="lg" opacity={0.4} class="gradient-1" />
        <Gradient variant="accent" size="md" opacity={0.3} class="gradient-2" />
      </div>
      
      <div class="container">
        <BlurElement glass={true} intensity="md" class="page-title-container">
          <h1 class="page-title">{$t('contact.title')}</h1>
          <p class="page-subtitle">{$t('contact.subtitle')}</p>
        </BlurElement>
      </div>
    </section>
    
    <Contact class="contact-full-page" />
    
    <!-- Sekcja FAQ -->
    <section class="faq-section">
      <div class="container">
        <h2 class="faq-title">Najczęściej zadawane pytania</h2>
        
        <div class="faq-list">
          <BlurElement glass={true} intensity="sm" class="faq-item">
            <details class="faq-details">
              <summary class="faq-question">Jak mogę dołączyć do projektu jako wolontariusz?</summary>
              <div class="faq-answer">
                <p>Aby dołączyć do naszego zespołu jako wolontariusz, wypełnij formularz kontaktowy na tej stronie, zaznaczając w treści wiadomości, że interesuje Cię wolontariat. Nasz koordynator skontaktuje się z Tobą w ciągu 3 dni roboczych, aby omówić szczegóły współpracy.</p>
              </div>
            </details>
          </BlurElement>
          
          <BlurElement glass={true} intensity="sm" class="faq-item">
            <details class="faq-details">
              <summary class="faq-question">Czy warsztaty i szkolenia są płatne?</summary>
              <div class="faq-answer">
                <p>Większość naszych warsztatów i szkoleń jest bezpłatna dla uczestników, dzięki wsparciu naszych partnerów i sponsorów. W przypadku niektórych specjalistycznych kursów może być wymagana symboliczna opłata. Szczegółowe informacje o kosztach znajdziesz w opisie każdego wydarzenia.</p>
              </div>
            </details>
          </BlurElement>
          
          <BlurElement glass={true} intensity="sm" class="faq-item">
            <details class="faq-details">
              <summary class="faq-question">Jak mogę zostać mentorem w programie mentoringowym?</summary>
              <div class="faq-answer">
                <p>Jeśli masz doświadczenie zawodowe i chciałbyś podzielić się swoją wiedzą z młodymi ludźmi, zachęcamy do zostania mentorem. Skontaktuj się z nami poprzez formularz na tej stronie, opisując swoje doświadczenie i obszary, w których mógłbyś mentorować. Nasz zespół przygotuje dla Ciebie wszystkie niezbędne informacje i materiały.</p>
              </div>
            </details>
          </BlurElement>
          
          <BlurElement glass={true} intensity="sm" class="faq-item">
            <details class="faq-details">
              <summary class="faq-question">Czy projekty są dostępne tylko dla uczniów i studentów?</summary>
              <div class="faq-answer">
                <p>Nasze projekty są skierowane głównie do uczniów szkół średnich i studentów, ale niektóre wydarzenia, jak np. targi pracy czy warsztaty, są otwarte dla wszystkich zainteresowanych rozwojem zawodowym. Szczegółowe informacje o grupach docelowych znajdziesz w opisie poszczególnych projektów.</p>
              </div>
            </details>
          </BlurElement>
          
          <BlurElement glass={true} intensity="sm" class="faq-item">
            <details class="faq-details">
              <summary class="faq-question">Jak mogę wesprzeć finansowo projekt?</summary>
              <div class="faq-answer">
                <p>Jeśli chcesz wesprzeć nasz projekt finansowo lub materialnie, skontaktuj się z nami bezpośrednio. Jesteśmy otwarci na różne formy współpracy i sponsoringu. Twoje wsparcie pomoże nam rozszerzyć działalność i dotrzeć do większej liczby młodych ludzi.</p>
              </div>
            </details>
          </BlurElement>
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
      margin: 0 0 var(--spacing-sm);
    }
    
    .page-subtitle {
      font-size: var(--text-lg);
      color: var(--color-text-secondary);
      margin: 0;
    }
    
    .contact-full-page {
      padding-top: 0;
    }
    
    /* FAQ Section */
    .faq-section {
      padding: var(--spacing-2xl) 0 var(--spacing-3xl);
      background-color: var(--color-bg-secondary);
    }
    
    .faq-title {
      font-size: var(--text-2xl);
      font-weight: var(--font-bold);
      text-align: center;
      margin-bottom: var(--spacing-2xl);
    }
    
    .faq-list {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--spacing-md);
      max-width: 800px;
      margin: 0 auto;
    }
    
    .faq-item {
      border-radius: var(--radius-lg);
      overflow: hidden;
    }
    
    .faq-details {
      width: 100%;
    }
    
    .faq-question {
      padding: var(--spacing-md) var(--spacing-lg);
      font-weight: var(--font-medium);
      font-size: var(--text-lg);
      cursor: pointer;
      list-style: none;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    .faq-question::after {
      content: '+';
      font-size: var(--text-xl);
      color: var(--color-text-secondary);
      transition: transform var(--duration-fast) var(--ease-out);
    }
    
    .faq-details[open] .faq-question::after {
      transform: rotate(45deg);
    }
    
    .faq-answer {
      padding: 0 var(--spacing-lg) var(--spacing-md);
    }
    
    .faq-answer p {
      margin: 0;
      color: var(--color-text-secondary);
      line-height: 1.6;
    }
  </style>