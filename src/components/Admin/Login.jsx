import React, { useState } from 'react'

function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    if (!email.trim() || !password) {
      setError('Please enter email and password')
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

      let data = null

      try {
        data = await response.json()
      } catch {
        // Response did not contain JSON
      }

      if (!response.ok) {
        throw new Error(
          data?.message || 'Login failed. Please try again.'
        )
      }

      onLogin(data.token)
      setError('')
    } catch (err) {
      setError(err.message || 'Login failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="brand-icon">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.5"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>

        <h2
          style={{
            textAlign: 'center',
            fontSize: '24px',
            fontWeight: '700',
            marginBottom: '6px',
            color: '#fff'
          }}
        >
          Welcome Back
        </h2>

        <p
          style={{
            textAlign: 'center',
            color: '#64748B',
            fontSize: '14px',
            marginBottom: '32px'
          }}
        >
          Sign in to manage Hanks BBQ
        </p>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Email Address</label>

            <input
              type="email"
              className="form-input"
              placeholder="admin@shmaksbbq.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>

            <input
              type="password"
              className="form-input"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-red btn-full"
            style={{
              marginTop: '8px',
              padding: '12px'
            }}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          {error && (
            <div
              style={{
                color: '#F87171',
                textAlign: 'center',
                marginTop: '16px',
                fontSize: '13px'
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

export default Login