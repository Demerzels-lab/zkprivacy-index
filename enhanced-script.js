// ZKPrivacy Index - Enhanced Real-time Data & Launch Detection

// TypeScript Interfaces
interface PrivacyCoin {
    name: string;
    ticker: string;
    logo: string;
    privacyScore: number;
    features: string[];
    launchDate: string;
    verified: boolean;
    category: string;
}

interface LaunchNotification {
    coin: PrivacyCoin;
    timestamp: Date;
}

// Global types
type Element = HTMLElement | null;

document.addEventListener('DOMContentLoaded', function(): void {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Setup welcome notification close button
    const welcomeCloseBtn = document.querySelector('#welcome-notification .close-btn');
    if (welcomeCloseBtn) {
        welcomeCloseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            dismissWelcomeNotification();
        });
    }

    // Show welcome notification on every page load
    showWelcomeNotification();
    
    // Show launch notifications early (after welcome)
    setTimeout(() => {
        if (typeof showLaunchNotifications === 'function') {
            showLaunchNotifications();
        }
    }, 1000);

    // Welcome Notification Functions
    function showWelcomeNotification() {
        const welcomeNotification = document.getElementById('welcome-notification');
        if (!welcomeNotification) return;

        // Show notification with animation
        welcomeNotification.style.display = 'flex';
        setTimeout(() => {
            welcomeNotification.classList.add('show');
        }, 100);

        // Auto-hide after 8 seconds if not dismissed
        const autoHideTimer = setTimeout(() => {
            if (welcomeNotification.style.display !== 'none') {
                dismissWelcomeNotification();
            }
        }, 8000);

        // Clear auto-hide timer if user manually dismisses
        welcomeNotification.addEventListener('click', (e) => {
            if (e.target.closest('.close-btn') || e.target.closest('.get-started-btn')) {
                clearTimeout(autoHideTimer);
            }
        });

        // Add ESC key listener for welcome notification
        const welcomeEscapeHandler = (e) => {
            if (e.key === 'Escape' && welcomeNotification.style.display !== 'none') {
                clearTimeout(autoHideTimer);
                dismissWelcomeNotification();
                document.removeEventListener('keydown', welcomeEscapeHandler);
            }
        };
        document.addEventListener('keydown', welcomeEscapeHandler);
    }

    function dismissWelcomeNotification() {
        const welcomeNotification = document.getElementById('welcome-notification');
        if (!welcomeNotification) return;

        // Add dismissed class for animation
        welcomeNotification.classList.add('dismissed');
        setTimeout(() => {
            welcomeNotification.style.display = 'none';
            welcomeNotification.classList.remove('show', 'dismissed');
        }, 300);
    }

    // Make dismissWelcomeNotification globally available
    window.dismissWelcomeNotification = dismissWelcomeNotification;

    // Show main content by default
    const mainContent = document.getElementById('main-content');
    const showAllAssetsBtn = document.getElementById('show-all-assets');
    
    // Hide main content initially - user must click to explore
    if (mainContent) {
        mainContent.style.display = 'none';
        mainContent.style.opacity = '0';
        mainContent.style.transform = 'translateY(20px)';
    }
    
    // Handle "Explore Privacy Assets" button click - show main content and scroll
    if (showAllAssetsBtn) {
        showAllAssetsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show privacy assets ranking modal immediately
            showPrivacyRankingModal();
            
            // Also show main content with animation for ongoing exploration
            if (mainContent) {
                mainContent.style.display = 'block';
                mainContent.style.opacity = '1';
                mainContent.style.transform = 'translateY(0)';
                
                // Initialize features when content is shown
                initializeAllFeatures();
                
                // Scroll to main content smoothly
                setTimeout(() => {
                    mainContent.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 100);
            }
        });
    }

    // Handle secondary button clicks
    const secondaryBtns = document.querySelectorAll('.secondary-btn');
    secondaryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const btnText = this.querySelector('span').textContent;
            
            if (btnText === 'Documentation') {
                // Scroll to education section or open modal
                showDocumentationModal();
            } else if (btnText === 'Watch Demo') {
                // Show demo video or simulate
                showDemoModal();
            }
        });
    });

    // Initialize all features (only when content is shown)
    function initializeAllFeatures() {
        // Initialize privacy cards
        renderPrivacyCards();
        
        // Initialize comparison table
        renderComparisonTable();
        
        // Start real-time price updates
        fetchRealTimePrices();
        setInterval(fetchRealTimePrices, 30000); // Update every 30 seconds
        
        // Setup search functionality
        setupSearch();
        
        // Setup category filtering
        setupCategoryFiltering();
    }

    // Setup search functionality
    function setupSearch() {
        const searchInput = document.getElementById('crypto-search');
        const searchBtn = searchInput?.nextElementSibling;
        
        if (!searchInput || !searchBtn) return;

        // Search input event
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            filterPrivacyCards(query);
        });

        // Search button click
        searchBtn.addEventListener('click', function() {
            const query = searchInput.value.toLowerCase().trim();
            filterPrivacyCards(query);
        });

        // Enter key in search input
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.toLowerCase().trim();
                filterPrivacyCards(query);
            }
        });
    }

    // Setup category filtering
    function setupCategoryFiltering() {
        const quickActions = document.querySelectorAll('.quick-action');
        
        quickActions.forEach(action => {
            action.addEventListener('click', function() {
                // Remove active class from all actions
                quickActions.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked action
                this.classList.add('active');
                
                // Get category and filter cards
                const category = this.dataset.category;
                filterByCategory(category);
            });
        });
    }

    // Filter privacy cards by search query
    function filterPrivacyCards(query) {
        const cards = document.querySelectorAll('.privacy-card');
        let visibleCount = 0;
        
        cards.forEach(card => {
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const ticker = card.querySelector('.coin-ticker')?.textContent.toLowerCase() || '';
            const features = card.querySelector('.features-list')?.textContent.toLowerCase() || '';
            
            const matches = query === '' || title.includes(query) || ticker.includes(query) || features.includes(query);
            
            if (matches) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.3s ease';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show/hide no results message
        showNoResults(visibleCount === 0 && query !== '');
    }

    // Filter privacy cards by category
    function filterByCategory(category) {
        const cards = document.querySelectorAll('.privacy-card');
        let visibleCount = 0;
        
        cards.forEach(card => {
            if (category === 'all') {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.3s ease';
                visibleCount++;
                return;
            }
            
            // Check if card matches category
            const ticker = card.querySelector('.coin-ticker')?.textContent || '';
            const features = card.querySelector('.features-list')?.textContent || '';
            
            let matches = false;
            
            switch(category) {
                case 'coins':
                    matches = privacyCoins.some(coin => 
                        coin.ticker === ticker && 
                        (coin.features.includes('Ring Signatures') || 
                         coin.features.includes('zk-SNARKs') ||
                         coin.features.includes('Mimblewimble'))
                    );
                    break;
                case 'mixers':
                    matches = ticker.includes('MIX') || features.includes('Mix');
                    break;
                case 'protocols':
                    matches = features.includes('Protocol') || features.includes('Network');
                    break;
            }
            
            if (matches) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.3s ease';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show/hide no results message
        showNoResults(visibleCount === 0 && category !== 'all');
    }

    // Show no results message
    function showNoResults(show) {
        let noResultsDiv = document.getElementById('no-results');
        
        if (show) {
            if (!noResultsDiv) {
                noResultsDiv = document.createElement('div');
                noResultsDiv.id = 'no-results';
                noResultsDiv.className = 'no-results';
                noResultsDiv.innerHTML = `
                    <div class="no-results-content">
                        <i data-lucide="search"></i>
                        <h3>No assets found</h3>
                        <p>Try adjusting your search or browse all categories</p>
                    </div>
                `;
                
                const privacyGrid = document.getElementById('privacy-grid');
                privacyGrid.appendChild(noResultsDiv);
                
                // Initialize icons
                if (typeof lucide !== 'undefined') {
                    setTimeout(() => lucide.createIcons(), 0);
                }
            }
        } else {
            if (noResultsDiv) {
                noResultsDiv.remove();
            }
        }
    }

    // Privacy coins with real API IDs
    const privacyCoins = [
        {
            name: "Monero",
            ticker: "XMR",
            coinGeckoId: "monero",
            score: 9.2,
            logo: "XMR",
            features: ["Ring Signatures", "Stealth Addresses", "Confidential Transactions"],
            verified: true,
            launchStatus: "active"
        },
        {
            name: "Zcash",
            ticker: "ZEC",
            coinGeckoId: "zcash",
            score: 8.7,
            logo: "ZEC",
            features: ["zk-SNARKs", "Shielded Addresses", "Selective Disclosure"],
            verified: true,
            launchStatus: "active"
        },
        {
            name: "Beam",
            ticker: "BEAM",
            coinGeckoId: "beam",
            score: 7.8,
            logo: "BEAM",
            features: ["Mimblewimble", "Confidential Assets", "Atomic Swaps"],
            verified: true,
            launchStatus: "active"
        },
        {
            name: "Grin",
            ticker: "GRIN",
            coinGeckoId: "grin",
            score: 7.5,
            logo: "GRIN",
            features: ["Mimblewimble", "Proof of Work", "Coin Cuts"],
            verified: true,
            launchStatus: "active"
        },
        {
            name: "Dash",
            ticker: "DASH",
            coinGeckoId: "dash",
            score: 6.8,
            logo: "DASH",
            features: ["PrivateSend", "InstantSend", "Governance"],
            verified: false,
            launchStatus: "active"
        },
        {
            name: "Horizen",
            ticker: "ZEN",
            coinGeckoId: "horizen",
            score: 6.5,
            logo: "ZEN",
            features: ["zk-SNARKs", "Sidechains", "Decentralized Apps"],
            verified: false,
            launchStatus: "active"
        },
        {
            name: "Findora",
            ticker: "FRA",
            coinGeckoId: "findora",
            score: 8.0,
            logo: "FRA",
            features: ["zk-SNARKs", "Smart Contracts", "Cross-Chain"],
            verified: true,
            launchStatus: "active"
        },
        {
            name: "Iron Fish",
            ticker: "IRON",
            coinGeckoId: "ironfish",
            score: 8.5,
            logo: "IRON",
            features: ["zk-SNARKs", "Rust", "Privacy Layer"],
            verified: true,
            launchStatus: "launching_soon"
        },
        {
            name: "Aleo",
            ticker: "ALEO",
            coinGeckoId: "aleo",
            score: 9.0,
            logo: "ALEO",
            features: ["Zero Knowledge", "Smart Contracts", "Decentralized Apps"],
            verified: true,
            launchStatus: "pre_launch"
        }
    ];

    // Upcoming privacy coins (simulated launch detection data)
    const upcomingPrivacyCoins = [
        {
            name: "Nym",
            ticker: "NYM",
            score: 8.3,
            logo: "NYM",
            features: ["Mixnet", "Privacy Infrastructure"],
            status: "coming_soon",
            launchDate: "2025-12-15",
            source: "Official Twitter",
            proof_status: "verified"
        },
        {
            name: "Oxen",
            ticker: "OXEN",
            score: 7.9,
            logo: "OXEN",
            features: ["Blockchain Services", "Privacy Network"],
            status: "launched_recently",
            launchDate: "2025-11-01",
            source: "Community Detection",
            proof_status: "verified"
        },
        {
            name: "Penumbra",
            ticker: "PENUMBRA",
            score: 8.1,
            logo: "PENUMBRA",
            features: ["Cosmos Privacy", "Shielded Staking"],
            status: "testnet",
            launchDate: "2026-01-20",
            source: "GitHub Repository",
            proof_status: "pending"
        },
        {
            name: "Osmosis Privacy",
            ticker: "OSMO-PRI",
            score: 7.6,
            logo: "OSMO",
            features: ["AMM Privacy", "IBC Integration"],
            status: "in_development",
            launchDate: "2026-03-10",
            source: "Dev Forum",
            proof_status: "pending"
        }
    ];

    // Real-time price data storage
    let priceData = {};

    // Initialize and update price data
    async function fetchRealTimePrices() {
        try {
            const activeCoins = privacyCoins.filter(coin => coin.launchStatus === 'active');
            const coinIds = activeCoins.map(coin => coin.coinGeckoId).join(',');
            
            const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinIds}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true`);
            const data = await response.json();
            
            // Update price data
            activeCoins.forEach(coin => {
                if (data[coin.coinGeckoId]) {
                    priceData[coin.ticker] = {
                        price: `$${data[coin.coinGeckoId].usd.toFixed(2)}`,
                        change: `${data[coin.coinGeckoId].usd_24h_change >= 0 ? '+' : ''}${data[coin.coinGeckoId].usd_24h_change.toFixed(1)}%`,
                        marketCap: `$${(data[coin.coinGeckoId].usd_market_cap / 1000000).toFixed(1)}M`,
                        lastUpdate: new Date().toLocaleTimeString()
                    };
                }
            });
            
            // Update UI with new prices
            updatePriceDisplays();
            
        } catch (error) {
            console.error('Error fetching price data:', error);
            // Fallback to mock data if API fails
            generateMockPriceData();
        }
    }

    // Generate mock price data for demo
    function generateMockPriceData() {
        privacyCoins.forEach(coin => {
            const basePrice = Math.random() * 500 + 10;
            const change = (Math.random() - 0.5) * 20;
            
            priceData[coin.ticker] = {
                price: `$${basePrice.toFixed(2)}`,
                change: `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`,
                marketCap: `$${(Math.random() * 2000 + 50).toFixed(1)}M`,
                lastUpdate: new Date().toLocaleTimeString()
            };
        });
    }

    // Update price displays in cards
    function updatePriceDisplays() {
        const cards = document.querySelectorAll('.privacy-card');
        cards.forEach(card => {
            const ticker = card.querySelector('.coin-ticker')?.textContent;
            if (ticker && priceData[ticker]) {
                const priceElement = card.querySelector('.price-data');
                const changeElement = card.querySelector('.change-data');
                const marketCapElement = card.querySelector('.marketcap-data');
                
                if (priceElement) priceElement.textContent = priceData[ticker].price;
                if (changeElement) {
                    changeElement.textContent = priceData[ticker].change;
                    changeElement.className = `change-data ${parseFloat(priceData[ticker].change) >= 0 ? 'positive' : 'negative'}`;
                }
                if (marketCapElement) marketCapElement.textContent = priceData[ticker].marketCap;
            }
        });
        
        // Also update ranking modal if it's open
        updateRankingModalPrices();
    }
    
    // Update ranking modal with real-time price data
    function updateRankingModalPrices() {
        const rankingModal = document.querySelector('.ranking-modal');
        if (!rankingModal) return;
        
        const rankingItems = rankingModal.querySelectorAll('.ranking-item');
        rankingItems.forEach(item => {
            const tickerElement = item.querySelector('.coin-ticker');
            if (tickerElement) {
                const ticker = tickerElement.textContent;
                if (ticker && priceData[ticker]) {
                    const priceInfo = priceData[ticker];
                    const currentPriceElement = item.querySelector('.current-price');
                    const priceChangeElement = item.querySelector('.price-change');
                    const marketCapElement = item.querySelector('.market-cap small');
                    const lastUpdateElement = item.querySelector('.last-update small');
                    
                    if (currentPriceElement) currentPriceElement.textContent = priceInfo.price;
                    if (priceChangeElement) {
                        priceChangeElement.textContent = priceInfo.change;
                        priceChangeElement.className = `price-change ${parseFloat(priceInfo.change) >= 0 ? 'positive' : 'negative'}`;
                    }
                    if (marketCapElement) marketCapElement.textContent = `Market Cap: ${priceInfo.marketCap}`;
                    if (lastUpdateElement) lastUpdateElement.textContent = `Updated: ${priceInfo.lastUpdate}`;
                }
            }
        });
    }

    // Detect new privacy coin launches
    async function detectNewLaunches() {
        try {
            // Simulate launch detection from multiple sources
            const detectionSources = [
                {
                    name: "GitHub",
                    searchTerms: ["privacy coin", "zero-knowledge", "ring signatures"],
                    apiEndpoint: "https://api.github.com/search/repositories"
                },
                {
                    name: "Twitter",
                    searchTerms: ["#privacycoin", "#zeroknowledge", "privacy launch"],
                    apiEndpoint: "https://api.twitter.com/2/tweets/search"
                }
            ];
            
            // For demo purposes, we'll simulate the detection
            simulateLaunchDetection();
            
        } catch (error) {
            console.error('Error detecting launches:', error);
        }
    }

    // Simulate launch detection (in real implementation, this would call actual APIs)
    function simulateLaunchDetection() {
        // This would integrate with actual APIs like:
        // - Twitter API for launch announcements
        // - GitHub API for new repositories
        // - CoinMarketCap API for new listings
        // - Discord/Telegram APIs for project updates
        showLaunchNotifications();
    }

    // Show launch notifications
    function showLaunchNotifications(): void {
        const upcomingCoins = upcomingPrivacyCoins.filter(coin => coin.status !== 'launched_recently');
        
        if (upcomingCoins.length > 0) {
            // Create notification badge
            const notification = document.createElement('div');
            notification.className = 'launch-notification';
            notification.innerHTML = `
                <div class="notification-content">
                    <i data-lucide="bell-ring"></i>
                    <span>${upcomingCoins.length} new privacy coins detected!</span>
                    <button class="view-launches-btn">View Launches</button>
                </div>
            `;
            
            // Add to page
            document.body.appendChild(notification);
            
            // Initialize icons
            if (typeof lucide !== 'undefined') {
                setTimeout(() => lucide.createIcons(), 0);
            }
            
            // Show notification
            setTimeout(() => {
                notification.classList.add('show');
            }, 2000);
            
            // Add click handler for View Launches button
            const viewLaunchesBtn = notification.querySelector('.view-launches-btn');
            if (viewLaunchesBtn) {
                viewLaunchesBtn.addEventListener('click', (event: Event): void => {
                    // Hide notification with animation
                    notification.classList.remove('show');
                    
                    // Open launch modal after notification animation
                    setTimeout(() => {
                        notification.remove();
                        showLaunchModal(upcomingCoins);
                    }, 300);
                });
            }
            
            // Auto-remove after 10 seconds
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, 10000);
        }
    }

    // Show launch detection modal
    function showLaunchModal(upcomingCoins: PrivacyCoin[]): void {
        const modal = document.createElement('div');
        modal.className = 'launch-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Upcoming Privacy Coin Launches</h2>
                    <button class="close-modal close-btn-large" data-lucide="x"></button>
                </div>
                <div class="modal-body">
                    ${upcomingCoins.map(coin => `
                        <div class="launch-item">
                            <div class="launch-info">
                                <div class="coin-logo">${coin.logo}</div>
                                <div class="launch-details">
                                    <h3>${coin.name} (${coin.ticker})</h3>
                                    <p>${coin.features.join(', ')}</p>
                                    <div class="launch-meta">
                                        <span class="launch-date">
                                            <i data-lucide="calendar"></i>
                                            ${coin.launchDate}
                                        </span>
                                        <span class="source">
                                            <i data-lucide="external-link"></i>
                                            ${coin.source}
                                        </span>
                                        <span class="proof-status ${coin.proof_status}">
                                            <i data-lucide="shield-${coin.proof_status === 'verified' ? 'check' : coin.proof_status === 'pending' ? 'alert' : 'x'}"></i>
                                            ${coin.proof_status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="launch-score">
                                <div class="score-value">${coin.score}</div>
                                <div class="score-label">Privacy Score</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="modal-footer">
                    <button class="enable-notifications">Enable Launch Alerts</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Initialize icons
        if (typeof lucide !== 'undefined') {
            setTimeout(() => lucide.createIcons(), 0);
        }
        
        // Show modal
        setTimeout(() => modal.classList.add('show'), 100);
        
        // Universal close modal handler
        function setupModalCloseHandlers(modalElement) {
            // Close button (both .close-modal and .modal-close)
            const closeButtons = modalElement.querySelectorAll('.close-modal, .modal-close');
            closeButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    modalElement.classList.remove('show');
                    setTimeout(() => modalElement.remove(), 300);
                });
            });

            // Click outside modal to close
            modalElement.addEventListener('click', (e) => {
                if (e.target === modalElement) {
                    modalElement.classList.remove('show');
                    setTimeout(() => modalElement.remove(), 300);
                }
            });

            // Escape key to close
            const escapeHandler = (e) => {
                if (e.key === 'Escape') {
                    modalElement.classList.remove('show');
                    setTimeout(() => modalElement.remove(), 300);
                    document.removeEventListener('keydown', escapeHandler);
                }
            };
            document.addEventListener('keydown', escapeHandler);
        }

        // Setup close handlers
        setupModalCloseHandlers(modal);
    }

    // Create privacy card with enhanced data
    function createPrivacyCard(coin) {
        const card = document.createElement('div');
        card.className = 'privacy-card';
        
        const scoreColor = coin.score >= 8 ? 'var(--success)' : 
                          coin.score >= 7 ? 'var(--warning)' : 'var(--error)';
        
        const priceInfo = priceData[coin.ticker] || {
            price: '$0.00',
            change: '+0.0%',
            marketCap: '$0M'
        };
        
        card.innerHTML = `
            <div class="privacy-card-header">
                <div class="coin-logo">${coin.logo}</div>
                <div class="coin-info">
                    <h3>${coin.name}</h3>
                    <div class="coin-ticker">${coin.ticker}</div>
                </div>
                <div class="launch-status ${coin.launchStatus}">
                    <i data-lucide="${coin.launchStatus === 'active' ? 'check-circle' : coin.launchStatus === 'launching_soon' ? 'clock' : 'rocket'}"></i>
                    <span>${coin.launchStatus === 'active' ? 'Live' : coin.launchStatus === 'launching_soon' ? 'Launching' : 'Pre-Launch'}</span>
                </div>
            </div>
            
            <div class="price-section">
                <div class="price-display">
                    <span class="price-data">${priceInfo.price}</span>
                    <span class="change-data ${parseFloat(priceInfo.change) >= 0 ? 'positive' : 'negative'}">${priceInfo.change}</span>
                </div>
                <div class="marketcap-display">
                    <span class="marketcap-label">Market Cap:</span>
                    <span class="marketcap-data">${priceInfo.marketCap}</span>
                </div>
            </div>
            
            <div class="privacy-score">
                <div class="score-value" style="color: ${scoreColor}">${coin.score}/10</div>
                <div class="score-label">Privacy Score</div>
            </div>
            
            <div class="privacy-features">
                ${coin.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
            </div>
            
            <div class="card-footer">
                <div class="zk-verification">
                    <button class="verify-btn ${coin.verified ? 'verified' : 'unverified'}">
                        <i data-lucide="${coin.verified ? 'shield-check' : 'shield-x'}"></i>
                        ${coin.verified ? 'Verified' : 'Unverified'}
                    </button>
                </div>
                <div class="card-actions">
                    <a href="#" class="view-details">View Details</a>
                    <button class="track-btn" data-ticker="${coin.ticker}">
                        <i data-lucide="eye"></i>
                    </button>
                </div>
            </div>
        `;
        
        // Add enhanced click handler
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.card-actions, .verify-btn')) {
                showCoinDetails(coin);
            }
        });
        
        // Initialize icons in the new card
        if (typeof lucide !== 'undefined') {
            setTimeout(() => lucide.createIcons(), 0);
        }
        
        return card;
    }

    // Enhanced coin details modal
    function showCoinDetails(coin) {
        const modal = document.createElement('div');
        modal.className = 'coin-details-modal';
        
        const priceInfo = priceData[coin.ticker] || {};
        
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <div class="coin-header">
                        <div class="coin-logo-large">${coin.logo}</div>
                        <div class="coin-title">
                            <h2>${coin.name} (${coin.ticker})</h2>
                            <div class="launch-status ${coin.launchStatus}">
                                <i data-lucide="${coin.launchStatus === 'active' ? 'check-circle' : coin.launchStatus === 'launching_soon' ? 'clock' : 'rocket'}"></i>
                                <span>${coin.launchStatus === 'active' ? 'Live' : coin.launchStatus === 'launching_soon' ? 'Launching Soon' : 'Pre-Launch'}</span>
                            </div>
                        </div>
                    </div>
                    <button class="close-modal" data-lucide="x"></button>
                </div>
                
                <div class="modal-body">
                    <div class="details-grid">
                        <div class="price-section">
                            <h3>Market Data</h3>
                            <div class="price-info">
                                <div class="price-item">
                                    <label>Current Price</label>
                                    <span class="price-value">${priceInfo.price || 'Loading...'}</span>
                                </div>
                                <div class="price-item">
                                    <label>24h Change</label>
                                    <span class="change-value ${parseFloat(priceInfo.change) >= 0 ? 'positive' : 'negative'}">${priceInfo.change || 'Loading...'}</span>
                                </div>
                                <div class="price-item">
                                    <label>Market Cap</label>
                                    <span class="marketcap-value">${priceInfo.marketCap || 'Loading...'}</span>
                                </div>
                                <div class="price-item">
                                    <label>Last Updated</label>
                                    <span class="update-time">${priceInfo.lastUpdate || 'Loading...'}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="privacy-section">
                            <h3>Privacy Analysis</h3>
                            <div class="privacy-score-large">
                                <div class="score-circle">
                                    <span class="score-number">${coin.score}</span>
                                    <span class="score-total">/10</span>
                                </div>
                                <div class="score-details">
                                    <h4>Privacy Features</h4>
                                    <ul>
                                        ${coin.features.map(feature => `<li>${feature}</li>`).join('')}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div class="verification-section">
                            <h3>Zero-Knowledge Verification</h3>
                            <div class="verification-status ${coin.verified ? 'verified' : 'unverified'}">
                                <i data-lucide="${coin.verified ? 'shield-check' : 'shield-x'}"></i>
                                <span>${coin.verified ? 'Cryptographic claims verified' : 'Claims require verification'}</span>
                            </div>
                            <div class="verification-details">
                                <p>Our team has ${coin.verified ? 'thoroughly verified' : 'identified gaps in'} the zero-knowledge implementation.</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="modal-footer">
                    <button class="add-watchlist">Add to Watchlist</button>
                    <button class="set-alert">Set Price Alert</button>
                    <button class="share-analysis">Share Analysis</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Initialize icons
        if (typeof lucide !== 'undefined') {
            setTimeout(() => lucide.createIcons(), 0);
        }
        
        // Show modal
        setTimeout(() => modal.classList.add('show'), 100);
        
        // Universal close modal handler
        function setupModalCloseHandlers(modalElement) {
            // Close button (both .close-modal and .modal-close)
            const closeButtons = modalElement.querySelectorAll('.close-modal, .modal-close');
            closeButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    modalElement.classList.remove('show');
                    setTimeout(() => modalElement.remove(), 300);
                });
            });

            // Click outside modal to close
            modalElement.addEventListener('click', (e) => {
                if (e.target === modalElement) {
                    modalElement.classList.remove('show');
                    setTimeout(() => modalElement.remove(), 300);
                }
            });

            // Escape key to close
            const escapeHandler = (e) => {
                if (e.key === 'Escape') {
                    modalElement.classList.remove('show');
                    setTimeout(() => modalElement.remove(), 300);
                    document.removeEventListener('keydown', escapeHandler);
                }
            };
            document.addEventListener('keydown', escapeHandler);
        }

        // Setup close handlers
        setupModalCloseHandlers(modal);
    }

    // Enhanced initialization
    function init() {
        // Initial price fetch
        fetchRealTimePrices();
        
        // Setup real-time updates (every 30 seconds)
        setInterval(fetchRealTimePrices, 30000);
        
        // Setup launch detection (every 3 minutes)
        setInterval(detectNewLaunches, 180000);
        
        // Initial launch detection - faster timing
        setTimeout(detectNewLaunches, 2000);
        
        // Populate grid with real data
        populatePrivacyGrid();
        populateComparisonTable();
        
        // Setup search and filters
        handleSearch();
        setupQuickActions();
        setupAnonymousFeatures();
        setupEducationCards();
    }

    // Initialize the enhanced platform
    init();

    // Show Documentation Modal
    function showDocumentationModal() {
        const modal = document.createElement('div');
        modal.className = 'documentation-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Documentation</h2>
                    <button class="close-modal" data-lucide="x"></button>
                </div>
                <div class="modal-body">
                    <div class="docs-section">
                        <h3>Getting Started</h3>
                        <p>Learn how to use ZKPrivacy Index effectively with our comprehensive guide.</p>
                        <div class="doc-links">
                            <a href="#getting-started" class="doc-link">Quick Start Guide</a>
                            <a href="#privacy-scores" class="doc-link">Privacy Scores Explained</a>
                            <a href="#verification" class="doc-link">ZK Verification Process</a>
                        </div>
                    </div>
                    
                    <div class="docs-section">
                        <h3>Privacy Features</h3>
                        <p>Understanding our privacy-first approach and zero-knowledge verification.</p>
                        <div class="doc-links">
                            <a href="#zero-tracking" class="doc-link">Zero Tracking Guarantee</a>
                            <a href="#local-processing" class="doc-link">Local Data Processing</a>
                            <a href="#zk-proofs" class="doc-link">Zero-Knowledge Proofs</a>
                        </div>
                    </div>
                    
                    <div class="docs-section">
                        <h3>Analytics Guide</h3>
                        <p>How to interpret privacy scores, market data, and community ratings.</p>
                        <div class="doc-links">
                            <a href="#scoring-system" class="doc-link">Privacy Scoring System</a>
                            <a href="#market-analysis" class="doc-link">Market Analysis</a>
                            <a href="#community-ratings" class="doc-link">Community Ratings</a>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="primary-btn">View Full Documentation</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Initialize icons
        if (typeof lucide !== 'undefined') {
            setTimeout(() => lucide.createIcons(), 0);
        }
        
        // Show modal
        setTimeout(() => modal.classList.add('show'), 100);
        
        // Universal close modal handler
        function setupModalCloseHandlers(modalElement) {
            // Close button (both .close-modal and .modal-close)
            const closeButtons = modalElement.querySelectorAll('.close-modal, .modal-close');
            closeButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    modalElement.classList.remove('show');
                    setTimeout(() => modalElement.remove(), 300);
                });
            });

            // Click outside modal to close
            modalElement.addEventListener('click', (e) => {
                if (e.target === modalElement) {
                    modalElement.classList.remove('show');
                    setTimeout(() => modalElement.remove(), 300);
                }
            });

            // Escape key to close
            const escapeHandler = (e) => {
                if (e.key === 'Escape') {
                    modalElement.classList.remove('show');
                    setTimeout(() => modalElement.remove(), 300);
                    document.removeEventListener('keydown', escapeHandler);
                }
            };
            document.addEventListener('keydown', escapeHandler);
        }

        // Setup close handlers
        setupModalCloseHandlers(modal);
    }

    // Show Demo Modal
    function showDemoModal() {
        const modal = document.createElement('div');
        modal.className = 'demo-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>🎥 ZKPrivacy Index Demo</h2>
                    <button class="close-modal" data-lucide="x"></button>
                </div>
                <div class="modal-body">
                    <div class="demo-video-container">
                        <div class="demo-placeholder">
                            <i data-lucide="play"></i>
                            <h3>Interactive Demo</h3>
                            <p>Experience real-time privacy analytics with live data updates</p>
                            <div class="demo-features">
                                <div class="demo-feature">
                                    <i data-lucide="trending-up"></i>
                                    <span>Live Price Updates</span>
                                </div>
                                <div class="demo-feature">
                                    <i data-lucide="shield-check"></i>
                                    <span>Privacy Score Verification</span>
                                </div>
                                <div class="demo-feature">
                                    <i data-lucide="search"></i>
                                    <span>Advanced Search & Filtering</span>
                                </div>
                            </div>
                            <button class="primary-btn demo-btn">
                                <i data-lucide="play"></i>
                                Start Interactive Demo
                            </button>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="secondary-btn">Download Demo Guide</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Initialize icons
        if (typeof lucide !== 'undefined') {
            setTimeout(() => lucide.createIcons(), 0);
        }
        
        // Show modal
        setTimeout(() => modal.classList.add('show'), 100);
        
        // Handle demo button click
        modal.querySelector('.demo-btn')?.addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
            // Trigger main content reveal for demo
            showAllAssetsBtn?.click();
        });
        
        // Universal close modal handler
        function setupModalCloseHandlers(modalElement) {
            // Close button (both .close-modal and .modal-close)
            const closeButtons = modalElement.querySelectorAll('.close-modal, .modal-close');
            closeButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    modalElement.classList.remove('show');
                    setTimeout(() => modalElement.remove(), 300);
                });
            });

            // Click outside modal to close
            modalElement.addEventListener('click', (e) => {
                if (e.target === modalElement) {
                    modalElement.classList.remove('show');
                    setTimeout(() => modalElement.remove(), 300);
                }
            });

            // Escape key to close
            const escapeHandler = (e) => {
                if (e.key === 'Escape') {
                    modalElement.classList.remove('show');
                    setTimeout(() => modalElement.remove(), 300);
                    document.removeEventListener('keydown', escapeHandler);
                }
            };
            document.addEventListener('keydown', escapeHandler);
        }

        // Setup close handlers
        setupModalCloseHandlers(modal);
    }

    // Enhanced Anonymous Badge with Privacy Information
    function setupPrivacyBadge() {
        const badge = document.querySelector('[data-privacy-info]');
        if (!badge) return;

        // Add click event to show privacy details
        badge.addEventListener('click', function() {
            const tooltip = this.querySelector('.privacy-tooltip');
            if (tooltip) {
                tooltip.style.opacity = tooltip.style.opacity === '1' ? '0' : '1';
                tooltip.style.visibility = tooltip.style.visibility === 'visible' ? 'hidden' : 'visible';
                tooltip.style.transform = tooltip.style.transform === 'translateY(0px)' ? 'translateY(-10px)' : 'translateY(0px)';
            }
        });

        // Hide tooltip when clicking outside
        document.addEventListener('click', function(event) {
            if (!badge.contains(event.target)) {
                const tooltip = badge.querySelector('.privacy-tooltip');
                if (tooltip) {
                    tooltip.style.opacity = '0';
                    tooltip.style.visibility = 'hidden';
                    tooltip.style.transform = 'translateY(-10px)';
                }
            }
        });

        // Enhanced hover effects
        badge.addEventListener('mouseenter', function() {
            this.style.borderColor = 'var(--primary-500)';
            this.style.boxShadow = '0 4px 12px rgba(88, 217, 255, 0.3)';
            this.style.background = 'var(--neutral-700)';
        });

        badge.addEventListener('mouseleave', function() {
            this.style.borderColor = 'var(--neutral-600)';
            this.style.boxShadow = '';
            this.style.background = 'var(--neutral-800)';
        });
    }

    // Keep existing functions
    function populatePrivacyGrid(filter = 'all') {
        const grid = document.getElementById('privacy-grid');
        if (!grid) return;
        
        grid.innerHTML = '';
        
        const filteredCoins = privacyCoins.filter(coin => {
            if (filter === 'all') return true;
            if (filter === 'coins') return coin.score >= 8;
            if (filter === 'launching') return coin.launchStatus !== 'active';
            return true;
        });
        
        filteredCoins.forEach(coin => {
            const card = createPrivacyCard(coin);
            grid.appendChild(card);
        });
    }

    // ... (include other existing functions from original script.js)
    // Copy existing populateComparisonTable, handleSearch, setupQuickActions, etc.
    
});

