# 🔐 SecureBox – File Integrity Checker Web App

SecureBox is a simple and powerful web application that allows users to upload a file, calculates its SHA-256 hash, and verifies its integrity. It provides a visual indication of whether the uploaded file has been tampered with or not, using a **green/red box** UI.

---

## 📸 Screenshot Preview

![SecureBox Screenshot](<img width="1640" height="748" alt="Screenshot 2025-07-31 024206" src="https://github.com/user-attachments/assets/3bb0a448-6a92-492b-88eb-0b7bfdb3fab1" />)

---

## 🚀 Features

- ✅ Upload any file to calculate its SHA-256 hash
- 🔐 Verify file integrity by comparing hashes
- 🟢 Green box for matched hashes
- 🔴 Red box for mismatched hashes
- 🧾 Stores metadata securely in MongoDB
- 🌐 Modern UI using React + Bootstrap
- 📦 Backend built with Node.js + Express

---

## 🛠️ Tech Stack

**Frontend**  
- React.js  
- Bootstrap (CSS framework)  

**Backend**  
- Node.js  
- Express.js  
- Crypto module (for SHA-256)  
- Multer (for file uploads)

**Database**  
- MongoDB

---

## 🧩 Folder Structure

SecureBox/
├── client/        # React frontend
│   ├── src/
│   └── public/
├── server/        # Node backend
│   ├── uploads/
│   ├── routes/
│   └── server.js
└── README.md


## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/securebox.git
cd securebox

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install

# Run backend
cd ../server
node server.js

# In a new terminal, run frontend
cd ../client
npm start

## 🧑‍💻 Author

**Subhanshu Sinha**  
GitHub: [https://github.com/Subhanshusinha)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
