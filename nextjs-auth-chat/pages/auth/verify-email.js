// verify email page
import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function VerifyEmail() {
  const [form, setForm] = useState({ email: '', otp: '' })
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setMessage(null)
    setLoading(true)

    try {
      await axios.post(
        'http://localhost:5000/api/verify-email',
        { email: form.email, otp: form.otp },
        { withCredentials: true }
      )
      setMessage('Email verified successfully! You can now login.')
      setTimeout(() => router.push('/auth/login'), 3000)
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div>
        <h1>Verify Email</h1>

        {message && <p >{message}</p>}
        {error && <p>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Registered Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="otp"
            placeholder="Verification OTP"
            value={form.otp}
            onChange={handleChange}
            required

          />

          <button
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