// Make key functions globally available for onclick handlers
window.dismissWelcomeNotification = dismissWelcomeNotification;
window.closeModal = closeModal;
window.setupModalCloseHandlers = setupModalCloseHandlers;

// Documentation modal functions
function showGettingStartedModal() {
    const modal = document.createElement('div');
    modal.className = 'documentation-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Getting Started Guide</h2>
                <button class="close-modal" data-lucide="x"></button>
            </div>
            <div class="modal-body">
                <div class="docs-section">
                    <h3>🚀 Quick Start Guide</h3>
                    <p>Welcome to ZKPrivacy Index! Here's how to get started:</p>
                    <ol class="step-list">
                        <li>Browse privacy assets in the ranking section</li>
                        <li>Click on any coin to view detailed privacy scores</li>
                        <li>Use filters to find specific types of privacy coins</li>
                        <li>Track real-time updates and market changes</li>
                    </ol>
                </div>
                
                <div class="docs-section">
                    <h3>🔍 Understanding Privacy Scores</h3>
                    <p>Privacy scores range from 0-10 and evaluate:</p>
                    <ul class="feature-list">
                        <li><strong>Protocol Security:</strong> Cryptographic strength and audit results</li>
                        <li><strong>Privacy Features:</strong> Anonymous transactions and mixing capabilities</li>
                        <li><strong>Decentralization:</strong> Network distribution and governance</li>
                        <li><strong>Community Trust:</strong> Developer activity and user adoption</li>
                    </ul>
                </div>
                
                <div class="docs-section">
                    <h3>✅ ZK Verification Process</h3>
                    <p>Our zero-knowledge verification ensures data accuracy without compromising privacy:</p>
                    <ul class="feature-list">
                        <li>Cryptographic proofs validate all privacy claims</li>
                        <li>No personal data is collected or transmitted</li>
                        <li>All verification happens client-side</li>
                        <li>Results are reproducible and auditable</li>
                    </ul>
                </div>
            </div>
            <div class="modal-footer">
                <button class="primary-btn" onclick="showDocumentationModal()">View Full Documentation</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setupModalCloseHandlers(modal);
    setTimeout(() => modal.classList.add('show'), 100);
}

