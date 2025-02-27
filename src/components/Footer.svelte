<script>
    import { t } from '$lib/i18n.js';
    
    // Props
    let {
      class: className = ''
    } = $props();
    
    const currentYear = new Date().getFullYear();
  </script>
  
  <footer class="footer {className}" data-testid="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
            <a href="#/" aria-label="Zapracuj na przyszłość - Strona główna">
                <img src="/logo.svg" alt="Zapracuj na przyszłość" width="60" height="60" />
              </a>
          <p class="footer-tagline">Zapracuj na przyszłość</p>
          <p class="footer-subtitle">Olimpiada Zwolnionych z Teorii</p>
        </div>
        
        <div class="footer-links">
          <div class="footer-links-section">
            <h3 class="footer-heading">Nawigacja</h3>
            <ul class="footer-nav">
                <li><a href="#/">{$t('nav.home')}</a></li>
                <li><a href="#/about">{$t('nav.about')}</a></li>
                <li><a href="#/projects">{$t('nav.projects')}</a></li>
                <li><a href="#/contact">{$t('nav.contact')}</a></li>
              </ul>
          </div>
          
          <div class="footer-links-section">
            <h3 class="footer-heading">Kontakt</h3>
            <ul class="footer-nav">
              <li><a href="mailto:kontakt@zapracujnaprzyszlosc.pl">{$t('contact.info.email')}</a></li>
              <li><a href="tel:+48123456789">{$t('contact.info.phone')}</a></li>
              <li>{$t('contact.info.address')}</li>
            </ul>
          </div>
          
          <div class="footer-links-section">
            <h3 class="footer-heading">Obserwuj nas</h3>
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
      
      <div class="footer-bottom">
        <p class="copyright">&copy; {currentYear} Zapracuj na przyszłość. {$t('footer.rights')}</p>
        <div class="legal-links">
            <a href="#/cookies">{$t('footer.cookies')}</a>
            <a href="#/privacy">{$t('footer.privacy')}</a>
            <a href="#/terms">{$t('footer.terms')}</a>
          </div>
      </div>
    </div>
  </footer>
  
  <style>
    .footer {
      background-color: var(--color-bg-secondary);
      padding: var(--spacing-3xl) 0 var(--spacing-xl);
      position: relative;
      overflow: hidden;
      border-top: 1px solid var(--color-border);
    }
    
    .footer::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at top right, var(--color-primary) 0%, transparent 70%);
      opacity: 0.1;
      z-index: 0;
    }
    
    .footer-content {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--spacing-xl);
      position: relative;
      z-index: 1;
    }
    
    @media (min-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr 2fr;
      }
    }
    
    .footer-logo {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    
    .footer-tagline {
      font-weight: var(--font-bold);
      font-size: var(--text-lg);
      margin: var(--spacing-md) 0 var(--spacing-xs);
    }
    
    .footer-subtitle {
      color: var(--color-text-secondary);
      font-size: var(--text-sm);
      margin: 0;
    }
    
    .footer-links {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--spacing-xl);
    }
    
    .footer-heading {
      font-size: var(--text-base);
      font-weight: var(--font-semibold);
      margin-bottom: var(--spacing-md);
      color: var(--color-text-primary);
    }
    
    .footer-nav {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
    }
    
    .footer-nav a {
      color: var(--color-text-secondary);
      text-decoration: none;
      transition: color var(--duration-fast) var(--ease-out);
    }
    
    .footer-nav a:hover {
      color: var(--color-primary);
    }
    
    .social-links {
      display: flex;
      gap: var(--spacing-md);
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
    
    .footer-bottom {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding-top: var(--spacing-xl);
      margin-top: var(--spacing-xl);
      border-top: 1px solid var(--color-border);
      text-align: center;
      position: relative;
      z-index: 1;
    }
    
    @media (min-width: 768px) {
      .footer-bottom {
        flex-direction: row;
      }
    }
    
    .copyright {
      color: var(--color-text-secondary);
      font-size: var(--text-sm);
      margin: 0;
    }
    
    .legal-links {
      display: flex;
      gap: var(--spacing-md);
      margin-top: var(--spacing-md);
    }
    
    @media (min-width: 768px) {
      .legal-links {
        margin-top: 0;
      }
    }
    
    .legal-links a {
      color: var(--color-text-secondary);
      font-size: var(--text-sm);
      text-decoration: none;
      transition: color var(--duration-fast) var(--ease-out);
    }
    
    .legal-links a:hover {
      color: var(--color-primary);
    }
  </style>