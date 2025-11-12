import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './AccountSetup.css'

function AccountSetup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    dataSyncEnabled: false,
  })
  const [errors, setErrors] = useState({})
  const [isValid, setIsValid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const newErrors = {}

    // Name validation
    if (formData.fullName.length > 0 && formData.fullName.length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters'
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.email.length > 0 && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    // Password validation
    if (formData.password.length > 0 && formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    setErrors(newErrors)

    // Check if form is complete and valid
    const isComplete =
      formData.fullName.length >= 2 &&
      emailRegex.test(formData.email) &&
      formData.password.length >= 8

    setIsValid(isComplete)
  }, [formData])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isValid) return

    setIsLoading(true)

    try {
      // Simulate account creation
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Store user data
      const userId = 'user_' + Date.now()
      localStorage.setItem('userId', userId)
      localStorage.setItem('userName', formData.fullName)
      localStorage.setItem('userEmail', formData.email)

      // Animate transition
      const formContainer = document.querySelector('.form-container')
      if (formContainer) {
        formContainer.style.transform = 'translateX(-100%)'
        formContainer.style.opacity = '0'
      }

      setTimeout(() => {
        navigate('/baseline')
      }, 500)
    } catch (error) {
      console.error('Account creation failed:', error)
      setErrors({ submit: 'Failed to create account. Please try again.' })
      setIsLoading(false)
    }
  }

  return (
    <div className="account-setup-screen">
      {/* Animated Background Orbs */}
      <div className="background-orb orb-1" />
      <div className="background-orb orb-2" />
      <div className="background-orb orb-3" />

      <div className="form-container">
        <h1>Your mind becomes your workspace</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={errors.fullName ? 'error' : formData.fullName.length >= 2 ? 'success' : ''}
              required
            />
            {errors.fullName && <span className="error-message">{errors.fullName}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className={errors.email ? 'error' : formData.email && !errors.email ? 'success' : ''}
              required
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password (min 8 characters)"
              className={errors.password ? 'error' : formData.password.length >= 8 ? 'success' : ''}
              required
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-checkbox">
            <input
              type="checkbox"
              id="dataSyncEnabled"
              name="dataSyncEnabled"
              checked={formData.dataSyncEnabled}
              onChange={handleChange}
            />
            <label htmlFor="dataSyncEnabled">
              Enable Cognitive Data Sync (Your learning patterns help improve Loop)
            </label>
          </div>

          {errors.submit && <div className="submit-error">{errors.submit}</div>}

          <button
            type="submit"
            className={`submit-button ${isValid ? 'enabled' : ''}`}
            disabled={!isValid || isLoading}
          >
            {isLoading ? 'Creating Profile...' : 'Create My Profile'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AccountSetup
