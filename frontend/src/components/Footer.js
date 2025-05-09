import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import '../styles/Footer.css';

const Footer = () => {
  const socialLinks = [
    { icon: <FaGithub size={25} />, url: 'https://github.com/AndrewColin13' },
    { icon: <FaLinkedin size={25} />, url: 'https://www.linkedin.com/in/andrew-colin-de-leon-5abb62287?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
    { icon: <FaTwitter size={25} />, url: 'https://twitter.com/ColinDeLeon13' },
    { icon: <FaEnvelope size={25} />, url: 'mailto:andrewcolindeleon13@gmail.com' }
  ];

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.2 }
    }
  };

  const socialVariants = {
    hover: { scale: 1.2, rotate: 15, transition: { duration: 0.2 } }
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
      className="footer"
    >
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-info">
            <h3 className="footer-name">Andrew Colin</h3>
            <p className="footer-role">Web Developer & Designer</p>
          </div>
          
          <div className="footer-social">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                variants={socialVariants}
                whileHover="hover"
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </div>
        
        <div className="footer-copyright">
          <p>© {new Date().getFullYear()} Andrew Colin. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;