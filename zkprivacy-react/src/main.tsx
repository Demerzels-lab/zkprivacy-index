import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Add simple animations and interactions
document.addEventListener('DOMContentLoaded', function() {
    console.log('ZKPrivacy Index React loaded successfully');
    
    // Add simple coin card interactions
    const coinCards = document.querySelectorAll('.coin-card');
    
    coinCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.addEventListener('click', function() {
            const coinName = this.querySelector('h4')?.textContent;
            alert(`${coinName} - Analytics coming soon!`);
        });
    });
});