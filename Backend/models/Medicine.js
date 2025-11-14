const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  brandName: {
    type: String,
    required: true,
    trim: true
  },
  genericName: {
    type: String,
    required: true,
    trim: true
  },
  salt: {
    type: String,
    required: true,
    trim: true
  },
  manufacturer: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  strength: {
    type: String,
    required: true
  },
  form: {
    type: String,
    enum: ['Tablet', 'Capsule', 'Syrup', 'Injection', 'Ointment', 'Drops', 'Inhaler', 'Other'],
    required: true
  },
  imageUrl: {
    type: String,
    default: ''
  },
  isPrescriptionRequired: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create index for faster search
medicineSchema.index({ brandName: 'text', genericName: 'text', salt: 'text' });

module.exports = mongoose.model('Medicine', medicineSchema);
