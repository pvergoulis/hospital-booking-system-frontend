# React + TypeScript + Vite

# 🏥 Hospital Management System
A modern hospital management web application built with React, TailwindCSS, and Material UI — featuring full authentication & role-based authorization. This system allows users to register, log in, manage appointments, and for administrators to take full control over data with advanced CRUD functionality.


# ✨ Features
🔐 Authentication with JSON Web Tokens (JWT)

🧑‍⚕️ Role-based access: differentiate between Admin and Patient

📅 Appointment scheduling and management

✍️ CRUD operations for Doctors, Appointments, Users

⚡ Built with React 19, TailwindCSS, and Material UI

✅ Form validation using React Hook Form + Zod

👮‍♂️ Full client-side route protection based on user role

# 🧪 Demo Credentials
You can try logging in with the following test accounts:

Role	Username	Password
Admin	vergoulis	12345
Patient	mairh	12345


# 1. Clone the repository
git clone https://github.com/your-username/hospital-management.git
cd hospital-management

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev


# 📦 Dependencies & Purpose

| Package                           | Description                                         |
|-----------------------------------|-----------------------------------------------------|
| `react`, `react-dom`              | Core UI rendering                                   |
| `react-router`                    | Routing and navigation                              |
| `react-hook-form`                 | Modern form handling                                |
| `zod`                             | Schema validation with form integration             |
| `@mui/material`, `icons`, `grid` | Elegant UI components & data grids                  |
| `@emotion/react`, `styled`       | MUI styling system                                  |
| `@fontsource/roboto`             | Roboto font for consistent design                   |
| `axios`                           | API calls and HTTP requests                         |
| `jwt-decode`                      | Decodes JWT tokens for access control               |
| `lucide-react`                    | Iconography (clean, sharp React icons)              |
| `tailwindcss`, `@tailwindcss/vite`| Utility-first CSS styling, integrated with Vite     |
| `vite`                            | Fast dev server and bundler (in devDependencies)    |


# 🛡️ Authorization Logic
Users are redirected based on authentication and role.

Admin users gain access to restricted /admin, /admin-user, and CRUD routes.

Non-authenticated users cannot access protected pages and are redirected to /login.



## 📸 Screenshots

### 🔐 Login Page
![Login](https://https://github.com/pvergoulis/hospital-management-frontend/tree/main/src/assets/screenshots/login.png)

### 🏠 Admin Dashboard
![Admin Dashboard](assets/screenshots/adminDashboard.png)

### 🧑‍⚕️ Doctors Page
![Doctors](assets/screenshots/doctors.png)

### 📅 My Appointments
![Appointments](assets/screenshots/my-appointments.png)