import { credentials, profile, timeline, values } from '../data/portfolioData.js'

function About() {
  return (
    <div className="page">
      <section className="section">
        <div className="section-header">
          <h1 className="section-title">বিশ্বাসযোগ্য আইনি পরামর্শ</h1>
          <p className="section-subtitle">
            {profile.name} ({profile.nickname}) নির্ভুল ও বিশ্বাসযোগ্য
            মামলা প্রস্তুতির মাধ্যমে দৃঢ় প্রতিনিধিত্ব প্রদান করেন।
          </p>
        </div>
        <div className="grid two">
          <div className="card">
            <h3>প্রোফাইল</h3>
            <p>
              শান্ত আদালত উপস্থিতি ও নিখুঁত ফাইলিংয়ের জন্য পরিচিত মানিক
              কৌশল ও সহমর্মিতার মাধ্যমে ক্লায়েন্টকে সহায়তা করেন।
            </p>
            <p>
              প্রতিটি বিষয়ে স্পষ্ট পরিকল্পনা, বাস্তব প্রত্যাশা এবং নিয়মিত
              আপডেট প্রদান করা হয়।
            </p>
          </div>
          <div className="card highlight">
            <h3>মূল নীতিমালা</h3>
            <ul className="list">
              {values.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2 className="section-title">যোগ্যতা</h2>
          <p className="section-subtitle">
            অফিসিয়াল তথ্য দিয়ে আপডেট করুন।
          </p>
        </div>
        <div className="grid two">
          {credentials.map((item) => (
            <div key={item.label} className="card">
              <p className="detail-label">{item.label}</p>
              <p className="detail-value">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2 className="section-title">অভিজ্ঞতার টাইমলাইন</h2>
          <p className="section-subtitle">
            পেশাগত জীবনের গুরুত্বপূর্ণ ধাপসমূহ।
          </p>
        </div>
        <div className="timeline">
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
