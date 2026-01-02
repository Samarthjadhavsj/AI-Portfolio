// Double-click SAM logo to access admin (hidden feature)
// Single click works normally (goes to index.html via href)
document.addEventListener('DOMContentLoaded', function() {
    const samLogo = document.querySelector('.nav-logo');
    
    if (samLogo) {
        let clickCount = 0;
        let clickTimer = null;
        
        samLogo.addEventListener('click', function(e) {
            e.preventDefault(); // Always prevent default first
            clickCount++;
            
            if (clickCount === 1) {
                clickTimer = setTimeout(() => {
                    // Single click - navigate to index.html
                    window.location.href = samLogo.getAttribute('href') || '/index.html';
                    clickCount = 0;
                }, 400); // 400ms window for double-click detection
            } else if (clickCount === 2) {
                // Double click - go to admin
                clearTimeout(clickTimer);
                window.location.href = '/admin/login.html';
                clickCount = 0;
            }
        });
    }
});
