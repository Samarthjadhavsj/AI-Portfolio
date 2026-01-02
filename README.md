<div align="center">

![Portfolio Banner](https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=400&fit=crop&q=80)

# AI Portfolio Hub

### A Modern Full-Stack Portfolio Platform with Powerful CMS

*Built with passion for AI Engineers who want complete control over their digital presence*

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge&logo=vercel)](https://your-portfolio.vercel.app)
[![GitHub](https://img.shields.io/badge/github-repo-blue?style=for-the-badge&logo=github)](https://github.com/Samarthjadhavsj/ai-portfolio-hub)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)

[Features](#features) • [Demo](#demo) • [Tech Stack](#tech-stack) • [Quick Start](#quick-start) • [Documentation](#documentation)

</div>

---

## ✨ Overview

A production-ready, full-stack portfolio website with a powerful admin panel. Manage your entire portfolio without touching code - add projects, update skills, upload files, and more through an intuitive CMS interface.

<div align="center">

![Portfolio Preview](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop&q=80)

</div>

### 🎯 Why This Portfolio?

- **🚀 Zero Code Updates** - Manage everything through admin panel
- **📱 Fully Responsive** - Beautiful on all devices
- **🎨 Apple-Inspired Design** - Clean, modern, professional
- **⚡ Lightning Fast** - Optimized performance
- **🔒 Secure** - JWT authentication & password hashing
- **📊 Dynamic Content** - All content loads from database
- **📁 File Uploads** - Upload images & PDFs (up to 30MB)
- **✅ Production Ready** - 100% tested and deployed

---

## 🌟 Features

<div align="center">

![Features](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop&q=80)

</div>

### Frontend

- 🏠 **Dynamic Homepage** - Hero section with colored text & info cards
- 👤 **About Page** - Bio, education, social links
- 💼 **Projects Showcase** - Grid layout with images & tags
- 🛠️ **Skills Display** - Categorized skills with proficiency
- 💻 **Coding Profiles** - LeetCode, HackerRank, GitHub stats
- 📚 **Experience Timeline** - Work & education history
- 📧 **Contact Form** - Email integration with resume download

### Admin Panel

- 🔐 **Secure Login** - JWT-based authentication
- 📊 **Dashboard** - Overview of all content
- ✏️ **Content Editor** - Edit all pages in real-time
- ➕ **CRUD Operations** - Add, edit, delete projects/skills/experience
- 📤 **File Upload** - Images & PDFs up to 30MB
- 📨 **Message Viewer** - See contact form submissions
- 🎨 **Rich Text** - Support for colored text & HTML

### Technical Features

- ⚡ **Dynamic Loading** - All content from MongoDB
- 🔄 **Real-time Updates** - Changes reflect immediately
- 📱 **Mobile First** - Responsive design
- 🎯 **SEO Optimized** - Meta tags & semantic HTML
- 🔒 **Security** - Protected routes & input validation
- 📦 **File Management** - Organized upload system
- 🚀 **Vercel Ready** - One-click deployment

---

## 🎬 Demo

<div align="center">

### Live Website
[![Website](https://img.shields.io/badge/Visit-Website-0071E3?style=for-the-badge&logo=safari)](https://your-portfolio.vercel.app)

### Admin Panel
[![Admin](https://img.shields.io/badge/Try-Admin%20Panel-FF6482?style=for-the-badge&logo=lock)](https://your-portfolio.vercel.app/admin)

![Demo](https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop&q=80)

</div>

---

## 🛠️ Tech Stack

<div align="center">

![Tech Stack](https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop&q=80)

</div>

### Frontend
```
HTML5 • CSS3 • JavaScript ES6+ • Responsive Design
```

### Backend
```
Node.js • Express.js • MongoDB • Mongoose • JWT
```

### Features
```
Multer • Nodemailer • Bcrypt • CORS • Express Validator
```

### Deployment
```
Vercel • MongoDB Atlas • GitHub
```

---

## 🚀 Quick Start

<div align="center">

![Quick Start](https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop&q=80)

</div>

### Prerequisites

```bash
Node.js 18+ • MongoDB • Git
```

### Installation

```bash
# Clone the repository
git clone https://github.com/Samarthjadhavsj/ai-portfolio-hub.git

# Navigate to directory
cd ai-portfolio-hub

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Add your environment variables
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Start the server
npm start
```

### Access

- **Website:** http://localhost:3000
- **Admin Panel:** http://localhost:3000/admin
- **Default Credentials:** Check `.env.example`

---

## 📁 Project Structure

```
ai-portfolio-hub/
├── 📄 Frontend Pages
│   ├── index.html          # Homepage
│   ├── about.html          # About page
│   ├── projects.html       # Projects showcase
│   ├── skills.html         # Skills display
│   ├── experience.html     # Experience timeline
│   ├── coding-profiles.html # Coding profiles
│   └── contact.html        # Contact form
│
├── 🔐 Admin Panel
│   ├── admin/login.html    # Admin login
│   ├── admin/dashboard.html # Dashboard
│   ├── admin/home.html     # Edit homepage
│   ├── admin/about.html    # Edit about
│   ├── admin/projects.html # Manage projects
│   ├── admin/skills.html   # Manage skills
│   ├── admin/experience.html # Manage experience
│   └── admin/contact.html  # View messages
│
├── 🎨 Assets
│   ├── styles.css          # Main stylesheet
│   ├── *-loader.js         # Dynamic loaders
│   └── api-helper.js       # API utilities
│
├── 🔧 Backend
│   ├── server.js           # Express server
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── config/             # Configuration
│   └── middleware/         # Middleware
│
├── 📤 Uploads
│   └── uploads/            # User uploaded files
│
└── 📚 Documentation
    ├── README.md           # This file
    ├── DEPLOYMENT-GUIDE.md # Deployment steps
    └── *.md                # Other guides
```

---

## 🎨 Features Showcase

<div align="center">

### Dynamic Content Management

![CMS](https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop&q=80)

</div>

#### ✏️ Edit Everything

- Homepage hero section (10 fields)
- About page content
- Projects with images
- Skills with categories
- Experience timeline
- Coding profiles
- Contact information

#### 📤 File Uploads

- Profile images (JPEG, PNG, GIF, WebP)
- Resume PDFs
- Project images
- Up to 30MB per file
- Automatic URL generation

#### � Security

- JWT authentication
- Password hashing (bcrypt)
- Protected admin routes
- Input validation
- CORS configuration
- Environment variables

---

## 📊 Admin Panel Features

<div align="center">

![Admin Panel](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop&q=80)

</div>

### Dashboard
- Overview of all content
- Quick stats
- Recent activity

### Content Management
- **Home:** Edit hero section, info cards
- **About:** Update bio, education, social links
- **Projects:** Add/Edit/Delete projects with images
- **Skills:** Manage skills with categories
- **Experience:** Timeline management
- **Coding Profiles:** Update profile links & stats

### File Management
- Upload images & PDFs
- Preview before saving
- Automatic URL generation
- 30MB file size limit

### Messages
- View contact form submissions
- Email notifications
- Message management

---

## 🚀 Deployment

<div align="center">

![Deployment](https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop&q=80)

</div>

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Samarthjadhavsj/ai-portfolio-hub)

### Manual Deployment

```bash
# 1. Push to GitHub
git add .
git commit -m "Initial commit"
git push origin main

# 2. Import to Vercel
# - Go to vercel.com
# - Import your GitHub repository
# - Add environment variables
# - Deploy!
```

### Environment Variables

```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
NODE_ENV=production
```

**Detailed Guide:** [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md)

---

## 📖 Documentation

<div align="center">

![Documentation](https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=800&h=400&fit=crop&q=80)

</div>

### Available Guides

- 📘 [**Setup Instructions**](SETUP-INSTRUCTIONS.md) - Initial setup
- 🚀 [**Deployment Guide**](DEPLOYMENT-GUIDE.md) - Deploy to production
- 📤 [**File Upload Guide**](FILE-UPLOAD-GUIDE.md) - Upload files
- 🧪 [**Testing Guide**](MANUAL-TESTING-GUIDE.md) - Test everything
- 🔧 [**Troubleshooting**](POST-DEPLOYMENT-TROUBLESHOOTING.md) - Fix issues
- 📊 [**Test Report**](COMPREHENSIVE-TEST-REPORT.md) - Test results

---

## ✅ Testing

<div align="center">

### 100% Test Coverage

![Tests Passing](https://img.shields.io/badge/tests-79%2F79%20passing-success?style=for-the-badge)
![Coverage](https://img.shields.io/badge/coverage-100%25-success?style=for-the-badge)

</div>

```bash
# Run comprehensive tests
npm test

# Test results
✅ 79/79 Tests Passed
❌ 0 Failed
⚠️ 0 Warnings
```

**Categories Tested:**
- Database connectivity
- API endpoints
- File system
- Content integrity
- Security
- Environment
- Dependencies

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

<div align="center">

### Samarth A Jadhav

**AI Engineer | Full-Stack Developer**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/samarth-a-jadhav-5a401625b/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github)](https://github.com/Samarthjadhavsj)
[![Email](https://img.shields.io/badge/Email-Contact-D14836?style=for-the-badge&logo=gmail)](mailto:samarthjadhavsj121@gmail.com)

</div>

---

## 🌟 Acknowledgments

- Design inspired by Apple's minimalist aesthetic
- Icons from [Heroicons](https://heroicons.com/)
- Images from [Unsplash](https://unsplash.com/)
- Fonts: SF Pro Display (Apple)

---

## 📊 Project Stats

<div align="center">

![Lines of Code](https://img.shields.io/badge/Lines%20of%20Code-10K%2B-blue?style=for-the-badge)
![Files](https://img.shields.io/badge/Files-100%2B-green?style=for-the-badge)
![Commits](https://img.shields.io/badge/Commits-50%2B-orange?style=for-the-badge)

</div>

---

<div align="center">

### ⭐ Star this repo if you find it helpful!

![Footer](https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=200&fit=crop&q=80)

**Made with ❤️ by Samarth A Jadhav**

</div>
