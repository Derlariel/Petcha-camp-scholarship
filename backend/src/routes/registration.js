const express = require('express');
const router = express.Router();
const { 
  getAllRegistrations, 
  createRegistration, 
  testGoogleSheetsConnection 
} = require('../controllers/registrationController');
const { validateRegistration } = require('../middleware/validation');

router.get('/', getAllRegistrations);
router.post('/', validateRegistration, createRegistration);
router.get('/test-sheets', testGoogleSheetsConnection);

module.exports = router;
