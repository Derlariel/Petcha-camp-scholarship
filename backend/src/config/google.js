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
    
    let sheet;
    try {
      sheet = doc.sheetsByTitle[process.env.GOOGLE_SHEET_NAME];
      if (!sheet) {
        sheet = doc.sheetsByIndex[0];
        console.log(`Sheet "${process.env.GOOGLE_SHEET_NAME}" not found, using first sheet: ${sheet.title}`);
      } else {
        console.log(`Using sheet: ${sheet.title}`);
      }
    } catch (error) {
      console.error('Error accessing sheet:', error);
      sheet = doc.sheetsByIndex[0];
      console.log('Fallback to first sheet:', sheet.title);
    }

    const rowData = {
      'ID': data[0],
      'Scholarship Type': data[1],
      'Scholarship Category': data[2],
      'Nickname (TH)': data[3],
      'Nickname (EN)': data[4],
      'Academic Year': data[5],
      'Department Code': data[6],
      'Can Attend': data[8],
      'Food Allergies': data[9],
      'Medical Conditions': data[10],
      'Shirt Size': data[11],
      'Instagram Handle': data[14], 
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