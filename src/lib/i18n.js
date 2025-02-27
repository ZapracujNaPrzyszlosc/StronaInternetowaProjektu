import { derived, writable } from 'svelte/store';

// Dostępne języki
export const languages = {
  pl: 'Polski',
  en: 'English'
};

// Domyślny język
export const defaultLocale = 'pl';

// Store dla aktualnego języka
export const locale = writable(
  typeof localStorage !== 'undefined' && localStorage.getItem('locale')
    ? localStorage.getItem('locale')
    : defaultLocale
);

// Zapisywanie wybranego języka w local storage
locale.subscribe((value) => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('locale', value);
  }
});

// Tłumaczenia
const translations = {
  // Polski (domyślny)
  pl: {
    // Nawigacja
    'nav.home': 'Strona główna',
    'nav.about': 'O projekcie',
    'nav.projects': 'Projekty',
    'nav.contact': 'Kontakt',
    
    // Sekcja główna
    'hero.title': 'Zapracuj na przyszłość',
    'hero.subtitle': 'Projekt społeczny w ramach Olimpiady Zwolnionych z Teorii',
    'hero.description': 'Pomagamy młodym ludziom rozwijać umiejętności zawodowe i przygotować się do wejścia na rynek pracy.',
    'hero.cta': 'Dowiedz się więcej',
    
    // O projekcie
    'about.title': 'O projekcie',
    'about.mission.title': 'Nasza misja',
    'about.mission.description': 'Naszą misją jest wsparcie młodych ludzi w zdobywaniu praktycznych umiejętności zawodowych i ułatwienie im startu na rynku pracy poprzez realizację projektów społecznych.',
    'about.vision.title': 'Nasza wizja',
    'about.vision.description': 'Dążymy do stworzenia społeczności, w której każdy młody człowiek ma dostęp do wiedzy i narzędzi niezbędnych do świadomego planowania swojej ścieżki zawodowej.',
    'about.goals.title': 'Nasze cele',
    'about.goals.item1': 'Organizacja warsztatów rozwoju kompetencji zawodowych',
    'about.goals.item2': 'Mentoring i wsparcie w planowaniu kariery',
    'about.goals.item3': 'Nawiązywanie współpracy z pracodawcami',
    'about.goals.item4': 'Promocja przedsiębiorczości wśród młodzieży',
    
    // Projekty
    'projects.title': 'Nasze projekty',
    'projects.subtitle': 'Zobacz, co udało nam się zrealizować',
    'projects.item1.title': 'Warsztaty kariery',
    'projects.item1.description': 'Cykl warsztatów rozwijających umiejętności miękkie i techniczne potrzebne na rynku pracy.',
    'projects.item2.title': 'Program mentoringowy',
    'projects.item2.description': 'Łączymy uczniów z doświadczonymi specjalistami, którzy dzielą się swoją wiedzą i doświadczeniem.',
    'projects.item3.title': 'Targi pracy',
    'projects.item3.description': 'Organizujemy spotkania z pracodawcami, którzy poszukują młodych talentów.',
    'projects.cta': 'Zobacz wszystkie projekty',
    
    // Kontakt
    'contact.title': 'Skontaktuj się z nami',
    'contact.subtitle': 'Masz pytania? Chcesz dołączyć do projektu?',
    'contact.form.name': 'Imię i nazwisko',
    'contact.form.email': 'Adres e-mail',
    'contact.form.message': 'Wiadomość',
    'contact.form.submit': 'Wyślij wiadomość',
    'contact.info.title': 'Informacje kontaktowe',
    'contact.info.email': 'kontakt@zapracujnaprzyszlosc.pl',
    'contact.info.phone': '+48 123 456 789',
    'contact.info.address': 'ul. Przykładowa 1, 00-000 Warszawa',
    
    // Stopka
    'footer.rights': 'Wszelkie prawa zastrzeżone',
    'footer.cookies': 'Polityka cookies',
    'footer.privacy': 'Polityka prywatności',
    'footer.terms': 'Regulamin',
    
    // Inne
    'theme.light': 'Tryb jasny',
    'theme.dark': 'Tryb ciemny',
    'language': 'Język'
  },
  
  // Angielski
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    
    // Hero section
    'hero.title': 'Work for the Future',
    'hero.subtitle': 'Social project as part of the Theory-Exempt Olympics',
    'hero.description': 'We help young people develop professional skills and prepare for entering the job market.',
    'hero.cta': 'Learn more',
    
    // About
    'about.title': 'About the project',
    'about.mission.title': 'Our mission',
    'about.mission.description': 'Our mission is to support young people in acquiring practical professional skills and facilitate their entry into the job market through social projects.',
    'about.vision.title': 'Our vision',
    'about.vision.description': 'We strive to create a community where every young person has access to the knowledge and tools necessary for conscious career planning.',
    'about.goals.title': 'Our goals',
    'about.goals.item1': 'Organizing professional skills development workshops',
    'about.goals.item2': 'Mentoring and support in career planning',
    'about.goals.item3': 'Establishing cooperation with employers',
    'about.goals.item4': 'Promoting entrepreneurship among youth',
    
    // Projects
    'projects.title': 'Our projects',
    'projects.subtitle': 'See what we have accomplished',
    'projects.item1.title': 'Career workshops',
    'projects.item1.description': 'A series of workshops developing soft and technical skills needed in the job market.',
    'projects.item2.title': 'Mentoring program',
    'projects.item2.description': 'We connect students with experienced professionals who share their knowledge and experience.',
    'projects.item3.title': 'Job fairs',
    'projects.item3.description': 'We organize meetings with employers looking for young talents.',
    'projects.cta': 'See all projects',
    
    // Contact
    'contact.title': 'Contact us',
    'contact.subtitle': 'Have questions? Want to join the project?',
    'contact.form.name': 'Full name',
    'contact.form.email': 'Email address',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send message',
    'contact.info.title': 'Contact information',
    'contact.info.email': 'contact@workforthefuture.com',
    'contact.info.phone': '+48 123 456 789',
    'contact.info.address': 'Example St. 1, 00-000 Warsaw, Poland',
    
    // Footer
    'footer.rights': 'All rights reserved',
    'footer.cookies': 'Cookie policy',
    'footer.privacy': 'Privacy policy',
    'footer.terms': 'Terms of service',
    
    // Other
    'theme.light': 'Light mode',
    'theme.dark': 'Dark mode',
    'language': 'Language'
  }
};

// Funkcja tłumacząca
export const t = derived(locale, ($locale) => (key) => {
  // Sprawdzamy, czy klucz istnieje w aktualnym języku
  if ($locale in translations && key in translations[$locale]) {
    return translations[$locale][key];
  }
  
  // Jeśli nie znaleziono tłumaczenia, próbujemy w języku domyślnym
  if (key in translations[defaultLocale]) {
    console.warn(`Translation missing for key "${key}" in locale "${$locale}"`);
    return translations[defaultLocale][key];
  }
  
  // Jeśli w ogóle nie znaleziono klucza, zwracamy sam klucz
  console.error(`Translation key "${key}" not found`);
  return key;
});