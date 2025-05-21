// login page
import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUser } from '../../store/authSlice'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const router = useRouter()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      const res = await axios.post(
        'http://localhost:5000/api/login',
        {
          email: form.email,
          password: form.password,
        },
        { withCredentials: true }
      )

      dispatch(setUser(res.data.user)) // Save user in Redux store
      router.push('/pages/chat')
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed')

    }
  }

  return (
    <div>
      <div>
        <h1>Login</h1>

        {error && <p>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
          >
            Sign In
          </button>
        </form>

        <div>
          <p>
            Forgot password?{' '}
            <a href="/auth/forgot-password">
              Reset here
            </a>
          </p>
          <p>
            Don't have an account?{' '}
            <a href="/auth/signup">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
