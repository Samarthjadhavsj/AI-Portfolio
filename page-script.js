// Page Script for Separate HTML Pages

// Navbar background on scroll with class toggle
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.skill-card, .project-card, .experience-card, .about-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject')?.value || 'Portfolio Contact',
            message: document.getElementById('message').value
        };
        
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            
            if (response.ok) {
                // Success message
                const successMsg = document.createElement('div');
                successMsg.style.cssText = 'background: #34C759; color: white; padding: 16px; border-radius: 12px; margin-top: 16px; text-align: center;';
                successMsg.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
                contactForm.appendChild(successMsg);
                
                contactForm.reset();
                
                setTimeout(() => successMsg.remove(), 5000);
            } else {
                throw new Error(data.error || 'Failed to send message');
            }
        } catch (error) {
            console.error('Error:', error);
            
            // Error message
            const errorMsg = document.createElement('div');
            errorMsg.style.cssText = 'background: #FF3B30; color: white; padding: 16px; border-radius: 12px; margin-top: 16px; text-align: center;';
            errorMsg.textContent = '✗ Failed to send message. Please try emailing directly.';
            contactForm.appendChild(errorMsg);
            
            setTimeout(() => errorMsg.remove(), 5000);
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}
