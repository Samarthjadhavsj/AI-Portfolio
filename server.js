// Backend API Server - Node.js + Express

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

// Database connection
const connectDB = require('./config/database');

// Models
const Profile = require('./models/Profile');
const Project = require('./models/Project');
const Skill = require('./models/Skill');
const Experience = require('./models/Experience');
const Contact = require('./models/Contact');
const Analytics = require('./models/Analytics');

// Routes
const adminRoutes = require('./routes/admin');
const uploadRoutes = require('./routes/upload');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Cache control based on environment
if (process.env.NODE_ENV === 'production') {
    // Production: Enable caching for static assets
    app.use((req, res, next) => {
        if (req.url.match(/\.(css|js|jpg|jpeg|png|svg|gif|ico|woff|woff2|ttf)$/)) {
            res.set('Cache-Control', 'public, max-age=31536000'); // 1 year
        } else if (req.url.match(/\.html$/)) {
            res.set('Cache-Control', 'public, max-age=3600'); // 1 hour
        }
        next();
    });
} else {
    // Development: Disable caching
    app.use((req, res, next) => {
        res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
        res.set('Pragma', 'no-cache');
        res.set('Expires', '0');
        next();
    });
}

app.use(express.static('.')); // Serve static files

// Email transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// ============================================
// ADMIN ROUTES (Protected)
// ============================================
app.use('/api/admin', adminRoutes);

// UPLOAD ROUTES
// ============================================
app.use('/api', uploadRoutes);

// ============================================
// PUBLIC API ROUTES
// ============================================

// Get profile data
app.get('/api/profile', async (req, res) => {
    try {
        const profile = await Profile.findOne();
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        res.json(profile);
    } catch (error) {
        console.error('Profile fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

// Get all projects (published only)
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find({ 
            status: 'published',
            visible: true 
        }).sort({ order: 1, createdAt: -1 });
        res.json(projects);
    } catch (error) {
        console.error('Projects fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});

// Get single project
app.get('/api/projects/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        
        // Increment view count
        project.views += 1;
        await project.save();
        
        res.json(project);
    } catch (error) {
        console.error('Project fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch project' });
    }
});

// Get all skills
app.get('/api/skills', async (req, res) => {
    try {
        const skills = await Skill.find({ visible: true }).sort({ order: 1 });
        res.json(skills);
    } catch (error) {
        console.error('Skills fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch skills' });
    }
});

// Get all experience
app.get('/api/experience', async (req, res) => {
    try {
        const experience = await Experience.find({ visible: true }).sort({ order: 1 });
        res.json(experience);
    } catch (error) {
        console.error('Experience fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch experience' });
    }
});

// Track page view
app.post('/api/analytics/pageview', async (req, res) => {
    try {
        const { page, referrer, userAgent } = req.body;
        
        await Analytics.create({
            page,
            event: 'pageview',
            referrer,
            userAgent,
            ipAddress: req.ip,
            timestamp: new Date()
        });
        
        res.status(201).json({ success: true });
    } catch (error) {
        console.error('Analytics error:', error);
        res.status(500).json({ error: 'Failed to track analytics' });
    }
});

// ============================================
// CONTACT FORM
// ============================================

// Contact form endpoint with validation
app.post('/api/contact', [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('subject').optional().trim(),
    body('message').trim().notEmpty().withMessage('Message is required')
], async (req, res) => {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, subject, message } = req.body;

    // Save to database
    try {
        await Contact.create({
            name,
            email,
            subject: subject || 'Portfolio Contact',
            message,
            status: 'new',
            ipAddress: req.ip,
            userAgent: req.headers['user-agent'],
            referrer: req.headers.referer
        });
    } catch (dbError) {
        console.error('Database save error:', dbError);
        // Continue with email even if DB save fails
    }

    // Email options
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        replyTo: email,
        subject: subject || `Portfolio Contact from ${name}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #0071E3;">New Contact Form Submission</h2>
                <div style="background: #f5f5f7; padding: 20px; border-radius: 12px; margin: 20px 0;">
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Subject:</strong> ${subject || 'Portfolio Contact'}</p>
                </div>
                <div style="background: white; padding: 20px; border-radius: 12px; border: 1px solid #e0e0e0;">
                    <p><strong>Message:</strong></p>
                    <p style="line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
                </div>
                <p style="color: #6e6e73; font-size: 12px; margin-top: 20px;">
                    Sent from your AI Engineer Portfolio
                </p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ 
            message: 'Email sent successfully',
            success: true 
        });
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ 
            error: 'Failed to send email. Please try again later.',
            success: false 
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Serve HTML pages
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/about.html');
});

app.get('/projects', (req, res) => {
    res.sendFile(__dirname + '/projects.html');
});

app.get('/skills', (req, res) => {
    res.sendFile(__dirname + '/skills.html');
});

app.get('/experience', (req, res) => {
    res.sendFile(__dirname + '/experience.html');
});

app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/contact.html');
});

app.get('/coding-profiles', (req, res) => {
    res.sendFile(__dirname + '/coding-profiles.html');
});

// Start server (only in non-serverless environment)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

// Export for Vercel
module.exports = app;