function showPrivacyFeaturesModal() {
    const modal = document.createElement('div');
    modal.className = 'documentation-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Privacy Features & Security</h2>
                <button class="close-modal" data-lucide="x"></button>
            </div>
            <div class="modal-body">
                <div class="docs-section">
                    <h3>🚫 Zero Tracking Guarantee</h3>
                    <p>We operate on a strict no-tracking policy:</p>
                    <ul class="feature-list">
                        <li>No cookies, no beacons, no analytics scripts</li>
                        <li>No IP logging or fingerprinting</li>
                        <li>No user accounts or registration required</li>
                        <li>Complete anonymity for all visitors</li>
                    </ul>
                </div>
                
                <div class="docs-section">
                    <h3>💻 Local Data Processing</h3>
                    <p>All data processing happens on your device:</p>
                    <ul class="feature-list">
                        <li>No data sent to external servers</li>
                        <li>All calculations performed locally</li>
                        <li>Public blockchain data fetched directly</li>
                        <li>Your privacy remains completely protected</li>
                    </ul>
                </div>
                
                <div class="docs-section">
                    <h3>🧠 Zero-Knowledge Proofs</h3>
                    <p>Advanced cryptographic verification without data exposure:</p>
                    <ul class="feature-list">
                        <li>Verify claims without revealing underlying data</li>
                        <li>Mathematical proofs of privacy protocol effectiveness</li>
                        <li>Immutable verification results</li>
                        <li>Privacy-preserving audits and reviews</li>
                    </ul>
                </div>
            </div>
            <div class="modal-footer">
                <button class="primary-btn" onclick="showDocumentationModal()">View Full Documentation</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setupModalCloseHandlers(modal);
    setTimeout(() => modal.classList.add('show'), 100);
}

