import { useState } from 'react'
import { authService } from '../services/auth.service'

export function SignupPage({ onSignup }) {
  const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })
  const [error, setError] = useState('')

  function handleChange(ev) {
    const { name, value } = ev.target
    setCredentials(prev => ({ ...prev, [name]: value }))
  }

  async function onSubmit(ev) {
    ev.preventDefault()
    setError('')
    try {
      const user = await authService.signup(credentials)
      onSignup && onSignup(user)
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed')
    }
  }

  return (
    <section className="signup-page">
      <h2>Signup</h2>
      <form onSubmit={onSubmit}>
        <label>
          Full Name
          <input
            name="fullname"
            value={credentials.fullname}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Username
          <input
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </label>
        <button>Signup</button>
        {error && <p className="error">{error}</p>}
      </form>
    </section>
  )
}