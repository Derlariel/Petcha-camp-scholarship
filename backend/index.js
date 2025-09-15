const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const { appendToSheet, testConnection } = require('./src/config/google');

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

app.get('/api/health', async (req, res) => {
  const result = await testConnection();
  if (result.success) {
    res.json({ success: true, status: 'OK', sheetTitle: result.title });
  } else {
    res.status(500).json({ success: false, status: 'ERROR', error: result.error });
  }
});



app.post('/api/registrations', async (req, res) => {
  try {
    const data = req.body;

    if (!data.scholarship_type || !data.scholarship_category || !data.nickname_th || !data.nickname_en || !data.department_code) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const result = await appendToSheet(data); 
    res.json({ success: true, rowIndex: result.rowIndex });
  } catch (error) {
    console.error('POST /api/registrations error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});


app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Route not found', path: req.originalUrl });
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
  console.log(`🩺 Health: http://localhost:${PORT}/api/health`);
  console.log(`📋 Registrations: POST http://localhost:${PORT}/api/registrations`);
});

module.exports = app;
