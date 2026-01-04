# Resume View/Download Fix - Complete Solution

## Problem
Cloudinary's `raw` resource type always serves PDFs with `Content-Disposition: attachment` header, forcing downloads even when you want to view the PDF in the browser.

## Solution
Created a **server-side proxy** that fetches the PDF from Cloudinary and serves it with the correct headers.

## How It Works

### 1. Server Routes (`routes/resume.js`)
Two new routes handle resume serving:

- **`/api/resume/view`** - Serves PDF with `Content-Disposition: inline` (opens in browser)
- **`/api/resume/download`** - Serves PDF with `Content-Disposition: attachment` (downloads file)

Both routes:
1. Fetch the PDF from Cloudinary URL stored in database
2. Set appropriate headers
3. Stream the PDF to the client

### 2. Frontend (`profile-loader.js`)
Updated to use the proxy routes instead of direct Cloudinary URLs:

```javascript
// View button
resumeViewBtn.href = '/api/resume/view';  // Opens in browser

// Download button  
resumeDownloadBtn.href = '/api/resume/download';  // Downloads file
```

### 3. Cloudinary Config (`config/cloudinary.js`)
Changed PDF upload to use `resource_type: 'image'` instead of `'raw'` to allow better control.

## Files Changed
1. `routes/resume.js` - NEW: Server proxy routes
2. `server.js` - Added resume routes
3. `profile-loader.js` - Updated to use proxy routes
4. `config/cloudinary.js` - Changed PDF resource type
5. `package.json` - Added axios dependency

## Testing
After deployment (2-3 minutes):

1. Go to Contact page
2. Click **"View Resume"** - Should open PDF in new browser tab
3. Click **"Download PDF"** - Should download file as "Samarth_Jadhav_Resume.pdf"

## Why This Works
- Server controls the `Content-Disposition` header
- Browser respects the header: `inline` = view, `attachment` = download
- Cloudinary URL is hidden from frontend (bonus security)
- Works consistently across all browsers

## Next Steps
1. Wait for Render to deploy (2-3 minutes)
2. Test both buttons on your live site
3. Both should work perfectly now!
