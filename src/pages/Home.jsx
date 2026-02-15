import { Link } from 'react-router-dom'
import { heroStats, projects, services } from '../data/portfolioData.js'

function Home() {
  return (
    <div className="page">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Portfolio 2026</p>
          <h1 className="hero-title">
            Designing products with clarity, warmth, and electric momentum.
          </h1>
          <p className="hero-subtitle">
            I partner with teams to translate complexity into interactive systems
            that feel effortless. Strategy meets craft, and the details stay kind.
          </p>
          <div className="hero-actions">
            <Link className="button" to="/projects">
              View Projects
            </Link>
            <Link className="button ghost" to="/contact">
              Start a Collaboration
            </Link>
          </div>
          <div className="hero-stats">
            {heroStats.map((stat) => (
              <div key={stat.label} className="stat-card">
                <p className="stat-value">{stat.value}</p>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-panel">
          <div className="hero-orbit">
            <div className="orbit-ring"></div>
            <div className="orbit-ring second"></div>
            <div className="orbit-core">
              <p>Strategy</p>
              <p>Design</p>
              <p>Build</p>
            </div>
          </div>
          <div className="hero-note">
            <p className="note-title">Current Focus</p>
            <p className="note-text">
              Building modular product shells for fast-moving AI teams.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Signature Services</h2>
          <p className="section-subtitle">
            Thoughtful structure, intentional motion, and systems that scale.
          </p>
        </div>
        <div className="grid three">
          {services.map((service) => (
            <div key={service.title} className="card">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Selected Work</h2>
          <p className="section-subtitle">
            Projects that blend rigor, emotion, and measurable results.
          </p>
        </div>
        <div className="grid two">
          {projects.slice(0, 4).map((project) => (
            <div key={project.title} className="project-card">
              <div className="project-tag">{project.category}</div>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <span className="project-impact">{project.impact}</span>
            </div>
          ))}
        </div>
        <div className="section-actions">
          <Link className="button" to="/projects">
            Explore All Projects
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
