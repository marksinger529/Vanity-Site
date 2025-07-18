// Simplified Interactive Features for Mark Singer's Website

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll for navigation
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Simple typing effect for tagline
    const tagline = document.querySelector('.tagline');
    if (tagline) {
        const text = tagline.textContent;
        tagline.textContent = '';
        tagline.style.borderRight = '2px solid white';
        tagline.style.width = 'fit-content';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            } else {
                setTimeout(() => {
                    tagline.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        setTimeout(typeWriter, 1500);
    }

    // Simple skill tag interactions (just favorites, no +1 text)
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        // Double-click for favorites only
        tag.addEventListener('dblclick', function(e) {
            e.preventDefault();
            this.classList.toggle('favorited');
            if (this.classList.contains('favorited')) {
                this.style.background = 'linear-gradient(45deg, #f59e0b, #d97706)';
                this.style.color = 'white';
                this.style.fontWeight = '600';
                if (!this.textContent.includes('⭐')) {
                    this.textContent += ' ⭐';
                }
            } else {
                this.style.background = '';
                this.style.color = '';
                this.style.fontWeight = '';
                this.textContent = this.textContent.replace(' ⭐', '');
            }
        });
    });

    // Simple progress bar
    createProgressBar();
    
    // Console log to confirm widgets were removed
    console.log('🚀🚀🚀 FRESH LOAD - ALL WIDGETS REMOVED! 🚀🚀🚀');
    console.log('Only remaining widgets: Status Indicator & Last Updated');
    console.log('Navigation should be sticky with z-index 1001');

    // Add other subtle widgets
    addStatusIndicator();
    addSmallWeatherWidget();

    // Enhanced Konami code (keep this fun feature)
    addKonamiCode();

    // Keyboard shortcuts
    addKeyboardShortcuts();
});

// Simple progress bar
function createProgressBar() {
    const progressContainer = document.createElement('div');
    progressContainer.className = 'scroll-progress';
    progressContainer.innerHTML = `
        <div class="scroll-progress-bar"></div>
        <div class="scroll-percentage">0%</div>
    `;
    document.body.appendChild(progressContainer);

    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;
        
        const progressBar = document.querySelector('.scroll-progress-bar');
        const percentage = document.querySelector('.scroll-percentage');
        
        if (progressBar) progressBar.style.width = scrolled + '%';
        if (percentage) percentage.textContent = Math.round(scrolled) + '%';
    });
}





// Small weather widget
function addSmallWeatherWidget() {
    const widget = document.createElement('div');
    widget.className = 'small-weather-widget';
    widget.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        padding: 12px 15px;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        font-size: 11px;
        color: var(--text-medium);
        z-index: 1000;
        border: 1px solid var(--border-color);
        min-width: 120px;
    `;
    
    function updateWeather() {
        const now = new Date();
        const hour = now.getHours();
        const month = now.getMonth();
        
        // Simple weather simulation based on season/time
        let weather = '';
        let temp = '';
        
        if (month >= 11 || month <= 2) { // Winter
            weather = hour < 18 ? '❄️ Snow' : '🌙 Clear';
            temp = Math.floor(Math.random() * 20) + 25; // 25-45°F
        } else if (month >= 3 && month <= 5) { // Spring
            weather = hour < 17 ? '🌸 Mild' : '🌙 Cool';
            temp = Math.floor(Math.random() * 25) + 50; // 50-75°F
        } else if (month >= 6 && month <= 8) { // Summer
            weather = hour < 19 ? '☀️ Sunny' : '🌙 Warm';
            temp = Math.floor(Math.random() * 20) + 75; // 75-95°F
        } else { // Fall
            weather = hour < 17 ? '🍂 Crisp' : '🌙 Cool';
            temp = Math.floor(Math.random() * 25) + 55; // 55-80°F
        }
        
        const time = now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit'
        });
        
        widget.innerHTML = `
            <div style="font-weight: 500; margin-bottom: 4px;">🌍 NYC</div>
            <div style="font-size: 10px; opacity: 0.8;">${weather} ${temp}°F</div>
            <div style="font-size: 10px; opacity: 0.7;">🕐 ${time}</div>
        `;
    }
    
    updateWeather();
    setInterval(updateWeather, 60000); // Update every minute
    document.body.appendChild(widget);
}

// Konami code
function addKonamiCode() {
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    let userInput = [];

    document.addEventListener('keydown', (e) => {
        userInput.push(e.code);
        if (userInput.length > konamiCode.length) {
            userInput.shift();
        }
        
        if (userInput.join(',') === konamiCode.join(',')) {
            triggerEasterEgg();
            userInput = [];
        }
    });
}

function triggerEasterEgg() {
    document.body.style.animation = 'rainbow 2s infinite';
    
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7);
        background-size: 300% 300%;
        animation: rainbow 2s ease infinite;
        padding: 2rem;
        border-radius: 1rem;
        color: white;
        font-weight: bold;
        font-size: 1.2rem;
        text-align: center;
        z-index: 9999;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    `;
    message.innerHTML = '🎉 You found the Easter egg! <br>Mark appreciates attention to detail! 🎉';
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
        document.body.style.animation = '';
    }, 3000);
}

// Keyboard shortcuts
function addKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 'h':
                    e.preventDefault();
                    document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
                    break;
                case 'e':
                    e.preventDefault();
                    document.querySelector('#experience').scrollIntoView({ behavior: 'smooth' });
                    break;
                case 's':
                    e.preventDefault();
                    document.querySelector('#skills').scrollIntoView({ behavior: 'smooth' });
                    break;

            }
        }
    });
}

// Status indicator widget
function addStatusIndicator() {
    const widget = document.createElement('div');
    widget.className = 'status-indicator';
    widget.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        padding: 12px 16px;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        font-size: 12px;
        color: var(--text-dark);
        z-index: 1000;
        border: 1px solid var(--border-color);
        cursor: pointer;
        transition: all 0.3s ease;
    `;
    
    widget.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
            <div style="width: 8px; height: 8px; background: #10b981; border-radius: 50%; animation: pulse 2s infinite;"></div>
            <div style="font-weight: 600; color: var(--primary-color);">Available for opportunities</div>
        </div>
        <div style="font-size: 10px; opacity: 0.7; margin-top: 2px;">📧 Director/Principal/Staff/Senior PM roles</div>
    `;
    
    widget.addEventListener('click', () => {
        widget.style.transform = 'scale(0.95)';
        setTimeout(() => {
            widget.style.transform = 'scale(1)';
        }, 150);
        
        // Open email to Mark Singer
        const subject = encodeURIComponent('Program Manager Opportunity - Interest in Your Background');
        const body = encodeURIComponent('Hi Mark, I came across your profile and am interested in discussing a potential Program Manager opportunity.');
        
        window.open(`mailto:markharrissinger@gmail.com?subject=${subject}&body=${body}`, '_blank');
    });
    
    document.body.appendChild(widget);
}







// Notification helper
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 50px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 10px 15px;
        border-radius: 8px;
        font-size: 12px;
        font-weight: 500;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}