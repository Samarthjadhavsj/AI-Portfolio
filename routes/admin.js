const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Admin = require('../models/Admin');
const Profile = require('../models/Profile');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Experience = require('../models/Experience');
const Contact = require('../models/Contact');
const Analytics = require('../models/Analytics');
const { authenticateToken, generateToken, generateRefreshToken } = require('../middleware/auth');

// ============================================
// AUTHENTICATION ROUTES
// ============================================

// Admin Login
router.post('/auth/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    // Find admin
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Generate tokens
    const token = generateToken(admin);
    const refreshToken = generateRefreshToken(admin);

    res.json({
      success: true,
      token,
      refreshToken,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get current admin
router.get('/auth/me', authenticateToken, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch admin' });
  }
});

// ============================================
// PROFILE MANAGEMENT
// ============================================

// Get profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({ success: false, error: 'Profile not found' });
    }
    res.json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch profile' });
  }
});

// Update profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    console.log('📥 PUT /api/admin/profile received');
    console.log('📦 Request body:', JSON.stringify(req.body, null, 2));
    console.log('🎯 Hero data:', req.body.hero);
    
    const profile = await Profile.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true, runValidators: true }
    );
    
    console.log('✅ Profile updated in database');
    console.log('💾 New hero values:', profile.hero);
    
    res.json({ success: true, data: profile });
  } catch (error) {
    console.error('❌ Profile update error:', error);
    res.status(500).json({ success: false, error: 'Failed to update profile' });
  }
});

// ============================================
// PROJECTS MANAGEMENT
// ============================================

// Get all projects (including drafts)
router.get('/projects', authenticateToken, async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch projects' });
  }
});

// Get single project
router.get('/projects/:id', authenticateToken, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch project' });
  }
});

// Create project
router.post('/projects', authenticateToken, async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    console.error('Project creation error:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Update project
router.put('/projects/:id', authenticateToken, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// Delete project
router.delete('/projects/:id', authenticateToken, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ success: true, message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// Reorder projects
router.patch('/projects/reorder', authenticateToken, async (req, res) => {
  try {
    const { projects } = req.body; // Array of { id, order }
    
    const updates = projects.map(({ id, order }) =>
      Project.findByIdAndUpdate(id, { order })
    );
    
    await Promise.all(updates);
    res.json({ success: true, message: 'Projects reordered' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reorder projects' });
  }
});

// ============================================
// SKILLS MANAGEMENT
// ============================================

// Get all skills
router.get('/skills', authenticateToken, async (req, res) => {
  try {
    const skills = await Skill.find().sort({ order: 1 });
    res.json({ success: true, data: skills });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch skills' });
  }
});

// Get single skill category
router.get('/skills/:id', authenticateToken, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ success: false, error: 'Skill category not found' });
    }
    res.json({ success: true, data: skill });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch skill category' });
  }
});

// Create skill category
router.post('/skills', authenticateToken, async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create skill' });
  }
});

// Update skill category
router.put('/skills/:id', authenticateToken, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    res.json(skill);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update skill' });
  }
});

// Delete skill category
router.delete('/skills/:id', authenticateToken, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    res.json({ success: true, message: 'Skill deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete skill' });
  }
});

// ============================================
// EXPERIENCE MANAGEMENT
// ============================================

// Get all experience
router.get('/experience', authenticateToken, async (req, res) => {
  try {
    const experience = await Experience.find().sort({ order: 1 });
    res.json({ success: true, data: experience });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch experience' });
  }
});

// Get single experience
router.get('/experience/:id', authenticateToken, async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ success: false, error: 'Experience not found' });
    }
    res.json({ success: true, data: experience });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch experience' });
  }
});

// Create experience
router.post('/experience', authenticateToken, async (req, res) => {
  try {
    const experience = await Experience.create(req.body);
    res.status(201).json(experience);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create experience' });
  }
});

// Update experience
router.put('/experience/:id', authenticateToken, async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }
    res.json(experience);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update experience' });
  }
});

// Delete experience
router.delete('/experience/:id', authenticateToken, async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }
    res.json({ success: true, message: 'Experience deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete experience' });
  }
});

// ============================================
// CONTACTS MANAGEMENT
// ============================================

// Get all contacts
router.get('/contacts', authenticateToken, async (req, res) => {
  try {
    const { status, limit = 50, skip = 0 } = req.query;
    
    const query = status ? { status } : {};
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));
    
    const total = await Contact.countDocuments(query);
    
    res.json({ contacts, total });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// Get single contact
router.get('/contacts/:id', authenticateToken, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    // Mark as read
    if (contact.status === 'new') {
      contact.status = 'read';
      await contact.save();
    }
    
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contact' });
  }
});

// Update contact status
router.patch('/contacts/:id', authenticateToken, async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status, adminNotes },
      { new: true }
    );
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update contact' });
  }
});

// Delete contact
router.delete('/contacts/:id', authenticateToken, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json({ success: true, message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete contact' });
  }
});

// ============================================
// ANALYTICS
// ============================================

// Get dashboard overview
router.get('/analytics/overview', authenticateToken, async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    // Get counts
    const [
      totalProjects,
      totalContacts,
      newContacts,
      pageViews,
      uniqueVisitors
    ] = await Promise.all([
      Project.countDocuments({ status: 'published' }),
      Contact.countDocuments(),
      Contact.countDocuments({ status: 'new' }),
      Analytics.countDocuments({ 
        event: 'pageview',
        timestamp: { $gte: startDate }
      }),
      Analytics.distinct('ipAddress', {
        event: 'pageview',
        timestamp: { $gte: startDate }
      }).then(ips => ips.length)
    ]);

    res.json({
      success: true,
      data: {
        totalProjects,
        totalContacts,
        newContacts,
        pageViews,
        uniqueVisitors,
        period: `${days} days`
      }
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch analytics' });
  }
});

// Get traffic data
router.get('/analytics/traffic', authenticateToken, async (req, res) => {
  try {
    const { days = 7 } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    const traffic = await Analytics.aggregate([
      {
        $match: {
          event: 'pageview',
          timestamp: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$timestamp' }
          },
          views: { $sum: 1 },
          uniqueVisitors: { $addToSet: '$ipAddress' }
        }
      },
      {
        $project: {
          date: '$_id',
          views: 1,
          uniqueVisitors: { $size: '$uniqueVisitors' }
        }
      },
      { $sort: { date: 1 } }
    ]);

    res.json(traffic);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch traffic data' });
  }
});

// Get popular projects
router.get('/analytics/projects', authenticateToken, async (req, res) => {
  try {
    const projects = await Project.find({ status: 'published' })
      .sort({ views: -1 })
      .limit(10)
      .select('title views likes');
    
    res.json({
      success: true,
      data: projects
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch project analytics' });
  }
});

module.exports = router;
