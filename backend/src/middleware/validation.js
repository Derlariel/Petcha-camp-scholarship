const validateRegistrationData = (data) => {
  const errors = [];
  
  const requiredFields = [
    'student_id', 'fullname_th', 'fullname_en',
    'nickname_th', 'nickname_en','scholarship_type', 'scholarship_category', 
    'academic_year', 'department_code', 'shirt_size', 'self_introduction', 'proud_achievement',
    'participation_benefits', 'student_id', 'fullname'
  ];
  
  requiredFields.forEach(field => {
    if (!data[field] || data[field].toString().trim() === '') {
      errors.push(`${field} is required`);
    }
  });
  
  const validScholarshipTypes = ['เพชรพระจอมเกล้า', 'แสดเหลืองเรืองรุ่ง'];
  const validCategories = ['ผู้นำ', 'นวัตกรรม', 'กีฬา', 'เรียนดี', 'ศิลป์วัฒนธรรม'];
  const validShirtSizes = ['S', 'M', 'L', 'XL', '2XL', '3XL'];
  const validParticipationBenefits = ['activity', 'orientation'];
  
  if (data.scholarship_type && !validScholarshipTypes.includes(data.scholarship_type)) {
    errors.push('Invalid scholarship type');
  }
  
  if (data.scholarship_category && !validCategories.includes(data.scholarship_category)) {
    errors.push('Invalid scholarship category');
  }
  
  if (data.shirt_size && !validShirtSizes.includes(data.shirt_size)) {
    errors.push('Invalid shirt size');
  }

  if (data.participation_benefits && !validParticipationBenefits.includes(data.participation_benefits)) {
    errors.push('Invalid participation benefits value');
  }
  
  if (data.self_introduction && data.self_introduction.length > 100) {
    errors.push('Self introduction must be 100 characters or less');
  }
  
  if (data.proud_achievement && data.proud_achievement.length > 500) {
    errors.push('Proud achievement must be 500 characters or less');
  }
  
  if (data.instagram_handle) {
    if (data.instagram_handle.length > 50) {
      errors.push('Instagram handle must be 50 characters or less');
    }
    const cleanHandle = data.instagram_handle.replace(/^@/, '');
    if (!/^[a-zA-Z0-9._]{1,30}$/.test(cleanHandle)) {
      errors.push('Instagram handle can only contain letters, numbers, dots, and underscores');
    }
  }
  
  if (data.mbti) {
    const mbtiUpper = data.mbti.toUpperCase();
    if (!/^[A-Z]{4}$/.test(mbtiUpper)) {
      errors.push('MBTI must be 4 letters');
    } else {
      const validMBTI = /^[EI][SN][TF][JP]$/;
      if (!validMBTI.test(mbtiUpper)) {
        errors.push('Invalid MBTI format (must be like INTJ, ESFP, etc.)');
      }
    }
  }
  
  if (data.academic_year && (data.academic_year < 1 || data.academic_year > 5)) {
    errors.push('Academic year must be between 1-5');
  }
  
  if (data.department_code && data.department_code.length > 10) {
    errors.push('Department code must be 10 characters or less');
  }

  if (data.student_id) {
    const studentIdRegex = /^\d{10}$/;
    if (!studentIdRegex.test(data.student_id)) {
      errors.push('Student ID must be exactly 10 digits');
    }
  }

  if (data.fullname && data.fullname.length > 100) {
    errors.push('Full name must be 100 characters or less');
  }

  if (data.email && !validateEmail(data.email)) {
    errors.push('Invalid email format');
  }
  
  if (data.phone && !validatePhone(data.phone)) {
    errors.push('Invalid phone format (must be 10 digits starting with 0)');
  }
  
  return errors;
};

const validateHints = (hints) => {
  const errors = [];
  
  if (!Array.isArray(hints)) {
    errors.push('Hints must be an array');
    return errors;
  }
  
  if (hints.length !== 10) {
    errors.push('Must provide exactly 10 hints');
    return errors;
  }
  
  hints.forEach((hint, index) => {
    if (hint !== null && hint !== undefined && hint !== '') {
      if (typeof hint !== 'string') {
        errors.push(`Hint ${index + 1} must be a string`);
      } else if (hint.trim() !== '' && hint.length > 200) {
        errors.push(`Hint ${index + 1} must be 200 characters or less`);
      }
    }
  });
  
  return errors;
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone) => {
  const phoneStr = phone.toString();
  const phoneRegex = /^0[0-9]{9}$/;
  return phoneRegex.test(phoneStr);
};

const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim();
};

const validateRegistration = (req, res, next) => {
  try {
    console.log('🔍 Received registration data:', JSON.stringify(req.body, null, 2));
    
    const sanitizedBody = {};
    for (const [key, value] of Object.entries(req.body)) {
      if (key === 'hints') {
        sanitizedBody[key] = Array.isArray(value) 
          ? value.map(hint => hint ? sanitizeInput(hint) : hint)
          : value;
      } else {
        sanitizedBody[key] = sanitizeInput(value);
      }
    }
    
    if (sanitizedBody.mbti && typeof sanitizedBody.mbti === 'string') {
      sanitizedBody.mbti = sanitizedBody.mbti.toUpperCase();
    }
    
    req.body = sanitizedBody;
    console.log('🧹 Sanitized data:', JSON.stringify(req.body, null, 2));
    
    const { hints, ...registrationData } = req.body;
    
    const registrationErrors = validateRegistrationData(registrationData);
    const hintErrors = validateHints(hints);
    
    console.log('❌ Registration errors:', registrationErrors);
    console.log('❌ Hint errors:', hintErrors);
    
    const allErrors = [...registrationErrors, ...hintErrors];
    
    if (allErrors.length > 0) {
      console.log('🚫 Validation failed with errors:', allErrors);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: allErrors
      });
    }
    
    console.log('✅ Validation passed');
    next();
  } catch (error) {
    console.error('Validation middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Validation error occurred'
    });
  }
};

module.exports = {
  validateRegistrationData,
  validateHints,
  validateEmail,
  validatePhone,
  sanitizeInput,
  validateRegistration
};