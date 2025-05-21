// forgot password page
import { useState } from 'react'
import axios from 'axios'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setMessage(null)
    setLoading(true)

    try {
      await axios.post(
        'http://localhost:5000/api/forgot-password',
        { email },
        { withCredentials: true }
      )
      setMessage('If this email is registered, a reset link has been sent.')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset email')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div >
        <h1>Forgot Password</h1>

        {message && (
          <p>{message}</p>
        )}
        {error && <p >{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required

          />

          <button
            type="submit"
            disabled={loading}

          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <p >
          Remembered?{' '}
          <a href="/auth/login" >
            Sign In
          </a>
        </p>
      </div>
    </div>
  )
}
