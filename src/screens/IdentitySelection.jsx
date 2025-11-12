import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './IdentitySelection.css'

const identityCards = [
  {
    id: 'creator',
    title: 'CREATOR',
    description: 'I want to express ideas with precision.',
    subtitle: 'For designers, writers, and communicators',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="32" cy="26" r="8" />
        <path d="M32 34 L32 50" />
        <path d="M26 44 L38 44" />
        <path d="M28 50 L36 50" />
        <path d="M32 10 L32 18" />
      </svg>
    ),
  },
  {
    id: 'learner',
    title: 'LEARNER',
    description: 'I want to understand how AI thinks.',
    subtitle: 'For students, curious minds, and researchers',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 32 Q20 20, 32 20 Q44 20, 44 32 Q44 44, 32 44 Q20 44, 20 32" />
        <circle cx="28" cy="30" r="2" fill="currentColor" />
        <circle cx="36" cy="30" r="2" fill="currentColor" />
        <path d="M26 36 Q32 40, 38 36" />
        <path d="M16 28 L20 32 L16 36" />
        <path d="M48 28 L44 32 L48 36" />
      </svg>
    ),
  },
  {
    id: 'professional',
    title: 'PROFESSIONAL',
    description: 'I want to optimize my AI workflows.',
    subtitle: 'For engineers, analysts, and specialists',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="32" cy="32" r="4" fill="currentColor" />
        <circle cx="32" cy="16" r="3" />
        <circle cx="46" cy="24" r="3" />
        <circle cx="46" cy="40" r="3" />
        <circle cx="32" cy="48" r="3" />
        <circle cx="18" cy="40" r="3" />
        <circle cx="18" cy="24" r="3" />
        <path d="M32 16 L32 28 M32 36 L32 48" />
        <path d="M35 30 L43 26 M35 34 L43 38" />
        <path d="M29 30 L21 26 M29 34 L21 38" />
      </svg>
    ),
  },
]

function IdentitySelection() {
  const navigate = useNavigate()
  const [selectedRole, setSelectedRole] = useState(null)

  const handleCardClick = (roleId) => {
    setSelectedRole(roleId)
    localStorage.setItem('userRole', roleId)
  }

  const handleContinue = () => {
    if (!selectedRole) return

    const selectedCard = document.querySelector(`[data-role="${selectedRole}"]`)
    if (selectedCard) {
      selectedCard.style.transition = 'all 0.6s ease'
      selectedCard.style.transform = 'scale(1.1)'
      selectedCard.style.opacity = '0'
    }

    setTimeout(() => {
      navigate('/signup')
    }, 600)
  }

  return (
    <div className="identity-selection-screen">
      <div className="identity-header">
        <h1>Choose your path</h1>
        <p>How will you master context?</p>
      </div>

      <div className="identity-cards">
        {identityCards.map((card) => (
          <div
            key={card.id}
            className={`identity-card ${selectedRole === card.id ? 'selected' : ''} ${
              selectedRole && selectedRole !== card.id ? 'faded' : ''
            }`}
            data-role={card.id}
            onClick={() => handleCardClick(card.id)}
          >
            <div className="card-icon">{card.icon}</div>
            <h2 className="card-title">{card.title}</h2>
            <p className="card-description">{card.description}</p>
            <p className="card-subtitle">{card.subtitle}</p>
          </div>
        ))}
      </div>

      <button
        className={`continue-button ${selectedRole ? 'visible' : ''}`}
        onClick={handleContinue}
        disabled={!selectedRole}
      >
        Continue →
      </button>
    </div>
  )
}

export default IdentitySelection
