// forgot password page
import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import styles from '../../styles/authStyle.module.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const [zodErrror, setZodError] = useState(null)
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setMessage(null)
    setLoading(true)
    localStorage.setItem('email', `${email}`);
    //console.log(email);

    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/forgot-password',
        { email },
        { withCredentials: true }
      )
      setMessage(res.data?.message ||'If this email is registered, a reset OTP has been sent.')
      router.push('/auth/reset-password')

    } catch (err) {
      setZodError(err.response?.data[0]?.message);
      setError(err.response?.data?.error || 'Failed to send reset email')
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
        {zodErrror && (
          <div className="text-red-500 text-sm mb-4 text-center">{zodErrror}</div>
        )}
        
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
