import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Awakening.css'

function Awakening() {
  const navigate = useNavigate()
  const [buttonVisible, setButtonVisible] = useState(false)

  useEffect(() => {
    // Show button after text animations (3 seconds)
    const timer = setTimeout(() => {
      setButtonVisible(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const createRipple = (e) => {
    const button = e.currentTarget
    const ripple = document.createElement('div')
    const rect = button.getBoundingClientRect()

    ripple.style.position = 'fixed'
    ripple.style.left = e.clientX + 'px'
    ripple.style.top = e.clientY + 'px'
    ripple.style.width = '0'
    ripple.style.height = '0'
    ripple.style.borderRadius = '50%'
    ripple.style.background = 'var(--color-primary-red)'
    ripple.style.opacity = '0.6'
    ripple.style.animation = 'rippleExpand 0.8s ease-out'
    ripple.style.pointerEvents = 'none'
    ripple.style.zIndex = '9999'

    document.body.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
      document.querySelector('.awakening-screen').style.opacity = '0'
      setTimeout(() => {
        navigate('/identity')
      }, 300)
    }, 800)
  }

  return (
    <div className="awakening-screen">
      <div className="awakening-content">
        <p className="awakening-text line-1">
          Every machine learns from context.
        </p>
        <p className="awakening-text line-2">
          Do you?
        </p>

        {buttonVisible && (
          <button className="awakening-button" onClick={createRipple}>
            Enter the Loop
          </button>
        )}
      </div>
    </div>
  )
}

export default Awakening
