const express = require('express');
const router = express.Router();

try {
  const { 
    getAllRegistrations, 
    createRegistration, 
    testGoogleSheetsConnection 
  } = require('../controllers/registrationController');
  
  console.log('✅ Registration controller imported successfully');
  
  const { validateRegistration } = require('../middleware/validation');
  console.log('✅ Validation middleware imported successfully');
  
  router.get('/', getAllRegistrations);
  router.post('/', validateRegistration, createRegistration);
  
  router.get('/test-sheets', testGoogleSheetsConnection);
  
  console.log('✅ Registration routes configured successfully');
  
} catch (error) {
  console.error('❌ Error setting up registration routes:', error.message);
  
  router.get('/', (req, res) => {
    res.status(500).json({
      success: false,
      message: 'Registration controller not available',
      error: error.message
    });
  });
  
  router.post('/', (req, res) => {
    res.status(500).json({
      success: false,
      message: 'Registration controller not available',
      error: error.message
    });
  });
  
  router.get('/test-sheets', (req, res) => {
    res.status(500).json({
      success: false,
      message: 'Google Sheets test not available',
      error: error.message
    });
  });
}

module.exports = router;