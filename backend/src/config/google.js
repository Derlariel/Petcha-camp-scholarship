const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

const createJWTClient = () => {
  return new JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), 
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
};

async function appendToSheet(data) {
  try {
    console.log('Starting to append data to Google Sheets...');
    console.log('Data to append:', data);

    const serviceAccountAuth = createJWTClient();
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
    
    await doc.loadInfo();
    console.log('Loaded spreadsheet:', doc.title);

    let sheet = doc.sheetsByTitle[process.env.GOOGLE_SHEET_NAME] || doc.sheetsByIndex[0];
    console.log(`Using sheet: ${sheet.title}`);

    await sheet.loadCells()
    const existingRows = await sheet.getRows();
    const newID = (existingRows.length + 1).toString();

    const rowData = {
      'ID' : newID,
      'Scholarship Type': data.scholarship_type,
      'Scholarship Category': data.scholarship_category,
      'Nickname (TH)': data.nickname_th,
      'Nickname (EN)': data.nickname_en,
      'Academic Year': data.academic_year ?? '',
      'Department Code': data.department_code,
      'MBTI': data.mbti ?? '',
      'Can Attend': data.can_attend ? 'Yes' : 'No',
      'Food Allergies': data.food_allergies ?? '',
      'Medical Conditions': data.medical_conditions ?? '',
      'Shirt Size': data.shirt_size,
      'Self Introduction': data.self_introduction,
      'Proud Achievement': data.proud_achievement,
      'Instagram Handle': data.instagram_handle ?? '',
      'Hints': (data.hints || []).join(', ')
    };

    console.log('Row data to add:', rowData);

    const newRow = await sheet.addRow(rowData);
    console.log('Successfully added row with index:', newRow.rowIndex);

    return { success: true, rowIndex: newRow.rowIndex };
    
  } catch (error) {
    console.error('Error in appendToSheet:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      code: error.code
    });
    
    throw new Error(`Failed to append to Google Sheets: ${error.message}`);
  }
}

async function testConnection() {
  try {
    const serviceAccountAuth = createJWTClient();
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
    
    await doc.loadInfo();
    console.log('✅ Google Sheets connection successful');
    console.log('Document title:', doc.title);
    console.log('Available sheets:', doc.sheetsByIndex.map(s => s.title));
    
    return { success: true, title: doc.title };
  } catch (error) {
    console.error('❌ Google Sheets connection failed:', error);
    return { success: false, error: error.message };
  }
}

module.exports = {
  appendToSheet,
  testConnection
};
