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
        
        try {
            const response = await submitContact(formData);
            
            if (response && response.success) {
                // Show success message
                showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
                form.reset();
            } else {
                showMessage('Failed to send message. Please try again.', 'error');
            }
        } catch (error) {
            showMessage('An error occurred. Please try again.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
});

function showMessage(text, type) {
    // Remove existing messages
    const existing = document.querySelector('.form-message');
    if (existing) existing.remove();
    
    // Create message element
    const message = document.createElement('div');
    message.className = `form-message ${type}`;
    message.textContent = text;
    
    // Add styles
    message.style.cssText = `
        padding: 16px 24px;
        border-radius: 12px;
        margin-top: 20px;
        font-weight: 500;
        animation: slideIn 0.3s ease;
        ${type === 'success' 
            ? 'background: #34c759; color: white;' 
            : 'background: #ff3b30; color: white;'}
    `;
    
    // Insert after form
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(message, form.nextSibling);
    
    // Remove after 5 seconds
    setTimeout(() => message.remove(), 5000);
}
