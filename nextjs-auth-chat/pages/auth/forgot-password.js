// forgot password page
import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import styles from '../../styles/authStyle.module.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setMessage(null)
    setLoading(true)

    try {
      await axios.post(
        'http://localhost:5000/api/auth/forgot-password',
        { email },
        { withCredentials: true }
      )
      setMessage('If this email is registered, a reset OTP has been sent.')
      router.push('/auth/reset-password')

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset email')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <h1 className={styles.heading}>Forgot Password</h1>

        {message && <div className="text-red-500 text-sm mb-4 text-center">{message}</div>}
        {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            className={styles.inputBox}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required

          />

          <button
            className={styles.button}
            type="submit"
            disabled={loading}

          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <p className={styles.para}>
          Remember the password?{' '}
          <a href="/auth/login" className={styles.link}>
            Sign In
          </a>
        </p>
      </div>
    </div>
  )
}
