# Dynamic Website Setup for Sree Deeshika Labs
## Full Stack: Node.js + MongoDB + Netlify

**Total Cost: ₹1,000-2,000/year** ✅ Within your budget!

---

## What is a "Dynamic Website"?

| Feature | Static | Dynamic |
|---------|--------|---------|
| Contact form works? | No (needs external service) | Yes ✓ |
| Update content without coding? | No | Yes ✓ |
| Admin panel to manage products? | No | Yes ✓ |
| Database for storing data? | No | Yes ✓ |
| **Your Choice** | ❌ | ✅ |

---

## Tech Stack Breakdown

```
┌─────────────────────────────────────────┐
│         Frontend (HTML/CSS/JS)          │  ← Your current website
│    (Netlify - hosts static files)       │
└─────────────────────────────────────────┘
                    ↓ (API calls)
┌─────────────────────────────────────────┐
│     Backend (Node.js + Express)         │  ← Handles form submissions
│   (Netlify Functions - serverless)      │
└─────────────────────────────────────────┘
                    ↓ (Queries)
┌─────────────────────────────────────────┐
│      Database (MongoDB Atlas)           │  ← Stores contact submissions
│        (Free tier: 512MB storage)       │
└─────────────────────────────────────────┘
```

---

## Phase 1: Setup Project Structure (30 mins)

### Create This Folder Structure:
```
sree-deeshika-labs/
├── index.html                 (your website)
├── css/
│   └── styles.css            (if separated)
├── js/
│   └── script.js             (if separated)
├── images/
│   └── (your images)
├── netlify/
│   └── functions/
│       └── contact.js        (backend - we'll create this)
└── netlify.toml              (config file - we'll create this)
```

### Create netlify.toml:
```toml
[build]
  functions = "netlify/functions"
  publish = "."

[functions]
  external_node_modules = ["nodemailer"]
  node_bundler = "esbuild"
```

---

## Phase 2: Setup Backend (Contact Form Handler)

### Create: `netlify/functions/contact.js`

```javascript
// Netlify Function to handle contact form submissions
const nodemailer = require('nodemailer');

// Configure your email service
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.handler = async (event, context) => {
  // Only accept POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' }),
    };
  }

  try {
    const { name, email, company, service, message } = JSON.parse(event.body);

    // Validate inputs
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Email to you
    const adminEmail = {
      from: process.env.EMAIL_USER,
      to: 'info@sreedeeshikalabs.com',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Service Interest:</strong> ${service || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p>Reply to: ${email}</p>
      `,
    };

    // Confirmation email to user
    const userEmail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting Sree Deeshika Labs',
      html: `
        <h2>We received your inquiry</h2>
        <p>Hi ${name},</p>
        <p>Thank you for reaching out to Sree Deeshika Labs. We have received your message and will get back to you within 24 hours.</p>
        <p>Best regards,<br>Sree Deeshika Labs Team</p>
      `,
    };

    // Send both emails
    await transporter.sendMail(adminEmail);
    await transporter.sendMail(userEmail);

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Form submitted successfully',
        success: true 
      }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      }),
    };
  }
};
```

### Install Nodemailer locally:
```bash
npm install nodemailer
```

---

## Phase 3: Update Your HTML Form

### Modify contact form in index.html:

```html
<form id="contact-form" class="contact-form" onsubmit="handleFormSubmit(event)">
    <div class="form-group">
        <label for="name">Full Name *</label>
        <input type="text" id="name" name="name" required>
        <span class="error" id="name-error"></span>
    </div>
    <div class="form-group">
        <label for="email">Email *</label>
        <input type="email" id="email" name="email" required>
        <span class="error" id="email-error"></span>
    </div>
    <div class="form-group">
        <label for="company">Company</label>
        <input type="text" id="company" name="company">
    </div>
    <div class="form-group">
        <label for="service">Service Interest *</label>
        <select id="service" name="service" required>
            <option value="">-- Select Service --</option>
            <option value="api-testing">API Testing</option>
            <option value="formulation">Formulation Analysis</option>
            <option value="impurity">Impurity Profiling</option>
            <option value="method">Method Development</option>
            <option value="stability">Stability Testing</option>
            <option value="microbial">Microbial Testing</option>
            <option value="trading">Product Trading</option>
            <option value="other">Other</option>
        </select>
        <span class="error" id="service-error"></span>
    </div>
    <div class="form-group">
        <label for="message">Message *</label>
        <textarea id="message" name="message" required></textarea>
        <span class="error" id="message-error"></span>
    </div>
    <button type="submit" class="submit-btn" id="submit-btn">Send Enquiry</button>
    <div id="form-status" class="form-status"></div>
