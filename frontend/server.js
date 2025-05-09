const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  const { name, surname, email, message } = req.body;
  
  // Validate input
  if (!name || !surname || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Please enter a valid email address' });
  }
  
  try {
    // Email template for user receipt
    const userMailOptions = {
      from: `"No Reply" <${process.env.EMAIL_USER}>`,  // sender
      to: email,  // recipient (user's email)
      subject: `We Have Received Your Message from ${name} ${surname}`,  // subject
      html: `
        <p>We have received your message and will be in touch shortly. In the meantime, if you have any further questions or additional information to share, please feel free to reply to this email.</p>
        <p>Thank you for reaching out, and we look forward to assisting you.</p>
        <h3>Details:</h3>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Surname:</strong> ${surname}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Message:</strong> ${message}</li>
        </ul>
        <p>Thank you for your message. We have received your inquiry and will get back to you as soon as possible. Our team typically responds within 24 hours during business days.</p>
        <p>Best regards,<br/>Andrew Colin De Leon</p>
      `
    };
    
    // Admin email template
    const adminMailOptions = {
      from: `"Contact Form" <${process.env.EMAIL_USER}>`,  // sender
      to: process.env.ADMIN_EMAIL,  // admin email
      subject: `New Contact Form Submission from ${name} ${surname}`,  // subject
      html: `
        <h3>New Contact Form Submission</h3>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Surname:</strong> ${surname}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Message:</strong> ${message}</li>
        </ul>
      `
    };

    // Send receipt email to user
    await transporter.sendMail(userMailOptions);
    
    // Send copy to admin (if admin email is configured)
    if (process.env.ADMIN_EMAIL) {
      await transporter.sendMail(adminMailOptions);
    }
    
    // Return success response
    res.status(200).json({ 
      success: true, 
      message: 'Your message has been sent successfully. Please check your email for confirmation.'
    });
    
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send message', error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
