import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './MissionActive.css'

const missionData = {
  clarity: {
    title: 'Clarity Challenge',
    image: 'https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?w=800&q=80',
    task: 'Describe this scene with maximum precision.',
    focus: 'Remove ambiguity. Use concrete nouns.',
    hint: 'Try: Instead of "The room looks old," say "The room has cracked plaster walls."',
  },
  emotion: {
    title: 'Emotional Framing',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80',
    task: 'Describe this scene emphasizing empathy and urgency.',
    focus: 'Focus on cause and effect.',
    hint: 'Structure: 1) State situation 2) Add emotion 3) Explain consequence',
  },
  bias: {
    title: 'Bias Detection',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
    task: 'Rewrite this scenario without biased language.',
    focus: 'Remove judgment words. Use neutral framing.',
    hint: 'Replace value-laden terms with factual descriptions.',
  },
  logic: {
    title: 'Logical Structure',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    task: 'Explain this concept using clear logical steps.',
    focus: 'Build from cause to effect.',
    hint: 'Structure: Problem → Analysis → Solution',
  },
}

function MissionActive() {
  const navigate = useNavigate()
  const [mission, setMission] = useState(null)
  const [response, setResponse] = useState('')
  const [charCount, setCharCount] = useState(0)
  const [hintExpanded, setHintExpanded] = useState(false)
  const [aiViewVisible, setAiViewVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [startTime] = useState(Date.now())

  useEffect(() => {
    const stored = sessionStorage.getItem('currentMission')
    if (stored) {
      const missionInfo = JSON.parse(stored)
      const data = missionData[missionInfo.type] || missionData.clarity
      setMission({ ...missionInfo, ...data })
    } else {
      // Default mission
      setMission({
        id: 'default',
        type: 'clarity',
        number: 1,
        ...missionData.clarity,
      })
    }
  }, [])

  const handleTextChange = (e) => {
    const text = e.target.value
    if (text.length <= 500) {
      setResponse(text)
      setCharCount(text.length)
    }
  }

  const handleSubmit = async () => {
    if (charCount < 20) return

    setIsSubmitting(true)

    // Create scanning animation
    const scanWave = document.createElement('div')
    scanWave.className = 'scan-wave'
    document.body.appendChild(scanWave)

    // Create analyzing overlay
    setTimeout(() => {
      scanWave.remove()
      const overlay = document.createElement('div')
      overlay.className = 'analyzing-overlay'
      overlay.innerHTML = `
        <div class="analyzing-content">
          <div class="analyzing-spinner"></div>
          <div class="analyzing-text">Analyzing...</div>
          <div class="analyzing-subtext">The AI is processing your context.</div>
        </div>
      `
      document.body.appendChild(overlay)

      // Simulate analysis
      setTimeout(async () => {
        const timeSpent = Math.floor((Date.now() - startTime) / 1000)

        // Generate mock results
        const clarityScore = Math.floor(70 + Math.random() * 25)
        const emotionScore = Math.floor(65 + Math.random() * 30)
        const biasScore = Math.floor(Math.random() * 15)

        const results = {
          missionId: mission.id,
          missionType: mission.type,
          missionTitle: mission.title,
          scores: {
            clarity: clarityScore,
            emotion: emotionScore,
            bias: biasScore,
          },
          contextIQChange: Math.floor(1 + Math.random() * 5),
          timeSpent,
          strengths: [
            'You captured emotional weight effectively',
            'Cause-and-effect structure was clear',
            'Language was appropriately specific',
          ],
          improvements: [
            'Try adding sensory details (sound, temperature)',
            'Consider the physical environment more',
            'Remove filler words to increase impact',
          ],
        }

        sessionStorage.setItem('missionResults', JSON.stringify(results))

        overlay.remove()
        navigate('/mission-results')
      }, 2500)
    }, 2000)
  }

  if (!mission) {
    return <div className="loading-screen">Loading mission...</div>
  }

  return (
    <div className="mission-active-screen">
      {/* Left Panel - Perception Canvas */}
      <div className="mission-left-panel">
        <div className="mission-top-bar">
          <div className="mission-title">
            MISSION {String(mission.number).padStart(2, '0')} — {mission.title}
          </div>
          <div className="progress-dots">
            <div className="progress-dot completed" />
            <div className="progress-dot completed" />
            <div className="progress-dot current" />
            <div className="progress-dot" />
            <div className="progress-dot" />
          </div>
        </div>

        <div className="mission-content">
          <div className="challenge-image-wrapper">
            <img
              src={mission.image}
              alt="Mission challenge"
              className="mission-image"
            />
            <button
              className={`ai-view-toggle ${aiViewVisible ? 'active' : ''}`}
              onClick={() => setAiViewVisible(!aiViewVisible)}
            >
              👁️ {aiViewVisible ? 'Hide' : 'Show'} AI View
            </button>

            {aiViewVisible && (
              <div className="heatmap-simulation">
                <div className="heat-spot" style={{ top: '30%', left: '40%' }} />
                <div className="heat-spot" style={{ top: '60%', left: '60%' }} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Panel - Response Zone */}
      <div className="mission-right-panel">
        <div className="task-section">
          <div className="task-label">YOUR TASK</div>
          <div className="task-instructions">{mission.task}</div>
          <div className="task-focus">
            Focus on <strong>{mission.focus}</strong>
          </div>
        </div>

        <textarea
          className="response-textarea"
          placeholder="Write your response here..."
          value={response}
          onChange={handleTextChange}
          disabled={isSubmitting}
        />

        <div className={`char-counter ${charCount > 450 ? 'warning' : ''} ${charCount > 500 ? 'error' : ''}`}>
          {charCount} / 500
        </div>

        {/* Hint Section */}
        <div className="hint-section">
          <button
            className={`hint-button ${hintExpanded ? 'expanded' : ''}`}
            onClick={() => setHintExpanded(!hintExpanded)}
          >
            <span>💡 Need a hint?</span>
            <span className="hint-chevron">{hintExpanded ? '▲' : '▼'}</span>
          </button>

          {hintExpanded && (
            <div className="hint-content">
              <div className="hint-divider" />
              <div className="hint-text">{mission.hint}</div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button
            className={`submit-button ${charCount >= 20 && !isSubmitting ? 'enabled' : ''}`}
            onClick={handleSubmit}
            disabled={charCount < 20 || isSubmitting}
          >
            {isSubmitting ? 'Analyzing...' : 'Submit Response'}
          </button>

          <button className="skip-button" onClick={() => navigate('/dashboard')}>
            Skip Mission
          </button>
        </div>
      </div>
    </div>
  )
}

export default MissionActive
