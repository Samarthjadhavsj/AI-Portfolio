<div align="center">

![AI Portfolio Banner](https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=400&fit=crop&q=80)

# 🚀 AI Engineer Portfolio

### Think Different. Build Intelligent.

*A modern, full-stack portfolio platform with powerful CMS capabilities and cloud-based image storage*

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Site-0071E3?style=for-the-badge)](https://ai-portfolio-fn8q.onrender.com)
[![GitHub Stars](https://img.shields.io/badge/⭐_Star-Repository-181717?style=for-the-badge&logo=github)](https://github.com/Samarthjadhavsj/AI-Portfolio)
[![License](https://img.shields.io/badge/📄_License-MIT-green?style=for-the-badge)](LICENSE)

![Tech Showcase](https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=300&fit=crop&q=80)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Cloudinary Setup](#️-cloudinary-setup)
- [Deployment](#-deployment)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Admin Panel](#-admin-panel)
- [Contributing](#-contributing)
- [Author](#-author)

---

## 🎯 Overview

An **Apple-inspired portfolio website** designed for AI engineers and tech professionals. This platform combines elegant design with robust functionality, featuring a powerful admin panel for dynamic content management and **Cloudinary integration** for persistent, cloud-based image storage.

### ✨ Key Highlights

```
🎨 Apple-Inspired Design    →  Clean, minimal, elegant UI
🔐 Secure Authentication    →  JWT + bcrypt protection  
☁️  Cloudinary Integration   →  30MB images, cloud storage, never lost
📱 Fully Responsive         →  Perfect on any device
⚡ Lightning Fast           →  Optimized performance
🛠️  Easy Content Management →  No coding required
🚀 Production Ready         →  Deployed on Render with CI/CD
```

---

## 🌟 Features

<table>
<tr>
<td width="50%" valign="top">

### 🎨 Frontend Excellence

- ✅ **Responsive Design** - Seamless experience across all devices
- ✅ **Smooth Animations** - Intersection Observer API for scroll effects
- ✅ **Dynamic Content Loading** - Real-time data fetching from backend
- ✅ **Hidden Admin Access** - Click "SAM" logo 5 times for secret entry
- ✅ **Apple Aesthetics** - Clean, modern, professional interface
- ✅ **SEO Optimized** - Meta tags and semantic HTML

</td>
<td width="50%" valign="top">

### ⚙️ Backend Power

- ✅ **RESTful API** - Express.js with organized route structure
- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **Cloudinary Storage** - Cloud-based image hosting (30MB limit)
- ✅ **MongoDB Database** - Scalable NoSQL data storage
- ✅ **Email Integration** - Nodemailer for contact form
- ✅ **Input Validation** - Express-validator for security

</td>
</tr>
</table>

### 🛡️ Security Features

- 🔐 **Password Hashing** - bcrypt with salt rounds
- 🎫 **JWT Tokens** - Stateless authentication with expiration
- ✅ **Input Validation** - Sanitization and validation
- 🛡️ **CORS Protection** - Configured cross-origin policies
- 🔒 **Environment Variables** - Sensitive data secured

---

## 🛠️ Tech Stack

<div align="center">

### Core Technologies

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

### Frontend

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### Tools & Deployment

![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

</div>

---

## 📦 Quick Start

### Prerequisites

```bash
Node.js v24.x or higher
MongoDB Atlas account (free tier)
Cloudinary account (free tier)
Git
```

### Installation Steps

```bash
# 1️⃣ Clone the repository
git clone https://github.com/Samarthjadhavsj/AI-Portfolio.git
cd AI-Portfolio

# 2️⃣ Install dependencies
npm install

# 3️⃣ Setup environment variables
cp .env.example .env
# Edit .env with your credentials (see below)

# 4️⃣ Create admin account
npm run create-admin

# 5️⃣ Start development server
npm run dev

# 6️⃣ Open in browser
# http://localhost:3000
```

### Environment Configuration

Create a `.env` file in the root directory:

```env
# MongoDB Database
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/DATABASE_NAME

# Server Configuration
NODE_ENV=development
PORT=3000

# Authentication
JWT_SECRET=your-super-secret-jwt-key-here

# Admin Credentials
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD=your-secure-password

# Cloudinary (Image Storage) - REQUIRED
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email Configuration (Optional)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

---

## ☁️ Cloudinary Setup

### Why Cloudinary?

Cloudinary solves the **persistent storage problem** on platforms like Render where the filesystem is ephemeral (files get deleted on restart).

| Feature | Cloudinary | Local Storage |
|---------|-----------|---------------|
| **File Persistence** | ✅ Forever | ❌ Lost on restart |
| **File Size Limit** | ✅ 30MB | ❌ 10MB (MongoDB) |
| **CDN Delivery** | ✅ Fast worldwide | ❌ Slow |
| **Cost** | ✅ Free tier | ✅ Free |
| **Setup Time** | ⏱️ 2 minutes | ⏱️ Complex |

### Setup Instructions

**Step 1: Create Account**
1. Go to [cloudinary.com](https://cloudinary.com)
2. Click "Sign Up" (free forever)
3. Verify your email

**Step 2: Get Credentials**
1. Login to Cloudinary dashboard
2. Find these values:
   - **Cloud Name** (displayed at top)
   - **API Key** (in dashboard)
   - **API Secret** (click eye icon to reveal)

**Step 3: Add to Environment**
```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

**Step 4: Deploy**
- Images now stored in cloud
- 30MB file size limit
- Never lost on server restart
- Fast CDN delivery worldwide

---

## 🚀 Deployment

### Deploy on Render (Recommended)

**Why Render?**
- ✅ Free tier available
- ✅ Automatic deployments from GitHub
- ✅ Easy environment variable management
- ✅ Built-in SSL certificates

**Deployment Steps:**

1. **Create Render Account**
   - Visit [render.com](https://render.com)
   - Sign up with GitHub

2. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select `AI-Portfolio`

3. **Configure Service**
   ```
   Name: ai-portfolio
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free
   ```

4. **Add Environment Variables**
   - Click "Environment" tab
   - Add all variables from `.env` file
   - **Important:** Include Cloudinary credentials!

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (2-3 minutes)
   - Your site is live! 🎉

**Automatic Deployments:**
- Every push to `main` branch triggers auto-deployment
- No manual intervention needed
- Check logs for deployment status

---

## 🔌 API Documentation

### Public Endpoints

```http
GET    /api/profile              # Get profile information
GET    /api/projects             # Get all published projects
GET    /api/projects/:id         # Get single project details
GET    /api/skills               # Get all skills
GET    /api/experience           # Get all experience entries
POST   /api/contact              # Submit contact form
POST   /api/analytics/pageview   # Track page views
GET    /api/health               # Health check endpoint
```

### Admin Endpoints (Protected)

**Authentication Required:** Bearer Token in Authorization header

```http
POST   /api/admin/login          # Admin login (returns JWT)
POST   /api/admin/logout         # Admin logout
GET    /api/admin/profile        # Get admin profile
PUT    /api/admin/profile        # Update profile information

# Projects Management
GET    /api/admin/projects       # Get all projects (including drafts)
POST   /api/admin/projects       # Create new project
PUT    /api/admin/projects/:id   # Update project
DELETE /api/admin/projects/:id   # Delete project

# Skills Management
GET    /api/admin/skills         # Get all skills
POST   /api/admin/skills         # Create new skill
PUT    /api/admin/skills/:id     # Update skill
DELETE /api/admin/skills/:id     # Delete skill

# Experience Management
GET    /api/admin/experience     # Get all experience
POST   /api/admin/experience     # Create new experience
PUT    /api/admin/experience/:id # Update experience
DELETE /api/admin/experience/:id # Delete experience
```

### File Upload

```http
POST   /api/upload               # Upload file to Cloudinary
```

**Request:** `multipart/form-data` with `file` field

**Response:**
```json
{
  "success": true,
  "url": "https://res.cloudinary.com/...",
  "publicId": "portfolio/abc123",
  "originalName": "image.jpg",
  "size": 1024000
}
```

---

## 📁 Project Structure

```
AI-Portfolio/
├── 📁 admin/                    # Admin panel HTML pages
│   ├── login.html              # Admin login page
│   ├── dashboard.html          # Admin dashboard
│   ├── home.html               # Profile management
│   ├── projects.html           # Projects management
│   ├── skills.html             # Skills management
│   └── experience.html         # Experience management
│
├── 📁 config/                   # Configuration files
│   ├── database.js             # MongoDB connection
│   └── cloudinary.js           # Cloudinary setup
│
├── 📁 middleware/               # Express middleware
│   └── auth.js                 # JWT authentication
│
├── 📁 models/                   # Mongoose schemas
│   ├── Admin.js                # Admin user model
│   ├── Profile.js              # Profile data model
│   ├── Project.js              # Project model
│   ├── Skill.js                # Skill model
│   ├── Experience.js           # Experience model
│   ├── Contact.js              # Contact form model
│   └── Analytics.js            # Analytics model
│
├── 📁 routes/                   # API routes
│   ├── admin.js                # Admin endpoints
│   └── upload.js               # Cloudinary upload
│
├── 📁 scripts/                  # Utility scripts
│   ├── create-admin.js         # Create admin account
│   └── seed.js                 # Seed database
│
├── 📄 server.js                 # Express server entry point
├── 📄 package.json              # Dependencies
├── 📄 .env.example              # Environment template
└── 📄 README.md                 # This file
```

---

## 🎨 Admin Panel

### Access Methods

**Method 1: Direct URL**
```
https://your-domain.com/admin/login.html
```

**Method 2: Secret Access (Easter Egg)**
1. Visit homepage
2. Click "SAM" logo in navbar **5 times quickly**
3. Automatically redirects to admin login

### Admin Features

- 📝 **Profile Management** - Update bio, education, contact info
- 🖼️ **Project Portfolio** - Add/edit/delete projects with Cloudinary images
- 💪 **Skills Showcase** - Manage skills with categories
- 📅 **Experience Timeline** - Add work experience and education
- 🔗 **Coding Profiles** - Link to GitHub, LeetCode, HackerRank
- 📧 **Contact Messages** - View submitted contact forms
- 📊 **Analytics** - Track page views and visitor data

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start development server with nodemon |
| `npm run create-admin` | Create admin account interactively |
| `npm run seed` | Seed database with sample data |

---

## 🌟 Performance Metrics

<div align="center">

| Metric | Score |
|--------|-------|
| **Lighthouse Performance** | 95+ |
| **First Contentful Paint** | < 1.5s |
| **Time to Interactive** | < 3.5s |
| **Accessibility** | 100 |
| **Best Practices** | 95+ |
| **SEO** | 100 |

</div>

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

<div align="center">

### Samarth A Jadhav

**AI Engineer | Full-Stack Developer | Machine Learning Enthusiast**

[![Portfolio](https://img.shields.io/badge/🌐_Portfolio-Visit_Site-0071E3?style=for-the-badge)](https://ai-portfolio-fn8q.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Samarthjadhavsj)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/samarth-a-jadhav-5a401625b/)
[![Email](https://img.shields.io/badge/Email-Contact-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:samarthjadhavsj121@gmail.com)

</div>

---

## 🙏 Acknowledgments

- **Design Inspiration** - [Apple Inc.](https://www.apple.com)
- **Images** - [Unsplash](https://unsplash.com)
- **Cloud Storage** - [Cloudinary](https://cloudinary.com)
- **Database** - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Hosting** - [Render](https://render.com)
- **Icons** - [Shields.io](https://shields.io)

---

<div align="center">

### 💡 Built with ❤️ and ☕

**Think Different. Build Intelligent.**

⭐ **Star this repository if you found it helpful!**

---

![Footer](https://capsule-render.vercel.app/api?type=waving&color=0:0071E3,100:00C7BE&height=120&section=footer)

*Last updated: January 2026*

</div>
