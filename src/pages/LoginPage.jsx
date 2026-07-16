import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!email.trim() || !password) {
      setError('Please enter your email and password.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(
        'http://localhost:5184/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email.trim(),
            password
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Login failed.')
      }

      localStorage.setItem('user_token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      if (data.user.role === 'Admin') {
        navigate('/shmaksadmin432000')
      } else {
        navigate('/')
      }
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
          Customer Login
        </h2>

        <p
          style={{
            textAlign: 'center',
            color: '#64748B',
            fontSize: '14px',
            marginBottom: '32px'
          }}
        >
          Sign in to your account
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>

            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>

            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={loading}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-red btn-full"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Login'}
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
        </form>
      </div>
    </div>
  )
}

export default LoginPage