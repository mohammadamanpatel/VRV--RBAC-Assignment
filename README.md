
---

# RBAC Assignment

A backend application for managing online examinations with features for authentication, role-based access control (RBAC), and CRUD operations for users and exams.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)

---

## Features

### General:
- Secure login system using JWT.
- Role-based access control to restrict user actions.
- Token expiry handling with error messaging.

### Admin:
- Oversee all exams.

### Instructor:
- Create, update, and delete exams.

### Student:
- View available exams.
- Attempt exams and submit answers.

---

## Technologies Used
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Token (JWT)
---

## Folder Structure

```plaintext
root-dir/
├── config/
│   └── DB.Connect.js               # Database connection
├── controllers/
│   ├── exam.controller.js          # Business logic for exam routes
│   └── user.controller.js          # Business logic for user routes
├── middlewares/
│   ├── Auth.middleware.js          # Authentication middleware (JWT verification)
│   └── Role.middleware.js          # Authorization middleware (RBAC)
├── models/
│   ├── exam.model.js               # Schema for exams
│   └── user.model.js               # Schema for users
├── routes/
│   ├── exam.routes.js              # Routes for exam-related APIs
│   └── user.routes.js              # Routes for user-related APIs
├── .env                            # Environment variables
├── .gitignore                      # Files/folders to ignore in Git
├── app.js                          # Main Express app setup
├── package.json                    # Node.js dependencies and scripts
├── package-lock.json               # Dependency lock file
└── README.md                       # Project documentation
```

---

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/mohammadamanpatel/VRV--RBAC-Assignment
   cd VRV--RBAC-Assignment
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     PORT=<your-port-number>
     MONGO_URI=<your-mongodb-connection-string>
     JWT_SECRET=<your-jwt-secret-key>
     JWT_EXPIRY=<yout-jwt-expiry>
     ```

4. **Start the Application**
   ```bash
   npm start
   ```

---

## API Documentation

Refer to the [API Documentation](https://www.postman.com/joint-operations-cosmologist-64352344/workspace/exam-system-endpoints/collection/30730048-f9511483-07ec-40e6-ad90-ae8352cb0c45?action=share&creator=30730048) for detailed information on available endpoints, request/response structures, and examples.

---

