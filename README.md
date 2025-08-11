# Form Builder - MERN Stack

A powerful, interactive form builder application with three unique question types: **Categorize**, **Cloze (Fill-in-the-blanks)**, and **Comprehension** questions. Built with modern web technologies and designed for both form creators and form fillers.

## ✨ Features

### 🎯 **Question Types**
- **Categorize Questions**: Drag & drop interface for sorting items into categories
- **Cloze Questions**: Fill-in-the-blank questions with interactive text selection
- **Comprehension Questions**: Passage-based multiple choice questions with collapsible interface

### 🛠 **Form Builder Features**
- **Visual Form Editor**: Intuitive drag-and-drop form creation
- **Real-time Preview**: See your form as users will see it
- **Question Management**: Add, edit, delete, and reorder questions
- **Image Support**: Add header images and question-specific images
- **Responsive Design**: Works perfectly on all devices

### 📊 **Form Management**
- **Form Dashboard**: Manage all your forms in one place
- **Form Sharing**: Generate shareable links for form distribution
- **Response Tracking**: Monitor form submissions and analytics
- **Data Export**: Export responses for analysis

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Frontend** | React 18 + Vite + Tailwind CSS |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB + Mongoose |
| **Deployment** | Vercel |
| **Icons** | Lucide React |
| **HTTP Client** | Axios |

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (v7.0.0 or higher) - Comes with Node.js
- **Git** - [Download here](https://git-scm.com/)
- **MongoDB Atlas Account** (free) - [Sign up here](https://cloud.mongodb.com/)

### Check Your Versions
```bash
node --version    # Should be v16+
npm --version     # Should be v7+
git --version     # Any recent version
🚀 Local Installation & Setup
Step 1: Clone the Repository
bash# Clone the repository
git clone https://github.com/yourusername/form-builder.git

# Navigate to project directory
cd form-builder
Step 2: Install Dependencies
bash# Install all dependencies (root, client, and server)
npm run install-all

# OR install manually:
npm install                    # Root dependencies
cd client && npm install     # Frontend dependencies
cd ../server && npm install  # Backend dependencies
cd ..                        # Back to root
Step 3: Set Up MongoDB
Option A: MongoDB Atlas (Recommended - Free)

Create MongoDB Atlas Account:

Go to MongoDB Atlas
Sign up for a free account


Create a Cluster:

Click "Build a Database"
Choose "M0 FREE" tier
Select your preferred cloud provider and region
Click "Create Cluster"


Create Database User:

Go to "Database Access" in sidebar
Click "Add New Database User"
Username: formbuilder
Password: Generate a secure password and save it
Database User Privileges: "Read and write to any database"
Click "Add User"


Configure Network Access:

Go to "Network Access" in sidebar
Click "Add IP Address"
Click "Allow Access from Anywhere" (for development)
Click "Confirm"


Get Connection String:

Go to "Database" in sidebar
Click "Connect" on your cluster
Choose "Connect your application"
Copy the connection string



Step 4: Configure Environment Variables
Create environment file for the server:
bash# Create server/.env file
cd server
touch .env
Add the following to server/.env:
envMONGODB_URI=mongodb+srv://formbuilder:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/formbuilder?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
Important: Replace YOUR_PASSWORD with your actual MongoDB password!
Step 5: Start the Application
bash# From project root - starts both frontend and backend
npm run dev
This will start:

Frontend: http://localhost:5173
Backend: http://localhost:5000
API: http://localhost:5000/api

Step 6: Verify Installation

Check Frontend: Open http://localhost:5173
Check Backend: Open http://localhost:5000/api/health
Test Database Connection:
bashcd server
node -e "require('dotenv').config(); const mongoose = require('mongoose'); mongoose.connect(process.env.MONGODB_URI).then(() => console.log('✅ MongoDB Connected!')).catch(err => console.log('❌ MongoDB Error:', err));"


🎮 How to Use
Creating Your First Form

Start the Application: npm run dev
Access Dashboard: Go to http://localhost:5173
Create New Form: Click "Create New Form"
Add Questions:
Categorize Question:

Click "Categorize" button
Add categories (e.g., "Frontend", "Backend")
Add items and select correct categories

Cloze Question:

Click "Cloze" button
Write sentence and underline words (Ctrl+U / Cmd+U)
Underlined words become fillable blanks

Comprehension Question:

Click "Comprehension" button
Add reading passage
Create multiple choice questions


Preview & Test: Click "Preview" to test your form
Save & Share: Click "Save" to store your form

📁 Project Structure
form-builder/
├── client/                     # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   └── FormBuilder.jsx # Main component
│   │   ├── App.jsx            # Root component
│   │   ├── main.jsx           # Entry point
│   │   └── index.css          # Tailwind styles
│   ├── package.json           # Frontend dependencies
│   ├── vite.config.js         # Vite configuration
│   └── index.html             # HTML template
├── server/                     # Express Backend
│   ├── models/
│   │   ├── Form.js            # Form schema
│   │   └── Response.js        # Response schema
│   ├── routes/
│   │   ├── forms.js           # Form CRUD routes
│   │   └── responses.js       # Response routes
│   ├── server.js              # Express server
│   ├── package.json           # Backend dependencies
│   └── .env                   # Environment variables
├── vercel.json                # Vercel deployment config
├── package.json               # Root package file
└── README.md                  # This file
🔧 API Documentation
Forms API
MethodEndpointDescriptionGET/api/formsGet all formsGET/api/forms/:idGet specific formPOST/api/formsCreate new formPUT/api/forms/:idUpdate formDELETE/api/forms/:idDelete form
Responses API
MethodEndpointDescriptionPOST/api/responsesSubmit form responseGET/api/responses/form/:formIdGet form responses
🚀 Deployment
Deploy to Vercel

Push to GitHub:
bashgit add .
git commit -m "Ready for deployment"
git push origin main

Deploy via Vercel Dashboard:

Go to vercel.com
Import your GitHub repository
Add environment variable: MONGODB_URI
Deploy!



🛠 Available Scripts
bash# Development
npm run dev              # Start both frontend and backend
npm run install-all      # Install all dependencies

# Production
npm run build            # Build frontend
npm start                # Start backend
🐛 Troubleshooting
Common Issues

Cannot connect to MongoDB: Check connection string and whitelist IP
Port 5000 in use: Kill process with lsof -ti:5000 | xargs kill -9
Module not found: Run npm run install-all
Environment variables: Ensure .env is in server/ directory

🤝 Contributing

Fork the repository
Create feature branch: git checkout -b feature/amazing-feature
Commit changes: git commit -m 'Add amazing feature'
Push to branch: git push origin feature/amazing-feature
Open Pull Request

📄 License
This project is licensed under the MIT License.

🚀 Quick Start Summary
bash# 1. Clone and install
git clone https://github.com/yourusername/form-builder.git
cd form-builder
npm run install-all

# 2. Set up MongoDB and environment
# Create server/.env with your MONGODB_URI

# 3. Start development
npm run dev

# 4. Open http://localhost:5173
Happy Form Building! 🎯✨
