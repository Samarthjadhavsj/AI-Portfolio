# AI Portfolio

> A full-stack portfolio platform with dynamic content management and admin dashboard

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Overview

AI Portfolio is a modern, full-stack portfolio website with a powerful admin dashboard. Built with Node.js, Express, and MongoDB, it allows you to manage your portfolio content dynamically without touching code.

**Key Features:**
- Dynamic content management through admin dashboard
- RESTful API with JWT authentication
- Responsive design for all devices
- File upload support for images and documents
- Contact form with email integration
- Real-time content updates

## Quick Start

```bash
# Clone the repository
git clone https://github.com/Samarthjadhavsj/AI-Portfolio.git
cd AI-Portfolio

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your MongoDB URI and credentials

# Seed the database with initial data
npm run seed

# Start the development server
npm start
```

Visit `http://localhost:3000` to view your portfolio.

## Tech Stack

**Frontend:**
- HTML5, CSS3, JavaScript (ES6+)
- Responsive design with CSS Grid and Flexbox

**Backend:**
- Node.js & Express.js
- MongoDB with Mongoose ODM
- JWT authentication
- bcrypt for password hashing
- Multer for file uploads
- Nodemailer for email functionality

**Deployment:**
- Vercel (hosting)
- MongoDB Atlas (database)

## Project Structure

```
AI-Portfolio/
 admin/              # Admin dashboard pages
 config/             # Database configuration
 middleware/         # Authentication middleware
 models/             # MongoDB schemas
 routes/             # API routes
 scripts/            # Utility scripts
 uploads/            # File upload directory
 server.js           # Express server
 package.json        # Dependencies
```

## API Endpoints

### Public Routes
- `GET /api/profile` - Get profile information
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `GET /api/skills` - Get skills by category
- `GET /api/experience` - Get work experience
- `POST /api/contact` - Submit contact form

### Admin Routes (Protected)
- `POST /api/admin/auth/login` - Admin login
- `GET /api/admin/profile` - Get admin profile
- `PUT /api/admin/profile` - Update profile
- `POST /api/admin/projects` - Create project
- `PUT /api/admin/projects/:id` - Update project
- `DELETE /api/admin/projects/:id` - Delete project

## Environment Variables

Create a `.env` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_secure_password
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

For detailed deployment instructions, see [VERCEL-DEPLOY.md](VERCEL-DEPLOY.md)

## Documentation

- [Setup Instructions](SETUP-INSTRUCTIONS.md) - Complete installation guide
- [Deployment Guide](DEPLOYMENT-GUIDE.md) - Production deployment steps
- [Troubleshooting](POST-DEPLOYMENT-TROUBLESHOOTING.md) - Common issues and fixes
- [File Upload Guide](FILE-UPLOAD-GUIDE.md) - Configure file uploads
- [Pre-Push Checklist](PRE-PUSH-CHECKLIST.md) - Security verification

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Environment variable protection
- CORS configuration
- Input validation and sanitization
- Secure file upload handling

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions:
- Check the [Troubleshooting Guide](POST-DEPLOYMENT-TROUBLESHOOTING.md)
- Open an [issue](https://github.com/Samarthjadhavsj/AI-Portfolio/issues)

---

**Made with  by Samarth Jadhav**
