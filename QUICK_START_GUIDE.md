# Quick Start Guide: Launch Your Website in 2-3 Hours

**You have everything you need. Let's get you live!**

---

## What You Have Right Now

✅ `sree_deeshika_labs.html` - Your beautiful website  
✅ `contact.js` - Working backend for contact form  
✅ `netlify.toml` - Configuration file  
✅ `package.json` - Node.js dependencies  
✅ `DYNAMIC_WEBSITE_SETUP.md` - Complete reference guide

---

## Your Project Structure

```
sree-deeshika-labs/                (your project folder)
├── index.html                     (rename your HTML file to this)
├── css/
│   └── styles.css                 (optional, if separated)
├── js/
│   └── script.js                  (optional, if separated)
├── images/
│   ├── logo.png
│   └── facilities.jpg
├── netlify.toml                   (copy the file we created)
├── package.json                   (copy the file we created)
├── netlify/
│   └── functions/
│       └── contact.js             (copy the file we created)
└── .gitignore                     (create: "node_modules/")
```

---

## ⏱️ Timeline: 3 Hours to Live

| Step | Task | Time | Cost |
|------|------|------|------|
| 1 | Setup project structure | 10 min | FREE |
| 2 | Create GitHub account & push code | 20 min | FREE |
| 3 | Create Netlify account & connect | 10 min | FREE |
| 4 | Setup Gmail for emails | 15 min | FREE |
| 5 | Add environment variables | 10 min | FREE |
| 6 | Test contact form locally | 20 min | FREE |
| 7 | Deploy to live | 5 min | FREE |
| 8 | Register domain | 15 min | ₹1,000 |
| 9 | Connect domain to Netlify | 10 min | FREE |
| 10 | Wait for DNS propagation | 24-48h | - |
| **Total** | | **2 hours + wait** | **₹1,000** |

---

## 🚀 STEP-BY-STEP IMPLEMENTATION

### STEP 1: Prepare Your Project Structure (10 minutes)

#### On your computer:

1. **Create a project folder:**
```bash
mkdir sree-deeshika-labs
cd sree-deeshika-labs
```

2. **Create the folder structure:**
```bash
mkdir -p netlify/functions css js images
```

3. **Place your files:**
```
sree-deeshika-labs/
├── index.html          (rename your HTML file to this)
├── package.json        (copy from files we created)
├── netlify.toml        (copy from files we created)
├── css/
│   └── style.css       (if you separated CSS)
├── js/
│   └── script.js       (if you separated JS)
├── images/
│   └── (your images)
└── netlify/
    └── functions/
        └── contact.js  (copy the file we created)
```

4. **Create .gitignore:**
```bash
echo "node_modules/" > .gitignore
echo ".env" >> .gitignore
echo ".DS_Store" >> .gitignore
```

---

### STEP 2: Setup GitHub (20 minutes)

#### 2A. Create GitHub Account:
1. Go to **github.com**
2. Click "Sign up"
3. Choose username: `sree-deeshika-labs` (or similar)
4. Verify email

#### 2B. Install Git:
- **Windows**: Download from git-scm.com
- **Mac**: `brew install git`
- **Linux**: `sudo apt-get install git`

#### 2C. Push Your Code to GitHub:
```bash
# Navigate to your project folder
cd sree-deeshika-labs

# Initialize Git
git init
git config user.name "Your Name"
git config user.email "your-email@gmail.com"

# Add all files
git add .

# Create first commit
git commit -m "Initial website setup - ready for production"

# Create main branch
git branch -M main

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/sree-deeshika-labs.git

# Push to GitHub
git push -u origin main
```

**✅ Your code is now on GitHub!**

---

### STEP 3: Create Netlify Account (10 minutes)

1. Go to **netlify.com**
2. Click "Sign up"
3. Choose **"Sign up with GitHub"**
4. Authorize Netlify to access GitHub
5. Click **"New site from Git"**
6. Select your repository: `sree-deeshika-labs`
7. Click **"Deploy"** (it starts automatically!)

**Your site is now live at: `https://name-randomnumber.netlify.app`**

---

### STEP 4: Setup Gmail for Emails (15 minutes)

#### 4A. Enable 2-Factor Authentication:
1. Go to **myaccount.google.com/security**
2. Scroll to "How you sign in to Google"
3. Click **"2-Step Verification"**
4. Follow Google's steps

