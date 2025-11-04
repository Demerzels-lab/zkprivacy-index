// Simple ZKPrivacy Index JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('ZKPrivacy Index loaded successfully');
    
    // Simple animations for coin cards
    const coinCards = document.querySelectorAll('.coin-card');
    
    coinCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.style.animation = 'fadeInUp 0.6s ease forwards';
    });
    
    // Add click interaction to coin cards
    coinCards.forEach(card => {
        card.addEventListener('click', function() {
            const coinName = this.querySelector('h4').textContent;
            alert(`${coinName} - Click for detailed analytics (coming soon!)`);
        });
    });
    
    // Add subtle hover effects
    const features = document.querySelector('.features');
    const intro = document.querySelector('.intro');
    
    if (features) {
        features.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        features.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }
    
    // Add smooth scrolling for any future navigation
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
    
    // Add loading state management
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
});

// Add CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .coin-card {
        opacity: 0;
    }
    
    .coin-card.loaded {
        opacity: 1;
    }
    
    body.loaded .coin-card {
        animation: fadeInUp 0.6s ease forwards;
    }
`;
document.head.appendChild(style);