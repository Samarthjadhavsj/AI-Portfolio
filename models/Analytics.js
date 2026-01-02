const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true
  },
  event: {
    type: String,
    enum: ['pageview', 'click', 'form_submit', 'project_view', 'project_like'],
    default: 'pageview'
  },
  
  // Reference
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  
  // Tracking Data
  referrer: String,
  ipAddress: String,
  userAgent: String,
  device: String,
  browser: String,
  country: String,
  city: String,
  
  // Session
  sessionId: String,
  
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: false
});

// Indexes for analytics queries
analyticsSchema.index({ page: 1, timestamp: -1 });
analyticsSchema.index({ event: 1, timestamp: -1 });
analyticsSchema.index({ projectId: 1 });
analyticsSchema.index({ timestamp: -1 });

module.exports = mongoose.model('Analytics', analyticsSchema);
