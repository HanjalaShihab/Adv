import profilePhoto from '../assets/manik.jpeg'
import { credentials, profile, timeline, values } from '../data/portfolioData.js'

function About() {
  return (
    <div className="page profile-page">
      <section className="profile-hero">
        <div className="profile-media-card">
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

        <div className="profile-hero-content">
          <p className="eyebrow">প্রোফাইল</p>
          <div className="profile-identity">
            <div className="profile-identity-top">
              <div className="profile-badge">MN</div>
              <div>
                <p className="profile-name">{profile.name}</p>
                <p className="profile-role">{profile.title}</p>
              </div>
            </div>
          </div>
          <h1 className="profile-title">বিশ্বাসযোগ্য আইনি পরামর্শ</h1>
          <p className="profile-lead">
            {profile.name} ({profile.nickname}) প্রতিটি কেসে কৌশলগত চিন্তা,
            নির্ভুল নথিপত্র ও স্পষ্ট যোগাযোগের মাধ্যমে দৃঢ় প্রতিনিধিত্ব
            নিশ্চিত করেন।
          </p>
          <div className="profile-story">
            <h3>প্রোফাইল সারাংশ</h3>
            <p>
              শান্ত আদালত উপস্থিতি ও নিখুঁত ফাইলিংয়ের জন্য পরিচিত মানিক
              কৌশল ও সহমর্মিতার মাধ্যমে ক্লায়েন্টকে সহায়তা করেন। প্রতিটি
              বিষয়ে স্পষ্ট পরিকল্পনা, বাস্তব প্রত্যাশা এবং নিয়মিত আপডেট
              প্রদান করা হয়।
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
      </section>

      <section className="profile-section">
        <div className="profile-section-header">
          <h2 className="section-title">যোগ্যতা ও অভিজ্ঞতা</h2>
          <p className="section-subtitle">
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
      </section>

      <section className="profile-section">
        <div className="profile-section-header">
          <h2 className="section-title">অভিজ্ঞতার টাইমলাইন</h2>
          <p className="section-subtitle">
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
      </section>
    </div>
  )
}

export default About
