# ⚡ Quick Fix Guide - Common Issues After Hosting

## 🔥 Most Common Issues (90% of problems)

---

### 1. ❌ "500 Internal Server Error"

**Cause:** Environment variables not set in Vercel

**Fix (2 minutes):**
```
1. Go to Vercel Dashboard
2. Your Project → Settings → Environment Variables
3. Add these:
   - MONGODB_URI = your-mongodb-connection-string
   - JWT_SECRET = your-generated-secret
   - NODE_ENV = production
   - ADMIN_EMAIL = samarthjadhavsj121@gmail.com
   - ADMIN_PASSWORD = Sam@2003
4. Click "Redeploy" button
```

---

### 2. ❌ "Cannot connect to database"

**Cause:** MongoDB IP not whitelisted

**Fix (1 minute):**
```
1. Go to MongoDB Atlas: https://cloud.mongodb.com/
2. Network Access → Add IP Address
3. Select "Allow Access from Anywhere" (0.0.0.0/0)
4. Save
5. Redeploy on Vercel
```

---

### 3. ❌ Admin login not working

**Cause:** Admin account not created or JWT_SECRET missing

**Fix (2 minutes):**
```
Option A - Add JWT_SECRET:
1. Run locally: npm run generate-secret
2. Copy the generated secret
3. Vercel → Settings → Environment Variables
4. Add JWT_SECRET with the secret
5. Redeploy

Option B - Recreate admin:
1. SSH to server or use Vercel CLI
2. Run: node scripts/create-admin.js
```

---

### 4. ❌ Blank page / Nothing loads

**Cause:** JavaScript error or API not responding

**Fix (1 minute):**
```
1. Press F12 (open browser console)
2. Look for red errors
3. If "Failed to fetch":
   - Check API_BASE_URL in api-helper.js
   - Should be: window.location.origin + '/api'
4. Hard refresh: Ctrl + F5
```

---

### 5. ❌ Content not loading (projects, skills, etc.)

**Cause:** No data in database

**Fix (3 minutes):**
```
1. Connect to your MongoDB
2. Run these scripts:
   - node scripts/seed.js
   - node scripts/add-all-projects.js
3. Refresh website
```

---

### 6. ❌ CSS not loading / Styling broken

**Cause:** Browser cache

**Fix (10 seconds):**
```
1. Hard refresh: Ctrl + Shift + F5
2. Or clear browser cache: Ctrl + Shift + Delete
3. Refresh page
```

---

### 7. ❌ Images not loading

**Cause:** Image URLs not set or not public

**Fix (5 minutes):**
```
1. Login to admin panel
2. Go to About page
3. Add Profile Image URL and Resume URL
4. Save changes
5. Refresh website

See: URL-SETUP-GUIDE.md for details
```

---

### 8. ❌ "CORS policy blocked"

**Cause:** CORS not configured for production domain

**Fix (2 minutes):**
```javascript
// In server.js, update CORS:
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? 'https://your-domain.vercel.app'
    : 'http://localhost:3000',
  credentials: true
}));

// Then redeploy
```

---

## 🛠️ Universal Fixes (Try These First)

### Fix 1: Hard Refresh
```
Ctrl + F5 (Windows)
Cmd + Shift + R (Mac)
```

### Fix 2: Clear Cache
```
Ctrl + Shift + Delete
Select "Cached images and files"
Clear
```

### Fix 3: Check Browser Console
```
Press F12
Go to Console tab
Look for red errors
Copy error message and Google it
```

### Fix 4: Redeploy
```
Vercel Dashboard → Your Project
Click "Redeploy" button
Wait for deployment to complete
```

### Fix 5: Check Logs
```
Vercel Dashboard → Your Project → Logs
Filter by "Errors"
Look for error messages
```

---

## 📞 When to Ask for Help

Ask for help if:
- ❌ Tried all fixes above
- ❌ Error persists after redeploy
- ❌ Can't find error in logs
- ❌ Issue started after specific change

**What to provide:**
1. Exact error message
2. Screenshot of error
3. Vercel logs (if available)
4. What you already tried

---

## ✅ Prevention Checklist

Before deploying:
- [ ] Run `npm run test-all` locally
- [ ] All tests pass
- [ ] Environment variables ready
- [ ] MongoDB IP whitelisted
- [ ] JWT secret generated

After deploying:
- [ ] Test homepage loads
- [ ] Test admin login
- [ ] Test adding content
- [ ] Test on mobile
- [ ] Check all pages work

---

## 🎯 Quick Commands

```bash
# Test everything locally
npm run test-all

# Generate JWT secret
npm run generate-secret

# Check deployment readiness
npm run check-deployment

# Test URLs
npm run test-urls

# Deploy to Vercel
vercel --prod

# View Vercel logs
vercel logs
```

---

## 📚 Full Guides

For detailed troubleshooting:
- **POST-DEPLOYMENT-TROUBLESHOOTING.md** - Complete debugging guide
- **URL-SETUP-GUIDE.md** - How to add images and resume
- **DEPLOYMENT-GUIDE.md** - Step-by-step deployment
- **MANUAL-TESTING-GUIDE.md** - How to test everything

---

## 💡 Pro Tips

1. **Always test locally first**
   ```bash
   npm start
   # If works locally, issue is with deployment
   ```

2. **Check environment variables**
   ```
   90% of 500 errors are missing env vars
   ```

3. **Hard refresh after changes**
   ```
   Browser caches aggressively
   Always Ctrl + F5 after updates
   ```

4. **Monitor logs after deployment**
   ```
   Check Vercel logs for first 24 hours
   Catch issues early
   ```

5. **Keep local backup**
   ```
   Always have working local version
   Can rollback if needed
   ```

---

## 🚀 You Got This!

Most issues are simple fixes:
- ✅ 50% = Environment variables
- ✅ 20% = Browser cache
- ✅ 15% = MongoDB IP whitelist
- ✅ 10% = Missing data
- ✅ 5% = Other

**Follow this guide and you'll fix 95% of issues in under 5 minutes!** 💪

---

**Bookmark this page!** 📌 You'll need it after deployment.
