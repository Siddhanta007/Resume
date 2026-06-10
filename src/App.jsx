import React, { useEffect, useState } from 'react';
import resumeData from './data.json';

export default function App() {
  const [activeSection, setActiveSection] = useState('summary-section');

  // Highlight active sidebar navigation link based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'summary-section',
        'skills-section',
        'experience-section',
        'projects-section',
        'education-section',
        'achievements-section',
        'certifications-section',
        'hobbies-section'
      ];
      
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 40,
        behavior: 'smooth'
      });
      setActiveSection(targetId);
    }
  };

  return (
    <div className="resume-layout container" id="resume-root">
      {/* Sidebar - Left Column */}
      <aside className="sidebar" id="resume-sidebar">
        <div className="sidebar-profile">
          <img 
            src="/profile.jpeg" 
            alt={resumeData.name} 
            className="profile-avatar-large" 
            id="profile-avatar"
            onError={(e) => {
              if (e.target.src.endsWith('.jpeg')) {
                e.target.src = '/profile.jpg';
              } else {
                e.target.style.display = 'none';
              }
            }}
          />
          <h1 className="sidebar-name" id="candidate-name">{resumeData.name}</h1>
          <p className="sidebar-title" id="candidate-title">{resumeData.title}</p>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav" id="sidebar-navigation">
          <a 
            href="#summary-section" 
            className={`sidebar-nav-link ${activeSection === 'summary-section' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'summary-section')}
            id="nav-summary"
          >
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            Summary
          </a>
          <a 
            href="#skills-section" 
            className={`sidebar-nav-link ${activeSection === 'skills-section' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'skills-section')}
            id="nav-skills"
          >
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 00-2 2zM9 9h6v6H9V9z"></path>
            </svg>
            Technical Skills
          </a>
          <a 
            href="#experience-section" 
            className={`sidebar-nav-link ${activeSection === 'experience-section' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'experience-section')}
            id="nav-experience"
          >
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            Experience
          </a>
          <a 
            href="#projects-section" 
            className={`sidebar-nav-link ${activeSection === 'projects-section' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'projects-section')}
            id="nav-projects"
          >
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
            </svg>
            Projects
          </a>
          <a 
            href="#education-section" 
            className={`sidebar-nav-link ${activeSection === 'education-section' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'education-section')}
            id="nav-education"
          >
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
            </svg>
            Education
          </a>
          <a 
            href="#achievements-section" 
            className={`sidebar-nav-link ${activeSection === 'achievements-section' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'achievements-section')}
            id="nav-achievements"
          >
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
            </svg>
            Achievements
          </a>
          <a 
            href="#certifications-section" 
            className={`sidebar-nav-link ${activeSection === 'certifications-section' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'certifications-section')}
            id="nav-certifications"
          >
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z"></path>
            </svg>
            Certifications
          </a>
          <a 
            href="#hobbies-section" 
            className={`sidebar-nav-link ${activeSection === 'hobbies-section' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'hobbies-section')}
            id="nav-hobbies"
          >
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
            Interests
          </a>
        </nav>

        {/* Contact Info */}
        <div className="sidebar-contact" id="contact-details">
          <div className="contact-item" id="contact-phone">
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
            </svg>
            <a href={`tel:${resumeData.contact.phone.replace(/\s+/g, '')}`}>{resumeData.contact.phone}</a>
          </div>
          <div className="contact-item" id="contact-email">
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            <a href={`mailto:${resumeData.contact.email}`}>{resumeData.contact.email}</a>
          </div>
          <div className="contact-item" id="contact-linkedin">
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            <a href={resumeData.contact.linkedinUrl} target="_blank" rel="noopener noreferrer">{resumeData.contact.linkedin}</a>
          </div>
          <div className="contact-item" id="contact-github">
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
            </svg>
            <a href={resumeData.contact.githubUrl} target="_blank" rel="noopener noreferrer">{resumeData.contact.github}</a>
          </div>
        </div>

        {/* PDF Downloads */}
        <div className="sidebar-downloads" id="pdf-downloads">
          <a 
            href="/Sri_Krishna_DataScience.pdf" 
            className="btn btn-primary" 
            download 
            id="download-ds-pdf"
            title="Download Sri Krishna's Data Science Resume PDF"
          >
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
            Download Resume PDF
          </a>
        </div>
      </aside>

      {/* Main Content Column */}
      <div className="main-content" id="resume-content">
        {/* Professional Summary Section */}
        <section className="section" id="summary-section">
          <h2>
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{width: '1.5rem', height: '1.5rem'}}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            Professional Summary
          </h2>
          <div className="summary-card" id="professional-summary">
            <p>{resumeData.summary}</p>
          </div>
        </section>

        {/* Technical Skills Section */}
        <section className="section" id="skills-section">
          <h2>
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{width: '1.5rem', height: '1.5rem'}}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 00-2 2zM9 9h6v6H9V9z"></path>
            </svg>
            Technical Skills
          </h2>
          <div className="skills-grid">
            {resumeData.skills.map((skillGroup, idx) => {
              const styleClasses = [
                "skills-cat-blue",
                "skills-cat-green",
                "skills-cat-purple",
                "skills-cat-yellow",
                "skills-cat-pink",
                "skills-cat-teal",
                "skills-cat-gray"
              ];
              const colorClass = styleClasses[idx % styleClasses.length];

              return (
                <div className={`skills-category ${colorClass}`} key={idx} id={`skills-cat-${idx}`}>
                  <h3 className="skills-category-title">{skillGroup.category}</h3>
                  <div className="tags-list">
                    {skillGroup.items.map((skill, sIdx) => (
                      <span className="tag" key={sIdx}>{skill}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Experience Section */}
        <section className="section" id="experience-section">
          <h2>
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{width: '1.5rem', height: '1.5rem'}}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            Work Experience
          </h2>
          <div className="experience-list">
            {resumeData.experience.map((exp, idx) => (
              <article className={`experience-item ${idx % 2 === 0 ? 'exp-item-blue' : 'exp-item-teal'}`} key={idx} id={`exp-item-${idx}`}>
                <div className="experience-header">
                  <div className="experience-title-group">
                    <span className="company-name">{exp.company}</span>
                    <h3 className="job-title">{exp.role}</h3>
                  </div>
                  <div className="experience-meta">
                    <span className="date-range">{exp.period}</span>
                    <span className="location">{exp.location}</span>
                  </div>
                </div>
                <ul className="experience-bullets">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="section" id="projects-section">
          <h2>
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{width: '1.5rem', height: '1.5rem'}}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
            </svg>
            Featured Projects
          </h2>
          <div className="projects-grid">
            {resumeData.projects.map((project, idx) => {
              const projectClasses = [
                "project-card-blue",
                "project-card-yellow",
                "project-card-green"
              ];
              const pColorClass = projectClasses[idx % projectClasses.length];

              return (
                <article className={`project-card ${pColorClass}`} key={idx} id={`project-item-${idx}`}>
                  <div className="project-header">
                    <h3 className="project-title">{project.name}</h3>
                    <div className="project-links">
                      <a 
                        href={project.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="project-link"
                        title={`View ${project.name}`}
                        style={{ display: 'inline-flex', alignItems: 'center' }}
                      >
                        {(project.status.toLowerCase().includes("active") || project.status.toLowerCase().includes("progress")) && (
                          <span className="pulsing-dot" style={{ display: 'inline-block' }} />
                        )}
                        {project.status}
                        <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{width: '0.75rem', height: '0.75rem', marginLeft: '0.2rem'}}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="project-desc">
                    <p>{project.desc}</p>
                  </div>
                  <div className="tags-list">
                    {project.tech.map((techItem, tIdx) => (
                      <span className="tag" key={tIdx}>
                        {techItem}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Education Section */}
        <section className="section" id="education-section">
          <h2>
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{width: '1.5rem', height: '1.5rem'}}>
              <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
            </svg>
            Education
          </h2>
          <div className="education-card card-desaturated-purple">
            {resumeData.education.map((edu, idx) => (
              <div className="edu-item" key={idx} id={`edu-item-${idx}`}>
                <div className="edu-header">
                  <span className="edu-institution">{edu.institution}</span>
                  <span className="edu-date">{edu.period}</span>
                </div>
                <div className="edu-degree">{edu.degree}</div>
                <div className="edu-grade">{edu.grade}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements Section */}
        <section className="section" id="achievements-section">
          <h2>
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{width: '1.5rem', height: '1.5rem'}}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
            </svg>
            Achievements & Recognition
          </h2>
          <div className="achievement-card card-desaturated-pink">
            <div className="achievements-list">
              {resumeData.achievements.map((ach, idx) => (
                <div className="achievement-item" key={idx} id={`ach-item-${idx}`}>
                  <strong>{ach.title}</strong>
                  <span>{ach.details}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        {resumeData.certifications && resumeData.certifications.length > 0 && (
          <section className="section" id="certifications-section">
            <h2>
              <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{width: '1.5rem', height: '1.5rem'}}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z"></path>
              </svg>
              Certifications
            </h2>
            <div className="certification-card card-desaturated-green">
              <div className="achievements-list">
                {resumeData.certifications.map((cert, idx) => (
                  <div className="achievement-item" key={idx} id={`cert-item-${idx}`}>
                    <strong>{cert.name}</strong>
                    <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>
                      Issued by {cert.issuer} • {cert.date}
                    </span>
                    {cert.details && <span>{cert.details}</span>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Hobbies / Interests Section */}
        {resumeData.hobbies && resumeData.hobbies.length > 0 && (
          <section className="section" id="hobbies-section">
            <h2>
              <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{width: '1.5rem', height: '1.5rem'}}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
              Interests & Hobbies
            </h2>
            <div className="certification-card card-desaturated-yellow">
              <div className="achievements-list">
                {resumeData.hobbies.map((hobby, idx) => (
                  <div className="achievement-item" key={idx} id={`hobby-item-${idx}`}>
                    <strong style={{ color: 'var(--yellow-text)' }}>{hobby.name}</strong>
                    <span>{hobby.details}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <footer className="footer" id="resume-footer">
          <p>© {new Date().getFullYear()} {resumeData.name} — Built with React and Vite.</p>
        </footer>
      </div>
    </div>
  );
}
