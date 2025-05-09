import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../styles/About.css';
import colinImage from '../assets/colins.webp';

const About = () => {
  const aboutRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const skillsRef = useRef([]);
  const experienceRef = useRef(null);

  const skills = [
    { category: "Frontend", items: ["React", "Next.js", "JavaScript", "TypeScript", "HTML/CSS", "Tailwind CSS"] },
    { category: "Backend", items: ["Node.js", "Express", "MongoDB", "Firebase", "REST APIs"] },
    { category: "Tools & Others", items: ["Git", "Webpack", "Figma", "VS Code", "Jest", "Agile Methodology"] }
  ];

  useEffect(() => {
    // Animate the entire section
    gsap.fromTo(
      aboutRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 }
    );

    // Animate the title
    gsap.fromTo(
      titleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, delay: 0.2 }
    );

    // Animate the text
    gsap.fromTo(
      textRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, delay: 0.4 }
    );

    // Animate the image
    gsap.fromTo(
      imageRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, delay: 0.6 }
    );

    // Animate skills
    skillsRef.current.forEach((skill, index) => {
      gsap.fromTo(
        skill,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.8 + index * 0.2 }
      );
    });

    // Animate experience section
    gsap.fromTo(
      experienceRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, delay: 1.2 }
    );
  }, []);

  return (
    <section ref={aboutRef} className="about-section">
      <div className="about-container">
        <div ref={titleRef} className="about-title">
          About Me
        </div>

        <div className="about-content">
          <div ref={textRef} className="about-text">
            <h2 className="about-subtitle">My Journey</h2>
            <p className="about-paragraph">
              Hello! I'm Andrew Colin, a passionate web developer with a focus on creating modern, 
              responsive, and user-friendly web applications. With 3 Months of experience in web development,
              I've worked on a wide range of projects from simple landing pages to complex web applications.
            </p>
            <p className="about-paragraph">
            My journey in web development started when I was in high school. Since then, I’ve been continuously 
            learning and improving my skills to keep up with the ever-evolving world of web technologies.
            </p>
            <p className="about-paragraph">
            When I’m not coding, you can find me playing basketball, online games or reading articles about web development.
            I believe these activities help me maintain a balanced life and often inspire creative solutions to technical problems.
            </p>
          </div>

          <div ref={imageRef} className="about-image-container">
            <div className="about-image">
            <img 
  src={colinImage}
  alt="Andrew Colin's profile"
  className="profile-img"
/>
            </div>
          </div>
        </div>

        <div className="skills-section">
          <h2 className="section-title">My Skills</h2>
          <div className="skills-categories">
            {skills.map((skillGroup, index) => (
              <div
                key={index}
                ref={(el) => (skillsRef.current[index] = el)}
                className="skill-category"
              >
                <h3 className="category-title">{skillGroup.category}</h3>
                <ul className="skill-list">
                  {skillGroup.items.map((skill, idx) => (
                    <li key={idx} className="skill-list-item">
                      <span className="skill-bullet">•</span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div ref={experienceRef} className="experience-section">
          <h2 className="section-title">Education & Experience</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-header">
                <h3 className="timeline-title">Frontend Developer</h3>
                <span className="timeline-period">Feb 3, 2025 - May 9, 2025 </span>
              </div>
              <p className="timeline-company">Planning and development Office, Malolos</p>
              <p className="timeline-description">
                To create a collaborative and transparent platform for project planning and implementation.
                We aim to ensure that every proposed initiative is aligned with Bulacan State University's Meduim- Term Development Plan
                (MTDP) and contributes meaningfully to the institution's long-term goals.
              </p>
            </div>

            <div className="timeline-item">
              <div className="timeline-header">
                <h3 className="timeline-title">Bachelor of Science in Information Technology</h3>
                <span className="timeline-period">2021 - 2025</span>
              </div>
              <p className="timeline-company">Bulacan State University, Hagonoy</p>
              <p className="timeline-description">
              Specialized in web and mobile development, with strong foundations in algorithms.
               Participated in coding competitions, hackathons, and team-based projects to apply and sharpen my skills.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;