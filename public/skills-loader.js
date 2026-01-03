// Dynamic Skills Loader
async function loadSkills() {
    const skillsContainer = document.querySelector('.skills-grid');
    
    if (!skillsContainer) return;

    // Show loading state
    skillsContainer.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
            <div style="display: inline-block; width: 40px; height: 40px; border: 3px solid #f3f3f3; border-top: 3px solid #0071E3; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <p style="margin-top: 20px; color: #86868b; font-size: 17px;">Loading skills...</p>
        </div>
    `;

    try {
        const skills = await getSkills();
        
        if (!skills || skills.length === 0) {
            skillsContainer.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                    <p style="color: #86868b; font-size: 19px;">No skills available yet.</p>
                </div>
            `;
            return;
        }

        // Icon mapping with SVG icons
        const iconMap = {
            'code': `<svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <rect width="48" height="48" rx="10" fill="#0071E3" opacity="0.1"/>
                <path d="M24 16L16 20V28L24 32L32 28V20L24 16Z" stroke="#0071E3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16 20L24 24L32 20" stroke="#0071E3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M24 24V32" stroke="#0071E3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`,
            'library': `<svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <rect width="48" height="48" rx="10" fill="#7B61FF" opacity="0.1"/>
                <rect x="14" y="14" width="8" height="8" rx="1" stroke="#7B61FF" stroke-width="2"/>
                <rect x="26" y="14" width="8" height="8" rx="1" stroke="#7B61FF" stroke-width="2"/>
                <rect x="14" y="26" width="8" height="8" rx="1" stroke="#7B61FF" stroke-width="2"/>
                <rect x="26" y="26" width="8" height="8" rx="1" stroke="#7B61FF" stroke-width="2"/>
            </svg>`,
            'tools': `<svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <rect width="48" height="48" rx="10" fill="#FF6482" opacity="0.1"/>
                <path d="M20 28L16 32L20 36M28 28L32 32L28 36M26 20L22 40" stroke="#FF6482" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`,
            'ai-technology': `<svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <rect width="48" height="48" rx="10" fill="#FF6482" opacity="0.1"/>
                <circle cx="24" cy="18" r="4" stroke="#FF6482" stroke-width="2"/>
                <path d="M16 30C16 26.6863 18.6863 24 22 24H26C29.3137 24 32 26.6863 32 30V32C32 33.1046 31.1046 34 30 34H18C16.8954 34 16 33.1046 16 32V30Z" stroke="#FF6482" stroke-width="2"/>
            </svg>`,
            'ai-stack': `<svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <rect width="48" height="48" rx="10" fill="#FF9500" opacity="0.1"/>
                <circle cx="24" cy="24" r="10" stroke="#FF9500" stroke-width="2"/>
                <circle cx="24" cy="24" r="6" stroke="#FF9500" stroke-width="2"/>
                <circle cx="24" cy="24" r="2" fill="#FF9500"/>
            </svg>`,
            'users': `<svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <rect width="48" height="48" rx="10" fill="#34C759" opacity="0.1"/>
                <path d="M18 28C18 25.7909 19.7909 24 22 24H26C28.2091 24 30 25.7909 30 28V30H18V28Z" stroke="#34C759" stroke-width="2"/>
                <circle cx="24" cy="18" r="4" stroke="#34C759" stroke-width="2"/>
                <path d="M14 30V29C14 27.3431 15.3431 26 17 26H17.5" stroke="#34C759" stroke-width="2" stroke-linecap="round"/>
                <path d="M34 30V29C34 27.3431 32.6569 26 31 26H30.5" stroke="#34C759" stroke-width="2" stroke-linecap="round"/>
                <circle cx="17" cy="20" r="3" stroke="#34C759" stroke-width="2"/>
                <circle cx="31" cy="20" r="3" stroke="#34C759" stroke-width="2"/>
            </svg>`,
            'default': `<svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <rect width="48" height="48" rx="10" fill="#5E5CE6" opacity="0.1"/>
                <path d="M24 14L26.5 21.5L34 24L26.5 26.5L24 34L21.5 26.5L14 24L21.5 21.5L24 14Z" stroke="#5E5CE6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`
        };

        // Render skills
        skillsContainer.innerHTML = skills.map(skillCategory => `
            <div class="skill-card">
                <div class="skill-icon">${iconMap[skillCategory.icon] || iconMap.default}</div>
                <h3 class="skill-title">${skillCategory.category}</h3>
                ${skillCategory.description ? `
                    <p class="skill-description" style="color: #86868b; font-size: 15px; margin: 8px 0 16px;">${skillCategory.description}</p>
                ` : ''}
                <ul class="skill-list">
                    ${skillCategory.skills.map(skill => `
                        <li>${skill}</li>
                    `).join('')}
                </ul>
            </div>
        `).join('');

    } catch (error) {
        console.error('Failed to load skills:', error);
        skillsContainer.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                <p style="color: #ff3b30; font-size: 17px;">Failed to load skills. Please try again later.</p>
            </div>
        `;
    }
}

// Load skills when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadSkills);
} else {
    loadSkills();
}
