-- Petcha Camp Registration Database Schema
CREATE DATABASE petcha_camp_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE petcha_camp_db;

-- ตาราง registrations สำหรับเก็บข้อมูลการลงทะเบียน
CREATE TABLE registrations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    -- ข้อมูลพื้นฐาน
    scholarship_type ENUM('เพชรพระจอมเกล้า', 'แสดเหลืองเรืองรุ่ง') NOT NULL,
    scholarship_category ENUM('ผู้นำ', 'นวัตกรรม', 'กีฬา', 'เรียนดี', 'ศิลป์วัฒนธรรม') NOT NULL,
    nickname_th VARCHAR(100) NOT NULL,
    nickname_en VARCHAR(100) NOT NULL,
    academic_year INT NOT NULL DEFAULT 2568,
    department_code VARCHAR(10) NOT NULL, -- เช่น 'ME', 'EE', 'CE'
    mbti VARCHAR(4), -- Optional MBTI type
    
    -- ข้อมูลการเข้าร่วมค่าย
    can_attend BOOLEAN NOT NULL DEFAULT TRUE,
    food_allergies TEXT,
    medical_conditions TEXT,
    shirt_size ENUM('S', 'M', 'L', 'XL', '2XL', '3XL') NOT NULL,
    
    -- ข้อมูลสำหรับการ์ด
    self_introduction TEXT NOT NULL, -- จำกัด 100 ตัวอักษร
    proud_achievement TEXT NOT NULL, -- จำกัด 500 ตัวอักษร
    instagram_handle VARCHAR(100), -- @username format
    
    -- timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE user_hints (
    id INT PRIMARY KEY AUTO_INCREMENT,
    registration_id INT NOT NULL,
    hint_number INT NOT NULL, -- 1-10
    hint_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (registration_id) REFERENCES registrations(id) ON DELETE CASCADE,
    UNIQUE KEY unique_hint_per_user (registration_id, hint_number)
);


CREATE TABLE shirt_sizes (
    size_code VARCHAR(5) PRIMARY KEY,
    chest_size INT NOT NULL,
    length_size INT NOT NULL
);


INSERT INTO shirt_sizes (size_code, chest_size, length_size) VALUES
('S', 36, 27),
('M', 38, 28),
('L', 40, 29),
('XL', 42, 30),
('2XL', 44, 31),
('3XL', 46, 32);


CREATE INDEX idx_scholarship_type ON registrations(scholarship_type);
CREATE INDEX idx_scholarship_category ON registrations(scholarship_category);
CREATE INDEX idx_department ON registrations(department_code);
CREATE INDEX idx_created_at ON registrations(created_at);

select * from registrations;
select * from user_hints;