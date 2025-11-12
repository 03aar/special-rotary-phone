import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './ProgressMap.css'

const skillTreeData = {
  nodes: [
    // Ring 1 - Inner (Completed)
    { id: 'clarity-1', name: 'Clarity I', subtitle: 'Completed', icon: '🎯', status: 'completed', angle: 0, ring: 1, unlockRequirement: null },
    { id: 'emotion-1', name: 'Emotion I', subtitle: 'Completed', icon: '❤️', status: 'completed', angle: 72, ring: 1, unlockRequirement: null },
    { id: 'logic-1', name: 'Logic I', subtitle: 'Completed', icon: '🧠', status: 'completed', angle: 144, ring: 1, unlockRequirement: null },
    { id: 'creativity-1', name: 'Creative I', subtitle: 'Completed', icon: '✨', status: 'completed', angle: 216, ring: 1, unlockRequirement: null },
    { id: 'bias-1', name: 'Bias I', subtitle: 'Completed', icon: '⚖️', status: 'completed', angle: 288, ring: 1, unlockRequirement: null },

    // Ring 2 - Middle (Current Level)
    { id: 'clarity-2', name: 'Clarity II', subtitle: 'In Progress', icon: '🎯', status: 'current', angle: 36, ring: 2, unlockRequirement: 'clarity-1', progress: 60 },
    { id: 'emotion-2', name: 'Emotion II', subtitle: 'In Progress', icon: '❤️', status: 'current', angle: 108, ring: 2, unlockRequirement: 'emotion-1', progress: 40 },
    { id: 'logic-2', name: 'Logic II', subtitle: 'Available', icon: '🧠', status: 'current', angle: 180, ring: 2, unlockRequirement: 'logic-1', progress: 20 },

    // Ring 3 - Outer (Locked)
    { id: 'clarity-3', name: 'Clarity III', subtitle: 'Locked', icon: '🎯', status: 'locked', angle: 0, ring: 3, unlockRequirement: 'clarity-2' },
    { id: 'master', name: 'Master', subtitle: 'Locked', icon: '👑', status: 'locked', angle: 90, ring: 3, unlockRequirement: 'all-level-3' },
  ]
}

const milestones = [
  { label: 'Started', date: 'Oct 10' },
  { label: 'Level 3', date: 'Oct 20' },
  { label: 'Arena Unlocked', date: 'Nov 1' },
  { label: 'Level 5', date: 'Nov 10' },
  { label: 'Architect Path', date: null }
]

function ProgressMap() {
  const navigate = useNavigate()
  const [selectedNode, setSelectedNode] = useState(null)
  const [panelOpen, setPanelOpen] = useState(false)
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

  const getLevelNumber = () => Math.floor(contextIQ / 10)

  const handleNodeClick = (node) => {
    if (node.status === 'locked') return
    setSelectedNode(node)
    setPanelOpen(true)
  }

  const closePanel = () => {
    setPanelOpen(false)
    setTimeout(() => setSelectedNode(null), 400)
  }

  const centerX = 450
  const centerY = 450
  const ringRadii = { 1: 150, 2: 280, 3: 400 }

  const nodesWithPositions = skillTreeData.nodes.map(node => {
    const radius = ringRadii[node.ring]
    const angleRad = (node.angle - 90) * (Math.PI / 180)

    return {
      ...node,
      x: centerX + radius * Math.cos(angleRad) - 50,
      y: centerY + radius * Math.sin(angleRad) - 50
    }
  })

  const connections = nodesWithPositions
    .filter(node => node.unlockRequirement)
    .map(node => {
      const parent = nodesWithPositions.find(n => n.id === node.unlockRequirement)
      if (!parent) return null

      return {
        from: { x: parent.x + 50, y: parent.y + 50 },
        to: { x: node.x + 50, y: node.y + 50 },
        status: node.status === 'locked' ? 'locked' : 'completed'
      }
    })
    .filter(Boolean)

  const currentMilestoneIndex = 3
  const progressPercentage = (currentMilestoneIndex / (milestones.length - 1)) * 100

  return (
    <div className="progress-map-container">
      {/* Background */}
      <div className="progress-background">
        <svg className="neural-grid" viewBox="0 0 1000 1000">
          {[...Array(20)].map((_, i) => (
            <line
              key={`v-${i}`}
              className="grid-line"
              x1={i * 50}
              y1="0"
              x2={i * 50}
              y2="1000"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
          {[...Array(20)].map((_, i) => (
            <line
              key={`h-${i}`}
              className="grid-line"
              x1="0"
              y1={i * 50}
              x2="1000"
              y2={i * 50}
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </svg>
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="floating-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="progress-nav">
        <div className="nav-logo">LOOP</div>
        <button className="nav-back-btn" onClick={() => navigate('/dashboard')}>
          ← Back to Dashboard
        </button>
      </div>

      {/* Main Content */}
      <div className="progress-map-content">
        {/* Current Level Badge */}
        <div className="current-level-badge">
          <div className="level-ring-container">
            <svg width="200" height="200" viewBox="0 0 200 200">
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <radialGradient id="ring-gradient">
                  <stop offset="0%" stopColor="#C8102E" />
                  <stop offset="100%" stopColor="#A50D25" />
                </radialGradient>
              </defs>
              <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="12" />
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="url(#ring-gradient)"
                strokeWidth="12"
                strokeDasharray={`${2 * Math.PI * 90}`}
                strokeDashoffset={`${2 * Math.PI * 90 * (1 - (completedMissions % 20) / 20)}`}
                strokeLinecap="round"
                transform="rotate(-90 100 100)"
                filter="url(#glow)"
              />
              <circle cx="100" cy="100" r="105" fill="none" stroke="#C8102E" strokeWidth="2" opacity="0.3">
                <animate attributeName="r" from="100" to="115" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite" />
              </circle>
              <text x="100" y="90" textAnchor="middle" fontSize="48" fontWeight="700" fill="#FFFFFF">{getLevelNumber()}</text>
              <text x="100" y="115" textAnchor="middle" fontSize="14" fontWeight="600" fill="#C8102E" letterSpacing="2">LEVEL</text>
            </svg>
          </div>
          <h2 className="level-title">{getLevel()}</h2>
          <p className="level-subtitle">You shape meaning with intention</p>
          <p className="level-progress-text">{20 - (completedMissions % 20)} missions to next level</p>
        </div>

        {/* Skill Tree */}
        <div className="skill-tree">
          <svg className="skill-connections" viewBox="0 0 900 900">
            <defs>
              <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C8102E" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#C8102E" stopOpacity="1" />
                <stop offset="100%" stopColor="#C8102E" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            {connections.map((conn, index) => (
              <line
                key={index}
                className={`connection-line ${conn.status}`}
                x1={conn.from.x}
                y1={conn.from.y}
                x2={conn.to.x}
                y2={conn.to.y}
                stroke={conn.status === 'completed' ? 'url(#line-gradient)' : undefined}
                strokeDasharray={conn.status === 'completed' ? '10, 10' : undefined}
              />
            ))}
          </svg>

          {nodesWithPositions.map(node => (
            <div
              key={node.id}
              className={`skill-node ${node.status}`}
              style={{ left: `${node.x}px`, top: `${node.y}px` }}
              onClick={() => handleNodeClick(node)}
            >
              <div className="node-circle">
                <div className="node-icon">{node.icon}</div>
                {node.status === 'completed' && <div className="node-check">✓</div>}
                {node.status === 'locked' && <div className="node-lock">🔒</div>}
                {node.status === 'current' && node.progress && (
                  <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    <circle
                      cx="50"
                      cy="50"
                      r="48"
                      fill="none"
                      stroke="#C8102E"
                      strokeWidth="4"
                      strokeDasharray={`${node.progress * 3} 300`}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                )}
              </div>
              <div className="node-label">
                {node.name}
                <div className="node-label-sub">{node.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skill Detail Panel */}
      {selectedNode && (
        <div className={`skill-detail-panel ${panelOpen ? 'open' : ''}`}>
          <button className="skill-detail-close" onClick={closePanel}>×</button>
          <div className="skill-detail-icon">{selectedNode.icon}</div>
          <h3 className="skill-detail-title">{selectedNode.name}</h3>
          <div className="skill-detail-status">
            <span className={`status-badge ${selectedNode.status}`}>
              {selectedNode.status === 'completed' ? '✓ Completed' :
               selectedNode.status === 'current' ? 'In Progress' : '🔒 Locked'}
            </span>
          </div>
          <div className="skill-detail-divider" />
          <div className="skill-detail-section">
            <h4 className="skill-detail-section-title">Description</h4>
            <p className="skill-detail-description">
              Master advanced precision techniques. Learn to structure complex ideas with perfect clarity.
            </p>
          </div>
          <div className="skill-detail-action">
            <button
              className="skill-action-button"
              onClick={() => navigate('/mission')}
              disabled={selectedNode.status === 'locked'}
            >
              {selectedNode.status === 'completed' ? 'Review Missions' : 'Continue Learning'} →
            </button>
          </div>
        </div>
      )}

      {/* Milestone Timeline */}
      <div className="milestone-timeline">
        <div className="timeline-title">Your Journey</div>
        <div className="timeline-track">
          <div className="timeline-line">
            <div className="timeline-line-progress" style={{ width: `${progressPercentage}%` }} />
          </div>
          <div className="timeline-milestones">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`timeline-milestone ${
                  index < currentMilestoneIndex ? 'completed' :
                  index === currentMilestoneIndex ? 'current' : 'future'
                }`}
              >
                <div className="milestone-dot" />
                <div className="milestone-label">
                  {milestone.label}
                  {milestone.date && <div className="milestone-date">{milestone.date}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressMap
