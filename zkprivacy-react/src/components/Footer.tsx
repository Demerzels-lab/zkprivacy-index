import React from 'react';
import { Github, Twitter, MessageCircle, Shield } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <Shield size={32} />
              <span>ZKPrivacy Index</span>
            </div>
            <p className="footer-description">
              Advanced privacy analytics platform for cryptocurrency enthusiasts. 
              Zero-knowledge verification with comprehensive real-time tracking.
            </p>
          </div>
          
          <div className="footer-links">
            <div className="footer-section">
              <h3>Platform</h3>
              <ul>
                <li><a href="#privacy-scores">Privacy Rankings</a></li>
                <li><a href="#how-it-works">How It Works</a></li>
                <li><a href="#analytics">Real-time Analytics</a></li>
                <li><a href="#api">API Access</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h3>Resources</h3>
              <ul>
                <li><a href="#documentation">Documentation</a></li>
                <li><a href="#guides">Privacy Guides</a></li>
                <li><a href="#community">Community</a></li>
                <li><a href="#support">Support</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h3>Connect</h3>
              <ul>
                <li>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <Github size={16} />
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <Twitter size={16} />
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
                    <MessageCircle size={16} />
                    Discord
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-privacy">
            <Shield size={16} />
            <span>100% Privacy-First • No User Tracking • Local Data Processing</span>
          </div>
          <div className="footer-copyright">
            © 2025 ZKPrivacy Index. Built for privacy enthusiasts.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;