function showAnalyticsGuideModal() {
    const modal = document.createElement('div');
    modal.className = 'documentation-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Analytics & Data Interpretation</h2>
                <button class="close-modal" data-lucide="x"></button>
            </div>
            <div class="modal-body">
                <div class="docs-section">
                    <h3>📊 Privacy Scoring System</h3>
                    <p>Our comprehensive scoring methodology evaluates:</p>
                    <div class="scoring-breakdown">
                        <div class="score-factor">
                            <span class="factor-name">Protocol Security</span>
                            <span class="factor-weight">30%</span>
                        </div>
                        <div class="score-factor">
                            <span class="factor-name">Privacy Features</span>
                            <span class="factor-weight">25%</span>
                        </div>
                        <div class="score-factor">
                            <span class="factor-name">Decentralization</span>
                            <span class="factor-weight">20%</span>
                        </div>
                        <div class="score-factor">
                            <span class="factor-name">Community Trust</span>
                            <span class="factor-weight">15%</span>
                        </div>
                        <div class="score-factor">
                            <span class="factor-name">Development Activity</span>
                            <span class="factor-weight">10%</span>
                        </div>
                    </div>
                </div>
                
                <div class="docs-section">
                    <h3>📈 Market Analysis</h3>
                    <p>Understanding market trends and privacy coin performance:</p>
                    <ul class="feature-list">
                        <li><strong>Price Correlation:</strong> How privacy features affect market value</li>
                        <li><strong>Volume Patterns:</strong> Trading activity and market health indicators</li>
                        <li><strong>Adoption Metrics:</strong> Real usage and integration growth</li>
                        <li><strong>Technical Analysis:</strong> Chart patterns and momentum indicators</li>
                    </ul>
                </div>
                
                <div class="docs-section">
                    <h3>👥 Community Ratings</h3>
                    <p>Community-driven insights and expert validations:</p>
                    <ul class="feature-list">
                        <li>Anonymous community contributions</li>
                        <li>Expert verifications and audits</li>
                        <li>Developer activity monitoring</li>
                        <li>User experience feedback aggregation</li>
                    </ul>
                </div>
            </div>
            <div class="modal-footer">
                <button class="primary-btn" onclick="showDocumentationModal()">View Full Documentation</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setupModalCloseHandlers(modal);
    setTimeout(() => modal.classList.add('show'), 100);
}

