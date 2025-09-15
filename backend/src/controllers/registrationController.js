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
      return res.status(400).json({ success: false, message: 'Validation errors', errors: registrationErrors });
    }

    const hintErrors = validateHints(hints);
    if (hintErrors.length > 0) {
      return res.status(400).json({ success: false, message: 'Hint validation errors', errors: hintErrors });
    }

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

    for (let i = 0; i < hints.length; i++) {
      await connection.execute(
        'INSERT INTO user_hints (registration_id, hint_number, hint_text) VALUES (?, ?, ?)',
        [registrationId, i + 1, hints[i].trim()]
      );
    }

    await connection.commit();

    const hintsText = hints.filter(Boolean).map((h, i) => `${i+1}: ${h.trim()}`).join('; ');

    const sheetData = {
      ...registrationData,
      id: registrationId,
      hints: hintsText,
      can_attend: registrationData.can_attend !== false,
      academic_year: registrationData.academic_year || 2568
    };

    const sheetResult = await appendToSheet(sheetData);
    res.status(201).json({ success: true, message: 'Registration created successfully', data: { id: registrationId, sheet: sheetResult } });

  } catch (error) {
    await connection.rollback();
    console.error('❌ Error creating registration:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  } finally {
    connection.release();
  }
};

const testGoogleSheetsConnection = async (req, res) => {
  try {
    const { testConnection } = require('../config/google');
    const result = await testConnection();
    res.json({ success: result.success, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Test connection failed', error: error.message });
  }
};

module.exports = {
  getAllRegistrations,
  createRegistration,
  testGoogleSheetsConnection
};
