import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Analytics.css'

function Analytics() {
  const navigate = useNavigate()
  const [contextIQ, setContextIQ] = useState(70)
  const [completedMissions, setCompletedMissions] = useState(0)
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    const iq = parseInt(localStorage.getItem('contextIQ') || '70')
    const missions = parseInt(localStorage.getItem('completedMissions') || '0')
    const userStreak = parseInt(localStorage.getItem('streak') || '0')
    setContextIQ(iq)
    setCompletedMissions(missions)
    setStreak(userStreak)
  }, [])

  const clarityScore = Math.min(100, contextIQ + 18)
  const emotionScore = Math.min(100, contextIQ + 8)
  const logicScore = Math.min(100, contextIQ + 15)
  const biasControl = Math.min(100, contextIQ + 26)
  const creativity = Math.max(50, contextIQ - 5)

  return (
    <div className="analytics-screen">
      <button className="back-button" onClick={() => navigate('/dashboard')}>
        ← Back to Dashboard
      </button>

      <div className="analytics-header">
        <h1>Your Analytics</h1>
        <p>Insights into your learning patterns</p>
      </div>

      <div className="analytics-content">
        {/* Hero Metric */}
        <div className="hero-metric">
          <div className="hero-ring">
            <svg viewBox="0 0 280 280">
              <circle
                cx="140"
                cy="140"
                r="120"
                fill="none"
                stroke="var(--color-mist-gray)"
                strokeWidth="6"
                opacity="0.2"
              />
              <circle
                cx="140"
                cy="140"
                r="120"
                fill="none"
                stroke="var(--color-primary-red)"
                strokeWidth="6"
                strokeDasharray={`${2 * Math.PI * 120}`}
                strokeDashoffset={`${2 * Math.PI * 120 * (1 - contextIQ / 100)}`}
                transform="rotate(-90 140 140)"
              />
            </svg>
            <div className="hero-content">
              <div className="hero-value">{contextIQ}</div>
              <div className="hero-label">CONTEXT IQ</div>
              <div className="hero-change">↑ 12% this month</div>
              <div className="hero-rank">Top 15% globally</div>
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="stat-cards-grid">
          <div className="analytics-card">
            <h3>CLARITY TREND</h3>
            <div className="trend-value">{clarityScore}%</div>
            <div className="mini-chart">
              <div className="chart-bar" style={{ height: '60%' }} />
              <div className="chart-bar" style={{ height: '75%' }} />
              <div className="chart-bar" style={{ height: '82%' }} />
              <div className="chart-bar" style={{ height: '88%' }} />
              <div className="chart-bar" style={{ height: clarityScore + '%' }} />
            </div>
            <div className="stat-detail">Peak: 94%</div>
          </div>

          <div className="analytics-card">
            <h3>LEARNING CONSISTENCY</h3>
            <div className="consistency-grid">
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className={`day-cell ${i < completedMissions ? 'active' : ''}`}
                />
              ))}
            </div>
            <div className="stat-detail">Current: {streak} days • Longest: {Math.max(streak, 7)} days</div>
          </div>

          <div className="analytics-card">
            <h3>SKILL ACCELERATION</h3>
            <div className="trend-value">+{contextIQ - 58}</div>
            <div className="growth-line">
              <svg viewBox="0 0 200 80" preserveAspectRatio="none">
                <path
                  d="M 0 60 Q 50 40, 100 30 T 200 10"
                  fill="none"
                  stroke="var(--color-primary-red)"
                  strokeWidth="3"
                />
              </svg>
            </div>
            <div className="stat-detail">Context IQ in 30 days</div>
          </div>
        </div>

        {/* Skill Radar */}
        <div className="skill-profile-section">
          <h2>Skill Profile</h2>
          <div className="skill-bars">
            <div className="skill-bar-item">
              <div className="skill-bar-label">
                <span>Clarity</span>
                <span>{clarityScore}%</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" style={{ width: clarityScore + '%' }} />
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-label">
                <span>Emotion</span>
                <span>{emotionScore}%</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" style={{ width: emotionScore + '%' }} />
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-label">
                <span>Logic</span>
                <span>{logicScore}%</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" style={{ width: logicScore + '%' }} />
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-label">
                <span>Bias Control</span>
                <span>{biasControl}%</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" style={{ width: biasControl + '%' }} />
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-label">
                <span>Creativity</span>
                <span>{creativity}%</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" style={{ width: creativity + '%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="insights-section">
          <h2>Personal Insights</h2>
          <div className="insight-card">
            <span className="insight-icon">🎯</span>
            <p>You excel at emotional framing but tend to overuse adjectives.</p>
          </div>
          <div className="insight-card">
            <span className="insight-icon">📈</span>
            <p>Your clarity improved most when you added cause-and-effect structure.</p>
          </div>
          <div className="insight-card">
            <span className="insight-icon">💡</span>
            <p>Try: More creative challenges to balance your analytical strength.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
