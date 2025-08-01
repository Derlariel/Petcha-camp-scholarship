const db = require('../config/database');
const { validateRegistrationData, validateHints } = require('../middleware/validation');
const { appendToSheet } = require('../config/google');

const getAllRegistrations = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT r.*, 
        GROUP_CONCAT(
          CONCAT('{"hint_number":', h.hint_number, ',"hint_text":"', REPLACE(h.hint_text, '"', '\\"'), '"}')
          ORDER BY h.hint_number
        ) as hints
      FROM registrations r
      LEFT JOIN user_hints h ON r.id = h.registration_id
      GROUP BY r.id
      ORDER BY r.created_at DESC
    `);

    const registrations = rows.map(row => ({
      ...row,
      hints: row.hints ? JSON.parse(`[${row.hints}]`) : []
    }));

    res.json({ success: true, data: registrations });
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const createRegistration = async (req, res) => {
  const connection = await db.getConnection();
  
  try {
    await connection.beginTransaction();
    
    const { hints, ...registrationData } = req.body;
    
    const registrationErrors = validateRegistrationData(registrationData);
    if (registrationErrors.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation errors', 
        errors: registrationErrors 
      });
    }
    
    const hintErrors = validateHints(hints);
    if (hintErrors.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Hint validation errors', 
        errors: hintErrors 
      });
    }
    
    const [result] = await connection.execute(`
      INSERT INTO registrations (
        scholarship_type, scholarship_category, nickname_th, nickname_en,
        academic_year, department_code, mbti, can_attend, food_allergies,
        medical_conditions, shirt_size, self_introduction, proud_achievement,
        instagram_handle, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `, [
      registrationData.scholarship_type,
      registrationData.scholarship_category,
      registrationData.nickname_th,
      registrationData.nickname_en,
      registrationData.academic_year || 2568,
      registrationData.department_code,
      registrationData.mbti || null,
      registrationData.can_attend !== false,
      registrationData.food_allergies || null,
      registrationData.medical_conditions || null,
      registrationData.shirt_size,
      registrationData.self_introduction,
      registrationData.proud_achievement,
      registrationData.instagram_handle || null
    ]);
    
    const registrationId = result.insertId;
    console.log('✅ Registration saved to database with ID:', registrationId);
    
    for (let i = 0; i < hints.length; i++) {
      await connection.execute(
        'INSERT INTO user_hints (registration_id, hint_number, hint_text) VALUES (?, ?, ?)',
        [registrationId, i + 1, hints[i].trim()]
      );
    }
    
    await connection.commit();
    console.log('✅ Transaction committed successfully');
    
    const hintsText = Array.isArray(hints)
      ? hints.map((hint, index) => `${index + 1}: ${hint.trim()}`).join('; ')
      : '';
    
    const now = new Date().toISOString();
    const sheetData = [
      registrationId,
      registrationData.scholarship_type,
      registrationData.scholarship_category,
      registrationData.nickname_th,
      registrationData.nickname_en,
      registrationData.academic_year || 2568,
      registrationData.department_code,
      registrationData.mbti || '',
      registrationData.can_attend !== false ? 'Yes' : 'No',
      registrationData.food_allergies || '',
      registrationData.medical_conditions || '',
      registrationData.shirt_size,
      registrationData.self_introduction,
      registrationData.proud_achievement,
      registrationData.instagram_handle || '',
      now,
      now,
      hintsText
    ];

    console.log('📊 Preparing to send data to Google Sheets...');
    
    try {
      const sheetResult = await appendToSheet(sheetData);
      console.log('✅ Data successfully sent to Google Sheets:', sheetResult);
      
      res.status(201).json({ 
        success: true, 
        message: 'Registration created successfully and synced to Google Sheets',
        data: { id: registrationId }
      });
    } catch (sheetError) {
      console.error('❌ Failed to send data to Google Sheets:', sheetError.message);
      console.error('Sheet Error Details:', sheetError);
      
      res.status(201).json({ 
        success: true, 
        message: 'Registration created successfully, but failed to sync with Google Sheets',
        data: { id: registrationId },
        warning: 'Google Sheets sync failed',
        sheetError: sheetError.message
      });
    }
    
  } catch (error) {
    await connection.rollback();
    console.error('❌ Error creating registration:', error);
    
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(409).json({ success: false, message: 'Duplicate entry detected' });
    } else {
      res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
  } finally {
    connection.release();
  }
};

const testGoogleSheetsConnection = async (req, res) => {
  try {
    const { testConnection } = require('../services/google');
    const result = await testConnection();
    
    res.json({
      success: result.success,
      message: result.success ? 'Google Sheets connection successful' : 'Google Sheets connection failed',
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error testing Google Sheets connection',
      error: error.message
    });
  }
};

module.exports = {
  getAllRegistrations,
  createRegistration,
  testGoogleSheetsConnection
};