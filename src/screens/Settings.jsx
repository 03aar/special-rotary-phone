import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Settings.css'

function Settings() {
  const navigate = useNavigate()
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    const name = localStorage.getItem('userName') || ''
    const email = localStorage.getItem('userEmail') || ''
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

  return (
    <div className="settings-screen">
      <button className="back-button" onClick={() => navigate('/dashboard')}>
        ← Back to Dashboard
      </button>

      <div className="settings-header">
        <h1>Settings</h1>
      </div>

      <div className="settings-content">
        <div className="settings-section">
          <h2>Profile</h2>
          <div className="settings-card">
            <div className="profile-avatar">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="profile-info">
              <div className="profile-name">{userName}</div>
              <div className="profile-email">{userEmail}</div>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h2>Preferences</h2>
          <div className="settings-card">
            <div className="settings-item">
              <div className="setting-label">
                <span>Enable sound effects</span>
              </div>
              <label className="toggle">
                <input type="checkbox" />
                <span className="toggle-slider" />
              </label>
            </div>

            <div className="settings-item">
              <div className="setting-label">
                <span>Enable animations</span>
              </div>
              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider" />
              </label>
            </div>

            <div className="settings-item">
              <div className="setting-label">
                <span>Daily reminder</span>
                <span className="setting-description">Get notified to complete your daily loop</span>
              </div>
              <label className="toggle">
                <input type="checkbox" />
                <span className="toggle-slider" />
              </label>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h2>Privacy</h2>
          <div className="settings-card">
            <div className="settings-item">
              <div className="setting-label">
                <span>Save my responses for personalized learning</span>
              </div>
              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider" />
              </label>
            </div>

            <div className="settings-item">
              <div className="setting-label">
                <span>Contribute anonymous data to improve LOOP</span>
              </div>
              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider" />
              </label>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h2>Data</h2>
          <div className="settings-card">
            <button className="settings-button secondary" onClick={handleReset}>
              Reset Progress
            </button>
            <button className="settings-button secondary">
              Export My Data
            </button>
          </div>
        </div>

        <div className="settings-section">
          <h2>Account</h2>
          <div className="settings-card">
            <button className="settings-button danger" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </div>

        <div className="settings-footer">
          <p>LOOP v1.0.0</p>
          <p>Where human learning meets machine understanding</p>
        </div>
      </div>
    </div>
  )
}

export default Settings
