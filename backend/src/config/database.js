const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,      
  idleTimeout: 600000,         
  reconnect: true,            
  charset: 'utf8mb4',
  timezone: '+07:00'
});

const execute = async (query, params = []) => {
  try {
    const [rows, fields] = await pool.execute(query, params);
    return [rows, fields];
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

const getConnection = async () => {
  try {
    return await pool.getConnection();
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};

const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully');
    
    const [rows] = await connection.execute('SELECT 1 as test');
    console.log('✅ Database query test successful:', rows[0]);
    
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
};

module.exports = {
  execute,
  getConnection,
  testConnection
};

testConnection();