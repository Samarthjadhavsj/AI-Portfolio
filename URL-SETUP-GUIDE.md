# 🔗 URL Setup Guide

## Current Status

✅ **Working:**
- GitHub URL: https://github.com/Samarthjadhavsj

⚠️ **Need to Add:**
- Profile Image URL
- Resume URL

ℹ️ **Note about Social Links:**
- LinkedIn, LeetCode, HackerRank show HTTP 403/999 errors in automated tests
- This is **NORMAL** - these sites block bots
- URLs are correct and **WILL WORK** in browsers
- No action needed for social links

---

## 🖼️ Step 1: Add Profile Image

### Option A: Use GitHub Profile Picture (Easiest)

1. Go to your GitHub profile: https://github.com/Samarthjadhavsj
2. Right-click on your profile picture
3. Select "Copy Image Address"
4. You'll get a URL like: `https://avatars.githubusercontent.com/u/XXXXXXX`

### Option B: Upload to ImgBB (Free, No Account Needed)

1. Go to: https://imgbb.com/
2. Click "Start uploading"
3. Upload your profile picture
4. Click "Upload"
5. Copy the "Direct link" URL
6. Example: `https://i.ibb.co/XXXXXXX/profile.jpg`

### Option C: Upload to Cloudinary (Free Account)

1. Sign up at: https://cloudinary.com/
2. Upload your image
3. Copy the public URL
4. Example: `https://res.cloudinary.com/XXXXX/image/upload/profile.jpg`

### Option D: Use Google Drive

1. Upload image to Google Drive
2. Right-click → Share → Change to "Anyone with the link"
3. Get shareable link
4. Convert to direct link format:
   - Original: `https://drive.google.com/file/d/FILE_ID/view`
   - Direct: `https://drive.google.com/uc?export=view&id=FILE_ID`

---

## 📄 Step 2: Add Resume URL

### Option A: Google Drive (Recommended)

1. Upload your resume PDF to Google Drive
2. Right-click on the file → Share
3. Change to "Anyone with the link can view"
4. Click "Copy link"
5. Convert to direct download link:
   - Original: `https://drive.google.com/file/d/FILE_ID/view?usp=sharing`
   - Direct: `https://drive.google.com/uc?export=download&id=FILE_ID`

**Example:**
```
Original: https://drive.google.com/file/d/1ABC123XYZ/view?usp=sharing
Direct:   https://drive.google.com/uc?export=download&id=1ABC123XYZ
```

### Option B: Dropbox

1. Upload resume to Dropbox
2. Right-click → Share → Create link
3. Copy the link
4. Change `?dl=0` to `?dl=1` at the end
   - Original: `https://www.dropbox.com/s/XXXXX/resume.pdf?dl=0`
   - Direct: `https://www.dropbox.com/s/XXXXX/resume.pdf?dl=1`

### Option C: GitHub Repository

1. Create a new repository (can be private)
2. Upload your resume PDF
3. Go to the file on GitHub
4. Click "Raw" button
5. Copy the URL
6. Example: `https://raw.githubusercontent.com/username/repo/main/resume.pdf`

### Option D: OneDrive

1. Upload to OneDrive
2. Right-click → Share → Anyone with the link
3. Click "Copy link"
4. Use the embed link format:
   - Original: `https://1drv.ms/b/s!XXXXX`
   - Embed: `https://onedrive.live.com/embed?cid=XXXXX&resid=XXXXX&authkey=XXXXX`

---

## 🔧 Step 3: Update URLs in Admin Panel

### Instructions:

1. **Start Server** (if not running):
   ```bash
   npm start
   ```

2. **Login to Admin:**
   - Open: http://localhost:3000/admin/login.html
   - Email: `samarthjadhavsj121@gmail.com`
   - Password: `Sam@2003`

3. **Go to About Page:**
   - Click "About" in sidebar
   - Or open: http://localhost:3000/admin/about.html

4. **Scroll to "Contact & Social Links" Section**

5. **Update URLs:**
   - **Profile Image URL:** Paste your image URL
   - **Resume URL:** Paste your resume URL
   - Social links are already set (no changes needed)

6. **Save Changes:**
   - Click "Save All Changes" button
   - Wait for success message

7. **Verify on Website:**
   - Open: http://localhost:3000/index.html
   - Check if profile image loads
   - Click "Download Resume" button
   - Verify resume downloads/opens

---

## 🧪 Step 4: Test URLs

### Manual Testing:

