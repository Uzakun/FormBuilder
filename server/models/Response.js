const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: 'Form', required: true },
  answers: mongoose.Schema.Types.Mixed,
  submittedAt: { type: Date, default: Date.now },
  userAgent: String,
  ipAddress: String
});

module.exports = mongoose.model('Response', ResponseSchema);