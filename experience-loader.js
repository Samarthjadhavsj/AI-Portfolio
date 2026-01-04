// Dynamic Experience Loader
async function loadExperience() {
    const experienceContainer = document.querySelector('.experience-timeline');
    
    if (!experienceContainer) return;

    // Show loading state
    experienceContainer.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
            <div style="display: inline-block; width: 40px; height: 40px; border: 3px solid #f3f3f3; border-top: 3px solid #0071E3; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <p style="margin-top: 20px; color: #86868b; font-size: 17px;">Loading experience...</p>
        </div>
    `;

    try {
        const experiences = await getExperience();
        
        if (!experiences || experiences.length === 0) {
            experienceContainer.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                    <p style="color: #86868b; font-size: 19px;">No experience available yet.</p>
                </div>
            `;
            return;
        }

        // Group by type (excluding education)
        const grouped = {
            internship: experiences.filter(e => e.type === 'internship'),
            achievement: experiences.filter(e => e.type === 'achievement')
        };

        // Icon mapping
        const iconMap = {
            'internship': '💼',
            'achievement': '🏆'
        };

        // Render each section
        let html = '';

        if (grouped.internship.length > 0) {
            html += `
                <div class="experience-item">
                    <div class="experience-header">
                        <div>
                            <h3 class="experience-role">Internships & Professional Experience</h3>
                            <p class="experience-company">Work Experience</p>
                        </div>
                    </div>
                    ${grouped.internship.map(exp => `
                        <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #e5e5e7;">
                            <div class="experience-header" style="margin-bottom: 12px;">
                                <div>
                                    <h4 style="font-size: 19px; font-weight: 600; margin-bottom: 4px;">${exp.title}</h4>
                                    <p class="experience-company">${exp.organization}${exp.location ? ' · ' + exp.location : ''}</p>
                                </div>
                                ${exp.period ? `<p class="experience-period">${exp.period}</p>` : ''}
                            </div>
                            ${exp.description ? `<p class="experience-description">${exp.description}</p>` : ''}
                            ${exp.link ? `<a href="${exp.link}" target="_blank" class="achievement-link">View Certificate →</a>` : ''}
                        </div>
                    `).join('')}
                </div>
            `;
        }

        if (grouped.achievement.length > 0) {
            html += `
                <div class="experience-item">
                    <div class="experience-header">
                        <div>
                            <h3 class="experience-role">Achievements & Recognition</h3>
                            <p class="experience-company">Hackathons & Competitions</p>
                        </div>
                        ${grouped.achievement[0].period ? `<p class="experience-period">${grouped.achievement[0].period}</p>` : ''}
                    </div>
                    ${grouped.achievement.map(exp => `
                        <div class="achievement-item">
                            <p class="achievement-title">${exp.title}</p>
                            ${exp.link ? `<a href="${exp.link}" target="_blank" class="achievement-link">View Post →</a>` : ''}
                        </div>
                    `).join('')}
                </div>
            `;
        }

        experienceContainer.innerHTML = html;

    } catch (error) {
        console.error('Failed to load experience:', error);
        experienceContainer.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                <p style="color: #ff3b30; font-size: 17px;">Failed to load experience. Please try again later.</p>
            </div>
        `;
    }
}

// Load experience when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadExperience);
} else {
    loadExperience();
}
