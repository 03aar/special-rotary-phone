import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './MissionResults.css'

function MissionResults() {
  const navigate = useNavigate()
  const [results, setResults] = useState(null)
  const [animationComplete, setAnimationComplete] = useState(false)

  useEffect(() => {
    const stored = sessionStorage.getItem('missionResults')
    if (stored) {
      setResults(JSON.parse(stored))

      // Update Context IQ
      const currentIQ = parseInt(localStorage.getItem('contextIQ') || '70')
      const change = JSON.parse(stored).contextIQChange || 0
      const newIQ = Math.min(100, currentIQ + change)
      localStorage.setItem('contextIQ', newIQ.toString())

      // Update completed missions
      const completed = parseInt(localStorage.getItem('completedMissions') || '0')
      localStorage.setItem('completedMissions', (completed + 1).toString())

      // Animation timer
      setTimeout(() => setAnimationComplete(true), 2500)
    }
  }, [])

  const handleContinue = () => {
    sessionStorage.removeItem('missionResults')
    sessionStorage.removeItem('currentMission')
    navigate('/dashboard')
  }

  const handleRetry = () => {
    navigate('/mission')
  }

  if (!results) {
    return <div className="loading-screen">Loading results...</div>
  }

  const avgScore = Math.round(
    (results.scores.clarity + results.scores.emotion + (100 - results.scores.bias)) / 3
  )

  return (
    <div className="mission-results-screen">
      {/* Section 1: Score Dashboard */}
      <section className="results-section score-section">
        <h1>Your Loop Result</h1>

        <div className="score-rings">
          <div className="score-ring">
            <svg className="ring-svg" viewBox="0 0 160 160">
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="var(--color-mist-gray)"
                strokeWidth="8"
                opacity="0.3"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="var(--color-primary-red)"
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 70}`}
                strokeDashoffset={`${2 * Math.PI * 70 * (1 - results.scores.clarity / 100)}`}
                transform="rotate(-90 80 80)"
                style={{
                  transition: 'stroke-dashoffset 2s ease',
                  animation: 'ringFill 2s ease forwards'
                }}
              />
            </svg>
            <div className="ring-content">
              <div className="ring-value">{results.scores.clarity}%</div>
              <div className="ring-label">CLARITY</div>
            </div>
          </div>

          <div className="score-ring">
            <svg className="ring-svg" viewBox="0 0 160 160">
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="var(--color-mist-gray)"
                strokeWidth="8"
                opacity="0.3"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="var(--color-primary-red)"
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 70}`}
                strokeDashoffset={`${2 * Math.PI * 70 * (1 - results.scores.emotion / 100)}`}
                transform="rotate(-90 80 80)"
                style={{
                  transition: 'stroke-dashoffset 2s ease 0.2s',
                  animation: 'ringFill 2s ease 0.2s forwards'
                }}
              />
            </svg>
            <div className="ring-content">
              <div className="ring-value">{results.scores.emotion}%</div>
              <div className="ring-label">EMOTION</div>
            </div>
          </div>

          <div className="score-ring">
            <svg className="ring-svg" viewBox="0 0 160 160">
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="var(--color-mist-gray)"
                strokeWidth="8"
                opacity="0.3"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke={results.scores.bias < 10 ? 'var(--color-success)' : 'var(--color-primary-red)'}
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 70}`}
                strokeDashoffset={`${2 * Math.PI * 70 * (1 - results.scores.bias / 100)}`}
                transform="rotate(-90 80 80)"
                style={{
                  transition: 'stroke-dashoffset 2s ease 0.4s',
                  animation: 'ringFill 2s ease 0.4s forwards'
                }}
              />
            </svg>
            <div className="ring-content">
              <div className="ring-value">{results.scores.bias}%</div>
              <div className="ring-label">BIAS</div>
            </div>
          </div>
        </div>

        <div className="context-iq-change">
          Context IQ: <span className="iq-change-positive">+{results.contextIQChange} points</span>
          {' → '}
          {parseInt(localStorage.getItem('contextIQ'))}
        </div>
      </section>

      {/* Section 2: Detailed Feedback */}
      <section className="results-section feedback-section">
        <div className="feedback-card">
          <div className="feedback-block">
            <h3 className="feedback-title">✓ STRENGTHS</h3>
            <div className="feedback-divider" />
            <ul className="feedback-list">
              {results.strengths.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="feedback-block">
            <h3 className="feedback-title">⚠ AREAS FOR GROWTH</h3>
            <div className="feedback-divider" />
            <ul className="feedback-list">
              {results.improvements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="feedback-block ai-insight">
            <h3 className="feedback-title">🤖 HOW AI SAW IT</h3>
            <div className="feedback-divider" />
            <p className="ai-insight-text">
              The AI weighted your nouns 3× heavier than verbs.
              This created a static scene rather than dynamic urgency.
            </p>
            <p className="ai-example">
              <strong>Try:</strong> "They're pacing" instead of "They are anxious."
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Action Zone */}
      <section className="results-section action-section">
        <div className="action-buttons">
          <button className="action-button secondary" onClick={handleRetry}>
            ↻ Rephrase & Retry
          </button>
          <button className="action-button primary" onClick={handleContinue}>
            Continue →
          </button>
        </div>

        <div className="stats-summary">
          Mission {String(results.missionId).slice(-2)} Complete
          {' • '}
          Time: {Math.floor(results.timeSpent / 60)}:{String(results.timeSpent % 60).padStart(2, '0')}
          {' • '}
          Avg Score: {avgScore}%
        </div>
      </section>
    </div>
  )
}

export default MissionResults
