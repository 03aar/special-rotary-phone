import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './ProgressMap.css'

function ProgressMap() {
  const navigate = useNavigate()
  const [contextIQ, setContextIQ] = useState(70)
  const [completedMissions, setCompletedMissions] = useState(0)

  useEffect(() => {
    const iq = parseInt(localStorage.getItem('contextIQ') || '70')
    const missions = parseInt(localStorage.getItem('completedMissions') || '0')
    setContextIQ(iq)
    setCompletedMissions(missions)
  }, [])

  const getLevel = () => {
    if (contextIQ < 50) return 'Beginner'
    if (contextIQ < 70) return 'Interpreter'
    if (contextIQ < 85) return 'Composer'
    return 'Architect'
  }

  const skills = [
    { id: 1, name: 'Clarity I', completed: completedMissions >= 5, level: 1 },
    { id: 2, name: 'Emotion I', completed: completedMissions >= 10, level: 1 },
    { id: 3, name: 'Logic I', completed: completedMissions >= 15, level: 1 },
    { id: 4, name: 'Clarity II', completed: completedMissions >= 20, level: 2 },
    { id: 5, name: 'Bias Detection', completed: completedMissions >= 25, level: 2 },
    { id: 6, name: 'Emotion II', completed: completedMissions >= 30, level: 2 },
  ]

  const currentSkill = skills.findIndex((s) => !s.completed)

  return (
    <div className="progress-map-screen">
      <button className="back-button" onClick={() => navigate('/dashboard')}>
        ← Back to Dashboard
      </button>

      <div className="progress-header">
        <h1>Your Progress Map</h1>
        <p>Track your journey toward context mastery</p>
      </div>

      <div className="progress-content">
        {/* Center Badge */}
        <div className="current-level-badge">
          <div className="badge-ring">
            <svg viewBox="0 0 160 160">
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="var(--color-mist-gray)"
                strokeWidth="4"
                opacity="0.3"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="var(--color-primary-red)"
                strokeWidth="4"
                strokeDasharray={`${2 * Math.PI * 70}`}
                strokeDashoffset={`${2 * Math.PI * 70 * (1 - contextIQ / 100)}`}
                transform="rotate(-90 80 80)"
              />
            </svg>
            <div className="badge-content">
              <div className="badge-level">{getLevel()}</div>
              <div className="badge-iq">IQ {contextIQ}</div>
            </div>
          </div>
        </div>

        {/* Skill Nodes */}
        <div className="skill-nodes">
          {skills.map((skill, index) => (
            <div
              key={skill.id}
              className={`skill-node ${skill.completed ? 'completed' : ''} ${
                index === currentSkill ? 'current' : ''
              } ${index > currentSkill ? 'locked' : ''}`}
            >
              <div className="node-circle">
                {skill.completed ? '✓' : index === currentSkill ? '○' : '🔒'}
              </div>
              <div className="node-label">{skill.name}</div>
              {index === currentSkill && (
                <div className="node-progress">In Progress</div>
              )}
            </div>
          ))}
        </div>

        {/* Milestone Timeline */}
        <div className="milestone-timeline">
          <h2>Your Journey</h2>
          <div className="timeline">
            <div className="timeline-item completed">
              <div className="timeline-dot" />
              <div className="timeline-content">
                <div className="timeline-label">Started Journey</div>
                <div className="timeline-date">Recently</div>
              </div>
            </div>

            <div className={`timeline-item ${completedMissions >= 5 ? 'completed' : ''}`}>
              <div className="timeline-dot" />
              <div className="timeline-content">
                <div className="timeline-label">First Skills</div>
                <div className="timeline-date">5 Missions</div>
              </div>
            </div>

            <div className={`timeline-item ${completedMissions >= 20 ? 'completed' : ''}`}>
              <div className="timeline-dot" />
              <div className="timeline-content">
                <div className="timeline-label">Level Up</div>
                <div className="timeline-date">20 Missions</div>
              </div>
            </div>

            <div className="timeline-item future">
              <div className="timeline-dot" />
              <div className="timeline-content">
                <div className="timeline-label">Master Level</div>
                <div className="timeline-date">50 Missions</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressMap
