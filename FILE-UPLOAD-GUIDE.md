# ✅ File Upload Feature Added!

## What's New

You can now upload files directly from your computer instead of pasting URLs!

### Supported Files:
- **Profile Image**: JPEG, PNG, GIF, WebP (Max 5MB)
- **Resume**: PDF only (Max 5MB)

## Where to Upload

### 1. Admin Home Page (admin/home.html)
- Upload profile image for homepage

### 2. Admin About Page (admin/about.html)
- Upload profile image
- Upload resume PDF

## How to Use

### Upload Profile Image

1. Go to admin/home.html or admin/about.html
2. Find the "Profile Image" section
3. Click "Choose File" button
4. Select an image from your computer
5. Click "Upload" button
6. Wait for success message
7. Image URL will be automatically filled
8. Click "Save Changes" to apply

### Upload Resume

1. Go to admin/about.html
2. Find the "Resume" section
3. Click "Choose File" button
4. Select a PDF file from your computer
5. Click "Upload" button
6. Wait for success message
7. Resume URL will be automatically filled
8. Click "Save Changes" to apply

## Features

✅ **Direct File Upload** - No need to host files elsewhere  
✅ **Automatic URL Generation** - URLs are created automatically  
✅ **File Validation** - Only allowed file types accepted  
✅ **Size Limit** - Max 5MB per file  
✅ **Preview** - See uploaded image immediately  
✅ **Fallback** - Can still paste URLs if preferred

## Technical Details

### File Storage
- Files are stored in `/uploads` folder
- Unique filenames prevent conflicts
- Format: `originalname-timestamp-random.ext`

### File Access
- Files are served at: `http://localhost:3000/uploads/filename`
- Publicly accessible (no authentication needed)
- Works on deployed sites too

### Supported Formats

**Images:**
- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)

**Documents:**
- PDF (.pdf)

## UI Layout

```
┌─────────────────────────────────────┐
│ Profile Image                       │
├─────────────────────────────────────┤
│ [Choose File] [Upload]              │
│ Upload image (JPEG, PNG... Max 5MB) │
│                                     │
│ Or paste image URL:                 │
│ [_____________________________]     │
│                                     │
│ ✅ Preview appears here             │
└─────────────────────────────────────┘
```

## Example Workflow

### Uploading Profile Image:

1. **Before Upload:**
   ```
   Profile Image URL: [empty]
   ```

2. **Select File:**
   ```
   File: profile-photo.jpg (2.3 MB)
   ```

3. **After Upload:**
   ```
   Profile Image URL: http://localhost:3000/uploads/profile-photo-1735849200-123456789.jpg
   Preview: [Image shown]
   ✅ Uploaded: profile-photo.jpg
   ```

4. **Save:**
   Click "Save Changes" button

## Benefits

✅ **Easier** - No need to upload to external services  
✅ **Faster** - Direct upload from computer  
✅ **Reliable** - Files stored with your project  
✅ **Flexible** - Can still use URLs if preferred  
✅ **Professional** - Proper file management system

## Troubleshooting

### Upload Failed
- Check file size (must be under 5MB)
- Check file type (only images and PDFs)
- Check internet connection
- Try refreshing the page

### File Not Showing
- Hard refresh browser (Ctrl+Shift+R)
- Check if URL was saved (click Save Changes)
- Verify file exists in uploads folder

### Large Files
If your file is over 5MB:
1. Compress images using tools like TinyPNG
2. Compress PDFs using online tools
3. Or use external hosting (Imgur, Google Drive)

## Deployment Note

When deploying to Vercel/Netlify:
- Uploaded files are temporary (serverless)
- Use cloud storage for production:
  - Cloudinary (images)
  - AWS S3 (all files)
  - Google Cloud Storage
- Or keep using URL method for production

## Security

✅ File type validation  
✅ File size limits  
✅ Unique filenames (no overwrites)  
✅ Safe file storage  
✅ No executable files allowed

---

**Action Required:** 
1. Hard refresh browser (Ctrl+Shift+R)
2. Go to admin/home.html or admin/about.html
3. Try uploading a file!
