import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Settings.css'

const tabs = [
  { id: 'profile', label: 'Profile', icon: '👤' },
  { id: 'preferences', label: 'Preferences', icon: '⚙️' },
  { id: 'privacy', label: 'Privacy', icon: '🔒' },
  { id: 'data', label: 'Data & Export', icon: '💾' },
]

function Settings() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('profile')
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [animationsEnabled, setAnimationsEnabled] = useState(true)
  const [dailyReminder, setDailyReminder] = useState(false)

  useEffect(() => {
    const name = localStorage.getItem('userName') || 'User'
    const email = localStorage.getItem('userEmail') || 'user@example.com'
    setUserName(name)
    setUserEmail(email)
  }, [])

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.clear()
      sessionStorage.clear()
      navigate('/')
    }
  }

  const handleReset = () => {
    if (window.confirm('This will reset all your progress. Are you sure?')) {
      localStorage.setItem('contextIQ', '70')
      localStorage.setItem('completedMissions', '0')
      localStorage.setItem('streak', '0')
      alert('Progress reset successfully!')
      navigate('/dashboard')
    }
  }

  const contextIQ = parseInt(localStorage.getItem('contextIQ') || '70')
  const completedMissions = parseInt(localStorage.getItem('completedMissions') || '0')

  return (
    <div className="settings-screen">
      {/* Top Navigation */}
      <div className="settings-top-nav">
        <button className="nav-back-link" onClick={() => navigate('/dashboard')}>
          ← Back to Dashboard
        </button>
        <div className="nav-title">Settings</div>
        <div></div>
      </div>

      <div className="settings-container">
        {/* Left Sidebar */}
        <div className="settings-sidebar">
          <div className="settings-sidebar-title">Settings</div>
          {tabs.map(tab => (
            <div
              key={tab.id}
              className={`settings-nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="settings-nav-icon">{tab.icon}</span>
              <span>{tab.label}</span>
            </div>
          ))}

          <div className="settings-nav-divider" />

          <div className="settings-nav-item logout-item" onClick={handleLogout}>
            <span className="settings-nav-icon">🚪</span>
            <span>Logout</span>
          </div>
        </div>

        {/* Right Content */}
        <div className="settings-content">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="settings-tab">
              <div className="settings-content-header">
                <h2 className="settings-content-title">Profile</h2>
                <p className="settings-content-subtitle">Manage your personal information</p>
              </div>

              <div className="profile-avatar-section">
                <div className="profile-avatar-container">
                  <div className="profile-avatar">{userName.charAt(0).toUpperCase()}</div>
                  <div className="profile-avatar-edit">
                    <span>📷</span>
                  </div>
                </div>
                <div className="profile-avatar-info">
                  <div className="profile-avatar-name">{userName}</div>
                  <div className="profile-avatar-id">User ID: #{Date.now().toString(36)}</div>
                  <button className="profile-change-photo-btn">Change Photo</button>
                </div>
              </div>

              <div className="settings-divider" />

              <form className="settings-form">
                <div className="settings-form-group">
                  <label className="settings-form-label">Full Name</label>
                  <input
                    type="text"
                    className="settings-form-input"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="settings-form-group">
                  <label className="settings-form-label">Email Address</label>
                  <input
                    type="email"
                    className="settings-form-input"
                    value={userEmail}
                    disabled
                  />
                  <span className="settings-form-hint">Email cannot be changed. Contact support if needed.</span>
                </div>

                <div className="settings-divider" />

                <div className="profile-stats-grid">
                  <div className="profile-stat-card">
                    <div className="profile-stat-label">Context IQ</div>
                    <div className="profile-stat-value">{contextIQ}</div>
                  </div>
                  <div className="profile-stat-card">
                    <div className="profile-stat-label">Level</div>
                    <div className="profile-stat-value">Composer</div>
                  </div>
                  <div className="profile-stat-card">
                    <div className="profile-stat-label">Joined</div>
                    <div className="profile-stat-value">Recently</div>
                  </div>
                  <div className="profile-stat-card">
                    <div className="profile-stat-label">Total Loops</div>
                    <div className="profile-stat-value">{completedMissions}</div>
                  </div>
                </div>

                <div className="settings-divider" />

                <div className="settings-form-actions">
                  <button type="button" className="settings-btn-secondary">Cancel</button>
                  <button type="submit" className="settings-btn-primary">Save Changes</button>
                </div>
              </form>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="settings-tab">
              <div className="settings-content-header">
                <h2 className="settings-content-title">Preferences</h2>
                <p className="settings-content-subtitle">Customize your Loop experience</p>
              </div>

              <div className="settings-section">
                <h3 className="settings-section-title">Interface</h3>
                <div className="settings-toggle-row">
                  <div className="toggle-row-info">
                    <div className="toggle-row-label">Enable Sound Effects</div>
                    <div className="toggle-row-description">Play audio feedback during interactions</div>
                  </div>
                  <label className="settings-toggle">
                    <input type="checkbox" checked={soundEnabled} onChange={(e) => setSoundEnabled(e.target.checked)} />
                    <span className="settings-toggle-slider" />
                  </label>
                </div>

                <div className="settings-toggle-row">
                  <div className="toggle-row-info">
                    <div className="toggle-row-label">Enable Animations</div>
                    <div className="toggle-row-description">Show transitions and motion effects</div>
                  </div>
                  <label className="settings-toggle">
                    <input type="checkbox" checked={animationsEnabled} onChange={(e) => setAnimationsEnabled(e.target.checked)} />
                    <span className="settings-toggle-slider" />
                  </label>
                </div>
              </div>

              <div className="settings-divider" />

              <div className="settings-section">
                <h3 className="settings-section-title">Learning</h3>
                <div className="settings-form-group">
                  <label className="settings-form-label">Daily Reminder</label>
                  <div className="inline-input-group">
                    <label className="settings-toggle">
                      <input type="checkbox" checked={dailyReminder} onChange={(e) => setDailyReminder(e.target.checked)} />
                      <span className="settings-toggle-slider" />
                    </label>
                    <span style={{ marginLeft: '12px', color: '#000', fontSize: '15px' }}>
                      {dailyReminder ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  <span className="settings-form-hint">Get reminded to complete your daily loop</span>
                </div>

                <div className="settings-form-group">
                  <label className="settings-form-label">Starting Screen</label>
                  <select className="settings-form-select">
                    <option value="dashboard">Dashboard</option>
                    <option value="continue">Continue Last Mission</option>
                    <option value="random">Random Mission</option>
                  </select>
                </div>
              </div>

              <div className="settings-divider" />

              <div className="settings-form-actions">
                <button className="settings-btn-secondary">Reset to Defaults</button>
                <button className="settings-btn-primary">Save Preferences</button>
              </div>
            </div>
          )}

          {/* Privacy Tab */}
          {activeTab === 'privacy' && (
            <div className="settings-tab">
              <div className="settings-content-header">
                <h2 className="settings-content-title">Privacy & Data</h2>
                <p className="settings-content-subtitle">Control how your data is used</p>
              </div>

              <div className="settings-section">
                <h3 className="settings-section-title">Data Collection</h3>
                <div className="settings-toggle-row">
                  <div className="toggle-row-info">
                    <div className="toggle-row-label">Save My Responses</div>
                    <div className="toggle-row-description">Allow Loop to save your responses for personalized learning</div>
                  </div>
                  <label className="settings-toggle">
                    <input type="checkbox" defaultChecked />
                    <span className="settings-toggle-slider" />
                  </label>
                </div>

                <div className="settings-toggle-row">
                  <div className="toggle-row-info">
                    <div className="toggle-row-label">Contribute Anonymous Data</div>
                    <div className="toggle-row-description">Help improve Loop by sharing anonymized usage patterns</div>
                  </div>
                  <label className="settings-toggle">
                    <input type="checkbox" defaultChecked />
                    <span className="settings-toggle-slider" />
                  </label>
                </div>
              </div>

              <div className="settings-divider" />

              <div className="settings-section">
                <h3 className="settings-section-title">Privacy Mode</h3>
                <p className="settings-section-description">
                  When enabled, Loop will not save your responses and will limit analytics
                </p>

                <div className="privacy-mode-card">
                  <div className="privacy-mode-header">
                    <div className="privacy-mode-icon">🔒</div>
                    <div>
                      <div className="privacy-mode-title">Enable Privacy Mode</div>
                      <div className="privacy-mode-subtitle">Maximum privacy protection</div>
                    </div>
                    <label className="settings-toggle">
                      <input type="checkbox" />
                      <span className="settings-toggle-slider" />
                    </label>
                  </div>

                  <div className="privacy-mode-warning">
                    <div className="warning-icon">⚠️</div>
                    <div className="warning-text">
                      <strong>Warning:</strong> This will disable personalized learning and certification eligibility.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Data & Export Tab */}
          {activeTab === 'data' && (
            <div className="settings-tab">
              <div className="settings-content-header">
                <h2 className="settings-content-title">Data & Export</h2>
                <p className="settings-content-subtitle">Manage your data</p>
              </div>

              <div className="settings-section">
                <h3 className="settings-section-title">Download Your Data</h3>
                <p className="settings-section-description">
                  Export all your Loop data in JSON format. Includes: responses, scores, progress.
                </p>
                <button className="settings-btn-primary">Request Data Export</button>
                <p className="settings-form-hint">(You'll receive an email when ready)</p>
              </div>

              <div className="settings-divider" />

              <div className="settings-section">
                <h3 className="settings-section-title">Reset Progress</h3>
                <p className="settings-section-description">
                  Reset all your progress and start from the beginning.
                </p>
                <button className="settings-btn-secondary" onClick={handleReset}>
                  Reset All Progress
                </button>
              </div>

              <div className="settings-divider" />

              <div className="settings-section">
                <h3 className="settings-section-title">Delete Account</h3>
                <p className="settings-section-description">
                  Permanently delete your Loop account and all associated data.
                </p>
                <button className="settings-btn-danger">
                  Delete My Account
                </button>
                <p className="settings-form-hint">⚠️ This action cannot be undone.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="settings-footer">
        <p>LOOP v1.0.0</p>
        <p>Where human learning meets machine understanding</p>
      </div>
    </div>
  )
}

export default Settings
