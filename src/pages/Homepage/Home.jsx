import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import profilePhoto from '../../assets/manik.jpeg'
import './Home.css'
import { buildApiUrl } from '../../api.js'
import {
  caseHighlights,
  credentials,
  heroStats,
  practiceAreas,
  profile,
  timeline,
  values,
} from '../../data/portfolioData.js'

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

      <section className="section home-profile" id="profile">
        <div className="section-header">
          <h2 className="section-title">প্রোফাইল সারসংক্ষেপ</h2>
          <p className="section-subtitle">
            কৌশল, সহমর্মিতা ও নিয়মিত আপডেটের মাধ্যমে প্রতিটি মামলায় নির্ভরযোগ্য
            নেতৃত্ব নিশ্চিত করা হয়।
          </p>
        </div>
        <div className="home-profile-grid">
          <div className="home-profile-media">
            <div className="profile-photo-frame">
              <img
                className="profile-photo"
                src={profilePhoto}
                alt={`${profile.name} profile`}
              />
            </div>
            <div className="profile-metrics">
              {credentials.slice(0, 3).map((item) => (
                <div key={item.label} className="profile-metric">
                  <span className="profile-metric-label">{item.label}</span>
                  <span className="profile-metric-value">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="home-profile-content">
            <div className="profile-identity">
              <div className="profile-identity-top">
                <div className="profile-badge">MN</div>
                <div>
                  <p className="profile-name">{profile.name}</p>
                  <p className="profile-role">{profile.title}</p>
                </div>
              </div>
            </div>
            <h3 className="home-profile-title">বিশ্বাসযোগ্য আইনি পরামর্শ</h3>
            <p className="profile-lead">
              {profile.name} ({profile.nickname}) প্রতিটি কেসে কৌশলগত চিন্তা,
              নির্ভুল নথিপত্র ও স্পষ্ট যোগাযোগের মাধ্যমে দৃঢ় প্রতিনিধিত্ব
              নিশ্চিত করেন।
            </p>
            <div className="profile-story">
              <h3>প্রোফাইল সারাংশ</h3>
              <p>
                শান্ত আদালত উপস্থিতি ও নিখুঁত ফাইলিংয়ের জন্য পরিচিত মানিক কৌশল ও
                সহমর্মিতার মাধ্যমে ক্লায়েন্টকে সহায়তা করেন। প্রতিটি বিষয়ে স্পষ্ট
                পরিকল্পনা, বাস্তব প্রত্যাশা এবং নিয়মিত আপডেট প্রদান করা হয়।
              </p>
            </div>
            <div className="profile-value-strip">
              <h3>মূল নীতিমালা</h3>
              <ul className="profile-info-list">
                {values.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="home-profile-panels">
          <div className="home-profile-panel">
            <div className="home-panel-header">
              <h3 className="home-panel-title">যোগ্যতা ও অভিজ্ঞতা</h3>
              <p className="home-panel-subtitle">
                অফিসিয়াল তথ্য দিয়ে আপডেট করুন।
              </p>
            </div>
            <div className="profile-credentials-list">
              {credentials.map((item) => (
                <div key={item.label} className="profile-credential-row">
                  <span className="profile-credential-label">{item.label}</span>
                  <span className="profile-credential-value">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="home-profile-panel">
            <div className="home-panel-header">
              <h3 className="home-panel-title">অভিজ্ঞতার টাইমলাইন</h3>
              <p className="home-panel-subtitle">
                পেশাগত জীবনের গুরুত্বপূর্ণ ধাপসমূহ।
              </p>
            </div>
            <div className="timeline profile-timeline">
              {timeline.map((item) => (
                <div key={item.year} className="timeline-item">
                  <div className="timeline-year">{item.year}</div>
                  <div className="timeline-body">
                    <h3>{item.title}</h3>
                    <p>{item.summary}</p>
                  </div>
                </div>
              ))}
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
    </div>
  )
}

export default Home
