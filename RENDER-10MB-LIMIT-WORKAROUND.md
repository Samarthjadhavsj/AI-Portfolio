# Render 10MB Upload Limit Workaround

## Problem
Render's free tier has a **10MB request body limit** that cannot be increased. This affects file uploads even though Cloudinary supports 30MB.

## Solutions

### Option 1: Compress Images (Quickest)
Use these free tools to reduce image size:
- [TinyPNG](https://tinypng.com/) - Best for PNG/JPEG
- [Squoosh](https://squoosh.app/) - Advanced compression
- [Compressor.io](https://compressor.io/) - Simple interface

**Target:** Get images under 10MB

### Option 2: Direct Cloudinary Upload (Best)
Upload directly to Cloudinary, bypassing your server entirely.

#### Implementation:
Add Cloudinary Upload Widget to your admin pages.

**In `admin/about.html`, replace the upload button section with:**

```html
<!-- Add Cloudinary Widget Script in <head> -->
<script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript"></script>

<!-- Replace upload button with: -->
<button type="button" onclick="openCloudinaryWidget()" class="btn-primary">
    📤 Upload via Cloudinary
</button>

<script>
function openCloudinaryWidget() {
    cloudinary.openUploadWidget({
        cloudName: 'dyn1wtndt', // Your cloud name
        uploadPreset: 'ml_default', // Create this in Cloudinary dashboard
        sources: ['local', 'url', 'camera'],
        multiple: false,
        maxFileSize: 30000000, // 30MB
        clientAllowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
        maxImageWidth: 2000,
        maxImageHeight: 2000
    }, (error, result) => {
        if (!error && result && result.event === "success") {
            const imageUrl = result.info.secure_url;
            document.getElementById('profileImageUrl').value = imageUrl;
            document.getElementById('profileImagePreview').innerHTML = `
                <div style="padding: 12px; background: #f5f5f7; border-radius: 8px;">
                    <img src="${imageUrl}" alt="Profile" style="max-width: 200px; border-radius: 8px;">
                    <p style="margin: 8px 0 0 0; font-size: 13px; color: #1d1d1f;">✅ Uploaded successfully!</p>
                </div>
            `;
            alert('Image uploaded! Now click "Save All Changes" to apply it.');
        }
    });
}
</script>
```

#### Setup Upload Preset in Cloudinary:
1. Go to: https://cloudinary.com/console/settings/upload
2. Scroll to "Upload presets"
3. Click "Add upload preset"
4. Name: `ml_default`
5. Signing Mode: **Unsigned**
6. Folder: `portfolio`
7. Save

### Option 3: Upgrade Render Plan
Render's paid plans ($7/month) support larger request bodies.

## Recommended Approach
Use **Option 2** (Direct Cloudinary Upload) because:
- ✅ No server limits (30MB supported)
- ✅ Faster uploads (direct to CDN)
- ✅ No server bandwidth used
- ✅ Better user experience
- ✅ Works on free tier

## Quick Fix for Now
Compress your 12.3MB image to under 10MB and upload it.
