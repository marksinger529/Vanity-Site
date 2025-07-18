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

    // Add weather/time widget
    addTimeWeatherWidget();

    // Add other subtle widgets
    addVisitorCounter();
    addLastUpdatedWidget();
    addStatusIndicator();
    addQuickStatsWidget();
    addSaveBookmarkWidget();
    addWeatherTimezoneWidget();

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

// Time and weather widget
function addTimeWeatherWidget() {
    const widget = document.createElement('div');
    widget.className = 'time-weather-widget';
    widget.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        padding: 15px;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        font-size: 12px;
        color: var(--text-dark);
        z-index: 1000;
        border: 1px solid var(--border-color);
        min-width: 200px;
    `;

    function updateWidget() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit'
        });
        const dateString = now.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        const hour = now.getHours();
        let greeting = '';
        let emoji = '';
        
        if (hour < 6) {
            greeting = 'Good night';
            emoji = '🌙';
        } else if (hour < 12) {
            greeting = 'Good morning';
            emoji = '☀️';
        } else if (hour < 17) {
            greeting = 'Good afternoon';
            emoji = '🌤️';
        } else if (hour < 21) {
            greeting = 'Good evening';
            emoji = '🌅';
        } else {
            greeting = 'Good night';
            emoji = '🌙';
        }

        widget.innerHTML = `
            <div style="font-weight: 600; margin-bottom: 8px; color: var(--primary-color);">
                ${emoji} ${greeting}!
            </div>
            <div style="margin-bottom: 4px;">🕐 ${timeString}</div>
            <div style="font-size: 11px; opacity: 0.8;">📅 ${dateString}</div>
        `;
    }

    updateWidget();
    setInterval(updateWidget, 1000);
    document.body.appendChild(widget);
}

// Visitor counter (simulated)
function addVisitorCounter() {
    const counter = document.createElement('div');
    counter.className = 'visitor-counter';
    counter.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        padding: 10px 15px;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        font-size: 11px;
        color: var(--text-medium);
        z-index: 1000;
        border: 1px solid var(--border-color);
    `;
    
    // Simulate visitor count (in real app, this would come from analytics)
    const baseCount = 2847;
    const todayVisits = Math.floor(Math.random() * 50) + 15;
    
    counter.innerHTML = `
        <div style="font-weight: 500;">👥 ${(baseCount + todayVisits).toLocaleString()} visits</div>
        <div style="font-size: 10px; opacity: 0.7;">📊 ${todayVisits} today</div>
    `;
    
    document.body.appendChild(counter);
}

// Last updated widget
function addLastUpdatedWidget() {
    const widget = document.createElement('div');
    widget.className = 'last-updated-widget';
    widget.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        padding: 10px 15px;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        font-size: 11px;
        color: var(--text-medium);
        z-index: 1000;
        border: 1px solid var(--border-color);
    `;
    
    const lastUpdate = new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
    });
    
    widget.innerHTML = `
        <div style="font-weight: 500;">🔄 Updated ${lastUpdate}</div>
        <div style="font-size: 10px; opacity: 0.7;">✨ Fresh content</div>
    `;
    
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
                case 'c':
                    e.preventDefault();
                    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
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
        top: 20px;
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
        <div style="font-size: 10px; opacity: 0.7; margin-top: 2px;">🚀 Open to Director/Principal PM roles</div>
    `;
    
    widget.addEventListener('click', () => {
        widget.style.transform = 'scale(0.95)';
        setTimeout(() => {
            widget.style.transform = 'scale(1)';
        }, 150);
    });
    
    document.body.appendChild(widget);
}