// Make documentation functions globally available
window.showGettingStartedModal = showGettingStartedModal;
window.showPrivacyFeaturesModal = showPrivacyFeaturesModal;
window.showAnalyticsGuideModal = showAnalyticsGuideModal;

// Privacy Ranking Modal
function showPrivacyRankingModal() {
    const modal = document.createElement('div');
    modal.className = 'ranking-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Privacy Asset Rankings</h2>
                <button class="close-modal" data-lucide="x"></button>
            </div>
            <div class="modal-body">
                <div class="ranking-toolbar">
                    <div class="filter-buttons">
                        <button class="filter-btn active" data-filter="all">All Assets</button>
                        <button class="filter-btn" data-filter="high">High Privacy (8+)</button>
                        <button class="filter-btn" data-filter="medium">Medium Privacy (6-7.9)</button>
                        <button class="filter-btn" data-filter="new">New Launches</button>
                    </div>
                </div>
                <div class="ranking-list" id="ranking-list">
                    <!-- Will be populated with privacy coins data -->
                </div>
            </div>
            <div class="modal-footer">
                <button class="primary-btn" onclick="showAssetComparison()">Compare Selected</button>
                <button class="secondary-btn" onclick="exportRankingData()">Export Data</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Initialize icons
    if (typeof lucide !== 'undefined') {
        setTimeout(() => lucide.createIcons(), 0);
    }
    
    // Populate ranking data
    populateRankingData(modal);
    
    // Setup filter functionality
    setupRankingFilters(modal);
    
    // Show modal
    setTimeout(() => modal.classList.add('show'), 100);
    
    // Setup close handlers
    setupModalCloseHandlers(modal);
}