</form>

<style>
.error {
    color: var(--text-danger);
    font-size: 13px;
    display: none;
    margin-top: 4px;
}

.error.show {
    display: block;
}

.form-status {
    margin-top: 1rem;
    padding: 1rem;
    border-radius: 5px;
    text-align: center;
    display: none;
}

.form-status.success {
    background: #e8f5e9;
    color: #2e7d32;
    display: block;
}

.form-status.error {
    background: #ffebee;
    color: #c62828;
    display: block;
}
</style>

<script>
async function handleFormSubmit(event) {
    event.preventDefault();
    
    // Clear previous errors
    document.querySelectorAll('.error').forEach(el => {
        el.classList.remove('show');
        el.textContent = '';
    });
    
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        company: document.getElementById('company').value.trim(),
        service: document.getElementById('service').value.trim(),
        message: document.getElementById('message').value.trim(),
    };

    // Validate
    if (!formData.name) {
        showError('name-error', 'Name is required');
        return;
    }
    if (!formData.email) {
        showError('email-error', 'Email is required');
        return;
    }
    if (!formData.message) {
        showError('message-error', 'Message is required');
        return;
    }
    if (!formData.service) {
        showError('service-error', 'Please select a service');
        return;
    }

    // Show loading state
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
        const response = await fetch('/.netlify/functions/contact', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();

        if (response.ok && result.success) {
            // Success
            const statusDiv = document.getElementById('form-status');
            statusDiv.className = 'form-status success';
            statusDiv.textContent = '✓ Thank you! We received your enquiry. We\'ll contact you within 24 hours.';
            document.getElementById('contact-form').reset();
        } else {
            throw new Error(result.error || 'Form submission failed');
        }
    } catch (error) {
        const statusDiv = document.getElementById('form-status');
        statusDiv.className = 'form-status error';
        statusDiv.textContent = '✗ Error: ' + error.message + '. Please try again or email us directly.';
        console.error('Form error:', error);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Enquiry';
    }
}

