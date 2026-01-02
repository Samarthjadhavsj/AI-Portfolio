// API Helper - Fetch data from backend
const API_BASE = window.location.origin;

// Generic API call function
async function fetchAPI(endpoint) {
    try {
        const response = await fetch(`${API_BASE}${endpoint}`);
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Failed to fetch ${endpoint}:`, error);
        return null;
    }
}

// Track page view
async function trackPageView(page) {
    try {
        await fetch(`${API_BASE}/api/analytics/pageview`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                page,
                referrer: document.referrer,
                userAgent: navigator.userAgent
            })
        });
    } catch (error) {
        console.error('Analytics tracking failed:', error);
    }
}

// Get profile data
async function getProfile() {
    return await fetchAPI('/api/profile');
}

// Get all projects
async function getProjects() {
    return await fetchAPI('/api/projects');
}

// Get single project
async function getProject(id) {
    return await fetchAPI(`/api/projects/${id}`);
}

// Get all skills
async function getSkills() {
    return await fetchAPI('/api/skills');
}

// Get all experience
async function getExperience() {
    return await fetchAPI('/api/experience');
}

// Submit contact form
async function submitContact(formData) {
    try {
        const response = await fetch(`${API_BASE}/api/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        return await response.json();
    } catch (error) {
        console.error('Contact form submission failed:', error);
        return { success: false, error: 'Failed to send message' };
    }
}

// Track page view on load
document.addEventListener('DOMContentLoaded', () => {
    trackPageView(window.location.pathname);
});
