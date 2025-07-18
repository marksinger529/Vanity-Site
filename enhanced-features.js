// Contact Form Functions
function openContactForm() {
    const modal = document.getElementById('contact-modal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeContactForm() {
    const modal = document.getElementById('contact-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Reset form
    document.getElementById('contact-form').reset();
    document.getElementById('form-success').style.display = 'none';
}

function submitContactForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Track form submission
    if (typeof trackContactClick === 'function') {
        trackContactClick('contact_form_submit');
    }
    
    // Simulate form submission (in real implementation, send to your backend)
    console.log('Contact form submitted:', data);
    
    // Show success message
    document.getElementById('contact-form').style.display = 'none';
    document.getElementById('form-success').style.display = 'block';
    
    // Send email using mailto as fallback
    const subject = encodeURIComponent(`PM Opportunity: ${data.position} from ${data.name}`);
    const body = encodeURIComponent(`Name: ${data.name}
Email: ${data.email}
Company: ${data.company || 'Not specified'}
Position Level: ${data.position}

Message:
${data.message}`);
    
    setTimeout(() => {
        window.open(`mailto:markharrissinger@gmail.com?subject=${subject}&body=${body}`, '_blank');
    }, 1000);
    
    // Close form after 3 seconds
    setTimeout(() => {
        closeContactForm();
    }, 3000);
}

// Back to Top Button
function addBackToTopButton() {
    const button = document.createElement('div');
    button.className = 'back-to-top';
    button.innerHTML = '↑';
    button.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 20px;
        font-weight: bold;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (typeof trackContactClick === 'function') {
            trackContactClick('back_to_top');
        }
    });
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.opacity = '1';
            button.style.transform = 'scale(1)';
        } else {
            button.style.opacity = '0';
            button.style.transform = 'scale(0.8)';
        }
    });
    
    document.body.appendChild(button);
}

// Swipe Gestures for Mobile Navigation
function addSwipeGestures() {
    let startX, startY, currentSection = 0;
    const sections = document.querySelectorAll('section');
    
    document.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', (e) => {
        if (!startX || !startY) return;
        
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        // Only trigger if horizontal swipe is longer than vertical
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0 && currentSection < sections.length - 1) {
                // Swipe left - next section
                currentSection++;
                sections[currentSection].scrollIntoView({ behavior: 'smooth' });
            } else if (diffX < 0 && currentSection > 0) {
                // Swipe right - previous section
                currentSection--;
                sections[currentSection].scrollIntoView({ behavior: 'smooth' });
            }
        }
        
        startX = startY = null;
    });
}

// Touch Optimized Contact Buttons
function addTouchOptimizedButtons() {
    // Add touch feedback to all buttons and links
    const touchElements = document.querySelectorAll('a, button, .widget, .skill');
    
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
            this.style.transition = 'transform 0.1s ease';
        });
        
        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });
    
    // Add haptic feedback if available
    if ('vibrate' in navigator) {
        document.querySelectorAll('.status-indicator, .back-to-top').forEach(element => {
            element.addEventListener('click', () => {
                navigator.vibrate(50); // Short haptic feedback
            });
        });
    }
}