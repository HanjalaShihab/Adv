import { useState } from 'react'
import { contactInfo, faqs, profile } from '../data/portfolioData.js'

const defaultForm = {
  name: '',
  email: '',
  caseType: '',
  message: '',
}

function Contact() {
  const [formValues, setFormValues] = useState(defaultForm)
  const [status, setStatus] = useState('পরামর্শের সময় অ্যাপয়েন্টমেন্ট নির্ধারণ হয়।')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus('অনুরোধ গ্রহণ করা হয়েছে। দুই কর্মদিবসের মধ্যে উত্তর দেওয়া হবে।')
    setFormValues(defaultForm)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(contactInfo.email)
      setStatus('ইমেইল কপি হয়েছে।')
    } catch (error) {
      setStatus(`কপি ব্যর্থ হয়েছে। অনুগ্রহ করে ইমেইল করুন: ${contactInfo.email}`)
    }
  }

  return (
    <div className="page">
      <section className="section">
        <div className="section-header">
          <h1 className="section-title">{profile.nickname} এর সাথে পরামর্শ করুন</h1>
          <p className="section-subtitle">
            প্রয়োজনীয় তথ্য দিন, আমরা পরবর্তী ধাপ সম্পর্কে জানাব।
          </p>
        </div>
        <div className="contact-grid">
          <div className="contact-card">
            <h3>অফিস তথ্য</h3>
            <p>
              দ্রুত পর্যালোচনার জন্য সংশ্লিষ্ট ডকুমেন্ট, মামলা নম্বর ও গুরুত্বপূর্ণ
              তারিখ দিন।
            </p>
            <div className="contact-stack">
              <button type="button" className="button" onClick={handleCopy}>
                ইমেইল কপি করুন
              </button>
              <div className="contact-info">
                <p className="contact-label">ইমেইল</p>
                <p className="contact-value">{contactInfo.email}</p>
              </div>
              <div className="contact-info">
                <p className="contact-label">ফোন</p>
                <p className="contact-value">{contactInfo.phone}</p>
              </div>
              <div className="contact-info">
                <p className="contact-label">অফিস</p>
                <p className="contact-value">{contactInfo.office}</p>
              </div>
              <div className="contact-info">
                <p className="contact-label">সময়সূচি</p>
                <p className="contact-value">{contactInfo.hours}</p>
              </div>
            </div>
          </div>
          <form className="contact-card form" onSubmit={handleSubmit}>
            <label className="input-group">
              <span>নাম</span>
              <input
                name="name"
                value={formValues.name}
                onChange={handleChange}
                placeholder="আপনার পূর্ণ নাম"
                required
              />
            </label>
            <label className="input-group">
              <span>ইমেইল</span>
              <input
                name="email"
                type="email"
                value={formValues.email}
                onChange={handleChange}
                placeholder="you@email.com"
                required
              />
            </label>
            <label className="input-group">
              <span>মামলার ধরন</span>
              <input
                name="caseType"
                value={formValues.caseType || ''}
                onChange={handleChange}
                placeholder="সিভিল, ফৌজদারি, করপোরেট ইত্যাদি"
              />
            </label>
            <label className="input-group">
              <span>মামলার সারাংশ</span>
              <textarea
                name="message"
                value={formValues.message}
                onChange={handleChange}
                placeholder="মূল বিষয় ও গুরুত্বপূর্ণ তারিখ লিখুন।"
                rows={5}
                required
              />
            </label>
            <button type="submit" className="button">
              পরামর্শের অনুরোধ পাঠান
            </button>
          </form>
        </div>
        <div className="status-pill">{status}</div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2 className="section-title">পরামর্শ সম্পর্কিত প্রশ্ন</h2>
          <p className="section-subtitle">সাধারণ প্রশ্নের দ্রুত উত্তর।</p>
        </div>
        <div className="faq-list">
          {faqs.map((item) => (
            <div key={item.question} className="faq-item">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Contact
