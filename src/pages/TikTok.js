import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function TikTok() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Dane TikToków z bezpośrednimi linkami do wideo
  const tiktokData = [
    {
      id: 1,
      title: "Wywiad z międzynarodową planerką ślubów",
      description: "Poznaj kulisy pracy międzynarodowej planerki ślubów! Jakie umiejętności są niezbędne w tym zawodzie? Jak wygląda organizacja ceremonii w różnych krajach? Dowiedz się, jak rozpocząć karierę w tej branży.",
      embedUrl: "https://www.tiktok.com/embed/v2/7455328205524831510",
      views: "22.8K"
    },
    {
      id: 2,
      title: "Wywiad z pilotem samolotu",
      description: "Jak wygląda praca pilota na co dzień? Dowiedz się o wymaganiach, szkoleniach i wyzwaniach w tej profesji. Poznaj specyfikę latania różnymi maszynami, procedury bezpieczeństwa oraz jak zaplanować karierę w lotnictwie od pierwszych kroków do stanowiska kapitana.",
      embedUrl: "https://www.tiktok.com/embed/v2/7456826488516644118",
      views: "8.3K"
    },
    {
      id: 3,
      title: "Wywiad z dyrektorką sprzedaży czasu reklamowego",
      description: "Jak wygląda praca w sprzedaży czasu reklamowego? Jakie są wyzwania na stanowisku dyrektora i jak efektywnie zarządzać zespołem sprzedażowym? Poznaj tajniki marketingu i reklamy od strony biznesowej.",
      embedUrl: "https://www.tiktok.com/embed/v2/7440874750055828758",
      views: "11.5K"
    },
    {
      id: 4,
      title: "Wywiad z grafikiem komputerowym",
      description: "Jak zostać grafikiem komputerowym? Jakimi programami warto się posługiwać i jak rozwijać swoje portfolio? Dowiedz się, jakie umiejętności są najbardziej poszukiwane na rynku i jak wygląda typowy dzień pracy grafika.",
      embedUrl: "https://www.tiktok.com/embed/v2/7453490391128526102",
      views: "15.2K"
    },
    {
      id: 5,
      title: "Wywiad z koordynatorką sprzedaży mebli",
      description: "Na czym polega praca koordynatora sprzedaży w branży meblarskiej? Jak zarządzać procesem sprzedaży i logistyką? Poznaj wymagania i codzienne zadania osoby na tym stanowisku oraz ścieżki rozwoju kariery.",
      embedUrl: "https://www.tiktok.com/embed/v2/7449853144714005793",
      views: "19.7K"
    },
    {
      id: 6,
      title: "Kim jesteśmy",
      description: "Poznaj nasz zespół i dowiedz się więcej o projekcie 'Zapracuj na przyszłość'. Jaki jest nasz cel i dlaczego zdecydowaliśmy się na realizację tego projektu? Jakie zawody chcemy jeszcze przedstawić w przyszłości?",
      embedUrl: "https://www.tiktok.com/embed/v2/7437882349603310870",
      views: "13.4K"
    }
  ];
  
  useEffect(() => {
    document.title = 'Zapracuj na przyszłość | Nasze TikToki';
    
    // Symulacja ładowania
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="tiktok-page">
      <section className="tiktok-hero">
        <div className="container">
          <motion.div
            className="tiktok-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>Nasze TikToki</h1>
            <p className="tiktok-subtitle">Zobacz, jak wygląda praca w różnych branżach poprzez wywiady z profesjonalistami</p>
          </motion.div>
        </div>
        <div className="tiktok-hero-bg">
          <div className="gradient-overlay"></div>
        </div>
      </section>

      <section className="tiktok-content">
        <div className="container">
          {isLoading ? (
            <div className="loading-container">
              <div className="loader"></div>
              <p>Ładowanie TikToków...</p>
            </div>
          ) : (
            <>
              <div className="tiktok-list">
                {tiktokData.map((tiktok, index) => (
                  <motion.div
                    key={tiktok.id}
                    className={`tiktok-item ${index % 2 === 0 ? 'left-video' : 'right-video'}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                  >
                    <div className="tiktok-video">
                      <iframe 
                        src={tiktok.embedUrl}
                        height="600" 
                        frameBorder="0"
                        allowFullScreen 
                        scrolling="no" 
                        allow="encrypted-media;"
                        title={`TikTok ${tiktok.title}`}
                      ></iframe>
                    </div>
                    <div className="tiktok-info">
                      <h3 className="tiktok-title">{tiktok.title}</h3>
                      <span className="tiktok-views">{tiktok.views} wyświetleń</span>
                      <p className="tiktok-description">{tiktok.description}</p>
                      <a 
                        href={`https://www.tiktok.com/@zapracuj.na.przyszlosc`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn btn-secondary btn-sm"
                      >
                        Zobacz na TikToku
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="tiktok-follow">
                <motion.div
                  className="follow-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <h2>Chcesz zobaczyć więcej?</h2>
                  <p>Obserwuj nas na TikToku, aby być na bieżąco z nowymi wywiadami i treściami!</p>
                  <a href="https://www.tiktok.com/@zapracuj.na.przyszlosc" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon">
                      <path d="M19.321 5.562C18.1707 4.42133 17.5587 2.86067 17.592 1.20667H13.1953V16.3267C13.1853 17.102 12.884 17.8453 12.3587 18.3947C11.8333 18.944 11.1213 19.2733 10.3467 19.318C10.146 19.324 9.942 19.304 9.74467 19.258C8.70867 19.096 7.78067 18.456 7.23733 17.5233C7.19503 17.457 7.15237 17.391 7.10933 17.3247C6.65999 16.495 6.56399 15.5137 6.84667 14.6027C7.13067 13.6863 7.78267 12.9167 8.652 12.498C9.48867 12.0997 10.4613 12.0843 11.3033 12.4747V8.00533C11.0047 7.96067 10.7047 7.95333 10.404 7.97933C9.18933 8.05267 8.01067 8.44667 6.97933 9.12467C5.68533 9.95667 4.66533 11.1507 4.0587 12.5783C3.71467 13.402 3.52667 14.276 3.49933 15.162C3.48667 15.518 3.50267 15.876 3.54733 16.2313C3.68067 17.2347 4.03067 18.208 4.57467 19.074C5.43467 20.4167 6.732 21.4413 8.24733 21.976C9.18867 22.3113 10.1807 22.4553 11.172 22.3993C12.3047 22.3313 13.418 22.0393 14.4347 21.5453C15.8593 20.856 17.0627 19.7613 17.912 18.3993C18.5387 17.3933 18.918 16.2593 19.022 15.0907C19.0567 14.762 19.0727 14.4307 19.0673 14.0987V7.0887C19.396 7.35667 19.7407 7.6 20.0973 7.81867C21.2333 8.508 22.5033 8.92067 23.8333 9.04V4.65733C22.304 4.52133 20.8427 4.03067 19.5513 3.218C19.3873 4.01333 19.058 4.77067 18.5793 5.4387C18.8407 5.46533 19.0827 5.51667 19.321 5.562Z" fill="currentColor"/>
                    </svg>
                    Obserwuj na TikToku
                  </a>
                </motion.div>
              </div>
            </>
          )}
        </div>
        <div className="tiktok-content-bg">
          <div className="glass-effect"></div>
        </div>
      </section>
    </div>
  );
}

export default TikTok;