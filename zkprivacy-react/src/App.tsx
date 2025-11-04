import React, { useState } from 'react';
import WelcomeNotification from './components/WelcomeNotification';
import HeroSection from './components/HeroSection';
import CryptoList from './components/CryptoList';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [showWelcome, setShowWelcome] = useState(() => {
    // Check if welcome notification was already shown
    const hasShownWelcome = localStorage.getItem('zkprivacy-welcome-shown');
    return !hasShownWelcome;
  });

  const handleCloseWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem('zkprivacy-welcome-shown', 'true');
  };

  return (
    <div className="App">
      {showWelcome && <WelcomeNotification onClose={handleCloseWelcome} />}
      <HeroSection />
      <CryptoList />
      <Footer />
    </div>
  );
}

export default App;
