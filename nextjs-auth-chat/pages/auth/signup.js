// signup page
import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import styles from '../../styles/authStyle.module.css';

export default function SignupPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const [zodErrror, setZodError] = useState(null)

  const router = useRouter()
  const dispatch = useDispatch()


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    localStorage.setItem('email', `${form.email}`);

    if (form.password !== form.confirmPassword) {
      return setError('Passwords do not match')
    }

    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/register',
        {
          name: form.name,
          email: form.email,
          password: form.password,
          confirmPassword: form.confirmPassword,
        },
        { withCredentials: true }
      )

      setMessage(res.data?.message || 'Account registered successfully')
      router.push('/auth/verify-email')

    } catch (err) {
      setZodError(err.response?.data[0]?.message);
      //console.log("zod error", err.response?.data[0]?.message);
      setError(err.response?.data?.error);
    }
  }

  return (

    <div className={styles.container}>
      <div className={styles.subContainer}>
        <h1 className={styles.heading}>Sign Up</h1>

        {message && (<div className="text-red-500 text-sm mb-4 text-center">{message}</div>)}
        {error && (
          <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
        )}
        {zodErrror && (
          <div className="text-red-500 text-sm mb-4 text-center">{zodErrror}</div>
        )}

        <form className={styles.form}
          onSubmit={handleSubmit} >
          <input className={styles.inputBox}
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

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

          <input
            className={styles.inputBox}
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className={styles.button}
          >
            Register
          </button>
        </form>


        <p className={styles.para}>
          Already have an account?{' '}
          <a href="/auth/login" className={styles.link}>
            Sign In
          </a>
        </p>
      </div>
    </div>

  )
}
