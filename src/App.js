import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import TikTok from './pages/TikTok';
import Contact from './pages/Contact';
import SchemaOrg from './components/SEO/SchemaOrg';

// Komponent do śledzenia zmiany stron
function PageTracker() {
  const location = useLocation();
  
  useEffect(() => {
    // Przewijanie do góry strony przy zmianie ścieżki
    window.scrollTo(0, 0);
    
    // Wysyłanie informacji o zmianie strony do dataLayer (GTM)
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'page_view',
        page: {
          path: location.pathname + location.search
        }
      });
    }
  }, [location]);

  return null;
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="app">
          <SchemaOrg />
          <PageTracker />
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/o-nas" element={<About />} />
              <Route path="/tiktok" element={<TikTok />} />
              <Route path="/kontakt" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;