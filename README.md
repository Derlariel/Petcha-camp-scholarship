# 🏕️ Petcha Camp Registration System

A full-stack web application for managing registration and activities of **Petcha Camp**, a scholarship event organized by KMUTT.

> ✨ This system handles student registration, card data collection, and randomized buddy/group pairing.

---

## 📌 Objectives

- Register students for Petcha Camp (-)
- Collect personal and academic data for showcasing scholarship work (20th Anniversary of Petcha)
- Create buddy chains (สายรหัส)
- Randomly assign groups and buddies

---

## ⚙️ Tech Stack

| Layer     | Tech                     |
|-----------|--------------------------|
| Frontend  | React + TypeScript       |
| Backend   | Node.js (Express)        |
| Database  | MySQL                    |
| Hosting   | Ubuntu 22.04             |
| Domain    | `https://petchacamp.kmutt.ac.th` |
| Auth      | KMUTT OAuth / Student DB *(optional)*

---

## 📦 Features

### ✅ PHASE 1: Registration

#### 🔐 Login
- KMUTT Single Sign-On *(or direct DB fallback)*
- Captures:
  - Student ID
  - Full Name
  - Faculty / Department / Curriculum
  - Student photo (optional)
  - Scholarship status (optional)

#### 📝 Registration Form
- Accessible only after login
- Custom UI connected to Google Form API
- Fields:
  - Scholarship Type: `เพชรพระจอมเกล้า / แสดเหลืองเรืองรุ่ง`
  - Scholarship Category: `ผู้นำ / นวัตกรรม / กีฬา / เรียนดี / ศิลป์วัฒนธรรม`
  - Nickname (TH/EN)
  - Academic Year (e.g. `2568`)
  - Department (e.g. `ME`, `EE`)
  - MBTI (optional)
  - Attendance Confirmation (checkbox)
  - Allergies / Medical Conditions (optional)
  - Shirt Size (`S - 3XL`)
  - Self Introduction (max 100 chars)
  - Proud Achievement (max 500 chars)
  - Instagram (optional)
  - 10 Clues (for buddy guessing)






