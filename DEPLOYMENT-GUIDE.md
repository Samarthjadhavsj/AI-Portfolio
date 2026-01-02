# 🚀 Deployment Guide

## Quick Start (5 Minutes)

### Step 1: Fix Critical Security Issues

1. **Generate and Update JWT Secret:**
```bash
npm run generate-secret
```
Copy the generated secret and update `.env`:
```
JWT_SECRET=<paste-your-generated-secret>
```

2. **Configure Email (Optional but Recommended):**
   - Go to: https://myaccount.google.com/apppasswords
   - Generate an App Password
   - Update `.env`:
```
EMAIL_USER=samarthjadhavsj121@gmail.com
EMAIL_PASS=<your-16-character-app-password>
```

### Step 2: Verify Everything Works

```bash
# Check deployment readiness
npm run check-deployment
```

You should see: ✅ ALL CHECKS PASSED!

### Step 3: Deploy to Vercel

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Login
vercel login

# Deploy
vercel
```

### Step 4: Add Environment Variables in Vercel

1. Go to your project in Vercel Dashboard
2. Settings → Environment Variables
3. Add these variables:

```
MONGODB_URI=<your-mongodb-connection-string>
NODE_ENV=production
JWT_SECRET=<your-generated-secret>
ADMIN_EMAIL=<your-email>
ADMIN_PASSWORD=<your-secure-password>
EMAIL_USER=<your-email>
EMAIL_PASS=<your-gmail-app-password>
```

4. Redeploy:
```bash
vercel --prod
```

## ✅ Post-Deployment Checklist

After deployment, test these:

1. **Homepage:** https://your-domain.vercel.app/
2. **About Page:** https://your-domain.vercel.app/about.html
3. **Projects:** https://your-domain.vercel.app/projects.html
4. **Skills:** https://your-domain.vercel.app/skills.html
5. **Experience:** https://your-domain.vercel.app/experience.html
6. **Contact:** https://your-domain.vercel.app/contact.html
7. **Coding Profiles:** https://your-domain.vercel.app/coding-profiles.html
8. **Admin Login:** https://your-domain.vercel.app/admin/login.html

### Test Admin Panel

1. Login with: `samarthjadhavsj121@gmail.com` / `Sam@2003`
2. Try editing content in each section
3. Verify changes appear on the website

### Test Contact Form

1. Fill out the contact form
2. Submit
3. Check if email is received

## 🔧 Troubleshooting

### Issue: "Cannot connect to database"
- Check MongoDB Atlas IP whitelist
- Verify MONGODB_URI is correct in Vercel environment variables

### Issue: "Admin login not working"
- Check JWT_SECRET is set in Vercel
- Clear browser cache and try again

### Issue: "Contact form not sending emails"
- Verify EMAIL_USER and EMAIL_PASS are set
- Check Gmail App Password is correct
- Ensure 2FA is enabled on Gmail

### Issue: "Projects not loading"
- Check browser console for errors
- Verify MongoDB has project data: `npm run check-deployment`

## 📊 Monitoring

After deployment:

1. **Check Vercel Logs:**
   - Go to Vercel Dashboard → Your Project → Logs
   - Monitor for any errors

2. **Monitor MongoDB:**
   - Go to MongoDB Atlas Dashboard
   - Check connection metrics

3. **Test Performance:**
   - Use Google PageSpeed Insights
   - Test on mobile devices

## 🎯 Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for SSL certificate (automatic)

## 🔒 Security Recommendations

1. **Change Admin Password** after first login
2. **Enable MongoDB IP Whitelist** (Settings → Network Access)
3. **Monitor access logs** regularly
4. **Keep dependencies updated:** `npm audit fix`

## 📈 Next Steps

1. Add Google Analytics
2. Set up monitoring (Sentry, LogRocket)
3. Add sitemap.xml for SEO
4. Optimize images
5. Add PWA support

## 🆘 Need Help?

- Check PRE-DEPLOYMENT-CHECKLIST.md for detailed information
- Review Vercel documentation: https://vercel.com/docs
- Check MongoDB Atlas docs: https://docs.atlas.mongodb.com/

---

**Your portfolio is ready to go live! 🎉**
