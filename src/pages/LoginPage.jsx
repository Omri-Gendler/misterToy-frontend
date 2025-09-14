import { useState } from 'react'
import { authService } from '../services/auth.service'

export function LoginPage({ onLogin }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  function handleChange(ev) {
    const { name, value } = ev.target
    setCredentials(prev => ({ ...prev, [name]: value }))
  }

  async function onSubmit(ev) {
    ev.preventDefault()
    setIsLoading(true)
    setError('')
    try {
      const user = await authService.login(credentials)
      onLogin && onLogin(user)
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="login-page">
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <label>
          Username
          <input
            name="username"
            value={credentials.username}
            onChange={handleChange}
            autoComplete="username"
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
            autoComplete="current-password"
            required
          />
        </label>
        <button disabled={isLoading}>{isLoading ? 'Logging in...' : 'Login'}</button>
        {error && <p className="error">{error}</p>}
      </form>
    </section>
  )
}