// Quick stats widget
function addQuickStatsWidget() {
    const widget = document.createElement('div');
    widget.className = 'quick-stats';
    widget.style.cssText = `
        position: fixed;
        top: 280px;
        right: 20px;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        padding: 15px;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        font-size: 11px;
        color: var(--text-dark);
        z-index: 1000;
        border: 1px solid var(--border-color);
        min-width: 200px;
    `;
    
    widget.innerHTML = `
        <div style="font-weight: 600; margin-bottom: 10px; color: var(--primary-color); font-size: 12px;">📊 Quick Stats</div>
        <div style="display: grid; gap: 6px;">
            <div style="display: flex; justify-content: space-between;">
                <span>💼 Experience:</span>
                <strong>15+ years</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
                <span>🎯 Projects Led:</span>
                <strong>50+ major</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
                <span>👥 Team Size:</span>
                <strong>Up to 75</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
                <span>💰 Budget Managed:</span>
                <strong>$50M+</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
                <span>🏆 Success Rate:</span>
                <strong>99.9%</strong>
            </div>
        </div>
    `;
    
    document.body.appendChild(widget);
}

// Save/Bookmark widget
function addSaveBookmarkWidget() {
    const widget = document.createElement('div');
    widget.className = 'save-bookmark';
    widget.style.cssText = `
        position: fixed;
        top: 20px;
        right: 240px;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        padding: 10px 12px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        font-size: 11px;
        color: var(--text-dark);
        z-index: 1000;
        border: 1px solid var(--border-color);
        cursor: pointer;
        transition: all 0.3s ease;
    `;
    
    let isSaved = localStorage.getItem('markSingerBookmarked') === 'true';
    
    function updateWidget() {
        widget.innerHTML = `
            <div style="display: flex; align-items: center; gap: 6px;">
                <span style="font-size: 14px;">${isSaved ? '🔖' : '📋'}</span>
                <span style="font-weight: 500;">${isSaved ? 'Saved!' : 'Save Profile'}</span>
            </div>
        `;
    }
    
    updateWidget();
    
    widget.addEventListener('click', () => {
        isSaved = !isSaved;
        localStorage.setItem('markSingerBookmarked', isSaved.toString());
        updateWidget();
        
        // Visual feedback
        widget.style.transform = 'scale(0.95)';
        widget.style.background = isSaved ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.95)';
        
        setTimeout(() => {
            widget.style.transform = 'scale(1)';
            if (!isSaved) {
                widget.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        }, 200);
        
        // Show notification
        showNotification(isSaved ? '✅ Profile saved!' : '❌ Bookmark removed');
    });
    
    document.body.appendChild(widget);
}

// Enhanced Weather/Timezone widget
function addWeatherTimezoneWidget() {
    const widget = document.createElement('div');
    widget.className = 'weather-timezone';
    widget.style.cssText = `
        position: fixed;
        top: 200px;
        right: 20px;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        padding: 15px;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        font-size: 11px;
        color: var(--text-dark);
        z-index: 1000;
        border: 1px solid var(--border-color);
        min-width: 200px;
    `;
    
    function updateWeatherWidget() {
        const now = new Date();
        const nyTime = new Date().toLocaleTimeString('en-US', { 
            timeZone: 'America/New_York',
            hour: '2-digit', 
            minute: '2-digit'
        });
        const sfTime = new Date().toLocaleTimeString('en-US', { 
            timeZone: 'America/Los_Angeles',
            hour: '2-digit', 
            minute: '2-digit'
        });
        const londonTime = new Date().toLocaleTimeString('en-US', { 
            timeZone: 'Europe/London',
            hour: '2-digit', 
            minute: '2-digit'
        });
        
        // Simple weather simulation based on time/season
        const hour = now.getHours();
        const month = now.getMonth();
        let weather = '';
        let temp = '';
        
        // Simulate realistic NYC weather
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
        
        widget.innerHTML = `
            <div style="font-weight: 600; margin-bottom: 10px; color: var(--primary-color); font-size: 12px;">🌍 Time & Weather</div>
            <div style="margin-bottom: 8px;">
                <div style="font-weight: 500;">📍 NYC Area</div>
                <div style="margin: 4px 0;">${weather} ${temp}°F</div>
            </div>
            <div style="display: grid; gap: 3px; font-size: 10px; opacity: 0.8;">
                <div>🗽 NYC: ${nyTime}</div>
                <div>🌉 SF: ${sfTime}</div>
                <div>🏰 London: ${londonTime}</div>
            </div>
        `;
    }
    
    updateWeatherWidget();
    setInterval(updateWeatherWidget, 60000); // Update every minute
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