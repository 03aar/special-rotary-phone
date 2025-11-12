import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './BaselineChallenge.css'

// Placeholder baseline images (these would be real images in production)
const baselineImages = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?w=800&q=80',
    alt: 'Abstract surreal art scene',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80',
    alt: 'Person releasing balloon',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1500622628084-5c1986e5baf8?w=800&q=80',
    alt: 'Empty park bench in rain',
  },
]

function BaselineChallenge() {
  const navigate = useNavigate()
  const [response, setResponse] = useState('')
  const [charCount, setCharCount] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Select a random image
  const [selectedImage] = useState(() =>
    baselineImages[Math.floor(Math.random() * baselineImages.length)]
  )

  const handleTextChange = (e) => {
    const text = e.target.value
    if (text.length <= 500) {
      setResponse(text)
      setCharCount(text.length)
    }
  }

  const handleSubmit = async () => {
    if (charCount < 10) return

    setIsSubmitting(true)

    // Create scanning animation
    const scanOverlay = document.createElement('div')
    scanOverlay.className = 'scan-overlay'
    document.body.appendChild(scanOverlay)

    try {
      // Simulate AI analysis
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock analysis results
      const analysis = {
        imageId: selectedImage.id,
        userResponse: response,
        humanFocus: [
          'Emotional tone',
          'Symbolic meaning',
          'Abstract concepts',
          'Philosophical interpretation',
        ],
        humanCoverage: 82,
        aiFocus: [
          'Object identification',
          'Spatial relationships',
          'Color composition',
          'Literal elements',
        ],
        aiCoverage: 61,
        contextIQ: 70,
      }

      // Store analysis
      sessionStorage.setItem('baselineAnalysis', JSON.stringify(analysis))
      sessionStorage.setItem('baselineImage', JSON.stringify(selectedImage))

      // Navigate to analysis screen
      setTimeout(() => {
        scanOverlay.remove()
        navigate('/baseline-analysis')
      }, 1500)
    } catch (error) {
      console.error('Analysis failed:', error)
      setIsSubmitting(false)
      scanOverlay.remove()
    }
  }

  const getCharCountClass = () => {
    if (charCount > 500) return 'error'
    if (charCount > 450) return 'warning'
    return ''
  }

  return (
    <div className="baseline-challenge-screen">
      {/* Left Panel - Image */}
      <div className="challenge-left-panel">
        <div className="challenge-header">
          <h1>Baseline Challenge</h1>
          <p>Let's see how you see.</p>
        </div>

        <div className="challenge-image-container">
          <img
            src={selectedImage.url}
            alt={selectedImage.alt}
            className="challenge-image"
          />
          <div className="image-caption">Image 1 of 1</div>
        </div>
      </div>

      {/* Right Panel - Input */}
      <div className="challenge-right-panel">
        <div className="challenge-instructions">
          <p>Describe what you see.</p>
          <p>Be as detailed or as simple as you like.</p>
        </div>

        <textarea
          className="challenge-textarea"
          placeholder="Start typing..."
          value={response}
          onChange={handleTextChange}
          disabled={isSubmitting}
        />

        <div className={`char-counter ${getCharCountClass()}`}>
          {charCount} / 500
        </div>

        <button
          className={`submit-button ${charCount >= 10 && !isSubmitting ? 'enabled' : ''}`}
          onClick={handleSubmit}
          disabled={charCount < 10 || isSubmitting}
        >
          {isSubmitting ? 'Analyzing...' : 'Submit Description'}
        </button>
      </div>
    </div>
  )
}

export default BaselineChallenge
