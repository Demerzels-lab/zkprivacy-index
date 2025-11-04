// ZKPrivacy Index - JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Privacy coins data - Enhanced with comprehensive information
    const privacyCoins = [
        {
            id: '1',
            name: 'Monero',
            ticker: 'XMR',
            description: 'Privacy-focused cryptocurrency using ring signatures and stealth addresses',
            launchDate: 'April 2014',
            privacyScore: 9.2,
            status: 'verified',
            logoUrl: 'XMR',
            marketCap: '$2.1B',
            price: '$184.32',
            change: '+5.2%',
            features: ['Ring Signatures', 'Stealth Addresses', 'Confidential Transactions'],
            officialTwitter: 'https://twitter.com/monero',
            githubRepository: 'https://github.com/monero-project/monero',
            devForum: 'https://forum.getmonero.org/',
            category: 'verified'
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
            marketCap: '$890M',
            price: '$47.23',
            change: '+2.1%',
            features: ['zk-SNARKs', 'Shielded Addresses', 'Selective Disclosure'],
            officialTwitter: 'https://twitter.com/ElectricCoinCo',
            githubRepository: 'https://github.com/zcash/zcash',
            devForum: 'https://forum.zcashcommunity.com/',
            category: 'verified'
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
            marketCap: '$67M',
            price: '$0.34',
            change: '+8.7%',
            features: ['Mimblewimble', 'Confidential Assets', 'Atomic Swaps'],
            officialTwitter: 'https://twitter.com/beamprivacy',
            githubRepository: 'https://github.com/beam-mw/beam',
            devForum: 'https://t.me/BeamPrivacy',
            category: 'verified'
        },
        {
            id: '4',
            name: 'Grin',
            ticker: 'GRIN',
            description: 'Minimalist privacy coin using Mimblewimble protocol',
            launchDate: 'January 2019',
            privacyScore: 7.5,
            status: 'verified',
            logoUrl: 'GRIN',
            marketCap: '$45M',
            price: '$0.12',
            change: '+12.3%',
            features: ['Mimblewimble', 'Proof of Work', 'No Pre-mine'],
            officialTwitter: 'https://twitter.com/grin_cc',
            githubRepository: 'https://github.com/mimblewimble/grin',
            devForum: 'https://www.grin-forum.org/',
            category: 'verified'
        },
        {
            id: '5',
            name: 'Dash',
            ticker: 'DASH',
            description: 'Digital cash with optional privacy features',
            launchDate: 'January 2014',
            privacyScore: 6.8,
            status: 'community',
            logoUrl: 'DASH',
            marketCap: '$420M',
            price: '$37.89',
            change: '+1.4%',
            features: ['PrivateSend', 'InstantSend', 'Governance'],
            officialTwitter: 'https://twitter.com/Dashpay',
            githubRepository: 'https://github.com/dashpay/dash',
            devForum: 'https://www.dash.org/community/',
            category: 'community'
        },
        {
            id: '6',
            name: 'Horizen',
            ticker: 'ZEN',
            description: 'Privacy-focused blockchain with zk-SNARKs technology',
            launchDate: 'June 2017',
            privacyScore: 6.5,
            status: 'community',
            logoUrl: 'ZEN',
            marketCap: '$180M',
            price: '$8.76',
            change: '+3.2%',
            features: ['zk-SNARKs', 'Sidechains', 'Decentralized Apps'],
            officialTwitter: 'https://twitter.com/horizenglobal',
            githubRepository: 'https://github.com/HorizenOfficial/zen',
            devForum: 'https://forum.horizen.io/',
            category: 'community'
        },
        {
            id: '7',
            name: 'Vertcoin',
            ticker: 'VTC',
            description: 'ASIC-resistant cryptocurrency with optional stealth addresses',
            launchDate: 'January 2014',
            privacyScore: 6.2,
            status: 'community',
            logoUrl: 'VTC',
            marketCap: '$120M',
            price: '$1.45',
            change: '+4.1%',
            features: ['ASIC-resistant', 'Stealth Addresses', 'Verthash'],
            officialTwitter: 'https://twitter.com/vertcoin',
            githubRepository: 'https://github.com/vertcoin/vertcoin',
            devForum: 'https://bitcointalk.org/index.php?board=159.0',
            category: 'community'
        },
        {
            id: '8',
            name: 'NavCoin',
            ticker: 'NAV',
            description: 'Privacy-focused cryptocurrency with dual consensus',
            launchDate: 'July 2014',
            privacyScore: 6.0,
            status: 'community',
            logoUrl: 'NAV',
            marketCap: '$85M',
            price: '$0.78',
            change: '+2.8%',
            features: ['Dual Consensus', 'PrivateSend', 'Staking'],
            officialTwitter: 'https://twitter.com/NavCoin',
            githubRepository: 'https://github.com/NAVCoin/navcoin-core',
            devForum: 'https://discourse.navcoin.org/',
            category: 'community'
        },
        {
            id: '9',
            name: 'PIVX',
            ticker: 'PIVX',
            description: 'Privacy-first cryptocurrency with zero-knowledge proofs',
            launchDate: 'February 2016',
            privacyScore: 5.8,
            status: 'community',
            logoUrl: 'PIVX',
            marketCap: '$65M',
            price: '$0.52',
            change: '+1.9%',
            features: ['zK-SNARKs', 'Masternode', 'Cold Staking'],
            officialTwitter: 'https://twitter.com/_PIVX',
            githubRepository: 'https://github.com/PIVX-Project/PIVX',
            devForum: 'https://forum.pivx.org/',
            category: 'community'
        },
        {
            id: '10',
            name: 'Verge',
            ticker: 'XVG',
            description: 'Privacy cryptocurrency with Tor integration',
            launchDate: 'October 2014',
            privacyScore: 5.5,
            status: 'community',
            logoUrl: 'XVG',
            marketCap: '$55M',
            price: '$0.0032',
            change: '+6.7%',
            features: ['Tor Integration', 'Wraith Protocol', 'Smart Contracts'],
            officialTwitter: 'https://twitter.com/vergecurrency',
            githubRepository: 'https://github.com/vergecurrency/VERGE',
            devForum: 'https://vergecurrency.com/community/',
            category: 'community'
        },
        {
            id: '11',
            name: 'Zcoin',
            ticker: 'FIRO',
            description: 'Privacy coin using Zerocoin protocol',
            launchDate: 'September 2016',
            privacyScore: 5.2,
            status: 'community',
            logoUrl: 'FIRO',
            marketCap: '$35M',
            price: '$2.15',
            change: '-0.8%',
            features: ['Zerocoin Protocol', 'Lelantus Privacy', 'Masternode'],
            officialTwitter: 'https://twitter.com/firoorg',
            githubRepository: 'https://github.com/firoorg/firo',
            devForum: 'https://forum.firo.org/',
            category: 'community'
        },
        {
            id: '12',
            name: 'Secret Network',
            ticker: 'SCRT',
            description: 'Privacy-preserving blockchain with programmable privacy',
            launchDate: 'September 2020',
            privacyScore: 5.0,
            status: 'verified',
            logoUrl: 'SCRT',
            marketCap: '$380M',
            price: '$1.28',
            change: '+3.5%',
            features: ['Private Smart Contracts', 'Trusted Execution Environments', 'DeFi'],
            officialTwitter: 'https://twitter.com/SecretNetwork',
            githubRepository: 'https://github.com/scrtlabs/SecretNetwork',
            devForum: 'https://scrt.network/community',
            category: 'verified'
        },
        {
            id: '13',
            name: 'Firo',
            ticker: 'FIRO',
            description: 'Privacy cryptocurrency using Lelantus protocol',
            launchDate: 'October 2016',
            privacyScore: 4.8,
            status: 'community',
            logoUrl: 'FIRO',
            marketCap: '$25M',
            price: '$1.95',
            change: '+2.1%',
            features: ['Lelantus Protocol', 'No Pre-mine', 'Community Governance'],
            officialTwitter: 'https://twitter.com/firoorg',
            githubRepository: 'https://github.com/firoorg/firo',
            devForum: 'https://forum.firo.org/',
            category: 'community'
        },
        {
            id: '14',
            name: 'Arweave',
            ticker: 'AR',
            description: 'Decentralized storage network with privacy features',
            launchDate: 'May 2020',
            privacyScore: 4.5,
            status: 'verified',
            logoUrl: 'AR',
            marketCap: '$1.2B',
            price: '$8.45',
            change: '+7.2%',
            features: ['Permanent Storage', 'Encrypted Data', 'Decentralized Network'],
            officialTwitter: 'https://twitter.com/arweaveteam',
            githubRepository: 'https://github.com/ArweaveTeam/arweave',
            devForum: 'https://community.arweave.org/',
            category: 'verified'
        },
        {
            id: '15',
            name: 'Oxen',
            ticker: 'OXEN',
            description: 'Privacy-first cryptocurrency for decentralized services',
            launchDate: 'July 2019',
            privacyScore: 4.2,
            status: 'community',
            logoUrl: 'OXEN',
            marketCap: '$45M',
            price: '$1.12',
            change: '+1.8%',
            features: ['Service Nodes', 'EVO Proof-of-Stake', 'Decentralized VPN'],
            officialTwitter: 'https://twitter.com/Oxen_IO',
            githubRepository: 'https://github.com/oxen-io/oxen-core',
            devForum: 'https://oxen.io/community',
            category: 'community'
        },
        {
            id: '16',
            name: 'Beldex',
            ticker: 'BDX',
            description: 'Privacy-focused cryptocurrency for secure communications',
            launchDate: 'September 2019',
            privacyScore: 4.0,
            status: 'community',
            logoUrl: 'BDX',
            marketCap: '$85M',
            price: '$0.065',
            change: '+2.5%',
            features: ['Stealth Address', 'RingCT', 'Master Nodes'],
            officialTwitter: 'https://twitter.com/BeldexCrypto',
            githubRepository: 'https://github.com/beldex-coin/beldex',
            devForum: 'https://t.me/beldex',
            category: 'community'
        },
        {
            id: '17',
            name: 'Phala Network',
            ticker: 'PHA',
            description: 'Privacy-preserving computation network',
            launchDate: 'November 2020',
            privacyScore: 3.8,
            status: 'verified',
            logoUrl: 'PHA',
            marketCap: '$120M',
            price: '$0.095',
            change: '+4.3%',
            features: ['Trusted Execution Environments', 'Enterprise Privacy', 'DeFi'],
            officialTwitter: 'https://twitter.com/PhalaNetwork',
            githubRepository: 'https://github.com/Phala-Network/phala-blockchain',
            devForum: 'https://github.com/Phala-Network',
            category: 'verified'
        },
        {
            id: '18',
            name: 'NuCypher',
            ticker: 'NU',
            description: 'Privacy-preserving data sharing platform',
            launchDate: 'May 2018',
            privacyScore: 3.5,
            status: 'community',
            logoUrl: 'NU',
            marketCap: '$25M',
            price: '$0.25',
            change: '+0.5%',
            features: ['Proxy Re-encryption', 'Decentralized Key Management', 'Data Access Control'],
            officialTwitter: 'https://twitter.com/nucypher',
            githubRepository: 'https://github.com/nucypher',
            devForum: 'https://github.com/nucypher',
            category: 'community'
        },
        {
            id: '19',
            name: 'Keep Network',
            ticker: 'KEEP',
            description: 'Privacy-preserving Ethereum bridge',
            launchDate: 'March 2020',
            privacyScore: 3.2,
            status: 'community',
            logoUrl: 'KEEP',
            marketCap: '$45M',
            price: '$0.18',
            change: '-1.2%',
            features: ['TBTC Bridge', 'Random Beacon', 'ECDSA Keep'],
            officialTwitter: 'https://twitter.com/keep_network',
            githubRepository: 'https://github.com/keep-network',
            devForum: 'https://github.com/keep-network',
            category: 'community'
        },
        {
            id: '20',
            name: 'Conflux Network',
            ticker: 'CFX',
            description: 'Blockchain with tree-graph consensus and privacy',
            launchDate: 'October 2020',
            privacyScore: 3.0,
            status: 'verified',
            logoUrl: 'CFX',
            marketCap: '$180M',
            price: '$0.095',
            change: '+2.8%',
            features: ['Tree-Graph Consensus', 'Space Rights', 'DeFi'],
            officialTwitter: 'https://twitter.com/ConfluxNetwork',
            githubRepository: 'https://github.com/conflux-chain',
            devForum: 'https://github.com/conflux-chain',
            category: 'verified'
        },
        {
            id: '21',
            name: 'Livepeer',
            ticker: 'LPT',
            description: 'Decentralized video streaming with privacy',
            launchDate: 'April 2017',
            privacyScore: 2.8,
            status: 'community',
            logoUrl: 'LPT',
            marketCap: '$95M',
            price: '$1.85',
            change: '+3.1%',
            features: ['Decentralized Video', 'Arbitrary Computational Tasks', 'Tokenized Access'],
            officialTwitter: 'https://twitter.com/Livepeer',
            githubRepository: 'https://github.com/livepeer',
            devForum: 'https://github.com/livepeer',
            category: 'community'
        },
        {
            id: '22',
            name: 'Ocean Protocol',
            ticker: 'OCEAN',
            description: 'Data exchange protocol with privacy features',
            launchDate: 'March 2018',
            privacyScore: 2.5,
            status: 'verified',
            logoUrl: 'OCEAN',
            marketCap: '$140M',
            price: '$0.125',
            change: '+1.9%',
            features: ['Data Exchange', 'Privacy Preserving', 'AI Data Marketplace'],
            officialTwitter: 'https://twitter.com/oceanprotocol',
            githubRepository: 'https://github.com/oceanprotocol',
            devForum: 'https://github.com/oceanprotocol',
            category: 'verified'
        },
        {
            id: '23',
            name: 'Decentraland',
            ticker: 'MANA',
            description: 'Virtual world with privacy features',
            launchDate: 'September 2017',
            privacyScore: 2.2,
            status: 'verified',
            logoUrl: 'MANA',
            marketCap: '$450M',
            price: '$0.42',
            change: '+5.6%',
            features: ['Virtual Reality', 'NFTs', 'Decentralized Governance'],
            officialTwitter: 'https://twitter.com/decentraland',
            githubRepository: 'https://github.com/decentraland',
            devForum: 'https://github.com/decentraland',
            category: 'verified'
        },
        {
            id: '24',
            name: 'Enigma',
            ticker: 'ENG',
            description: 'Privacy-preserving computation network',
            launchDate: 'September 2017',
            privacyScore: 2.0,
            status: 'community',
            logoUrl: 'ENG',
            marketCap: '$35M',
            price: '$0.28',
            change: '+0.8%',
            features: ['Secret Contracts', 'Decentralized Data', 'Privacy Preserving'],
            officialTwitter: 'https://twitter.com/enigmampc',
            githubRepository: 'https://github.com/enigmampc',
            devForum: 'https://github.com/enigmampc',
            category: 'community'
        }
    ];

    let filteredCoins = privacyCoins;
    let searchTerm = '';
    let selectedCategory = 'all';

    // Populate privacy grid with search and filter
    function populatePrivacyGrid() {
        const grid = document.getElementById('privacy-grid');
        if (!grid) return;
        
        grid.innerHTML = '';
        
        // Apply filters
        let displayCoins = filteredCoins;
        
        // Filter by category
        if (selectedCategory !== 'all') {
            displayCoins = displayCoins.filter(coin => 
                coin.category === selectedCategory || 
                (selectedCategory === 'verified' && coin.status === 'verified') ||
                (selectedCategory === 'community' && coin.status === 'community')
            );
        }
        
        // Filter by search term
        if (searchTerm) {
            displayCoins = displayCoins.filter(coin => 
                coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                coin.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
                coin.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        // Sort by privacy score
        displayCoins.sort((a, b) => b.privacyScore - a.privacyScore);
        
        displayCoins.forEach(coin => {
            const card = createPrivacyCard(coin);
            grid.appendChild(card);
        });
        
        // Update stats
        updateStats();
    }

    // Update statistics
    function updateStats() {
        const verifiedCount = filteredCoins.filter(coin => coin.status === 'verified').length;
        const communityCount = filteredCoins.filter(coin => coin.status === 'community').length;
        const avgScore = (filteredCoins.reduce((sum, coin) => sum + coin.privacyScore, 0) / filteredCoins.length).toFixed(1);
        
        console.log(`Found ${filteredCoins.length} coins - Verified: ${verifiedCount}, Community: ${communityCount}, Avg Score: ${avgScore}`);
    }

    // Search functionality
    function searchCoins(term) {
        searchTerm = term;
        populatePrivacyGrid();
    }

    // Filter functionality
    function filterCoins(category) {
        selectedCategory = category;
        populatePrivacyGrid();
    }

    // Create privacy card with enhanced information
    function createPrivacyCard(coin) {
        const card = document.createElement('div');
        card.className = 'privacy-card';
        card.setAttribute('data-coin-id', coin.id);
        
        const scoreColor = coin.privacyScore >= 8 ? 'var(--success)' : 
                          coin.privacyScore >= 6 ? 'var(--warning)' : 'var(--error)';
        
        const statusColor = coin.status === 'verified' ? 'var(--success)' : 'var(--warning)';
        
        card.innerHTML = `
            <div class="privacy-card-header">
                <div class="coin-logo">${coin.logoUrl}</div>
                <div class="coin-info">
                    <h3>${coin.name}</h3>
                    <div class="coin-ticker">${coin.ticker}</div>
                    <div class="launch-date">Launched: ${coin.launchDate}</div>
                </div>
                <div class="coin-status">
                    <span class="status-badge ${coin.status}">
                        <i data-lucide="${coin.status === 'verified' ? 'shield-check' : 'users'}"></i>
                        ${coin.status.charAt(0).toUpperCase() + coin.status.slice(1)}
                    </span>
                </div>
            </div>
            
            <div class="privacy-score-section">
                <div class="score-display">
                    <div class="score-value" style="color: ${scoreColor}">${coin.privacyScore}/10</div>
                    <div class="score-label">Privacy Score</div>
                </div>
                <div class="market-info">
                    <div class="market-cap">${coin.marketCap}</div>
                    <div class="price-change">
                        <span class="price">${coin.price}</span>
                        <span class="change ${coin.change.startsWith('+') ? 'positive' : 'negative'}">${coin.change}</span>
                    </div>
                </div>
            </div>
            
            <div class="privacy-description">
                <p>${coin.description}</p>
            </div>
            
            <div class="privacy-features">
                <h4>Key Features:</h4>
                <div class="features-list">
                    ${coin.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                </div>
            </div>
            
            <div class="card-footer">
                <div class="footer-links">
                    ${coin.officialTwitter ? `<a href="${coin.officialTwitter}" target="_blank" class="link-btn" title="Official Twitter">
                        <i data-lucide="twitter"></i>
                    </a>` : ''}
                    ${coin.githubRepository ? `<a href="${coin.githubRepository}" target="_blank" class="link-btn" title="GitHub Repository">
                        <i data-lucide="github"></i>
                    </a>` : ''}
                    ${coin.devForum ? `<a href="${coin.devForum}" target="_blank" class="link-btn" title="Developer Forum">
                        <i data-lucide="message-circle"></i>
                    </a>` : ''}
                </div>
                <button class="view-details-btn" onclick="showCoinDetails('${coin.id}')">
                    View Details <i data-lucide="external-link"></i>
                </button>
            </div>
        `;
        
        // Add click handler for card (but not links and buttons)
        card.addEventListener('click', (e) => {
            if (e.target.closest('a') || e.target.closest('button') || e.target.closest('i')) {
                return; // Don't trigger card click on interactive elements
            }
            showCoinDetails(coin.id);
        });
        
        // Initialize icons in the new card
        if (typeof lucide !== 'undefined') {
            setTimeout(() => lucide.createIcons(), 0);
        }
        
        return card;
    }

    // Enhanced show coin details function
    function showCoinDetails(coinId) {
        const coin = privacyCoins.find(c => c.id === coinId);
        if (!coin) return;
        
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'coin-modal';
        modal.id = 'coin-modal';
        
        modal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <div class="modal-title">
                        <h2>${coin.name} (${coin.ticker})</h2>
                        <span class="status-badge ${coin.status}">
                            <i data-lucide="${coin.status === 'verified' ? 'shield-check' : 'users'}"></i>
                            ${coin.status.charAt(0).toUpperCase() + coin.status.slice(1)}
                        </span>
                    </div>
                    <button class="modal-close">
                        <i data-lucide="x"></i>
                    </button>
                </div>
                
                <div class="modal-body">
                    <div class="modal-section">
                        <h3>Overview</h3>
                        <p>${coin.description}</p>
                        <div class="overview-grid">
                            <div class="overview-item">
                                <label>Launch Date:</label>
                                <span>${coin.launchDate}</span>
                            </div>
                            <div class="overview-item">
                                <label>Privacy Score:</label>
                                <span class="score-highlight" style="color: ${coin.privacyScore >= 8 ? 'var(--success)' : coin.privacyScore >= 6 ? 'var(--warning)' : 'var(--error)'}">
                                    ${coin.privacyScore}/10
                                </span>
                            </div>
                            <div class="overview-item">
                                <label>Market Cap:</label>
                                <span>${coin.marketCap}</span>
                            </div>
                            <div class="overview-item">
                                <label>Current Price:</label>
                                <span>${coin.price} <small class="change ${coin.change.startsWith('+') ? 'positive' : 'negative'}">${coin.change}</small></span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="modal-section">
                        <h3>Privacy Features</h3>
                        <div class="features-grid">
                            ${coin.features.map(feature => `
                                <div class="feature-item">
                                    <i data-lucide="shield-check"></i>
                                    <span>${feature}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="modal-section">
                        <h3>Community & Resources</h3>
                        <div class="resources-grid">
                            ${coin.officialTwitter ? `
                                <a href="${coin.officialTwitter}" target="_blank" class="resource-link">
                                    <i data-lucide="twitter"></i>
                                    <span>Official Twitter</span>
                                </a>
                            ` : ''}
                            ${coin.githubRepository ? `
                                <a href="${coin.githubRepository}" target="_blank" class="resource-link">
                                    <i data-lucide="github"></i>
                                    <span>GitHub Repository</span>
                                </a>
                            ` : ''}
                            ${coin.devForum ? `
                                <a href="${coin.devForum}" target="_blank" class="resource-link">
                                    <i data-lucide="message-circle"></i>
                                    <span>Developer Forum</span>
                                </a>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal to body
        document.body.appendChild(modal);
        
        // Initialize icons in modal
        if (typeof lucide !== 'undefined') {
            setTimeout(() => lucide.createIcons(), 0);
        }
        
        // Show modal with animation
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // Setup close handlers
        setupModalCloseHandlers(modal);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    // Close coin modal
    function closeCoinModal() {
        const modal = document.getElementById('coin-modal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
                document.body.style.overflow = 'auto';
            }, 300);
        }
    }

    // Global close modal function for all modals
    function closeModal(modalElement) {
        if (modalElement) {
            modalElement.classList.remove('show');
            setTimeout(() => {
                modalElement.remove();
                document.body.style.overflow = 'auto';
            }, 300);
        }
    }

    // Universal modal close handler
    function setupModalCloseHandlers(modal) {
        // Close button (both .close-modal and .modal-close)
        const closeButtons = modal.querySelectorAll('.close-modal, .modal-close');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                closeModal(modal);
            });
        });

        // Click outside modal to close
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });

        // Escape key to close
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                closeModal(modal);
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
    }

    // Populate comparison table
    function populateComparisonTable() {
        const table = document.getElementById('comparison-table');
        if (!table) return;
        
        const coins = privacyCoins.slice(0, 5); // Top 5 coins for comparison
        
        let tableHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Cryptocurrency</th>
                        <th>Privacy Score</th>
                        <th>Technology</th>
                        <th>Market Cap</th>
                        <th>Verification</th>
                        <th>Beginner Friendly</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        coins.forEach(coin => {
            const scoreClass = coin.score >= 8 ? 'high' : coin.score >= 7 ? 'medium' : 'low';
            const verifyIcon = coin.verified ? 'shield-check' : 'shield-x';
            
            tableHTML += `
                <tr>
                    <td>
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div class="coin-logo">${coin.logo}</div>
                            <div>
                                <div style="font-weight: 600;">${coin.name}</div>
                                <div style="font-family: var(--font-data); color: var(--neutral-600); font-size: 14px;">${coin.ticker}</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span class="score-badge ${scoreClass}">${coin.score}</span>
                    </td>
                    <td>${coin.features[0]}</td>
                    <td>${coin.marketCap}</td>
                    <td>
                        <button class="verify-btn ${coin.verified ? 'verified' : 'unverified'}" style="height: 32px; font-size: 12px;">
                            <i data-lucide="${verifyIcon}" style="width: 14px; height: 14px;"></i>
                            ${coin.verified ? 'Verified' : 'Unverified'}
                        </button>
                    </td>
                    <td>
                        ${coin.score >= 8 ? '⭐⭐⭐⭐⭐' : coin.score >= 7 ? '⭐⭐⭐⭐' : '⭐⭐⭐'}
                    </td>
                </tr>
            `;
        });
        
        tableHTML += '</tbody></table>';
        table.innerHTML = tableHTML;
        
        // Initialize icons in table
        if (typeof lucide !== 'undefined') {
            setTimeout(() => lucide.createIcons(), 0);
        }
    }

    // Search functionality
    function handleSearch() {
        const searchInput = document.getElementById('crypto-search');
        const searchBtn = document.querySelector('.search-btn');
        
        if (!searchInput || !searchBtn) return;
        
        function performSearch() {
            const query = searchInput.value.trim().toLowerCase();
            
            if (!query) {
                populatePrivacyGrid('all');
                return;
            }
            
            const filtered = privacyCoins.filter(coin => 
                coin.name.toLowerCase().includes(query) ||
                coin.ticker.toLowerCase().includes(query) ||
                coin.features.some(feature => feature.toLowerCase().includes(query))
            );
            
            const grid = document.getElementById('privacy-grid');
            grid.innerHTML = '';
            
            if (filtered.length === 0) {
                grid.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--neutral-600);">
                        <i data-lucide="search-x" style="width: 48px; height: 48px; margin-bottom: 16px;"></i>
                        <h3>No results found</h3>
                        <p>Try searching for a different privacy coin or protocol</p>
                    </div>
                `;
            } else {
                filtered.forEach(coin => {
                    const card = createPrivacyCard(coin);
                    grid.appendChild(card);
                });
            }
            
            // Re-initialize icons
            if (typeof lucide !== 'undefined') {
                setTimeout(() => lucide.createIcons(), 0);
            }
        }
        
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    // Quick action buttons
    function setupQuickActions() {
        const quickActions = document.querySelectorAll('.quick-action');
        
        quickActions.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                quickActions.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Filter coins based on category
                const category = button.getAttribute('data-category');
                populatePrivacyGrid(category);
            });
        });
    }

    // Anonymous browsing features
    function setupAnonymousFeatures() {
        // Store preferences locally (no server communication)
        const preferences = {
            theme: localStorage.getItem('theme') || 'dark',
            searchHistory: JSON.parse(localStorage.getItem('searchHistory') || '[]'),
            watchlist: JSON.parse(localStorage.getItem('watchlist') || '[]')
        };
        
        // Show privacy notification on first visit
        if (!localStorage.getItem('visited')) {
            setTimeout(() => {
                const badge = document.querySelector('.anonymous-badge');
                if (badge) {
                    badge.style.animation = 'pulse 2s infinite';
                    setTimeout(() => {
                        badge.style.animation = '';
                    }, 4000);
                }
            }, 2000);
        }
        
        localStorage.setItem('visited', 'true');
    }

    // Educational modal functionality
    function setupEducationCards() {
        const educationCards = document.querySelectorAll('.education-card');
        
        educationCards.forEach(card => {
            card.addEventListener('click', () => {
                const title = card.querySelector('h3').textContent;
                const description = card.querySelector('p').textContent;
                
                // Create modal or detailed view (simplified)
                const modal = document.createElement('div');
                modal.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    padding: 20px;
                `;
                
                modal.innerHTML = `
                    <div style="
                        background: var(--neutral-900);
                        border: 1px solid var(--neutral-800);
                        border-radius: var(--radius-md);
                        padding: 40px;
                        max-width: 600px;
                        max-height: 80vh;
                        overflow-y: auto;
                    ">
                        <h2 style="margin-bottom: 20px; color: var(--neutral-400);">${title}</h2>
                        <p style="margin-bottom: 20px; color: var(--neutral-600);">${description}</p>
                        <div style="color: var(--neutral-400); line-height: 1.6;">
                            <h3>Key Points:</h3>
                            <ul style="margin: 20px 0; padding-left: 20px;">
                                <li>Privacy is essential for financial freedom</li>
                                <li>Zero-knowledge proofs allow verification without exposure</li>
                                <li>Always research before using privacy tools</li>
                                <li>Understand local regulations and compliance</li>
                            </ul>
                            <button onclick="this.closest('[style*=fixed]').remove()" style="
                                background: var(--primary-500);
                                border: none;
                                border-radius: var(--radius-sm);
                                color: var(--neutral-950);
                                padding: 12px 24px;
                                font-weight: 600;
                                cursor: pointer;
                                margin-top: 20px;
                            ">Close</button>
                        </div>
                    </div>
                `;
                
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        modal.remove();
                    }
                });
                
                document.body.appendChild(modal);
            });
        });
    }

    // Real-time price simulation (for demo purposes)
    function simulateRealTimeUpdates() {
        setInterval(() => {
            const scoreElements = document.querySelectorAll('.score-value');
            scoreElements.forEach(element => {
                const currentScore = parseFloat(element.textContent);
                // Simulate small random changes (±0.1)
                const change = (Math.random() - 0.5) * 0.2;
                const newScore = Math.max(0, Math.min(10, currentScore + change));
                element.textContent = newScore.toFixed(1);
            });
        }, 10000); // Update every 10 seconds
    }

    // Initialize all functionality
    function init() {
        populatePrivacyGrid();
        populateComparisonTable();
        handleSearch();
        setupQuickActions();
        setupAnonymousFeatures();
        setupEducationCards();
        simulateRealTimeUpdates();
    }

    // Run initialization
    init();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Press '/' to focus search
        if (e.key === '/' && !e.target.matches('input, textarea')) {
            e.preventDefault();
            const searchInput = document.getElementById('crypto-search');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // Press 'Escape' to clear search
    // Initialize the application
    function initializeApp() {
        populatePrivacyGrid();
        
        // Set up search functionality
        const searchInput = document.getElementById('crypto-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                searchCoins(e.target.value);
            });
        }
        
        // Set up filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Remove active class from all buttons
                filterButtons.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                e.target.classList.add('active');
                
                const filter = e.target.getAttribute('data-filter');
                filterCoins(filter);
            });
        });
        
        // Set up show all assets button
        const showAllBtn = document.getElementById('show-all-assets');
        if (showAllBtn) {
            showAllBtn.addEventListener('click', () => {
                // Scroll to privacy section
                const privacySection = document.querySelector('.privacy-scores');
                if (privacySection) {
                    privacySection.scrollIntoView({ behavior: 'smooth' });
                }
                
                // Reset filters
                searchTerm = '';
                selectedCategory = 'all';
                const searchInput = document.getElementById('crypto-search');
                if (searchInput) searchInput.value = '';
                
                populatePrivacyGrid();
            });
        }
        
        // Set up welcome notification auto-dismiss
        const welcomeNotification = document.getElementById('welcome-notification');
        if (welcomeNotification && !localStorage.getItem('zkprivacy-welcome-shown')) {
            // Auto-dismiss after 8 seconds
            setTimeout(() => {
                dismissWelcomeNotification();
            }, 8000);
        }
    }

    // Welcome notification functions
    function dismissWelcomeNotification() {
        const notification = document.getElementById('welcome-notification');
        if (notification) {
            notification.classList.add('dismissed');
            localStorage.setItem('zkprivacy-welcome-shown', 'true');
            
            setTimeout(() => {
                notification.style.display = 'none';
            }, 300);
        }
    }

    // Add search and filter functionality to the page
    function addSearchAndFilterControls() {
        const privacySection = document.querySelector('.privacy-scores .container');
        if (!privacySection) return;
        
        // Add search and filter controls after the section header
        const sectionHeader = privacySection.querySelector('.section-header');
        if (sectionHeader) {
            const controlsDiv = document.createElement('div');
            controlsDiv.className = 'search-filter-controls';
            controlsDiv.innerHTML = `
                <div class="search-container">
                    <div class="search-box">
                        <i data-lucide="search"></i>
                        <input 
                            type="text" 
                            id="crypto-search" 
                            placeholder="Search privacy coins..."
                            autocomplete="off"
                        >
                        <button class="clear-search" id="clear-search" style="display: none;">
                            <i data-lucide="x"></i>
                        </button>
                    </div>
                </div>
                <div class="filter-container">
                    <div class="filter-buttons">
                        <button class="filter-btn active" data-filter="all">
                            <i data-lucide="grid-3x3"></i>
                            All Coins
                        </button>
                        <button class="filter-btn" data-filter="verified">
                            <i data-lucide="shield-check"></i>
                            Verified
                        </button>
                        <button class="filter-btn" data-filter="community">
                            <i data-lucide="users"></i>
                            Community
                        </button>
                    </div>
                </div>
                <div class="results-info">
                    <span id="results-count">Showing <strong>0</strong> coins</span>
                </div>
            `;
            
            sectionHeader.insertAdjacentElement('afterend', controlsDiv);
            
            // Initialize icons for the new controls
            if (typeof lucide !== 'undefined') {
                setTimeout(() => lucide.createIcons(), 0);
            }
            
            // Set up clear search functionality
            const clearSearch = document.getElementById('clear-search');
            if (clearSearch) {
                clearSearch.addEventListener('click', () => {
                    const searchInput = document.getElementById('crypto-search');
                    if (searchInput) {
                        searchInput.value = '';
                        searchCoins('');
                        clearSearch.style.display = 'none';
                    }
                });
            }
        }
    }

    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close any open modals (most recent first)
            const modals = [
                'coin-modal',
                'coin-details-modal', 
                'launch-modal',
                'documentation-modal',
                'demo-modal'
            ];
            
            let modalClosed = false;
            for (const modalId of modals) {
                const modal = document.getElementById(modalId) || 
                             document.querySelector(`.${modalId}`);
                if (modal) {
                    if (modalId === 'coin-modal') {
                        closeCoinModal();
                    } else {
                        closeModal(modal);
                    }
                    modalClosed = true;
                    break;
                }
            }
            
            if (!modalClosed) {
                // Clear search if no modal is open
                const searchInput = document.getElementById('crypto-search');
                if (searchInput && searchInput.value) {
                    searchInput.value = '';
                    searchCoins('');
                    const clearSearch = document.getElementById('clear-search');
                    if (clearSearch) clearSearch.style.display = 'none';
                }
            }
        }
    });

    // Initialize the application when DOM is ready
    initializeApp();
    addSearchAndFilterControls();
});

// Global functions for onclick handlers
window.showCoinDetails = showCoinDetails;
window.closeCoinModal = closeCoinModal;
});

// Add pulse animation for anonymous badge
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    @keyframes glow {
        0%, 100% { 
            box-shadow: 0 0 16px 0px rgba(0, 209, 255, 0.25);
        }
        50% { 
            box-shadow: 0 0 24px 0px rgba(0, 209, 255, 0.4);
        }
    }
    
    .search-box:focus-within {
        animation: glow 2s ease-in-out infinite;
    }
`;
document.head.appendChild(style);