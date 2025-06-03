import './SignupForm.css' // ⬅️ import the CSS file
import { useState } from 'react'
import { FiMail, FiLock } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { signup } from '../services/auth'
import ev from "./../assets/ev.png"

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await signup(formData)
      setSuccess(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="signup-container">
        <div className="signup-box text-center">
          <img 
            src={ev} 
            alt="Success" 
            className="w-24 h-24 mb-4 mx-auto" 
          />
          
          <h2 className="signup-title">Account Created!</h2>
          <p className="text-gray-600 mb-6">
            Your account has been successfully created. You can now log in.
          </p>
         <Link 
  to="/" 
  className="signup-button block mx-auto mt-2"
>
  Go to Login
</Link>

        </div>
      </div>
    )
  }

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Create Account</h2>

        <form onSubmit={handleSubmit} className="signup-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div>
            <label className="input-label">Email</label>
            <div className="input-wrapper">
              <FiMail className="input-icon" />
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
          </div>

          <div>
            <label className="input-label">Password</label>
            <div className="input-wrapper">
              <FiLock className="input-icon" />
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="signup-button"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>

          <div className="signup-footer">
            Already have an account?{' '}
            <Link to="/">Log in</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignupPage
