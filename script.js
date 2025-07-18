// Modern Interactive Features for Mark Singer's Website

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    
    // Add preload class to prevent animations on load
    document.body.classList.add('preload');
    setTimeout(() => document.body.classList.remove('preload'), 500);
    
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
                
                // Add a subtle flash to the target section
                targetSection.style.boxShadow = '0 0 20px rgba(37, 99, 235, 0.3)';
                setTimeout(() => {
                    targetSection.style.boxShadow = '';
                }, 1000);
            }
        });
    });

    // Advanced Intersection Observer for sophisticated animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special animations for different elements
                if (entry.target.classList.contains('skill-category')) {
                    animateSkillTags(entry.target);
                }
                if (entry.target.classList.contains('job')) {
                    animateJobCard(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe all sections for animations
    const sections = document.querySelectorAll('section, .job, .skill-category');
    sections.forEach(section => {
        section.classList.add('fade-in-element');
        observer.observe(section);
    });

    // Enhanced typing effect with cursor
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
                setTimeout(typeWriter, 80 + Math.random() * 40); // Variable speed for realism
            } else {
                // Blinking cursor effect
                let blinks = 0;
                const blinkCursor = () => {
                    tagline.style.borderRight = blinks % 2 === 0 ? '2px solid white' : '2px solid transparent';
                    blinks++;
                    if (blinks < 6) {
                        setTimeout(blinkCursor, 500);
                    } else {
                        tagline.style.borderRight = 'none';
                    }
                };
                setTimeout(blinkCursor, 1000);
            }
        };
        
        setTimeout(typeWriter, 1500);
    }

    // Enhanced skill tag interactions
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        // 3D tilt effect
        tag.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 4;
            const rotateY = (centerX - x) / 4;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        // Enhanced click effect with sound simulation
        tag.addEventListener('click', function(e) {
            createAdvancedRipple(this, e);
            createFloatingText(this, '+1 Skill');
            
            // Vibration for mobile devices
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
        });

        // Double-click for favorites with enhanced effects
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
                createBurstEffect(this);
            } else {
                this.style.background = '';
                this.style.color = '';
                this.style.fontWeight = '';
                this.textContent = this.textContent.replace(' ⭐', '');
            }
        });
    });

    // Advanced parallax and scroll effects
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const header = document.querySelector('.main-header');
                
                // Enhanced parallax
                if (header) {
                    header.style.transform = `translateY(${scrolled * 0.3}px)`;
                    
                    // Dynamic header opacity
                    const opacity = Math.max(0.8, 1 - scrolled / 400);
                    header.style.opacity = opacity;
                }
                
                // Floating elements effect
                const jobs = document.querySelectorAll('.job');
                jobs.forEach((job, index) => {
                    const rect = job.getBoundingClientRect();
                    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                    
                    if (isVisible) {
                        const offset = (scrolled + rect.top) * 0.02 * (index % 2 === 0 ? 1 : -1);
                        job.style.transform = `translateX(${offset}px)`;
                    }
                });
                
                ticking = false;
            });
            ticking = true;
        }
    });

    // Create dynamic particle background
    createParticleBackground();

    // Add progress bar with enhanced styling
    createAdvancedProgressBar();

    // Enhanced job card interactions
    const jobs = document.querySelectorAll('.job');
    jobs.forEach((job, index) => {
        job.addEventListener('mouseenter', function() {
            this.style.borderLeft = '4px solid var(--primary-color)';
            this.style.transform = 'translateY(-5px) scale(1.02)';
            
            // Add glow effect
            this.style.boxShadow = '0 20px 40px rgba(37, 99, 235, 0.15)';
        });
        
        job.addEventListener('mouseleave', function() {
            this.style.borderLeft = '';
            this.style.transform = '';
            this.style.boxShadow = '';
        });
        
        // Add click to expand functionality
        job.addEventListener('click', function() {
            this.classList.toggle('expanded');
            if (this.classList.contains('expanded')) {
                this.style.maxHeight = 'none';
                createSparkleEffect(this);
            }
        });
    });

    // Mouse follower effect
    createMouseFollower();

    // Enhanced contact section
    enhanceContactSection();

    // Add loading completion
    document.body.classList.add('loaded');

    // Konami code with enhanced effects
    addEnhancedKonamiCode();

    // Add dynamic time-based greetings
    addDynamicGreeting();

    // Keyboard shortcuts
    addKeyboardShortcuts();
});

// Advanced skill tag animation
function animateSkillTags(container) {
    const tags = container.querySelectorAll('.skill-tag');
    tags.forEach((tag, index) => {
        setTimeout(() => {
            tag.style.opacity = '0';
            tag.style.transform = 'translateY(20px) scale(0.8)';
            tag.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            
            setTimeout(() => {
                tag.style.opacity = '1';
                tag.style.transform = 'translateY(0) scale(1)';
            }, 50);
        }, index * 100);
    });
}

// Job card entrance animation
function animateJobCard(card) {
    card.style.transform = 'rotateY(-90deg)';
    card.style.opacity = '0';
    
    setTimeout(() => {
        card.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
        card.style.transform = 'rotateY(0deg)';
        card.style.opacity = '1';
    }, 100);
}

