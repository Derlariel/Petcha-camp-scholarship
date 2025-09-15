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

    // 🛡 Validate
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


    // 💾 Insert registration
    const [result] = await connection.execute(`
      INSERT INTO registrations (
        student_id, fullname_th, fullname_en, nickname_th, nickname_en,
        scholarship_type, scholarship_category, academic_year, department_code,
        mbti, can_attend, food_allergies, medical_conditions, shirt_size,
        self_introduction, proud_achievement, instagram_handle,
        participation_benefits, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `, [
      registrationData.student_id,
      registrationData.fullname_th,
      registrationData.fullname_en,
      registrationData.nickname_th,
      registrationData.nickname_en,
      registrationData.scholarship_type,
      registrationData.scholarship_category,
      registrationData.academic_year || 2568,
      registrationData.department_code,
      registrationData.mbti || null,
      registrationData.can_attend !== false,
      registrationData.food_allergies || null,
      registrationData.medical_conditions || null,
      registrationData.shirt_size,
      registrationData.self_introduction,
      registrationData.proud_achievement,
      registrationData.instagram_handle || null,
      registrationData.participation_benefits
    ]);

    const registrationId = result.insertId;
    console.log('✅ Registration saved to database with ID:', registrationId);

    // 💾 Insert hints
    for (let i = 0; i < hints.length; i++) {
      await connection.execute(
        'INSERT INTO user_hints (registration_id, hint_number, hint_text) VALUES (?, ?, ?)',
        [registrationId, i + 1, hints[i].trim()]
      );
    }

    await connection.commit();
    console.log('✅ Transaction committed successfully');

    // 📊 Prepare to sync to Google Sheets
    const hintsText = Array.isArray(hints)
      ? hints.map((hint, index) => `${index + 1}: ${hint.trim()}`).join('; ')
      : '';

    const now = new Date().toISOString();
    console.log('Registration Data before sheet:', registrationData);
    
    const sheetData = {
      ...registrationData,
      id: registrationId,
      hints: hintsText,
      created_at: now,
      updated_at: now,
      can_attend: registrationData.can_attend !== false ? 'Yes' : 'No',
      mbti: registrationData.mbti || '',
      food_allergies: registrationData.food_allergies || '',
      medical_conditions: registrationData.medical_conditions || '',
      instagram_handle: registrationData.instagram_handle || '',
      academic_year: registrationData.academic_year || 2568,
      participation_benefits: registrationData.participation_benefits
    };
    
    console.log('Sheet Data:', JSON.stringify(sheetData, null, 2));

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
