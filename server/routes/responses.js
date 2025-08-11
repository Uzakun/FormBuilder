const express = require('express');
const router = express.Router();
const Response = require('../models/Response');
const Form = require('../models/Form');

// SUBMIT form response
router.post('/', async (req, res) => {
  try {
    const response = new Response({
      formId: req.body.formId,
      answers: req.body.answers,
      userAgent: req.headers['user-agent'],
      ipAddress: req.ip
    });
    
    await response.save();
    
    // Increment response count
    await Form.findByIdAndUpdate(req.body.formId, { $inc: { responses: 1 } });
    
    res.status(201).json({ message: 'Response submitted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET responses for a form
router.get('/form/:formId', async (req, res) => {
  try {
    const responses = await Response.find({ formId: req.params.formId })
      .sort({ submittedAt: -1 });
    res.json(responses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;