# **TaskMate – Todo App (Full Stack)**

This project is a simple full-stack todo application that I built as part of a technical assignment.  
The main goal was to create a clean productivity tool where users can manage their daily tasks after signing up and logging in .

The backend is made with **Node.js + TypeScript**, and the frontend is built using **React + TypeScript**.  
The database is hosted on **MongoDB Atlas**, and user authentication is handled using **JWT**.

---

##  **Features**

### **User Authentication**
- Signup 
- Login (Uing JWT Authentication)
- Forgot Password (OTP sent via email)
- Reset Password

### **Todo Management**
- Create a todo  
- Edit existing todos  
- Delete todos  
- Mark todos as complete/incomplete  
- List all todos for the logged-in user  


### **Other Implementations**
- React Query used for all API calls
- Zustand used for global state 
- Zod + React Hook Form for form validation
- UI with home page, login/signup screens, and a todo dashboard

---

##  **Tech Stack**

### **Frontend**
- React (TypeScript)
- React Router
- React Query
- Zustand
- Zod
- React Hook Form
- Axios

### **Backend**
- Node.js + Express (TypeScript)
- Mongoose
- JWT Authentication
- Nodemailer (Gmail App Password)
- MongoDB Atlas

---


---



### **Backend Setup**
```sh
cd backend
npm install
npm run dev

### **Frontend Setup**
cd frontend
npm install
npm start

API Endpoints Overview

Auth    Routes

Method	Route	                    Description

POST	/api/auth/register	        User Signup
POST	/api/auth/login	            Login + JWT
POST	/api/auth/forgot-password	Send OTP
POST	/api/auth/reset-password	Reset Password


Todo Routes 

Method	    Route	                Description

POST	    /api/todos	            Create Todo
GET	        /api/todos	            List Todos
PUT	        /api/todos/:id	        Update Todo
DELETE	    /api/todos/:id	        Delete Todo
PATCH	    /api/todos/:id/toggle	Toggle Complete



Demo Video

Google Drive Link:

https://drive.google.com/file/d/1Wrgc2nGfUw0VF3ZAabL2VX7P_T0SmHxV/view?usp=sharing

Assumptions

 - OTP validity is set to 15 minutes

 - Each user can only access their own todos

 - Gmail App Password is required for sending OTP emails

 - UI kept simple for readability and assignment requirements

 GitHub Repository:

 https://github.com/garg-lakshay/TaskMate


