# 🚀 Deploy to Vercel - Quick Guide

## Your Repository
**GitHub:** https://github.com/Samarthjadhavsj/AI-Portfolio

---

## Step 1: Go to Vercel (2 minutes)

1. Visit: **https://vercel.com/new**
2. Sign in with GitHub
3. Click "Import Project"

## Step 2: Import Repository (1 minute)

1. Find: `Samarthjadhavsj/AI-Portfolio`
2. Click "Import"
3. Project Name: `ai-portfolio` (or your choice)

## Step 3: Configure Build Settings (1 minute)

Leave these as default:
- **Framework Preset:** Other
- **Root Directory:** ./
- **Build Command:** (leave empty)
- **Output Directory:** (leave empty)
- **Install Command:** `npm install`

## Step 4: Add Environment Variables (3 minutes)

Click "Environment Variables" and add these:

### Required Variables

```env
MONGODB_URI
mongodb+srv://samarthjadhavsj121:YOUR_NEW_PASSWORD@cluster0.pgy3ay3.mongodb.net/portfolio

NODE_ENV
production

JWT_SECRET
(generate with: node scripts/generate-jwt-secret.js)

ADMIN_EMAIL
samarthjadhavsj121@gmail.com

ADMIN_PASSWORD
(choose a strong password)

EMAIL_USER
samarthjadhavsj121@gmail.com

EMAIL_PASS
(your Gmail app password)
```

### 🚨 IMPORTANT

1. **Use NEW MongoDB password** (not the exposed one!)
2. **Generate NEW JWT secret** - Run locally:
   ```bash
   node scripts/generate-jwt-secret.js
   ```
3. **Get Gmail App Password:**
   - Enable 2FA: https://myaccount.google.com/security
   - Generate: https://myaccount.google.com/apppasswords
   - Use the 16-character password

## Step 5: Deploy (2 minutes)

1. Click **"Deploy"**
2. Wait 2-3 minutes
3. Your site will be live!

## Step 6: Test Your Site (5 minutes)

### Public Pages
- [ ] Homepage: `https://your-domain.vercel.app/`
- [ ] About: `https://your-domain.vercel.app/about.html`
- [ ] Projects: `https://your-domain.vercel.app/projects.html`
- [ ] Skills: `https://your-domain.vercel.app/skills.html`
- [ ] Experience: `https://your-domain.vercel.app/experience.html`
- [ ] Contact: `https://your-domain.vercel.app/contact.html`

### Admin Panel
- [ ] Login: `https://your-domain.vercel.app/admin/login.html`
- [ ] Try logging in with your credentials
- [ ] Test editing content

### API
- [ ] Profile: `https://your-domain.vercel.app/api/profile`
- [ ] Projects: `https://your-domain.vercel.app/api/projects`

## 🎉 Success!

Your portfolio is now live on Vercel!

### Your URLs
- **Production:** `https://your-domain.vercel.app`
- **Dashboard:** `https://vercel.com/dashboard`
- **GitHub:** https://github.com/Samarthjadhavsj/AI-Portfolio

---

## 🔧 Troubleshooting

### Issue: "Cannot connect to database"
**Solution:**
1. Go to MongoDB Atlas: https://cloud.mongodb.com
2. Network Access → Add IP: `0.0.0.0/0`
3. Verify MONGODB_URI in Vercel

### Issue: "Admin login not working"
**Solution:**
1. Check JWT_SECRET is set
2. Verify ADMIN_EMAIL and ADMIN_PASSWORD
3. Clear browser cache

### Issue: "500 Error"
**Solution:**
1. Check Vercel logs: Dashboard → Logs
2. Verify all environment variables are set
3. Check MongoDB connection

---

## 📊 Next Steps

1. **Custom Domain** (Optional)
   - Vercel Dashboard → Settings → Domains
   - Add your custom domain

2. **Monitor Performance**
   - Check Vercel Analytics
   - Monitor MongoDB Atlas metrics

3. **Update Content**
   - Login to admin panel
   - Add your projects
   - Update bio and skills

---

## 🎯 Total Time: ~15 minutes

**Status:** Ready to deploy! 🚀

**Need help?** Check POST-DEPLOYMENT-TROUBLESHOOTING.md
