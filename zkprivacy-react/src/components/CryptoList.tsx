import React, { useState, useEffect } from 'react';
import { Search, ExternalLink, Github, MessageCircle, Book, X, TrendingUp, Shield } from 'lucide-react';
import { CryptoCurrency } from '../types';

const CryptoList: React.FC = () => {
  const [privacyCoins, setPrivacyCoins] = useState<CryptoCurrency[]>([]);
  const [filteredCoins, setFilteredCoins] = useState<CryptoCurrency[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState<CryptoCurrency | null>(null);

  // Sample privacy coins data
  const sampleCoins: CryptoCurrency[] = [
    {
      id: '1',
      name: 'Monero',
      ticker: 'XMR',
      description: 'Privacy-focused cryptocurrency using ring signatures and stealth addresses',
      launchDate: 'April 2014',
      privacyScore: 9.2,
      status: 'verified',
      logoUrl: 'XMR',
      officialTwitter: 'https://twitter.com/monero',
      githubRepository: 'https://github.com/monero-project/monero',
      devForum: 'https://forum.getmonero.org/'
    },
    {
      id: '2',
      name: 'Zcash',
      ticker: 'ZEC',
      description: 'Zero-knowledge cryptocurrency with zk-SNARKs technology',
      launchDate: 'October 2016',
      privacyScore: 8.7,
      status: 'verified',
      logoUrl: 'ZEC',
      officialTwitter: 'https://twitter.com/ElectricCoinCo',
      githubRepository: 'https://github.com/zcash/zcash',
      devForum: 'https://forum.zcashcommunity.com/'
    },
    {
      id: '3',
      name: 'Beam',
      ticker: 'BEAM',
      description: 'Confidential cryptocurrency based on Mimblewimble protocol',
      launchDate: 'January 2019',
      privacyScore: 7.8,
      status: 'verified',
      logoUrl: 'BEAM',
      officialTwitter: 'https://twitter.com/beamprivacy',
      githubRepository: 'https://github.com/beam-mw/beam',
      devForum: 'https://t.me/beamprivacy'
    }
  ];

  useEffect(() => {
    setPrivacyCoins(sampleCoins);
    setFilteredCoins(sampleCoins);
  }, []);

  useEffect(() => {
    // Filter coins based on search and category
    let filtered = privacyCoins.filter(coin => {
      const matchesSearch = coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           coin.ticker.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (selectedCategory === 'all') return matchesSearch;
      if (selectedCategory === 'high') return matchesSearch && coin.privacyScore >= 8;
      if (selectedCategory === 'medium') return matchesSearch && coin.privacyScore >= 7 && coin.privacyScore < 8;
      if (selectedCategory === 'low') return matchesSearch && coin.privacyScore < 7;
      
      return matchesSearch;
    });
    
    setFilteredCoins(filtered);
  }, [searchTerm, selectedCategory, privacyCoins]);

  const handleCoinClick = (coin: CryptoCurrency) => {
    setSelectedCoin(coin);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCoin(null);
  };

  return (
    <div className="main-content" id="main-content">
      {/* How it Works Section */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2>How ZKPrivacy Index Works</h2>
            <p>Advanced privacy analytics with real-time tracking and zero-knowledge verification</p>
          </div>
          
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">01</div>
              <div className="step-icon">
                <Search size={24} />
              </div>
              <h3>Real-time Tracking</h3>
              <p>Monitor privacy scores, prices, and market changes across multiple privacy coins with live updates every 30 seconds.</p>
            </div>
            
            <div className="step-card">
              <div className="step-number">02</div>
              <div className="step-icon">
                <Shield size={24} />
              </div>
              <h3>Zero-Knowledge Verification</h3>
              <p>Verify privacy protocols using cryptographic proofs without revealing sensitive transaction data.</p>
            </div>
            
            <div className="step-card">
              <div className="step-number">03</div>
              <div className="step-icon">
                <TrendingUp size={24} />
              </div>
              <h3>Smart Analytics</h3>
              <p>Get comprehensive insights with privacy scores, market analysis, and community ratings for informed decisions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Scores Section */}
      <section className="privacy-scores">
        <div className="container">
          <div className="section-header">
            <h2>Privacy Asset Rankings</h2>
            <p>Comprehensive analysis of privacy-focused cryptocurrencies with verified data</p>
            <div className="no-tracking-note">
              <Shield size={16} />
              <span>All data processed locally • No user tracking</span>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="filter-controls">
            <div className="search-box">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search privacy coins..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="category-filters">
              <button
                className={selectedCategory === 'all' ? 'active' : ''}
                onClick={() => setSelectedCategory('all')}
              >
                All
              </button>
              <button
                className={selectedCategory === 'high' ? 'active' : ''}
                onClick={() => setSelectedCategory('high')}
              >
                High Privacy
              </button>
              <button
                className={selectedCategory === 'medium' ? 'active' : ''}
                onClick={() => setSelectedCategory('medium')}
              >
                Medium Privacy
              </button>
            </div>
          </div>

          <div className="privacy-grid" id="privacy-grid">
            {filteredCoins.map((coin) => (
              <div key={coin.id} className="privacy-card" onClick={() => handleCoinClick(coin)}>
                <div className="card-header">
                  <div className="coin-logo">{coin.logoUrl}</div>
                  <div className="coin-info">
                    <h3 className="coin-name">{coin.name}</h3>
                    <p className="coin-ticker">{coin.ticker}</p>
                  </div>
                  <div className="status-indicator">
                    {coin.status === 'verified' ? (
                      <span className="status-verified">✓ Verified</span>
                    ) : (
                      <span className="status-pending">⚠ Pending</span>
                    )}
                  </div>
                </div>
                
                <p className="coin-description">{coin.description}</p>
                
                <div className="launch-info">
                  <Book size={16} />
                  <span>Launch: {coin.launchDate}</span>
                </div>
                
                <div className="privacy-score">
                  <div className="score-number">{coin.privacyScore}</div>
                  <div className="score-label">PRIVACY SCORE</div>
                </div>
              </div>
            ))}
          </div>

          {filteredCoins.length === 0 && (
            <div className="no-results">
              <div className="no-results-content">
                <Search size={48} />
                <h3>No assets found</h3>
                <p>Try adjusting your search or browse all categories</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {showModal && selectedCoin && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedCoin.name} ({selectedCoin.ticker})</h2>
              <button className="close-modal" onClick={closeModal}>
                <X size={24} />
              </button>
            </div>
            
            <div className="modal-body">
              <p>{selectedCoin.description}</p>
              
              <div className="launch-date">
                <Book size={16} />
                <span>Launch Date: {selectedCoin.launchDate}</span>
              </div>
              
              <div className="privacy-score-detail">
                <div className="score-number">{selectedCoin.privacyScore}</div>
                <div className="score-label">PRIVACY SCORE</div>
              </div>
              
              <div className="modal-links">
                <a href={selectedCoin.officialTwitter} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={16} />
                  Official Twitter
                </a>
                <a href={selectedCoin.githubRepository} target="_blank" rel="noopener noreferrer">
                  <Github size={16} />
                  GitHub Repository
                </a>
                <a href={selectedCoin.devForum} target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={16} />
                  Dev Forum
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CryptoList;