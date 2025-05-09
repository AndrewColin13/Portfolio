const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const validator = require("validator");
const rateLimit = require("express-rate-limit");

// Load environment variables
dotenv.config();

// Safety check for required env vars
["EMAIL_USER", "EMAIL_PASS", "ADMIN_EMAIL"].forEach((key) => {
  if (!process.env[key]) {
    console.warn(`⚠️ Warning: Missing ${key} in .env`);
  }
});

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Logging middleware (optional)
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// Rate limiter to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Max 10 requests per window per IP
  message: { success: false, message: "Too many requests. Try again later." },
});
app.use("/api/contact", limiter);

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Contact endpoint
app.post("/api/contact", async (req, res) => {
  const { name, surname, email, message } = req.body;

  // Validate input
  if (!name || !surname || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required.",
    });
  }

  // Validate email format
  if (!validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid email address.",
    });
  }

  try {
    // Email to the user (receipt)
    const userMailOptions = {
      from: `"No Reply" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `We Have Received Your Message from ${name} ${surname}`,
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for contacting us! We have received your message and will be in touch shortly. If you have more to add, feel free to reply to this email.</p>
        <h3>Your Submitted Details:</h3>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Surname:</strong> ${surname}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Message:</strong> ${message}</li>
        </ul>
        <p>We typically respond within 24 hours on business days.</p>
        <p>Best regards,<br/>Andrew Colin De Leon</p>
      `,
    };

    // Email to admin
    const adminMailOptions = {
      from: `"Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Submission from ${name} ${surname}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Surname:</strong> ${surname}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Message:</strong> ${message}</li>
        </ul>
      `,
    };

    // Send emails
    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(adminMailOptions);

    res.status(200).json({
      success: true,
      message: "Your message has been sent successfully.",
    });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
