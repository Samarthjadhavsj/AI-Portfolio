# Cloudinary Troubleshooting Guide

## Current Status
✅ **Code Implementation**: Complete (30MB file size support)
✅ **README Documentation**: Pushed to GitHub
⚠️ **Cloudinary Connection**: Needs verification

## Error: "Invalid cloud_name dyniwnat"

### Possible Causes:
1. **Cloudinary account not activated** - Check email for verification link
2. **Wrong cloud name** - Verify exact spelling in Cloudinary dashboard
3. **Environment variables not loaded** - Render deployment may still be in progress
4. **API credentials expired** - Regenerate in Cloudinary dashboard

## Step-by-Step Fix

### 1. Verify Cloudinary Account
1. Go to https://cloudinary.com
2. Login with your credentials
3. Check if account is **verified** (check email for verification link)
4. Go to Dashboard → Settings → Account

### 2. Get Correct Credentials
In your Cloudinary Dashboard, you'll see:
```
Cloud name: [your-cloud-name]
API Key: [your-api-key]
API Secret: [click eye icon to reveal]
```

**Important**: Copy these EXACTLY as shown (case-sensitive)

### 3. Update Render Environment Variables
1. Go to https://dashboard.render.com
2. Select your `ai-portfolio` service
3. Click "Environment" tab
4. Update these variables:
   ```
   CLOUDINARY_CLOUD_NAME=your-actual-cloud-name
   CLOUDINARY_API_KEY=your-actual-api-key
   CLOUDINARY_API_SECRET=your-actual-api-secret
   ```
5. Click "Save Changes"
6. **Wait 2-3 minutes** for deployment to complete

### 4. Test Upload
1. Go to https://ai-portfolio-fn8q.onrender.com/admin/login.html
2. Login with admin credentials
3. Go to Home/Profile section
4. Try uploading a profile image
5. Check browser console (F12) for any errors

### 5. Check Render Logs
1. In Render dashboard, click "Logs" tab
2. Look for Cloudinary connection messages
3. Check for any error messages about Cloudinary

## Current Configuration

### File Size Limits
- ✅ **Cloudinary**: 30MB (configured in `config/cloudinary.js`)
- ✅ **Multer**: 30MB (configured in `routes/upload.js`)
- ✅ **Express**: Default (100MB)

### Supported File Types
- Images: jpg, jpeg, png, gif, webp, svg
- Documents: pdf

### Files Modified for Cloudinary
- ✅ `config/cloudinary.js` - Cloudinary configuration
- ✅ `routes/upload.js` - Upload endpoint using Cloudinary
- ✅ `models/Profile.js` - Store Cloudinary URLs
- ✅ `models/Project.js` - Store Cloudinary URLs
- ✅ `admin/home.html` - Hidden fields for Cloudinary data
- ✅ `profile-loader.js` - Display images from Cloudinary

## Testing Checklist

- [ ] Cloudinary account verified (check email)
- [ ] Correct credentials copied from Cloudinary dashboard
- [ ] Environment variables updated in Render
- [ ] Render deployment completed (check logs)
- [ ] Test image upload in admin panel
- [ ] Verify image displays on homepage
- [ ] Test with 30MB file

## Alternative: Create New Cloudinary Account

If issues persist, create a fresh Cloudinary account:

1. Go to https://cloudinary.com/users/register_free
2. Sign up with a different email
3. Verify email immediately
4. Copy new credentials from dashboard
5. Update Render environment variables
6. Test upload

## Need Help?

### Check Render Logs
```bash
# In Render dashboard → Logs tab, look for:
"Cloudinary configured successfully"
"Upload error: [error message]"
```

### Check Browser Console
```javascript
// In admin panel, open browser console (F12)
// Look for upload errors when testing
```

### Verify Environment Variables Loaded
Add this temporarily to `server.js` to debug:
```javascript
console.log('Cloudinary Config:', {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY ? 'SET' : 'NOT SET',
    api_secret: process.env.CLOUDINARY_API_SECRET ? 'SET' : 'NOT SET'
});
```

## Success Indicators

✅ Upload succeeds without errors
✅ Image URL starts with `https://res.cloudinary.com/`
✅ Image displays on homepage after refresh
✅ Image persists after Render server restart
✅ Can upload files up to 30MB

## Current Deployment

- **Live Site**: https://ai-portfolio-fn8q.onrender.com
- **Admin Panel**: https://ai-portfolio-fn8q.onrender.com/admin/login.html
- **GitHub**: https://github.com/Samarthjadhavsj/AI-Portfolio
- **Hosting**: Render (auto-deploy from main branch)

---

**Last Updated**: January 3, 2026
