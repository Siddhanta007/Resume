import { useEffect, useRef, useState } from 'react';
import data from './data.json';

const Arrow = ({ down = false }) => <span aria-hidden="true">{down ? '↓' : '↗'}</span>;
const phoneHref = `tel:${data.phone.replace(/[^\d+]/g, '')}`;

function ExternalLink({ href, children, className = '' }) {
  return <a className={className} href={href} target="_blank" rel="noreferrer">{children} <Arrow /></a>;
}

function Brand() {
  return <a className="brand" href="#top" aria-label="Sri Krishna, back to top">SK<span>.</span></a>;
}

const navLinks = [
  ['Platform', '#platform'],
  ['Work', '#work'],
  ['Skills', '#skills'],
  ['Proof', '#proof']
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 20);
      setProgress(scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    const onKeyDown = (event) => event.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKeyDown);
    if (menuOpen) {
      wasOpen.current = true;
      window.requestAnimationFrame(() => menuRef.current?.querySelector('a')?.focus());
    } else if (wasOpen.current) {
      wasOpen.current = false;
      toggleRef.current?.focus();
    }
    return () => {
      document.body.classList.remove('menu-open');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="scroll-progress" style={{ transform: `scaleX(${progress / 100})` }} />
        <Brand />
        <nav aria-label="Primary navigation">
          {navLinks.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
        </nav>
        <a className="header-contact" href={`mailto:${data.email}`}>Let&apos;s talk <Arrow /></a>
        <button
          className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setMenuOpen((open) => !open)}
          ref={toggleRef}
        >
          <span /><span />
        </button>
      </header>
      <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} id="mobile-menu" aria-hidden={!menuOpen} role="dialog" ref={menuRef}>
        <nav aria-label="Mobile navigation">
          {navLinks.map(([label, href], index) => (
            <a href={href} onClick={() => setMenuOpen(false)} key={href}><span>0{index + 1}</span>{label}<Arrow down /></a>
          ))}
        </nav>
        <div className="mobile-menu-footer">
          <p>{data.role}<br />{data.location}</p>
          <a href={`mailto:${data.email}`}>{data.email}</a>
        </div>
      </div>
    </>
  );
}

