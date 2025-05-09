import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUser, FaProjectDiagram, FaEnvelope } from 'react-icons/fa';
import '../styles/Header.css';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    
    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <header className="header">
            <div className="logo">Web & Mobile Developer crafting modern digital experiences.</div>
            <button 
                className={`menu-toggle ${menuOpen ? 'active' : ''}`} 
                onClick={toggleMenu}
                aria-label="Toggle navigation menu"
            >
                <div></div>
                <div></div>
                <div></div>
            </button>
            <nav className={`nav ${menuOpen ? 'active' : ''}`}>
                <ul>
                    <li>
                        <Link to="/" className={isActive('/')} onClick={() => setMenuOpen(false)}>
                            <FaHome /> Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className={isActive('/about')} onClick={() => setMenuOpen(false)}>
                            <FaUser /> About
                        </Link>
                    </li>
                    <li>
                        <Link to="/projects" className={isActive('/projects')} onClick={() => setMenuOpen(false)}>
                            <FaProjectDiagram /> Projects
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" className={isActive('/contact')} onClick={() => setMenuOpen(false)}>
                            <FaEnvelope /> Contact
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;