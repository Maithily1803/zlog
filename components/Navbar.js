import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Navbar() {
  const router = useRouter()

  async function logout() {
    await fetch('/api/auth/login', { method: 'DELETE' }).catch(() => {})
    document.cookie = 'token=; Max-Age=0; Path=/'
    router.push('/login')
  }

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <Link href="/" className="logo">✦ Inside Design</Link>
        <div className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/login" className="btn-outline">Admin</Link>
        </div>
      </div>
    </nav>
  )
}