import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
]

function Layout() {
  return (
    <div className="app">
      <header className="site-header">
        <div className="brand">
          <div className="brand-mark">AO</div>
          <div>
            <p className="brand-name">Ava Ortiz</p>
            <p className="brand-tag">Product Designer + Frontend</p>
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
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <NavLink to="/contact" className="button ghost">
            Lets Talk
          </NavLink>
        </div>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div>
          <p className="footer-title">Ava Ortiz</p>
          <p className="footer-text">Building calm, capable digital spaces.</p>
        </div>
        <div className="footer-meta">
          <span>Based in Lisbon</span>
          <span>Available April 2026</span>
        </div>
      </footer>
    </div>
  )
}

export default Layout
