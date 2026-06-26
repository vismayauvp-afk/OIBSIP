# 🔐 Login Authentication System

A modern **client-side Login Authentication System** built using **HTML5, CSS3, and JavaScript**. The application provides secure user registration, login authentication, password hashing using the Web Crypto API (SHA-256), and protected dashboard access without requiring a backend server.

Developed as part of the **Oasis Infobyte Web Development & Design Internship – Level 2 (Task 4)**.

---

## 📌 Objective

Build a secure authentication system featuring:

* User Registration
* Login Validation
* Password Hashing
* Protected Dashboard
* Session Management
* Logout Functionality

---

## ✨ Features

* 👤 User Registration
* 🔑 Secure Login Authentication
* 🔒 SHA-256 Password Hashing (Web Crypto API)
* 📧 Duplicate Username/Email Detection
* ✅ Password Validation

  * Minimum 8 characters
  * At least one numeric digit
* ⚠️ Generic Error Messages for Invalid Credentials
* 🛡️ Protected Dashboard Access
* 🚪 Logout Functionality
* 💾 User Data Stored in LocalStorage
* 🔄 Session Management
* 📱 Responsive User Interface
* 🎨 Modern and Interactive Design

---

## ✅ Feature Checklist

| Requirement                        | Status |
| ---------------------------------- | :----: |
| Registration Page                  |    ✅   |
| Login Page                         |    ✅   |
| Password Validation                |    ✅   |
| Duplicate User Detection           |    ✅   |
| Generic Invalid Credential Message |    ✅   |
| Protected Dashboard                |    ✅   |
| Logout Functionality               |    ✅   |
| SHA-256 Password Hashing           |    ✅   |
| Form Validation                    |    ✅   |

---

## 🛠️ Technologies Used

* HTML5
* CSS3
* JavaScript (ES6)
* Web Crypto API (SHA-256)
* LocalStorage
* Session Management

---

## 📂 Project Structure

```text
WebDev-L2-LoginAuthenticationSystem/
│
├── index.html
├── app.js
├── style.css
└── README.md
```

---

## 🚀 How to Run

1. Clone or download the repository.
2. Open the project folder.
3. Open **index.html** in any modern web browser.
4. Register a new account.
5. Login with your credentials.
6. Access the protected dashboard.
7. Logout to terminate the session.

No installation or backend server is required.

---

## 🔐 Authentication Workflow

### Registration

* User enters username/email and password.
* Password is validated.
* Duplicate accounts are prevented.
* Password is hashed using SHA-256.
* Hashed credentials are stored in LocalStorage.

### Login

* User enters credentials.
* Password is hashed again.
* Hash is compared with the stored hash.
* Successful authentication creates a session.

### Dashboard

* Accessible only after successful login.
* Unauthorized access automatically redirects to the login page.

### Logout

* Session data is cleared.
* User is redirected to the login screen.

---

## 📚 Learning Outcomes

This project helped me understand:

* Client-side authentication
* Password hashing using SHA-256
* JavaScript Web Crypto API
* Form validation
* LocalStorage usage
* Session management
* DOM manipulation
* Responsive web design

---


---

## 👨‍💻 Author

**Vismaya UVP**

Developed for the **Oasis Infobyte Web Development & Design Internship – Level 2 Task 4**.
