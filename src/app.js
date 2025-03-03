import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import TikTok from './pages/TikTok';
import Contact from './pages/Contact';

// Komponent do śledzenia zmiany stron
function PageTracker() {
  const location = useLocation();
  
  useEffect(() => {
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
    <Router>
      <div className="app">
        <PageTracker />
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/tiktok" element={<TikTok />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;