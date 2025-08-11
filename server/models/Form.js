const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  headerImage: String,
  questions: [{
    id: Number,
    type: { type: String, enum: ['categorize', 'cloze', 'comprehension'] },
    title: String,
    // Categorize fields
    categories: [String],
    items: [{
      text: String,
      correctCategory: String
    }],
    // Cloze fields
    sentence: String,
    blanks: [{
      id: Number,
      text: String,
      position: Number
    }],
    options: [String],
    // Comprehension fields
    passage: String,
    mcqs: [{
      id: Number,
      question: String,
      options: [String],
      correctAnswer: Number
    }]
  }],
  createdAt: { type: Date, default: Date.now },
  responses: { type: Number, default: 0 }
});

module.exports = mongoose.model('Form', FormSchema);