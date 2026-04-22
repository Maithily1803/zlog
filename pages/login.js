import { useState } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../components/Navbar'

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      router.push('/admin')
    } else {
      setError('Invalid username or password')
    }
  }

  return (
    <div>
      <Navbar />
      <main className="container login-page">
        <div className="login-box">
          <h2>Admin Login</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </main>
    </div>
  )
}