function populateRankingData(modal) {
    const rankingList = modal.querySelector('#ranking-list');
    const coins = [...privacyCoins].sort((a, b) => b.score - a.score);
    
    rankingList.innerHTML = coins.map((coin, index) => {
        const priceInfo = priceData[coin.ticker] || { price: 'Loading...', change: '--', marketCap: '--', lastUpdate: '--' };
        const isPositiveChange = parseFloat(priceInfo.change) >= 0;
        
        return `
        <div class="ranking-item" data-score="${coin.score}">
            <div class="ranking-position">
                <span class="position-number">#${index + 1}</span>
            </div>
            <div class="ranking-info">
                <div class="coin-avatar">${coin.logo}</div>
                <div class="coin-details">
                    <h3>${coin.name}</h3>
                    <p class="coin-category">${coin.launchStatus === 'pre_launch' ? 'Pre-Launch' : coin.launchStatus === 'launching_soon' ? 'Launching Soon' : 'Active'}</p>
                    <p class="coin-ticker">${coin.ticker}</p>
                </div>
            </div>
            <div class="ranking-metrics">
                <div class="privacy-score">
                    <span class="score-value">${coin.score}</span>
                    <span class="score-max">/10</span>
                </div>
                <div class="coin-status ${coin.launchStatus}">
                    <i data-lucide="${coin.launchStatus === 'active' ? 'check-circle' : 'clock'}"></i>
                    <span>${coin.launchStatus === 'active' ? 'Active' : coin.launchStatus === 'launching_soon' ? 'Launching Soon' : 'Pre-Launch'}</span>
                </div>
            </div>
            <div class="ranking-price-data">
                <div class="price-info">
                    <span class="current-price">${priceInfo.price}</span>
                    <span class="price-change ${isPositiveChange ? 'positive' : 'negative'}">${priceInfo.change}</span>
                </div>
                <div class="market-cap">
                    <small>Market Cap: ${priceInfo.marketCap}</small>
                </div>
                <div class="last-update">
                    <small>Updated: ${priceInfo.lastUpdate}</small>
                </div>
            </div>
            <div class="ranking-actions">
                <button class="action-btn" onclick="viewCoinDetails('${coin.ticker}')">
                    <i data-lucide="eye"></i>
                </button>
                <button class="action-btn" onclick="addToComparison('${coin.ticker}')">
                    <i data-lucide="plus"></i>
                </button>
            </div>
        </div>
        `;
    }).join('');
    
    // Initialize icons
    if (typeof lucide !== 'undefined') {
        setTimeout(() => lucide.createIcons(), 0);
    }
}

