# 🚀 Quick Setup Instructions

## Step 1: Set Up MongoDB Atlas

Follow the detailed guide in `MONGODB-SETUP-GUIDE.md` to:
1. Create MongoDB Atlas account (free)
2. Create a cluster
3. Create database user
4. Get connection string

## Step 2: Update Environment Variables

Update your `.env` file with the MongoDB connection string:

```bash
# Copy from .env.example if needed
cp .env.example .env
```

Then edit `.env` and add your MongoDB URI:

```bash
MONGODB_URI=your_mongodb_connection_string_here
```

**Important:** Replace with your actual MongoDB connection string from MongoDB Atlas!

## Step 3: Seed the Database

Run the seed script to populate initial data:

```bash
npm run seed
```

You should see:
```
✅ MongoDB Connected
✅ Profile created
✅ 3 projects created
✅ 4 skill categories created
✅ 3 experience entries created
🎉 Database seeded successfully!
```

## Step 4: Start the Server

```bash
npm start
```

Server will start on http://localhost:3000

## Step 5: Test the API

Open your browser and test these endpoints:

- Profile: http://localhost:3000/api/profile
- Projects: http://localhost:3000/api/projects
- Skills: http://localhost:3000/api/skills
- Experience: http://localhost:3000/api/experience
- Health: http://localhost:3000/api/health

You should see JSON data returned!

## 🎯 What's Working Now

✅ MongoDB connection
✅ Database models (Profile, Project, Skill, Experience, Contact, Analytics)
✅ Seed script with initial data
✅ Public API endpoints:
  - GET /api/profile
  - GET /api/projects
  - GET /api/projects/:id
  - GET /api/skills
  - GET /api/experience
  - POST /api/analytics/pageview
  - POST /api/contact (saves to DB + sends email)
✅ Contact form saves to database
✅ Analytics tracking

## 🔜 Next Steps

After MongoDB is set up and working:

1. **Update Frontend** - Make frontend pages fetch data from API
2. **Admin Authentication** - Add JWT-based login
3. **Admin Dashboard** - Build admin UI
4. **CRUD Operations** - Add create/update/delete endpoints
5. **File Uploads** - Integrate Cloudinary
6. **Deploy** - Deploy to Vercel

## 📝 Notes

- All contact form submissions are now saved to MongoDB
- Page views can be tracked via `/api/analytics/pageview`
- Projects automatically increment view count when accessed
- All data is seeded with your actual portfolio content

## 🆘 Troubleshooting

**Error: "MONGODB_URI is not defined"**
- Make sure `.env` file exists
- Check that `MONGODB_URI` is set correctly

**Error: "Authentication failed"**
- Check your MongoDB password
- Ensure password doesn't have special characters that need URL encoding

**Error: "Connection timeout"**
- Check MongoDB Atlas network access (should allow 0.0.0.0/0)
- Check your internet connection

---

**Ready to continue? Let me know when MongoDB is set up!** 🚀
