import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="page">
      <section className="section">
        <div className="empty-state">
          <p className="eyebrow">404</p>
          <h1 className="section-title">এই পৃষ্ঠাটি পাওয়া যায়নি</h1>
          <p className="section-subtitle">
            আবার মূল পাতায় ফিরে যান।
          </p>
          <Link className="button" to="/">
            হোমে ফিরুন
          </Link>
        </div>
      </section>
    </div>
  )
}

export default NotFound
