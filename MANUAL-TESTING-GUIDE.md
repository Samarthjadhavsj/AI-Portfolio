# 🧪 Manual Testing Guide for Admin Panel

## Before You Start

1. Make sure server is running: `npm start`
2. Open browser: `http://localhost:3000`
3. Have admin credentials ready: `samarthjadhavsj121@gmail.com` / `Sam@2003`

---

## TEST 1: Admin Login ✅

**URL:** `http://localhost:3000/admin/login.html`

### Steps:
1. [ ] Open login page
2. [ ] Enter email: `samarthjadhavsj121@gmail.com`
3. [ ] Enter password: `Sam@2003`
4. [ ] Click "Sign In"
5. [ ] Should redirect to dashboard

### Expected Result:
- ✅ Login successful
- ✅ Redirected to dashboard
- ✅ Token stored in localStorage

### If Failed:
- Check browser console for errors
- Verify MongoDB connection
- Check JWT_SECRET in .env

---

## TEST 2: Dashboard Overview ✅

**URL:** `http://localhost:3000/admin/dashboard.html`

### Steps:
1. [ ] Check if stats are loading
2. [ ] Verify project count shows
3. [ ] Check contact count
4. [ ] Verify all navigation links work

### Expected Result:
- ✅ All stats display correctly
- ✅ Sidebar navigation works
- ✅ User email shows in footer

---

## TEST 3: Home Page Editor ✅

**URL:** `http://localhost:3000/admin/home.html`

### Steps:
1. [ ] Page loads with current data
2. [ ] Edit "Hero Line 1" (e.g., change "Aspiring" to "Professional")
3. [ ] Edit "Hero Line 2" (e.g., change "AI Engineer" to "ML Engineer")
4. [ ] Edit subtitle
5. [ ] Click "Save Changes"
6. [ ] Click "View Website" button
7. [ ] Verify changes appear on website
8. [ ] Change back to original values
9. [ ] Save again

### Expected Result:
- ✅ Form loads with current data
- ✅ Can edit all fields
- ✅ Save button works
- ✅ Success message appears
- ✅ Changes reflect on website immediately
- ✅ Can revert changes

---

## TEST 4: About Page Editor ✅

**URL:** `http://localhost:3000/admin/about.html`

### Steps:
1. [ ] Page loads with 6 cards
2. [ ] Edit "Introduction" text
3. [ ] Edit "Technical Skills" text
4. [ ] Edit "Experience" text
5. [ ] Edit "Goals & Vision" text
6. [ ] Edit education details
7. [ ] Edit contact info
8. [ ] Edit social links
9. [ ] Click "Save All Changes"
10. [ ] Click "View Website"
11. [ ] Verify all changes appear

### Expected Result:
- ✅ All 6 sections load correctly
- ✅ Can edit all textareas
- ✅ Can edit all input fields
- ✅ Save works for all fields
- ✅ Changes appear on website
- ✅ Colored text highlights work

---

## TEST 5: Skills Manager ✅

**URL:** `http://localhost:3000/admin/skills.html`

### Steps:

### A. View Skills
1. [ ] Page loads with 4 skill categories
2. [ ] Each category shows its skills
3. [ ] Icons display correctly

### B. Edit Existing Skill
1. [ ] Click "Edit" on "Programming Languages"
2. [ ] Change category name to "Core Programming"
3. [ ] Add a new skill: "Go"
4. [ ] Remove a skill (click X)
5. [ ] Click "Save Changes"
6. [ ] Verify changes on website
7. [ ] Change back to original

### C. Add New Skill Category
1. [ ] Click "Add New Skill Category"
2. [ ] Enter category: "Testing Skills"
3. [ ] Select icon: "tools"
4. [ ] Add skills: "Jest", "Pytest", "Selenium"
5. [ ] Click "Save"
6. [ ] Verify appears on website

### D. Delete Skill Category
1. [ ] Click "Delete" on "Testing Skills"
2. [ ] Confirm deletion
3. [ ] Verify removed from website

### Expected Result:
- ✅ Can view all skills
- ✅ Can edit existing categories
- ✅ Can add/remove individual skills
- ✅ Can create new categories
- ✅ Can delete categories
- ✅ All changes reflect on website

---

## TEST 6: Projects Manager ✅

