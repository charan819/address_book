#  Address Book App

A full-stack Address Book web application built with Angular for the frontend and Node.js, Express, and MongoDB for the backend.

##  Features

-  User Authentication (Register/Login with JWT)
-  Add, View, and Delete Addresses
-  Form validation on both frontend and backend
-  RESTful APIs with token-based access control
-  Responsive UI using Angular

  
---

##  Getting Started

###  Prerequisites

- Node.js (v17+ recommended)
- MongoDB (local or Atlas)
- Angular CLI (`npm install -g @angular/cli`)

---

##  Backend Setup (`/backend`)

1. Navigate to the backend folder:
   ```bash
   cd backend
3. Install dependencies:

  npm install

3.Create a .env file:

  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  
4.Start the server:

  npm start
  
Frontend Setup (/frontend)

1.Navigate to the frontend folder:

  cd frontend
  
2.Install dependencies:

  npm install
  
3.Start the Angular development server:

  ng serve
  
4.Open in browser: http://localhost:4200

Environment Variables

  Make sure to create a .env file in the backend with:
  - MONGO_URI=mongodb://localhost:27017/address_book
  - JWT_SECRET=someSuperSecretKey
  
  ## API Endpoints

Auth Routes
  - POST /api/auth/register
  - POST /api/auth/login

Address Routes (protected)
  - POST /api/address/create
  - GET /api/address/user
  - DELETE /api/address/delete/:id

All address routes require a Bearer <token> in the Authorization header.

Security Note
  - Do not commit your .env file or hardcoded secrets.
  - Use a .gitignore file with:
      - .env
      - node_modules/
  




