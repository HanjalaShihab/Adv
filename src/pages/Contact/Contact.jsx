import { useState } from 'react'
import { contactInfo, faqs } from '../../data/portfolioData.js'
import './Contact.css'

const defaultForm = {
  name: '',
  email: '',
  caseType: '',
  message: '',
}

const CONTACT_FORM_ENDPOINT_RAW =
  import.meta.env.VITE_CONTACT_FORM_ENDPOINT || 'GZbdmgoX9'
const CONTACT_FORM_ENDPOINT = CONTACT_FORM_ENDPOINT_RAW.startsWith('http')
  ? CONTACT_FORM_ENDPOINT_RAW
  : `https://formcarry.com/s/${CONTACT_FORM_ENDPOINT_RAW}`
const CONTACT_FORM_SUBJECT = 'New Consultation Request - Website'

function Contact() {
  const [formValues, setFormValues] = useState(defaultForm)
  const [status, setStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeFaq, setActiveFaq] = useState(null)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isSubmitting) return

    setIsSubmitting(true)
    setStatus('')

    try {
      const response = await fetch(CONTACT_FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ...formValues,
          _subject: CONTACT_FORM_SUBJECT,
          source: 'website-contact-form',
          _replyto: formValues.email,
        }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        const errorMessage =
          data?.errors?.[0]?.message || data?.error || data?.message || 'অনুরোধ পাঠানো যায়নি।'
        throw new Error(errorMessage)
      }

      setStatus('✅ অনুরোধ গ্রহণ করা হয়েছে। দুই কর্মদিবসের মধ্যে উত্তর দেওয়া হবে।')
      setFormValues(defaultForm)
      setTimeout(() => setStatus(''), 5000)
    } catch (error) {
      setStatus(`❌ ${error.message || 'সার্ভারের সাথে যোগাযোগ করা যায়নি।'}`)
      setTimeout(() => setStatus(''), 6000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(contactInfo.email)
      setStatus('📋 ইমেইল কপি হয়েছে!')
      setTimeout(() => setStatus(''), 3000)
    } catch (error) {
      setStatus(`❌ কপি ব্যর্থ হয়েছে। অনুগ্রহ করে ইমেইল করুন: ${contactInfo.email}`)
      setTimeout(() => setStatus(''), 4000)
    }
  }

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  return (
    <div className="contact-page-wrapper">
      {/* Hero Section */}
      <section className="contact-hero-section">
        <div className="contact-hero-background">
          <div className="contact-orb contact-orb-1"></div>
          <div className="contact-orb contact-orb-2"></div>
          <div className="contact-orb contact-orb-3"></div>
        </div>
        
        <div className="contact-hero-content">
          <span className="contact-hero-tag">📞 GET IN TOUCH</span>
          <h1 className="contact-hero-title">
            আমার সাথে<span className="contact-gradient-text"> পরামর্শ করুন</span>
          </h1>
          <p className="contact-hero-description">
            আইনি পরামর্শ প্রয়োজন? আজই যোগাযোগ করুন। দ্রুত পর্যালোচনার জন্য 
            সংশ্লিষ্ট ডকুমেন্ট, মামলা নম্বর ও গুরুত্বপূর্ণ তারিখ দিন।
          </p>
        </div>
        
        <div className="contact-scroll-indicator">
          <span></span>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="contact-main-section">
        <div className="contact-grid-container">
          {/* Contact Info Card */}
          <div className="contact-info-card">
            <div className="contact-info-header">
              <div className="contact-info-icon">📋</div>
              <h3 className="contact-info-title">যোগাযোগের ঠিকানা</h3>
              <p className="contact-info-note">
                নিচের যেকোনো মাধ্যমে সরাসরি যোগাযোগ করুন। অফিস সময়ে দ্রুত সাড়া দেওয়া হয়।
              </p>
            </div>

            <div className="contact-details-list">
              <div className="contact-detail-item">
                <div className="contact-detail-label">
                  <span className="contact-detail-icon">📧</span>
                  ইমেইল
                </div>
                <div className="contact-detail-value-wrapper">
                  <span className="contact-detail-value">{contactInfo.email}</span>
                  <button 
                    type="button" 
                    className="contact-copy-btn"
                    onClick={handleCopy}
                    aria-label="Copy email"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-detail-label">
                  <span className="contact-detail-icon">📱</span>
                  ফোন
                </div>
                <div className="contact-detail-value">{contactInfo.phone}</div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-detail-label">
                  <span className="contact-detail-icon">🏢</span>
                  অফিস
                </div>
                <div className="contact-detail-value">{contactInfo.office}</div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-detail-label">
                  <span className="contact-detail-icon">⏰</span>
                  সময়সূচি
                </div>
                <div className="contact-detail-value">{contactInfo.hours}</div>
              </div>
            </div>

            <div className="contact-social-links">
              <span className="contact-social-label">সামাজিক যোগাযোগ:</span>
              <div className="contact-social-icons">
                <a href="#" className="contact-social-icon" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <a href="#" className="contact-social-icon" aria-label="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
                <a href="#" className="contact-social-icon" aria-label="Twitter">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="contact-form-card" onSubmit={handleSubmit}>
            <div className="contact-form-header">
              <h3 className="contact-form-title">পরামর্শের জন্য অনুরোধ</h3>
              <p className="contact-form-subtitle">
                নিচের ফর্ম পূরণ করুন। আমাদের টিম শীঘ্রই আপনার সাথে যোগাযোগ করবে।
              </p>
            </div>

            <div className="contact-form-fields">
              <div className="contact-field-group">
                <label className="contact-field-label">
                  <span className="contact-field-text">নাম</span>
                  <span className="contact-required">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  placeholder="আপনার পূর্ণ নাম"
                  required
                  className="contact-field-input"
                />
              </div>

              <div className="contact-field-group">
                <label className="contact-field-label">
                  <span className="contact-field-text">ইমেইল</span>
                  <span className="contact-required">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  placeholder="you@email.com"
                  required
                  className="contact-field-input"
                />
              </div>

              <div className="contact-field-group">
                <label className="contact-field-label">
                  <span className="contact-field-text">মামলার ধরন</span>
                </label>
                <input
                  type="text"
                  name="caseType"
                  value={formValues.caseType}
                  onChange={handleChange}
                  placeholder="সিভিল, ফৌজদারি, করপোরেট ইত্যাদি"
                  className="contact-field-input"
                />
              </div>

              <div className="contact-field-group">
                <label className="contact-field-label">
                  <span className="contact-field-text">মামলার সারাংশ</span>
                  <span className="contact-required">*</span>
                </label>
                <textarea
                  name="message"
                  value={formValues.message}
                  onChange={handleChange}
                  placeholder="মূল বিষয় ও গুরুত্বপূর্ণ তারিখ লিখুন।"
                  rows={5}
                  required
                  className="contact-field-textarea"
                />
              </div>
            </div>

            <div className="contact-form-footer">
              <button type="submit" className="contact-submit-btn" disabled={isSubmitting}>
                <span>{isSubmitting ? 'পাঠানো হচ্ছে...' : 'পরামর্শের অনুরোধ পাঠান'}</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4.16666 10H15.8333M15.8333 10L11.6667 5.83333M15.8333 10L11.6667 14.1667" 
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </form>
        </div>

        {/* Status Message */}
        {status && (
          <div className="contact-status-message">
            {status}
          </div>
        )}
      </section>

      {/* FAQ Section */}
      <section className="contact-faq-section">
        <div className="contact-faq-header">
          <span className="contact-faq-tag">📌 FAQ</span>
          <h2 className="contact-faq-title">
            পরামর্শ সম্পর্কিত<span className="contact-gradient-text"> প্রশ্ন</span>
          </h2>
          <p className="contact-faq-subtitle">
            সাধারণ প্রশ্নের দ্রুত উত্তর। আরও জানতে আমাদের সাথে যোগাযোগ করুন।
          </p>
        </div>

        <div className="contact-faq-grid">
          {faqs.map((item, index) => (
            <div 
              key={item.question} 
              className={`contact-faq-item ${activeFaq === index ? 'contact-active' : ''}`}
              onClick={() => toggleFaq(index)}
            >
              <div className="contact-faq-question">
                <h3>{item.question}</h3>
                <span className="contact-faq-icon">
                  {activeFaq === index ? '−' : '+'}
                </span>
              </div>
              <div className="contact-faq-answer">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Map Section */}
      <section className="contact-map-section">
        <div className="contact-map-container">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3630.5237836477826!2d91.1740857!3d23.4660769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37547fa76a19c7f9%3A0x5f616ebc83d2611b!2sCumilla%20District%20Bar%20Association!5e0!3m2!1sen!2sbd!4v1234567890" 
            width="100%" 
            height="100%" 
            style={{ border: 0, borderRadius: '40px 0 0 40px' }}
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  )
}

export default Contact
