# ⚡ Quick Deploy Guide

## 🚨 Step 1: Change MongoDB Password (2 min)
```
1. Go to: https://cloud.mongodb.com
2. Database Access → Edit user → Change password
3. Update .env file with new password
```

## 📤 Step 2: Push to GitHub (2 min)
```bash
git add .
git commit -m "Production ready - AI Portfolio Hub"
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

## 🌐 Step 3: Deploy to Vercel (5 min)
```
1. Go to: https://vercel.com/new
2. Import your GitHub repository
3. Add environment variables:
   - MONGODB_URI
   - JWT_SECRET
   - NODE_ENV=production
   - ADMIN_EMAIL
   - ADMIN_PASSWORD
   - EMAIL_USER
   - EMAIL_PASS
4. Click Deploy
```

## ✅ Step 4: Test (2 min)
```
Visit: https://your-domain.vercel.app
Test admin login
Check all pages load
```

## 🎉 Done!

Total time: ~10 minutes

---

**Need detailed steps?** See DEPLOYMENT-STEPS.md
