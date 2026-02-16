import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { buildApiUrl } from '../../api.js'
import { caseHighlights } from '../../data/portfolioData.js'

function Projects() {
  const navigate = useNavigate()
  const [cases, setCases] = useState(caseHighlights)
  const [activeCategory, setActiveCategory] = useState('সব')
  const [searchTerm, setSearchTerm] = useState('')

  const normalizeText = (value) =>
    (value || '')
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/[^\u0980-\u09FFa-z0-9]/g, '')

  useEffect(() => {
    let isMounted = true

    const loadCases = async () => {
      try {
        const response = await fetch(buildApiUrl('/api/cases'))
        if (!response.ok) {
          return
        }
        const data = await response.json()
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setCases(data)
        }
      } catch (error) {
        // Keep fallback data when API is unavailable.
      }
    }

    loadCases()
    return () => {
      isMounted = false
    }
  }, [])

  const categories = useMemo(() => {
    const unique = Array.from(new Set(cases.map((item) => item.category)))
    return ['সব', ...unique]
  }, [cases])

  const visibleProjects = useMemo(() => {
    let filtered = cases

    if (activeCategory !== 'সব') {
      filtered = filtered.filter(
        (project) => project.category === activeCategory,
      )
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim()
      const normalizedTerm = normalizeText(term)
      filtered = filtered.filter((project) => {
        const title = (project.title || '').toLowerCase()
        const summary = (project.summary || '').toLowerCase()
        const outcome = (project.outcome || '').toLowerCase()
        const category = (project.category || '').toLowerCase()

        const normalizedTitle = normalizeText(title)
        const normalizedSummary = normalizeText(summary)
        const normalizedOutcome = normalizeText(outcome)
        const normalizedCategory = normalizeText(category)

        const matchesNormalized =
          normalizedTitle.includes(normalizedTerm) ||
          normalizedSummary.includes(normalizedTerm) ||
          normalizedOutcome.includes(normalizedTerm) ||
          normalizedCategory.includes(normalizedTerm)

        return (
          title.includes(term) ||
          summary.includes(term) ||
          outcome.includes(term) ||
          category.includes(term) ||
          (normalizedTerm && matchesNormalized)
        )
      })
    }

    return filtered
  }, [activeCategory, cases, searchTerm])

  return (
    <div className="page">
      <section className="section cases-section">
        <div className="cases-header">
          <div className="cases-header-content">
            <h1 className="cases-title">মামলার সংগ্রহ</h1>
            <p className="cases-subtitle">
              কৌশল, স্পষ্টতা ও সফলতার প্রমাণিত ইতিহাস
            </p>
            <div className="cases-stats">
              <div className="stat-item">
                <span className="stat-number">{cases.length}</span>
                <span className="stat-label">সর্বমোট মামলা</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{categories.length - 1}</span>
                <span className="stat-label">ক্যাটাগরি</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{visibleProjects.length}</span>
                <span className="stat-label">প্রদর্শিত</span>
              </div>
            </div>
          </div>
        </div>

        <div className="cases-controls">
          <div className="search-box">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="মামলা খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                type="button"
                className="search-clear"
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
          <div className="filter-chips">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={
                  activeCategory === category
                    ? 'filter-chip active'
                    : 'filter-chip'
                }
                onClick={() => setActiveCategory(category)}
              >
                <span className="chip-label">{category}</span>
                <span className="chip-count">
                  {category === 'সব'
                    ? cases.length
                    : cases.filter((c) => c.category === category).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {visibleProjects.length === 0 ? (
          <div className="empty-results">
            <span className="empty-icon">🔍</span>
            <h3>কোনো মামলা পাওয়া যায়নি</h3>
            <p>অনুসন্ধান শর্ত পরিবর্তন করে আবার চেষ্টা করুন</p>
          </div>
        ) : (
          <div className="cases-grid">
            {visibleProjects.map((project, index) => (
              <article
                key={project.id || project.title}
                className="case-card-modern"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="case-card-header">
                  <span className="case-category-badge">{project.category}</span>
                  <span className="case-number">
                    #{(index + 1).toString().padStart(2, '0')}
                  </span>
                </div>
                <h3 className="case-title-modern">{project.title}</h3>
                <p className="case-summary">{project.summary}</p>
                <div className="case-footer-modern">
                  <div className="case-result">
                    <svg className="result-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>{project.outcome}</span>
                  </div>
                  <button
                    className="case-details-btn"
                    type="button"
                    onClick={() =>
                      navigate(`/case/${project.id || encodeURIComponent(project.title)}`)
                    }
                  >
                    বিস্তারিত
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Projects