**URL:** `http://localhost:3000/admin/projects.html`

### Steps:

### A. View Projects
1. [ ] Page loads with 10 projects
2. [ ] Each project shows title, description, tags
3. [ ] GitHub links visible

### B. Edit Existing Project
1. [ ] Click "Edit" on any project
2. [ ] Change title
3. [ ] Change description
4. [ ] Add/remove tags
5. [ ] Change GitHub URL
6. [ ] Click "Save Changes"
7. [ ] Verify changes on website
8. [ ] Check project count still shows "10+ Projects"

### C. Add New Project
1. [ ] Click "Add New Project"
2. [ ] Enter title: "Test Project"
3. [ ] Enter description
4. [ ] Add tags: "Test", "Demo"
5. [ ] Enter GitHub URL
6. [ ] Set status: "Published"
7. [ ] Click "Save"
8. [ ] Verify appears on website
9. [ ] Check count updates to "11+ Projects"

### D. Delete Project
1. [ ] Click "Delete" on "Test Project"
2. [ ] Confirm deletion
3. [ ] Verify removed from website
4. [ ] Check count back to "10+ Projects"

### Expected Result:
- ✅ Can view all projects
- ✅ Can edit projects
- ✅ Can add new projects
- ✅ Can delete projects
- ✅ Project count updates automatically
- ✅ GitHub links work
- ✅ Tags display correctly

---

## TEST 7: Coding Profiles Manager ✅

**URL:** `http://localhost:3000/admin/coding-profiles.html`

### Steps:

### A. View Profiles
1. [ ] Page loads with existing profiles
2. [ ] Each profile shows platform, username, stats

### B. Edit Existing Profile
1. [ ] Click "Edit" on LeetCode profile
2. [ ] Change username
3. [ ] Update stats (problems solved, rating)
4. [ ] Change profile URL
5. [ ] Click "Save Changes"
6. [ ] Verify changes on website

### C. Add New Profile
1. [ ] Click "Add New Profile"
2. [ ] Select platform: "Codeforces"
3. [ ] Enter username
4. [ ] Enter stats
5. [ ] Enter profile URL
6. [ ] Click "Save"
7. [ ] Verify appears on website

### D. Delete Profile
1. [ ] Click "Delete" on test profile
2. [ ] Confirm deletion
3. [ ] Verify removed from website

### Expected Result:
- ✅ Can view all profiles
- ✅ Can edit profiles
- ✅ Can add new profiles
- ✅ Can delete profiles
- ✅ Stats display correctly
- ✅ Links work

---

## TEST 8: Experience Manager ✅

**URL:** `http://localhost:3000/admin/experience.html`

### Steps:

### A. View All Tabs
1. [ ] Click "Education" tab - shows education entries
2. [ ] Click "Internships" tab - shows internship entries
3. [ ] Click "Achievements" tab - shows achievements
4. [ ] Click "Certifications" tab - shows certifications

### B. Add Education
1. [ ] Go to "Education" tab
2. [ ] Click "Add Education"
3. [ ] Enter degree: "Test Degree"
4. [ ] Enter university: "Test University"
5. [ ] Enter period: "2020-2024"
6. [ ] Enter description
7. [ ] Click "Save"
8. [ ] Verify appears on website

### C. Add Internship
1. [ ] Go to "Internships" tab
2. [ ] Click "Add Internship"
3. [ ] Enter title: "Test Intern"
4. [ ] Enter company: "Test Company"
5. [ ] Enter period: "Jan 2024 - Present"
6. [ ] Enter description
7. [ ] Click "Save"
8. [ ] Verify appears on website under "Internships & Professional Experience"

### D. Add Achievement
1. [ ] Go to "Achievements" tab
2. [ ] Click "Add Achievement"
3. [ ] Enter title: "Test Achievement"
4. [ ] Enter organization
5. [ ] Enter period
6. [ ] Enter description
7. [ ] Enter link (optional)
8. [ ] Click "Save"
9. [ ] Verify appears on website

### E. Add Certification
1. [ ] Go to "Certifications" tab
2. [ ] Click "Add Certification"
3. [ ] Enter title: "Test Certification"
4. [ ] Enter provider
5. [ ] Enter period
6. [ ] Enter description
7. [ ] Click "Save"
8. [ ] Verify appears on website