1. **Test Profile Image:**
   ```
   Open: http://localhost:3000/index.html
   Check: Hero section shows your profile picture
   ```

2. **Test Resume:**
   ```
   Open: http://localhost:3000/index.html
   Click: "Download Resume" button
   Verify: Resume opens or downloads
   ```

3. **Test Social Links:**
   ```
   Open: http://localhost:3000/index.html
   Click: Each social icon
   Verify: Opens correct profile in new tab
   ```

### Automated Testing:

```bash
npm run test-urls
```

---

## 📋 Quick Reference

### Current URLs in Database:

| Item | Status | URL |
|------|--------|-----|
| Profile Image | ⚠️ Not Set | Add in admin panel |
| Resume | ⚠️ Not Set | Add in admin panel |
| LinkedIn | ✅ Set | https://www.linkedin.com/in/samarth-a-jadhav-5a401625b/ |
| GitHub | ✅ Set | https://github.com/Samarthjadhavsj |
| LeetCode | ✅ Set | https://leetcode.com/u/HeY_SaMM/ |
| HackerRank | ✅ Set | https://www.hackerrank.com/profile/samarthjadhavsj1 |

### Where URLs Are Used:

**Profile Image:**
- index.html (Hero section)
- about.html (Profile section)

**Resume:**
- index.html (Download button)
- about.html (Resume link)

**Social Links:**
- index.html (Social icons)
- about.html (Contact section)
- Footer (All pages)

---

## ⚠️ Important Notes

### About HTTP 403/999 Errors:

LinkedIn, LeetCode, and HackerRank return HTTP 403/999 when accessed by automated scripts. This is **NORMAL** and **NOT AN ERROR**.

**Why this happens:**
- These sites block automated requests (bots)
- They use anti-scraping protection
- They check User-Agent headers

**Why it's not a problem:**
- URLs work perfectly in browsers
- Users can click and visit your profiles
- Only automated tests fail

**No action needed!** Your social links are correct.

### Testing Social Links:

**Don't use automated tests** - they will fail.

**Instead, manually test:**
1. Open website in browser
2. Click each social icon
3. Verify it opens correct profile
4. That's it! ✅

---

## 🎯 Recommended Setup

### For Best Results:

1. **Profile Image:**
   - Use GitHub profile picture (easiest)
   - Or upload to ImgBB (no account needed)
   - Size: 400x400px or larger
   - Format: JPG or PNG

2. **Resume:**
   - Use Google Drive (most reliable)
   - File name: `Samarth_Jadhav_Resume.pdf`
   - Keep it updated
   - Test download link before adding

3. **Social Links:**
   - Already configured ✅
   - No changes needed
   - They work in browsers

---

## 🚀 After Setup

Once you've added the URLs:

1. ✅ Profile image will show on homepage
2. ✅ Resume button will download your resume
3. ✅ Social icons will link to your profiles
4. ✅ Everything works on mobile too
5. ✅ Ready for deployment!

---

## 🆘 Troubleshooting

### Profile Image Not Showing:

**Check:**
- Is URL correct? (paste in browser)
- Is image publicly accessible?
- Did you save changes in admin?
- Did you refresh website (Ctrl+F5)?

**Common Issues:**
- Google Drive link not converted to direct link
- Image is private/not shared
- Wrong URL format

### Resume Not Downloading:

**Check:**
- Is URL correct? (paste in browser)
- Is file publicly accessible?
- Did you use direct download link?
- Did you save changes in admin?

**Common Issues:**
- Google Drive link not converted
- File is private
- Using preview link instead of download link

### Social Links Not Working:

**Check:**
- Click the link in browser (not automated test)
- Does it open your profile?
- If yes, it's working! ✅

**Note:** Automated tests will fail for LinkedIn, LeetCode, HackerRank. This is normal.

---

## ✅ Checklist

Before deployment, verify:

- [ ] Profile image URL added
- [ ] Profile image loads on website
- [ ] Resume URL added
- [ ] Resume downloads when clicked
- [ ] LinkedIn link opens profile
- [ ] GitHub link opens profile
- [ ] LeetCode link opens profile
- [ ] HackerRank link opens profile
- [ ] All links open in new tab
- [ ] Everything works on mobile

---

## 📞 Need Help?

If you're stuck:

1. Check if URL works in browser first
2. Verify file/image is publicly accessible
3. Make sure you saved changes in admin
4. Try hard refresh (Ctrl+F5)
5. Check browser console for errors (F12)

---

**Your portfolio is almost complete! Just add these two URLs and you're ready to deploy! 🚀**