#### 4B. Generate App Password:
1. Go to **myaccount.google.com/apppasswords**
2. Select: Device = "Windows Computer" (or your device)
3. Select: App = "Mail"
4. Click **"Generate"**
5. Google shows you a 16-character password
6. **Copy this password** (don't close the window yet!)

---

### STEP 5: Add Environment Variables to Netlify (10 minutes)

1. In Netlify dashboard, go to your site
2. Click **"Site settings"** (gear icon)
3. Left menu → **"Environment variables"**
4. Click **"Edit variables"**
5. Add these two variables:

**Variable 1:**
```
Key: EMAIL_USER
Value: your-email@gmail.com
```

**Variable 2:**
```
Key: EMAIL_PASSWORD
Value: [paste the 16-char password from Gmail]
```

6. Click **"Save"**

---

### STEP 6: Test Contact Form Locally (20 minutes)

#### 6A. Install Node.js:
- Download from **nodejs.org**
- Install it
- Verify: `node --version` and `npm --version`

#### 6B. Install Dependencies:
```bash
cd sree-deeshika-labs
npm install
```

#### 6C. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

#### 6D. Login to Netlify:
```bash
netlify login
# Opens browser, authorize and come back
```

#### 6E. Run locally:
```bash
netlify dev
```

You'll see:
```
   ⠋ Waiting for framework port to be available on http://localhost:8888
   ✔ Server ready on http://localhost:8888
```

#### 6F. Test the form:
1. Open **http://localhost:8888** in your browser
2. Scroll to contact form
3. Fill out and submit
4. Check your email inbox (and spam folder!)

✅ **If you got the email, everything works!**

---

### STEP 7: Deploy Changes (5 minutes)

If you made any changes locally and want to push to live:

```bash
git add .
git commit -m "Setup complete - ready for launch"
git push origin main
```

Netlify automatically redeploys! Check your live site in 1-2 minutes.

---

### STEP 8: Register Domain (15 minutes)

1. Go to **bigrock.in** (India-based, easiest for you)
   - Or: namecheap.com, godaddy.com

2. Search: `sreedeeshikalabs.com`

3. Add to cart

4. Checkout:
   - Choose 1 year registration
   - Email privacy: Recommended to enable
   - Payment: Credit/Debit card
   - Complete payment (₹500-2000)

5. Confirmation email with login details

**✅ You own sreedeeshikalabs.com now!**

---

### STEP 9: Connect Domain to Netlify (10 minutes)

#### 9A. In Netlify:
1. Site settings → **"Domain management"**
2. Click **"Add domain"**
3. Type: `sreedeeshikalabs.com`
4. Click **"Verify ownership"**

#### 9B. Netlify shows you nameservers:
```
ns1.netlify.com
ns2.netlify.com
ns3.netlify.com
ns4.netlify.com
```

#### 9C. In your domain registrar (BigRock):
1. Login to your account
2. Go to **"Manage Domain"**
3. Find **"Nameservers"** section
4. Click **"Edit"**
5. Replace existing nameservers with Netlify's
6. Save changes

---

### STEP 10: Wait for DNS (24-48 hours)

DNS propagation takes time. Your site will be live when:
- You can visit: `https://sreedeeshikalabs.com`
- HTTPS works (automatic!)
- Forms work at the custom domain

**Check your site going live**: https://dnschecker.org

---

## ✅ VERIFICATION CHECKLIST

After deployment, verify everything works:

- [ ] Website loads at `https://sreedeeshikalabs.com`
- [ ] All pages display correctly
- [ ] Images load properly
- [ ] Contact form appears
- [ ] Fill contact form with test data
- [ ] Submit form
- [ ] Confirmation message appears
- [ ] Check your email for submission
- [ ] Check spam folder if not in inbox
- [ ] Confirmation email sent to user
- [ ] HTTPS (lock icon) shows in browser
- [ ] Mobile view works (resize browser)
- [ ] All navigation links work
- [ ] Footer looks good

---

## 🎯 After Launch: First Week Tasks

### Day 1-2:
- [ ] Monitor contact form submissions
- [ ] Test emails are going through
- [ ] Invite team to view live site

### Day 3-7:
- [ ] Add Google Analytics
- [ ] Submit to Google Search Console
- [ ] Monitor Netlify dashboard for errors
- [ ] Backup your code regularly
- [ ] Update contact info (phone, email, address)

---

## 🆘 Troubleshooting

### "Netlify Functions not working"
```
Error: 404 on /.netlify/functions/contact
```
**Fix:**
1. Check netlify.toml exists in root
2. Check netlify/functions/contact.js exists
3. Redeploy: `git push origin main`

### "Emails not sending"
**Check:**
1. EMAIL_USER and EMAIL_PASSWORD in Netlify environment variables
2. Gmail 2FA enabled and app password generated correctly
3. Check Netlify Functions logs: Site → Logs → Functions
4. Try sending test form again

### "Domain not connecting"
**Check:**
1. Wait 24-48 hours (DNS propagation)
2. Verify nameservers changed in registrar
3. Use dnschecker.org to check status
4. Contact registrar if nameservers not updating

### "Form submits but no email received"
**Check:**
1. Spam/junk folder
2. EMAIL_USER variable matches Gmail address
3. Check Netlify function logs for errors
4. Try a different email recipient first

### "Contact form not appearing"
**Check:**
1. HTML form ID is `contact-form`
2. JavaScript function `handleFormSubmit` exists
3. Check browser console for JS errors (F12)
4. Contact form HTML is in index.html

---

## 📞 Getting Help

1. **Netlify docs**: https://docs.netlify.com
2. **Stack Overflow**: Search your specific error
3. **Netlify Community**: https://community.netlify.com
4. **Your Domain Registrar Support**: Usually has live chat

---

## 💾 Backup Strategy

After launch, keep these safe:

1. **GitHub repository** - Always has latest code
2. **Netlify backups** - Automatic
3. **Local copy** - Keep sree-deeshika-labs folder on your computer
4. **Credentials** - Save securely:
   - GitHub username/password
   - Netlify token
   - Gmail app password
   - Domain registrar password

Use a password manager (Bitwarden, 1Password, etc.)

---

## 🚀 You're Ready!

Everything is in place. Follow the steps above and your website will be live in 2-3 hours!

**Most important: Don't skip Step 6 (local testing). Test locally before deploying live.**

Once live, monitor for:
- Form submissions working
- Emails arriving
- No JavaScript errors
- Performance is good

Good luck! Your website is going to look amazing. 🎉

---

## Next Steps After Launch

- **SEO**: Add meta tags for search engines
- **Analytics**: Connect Google Analytics
- **Monitoring**: Setup uptime monitoring
- **Backup**: Automated database backups
- **Updates**: Plan quarterly content updates
- **Scaling**: Add more features as needed

But first, **get it live and working**. Everything else can wait!

Feel free to reach out once you hit any blockers. You've got this! 💪
