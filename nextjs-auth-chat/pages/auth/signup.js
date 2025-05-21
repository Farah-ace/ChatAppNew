// signup page

import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../store/authSlice'

export default function SignupPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState(null)
  const router = useRouter()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (form.password !== form.confirmPassword) {
      return setError('Passwords do not match')
    }

    try {
      const res = await axios.post(
        'http://localhost:5000/api/register',
        {
          name: form.name,
          email: form.email,
          password: form.password,
        },
        { withCredentials: true }
      )
      
      

      // Auto login after signup
      dispatch(loginUser({ email: form.email, password: form.password }))
      router.push('/auth/verify-email')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div>
      <div>
        <h1>Sign Up</h1>

        {error && (
          <div>{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

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

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            
          />

          <button
            type="submit"
           
          >
            Register
          </button>
        </form>

        <p>
          Already have an account?{' '}
          <a href="/auth/login">
            Sign In
          </a>
        </p>
      </div>
    </div>
  )
}