### F. Edit and Delete
1. [ ] Edit any entry - change title
2. [ ] Save and verify
3. [ ] Delete test entries
4. [ ] Verify removed from website

### Expected Result:
- ✅ All 4 tabs work
- ✅ Can add entries to each type
- ✅ Can edit entries
- ✅ Can delete entries
- ✅ Internships show in correct section
- ✅ All changes reflect on website

---

## TEST 9: Contact Messages ✅

**URL:** `http://localhost:3000/admin/contact.html`

### Steps:

### A. Submit Test Message
1. [ ] Open website contact form: `http://localhost:3000/contact.html`
2. [ ] Fill in name, email, message
3. [ ] Submit form
4. [ ] Check for success message

### B. View in Admin
1. [ ] Go to admin contact page
2. [ ] Verify test message appears
3. [ ] Check message details
4. [ ] Click on message to view full details

### C. Manage Messages
1. [ ] Mark message as "Read"
2. [ ] Add admin notes
3. [ ] Mark as "Responded"
4. [ ] Delete test message

### Expected Result:
- ✅ Contact form submits successfully
- ✅ Messages appear in admin panel
- ✅ Can view message details
- ✅ Can update status
- ✅ Can add notes
- ✅ Can delete messages

---

## TEST 10: View Website Buttons ✅

### Steps:
1. [ ] From each admin page, click "View Website" button
2. [ ] Verify it opens correct page in new tab

### Pages to Test:
- [ ] Home → index.html
- [ ] About → about.html
- [ ] Skills → skills.html
- [ ] Projects → projects.html
- [ ] Coding Profiles → coding-profiles.html
- [ ] Experience → experience.html
- [ ] Contact → contact.html

### Expected Result:
- ✅ All buttons work
- ✅ Opens in new tab
- ✅ Correct page loads

---

## TEST 11: Logout ✅

### Steps:
1. [ ] Click "Sign Out" button in sidebar
2. [ ] Should redirect to login page
3. [ ] Try accessing admin pages directly
4. [ ] Should redirect to login

### Expected Result:
- ✅ Logout works
- ✅ Token removed
- ✅ Cannot access admin without login

---

## TEST 12: Browser Compatibility ✅

### Test in Multiple Browsers:
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (if on Mac)

### Expected Result:
- ✅ Works in all browsers
- ✅ Styling consistent
- ✅ All features work

---

## TEST 13: Mobile Responsiveness ✅

### Steps:
1. [ ] Open browser DevTools (F12)
2. [ ] Toggle device toolbar
3. [ ] Test on different screen sizes:
   - [ ] iPhone SE (375px)
   - [ ] iPhone 12 Pro (390px)
   - [ ] iPad (768px)
   - [ ] Desktop (1920px)

### Expected Result:
- ✅ Responsive on all sizes
- ✅ Sidebar adapts
- ✅ Forms usable on mobile
- ✅ Buttons accessible

---

## 📊 TESTING CHECKLIST SUMMARY

### Critical Features (Must Work):
- [ ] Login/Logout
- [ ] Home page editing
- [ ] About page editing
- [ ] Projects CRUD
- [ ] Skills CRUD
- [ ] Experience CRUD
- [ ] All changes reflect on website

### Important Features (Should Work):
- [ ] Coding profiles CRUD
- [ ] Contact messages viewing
- [ ] View Website buttons
- [ ] Dashboard stats

### Nice to Have:
- [ ] Mobile responsive
- [ ] Browser compatibility
- [ ] Fast loading

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot read property of undefined"
**Solution:** Clear browser cache (Ctrl+Shift+Delete) or use Incognito

### Issue: Changes not appearing on website
**Solution:** Hard refresh (Ctrl+F5) or clear cache

### Issue: Login not working
**Solution:** Check MongoDB connection, verify admin account exists

### Issue: Form not saving
**Solution:** Check browser console, verify API endpoint, check network tab

---

## ✅ FINAL CHECKLIST

Before marking as complete:
- [ ] All CRUD operations tested
- [ ] All changes reflect on website
- [ ] No console errors
- [ ] All buttons work
- [ ] Mobile responsive
- [ ] Ready for deployment

---

**Testing Time Estimate:** 30-45 minutes for complete testing

**Priority:** Test Critical Features first, then Important, then Nice to Have
