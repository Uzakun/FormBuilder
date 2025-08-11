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
