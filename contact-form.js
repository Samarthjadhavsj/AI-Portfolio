// Contact Form Handler
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject')?.value || '',
            message: document.getElementById('message').value
        };
        
        // Disable button and show loading
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        submitBtn.style.opacity = '0.6';
        
        try {
            const response = await submitContact(formData);
            
            if (response && response.success) {
                // Show premium success overlay
                showSuccessOverlay();
                form.reset();
            } else {
                showErrorMessage();
            }
        } catch (error) {
            showErrorMessage();
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            submitBtn.style.opacity = '1';
        }
    });
});

function showSuccessOverlay() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    // Create success card
    const card = document.createElement('div');
    card.style.cssText = `
        background: white;
        border-radius: 20px;
        padding: 48px 40px;
        max-width: 400px;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    `;
    
    card.innerHTML = `
        <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #34c759 0%, #30d158 100%); border-radius: 50%; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center; animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s backwards;">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
        </div>
        <h3 style="font-size: 24px; font-weight: 600; color: #1d1d1f; margin: 0 0 12px 0; letter-spacing: -0.5px;">Message Sent</h3>
        <p style="font-size: 17px; color: #86868b; line-height: 1.5; margin: 0;">Thanks for reaching out. I'll get back to you soon.</p>
    `;
    
    overlay.appendChild(card);
    document.body.appendChild(overlay);
    
    // Add animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from { 
                opacity: 0;
                transform: translateY(20px) scale(0.95);
            }
            to { 
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        @keyframes scaleIn {
            from { 
                transform: scale(0);
                opacity: 0;
            }
            to { 
                transform: scale(1);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Close on click
    overlay.addEventListener('click', () => {
        overlay.style.animation = 'fadeOut 0.2s ease';
        setTimeout(() => overlay.remove(), 200);
    });
    
    // Auto close after 3 seconds
    setTimeout(() => {
        overlay.style.animation = 'fadeOut 0.2s ease';
        setTimeout(() => overlay.remove(), 200);
    }, 3000);
}

function showErrorMessage() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    // Create error card
    const card = document.createElement('div');
    card.style.cssText = `
        background: white;
        border-radius: 20px;
        padding: 48px 40px;
        max-width: 400px;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    `;
    
    card.innerHTML = `
        <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #ff3b30 0%, #ff453a 100%); border-radius: 50%; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center;">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
        </div>
        <h3 style="font-size: 24px; font-weight: 600; color: #1d1d1f; margin: 0 0 12px 0; letter-spacing: -0.5px;">Something Went Wrong</h3>
        <p style="font-size: 17px; color: #86868b; line-height: 1.5; margin: 0;">Please try again later.</p>
    `;
    
    overlay.appendChild(card);
    document.body.appendChild(overlay);
    
    // Close on click
    overlay.addEventListener('click', () => {
        overlay.style.animation = 'fadeOut 0.2s ease';
        setTimeout(() => overlay.remove(), 200);
    });
    
    // Auto close after 3 seconds
    setTimeout(() => {
        overlay.style.animation = 'fadeOut 0.2s ease';
        setTimeout(() => overlay.remove(), 200);
    }, 3000);
}

// Add fadeOut animation
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(fadeOutStyle);

