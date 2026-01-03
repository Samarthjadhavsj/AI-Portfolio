// Dynamic Projects Loader
async function loadProjects() {
    const projectsContainer = document.querySelector('.projects-grid');
    const projectCountElement = document.getElementById('projectCount');
    
    if (!projectsContainer) return;

    // Show loading state
    projectsContainer.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
            <div style="display: inline-block; width: 40px; height: 40px; border: 3px solid #f3f3f3; border-top: 3px solid #0071E3; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <p style="margin-top: 20px; color: #86868b; font-size: 17px;">Loading projects...</p>
        </div>
    `;

    try {
        const projects = await getProjects();
        
        if (!projects || projects.length === 0) {
            projectsContainer.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                    <p style="color: #86868b; font-size: 19px;">No projects available yet.</p>
                </div>
            `;
            if (projectCountElement) {
                projectCountElement.textContent = '0 Projects';
            }
            return;
        }

        // Update project count
        if (projectCountElement) {
            projectCountElement.textContent = `${projects.length}+ Project${projects.length !== 1 ? 's' : ''}`;
        }

        // Render projects
        projectsContainer.innerHTML = projects.map(project => `
            <div class="project-card" data-project-id="${project._id}">
                ${project.image?.url ? `
                    <div class="project-image">
                        <img src="${project.image.url}" alt="${project.title}" loading="lazy">
                    </div>
                ` : ''}
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    ${project.tags && project.tags.length > 0 ? `
                        <div class="project-tags">
                            ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    ` : ''}
                </div>
                <div class="project-links">
                    ${project.githubUrl ? `
                        <a href="${project.githubUrl}" target="_blank" rel="noopener" class="project-link">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            GitHub
                        </a>
                    ` : ''}
                    ${project.liveUrl ? `
                        <a href="${project.liveUrl}" target="_blank" rel="noopener" class="project-link primary">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                <polyline points="15 3 21 3 21 9"/>
                                <line x1="10" y1="14" x2="21" y2="3"/>
                            </svg>
                            Live Demo
                        </a>
                    ` : ''}
                </div>
            </div>
        `).join('');

        // Add click tracking for project views
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', async (e) => {
                if (e.target.closest('a')) return; // Don't track link clicks
                const projectId = card.dataset.projectId;
                if (projectId) {
                    await getProject(projectId); // This increments view count
                }
            });
        });

    } catch (error) {
        console.error('Failed to load projects:', error);
        projectsContainer.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                <p style="color: #ff3b30; font-size: 17px;">Failed to load projects. Please try again later.</p>
            </div>
        `;
    }
}

// Add loading animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Load projects when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadProjects);
} else {
    loadProjects();
}
