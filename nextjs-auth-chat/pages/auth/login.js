// login page
import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUser, setToken } from '../../store/authSlice'
import styles from '../../styles/authStyle.module.css';


export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const [zodErrror, setZodError] = useState(null)
  const [message, setMessage] = useState(null)
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
        'http://localhost:5000/api/auth/login',
        {
          email: form.email,
          password: form.password,
        },
        { withCredentials: true }
      )

      setMessage(res.data?.message || 'Login successfully')
      dispatch(setUser(res.data.user));
      dispatch(setToken(res.data.token));

      if (res.data.user.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push('/chat/chatUsers')
      }

    } catch (err) {
      setZodError(err.response?.data[0]?.message)
      setError(err.response?.data?.error || 'Login failed')

    }
  }

  return (

    <div className={styles.container}>
      <div className={styles.subContainer}>
        <h1 className={styles.heading}>Login</h1>

        {message && (<div className="text-red-500 text-sm mb-4 text-center">{message}</div>)}
        {error && (
          <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
        )}
        {zodErrror && (
          <div className="text-red-500 text-sm mb-4 text-center">{zodErrror}</div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>

          <input
            className={styles.inputBox}
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            className={styles.inputBox}
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button
            className={styles.button}
            type="submit"
          >
            Sign In
          </button>
        </form>

        <div>
          <p className={styles.para}>
            Forgot password?{' '}
            <a href="/auth/forgot-password" className={styles.link}>
              Reset here
            </a>
          </p>
          <p className={styles.para}>
            Don't have an account?{' '}
            <a href="/auth/signup" className={styles.link}>
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