function showError(elementId, message) {
    const errorEl = document.getElementById(elementId);
    errorEl.textContent = message;
    errorEl.classList.add('show');
}
</script>
```

---

## Phase 4: Setup Environment Variables

### Netlify Dashboard Setup:

1. **Site Settings → Environment variables**

2. Add these variables:
```
EMAIL_USER = your-email@gmail.com
EMAIL_PASSWORD = your-app-password  (not regular password!)
```

### For Gmail App Password:
1. Go to myaccount.google.com/security
2. Enable 2-factor authentication
3. Generate "App password" for Mail
4. Use that password in Netlify

---

## Phase 5: Database Setup (Optional but Recommended)

### If you want to STORE submissions in database:

#### A. Setup MongoDB Atlas (FREE):

1. Go to **mongodb.com/cloud/atlas**
2. Create free account
3. Create free cluster (512MB storage)
4. Get connection string
5. Add to Netlify environment: `MONGODB_URI`

#### B. Update your contact.js to save to database:

```javascript
const { MongoClient } = require('mongodb');

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: JSON.stringify({ message: 'Not allowed' }) };
    }

    try {
        const { name, email, company, service, message } = JSON.parse(event.body);

        // Validate
        if (!name || !email || !message) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Missing fields' }) };
        }

        // Connect to MongoDB
        const client = await MongoClient.connect(process.env.MONGODB_URI);
        const db = client.db('sree-deeshika');
        const submissions = db.collection('contact-forms');

        // Save submission
        await submissions.insertOne({
            name,
            email,
            company,
            service,
            message,
            createdAt: new Date(),
            status: 'new', // For tracking: new, replied, resolved
        });

        await client.close();

        // Send emails (same as before)
        // ... email code ...

        return { statusCode: 200, body: JSON.stringify({ success: true }) };
    } catch (error) {
        console.error('Error:', error);
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};
```

---

## Phase 6: Deploy on Netlify

### Step 1: Create GitHub Repository
```bash
cd sree-deeshika-labs
git init
git add .
git commit -m "Initial website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/sree-deeshika-labs.git
git push -u origin main
```

### Step 2: Connect to Netlify
1. Go to **netlify.com/drop**
2. Sign in with GitHub
3. Select your repository
4. Build settings:
   - Publish directory: `.` (root)
   - Functions directory: `netlify/functions`
5. Click Deploy

### Step 3: Add Environment Variables
1. **Site settings → Environment variables**
2. Add:
   - `EMAIL_USER`
   - `EMAIL_PASSWORD`
   - `MONGODB_URI` (if using database)

### Step 4: Connect Domain
1. **Domain settings → Add domain**
2. Point DNS to Netlify
3. Wait 24-48 hours

---

## Phase 7: Admin Panel (Simple)

### Option A: Minimal Admin (No Database)
Keep an Excel sheet or Google Sheet with contacts

### Option B: Simple Admin Dashboard
Add a protected admin page (netlify/functions/admin.js):

```javascript
// Simple admin dashboard
exports.handler = async (event) => {
  const authToken = event.headers.authorization;
  const correctToken = process.env.ADMIN_TOKEN;

  if (!authToken || authToken !== `Bearer ${correctToken}`) {
    return { statusCode: 401, body: 'Unauthorized' };
  }

  // Fetch submissions from MongoDB
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db('sree-deeshika');
  const submissions = await db.collection('contact-forms')
    .find({})
    .sort({ createdAt: -1 })
    .toArray();
  
  await client.close();

  return {
    statusCode: 200,
    body: JSON.stringify(submissions),
  };
};
```

### Option C: Use a CMS
Platforms like **Contentful** (free tier) or **Strapi** offer UI for managing content

---

## Phase 8: Cost Breakdown

| Service | Cost/Year | Notes |
|---------|-----------|-------|
| Domain | ₹1,000 | sreedeeshikalabs.com |
| Netlify | FREE | Free tier sufficient |
| MongoDB | FREE | 512MB storage |
| Email (Gmail) | FREE | If you already have account |
| Email (Zoho) | FREE | 1 user free tier |
| **Total** | **₹1,000** | ✅ Well within budget |

---

## Phase 9: Deployment Checklist

- [ ] Project structure created
- [ ] netlify.toml created
- [ ] contact.js backend created
- [ ] HTML form updated
- [ ] GitHub account created
- [ ] Repository pushed to GitHub
- [ ] Netlify account connected to GitHub
- [ ] Environment variables added to Netlify
- [ ] Domain registered (BigRock/Namecheap)
- [ ] DNS pointed to Netlify
- [ ] Contact form tested (send test email)
- [ ] Confirmation email received
- [ ] Admin can see submissions
- [ ] HTTPS enabled (automatic)
- [ ] Google Analytics added
- [ ] Site performance checked

---

## Quick Reference: Commands You'll Need

```bash
# Install dependencies
npm init -y
npm install nodemailer

# Initialize Git
git init
git add .
git commit -m "Initial commit"

# Push to GitHub
git remote add origin https://github.com/USERNAME/repo.git
git push -u origin main

# Test locally (requires Node.js)
npm install netlify-cli
netlify dev  # Run locally at http://localhost:8888
```

---

## Troubleshooting

### Form submissions not working?
1. Check Netlify logs: Site → Functions → contact
2. Verify environment variables are set
3. Test with curl:
```bash
curl -X POST http://localhost:8888/.netlify/functions/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Hello"}'
```

### Emails not sending?
1. Gmail: Use App Password (not regular password)
2. Check MONGODB_URI format if using database
3. Allow Netlify functions to access external services

### DNS not working?
1. Wait 24-48 hours after changing DNS
2. Verify DNS records in registrar match Netlify
3. Use nslookup to check: `nslookup sreedeeshikalabs.com`

---

## What You'll Have After This Setup

✅ Professional dynamic website  
✅ Working contact form that sends emails  
✅ Submissions saved to database (optional)  
✅ Admin dashboard to view inquiries  
✅ HTTPS/SSL (automatic)  
✅ Email confirmations to users  
✅ Easy to update content  
✅ Scalable and maintainable  

**All for ₹1,000-2,000/year!** 🎉

---

## Next: Advanced Features (Optional)

Once live, you can add:
1. **Blog section** - Netlify CMS
2. **E-commerce** - Stripe payments
3. **Product catalog admin** - Simple dashboard
4. **Email marketing** - Mailchimp integration
5. **Analytics** - Google Analytics 4

---

## Resources

- Netlify Docs: https://docs.netlify.com
- Node.js Guide: https://nodejs.org/docs
- MongoDB: https://docs.mongodb.com
- Nodemailer: https://nodemailer.com
- Git Guide: https://git-scm.com/docs

**Questions? Hit the backend code and test locally first!**
