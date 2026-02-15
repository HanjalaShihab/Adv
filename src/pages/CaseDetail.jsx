import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { buildApiUrl } from '../api.js'
import { caseHighlights } from '../data/portfolioData.js'

function CaseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [caseData, setCaseData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCase = async () => {
      try {
        // Try to fetch from API first
        const response = await fetch(buildApiUrl(`/api/cases`))
        if (response.ok) {
          const cases = await response.json()
          const found = cases.find((c) => c.id === id)
          if (found) {
            setCaseData(found)
            setLoading(false)
            return
          }
        }
      } catch (error) {
        // Fall back to local data
      }

      // Fall back to local data
      const found = caseHighlights.find(
        (c) => c.id === id || encodeURIComponent(c.title) === id,
      )
      if (found) {
        setCaseData(found)
      }
      setLoading(false)
    }

    loadCase()
  }, [id])

  if (loading) {
    return (
      <div className="page">
        <section className="section">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>লোড হচ্ছে...</p>
          </div>
        </section>
      </div>
    )
  }

  if (!caseData) {
    return (
      <div className="page">
        <section className="section">
          <div className="empty-state">
            <span className="empty-icon">📋</span>
            <h2>মামলা পাওয়া যায়নি</h2>
            <p>দুঃখিত, এই মামলাটি খুঁজে পাওয়া যায়নি।</p>
            <button
              className="button"
              onClick={() => navigate('/projects')}
              type="button"
            >
              মামলায় ফিরে যান
            </button>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="page">
      <section className="section case-detail-section">
        <div className="case-detail-header">
          <button
            className="back-button"
            onClick={() => navigate('/projects')}
            type="button"
            aria-label="ফিরে যান"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            ফিরে যান
          </button>
          <div className="case-header-meta">
            <span className="case-category-badge-large">{caseData.category}</span>
            {caseData.createdAt && (
              <span className="case-date">
                {new Date(caseData.createdAt).toLocaleDateString('bn-BD')}
              </span>
            )}
          </div>
        </div>

        <article className="case-detail-content">
          <h1 className="case-detail-title">{caseData.title}</h1>

          <div className="case-detail-grid">
            <div className="case-detail-main">
              <div className="detail-section">
                <h2>মামলার বিবরণ</h2>
                <p className="detail-text">{caseData.summary}</p>
              </div>

              <div className="detail-section">
                <h2>ফলাফল</h2>
                <div className="result-box">
                  <svg className="result-icon-large" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <p className="result-text">{caseData.outcome}</p>
                </div>
              </div>
            </div>

            <aside className="case-detail-sidebar">
              <div className="sidebar-card">
                <h3>বিভাগ</h3>
                <p className="sidebar-value">{caseData.category}</p>
              </div>

              {caseData.createdAt && (
                <div className="sidebar-card">
                  <h3>যুক্ত তারিখ</h3>
                  <p className="sidebar-value">
                    {new Date(caseData.createdAt).toLocaleDateString('bn-BD', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              )}

              <div className="sidebar-card">
                <h3>অ্যাকশন</h3>
                <button
                  className="button full-width"
                  onClick={() => navigate('/projects')}
                  type="button"
                >
                  সব মামলা দেখুন
                </button>
              </div>
            </aside>
          </div>
        </article>
      </section>
    </div>
  )
}

export default CaseDetail
