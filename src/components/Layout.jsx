import { useState, useRef } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { profile } from '../data/portfolioData.js'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Cases' },
  { to: '/contact', label: 'Consultation' },
]

function Layout() {
  const navigate = useNavigate()
  const [clickCount, setClickCount] = useState(0)
  const clickTimer = useRef(null)
  const currentYear = new Date().getFullYear()

  const handleCasesClick = (e) => {
    // Secret trigger: Click "Cases" 4 times quickly to access admin
    if (e.target.getAttribute('href') === '/projects') {
      const newCount = clickCount + 1
      setClickCount(newCount)

      // Clear existing timer
      if (clickTimer.current) {
        clearTimeout(clickTimer.current)
      }

      // Reset counter after 2 seconds of no clicks
      clickTimer.current = setTimeout(() => {
        setClickCount(0)
      }, 2000)

      // Navigate to admin after 4 clicks
      if (newCount >= 4) {
        e.preventDefault()
        setClickCount(0)
        clearTimeout(clickTimer.current)
        navigate('/admin')
      }
    }
  }

  return (
    <div className="app">
      <header className="site-header">
        <div className="brand">
          <div className="brand-mark">MN</div>
          <div>
            <p className="brand-name">{profile.name}</p>
            <p className="brand-tag">{profile.title}</p>
          </div>
        </div>
        <nav className="nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
              onClick={item.label === 'Cases' ? handleCasesClick : undefined}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <NavLink to="/contact" className="button ghost">
            পরামর্শের সময় নিন
          </NavLink>
        </div>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-mark">MN</div>
            <div>
              <p className="footer-title">{profile.name}</p>
              <p className="footer-text">{profile.title}</p>
            </div>
          </div>
          <div className="footer-links">
            <p className="footer-label">Quick Links</p>
            <div className="footer-list">
              {navItems.map((item) => (
                <NavLink key={item.to} to={item.to} className="footer-link">
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="footer-info">
            <p className="footer-label">Office</p>
            <p className="footer-meta">{profile.location}</p>
            <p className="footer-meta">Appointment only</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{currentYear} . Made with ❤️ by Hanjala</span>
          <span>Case strategy and client-first guidance.</span>
        </div>
      </footer>
    </div>
  )
}

export default Layout
