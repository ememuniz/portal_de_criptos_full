const mongoose = require('mongoose');

let alertSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  crypto: { type: String, required: true },
  referenceValue: { type: Number, required: true },
  condition: { type: String, enum: ['less', 'equal', 'greater'], required: true },
  isActive: { type: Boolean, required: true, default: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Alert', alertSchema);