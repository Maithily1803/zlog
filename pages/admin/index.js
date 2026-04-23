import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../../components/Navbar'
import Link from 'next/link'

export default function AdminDashboard() {
  const [posts, setPosts] = useState([])
  const router = useRouter()

  useEffect(() => {
    fetch('/api/posts').then(r => r.json()).then(setPosts)
  }, [])

  async function deletePost(id) {
    if (!confirm('Delete this post?')) return
    await fetch(`/api/posts/${id}`, { method: 'DELETE' })
    setPosts(posts.filter(p => p._id !== id))
  }

  function logout() {
    document.cookie = 'token=; Max-Age=0; Path=/'
    router.push('/login')
  }

  return (
    <div>
      <Navbar />
      <main className="container admin-page">
        <div className="admin-header">
          <h2>Admin Dashboard</h2>
          <div>
            <Link href="/admin/new" className="btn-primary">+ New Post</Link>
            <button onClick={logout} className="btn-outline" style={{ marginLeft: '10px' }}>Logout</button>
          </div>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post._id}>
                <td><Link href={`/posts/${post._id}`}>{post.title}</Link></td>
                <td>{post.author}</td>
                <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                <td>
                  <Link href={`/admin/edit/${post._id}`} className="action-link">Edit</Link>
                  <button onClick={() => deletePost(post._id)} className="action-delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  )
}