// Dynamic Profile Loader for Index and About pages
async function loadProfile() {
    console.log('🔄 Loading profile...');
    try {
        const profile = await getProfile();
        console.log('📦 Profile data received:', profile);
        
        if (!profile) {
            console.error('❌ Failed to load profile data');
            return;
        }

        console.log('🎯 Hero fields:', profile.hero);

        // Update hero section on index page
        const heroName = document.querySelector('.hero-name');
        const heroTitle = document.querySelector('.hero-title');
        const heroEducation = document.querySelector('.hero-education');
        const heroLocation = document.querySelector('.hero-location');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroPassion = document.querySelector('.hero-passion');
        const profileImage = document.querySelector('.profile-image img');

        if (heroName) heroName.textContent = profile.name;
        if (heroTitle) {
            // Use separate hero fields
            const line1 = profile.heroLine1 || 'Aspiring';
            const line2 = profile.heroLine2 || 'AI Engineer';
            
            heroTitle.innerHTML = `
                <span class="hero-title-line" style="display: block;">${line1}</span>
                <span class="hero-title-line gradient-text-hero" style="display: block;">${line2}</span>
            `;
            console.log('✅ Hero title updated:', line1, '+', line2);
        }
        if (heroEducation) heroEducation.textContent = profile.education || 'BTech CSE - AI & ML';
        if (heroLocation) heroLocation.textContent = profile.location || 'Bengaluru, India';
        if (heroSubtitle) heroSubtitle.textContent = profile.subtitle;
        if (profileImage && profile.profileImage?.url) {
            profileImage.src = profile.profileImage.url;
            profileImage.alt = profile.name;
        }

        // Update info cards on index page
        const careerCard = document.querySelector('.info-card:nth-child(1) .info-card-text');
        const experienceCard = document.querySelector('.info-card:nth-child(2) .info-card-text');
        
        if (careerCard) careerCard.innerHTML = profile.careerAspirations || '';
        if (experienceCard) experienceCard.innerHTML = profile.practicalExperience || '';

        // Update about page sections - Move bio to Career Aspirations and Practical Experience
        const bioIntro = document.querySelector('.bio-intro');
        const bioCareer = document.querySelector('.bio-career');
        const bioExperience = document.querySelector('.bio-experience');
        const bioGoals = document.querySelector('.bio-goals');
        const bioCommunity = document.querySelector('.bio-community');

        // Split bio into two parts
        if (profile.bio) {
            const bioText = profile.bio || '';
            const bioParagraphs = bioText.split('\n\n').filter(p => p.trim());
            
            // First paragraph goes to Career Aspirations card
            if (bioCareer && bioParagraphs[0]) {
                bioCareer.innerHTML = bioParagraphs[0].trim();
            }
            
            // Second paragraph goes to Practical Experience card
            if (bioExperience && bioParagraphs[1]) {
                bioExperience.innerHTML = bioParagraphs[1].trim();
            }
        }
        
        // Introduction card shows careerAspirations
        if (bioIntro) bioIntro.innerHTML = profile.careerAspirations || '';
        
        // Goals card shows practicalExperience
        if (bioGoals) bioGoals.innerHTML = profile.practicalExperience || '';
        if (bioCommunity) {
            // This is in the right column below education - show community engagement
            const communityText = `Actively engaged with the AI community through LeetCode, HackerRank, and open-source contributions. I believe in continuous learning, staying curious about emerging AI trends, and collaborating on innovative projects.`;
            bioCommunity.innerHTML = communityText;
        }

        // Update education section
        const educationDegree = document.querySelector('.education-degree');
        const educationUniversity = document.querySelector('.education-university');
        const educationLocationPeriod = document.querySelector('.education-location-period');
        
        if (educationDegree) educationDegree.textContent = profile.education || 'BTech CSE - AI & ML';
        if (educationUniversity) educationUniversity.textContent = profile.university || 'Presidency University';
        if (educationLocationPeriod) {
            const location = profile.location || 'Bengaluru';
            const period = profile.educationPeriod || '2022-2026';
            educationLocationPeriod.textContent = `${location}, ${period}`;
        }

        // Update social links
        const socialLinks = {
            linkedin: profile.socialLinks?.linkedin,
            github: profile.socialLinks?.github,
            leetcode: profile.socialLinks?.leetcode,
            hackerrank: profile.socialLinks?.hackerrank
        };

        Object.entries(socialLinks).forEach(([platform, url]) => {
            if (url) {
                const link = document.querySelector(`a[href*="${platform}"]`);
                if (link) link.href = url;
            }
        });

        // Update contact info
        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        emailLinks.forEach(link => {
            if (profile.email) link.href = `mailto:${profile.email}`;
        });

        const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
        phoneLinks.forEach(link => {
            if (profile.phone) link.href = `tel:${profile.phone}`;
        });

        // Update resume links (both view and download)
        const resumeViewBtn = document.querySelector('.resume-view-btn');
        const resumeDownloadBtn = document.querySelector('.resume-download-btn');
        
        if (profile.resume?.url) {
            // View button - opens PDF in browser
            if (resumeViewBtn) {
                resumeViewBtn.href = profile.resume.url;
                resumeViewBtn.target = '_blank';
                resumeViewBtn.rel = 'noopener noreferrer';
            }
            
            // Download button - downloads PDF
            if (resumeDownloadBtn) {
                resumeDownloadBtn.href = profile.resume.url;
                resumeDownloadBtn.setAttribute('download', 'resume.pdf');
            }
        }

    } catch (error) {
        console.error('Failed to load profile:', error);
    }
}

// Load profile when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadProfile);
} else {
    loadProfile();
}
