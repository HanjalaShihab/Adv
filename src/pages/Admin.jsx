import { useEffect, useMemo, useState } from 'react'
import { buildApiUrl } from '../api.js'
import './Admin.css'

const emptyCase = {
  title: '',
  category: '',
  summary: '',
  outcome: '',
}

const emptyCredentials = {
  username: '',
  password: '',
}

function Admin() {
  const [credentials, setCredentials] = useState(emptyCredentials)
  const [token, setToken] = useState(
    () => localStorage.getItem('adminToken') || '',
  )
  const [cases, setCases] = useState([])
  const [formValues, setFormValues] = useState(emptyCase)
  const [editingId, setEditingId] = useState(null)
  const [status, setStatus] = useState('')

  const isAuthed = useMemo(() => Boolean(token), [token])

  const loadCases = async () => {
    try {
      const response = await fetch(buildApiUrl('/api/cases'))
      if (!response.ok) {
        return
      }
      const data = await response.json()
      if (Array.isArray(data)) {
        setCases(data)
      }
    } catch (error) {
      setStatus('কেস লোড করা যায়নি।')
    }
  }

  useEffect(() => {
    loadCases()
  }, [])

  const handleCredentialChange = (event) => {
    const { name, value } = event.target
    setCredentials((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    setStatus('')

    try {
      const response = await fetch(buildApiUrl('/api/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        setStatus('লগইন ব্যর্থ হয়েছে।')
        return
      }

      const data = await response.json()
      if (data?.token) {
        localStorage.setItem('adminToken', data.token)
        setToken(data.token)
        setCredentials(emptyCredentials)
        setStatus('লগইন সফল হয়েছে।')
      }
    } catch (error) {
      setStatus('লগইন সার্ভিস পাওয়া যাচ্ছে না।')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    setToken('')
    setStatus('লগআউট করা হয়েছে।')
  }

  const handleCaseChange = (event) => {
    const { name, value } = event.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddCase = async (event) => {
    event.preventDefault()
    setStatus('')

    try {
      const url = editingId 
        ? buildApiUrl(`/api/cases/${editingId}`)
        : buildApiUrl('/api/cases')
      
      const method = editingId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formValues),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        setStatus(editingId ? 'কেস আপডেট করা যায়নি।' : 'কেস যোগ করা যায়নি।')
        return
      }

      const responseData = await response.json()

      setFormValues(emptyCase)
      setEditingId(null)
      setStatus(editingId ? 'কেস আপডেট হয়েছে।' : 'কেস যোগ হয়েছে।')
      await loadCases()
    } catch (error) {
      setStatus('কেস সংরক্ষণ করা যায়নি।')
    }
  }

  const handleEditCase = (caseItem) => {
    setFormValues({
      title: caseItem.title,
      category: caseItem.category,
      summary: caseItem.summary,
      outcome: caseItem.outcome,
    })
    setEditingId(caseItem.id)
    setStatus('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelEdit = () => {
    setFormValues(emptyCase)
    setEditingId(null)
    setStatus('')
  }

  const handleDeleteCase = async (caseId) => {
    try {
      const response = await fetch(buildApiUrl(`/api/cases/${caseId}`), {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        setStatus('কেস মুছে ফেলা যায়নি।')
        return
      }

      setStatus('কেস মুছে ফেলা হয়েছে।')
      loadCases()
    } catch (error) {
      setStatus('কেস মুছে ফেলা যায়নি।')
    }
  }

  return (
    <div className="page">
      <section className="section admin-panel">
        {!isAuthed ? (
          <div className="admin-login-wrapper">
            <div className="admin-login-card">
              <div className="admin-login-header">
                <div className="admin-logo">⚖</div>
                <h1>অ্যাডমিন প্যানেল</h1>
                <p>প্রবেশ করতে আপনার পরিচয় যাচাই করুন</p>
              </div>
              <form className="admin-login-form" onSubmit={handleLogin}>
                <label className="input-group">
                  <span>ইউজারনেম</span>
                  <input
                    name="username"
                    value={credentials.username}
                    onChange={handleCredentialChange}
                    placeholder="ইউজারনেম লিখুন"
                    required
                  />
                </label>
                <label className="input-group">
                  <span>পাসওয়ার্ড</span>
                  <input
                    name="password"
                    type="password"
                    value={credentials.password}
                    onChange={handleCredentialChange}
                    placeholder="পাসওয়ার্ড লিখুন"
                    required
                  />
                </label>
                <button type="submit" className="button admin-login-btn">
                  লগইন করুন
                </button>
              </form>
              {status ? <div className="status-pill error">{status}</div> : null}
            </div>
          </div>
        ) : (
          <>
            <div className="admin-header">
              <div>
                <h1 className="admin-title">কেস ম্যানেজমেন্ট</h1>
                <p className="admin-subtitle">নতুন কেস যোগ করুন এবং বিদ্যমান কেস পরিচালনা করুন</p>
              </div>
              <button type="button" className="button ghost" onClick={handleLogout}>
                <span>লগআউট</span>
              </button>
            </div>

            <div className="admin-grid">
              <div className="admin-card admin-form-card">
                <div className="admin-card-header">
                  <h2>{editingId ? 'কেস সম্পাদনা করুন' : 'নতুন কেস যোগ করুন'}</h2>
                  {editingId && (
                    <button
                      type="button"
                      className="button ghost small"
                      onClick={handleCancelEdit}
                    >
                      বাতিল
                    </button>
                  )}
                </div>
                <form className="admin-form" onSubmit={handleAddCase}>
                  <label className="input-group">
                    <span>কেসের নাম</span>
                    <input
                      name="title"
                      value={formValues.title}
                      onChange={handleCaseChange}
                      placeholder="কেসের শিরোনাম লিখুন"
                      required
                    />
                  </label>
                  <label className="input-group">
                    <span>ক্যাটাগরি</span>
                    <input
                      name="category"
                      value={formValues.category}
                      onChange={handleCaseChange}
                      placeholder="সিভিল, ফৌজদারি, পারিবারিক ইত্যাদি"
                      required
                    />
                  </label>
                  <label className="input-group">
                    <span>সারাংশ</span>
                    <textarea
                      name="summary"
                      value={formValues.summary}
                      onChange={handleCaseChange}
                      placeholder="মামলার বিস্তারিত বিবরণ লিখুন"
                      rows={4}
                      required
                    />
                  </label>
                  <label className="input-group">
                    <span>ফলাফল</span>
                    <textarea
                      name="outcome"
                      value={formValues.outcome}
                      onChange={handleCaseChange}
                      placeholder="মামলার ফলাফল বা বর্তমান অবস্থা"
                      required
                    />
                  </label>
                  <button type="submit" className="button admin-submit-btn">
                    {editingId ? 'আপডেট করুন' : 'সংরক্ষণ করুন'}
                  </button>
                </form>
              </div>

              <div className="admin-card admin-list-card">
                <div className="admin-card-header">
                  <h2>সকল কেস</h2>
                  <span className="badge">{cases.length}</span>
                </div>
                {cases.length === 0 ? (
                  <div className="empty-state">
                    <span className="empty-icon">📋</span>
                    <p>এখনও কোনো কেস যোগ করা হয়নি</p>
                  </div>
                ) : (
                  <div className="admin-list">
                    {cases.map((item) => (
                      <div key={item.id || item.title} className="admin-item">
                        <div className="admin-item-content">
                          <h3 className="admin-item-title">{item.title}</h3>
                          <p className="admin-item-meta">
                            <span className="category-tag">{item.category}</span>
                            <span className="divider">•</span>
                            <span>{item.outcome}</span>
                          </p>
                        </div>
                        {item.id ? (
                          <div className="admin-item-actions">
                            <button
                              type="button"
                              className="button ghost small"
                              onClick={() => handleEditCase(item)}
                              aria-label="কেস সম্পাদনা করুন"
                            >
                              সম্পাদনা
                            </button>
                            <button
                              type="button"
                              className="button danger-ghost small"
                              onClick={() => handleDeleteCase(item.id)}
                              aria-label="কেস মুছুন"
                            >
                              মুছুন
                            </button>
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {status && !status.includes('ব্যর্থ') ? (
              <div className="status-pill success">{status}</div>
            ) : null}
          </>
        )}
      </section>
    </div>
  )
}

export default Admin
