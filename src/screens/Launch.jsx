import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Launch.css'

function Launch() {
  const navigate = useNavigate()

  useEffect(() => {
    // Navigate to Awakening screen after 2 seconds
    const timer = setTimeout(() => {
      document.querySelector('.launch-screen').style.opacity = '0'
      setTimeout(() => {
        navigate('/awakening')
      }, 500)
    }, 2000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="launch-screen">
      <div className="launch-content">
        {/* Loop Icon */}
        <svg className="loop-icon" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M32 8 C 20 8, 12 16, 12 28 C 12 36, 16 42, 22 44 M 32 56 C 44 56, 52 48, 52 36 C 52 28, 48 22, 42 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="22" cy="44" r="3" fill="currentColor" />
          <circle cx="42" cy="20" r="3" fill="currentColor" />
        </svg>

        {/* Logo Text */}
        <h1 className="loop-logo">LOOP</h1>
      </div>

      {/* Tagline */}
      <p className="loop-tagline">
        Where human learning meets machine understanding
      </p>
    </div>
  )
}

export default Launch
