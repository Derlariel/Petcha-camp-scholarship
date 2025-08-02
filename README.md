# 🏕️ Petcha Camp Registration System

A full-stack web application for managing registration and activities of **Petcha Camp**, a scholarship event organized by KMUTT.

> ✨ This system handles student registration, card data collection, and randomized buddy/group pairing.

---

## 📌 Objectives

- Register students for Petcha Camp (30–31 August 2568)
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
| Hosting   | Ubuntu 18.04.3 LTS       |
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

---

### 🔮 PHASE 2: Card & Buddy Display

- 📇 **Card Display:** Show student cards using collected data
- 🔀 **Group Assignment:** 
  - Group A/B/C/D/E (based on scholarship category)
  - Group 1-6 (random)
- 🎯 **Buddy Matching:**
  - One-to-one buddy pairing
  - Each user gets their buddy's **QR Code**
  - Daily clue reveal: 1 clue/day for 10 days

---

## 📁 Project Structure (suggested)
root/
├── backend/ # Node.js (Express)
│ ├── routes/
│ ├── controllers/
│ ├── models/
│ └── index.js
├── frontend/ # React + TypeScript
│ ├── components/
│ ├── pages/
│ ├── utils/
│ └── App.tsx
├── mysql/ # SQL schema & seed
├── .env
└── README.md



---

## 🛠️ Server Requirements

| Spec           | Value               |
|----------------|---------------------|
| OS             | Ubuntu 22.04  |
| CPU            | 4 Cores             |
| RAM            | 8 GB                |
| Disk           | 100 GB              |
| IP             | Real Internet IP (w/ Reverse Proxy) |
| Domain         | `petchacamp.kmutt.ac.th` |