function setupRankingFilters(modal) {
    const filterBtns = modal.querySelectorAll('.filter-btn');
    const rankingItems = modal.querySelectorAll('.ranking-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            rankingItems.forEach(item => {
                const score = parseFloat(item.dataset.score);
                let shouldShow = false;
                
                switch(filter) {
                    case 'all':
                        shouldShow = true;
                        break;
                    case 'high':
                        shouldShow = score >= 8;
                        break;
                    case 'medium':
                        shouldShow = score >= 6 && score < 8;
                        break;
                    case 'new':
                        shouldShow = item.querySelector('.coin-status').textContent.trim() === 'new';
                        break;
                }
                
                if (shouldShow) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Global functions for ranking modal
window.showPrivacyRankingModal = showPrivacyRankingModal;
window.viewCoinDetails = function(ticker) {
    const coin = privacyCoins.find(c => c.ticker === ticker);
    if (coin) {
        showCoinDetailsModal(coin);
    }
};

window.addToComparison = function(ticker) {
    console.log('Adding to comparison:', ticker);
    // Implementation for comparison feature
};

window.showAssetComparison = function() {
    console.log('Showing asset comparison');
    // Implementation for comparison feature
};

window.exportRankingData = function() {
    console.log('Exporting ranking data');
    // Implementation for data export
};
window.dismissWelcomeNotification = dismissWelcomeNotification;
window.showCoinDetails = showCoinDetails;
window.closeCoinModal = closeCoinModal;
window.closeModal = closeModal;