# 🔧 Post-Deployment Troubleshooting Guide

## How to Debug and Fix Issues After Hosting

---

## 🎯 Quick Diagnosis

### Step 1: Identify the Issue Type

| Symptom | Issue Type | Jump To |
|---------|------------|---------|
| Website not loading at all | Deployment Issue | [Section 1](#1-deployment-issues) |
| 500 Internal Server Error | Backend Issue | [Section 2](#2-backend-errors) |
| Blank page / Nothing loads | Frontend Issue | [Section 3](#3-frontend-issues) |
| Admin login not working | Auth Issue | [Section 4](#4-authentication-issues) |
| Database errors | MongoDB Issue | [Section 5](#5-database-issues) |
| Content not loading | API Issue | [Section 6](#6-api-issues) |
| Styling broken | CSS Issue | [Section 7](#7-styling-issues) |
| Images not loading | Asset Issue | [Section 8](#8-asset-issues) |

---

## 1. Deployment Issues

### Issue: Website Not Loading / 404 Error

**Symptoms:**
- Domain shows "404 Not Found"
- "This site can't be reached"
- Vercel shows deployment failed

**How to Debug:**

1. **Check Vercel Dashboard:**
   ```
   Go to: https://vercel.com/dashboard
   → Select your project
   → Check deployment status
   ```

2. **Check Build Logs:**
   ```
   Vercel Dashboard → Deployments → Click latest deployment
   → View "Build Logs" tab
   → Look for errors in red
   ```

3. **Common Errors & Solutions:**

   **Error: "Build failed"**
   ```bash
   # Solution: Check package.json
   # Ensure "start" script exists:
   "scripts": {
     "start": "node server.js"
   }
   ```

   **Error: "Module not found"**
   ```bash
   # Solution: Install missing dependencies
   npm install
   # Then redeploy
   vercel --prod
   ```

   **Error: "Port already in use"**
   ```javascript
   // Solution: Use process.env.PORT
   // In server.js:
   const PORT = process.env.PORT || 3000;
   ```

**Quick Fix:**
```bash
# Redeploy from local
vercel --prod

# Or trigger redeploy from Vercel Dashboard
# Settings → Git → Redeploy
```

---

## 2. Backend Errors

### Issue: 500 Internal Server Error

**Symptoms:**
- API calls return 500 error
- Console shows "Internal Server Error"
- Some features work, others don't

**How to Debug:**

1. **Check Vercel Logs:**
   ```
   Vercel Dashboard → Your Project → Logs
   → Filter by "Errors"
   → Look for stack traces
   ```

2. **Check Environment Variables:**
   ```
   Vercel Dashboard → Settings → Environment Variables
   
   Required variables:
   ✓ MONGODB_URI
   ✓ JWT_SECRET
   ✓ NODE_ENV=production
   ✓ ADMIN_EMAIL
   ✓ ADMIN_PASSWORD
   ```

3. **Common Errors & Solutions:**

   **Error: "Cannot connect to MongoDB"**
   ```
   Cause: MONGODB_URI not set or incorrect
   
   Solution:
   1. Go to Vercel → Settings → Environment Variables
   2. Add MONGODB_URI with your connection string
   3. Redeploy
   ```

   **Error: "JWT malformed"**
   ```
   Cause: JWT_SECRET not set
   
   Solution:
   1. Generate secret: npm run generate-secret
   2. Add to Vercel environment variables
   3. Redeploy
   ```

   **Error: "CORS policy blocked"**
   ```javascript
   // Solution: Update CORS in server.js
   app.use(cors({
     origin: ['https://your-domain.vercel.app'],
     credentials: true
   }));
   ```

**Quick Fix:**
```bash
# Test locally first
npm start
# If works locally, issue is with environment variables

# Check Vercel logs
vercel logs <deployment-url>
```

---

## 3. Frontend Issues

### Issue: Blank Page / Nothing Loads

**Symptoms:**
- White screen
- Console shows errors
- HTML loads but no content

**How to Debug:**

1. **Open Browser Console:**
   ```
   Press F12 → Console tab
   Look for errors in red
   ```

2. **Common Errors & Solutions:**

   **Error: "Failed to fetch"**
   ```javascript
   // Cause: API URL is wrong
   
   // Solution: Check api-helper.js
   const API_BASE_URL = window.location.origin + '/api';
   // NOT: const API_BASE_URL = 'http://localhost:3000/api';
   ```

   **Error: "Unexpected token < in JSON"**
   ```javascript
   // Cause: API returning HTML instead of JSON
   
   // Solution: Check API endpoint exists
   // Check server.js routes are registered
   ```

   **Error: "Cannot read property of undefined"**
   ```javascript
   // Cause: Data not loading from API
   
   // Solution: Add null checks
   if (profile && profile.name) {
     // Use profile.name
   }
   ```

**Quick Fix:**
```javascript
// Add error handling to all API calls
try {
  const data = await getProfile();
  if (!data) {
    console.error('No data received');
    return;
  }
  // Use data
} catch (error) {
  console.error('API Error:', error);
}
```

---

## 4. Authentication Issues

### Issue: Admin Login Not Working

**Symptoms:**
- Login button does nothing
- "Invalid credentials" error
- Redirects to login after successful login

**How to Debug:**

1. **Check Browser Console:**
   ```
   F12 → Console
   Look for authentication errors
   ```

2. **Check Network Tab:**
   ```
   F12 → Network tab
   Try to login
   Look for /api/admin/auth/login request
   Check response status and body
   ```

3. **Common Errors & Solutions:**

   **Error: "Invalid credentials"**
   ```
   Cause: Admin account not created or wrong password
   
   Solution:
   1. SSH into server or use Vercel CLI
   2. Run: node scripts/create-admin.js
   3. Or check ADMIN_EMAIL and ADMIN_PASSWORD in env vars
   ```

   **Error: "JWT must be provided"**
   ```javascript
   // Cause: Token not being saved
   
   // Solution: Check localStorage in browser
   // F12 → Application → Local Storage
   // Should see 'adminToken'
   
   // If not saving, check admin/login.html:
   localStorage.setItem('adminToken', data.token);
   ```

   **Error: "Token expired"**
   ```javascript
   // Cause: JWT_SECRET changed or token old
   
   // Solution: Clear localStorage and login again
   localStorage.clear();
   // Then login
   ```

**Quick Fix:**
```bash
# Recreate admin account
node scripts/create-admin.js

# Or update environment variables
# Vercel → Settings → Environment Variables
# Update ADMIN_EMAIL and ADMIN_PASSWORD
```

---

## 5. Database Issues

### Issue: MongoDB Connection Errors

**Symptoms:**
- "Cannot connect to database"
- "MongoServerError"
- Data not loading

**How to Debug:**

1. **Check MongoDB Atlas:**
   ```
   Go to: https://cloud.mongodb.com/
   → Select your cluster
   → Check if cluster is running
   → Check Network Access
   ```

2. **Common Errors & Solutions:**

   **Error: "IP not whitelisted"**
   ```
   Cause: Vercel IP not allowed in MongoDB
   
   Solution:
   1. MongoDB Atlas → Network Access
   2. Click "Add IP Address"
   3. Select "Allow Access from Anywhere" (0.0.0.0/0)
   4. Save
   ```

   **Error: "Authentication failed"**
   ```
   Cause: Wrong credentials in MONGODB_URI
   
   Solution:
   1. Check password is URL encoded
   2. @ becomes %40
   3. # becomes %23
   4. Update MONGODB_URI in Vercel
   ```

   **Error: "Database not found"**
   ```
   Cause: Database name wrong in connection string
   
   Solution:
   Check the database name in your MongoDB connection string
   Format: mongodb+srv://[username]:[password]@[cluster]/[database_name]
   Verify the database_name matches your MongoDB Atlas database
   ```

**Quick Fix:**
```bash
# Test connection locally
npm run test:db

# If works locally, issue is with:
# 1. Environment variables in Vercel
# 2. IP whitelist in MongoDB Atlas
```

---

## 6. API Issues

### Issue: Content Not Loading

**Symptoms:**
- Projects not showing
- Skills not loading
- "Loading..." never finishes

**How to Debug:**

1. **Check Browser Network Tab:**
   ```
   F12 → Network tab
   Refresh page
   Look for API calls (filter by "api")
   Check status codes:
   - 200 = OK
   - 404 = Endpoint not found
   - 500 = Server error
   ```

2. **Common Errors & Solutions:**

   **Error: "404 Not Found" on API calls**
   ```javascript
   // Cause: API routes not registered
   
   // Solution: Check server.js
   app.use('/api/admin', adminRoutes);
   app.use('/api', publicRoutes); // Add if missing
   ```

   **Error: "CORS policy blocked"**
   ```javascript
   // Solution: Update server.js
   const cors = require('cors');
   app.use(cors({
     origin: process.env.NODE_ENV === 'production' 
       ? 'https://your-domain.vercel.app'
       : 'http://localhost:3000'
   }));
   ```

   **Error: "Empty response"**
   ```javascript
   // Cause: No data in database
   
   // Solution: Seed database
   node scripts/seed.js
   node scripts/add-all-projects.js
   ```

**Quick Fix:**
```javascript
// Add detailed error logging
fetch('/api/projects')
  .then(res => {
    console.log('Status:', res.status);
    return res.json();
  })
  .then(data => {
    console.log('Data:', data);
  })
  .catch(err => {
    console.error('Error:', err);
  });
```

---

## 7. Styling Issues

### Issue: CSS Not Loading / Broken Layout

**Symptoms:**
- No colors/styling
- Layout broken
- Fonts not loading

**How to Debug:**

1. **Check Browser Console:**
   ```
   F12 → Console
   Look for "Failed to load resource" errors
   ```

2. **Check Network Tab:**
   ```
   F12 → Network → CSS filter
   Check if styles.css loads (status 200)
   ```

3. **Common Errors & Solutions:**

   **Error: "styles.css 404"**
   ```html
   <!-- Cause: Wrong path -->
   
   <!-- Solution: Use relative paths -->
   <link rel="stylesheet" href="styles.css">
   <!-- NOT: href="/styles.css" or href="./styles.css" -->
   ```

   **Error: "Font not loading"**
   ```css
   /* Solution: Use web-safe fonts or Google Fonts */
   @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
   ```

   **Error: "Responsive not working"**
   ```html
   <!-- Solution: Add viewport meta tag -->
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   ```

**Quick Fix:**
```bash
# Clear browser cache
Ctrl + Shift + Delete
# Or hard refresh
Ctrl + F5
```

---

## 8. Asset Issues

### Issue: Images Not Loading

**Symptoms:**
- Broken image icons
- Profile picture not showing
- Project images missing

**How to Debug:**

1. **Check Image URLs:**
   ```
   Right-click broken image → Inspect
   Check src attribute
   Copy URL and paste in browser
   ```

2. **Common Errors & Solutions:**

   **Error: "403 Forbidden"**
   ```
   Cause: Image URL not public
   
   Solution:
   1. Make image public in hosting service
   2. Or use different hosting (ImgBB, Cloudinary)
   ```

   **Error: "CORS policy blocked"**
   ```
   Cause: Image host blocks cross-origin requests
   
   Solution:
   1. Use different image host
   2. Or download and host locally
   ```

   **Error: "404 Not Found"**
   ```
   Cause: Wrong URL or image deleted
   
   Solution:
   1. Update URL in admin panel
   2. Or re-upload image
   ```

**Quick Fix:**
```javascript
// Add fallback for broken images
<img 
  src="${project.image?.url}" 
  onerror="this.src='https://via.placeholder.com/400x300'"
  alt="${project.title}"
>
```

---

## 🛠️ General Debugging Tools

### 1. Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# View logs
vercel logs <deployment-url>

# View environment variables
vercel env ls

# Pull environment variables locally
vercel env pull
```

### 2. Browser DevTools

```
F12 or Right-click → Inspect

Tabs to check:
- Console: JavaScript errors
- Network: API calls, failed requests
- Application: localStorage, cookies
- Sources: Breakpoints, debugging
```

### 3. MongoDB Compass

```
Download: https://www.mongodb.com/products/compass

Connect with your MONGODB_URI
Browse collections
Check data exists
```

### 4. Postman / Thunder Client

```
Test API endpoints directly
Check request/response
Verify authentication
```

---

## 📋 Debugging Checklist

When something breaks after deployment:

### Step 1: Identify
- [ ] What's broken? (specific feature)
- [ ] Error message? (copy exact text)
- [ ] When did it break? (after deployment/update)

### Step 2: Check Logs
- [ ] Vercel deployment logs
- [ ] Vercel runtime logs
- [ ] Browser console errors
- [ ] Network tab errors

### Step 3: Compare
- [ ] Does it work locally? (`npm start`)
- [ ] Same error locally?
- [ ] Environment variables match?

### Step 4: Fix
- [ ] Apply solution from this guide
- [ ] Test locally first
- [ ] Deploy fix
- [ ] Verify on production

### Step 5: Prevent
- [ ] Add error handling
- [ ] Add logging
- [ ] Update documentation

---

## 🚨 Emergency Fixes

### Quick Rollback

```bash
# Rollback to previous deployment
# Vercel Dashboard → Deployments
# Find working deployment → Click "..." → Promote to Production
```

### Force Redeploy

```bash
# From local
vercel --prod --force

# Or from Vercel Dashboard
# Settings → Git → Redeploy
```

### Clear All Caches

```bash
# Browser cache
Ctrl + Shift + Delete

# Vercel cache
vercel --prod --force

# MongoDB cache
# Restart cluster in MongoDB Atlas
```

---

## 📞 Getting Help

### 1. Check Documentation
- This guide
- Vercel docs: https://vercel.com/docs
- MongoDB docs: https://docs.mongodb.com/

### 2. Check Logs
- Always check logs first
- Copy exact error messages
- Note when error started

### 3. Search for Error
- Google the exact error message
- Check Stack Overflow
- Check GitHub issues

### 4. Ask for Help
- Provide error message
- Share relevant code
- Explain what you tried

---

## 🎯 Prevention Tips

### Before Deployment:

1. **Test Everything Locally**
   ```bash
   npm run test-all
   ```

2. **Check Environment Variables**
   ```bash
   npm run check-deployment
   ```

3. **Test in Production Mode**
   ```bash
   NODE_ENV=production npm start
   ```

### After Deployment:

1. **Monitor Logs**
   - Check Vercel logs daily
   - Set up error alerts

2. **Test All Features**
   - Login to admin
   - Add/edit content
   - Check all pages

3. **Keep Backups**
   - Export MongoDB data regularly
   - Keep local copy of code

---

## ✅ Common Issues Quick Reference

| Issue | Quick Fix |
|-------|-----------|
| 500 Error | Check environment variables |
| 404 Error | Check routes in server.js |
| CORS Error | Update CORS origin |
| Auth Error | Recreate admin account |
| DB Error | Check MongoDB IP whitelist |
| Blank Page | Check browser console |
| CSS Broken | Hard refresh (Ctrl+F5) |
| Images 404 | Update URLs in admin |

---

## 🎉 You're Prepared!

With this guide, you can:
- ✅ Identify any post-deployment issue
- ✅ Debug using proper tools
- ✅ Fix common problems quickly
- ✅ Prevent future issues
- ✅ Get help when needed

**Remember:** Most issues are simple fixes like environment variables or cache. Don't panic, follow the steps, and you'll solve it! 💪

---

**Keep this guide handy after deployment!** 📌
