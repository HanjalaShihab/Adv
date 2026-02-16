import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { buildApiUrl } from '../../api.js'
import { caseHighlights } from '../../data/portfolioData.js'
import './Projects.css'

function Projects() {
  const navigate = useNavigate()
  const [cases, setCases] = useState(caseHighlights)
  const [activeCategory, setActiveCategory] = useState('সব')
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [sortBy, setSortBy] = useState('latest')
  const [viewMode, setViewMode] = useState('grid')

  const normalizeText = (value) =>
    (value || '')
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/[^\u0980-\u09FFa-z0-9]/g, '')

  useEffect(() => {
    let isMounted = true
    let abortController = new AbortController()

    const loadCases = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        const response = await fetch(buildApiUrl('/api/cases'), {
          signal: abortController.signal,
          headers: { 'Content-Type': 'application/json' },
        })
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        
        const data = await response.json()
        
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setCases(data)
        }
      } catch (error) {
        if (error.name === 'AbortError') return
        console.error('Error loading cases:', error)
        setError('Failed to load cases. Using fallback data.')
        setCases(caseHighlights)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadCases()
    return () => {
      isMounted = false
      abortController.abort()
    }
  }, [])

  const categories = useMemo(() => {
    const unique = Array.from(new Set(cases.map((item) => item.category)))
    return ['সব', ...unique]
  }, [cases])

  const categoryCounts = useMemo(() => {
    const counts = {}
    cases.forEach(item => {
      counts[item.category] = (counts[item.category] || 0) + 1
    })
    return counts
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

    // Apply sorting
    if (sortBy === 'latest') {
      filtered = [...filtered].reverse()
    } else if (sortBy === 'alphabetical') {
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title, 'bn'))
    }

    return filtered
  }, [activeCategory, cases, searchTerm, sortBy])

  const handleCaseClick = (project) => {
    navigate(`/case/${project.id || encodeURIComponent(project.title)}`)
  }

  return (
    <div className="projects-page-container">
      {/* Hero Section */}
      <section className="projects-hero-section">
        <div className="projects-hero-background">
          <div className="projects-orb projects-orb-1"></div>
          <div className="projects-orb projects-orb-2"></div>
          <div className="projects-orb projects-orb-3"></div>
        </div>
        
        <div className="projects-hero-content">
          <span className="projects-hero-tag">⚖️ CASE ARCHIVE</span>
          <h1 className="projects-hero-title">
            মামলার<span className="projects-gradient-text"> সংগ্রহ</span>
          </h1>
          <p className="projects-hero-description">
            কৌশল, স্পষ্টতা ও সফলতার প্রমাণিত ইতিহাস। বিস্তারিত মামলা বিশ্লেষণ 
            এবং ফলাফল দেখুন।
          </p>
          
          <div className="projects-hero-stats">
            <div className="projects-stat-badge">
              <span className="projects-stat-value">{cases.length}</span>
              <span className="projects-stat-label">সর্বমোট মামলা</span>
            </div>
            <div className="projects-stat-badge">
              <span className="projects-stat-value">{categories.length - 1}</span>
              <span className="projects-stat-label">ক্যাটাগরি</span>
            </div>
            <div className="projects-stat-badge">
              <span className="projects-stat-value">{visibleProjects.length}</span>
              <span className="projects-stat-label">প্রদর্শিত</span>
            </div>
          </div>
        </div>
        
        <div className="projects-scroll-indicator">
          <span></span>
        </div>
      </section>

      {/* Controls Section */}
      <section className="projects-controls-section">
        <div className="projects-controls-container">
          <div className="projects-search-wrapper">
            <svg className="projects-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              className="projects-search-input"
              placeholder="মামলা খুঁজুন (টাইটেল, ক্যাটাগরি, ফলাফল)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                type="button"
                className="projects-search-clear"
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <div className="projects-controls-right">
            <div className="projects-sort-wrapper">
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="projects-sort-select"
              >
                <option value="latest">সর্বশেষ</option>
                <option value="alphabetical">বর্ণানুক্রম</option>
              </select>
            </div>

            <div className="projects-view-toggles">
              <button
                className={`projects-view-toggle ${viewMode === 'grid' ? 'projects-active' : ''}`}
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="3" y="3" width="5" height="5" rx="1" fill="currentColor"/>
                  <rect x="12" y="3" width="5" height="5" rx="1" fill="currentColor"/>
                  <rect x="3" y="12" width="5" height="5" rx="1" fill="currentColor"/>
                  <rect x="12" y="12" width="5" height="5" rx="1" fill="currentColor"/>
                </svg>
              </button>
              <button
                className={`projects-view-toggle ${viewMode === 'list' ? 'projects-active' : ''}`}
                onClick={() => setViewMode('list')}
                aria-label="List view"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="3" y="3" width="14" height="2" rx="1" fill="currentColor"/>
                  <rect x="3" y="9" width="14" height="2" rx="1" fill="currentColor"/>
                  <rect x="3" y="15" width="14" height="2" rx="1" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="projects-categories-wrapper">
          <div className="projects-categories-scroll">
            {categories.map((category) => (
              <button
                key={category}
                className={`projects-category-pill ${activeCategory === category ? 'projects-active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                <span className="projects-pill-label">{category}</span>
                <span className="projects-pill-count">
                  {category === 'সব' ? cases.length : categoryCounts[category] || 0}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="projects-results-section">
        {isLoading && (
          <div className="projects-loading-state">
            <div className="projects-loader"></div>
            <p>মামলা লোড হচ্ছে...</p>
          </div>
        )}

        {error && (
          <div className="projects-error-state">
            <span className="projects-error-icon">⚠️</span>
            <h3>{error}</h3>
          </div>
        )}

        {!isLoading && !error && visibleProjects.length === 0 && (
          <div className="projects-empty-state">
            <div className="projects-empty-illustration">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                <circle cx="60" cy="60" r="40" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4"/>
                <path d="M70 70L90 90M50 50L30 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>কোনো মামলা পাওয়া যায়নি</h3>
            <p>অনুসন্ধান শর্ত পরিবর্তন করে আবার চেষ্টা করুন</p>
            <button 
              className="projects-reset-btn"
              onClick={() => {
                setSearchTerm('')
                setActiveCategory('সব')
              }}
            >
              ফিল্টার রিসেট করুন
            </button>
          </div>
        )}

        {!isLoading && !error && visibleProjects.length > 0 && (
          <div className={`projects-cases-container projects-${viewMode}`}>
            {visibleProjects.map((project, index) => (
              <article
                key={project.id || project.title}
                className={`projects-case-item projects-${viewMode}`}
                onClick={() => handleCaseClick(project)}
                style={{ animationDelay: `${index * 0.03}s` }}
              >
                {viewMode === 'grid' ? (
                  // Grid View
                  <>
                    <div className="projects-case-media">
                      <div className="projects-case-category-tag">{project.category}</div>
                      <div className="projects-case-number">#{String(index + 1).padStart(2, '0')}</div>
                    </div>
                    <div className="projects-case-content">
                      <h3 className="projects-case-title">{project.title}</h3>
                      <p className="projects-case-excerpt">{project.summary}</p>
                      <div className="projects-case-meta">
                        <span className="projects-case-outcome">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <polyline points="13 4 6 11 3 8" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                          {project.outcome}
                        </span>
                      </div>
                    </div>
                    <div className="projects-case-hover-indicator"></div>
                  </>
                ) : (
                  // List View
                  <>
                    <div className="projects-list-left">
                      <span className="projects-list-number">#{String(index + 1).padStart(2, '0')}</span>
                      <div className="projects-list-category">{project.category}</div>
                    </div>
                    <div className="projects-list-content">
                      <h3 className="projects-list-title">{project.title}</h3>
                      <p className="projects-list-excerpt">{project.summary}</p>
                      <div className="projects-list-footer">
                        <span className="projects-list-outcome">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <polyline points="13 4 6 11 3 8" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                          {project.outcome}
                        </span>
                        <span className="projects-list-view-details">বিস্তারিত দেখুন →</span>
                      </div>
                    </div>
                  </>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Projects
