const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['education', 'achievement', 'certification', 'internship'],
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  organization: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  period: {
    type: String,
    trim: true
  },
  startDate: {
    type: String,
    trim: true
  },
  endDate: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  link: {
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

// Indexes
experienceSchema.index({ type: 1, order: 1 });

module.exports = mongoose.model('Experience', experienceSchema);
