const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String,
    default: 'code' // Icon identifier
  },
  skills: [{
    type: String,
    trim: true
  }],
  description: {
    type: String,
    trim: true
  },
  order: {
    type: Number,
    default: 0
  },
  visible: {
    type: Boolean,
    default: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for ordering
skillSchema.index({ order: 1 });

module.exports = mongoose.model('Skill', skillSchema);
