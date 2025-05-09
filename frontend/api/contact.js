import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { name, surname, email, message } = req.body;

  if (!name || !surname || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email format' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const userMailOptions = {
      from: `"No Reply" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `We Have Received Your Message from ${name} ${surname}`,
      html: `
        <p>We have received your message and will be in touch shortly...</p>
        <h3>Details:</h3>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Surname:</strong> ${surname}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Message:</strong> ${message}</li>
        </ul>
      `
    };

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
      `
    };

    await transporter.sendMail(userMailOptions);

    if (process.env.ADMIN_EMAIL) {
      await transporter.sendMail(adminMailOptions);
    }

    res.status(200).json({ success: true, message: 'Message sent successfully.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to send email', error: error.message });
  }
}
