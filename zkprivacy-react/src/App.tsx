import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1 className="main-title">ZKPrivacy Index</h1>
          <p className="subtitle">Privacy-Focused Crypto Analytics Platform</p>
        </header>

        <main className="content">
          <section className="intro">
            <h2>Welcome to ZKPrivacy Index</h2>
            <p>
              A comprehensive platform for analyzing privacy-focused cryptocurrencies. 
              Track, compare, and analyze privacy tokens with advanced analytics and insights.
            </p>
          </section>

          <section className="features">
            <h3>Key Features</h3>
            <ul className="feature-list">
              <li>Real-time privacy coin tracking</li>
              <li>Comprehensive analytics and scoring</li>
              <li>Launch monitoring and notifications</li>
              <li>Privacy-focused investment insights</li>
            </ul>
          </section>

          <section className="privacy-coins">
            <h3>Supported Privacy Cryptocurrencies</h3>
            <div className="coins-grid">
              <div className="coin-card">
                <h4>Monero (XMR)</h4>
                <p>Leading privacy-focused cryptocurrency</p>
              </div>
              <div className="coin-card">
                <h4>Zcash (ZEC)</h4>
                <p>Zero-knowledge proof protocol</p>
              </div>
              <div className="coin-card">
                <h4>Dash (DASH)</h4>
                <p>Privacy-focused digital currency</p>
              </div>
              <div className="coin-card">
                <h4>Beam (BEAM)</h4>
                <p>Privacy-focused Mimblewimble blockchain</p>
              </div>
            </div>
          </section>
        </main>

        <footer className="footer">
          <p>&copy; 2025 ZKPrivacy Index. Privacy-focused crypto analytics.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;