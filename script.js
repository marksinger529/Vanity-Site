// Modern Interactive Features for Mark Singer's Website

// Smooth scrolling for navigation links
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

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all sections for animations
    const sections = document.querySelectorAll('section, .job, .skill-category');
    sections.forEach(section => {
        section.classList.add('fade-in-element');
        observer.observe(section);
    });

    // Typing effect for tagline
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
                setTimeout(typeWriter, 100);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    tagline.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 1500);
    }

    // Skill tag interaction effects
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        // Add click effect
        tag.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Add a ripple effect
            createRipple(this, event);
        });

        // Add double-click for "favorite" effect
        tag.addEventListener('dblclick', function() {
            this.classList.toggle('favorited');
            if (this.classList.contains('favorited')) {
                this.style.background = 'linear-gradient(45deg, #f59e0b, #d97706)';
                this.style.color = 'white';
                this.style.fontWeight = '600';
                // Add a star emoji
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

    // Create ripple effect function
    function createRipple(element, event) {
        const circle = document.createElement('span');
        const diameter = Math.max(element.clientWidth, element.clientHeight);
        const radius = diameter / 2;

        const rect = element.getBoundingClientRect();
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - rect.left - radius}px`;
        circle.style.top = `${event.clientY - rect.top - radius}px`;
        circle.classList.add('ripple');

        const ripple = element.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }

        element.appendChild(circle);
    }

    // Parallax effect for header
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.main-header');
        if (header) {
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add progress bar
    createProgressBar();

    // Job card hover effects with enhanced animations
    const jobs = document.querySelectorAll('.job');
    jobs.forEach(job => {
        job.addEventListener('mouseenter', function() {
            this.style.borderLeft = '4px solid var(--primary-color)';
        });
        
        job.addEventListener('mouseleave', function() {
            this.style.borderLeft = '';
        });
    });

    // Contact form interaction (if contact form exists)
    enhanceContactSection();

    // Add loading animation completion
    document.body.classList.add('loaded');

    // Add Easter egg for Konami code
    addKonamiCode();
});

// Progress bar functionality
function createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;
        
        const progressBarFill = document.querySelector('.scroll-progress-bar');
        if (progressBarFill) {
            progressBarFill.style.width = scrolled + '%';
        }
    });
}

// Enhance contact section
function enhanceContactSection() {
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const link = this.querySelector('a');
            if (link) {
                // Add a subtle flash effect
                this.style.background = 'var(--primary-color)';
                this.style.color = 'white';
                setTimeout(() => {
                    this.style.background = '';
                    this.style.color = '';
                }, 200);
            }
        });
    });
}

// Add Konami Code Easter Egg
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
    // Add confetti effect or fun animation
    document.body.style.animation = 'rainbow 2s infinite';
    
    // Show a fun message
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