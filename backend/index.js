const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Petcha Camp API is running!',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

try {
  const registrationRoutes = require('./src/routes/registration');
  app.use('/api/registrations', registrationRoutes);
  console.log('✅ Registration routes loaded successfully');
} catch (error) {
  console.error('❌ Failed to load registration routes:', error.message);
  console.log('📁 Looking for routes in: ./src/routes/registration');
  
  try {
    const registrationRoutes = require('./src/routes/registration');
    app.use('/api/registrations', registrationRoutes);
    console.log('✅ Registration routes loaded from src/routes/');
  } catch (err) {
    console.error('❌ Could not find registration routes in any location');
    console.log('📋 Available paths to check:');
    console.log('   - ./src/routes/registration');
    console.log('   - ./src/routes/registration.js');
  }
}

app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found',
    path: req.originalUrl 
  });
});

app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📱 API URL: http://localhost:${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/`);
  console.log(`🩺 Health API: http://localhost:${PORT}/api/health`);
  console.log(`📋 Registrations: http://localhost:${PORT}/api/registrations`);
  console.log(`🧪 Test Sheets: http://localhost:${PORT}/api/registrations/test-sheets`);
});

module.exports = app;