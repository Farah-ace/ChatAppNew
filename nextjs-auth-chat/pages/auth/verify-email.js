// verify email page
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux';
import axios from 'axios'
import styles from '../../styles/authStyle.module.css';

export default function VerifyEmail() {

  const [email, setEmail] = useState('');
  const [form, setForm] = useState({ otp: '' })
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
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
    setLoading(true)

    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/verify-email',
        {
          email: email,
          otp: form.otp
        },
        { withCredentials: true }
      )

      console.log(res);

      setMessage('Email verified successfully! You can now login.')
      setTimeout(() => router.push('/auth/login'), 3000)
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <h1 className={styles.heading}>Verify Email</h1>

        {message && <div className="text-red-500 text-sm mb-4 text-center">{message}</div>}
        {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            className={styles.inputBox}
            type="text"
            name="otp"
            placeholder="Verification OTP"
            value={form.otp}
            onChange={handleChange}
            required

          />

          <button
            className={styles.button}
            type="submit"
            disabled={loading}

          >
            {loading ? 'Verifying...' : 'Verify Email'}
          </button>
        </form>
      </div>
    </div>
  )
}