function useRevealAnimations() {
  useEffect(() => {
    const elements = [...document.querySelectorAll('[data-reveal]')];
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function SectionHeading({ index, eyebrow, title, accent, description }) {
  return (
    <div className="section-heading" data-reveal>
      <p className="section-kicker"><span>{index}</span>{eyebrow}</p>
      <div>
        <h2>{title} {accent && <em>{accent}</em>}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-copy" data-reveal>
        <p className="availability"><i /> {data.availability}</p>
        <p className="eyebrow">{data.hero.eyebrow}</p>
        <h1>I build AI systems for decisions that <em>matter.</em></h1>
        <p className="hero-description">{data.hero.description}</p>
        <p className="hero-direction">{data.hero.direction}</p>
        <div className="hero-actions">
          <a className="button button-dark" href="#platform">Explore my systems <Arrow down /></a>
          <ExternalLink className="text-link" href={data.links.github}>GitHub</ExternalLink>
          <ExternalLink className="text-link" href={data.links.linkedin}>LinkedIn</ExternalLink>
        </div>
      </div>
      <div className="portrait-column" data-reveal>
        <div className="portrait-frame">
          <img src="/profile.jpeg" alt="Sri Krishna" width="420" height="480" />
          <div className="portrait-tag">APPLIED AI<br />KOLKATA, INDIA</div>
        </div>
        <p>Enterprise AI · Predictive ML · Quantitative systems</p>
      </div>
      <div className="proof-strip" aria-label="Selected evidence">
        {data.proof.map((item, index) => (
          <div key={item.label} data-reveal style={{ '--delay': `${index * 70}ms` }}>
            <strong>{item.value}</strong><span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Platform() {
  const [activeProduct, setActiveProduct] = useState(0);
  const product = data.platform.products[activeProduct];
  const selectProduct = (index) => {
    const nextIndex = (index + data.platform.products.length) % data.platform.products.length;
    setActiveProduct(nextIndex);
    window.requestAnimationFrame(() => document.getElementById(`product-tab-${nextIndex}`)?.focus());
  };
  const onTabKeyDown = (event, index) => {
    if (event.key === 'ArrowRight') selectProduct(index + 1);
    else if (event.key === 'ArrowLeft') selectProduct(index - 1);
    else if (event.key === 'Home') selectProduct(0);
    else if (event.key === 'End') selectProduct(data.platform.products.length - 1);
    else return;
    event.preventDefault();
  };

  return (
    <section className="section platform-section" id="platform">
      <SectionHeading
        index="01"
        eyebrow="Independent product engineering"
        title="Four systems."
        accent="Four clear responsibilities."
        description={data.platform.summary}
      />
      <div className="product-tabs" role="tablist" aria-label="NETRA product systems" data-reveal>
        {data.platform.products.map((item, index) => (
          <button
            id={`product-tab-${index}`}
            key={item.name}
            type="button"
            role="tab"
            aria-selected={activeProduct === index}
            aria-controls="product-panel"
            tabIndex={activeProduct === index ? 0 : -1}
            className={activeProduct === index ? 'is-active' : ''}
            onClick={() => setActiveProduct(index)}
            onKeyDown={(event) => onTabKeyDown(event, index)}
          >
            <span>0{index + 1}</span>
            <strong>{item.name}</strong>
            <small>{item.status}</small>
          </button>
        ))}
      </div>
      <article
        className="product-hero"
        id="product-panel"
        role="tabpanel"
        aria-labelledby={`product-tab-${activeProduct}`}
        key={product.name}
      >
        <div className="product-hero-meta">
          <p>{product.type}</p>
          <span className={product.status === 'Under development' ? 'status status-development' : 'status'}>{product.status}</span>
        </div>
        <div className="product-hero-name">
          <p>0{activeProduct + 1}</p>
          <h3>{product.name}<span>.</span></h3>
        </div>
        <div className="product-hero-story">
          <h4>{product.statement}</h4>
          <p>{product.description}</p>
          <p>{product.detail}</p>
          <ul>{product.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
          {product.name === 'NETRA' && (
            <div className="platform-actions">
              <ExternalLink className="button button-accent" href={data.links.netra}>Open platform</ExternalLink>
              <ExternalLink className="inline-link" href={data.links.netraStory}>Read product story</ExternalLink>
            </div>
          )}
        </div>
      </article>
    </section>
  );
}

function Work() {
  return (
    <section className="section work-section" id="work">
      <SectionHeading
        index="02"
        eyebrow="Professional systems"
        title="From field operations"
        accent="to legacy modernization."
        description="Five distinct problems across enterprise GenAI and applied machine learning. Public summaries preserve client confidentiality while showing the engineering decisions involved."
      />
      <div className="project-grid">
        {data.professionalProjects.map((project, index) => (
          <article className={index === 0 ? 'project-card project-card-featured' : 'project-card'} key={project.name} data-reveal style={{ '--delay': `${(index % 2) * 70}ms` }}>
            <div className="project-meta"><span>0{index + 1}</span><p>{project.category}</p><small>{project.status}</small></div>
            <h3>{project.name}</h3>
            <p className="project-summary">{project.description}</p>
            <p className="project-detail">{project.detail}</p>
            <ul>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
          </article>
        ))}
      </div>
      <div className="timeline" data-reveal>
        {data.experience.map((item, index) => (
          <article key={item.role}>
            <span>0{index + 1}</span>
            <div><p>{item.period} · {item.location}</p><h3>{item.role}</h3><strong>{item.company}</strong></div>
            <p>{item.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="section skills-section" id="skills">
      <SectionHeading
        index="03"
        eyebrow="Evidence-backed toolkit"
        title="Technical range,"
        accent="grounded in systems."
        description="Keywords matter, but only when they connect to work. These capabilities span analysis, application engineering, model development, retrieval, orchestration, and deployment."
      />
      <div className="skills-grid">
        {data.skillGroups.map((group, index) => (
          <article key={group.title} data-reveal style={{ '--delay': `${(index % 2) * 70}ms` }}>
            <span>0{index + 1}</span>
            <div><h3>{group.title}</h3><p>{group.description}</p></div>
            <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function Proof() {
  return (
    <section className="section proof-section" id="proof">
      <SectionHeading
        index="04"
        eyebrow="Recognition & education"
        title="The work has"
        accent="external evidence."
        description="Recognition, selective learning, competitive problem solving, and formal education—presented as proof, not decoration."
      />
      <div className="proof-layout">
        <div className="recognition-list">
          {data.recognition.map((item, index) => (
            <article key={item.title} data-reveal><span>0{index + 1}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></article>
          ))}
        </div>
        <div className="education-list" data-reveal>
          <p className="eyebrow">Education</p>
          {data.education.map((item) => (
            <article key={item.institution}>
              <p>{item.period} · {item.location}</p>
              <h3>{item.institution}</h3>
              <span>{item.degree}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact-section" id="contact">
      <p className="eyebrow" data-reveal>Available for the right problem</p>
      <h2 data-reveal>Let&apos;s build something<br /><em>worth explaining.</em></h2>
      <div className="contact-links" data-reveal>
        <a href={`mailto:${data.email}`}>{data.email} <Arrow /></a>
        <a href={phoneHref}>{data.phone} <Arrow /></a>
        <ExternalLink href={data.links.linkedin}>LinkedIn</ExternalLink>
        <ExternalLink href={data.links.github}>GitHub</ExternalLink>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="footer-brand"><Brand /><span>{data.role}<br />{data.location}</span></div>
      <div className="footer-links">
        <a href="#top">Top ↑</a>
        <a href={`mailto:${data.email}`}>Email <Arrow /></a>
      </div>
      <p>© {new Date().getFullYear()} Sri Krishna</p>
    </footer>
  );
}

function App() {
  useRevealAnimations();
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <Platform />
        <Work />
        <Skills />
        <Proof />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
