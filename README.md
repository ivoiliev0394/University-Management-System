# 🎓 University Management System (React + ASP.NET Core)

## 📌 Project Overview

**University Management System** is a Single Page Application (SPA) built with **React.js** for the front-end and **ASP.NET Core Web API** for the back-end.A full-stack web application built with React (frontend) and ASP.NET Core Web API (backend) that manages university-related data including students, teachers, courses, and grades.

The system manages:
- Students
- Teachers
- Disciplines
- Grades
- Reports

The application supports **role-based access control** with different functionality for:
- **Admin**
- **Teacher**
- **Student**

> ⚠️ Note: The back-end exists to support the front-end.  
> The project evaluation focuses **entirely on the front-end**, according to the assignment requirements.

---

## 🧠 Application Roles & Functionality

### 👑 Admin
- Full CRUD for:
  - Students
  - Teachers
  - Disciplines
  - Grades
- Access to all reports
- User management

### 👨‍🏫 Teacher
- View all disciplines
- Edit **only disciplines they teach**
- View grades **only for their disciplines**
- Edit grades **only for their disciplines**
- Access academic reports

### 🎓 Student
- View own profile and grades
- View other students’ public profiles
- View disciplines related to their major
- Access **discipline average report only**
- Cannot modify any data

---

## 🌍 Public & Private Parts

### Public Part (No Authentication)
- Home page
- Login page
- Public disciplines catalog (read-only)
- Contact page
- GitHub project link

### Private Part (Authenticated Users)
- Profile page
- Role-based dashboards
- Protected CRUD functionality
- Protected reports

---

## 🧩 Technologies Used

### Front-end
- React.js
- React Router
- Context API
- Hooks (`useState`, `useEffect`, `useContext`)
- Bootstrap 5
- Fetch API
- External CSS files

### Back-end
- ASP.NET Core Web API
- Entity Framework Core
- JWT Authentication
- Role-based authorization

---

## 🚦 Routing & Guards

- **PrivateGuard** – blocks unauthenticated users from private pages
- **RoleGuard** – restricts pages based on user role
- Logged-in users **cannot access Login/Register**
- Guests **cannot access private routes**

---

## 📄 Application Pages (Dynamic)

At least **4 dynamic pages** (excluding login/register):
- Students Catalog
- Student Details
- Disciplines Catalog
- Discipline Details
- Grades Catalog
- Reports (multiple dynamic views)

Routes with parameters:
- `/students/:id`
- `/disciplines/:id`
- `/grades/:id`

---

## 🧪 Error Handling & Validation

- Form validation (required fields, ranges, formats)
- API error handling
- Role-based access protection
- Safe UI behavior on failed requests

---

## 🧱 Component Structure

- Modular components
- Stateless & stateful components
- Separated pages, components, services, guards
- Clear folder organization

---

## 📘 Documentation

- This `README.md` serves as project documentation
- Explains architecture, setup, usage, roles, and features

---

## 🚀 Getting Started (How to Run the Project)

### 🧩 Prerequisites

- Node.js (v18+)
- npm
- .NET SDK (v7+)
- SQL Server / LocalDB
- Git

---

### 🔧 Back-end Setup (ASP.NET Core API)

1. Open the API project in **Visual Studio**
2. Configure connection string in `appsettings.json`
3. Apply migrations:

```bash
Update-Database
```

4. Run the API:

```bash
dotnet run
```

API URL:
```
https://localhost:7266
```

---

### 🎨 Front-end Setup (React)

1. Open terminal in the client folder
2. Install dependencies:

```bash
npm install
```

3. Start the app:

```bash
npm run dev
```

App URL:
```
http://localhost:5173
```

---

## 🔐 Authentication

- JWT-based authentication
- Token stored in `localStorage`
- Roles loaded on login
- Role-based UI rendering

---

## 🏆 Bonus Features

- Role-based UI logic
- Advanced route guards
- Reports module
- Bootstrap-based responsive UI
- Clean UX separation per role

---

## 📂 Git Repository

- Public GitHub repository
- Meaningful commits across multiple days
- Clear commit history

---

## 🎤 Project Defense Readiness

The project demonstrates:
- Full SPA architecture
- Proper React usage
- Role-based logic
- Clean UI
- Secure routing
- Real-world application structure

---


## 📌 Author

Made by [Ivailo Iliev](https://github.com/ivoiliev0394) | Contact: [ivailo.iliev9999@gmail.com](mailto\:ivailo.iliev9999@gmail.com)

