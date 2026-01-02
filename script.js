// Apple-Inspired Portfolio JavaScript

// Navigation and Section Management
const navLinks = document.querySelectorAll('.nav-link');
const allSections = document.querySelectorAll('.page-section');
const heroSection = document.querySelector('.hero');

// Hide all sections except hero on load
allSections.forEach(section => {
    section.style.display = 'none';
});

// Show hero by default
heroSection.style.display = 'block';

// Handle navigation clicks
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const sectionId = this.getAttribute('data-section');
        const targetSection = document.getElementById(sectionId);
        
        if (targetSection) {
            // Hide all sections including hero
            allSections.forEach(section => {
                section.style.display = 'none';
            });
            heroSection.style.display = 'none';
            
            // Show target section
            targetSection.style.display = 'block';
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
});

// Logo click returns to home
document.querySelector('.nav-logo').addEventListener('click', function(e) {
    e.preventDefault();
    
    // Hide all sections
    allSections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Show hero
    heroSection.style.display = 'block';
    
    // Remove active from all nav links
    navLinks.forEach(l => l.classList.remove('active'));
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Navbar background on scroll
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(251, 251, 253, 0.92)';
    } else {
        nav.style.background = 'rgba(251, 251, 253, 0.8)';
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

// Observe all cards and sections
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
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
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
            
            if (response.ok) {
                alert('Message sent successfully!');
                contactForm.reset();
            } else {
                alert('Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    });
}

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground && heroSection.style.display === 'block') {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});
