# HRMS Lite – Full-Stack Coding Assignment

HRMS Lite is a lightweight Human Resource Management System (HRMS) built as part of a full-stack assessment.  
The application allows an admin to manage employee records and track daily attendance using a clean and professional UI.

---

## 🚀 Live Demo

- **Frontend (Vercel):** https://hrms-lite-2-beryl.vercel.app/
- **Backend (Render):** https://hrms-lite-2-4xrt.onrender.com
- **API Documentation (Swagger):** https://hrms-lite-2-4xrt.onrender.com/docs

---

## 📌 Project Overview

This project simulates a basic internal HR tool with two major modules:

- **Employee Management**
- **Attendance Management**

The focus of this assignment is to demonstrate end-to-end full-stack development skills including:
- Frontend development
- Backend API design
- Database modeling and persistence
- Error handling and validations
- Deployment readiness

---

## ✨ Features

### 👨‍💼 Employee Management
- Add employee with:
  - Employee ID (unique)
  - Full Name
  - Email Address (unique)
  - Department
- View all employees in a table format
- Delete employee record

### 📅 Attendance Management
- Mark attendance for employees using:
  - Date
  - Status (Present / Absent)
- View attendance records of each employee
- Duplicate attendance for the same date updates the existing record

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- FastAPI (Python)
- SQLAlchemy ORM
- Pydantic Validation

### Database
- SQLite

### Deployment
- Frontend: Vercel
- Backend: Render

---

## 🔗 API Endpoints

### Employee APIs
- `GET /employees` → Fetch all employees
- `POST /employees` → Add new employee
- `DELETE /employees/{emp_id}` → Delete employee

### Attendance APIs
- `POST /attendance` → Mark attendance
- `GET /attendance/{employee_id}` → Fetch attendance records for an employee

---

## ✅ Validations & Error Handling

- Required field validation for employee and attendance forms
- Email validation using `EmailStr` (Pydantic)
- Duplicate employee prevention (Employee ID and Email must be unique)
- Attendance update for same employee + date
- Proper HTTP status codes and meaningful error responses

---

## ⚙️ How to Run Locally

### 1️⃣ Clone Repository
```bash
git clone <YOUR_GITHUB_REPO_LINK>
cd HRMS-Lite-2
```

### 2️⃣ Backend Setup (FastAPI)

Go to backend folder:
```bash
cd backend
```

Create virtual environment:
```bash
python -m venv venv
```

Activate virtual environment (Git Bash):
```bash
source venv/Scripts/activate
```

Install dependencies:
```bash
pip install -r requirements.txt
```

Run backend server:
```bash
uvicorn main:app --reload
```

Backend will start at:
```bash
http://127.0.0.1:8000
```

Swagger Docs:
```bash
http://127.0.0.1:8000/docs
```

### 3️⃣ Frontend Setup (React)

Go to frontend folder:
```bash
cd ../frontend
```

Install dependencies:
```bash
npm install
```

Run frontend:
```bash
npm run dev
```

Frontend will start at:
```bash
http://localhost:5173
```
---

## 📂 Project Structure
HRMS-Lite-2/
   backend/
      main.py
      models.py
      schemas.py
      database.py
      requirements.txt

   frontend/
      src/
         pages/
         components/
         api/

---

## 📌 Assumptions / Limitations

- Single admin system (no authentication required)

- Payroll, leave management, and other HR modules are intentionally out of scope

- SQLite is used for lightweight persistence

- UI is designed to be clean, simple, and production-ready as per assignment requirement

---

## 👨‍💻 Author

- Ayush Rawat
- GitHub: https://github.com/ayush-030