// Advanced ripple effect
function createAdvancedRipple(element, event) {
    const rect = element.getBoundingClientRect();
    const ripple = document.createElement('span');
    
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: advancedRipple 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        pointer-events: none;
        z-index: 10;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 800);
}

// Floating text effect
function createFloatingText(element, text) {
    const floater = document.createElement('div');
    floater.textContent = text;
    floater.style.cssText = `
        position: absolute;
        top: -20px;
        left: 50%;
        transform: translateX(-50%);
        color: var(--primary-color);
        font-weight: bold;
        font-size: 12px;
        pointer-events: none;
        animation: floatUp 1s ease-out forwards;
        z-index: 1000;
    `;
    
    element.style.position = 'relative';
    element.appendChild(floater);
    setTimeout(() => floater.remove(), 1000);
}

// Burst effect for favorites
function createBurstEffect(element) {
    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #f59e0b;
            border-radius: 50%;
            top: 50%;
            left: 50%;
            pointer-events: none;
            animation: burst 0.6s ease-out forwards;
            animation-delay: ${i * 0.1}s;
            transform: translate(-50%, -50%) rotate(${i * 60}deg) translateY(-20px);
        `;
        element.appendChild(particle);
        setTimeout(() => particle.remove(), 600);
    }
}

// Particle background
function createParticleBackground() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.1;
    `;
    
    document.body.appendChild(canvas);
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resize();
    window.addEventListener('resize', resize);
    
    const particles = [];
    
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            dx: (Math.random() - 0.5) * 0.5,
            dy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.x += particle.dx;
            particle.y += particle.dy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.dx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.dy *= -1;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = '#3b82f6';
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Advanced progress bar
function createAdvancedProgressBar() {
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

// Mouse follower
function createMouseFollower() {
    const follower = document.createElement('div');
    follower.className = 'mouse-follower';
    follower.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, var(--primary-color), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    document.body.appendChild(follower);
    
    document.addEventListener('mousemove', (e) => {
        follower.style.left = (e.clientX - 10) + 'px';
        follower.style.top = (e.clientY - 10) + 'px';
        follower.style.opacity = '0.6';
    });
    
    document.addEventListener('mouseout', () => {
        follower.style.opacity = '0';
    });
}

// Enhanced contact section
function enhanceContactSection() {
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            createRingEffect(this);
            
            // Enhanced flash effect
            this.style.background = 'linear-gradient(45deg, var(--primary-color), var(--primary-light))';
            this.style.color = 'white';
            this.style.transform = 'scale(1.05)';
            
            setTimeout(() => {
                this.style.background = '';
                this.style.color = '';
                this.style.transform = '';
            }, 300);
        });
    });
}

// Ring effect
function createRingEffect(element) {
    const ring = document.createElement('div');
    ring.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border: 2px solid var(--primary-color);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: ringExpand 0.6s ease-out;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ring);
    setTimeout(() => ring.remove(), 600);
}

// Sparkle effect
function createSparkleEffect(element) {
    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.cssText = `
            position: absolute;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: sparkle 1s ease-out forwards;
            pointer-events: none;
            z-index: 1000;
        `;
        element.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000);
    }
}

// Enhanced Konami code
function addEnhancedKonamiCode() {
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
            triggerEnhancedEasterEgg();
            userInput = [];
        }
    });
}

function triggerEnhancedEasterEgg() {
    // Create confetti
    createConfetti();
    
    // Rainbow effect
    document.body.style.animation = 'rainbow 2s infinite';
    
    // Enhanced message
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7);
        background-size: 300% 300%;
        animation: rainbow 2s ease infinite;
        padding: 3rem;
        border-radius: 2rem;
        color: white;
        font-weight: bold;
        font-size: 1.5rem;
        text-align: center;
        z-index: 10000;
        box-shadow: 0 30px 60px rgba(0,0,0,0.3);
        border: 3px solid white;
    `;
    message.innerHTML = '🎉🎉🎉<br>KONAMI CODE ACTIVATED!<br>Mark appreciates attention to detail!<br>🎉🎉🎉';
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
        document.body.style.animation = '';
    }, 4000);
}

// Confetti effect
function createConfetti() {
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            top: -10px;
            left: ${Math.random() * 100}%;
            width: 10px;
            height: 10px;
            background: hsl(${Math.random() * 360}, 100%, 50%);
            animation: confettiFall 3s linear forwards;
            transform: rotate(${Math.random() * 360}deg);
            z-index: 10001;
        `;
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 3000);
    }
}

// Dynamic greeting based on time
function addDynamicGreeting() {
    const hour = new Date().getHours();
    let greeting = '';
    
    if (hour < 12) greeting = 'Good morning! ☀️';
    else if (hour < 17) greeting = 'Good afternoon! 🌤️';
    else greeting = 'Good evening! 🌙';
    
    const greetingEl = document.createElement('div');
    greetingEl.textContent = greeting;
    greetingEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 10px 15px;
        border-radius: 20px;
        font-size: 14px;
        z-index: 1000;
        animation: slideInRight 0.5s ease-out;
    `;
    
    document.body.appendChild(greetingEl);
    
    setTimeout(() => {
        greetingEl.style.animation = 'slideOutRight 0.5s ease-out forwards';
        setTimeout(() => greetingEl.remove(), 500);
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