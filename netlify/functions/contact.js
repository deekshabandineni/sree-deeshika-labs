// Netlify Function: Contact Form Handler
// Save this as: netlify/functions/contact.js

const nodemailer = require('nodemailer');

// Configure email transporter
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Method not allowed. Use POST.' }),
    };
  }

  try {
    // Parse form data
    const { name, email, company, service, message } = JSON.parse(event.body);

    // Validate required fields
    if (!name || name.trim() === '') {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Name is required' }),
      };
    }

    if (!email || email.trim() === '') {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Email is required' }),
      };
    }

    if (!message || message.trim() === '') {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Message is required' }),
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Invalid email address' }),
      };
    }

    // Sanitize inputs
    const sanitizedData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: (company || '').trim(),
      service: (service || '').trim(),
      message: message.trim(),
      submittedAt: new Date().toISOString(),
    };

    // Email to your business (admin)
    const adminEmailOptions = {
      from: process.env.EMAIL_USER,
      to: 'info@sreedeeshikalabs.com', // Change this to your email
      subject: `New Contact Form Submission from ${sanitizedData.name}`,
      html: `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; color: #333; }
              .container { max-width: 600px; margin: 0 auto; }
              .header { background: #003d7a; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background: #f9f9f9; }
              .field { margin: 15px 0; }
              .label { font-weight: bold; color: #003d7a; }
              .value { margin-top: 5px; padding: 10px; background: white; border-left: 3px solid #003d7a; }
              .footer { padding: 15px; text-align: center; color: #999; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>New Inquiry - Sree Deeshika Labs</h1>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Sender Name:</div>
                  <div class="value">${sanitizedData.name}</div>
                </div>
                <div class="field">
                  <div class="label">Email Address:</div>
                  <div class="value"><a href="mailto:${sanitizedData.email}">${sanitizedData.email}</a></div>
                </div>
                ${sanitizedData.company ? `
                <div class="field">
                  <div class="label">Company:</div>
                  <div class="value">${sanitizedData.company}</div>
                </div>
                ` : ''}
                ${sanitizedData.service ? `
                <div class="field">
                  <div class="label">Service Interest:</div>
                  <div class="value">${sanitizedData.service}</div>
                </div>
                ` : ''}
                <div class="field">
                  <div class="label">Message:</div>
                  <div class="value">${sanitizedData.message.replace(/\n/g, '<br>')}</div>
                </div>
                <div class="field">
                  <div class="label">Submitted At:</div>
                  <div class="value">${new Date(sanitizedData.submittedAt).toLocaleString('en-IN', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric', 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}</div>
                </div>
              </div>
              <div class="footer">
                <p>This is an automated email from your website contact form.</p>
                <p>Reply directly to the sender or update your contact form settings.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    // Confirmation email to the user
    const userEmailOptions = {
      from: process.env.EMAIL_USER,
      to: sanitizedData.email,
      subject: 'Thank you for contacting Sree Deeshika Labs',
      html: `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; color: #333; }
              .container { max-width: 600px; margin: 0 auto; }
              .header { background: #003d7a; color: white; padding: 30px; text-align: center; }
              .content { padding: 30px; line-height: 1.6; }
              .footer { padding: 20px; text-align: center; color: #999; font-size: 12px; border-top: 1px solid #ddd; }
              .contact-info { background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Sree Deeshika Labs</h1>
                <p>Pharmaceutical Testing & Trading</p>
              </div>
              <div class="content">
                <p>Hello <strong>${sanitizedData.name}</strong>,</p>
                
                <p>Thank you for reaching out to Sree Deeshika Labs. We have received your inquiry and appreciate your interest in our services.</p>
                
                <p>Our team will review your message and get back to you within <strong>24 hours</strong>. If your matter is urgent, please feel free to call us directly.</p>
                
                <div class="contact-info">
                  <strong>Contact Information:</strong><br>
                  Email: info@sreedeeshikalabs.com<br>
                  Phone: +91 XXXX XXXX XXX<br>
                  Website: www.sreedeeshikalabs.com
                </div>
                
                <p>Best regards,<br>
                <strong>Sree Deeshika Labs Team</strong><br>
                Hyderabad, Telangana, India</p>
              </div>
              <div class="footer">
                <p>This is an automated response. Please do not reply to this email.</p>
                <p>&copy; 2024 Sree Deeshika Labs Pvt Ltd. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    // Send emails
    console.log('Sending admin email to:', adminEmailOptions.to);
    console.log('Sending confirmation email to:', sanitizedData.email);

    await Promise.all([
      transporter.sendMail(adminEmailOptions),
      transporter.sendMail(userEmailOptions),
    ]);

    console.log(`Form submitted successfully by ${sanitizedData.name}`);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        message: 'Thank you! Your inquiry has been received. We will contact you within 24 hours.',
      }),
    };
  } catch (error) {
    console.error('Contact form error:', error);

    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: false,
        error: 'Failed to submit form',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Please try again later or contact us directly.',
      }),
    };
  }
};
