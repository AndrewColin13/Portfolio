import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const heroContentRef = useRef(null);
  const heroItemsRef = useRef([]);
  const skillsSectionRef = useRef(null);
  const skillItemsRef = useRef([]);

  useEffect(() => {
    // Animate hero content
    gsap.fromTo(
      heroContentRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8 }
    );

    // Animate hero items with stagger
    gsap.fromTo(
      heroItemsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.3 }
    );

    // Animate skills section
    gsap.fromTo(
      skillsSectionRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, delay: 1 }
    );

    // Animate skill items with stagger
    gsap.fromTo(
      skillItemsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
    );
  }, []);

  return (
    <section className="home-section">
      <div className="home-container">
        <div ref={heroContentRef} className="hero-content">
          <p ref={(el) => (heroItemsRef.current[0] = el)} className="hero-greeting">
            Hello, I'm
          </p>
          <h1 ref={(el) => (heroItemsRef.current[1] = el)} className="hero-title">
            Andrew Colin
          </h1>
          <p ref={(el) => (heroItemsRef.current[2] = el)} className="hero-subtitle">
          Web, Mobile Developer & Designer
          </p>
          <p ref={(el) => (heroItemsRef.current[3] = el)} className="hero-description">
            I create elegant, responsive, and high-performance web applications with modern technologies.
            Let's build something amazing together.
          </p>
          <div ref={(el) => (heroItemsRef.current[4] = el)} className="hero-buttons">
            <Link to="/projects" className="button-primary">
              See My Work <FaArrowRight />
            </Link>
            <Link to="/contact" className="button-outline">
              Contact Me
            </Link>
          </div>
        </div>
      </div>

      <div ref={skillsSectionRef} className="skills-section">
        <div className="home-container">
          <h2 className="section-title">Featured Skills</h2>
          <div className="skills-grid">
            {[
              'React',
              'JavaScript',
              'GSAP',
              'Tailwind CSS',
              'Node.js',
              'TypeScript',
              'Responsive Design',
              'UI/UX'
            ].map((skill, index) => (
              <div
                key={skill}
                ref={(el) => (skillItemsRef.current[index] = el)}
                className="skill-item"
              >
                <p>{skill}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;