// ZKPrivacy Index - JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Privacy coins data
    const privacyCoins = [
        {
            name: "Monero",
            ticker: "XMR",
            score: 9.2,
            logo: "XMR",
            features: ["Ring Signatures", "Stealth Addresses", "Confidential Transactions"],
            verified: true,
            marketCap: "$2.1B",
            price: "$184.32",
            change: "+5.2%"
        },
        {
            name: "Zcash",
            ticker: "ZEC",
            score: 8.7,
            logo: "ZEC",
            features: ["zk-SNARKs", "Shielded Addresses", "Selective Disclosure"],
            verified: true,
            marketCap: "$890M",
            price: "$47.23",
            change: "+2.1%"
        },
        {
            name: "Beam",
            ticker: "BEAM",
            score: 7.8,
            logo: "BEAM",
            features: ["Mimblewimble", "Confidential Assets", "Atomic Swaps"],
            verified: true,
            marketCap: "$67M",
            price: "$0.34",
            change: "+8.7%"
        },
        {
            name: "Grin",
            ticker: "GRIN",
            score: 7.5,
            logo: "GRIN",
            features: ["Mimblewimble", "Proof of Work", "Coin Cuts"],
            verified: true,
            marketCap: "$45M",
            price: "$0.12",
            change: "+12.3%"
        },
        {
            name: "Dash",
            ticker: "DASH",
            score: 6.8,
            logo: "DASH",
            features: ["PrivateSend", "InstantSend", "Governance"],
            verified: false,
            marketCap: "$420M",
            price: "$37.89",
            change: "+1.4%"
        },
        {
            name: "Horizen",
            ticker: "ZEN",
            score: 6.5,
            logo: "ZEN",
            features: ["zk-SNARKs", "Sidechains", "Decentralized Apps"],
            verified: false,
            marketCap: "$180M",
            price: "$8.76",
            change: "+3.2%"
        }
    ];

    // Populate privacy grid
    function populatePrivacyGrid(filter = 'all') {
        const grid = document.getElementById('privacy-grid');
        if (!grid) return;
        
        grid.innerHTML = '';
        
        const filteredCoins = filter === 'all' ? privacyCoins : 
                            filter === 'coins' ? privacyCoins.filter(c => c.score >= 8) :
                            privacyCoins; // Default to all for now
        
        filteredCoins.forEach(coin => {
            const card = createPrivacyCard(coin);
            grid.appendChild(card);
        });
    }

    // Create privacy card
    function createPrivacyCard(coin) {
        const card = document.createElement('div');
        card.className = 'privacy-card';
        
        const scoreColor = coin.score >= 8 ? 'var(--success)' : 
                          coin.score >= 7 ? 'var(--warning)' : 'var(--error)';
        
        card.innerHTML = `
            <div class="privacy-card-header">
                <div class="coin-logo">${coin.logo}</div>
                <div class="coin-info">
                    <h3>${coin.name}</h3>
                    <div class="coin-ticker">${coin.ticker}</div>
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
                <a href="#" class="view-details">View Details</a>
            </div>
        `;
        
        // Add click handler for details
        card.addEventListener('click', () => showCoinDetails(coin));
        
        // Initialize icons in the new card
        if (typeof lucide !== 'undefined') {
            setTimeout(() => lucide.createIcons(), 0);
        }
        
        return card;
    }

    // Show coin details (placeholder)
    function showCoinDetails(coin) {
        alert(`Detailed view for ${coin.name} (${coin.ticker})\n\nPrivacy Score: ${coin.score}/10\nMarket Cap: ${coin.marketCap}\nCurrent Price: ${coin.price}\n24h Change: ${coin.change}\n\nFeatures:\n${coin.features.map(f => '• ' + f).join('\n')}`);
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
        if (e.key === 'Escape') {
            const searchInput = document.getElementById('crypto-search');
            if (searchInput && searchInput.value) {
                searchInput.value = '';
                populatePrivacyGrid();
            }
        }
    });
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