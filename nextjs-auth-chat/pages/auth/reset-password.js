// reset password page
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import styles from '../../styles/authStyle.module.css';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [form, setForm] = useState({
    otp: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [error, setError] = useState(null)
  const [zodErrror, setZodError] = useState(null)
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()


  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    // console.log(storedEmail);
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setMessage(null)

    if (form.newPassword !== form.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/reset-password',
        {
          email: email,
          otp: form.otp,
          newPassword: form.newPassword,
          confirmPassword: form.confirmPassword,
        },
        { withCredentials: true }
      )
      setMessage(res.data?.message || 'Password reset successfully')
      
      router.push('/auth/login');
      console.log(message);
      
    } catch (err) {
      //console.log(err.response?.data[0]?.message);
      setZodError(err.response?.data[0]?.message);
      setError(err.response?.data?.error || 'Failed to reset password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <h1 className={styles.heading}>Reset Password</h1>

        {message && <div className="text-red-500 text-sm mb-4 text-center">{message}</div>}
        {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}
        {zodErrror && (
          <div className="text-red-500 text-sm mb-4 text-center">{zodErrror}</div>
        )}
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            className={styles.inputBox}
            type="text"
            name="otp"
            placeholder="OTP from Email"
            value={form.otp}
            onChange={handleChange}
            required
          />
          <input
            className={styles.inputBox}
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={form.newPassword}
            onChange={handleChange}
            required
          />
          <input
            className={styles.inputBox}
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          <button
            className={styles.button}
            type="submit"
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  )
}
