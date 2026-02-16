import { profile, timeline, credentials, values, practiceAreas, testimonials } from '../../data/portfolioData.js'
import './About.css'

function About() {
  return (
    <div className="about-page-wrapper">
      {/* Hero Section */}
      <section className="about-hero-section">
        <div className="about-hero-background">
          <div className="about-orb about-orb-1"></div>
          <div className="about-orb about-orb-2"></div>
          <div className="about-orb about-orb-3"></div>
        </div>
        
        <div className="about-hero-content">
          <span className="about-hero-tag">📚 ABOUT ME</span>
          <h1 className="about-hero-title">
            {profile.name}<span className="about-gradient-text"> - {profile.title}</span>
          </h1>
          <p className="about-hero-description">
            ১২+ বছরের অভিজ্ঞতায় সিভিল, ফৌজদারি, পারিবারিক, করপোরেট এবং সাংবিধানিক মামলায় 
            কৌশলগত প্রতিনিধিত্ব। প্রতিটি ক্লায়েন্টের অধিকার রক্ষায় নিবেদিত।
          </p>
        </div>
        
        <div className="about-scroll-indicator">
          <span></span>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="about-intro-section">
        <div className="about-intro-container">
          <div className="about-intro-content">
            <div className="about-intro-header">
              <span className="about-section-tag">● পরিচয়</span>
              <h2 className="about-section-title">
                আমার পেশাগত<br />
                <span className="about-gradient">পরিচয় ও লক্ষ্য</span>
              </h2>
            </div>
            <p className="about-intro-text">
              আইনি পরামর্শ শুধু মামলা জেতা নয়—এটি ক্লায়েন্টের স্বার্থ ও অধিকার রক্ষা করা। 
              প্রতিটি বিষয়ে গভীর বিশ্লেষণ, স্বচ্ছ যোগাযোগ ও সময়মত পদক্ষেপের মাধ্যমে সর্বোত্তম ফলাফল নিশ্চিত করি।
            </p>
            <div className="about-highlights">
              <div className="about-highlight-item">
                <span className="about-highlight-number">১২+</span>
                <span className="about-highlight-label">বছরের অভিজ্ঞতা</span>
              </div>
              <div className="about-highlight-item">
                <span className="about-highlight-number">৫২০+</span>
                <span className="about-highlight-label">সফল মামলা পরিচালনা</span>
              </div>
              <div className="about-highlight-item">
                <span className="about-highlight-number">৯৭%</span>
                <span className="about-highlight-label">ক্লায়েন্ট সন্তুষ্টি</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Journey */}
      <section className="about-timeline-section">
        <div className="about-timeline-container">
          <div className="about-timeline-header">
            <span className="about-section-tag">● পেশাগত যাত্রা</span>
            <h2 className="about-section-title">
              অভিজ্ঞতা<br />
            </h2>
          </div>

          <div className="about-timeline-items">
            {timeline.map((item, index) => (
              <div key={item.year} className={`about-timeline-item about-timeline-${index % 2 === 0 ? 'left' : 'right'}`}>
                <div className="about-timeline-dot"></div>
                <div className="about-timeline-content">
                  <span className="about-timeline-year">{item.year}</span>
                  <h3 className="about-timeline-title">{item.title}</h3>
                  <p className="about-timeline-summary">{item.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="about-practice-section">
        <div className="about-practice-container">
          <div className="about-practice-header">
            <span className="about-section-tag">● বিশেষত্ব</span>
            <h2 className="about-section-title">
              প্র্যাকটিস<br />
              <span className="about-gradient">এরিয়া</span>
            </h2>
          </div>

          <div className="about-practice-grid">
            {practiceAreas.map((area, index) => (
              <div key={area.title} className="about-practice-card">
                <div className="about-practice-icon">
                  {index === 0 && '⚖️'}
                  {index === 1 && '🔒'}
                  {index === 2 && '👨‍👩‍👧'}
                  {index === 3 && '🏠'}
                  {index === 4 && '🏢'}
                  {index === 5 && '📜'}
                </div>
                <h3 className="about-practice-title">{area.title}</h3>
                <p className="about-practice-description">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials & Education */}
      <section className="about-credentials-section">
        <div className="about-credentials-container">
          <div className="about-credentials-header">
            <span className="about-section-tag">● যোগ্যতা</span>
            <h2 className="about-section-title">
              শিক্ষা ও<br />
              <span className="about-gradient">সার্টিফিকেশন</span>
            </h2>
          </div>

          <div className="about-credentials-grid">
            {credentials.map((cred) => (
              <div key={cred.label} className="about-credential-item">
                <div className="about-credential-icon">📜</div>
                <h3 className="about-credential-label">{cred.label}</h3>
                <p className="about-credential-value">{cred.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values & Principles */}
      <section className="about-values-section">
        <div className="about-values-container">
          <div className="about-values-header">
            <span className="about-section-tag">● নীতি</span>
            <h2 className="about-section-title">
              মূল<br />
              <span className="about-gradient">নীতিমালা</span>
            </h2>
            <p className="about-values-subtitle">
              প্রতিটি কাজে যা অনুসরণ করি
            </p>
          </div>

          <div className="about-values-list">
            {values.map((value) => (
              <div key={value} className="about-value-item">
                <div className="about-value-icon">✓</div>
                <p className="about-value-text">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="about-testimonials-section">
        <div className="about-testimonials-container">
          <div className="about-testimonials-header">
            <span className="about-section-tag">● মতামত</span>
            <h2 className="about-section-title">
              ক্লায়েন্ট<br />
              <span className="about-gradient">পর্যালোচনা</span>
            </h2>
          </div>

          <div className="about-testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="about-testimonial-card">
                <div className="about-testimonial-stars">★ ★ ★ ★ ★</div>
                <blockquote className="about-testimonial-quote">
                  "{testimonial.quote}"
                </blockquote>
                <div className="about-testimonial-author">
                  <h4 className="about-testimonial-name">{testimonial.name}</h4>
                  <p className="about-testimonial-detail">{testimonial.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta-section">
        <div className="about-cta-container">
          <h2 className="about-cta-title">
            আইনি সহায়তা<br />
            <span className="about-gradient">প্রয়োজন?</span>
          </h2>
          <p className="about-cta-description">
            আপনার মামলা নিয়ে বিস্তারিত পরামর্শের জন্য আজই যোগাযোগ করুন।
          </p>
          <a href="/contact" className="about-cta-button">
            সরাসরি যোগাযোগ করুন
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4.16666 10H15.8333M15.8333 10L11.6667 5.83333M15.8333 10L11.6667 14.1667" 
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </section>
    </div>
  )
}

export default About
