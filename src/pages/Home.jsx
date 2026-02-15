import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { buildApiUrl } from '../api.js'
import { caseHighlights, heroStats, practiceAreas, profile } from '../data/portfolioData.js'

function Home() {
  const [cases, setCases] = useState(caseHighlights)

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

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-shell">
          <p className="eyebrow">Advocate Profile</p>
          <h1 className="hero-title">{profile.name}</h1>
          <p className="hero-subtitle">
            {profile.nickname} একজন অভিজ্ঞ আইনজীবী। তিনি প্রতিটি ধাপে কৌশলগত মামলা
            পরিচালনা, নির্ভুল ডকুমেন্টেশন ও স্পষ্ট পরামর্শ প্রদান করেন।
          </p>
          <div className="hero-actions">
            <Link className="button" to="/contact">
              পরামর্শের জন্য অনুরোধ করুন
            </Link>
            <Link className="button ghost" to="/projects">
              মামলা দেখুন
            </Link>
          </div>
          <div className="stat-strip">
            {heroStats.map((stat) => (
              <div key={stat.label} className="stat-card">
                <p className="stat-value">{stat.value}</p>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-card">
          <div className="hero-crest">
            <div className="crest-ring"></div>
            <div className="crest-core">MN</div>
            <div className="crest-ray"></div>
          </div>
          <div className="hero-detail">
            <p className="detail-label">প্রধান ক্ষেত্র</p>
            <p className="detail-value">মামলা, পরামর্শ, কমপ্লায়েন্স</p>
            <div className="trust-row">
              <span className="trust-pill">আদালত প্রতিনিধিত্ব</span>
              <span className="trust-pill">গোপনীয় পরামর্শ</span>
              <span className="trust-pill">ক্লায়েন্ট অগ্রাধিকার</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2 className="section-title">প্র্যাকটিস এরিয়া</h2>
          <p className="section-subtitle">
            সিভিল, ফৌজদারি ও করপোরেট বিষয়ে বিশেষায়িত সহায়তা।
          </p>
        </div>
        <div className="practice-grid">
          {practiceAreas.map((area) => (
            <div key={area.title} className="practice-card">
              <h3>{area.title}</h3>
              <p>{area.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2 className="section-title">কেস হাইলাইটস</h2>
          <p className="section-subtitle">
            সাম্প্রতিক মামলার কৌশল ও ফলাফলের সংক্ষিপ্ত নমুনা।
          </p>
        </div>
        <div className="case-grid">
          {cases.slice(0, 4).map((item) => (
            <div key={item.id || item.title} className="case-card">
              <div className="case-tag">{item.category}</div>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <span className="case-outcome">{item.outcome}</span>
            </div>
          ))}
        </div>
        <div className="section-actions">
          <Link className="button" to="/projects">
            সব মামলা দেখুন
          </Link>
        </div>
      </section>

      <section className="cta-banner">
        <div>
          <p className="eyebrow">শুরু করতে প্রস্তুত</p>
          <h2 className="cta-title">গোপনীয় পরামর্শের সময় নির্ধারণ করুন</h2>
          <p className="cta-subtitle">
            আপনার বিষয়টি জানান, সামনে এগোনোর পথ স্পষ্ট হবে।
          </p>
        </div>
        <Link className="button" to="/contact">
          মানিকের সাথে যোগাযোগ
        </Link>
      </section>
    </div>
  )
}

export default Home
