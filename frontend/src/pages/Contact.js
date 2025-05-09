import React, { useState, useEffect, useRef } from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaPaperPlane } from 'react-icons/fa';
import { TextField, Button, Snackbar, Alert, CircularProgress } from '@mui/material';
import '../styles/Contact.css';

const contactInfo = [
  {
    icon: <FaEnvelope className="contact-icon" />,
    title: "Email",
    value: "andrewcolindeleon13@gmail.com",
    link: "mailto:andrewcolindeleon13@gmail.com"
  },
  {
    icon: <FaPhone className="contact-icon" />,
    title: "Phone",
    value: "09611717332",
    link: "tel:09611717332"
  },
  {
    icon: <FaMapMarkerAlt className="contact-icon" />,
    title: "Location",
    value: "Bulacan, Philippines",
    link: "https://maps.google.com/?q=Bulacan,Philippines"
  }
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', surname: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });

  const titleRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.surname.trim()) errors.surname = "Surname is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email address";
    }
    if (!formData.message.trim()) errors.message = "Message is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Failed to send message");

      setNotification({ open: true, message: data.message, severity: "success" });
      setFormData({ name: '', surname: '', email: '', message: '' });
    } catch (err) {
      setNotification({ open: true, message: err.message || "Something went wrong", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  useEffect(() => {
    if (titleRef.current) titleRef.current.classList.add('animate-in');
  }, []);

  return (
    <section className="contact-section">
      <div className="contact-container">
        <h2 className="contact-title" ref={titleRef}>Get In Touch</h2>
        <p className="contact-description">
          Have a project or just want to say hello? Fill out the form or contact me directly.
        </p>

        <div className="contact-info-grid">
          {contactInfo.map((info, idx) => (
            <a
              key={idx}
              href={info.link}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-info-card"
            >
              {info.icon}
              <div className="contact-info-title">{info.title}</div>
              <div className="contact-info-value">{info.value}</div>
            </a>
          ))}
        </div>

        <div className="contact-form-container">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Name</label>
              <TextField
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                error={!!formErrors.name}
                helperText={formErrors.name}
                variant="outlined"
                className="form-input"
                InputProps={{ style: { color: 'white' } }}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Surname</label>
              <TextField
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                fullWidth
                error={!!formErrors.surname}
                helperText={formErrors.surname}
                variant="outlined"
                className="form-input"
                InputProps={{ style: { color: 'white' } }}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <TextField
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                error={!!formErrors.email}
                helperText={formErrors.email}
                variant="outlined"
                className="form-input"
                InputProps={{ style: { color: 'white' } }}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Message</label>
              <TextField
                name="message"
                value={formData.message}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                error={!!formErrors.message}
                helperText={formErrors.message}
                variant="outlined"
                className="form-textarea"
                InputProps={{ style: { color: 'white' } }}
              />
            </div>
            <Button
              type="submit"
              fullWidth
              className={`submit-button ${loading ? 'submitting' : ''}`}
              disabled={loading}
              style={{ color: 'white' }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : <>Send Message <FaPaperPlane style={{ marginLeft: 8 }} /></>}
            </Button>
          </form>
        </div>

        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity={notification.severity} onClose={handleCloseNotification}>
            {notification.message}
          </Alert>
        </Snackbar>
      </div>
    </section>
  );
};

export default Contact;
