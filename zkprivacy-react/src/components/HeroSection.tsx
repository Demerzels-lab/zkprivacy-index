import React from 'react';
import { Shield, Clock, Lock } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <header className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            PRIVACY CRYPTO ANALYTICS<br />
            FOR A NEW ERA
          </h1>
          <p className="hero-subtitle">Zero-Knowledge Digital Analytics & Privacy Protocol</p>
          <p className="hero-description">
            ZKPrivacy Index turns your crypto portfolio into private, secure & comprehensive analytics. 
            A unified platform enabling real-time tracking, privacy scores, and confidential monitoring 
            with seamless integration into the crypto ecosystem.
          </p>
          
          {/* Key Metrics */}
          <div className="hero-metrics">
            <div className="metric-card">
              <div className="metric-number">9.2</div>
              <div className="metric-label">Privacy Score</div>
            </div>
            <div className="metric-card">
              <div className="metric-number">&lt;1s</div>
              <div className="metric-label">Real-time Updates</div>
            </div>
            <div className="metric-card">
              <div className="metric-number">100%</div>
              <div className="metric-label">Zero Tracking</div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="hero-actions">
            <button className="btn btn-primary">Get Started</button>
            <button className="btn btn-secondary">Learn More</button>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="hero-visual">
          <div className="hero-graphic">
            <div className="hero-icon">
              <Shield size={48} color="var(--primary-500)" />
            </div>
            <div className="hero-icon">
              <Clock size={48} color="var(--primary-400)" />
            </div>
            <div className="hero-icon">
              <Lock size={48} color="var(--primary-300)" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;