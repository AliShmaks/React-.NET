import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function RegisterPage() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData(previous => ({
      ...previous,
      [name]: value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.password
    ) {
      setError('Please fill in all fields.')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(
        'http://localhost:5184/api/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fullName: formData.fullName.trim(),
            email: formData.email.trim(),
            password: formData.password
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || 'Registration failed.'
        )
      }

      setSuccess('Account created successfully.')

      setTimeout(() => {
        navigate('/login')
      }, 800)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-wrap">
      <div className="login-card">
        <h2
          style={{
            textAlign: 'center',
            fontSize: '24px',
            fontWeight: '700',
            marginBottom: '6px',
            color: '#fff'
          }}
        >
          Create Account
        </h2>

        <p
          style={{
            textAlign: 'center',
            color: '#64748B',
            fontSize: '14px',
            marginBottom: '32px'
          }}
        >
          Register as a customer
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              className="form-input"
              value={formData.fullName}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Email
            </label>

            <input
              type="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Password
            </label>

            <input
              type="password"
              name="password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              className="form-input"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-red btn-full"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>

          {error && (
            <div
              style={{
                color: '#F87171',
                textAlign: 'center',
                marginTop: '16px'
              }}
            >
              {error}
            </div>
          )}

          {success && (
            <div
              style={{
                color: '#4ADE80',
                textAlign: 'center',
                marginTop: '16px'
              }}
            >
              {success}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default RegisterPage