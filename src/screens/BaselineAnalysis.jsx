import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './BaselineAnalysis.css'

function BaselineAnalysis() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState(1)
  const [analysis, setAnalysis] = useState(null)
  const [image, setImage] = useState(null)

  useEffect(() => {
    // Load analysis data
    const storedAnalysis = sessionStorage.getItem('baselineAnalysis')
    const storedImage = sessionStorage.getItem('baselineImage')

    if (storedAnalysis && storedImage) {
      setAnalysis(JSON.parse(storedAnalysis))
      setImage(JSON.parse(storedImage))
    }

    // Phase 1: Show heatmap overlay for 5 seconds
    if (phase === 1) {
      const timer = setTimeout(() => {
        setPhase(2)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [phase])

  const handleContinue = () => {
    const button = document.querySelector('.cta-button')
    if (button) {
      button.style.transition = 'transform 0.1s'
      button.style.transform = 'scale(0.95)'

      setTimeout(() => {
        button.style.transform = 'scale(1)'
      }, 100)
    }

    setTimeout(() => {
      document.body.style.transition = 'opacity 0.8s ease'
      document.body.style.opacity = '0'

      setTimeout(() => {
        // Calculate and store initial Context IQ
        if (analysis && analysis.contextIQ) {
          localStorage.setItem('contextIQ', analysis.contextIQ)
        }

        navigate('/dashboard')
      }, 800)
    }, 200)
  }

  if (!analysis || !image) {
    return <div className="loading-screen">Loading analysis...</div>
  }

  if (phase === 1) {
    // Phase 1: AI Overlay View
    return (
      <div className="baseline-analysis-phase1">
        <img
          src={image.url}
          alt={image.alt}
          className="analysis-image"
        />

        {/* Heatmap Overlay */}
        <div className="heatmap-overlay">
          {/* Simulated heatmap zones */}
          <div className="heat-zone" style={{ top: '20%', left: '30%', opacity: 0.8 }} />
          <div className="heat-zone" style={{ top: '40%', left: '60%', opacity: 0.6 }} />
          <div className="heat-zone" style={{ top: '65%', left: '45%', opacity: 0.7 }} />
        </div>

        {/* Floating Keywords */}
        <div className="keyword-tag" style={{ top: '25%', left: '30%', animationDelay: '0s' }}>
          TIME
        </div>
        <div className="keyword-tag" style={{ top: '40%', left: '60%', animationDelay: '0.2s' }}>
          SOLITUDE
        </div>
        <div className="keyword-tag" style={{ top: '65%', left: '45%', animationDelay: '0.4s' }}>
          MEANING
        </div>

        {/* Bottom Text */}
        <div className="bottom-overlay-text">
          This is what the AI understood from your description.
        </div>
      </div>
    )
  }

  // Phase 2: Comparison View
  return (
    <div className="baseline-analysis-phase2">
      {/* Left Column - Your Focus */}
      <div className="comparison-column left-column">
        <h2>YOU FOCUSED ON</h2>
        <div className="column-divider" />

        <ul className="focus-list">
          {analysis.humanFocus.map((item, index) => (
            <li key={index} className="focus-item">{item}</li>
          ))}
        </ul>

        <div className="coverage-score">
          Coverage: {analysis.humanCoverage}%
        </div>
      </div>

      {/* Center Divider */}
      <div className="center-divider" />

      {/* Right Column - AI Focus */}
      <div className="comparison-column right-column">
        <h2>AI FOCUSED ON</h2>
        <div className="column-divider" />

        <ul className="focus-list">
          {analysis.aiFocus.map((item, index) => (
            <li key={index} className="focus-item">{item}</li>
          ))}
        </ul>

        <div className="coverage-score">
          Coverage: {analysis.aiCoverage}%
        </div>
      </div>

      {/* Bottom Message */}
      <div className="bottom-message">
        <p className="message-text">
          You saw {analysis.humanCoverage}% of meaning.<br />
          The AI saw {analysis.aiCoverage}%.<br />
          <br />
          Welcome to <span className="highlight">the gap</span>.
        </p>

        <button className="cta-button" onClick={handleContinue}>
          Close the Gap →
        </button>

        <p className="stats-text">
          Initial Context IQ: {analysis.contextIQ}
        </p>
      </div>
    </div>
  )
}

export default BaselineAnalysis
