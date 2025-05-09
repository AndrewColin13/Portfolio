import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaGithub, FaExternalLinkAlt, FaReact, FaNodeJs,} from 'react-icons/fa';
import {SiTailwindcss,} from 'react-icons/si';
import '../styles/Projects.css';
import uniszone from '../assets/unisz.png';
import webportfolio   from '../assets/webport.png';
import pdo   from '../assets/pdo.png';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const titleRef = useRef(null);
  const filterButtonsRef = useRef([]);
  const projectCardsRef = useRef([]);

  const projects = [
    {
        id: 1,
        title: "Static Website",
        description: "UNISZone is a vivrant community hub dedicated to bring everafters together from around the world.",
        image: uniszone, 
        category: "Frontend",
        techStack: [
          { name: "React", icon: <FaReact /> },
          { name: "Node.js", icon: <FaNodeJs /> },
        ],
        github: "https://github.com/Colindl/UZWEB",
        live: "https://project2.example.com"
    },
    {
      id: 2,
      title: "Portfolio Website",
      description: "A personal portfolio website showcasing projects and skills.",
      image: webportfolio,
      category: "Full Stack", 
      techStack: [
        { name: "React", icon: <FaReact /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss /> },
        { name: "GSAP", icon: null }
      ],
      github: "https://github.com/AndrewColin13/My-Portfolio",
      live: "https://my-website-portfolio-5a4b8.web.app"
    },
    {
        id: 3,
        title: "PDO Investment Program",
        description: "The BulSU Investment Program (BulSU-IP) aims to contribute in achieving targets set in the 2026–2030 Strategic Plan",
        image: pdo,
        category: "Frontend",
        techStack: [
          { name: "React", icon: <FaReact /> },
          { name: "Tailwind CSS", icon: <SiTailwindcss /> },
          { name: "GSAP", icon: null }
        ],
        github: "https://github.com/Planning-and-Development-BULSU/BULSUPIPS_Front_End",
        live: "https://pdo-bulsupips.web.app/"
      },
    // ...other projects
  ];

  const filters = ["All", "Frontend", "Backend", "Full Stack"];

  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter(project => project.category === activeFilter);

  useEffect(() => {
    // Animate the title
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5 }
    );

    // Animate filter buttons
    gsap.fromTo(
      filterButtonsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.2 }
    );

    // Animate project cards
    gsap.fromTo(
      projectCardsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.2 }
    );
  }, [filteredProjects]);

  return (
    <section className="projects-section">
      <div className="projects-container">
        <h1 ref={titleRef} className="projects-title">
          My Projects
        </h1>

        <div className="filter-buttons">
          {filters.map((filter, index) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`filter-button ${activeFilter === filter ? 'active' : ''}`}
              ref={(el) => (filterButtonsRef.current[index] = el)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (projectCardsRef.current[index] = el)}
              className="project-card"
            >
              <div className="project-image">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-img"
                />
              </div>

              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  <span className="project-category">{project.category}</span>
                </div>

                <p className="project-description">{project.description}</p>

                <div className="project-tech">
                  {project.techStack.map((tech, index) => (
                    <div key={index} className="tech-badge">
                      {tech.icon && <span className="tech-icon">{tech.icon}</span>}
                      {tech.name}
                    </div>
                  ))}
                </div>

                <div className="project-links">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link github"
                  >
                    <FaGithub /> Code
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link demo"
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;