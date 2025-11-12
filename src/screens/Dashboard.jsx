import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

function Dashboard() {
  const navigate = useNavigate()
  const [userName, setUserName] = useState('')
  const [contextIQ, setContextIQ] = useState(70)
  const [streak, setStreak] = useState(0)
  const [completedMissions, setCompletedMissions] = useState(0)

  useEffect(() => {
    // Load user data
    const storedName = localStorage.getItem('userName') || 'User'
    const storedIQ = parseInt(localStorage.getItem('contextIQ') || '70')
    const storedStreak = parseInt(localStorage.getItem('streak') || '0')
    const storedMissions = parseInt(localStorage.getItem('completedMissions') || '0')

    setUserName(storedName)
    setContextIQ(storedIQ)
    setStreak(storedStreak)
    setCompletedMissions(storedMissions)
  }, [])

  const handleStartMission = () => {
    // Generate random mission
    const missionTypes = ['clarity', 'emotion', 'bias', 'logic']
    const randomType = missionTypes[Math.floor(Math.random() * missionTypes.length)]

    const mission = {
      id: `mission_${Date.now()}`,
      type: randomType,
      number: completedMissions + 1,
      estimatedTime: 3,
    }

    sessionStorage.setItem('currentMission', JSON.stringify(mission))
    navigate('/mission')
  }

  const getLevel = () => {
    if (contextIQ < 50) return 'Beginner'
    if (contextIQ < 70) return 'Interpreter'
    if (contextIQ < 85) return 'Composer'
    return 'Architect'
  }

  const getLevelNumber = () => {
    return Math.floor(contextIQ / 10)
  }

  return (
    <div className="dashboard-screen">
      {/* Animated Background */}
      <div className="dashboard-background">
        <div className="background-orb orb-1" />
        <div className="background-orb orb-2" />
        <div className="background-orb orb-3" />
      </div>

      {/* Top Navigation */}
      <nav className="dashboard-nav">
        <div className="nav-left">
          <svg className="nav-logo" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16 4 C 10 4, 6 8, 6 14 C 6 18, 8 21, 11 22 M 16 28 C 22 28, 26 24, 26 18 C 26 14, 24 11, 21 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span className="nav-brand">LOOP</span>
        </div>

        <div className="nav-center">
          <button className="nav-link active">Missions</button>
          <button className="nav-link" onClick={() => navigate('/progress')}>Progress</button>
          <button className="nav-link" onClick={() => navigate('/analytics')}>Analytics</button>
        </div>

        <div className="nav-right">
          <div className="context-iq-ring">
            <svg viewBox="0 0 48 48">
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="var(--color-mist-gray)"
                strokeWidth="3"
              />
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="var(--color-primary-red)"
                strokeWidth="3"
                strokeDasharray={`${2 * Math.PI * 20}`}
                strokeDashoffset={`${2 * Math.PI * 20 * (1 - contextIQ / 100)}`}
                transform="rotate(-90 24 24)"
                style={{ transition: 'stroke-dashoffset 1s ease' }}
              />
            </svg>
            <span className="iq-value">{contextIQ}</span>
          </div>
          <button className="user-avatar" onClick={() => navigate('/settings')}>
            {userName.charAt(0).toUpperCase()}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="mission-launcher">
          <div className="launcher-status">
            Your Current Level
          </div>

          <div className="launcher-divider" />

          <div className="launcher-level">
            {getLevel()} · Level {getLevelNumber()}
          </div>

          <div className="launcher-progress">
            <svg className="progress-circle" viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="var(--color-mist-gray)"
                strokeWidth="2"
                opacity="0.3"
              />
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="var(--color-primary-red)"
                strokeWidth="3"
                strokeDasharray={`${2 * Math.PI * 80}`}
                strokeDashoffset={`${2 * Math.PI * 80 * (1 - (completedMissions % 20) / 20)}`}
                transform="rotate(-90 100 100)"
                style={{ transition: 'stroke-dashoffset 1s ease' }}
              />
            </svg>
            <div className="progress-text">
              <span className="progress-current">{completedMissions % 20}</span>
              <span className="progress-total">/ 20 Loops</span>
            </div>
          </div>

          <button className="start-mission-button" onClick={handleStartMission}>
            <span className="button-text">START<br />MISSION</span>
            <span className="button-time">3 min</span>
          </button>

          <p className="launcher-subtitle">
            Continue your path toward clarity
          </p>
        </div>

        {/* Quick Stats */}
        <div className="quick-stats">
          {streak > 0 && (
            <div className="stat-card streak-card">
              <span className="streak-icon">🔥</span>
              <span className="streak-text">{streak} Day Streak</span>
            </div>
          )}

          <div className="stat-card">
            <div className="stat-label">CLARITY SCORE</div>
            <div className="stat-value">{contextIQ + 18}%</div>
            <div className="stat-bar">
              <div
                className="stat-bar-fill"
                style={{ width: `${contextIQ + 18}%` }}
              />
            </div>
            <div className="stat-change">↑ 5% this week</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">LOOPS COMPLETED</div>
            <div className="stat-value">{completedMissions} total</div>
            <div className="stat-detail">⚡ {Math.min(completedMissions, 12)} this week</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">NEXT UNLOCK</div>
            <div className="stat-value">{20 - (completedMissions % 20)} loops to go</div>
            <div className="stat-detail">Next Level</div>
          </div>
        </div>

        {/* Bottom Quote */}
        <div className="dashboard-quote">
          "Precision is the architecture of thought."
        </div>
      </main>
    </div>
  )
}

export default Dashboard
