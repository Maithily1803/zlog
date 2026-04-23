import { useState } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../../../components/Navbar'

export default function EditPost({ post }) {
  const router = useRouter()
  const [form, setForm] = useState({
    title: post.title,
    content: post.content,
    author: post.author || 'Admin',
    tags: (post.tags || []).join(', '),
    coverImage: post.coverImage || '',
  })
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    const body = {
      ...form,
      author: form.author.trim() || 'Admin',
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
    }
    const res = await fetch(`/api/posts/${post._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (res.ok) {
      router.push('/admin')
    } else {
      setError('Update failed. Check your session.')
    }
  }

  return (
    <div>
      <Navbar />
      <main className="container post-form-page">
        <h2>Edit Post</h2>
        {error && <p className="error">{error}</p>}
        <form className="post-form" onSubmit={handleSubmit}>
          <label>Title</label>
          <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
          <label>Author</label>
          <input type="text" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} />
          <label>Content</label>
          <textarea rows={10} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} required />
          <label>Tags (comma separated)</label>
          <input type="text" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} />
          <label>Cover Image URL</label>
          <input
            type="text"
            value={form.coverImage}
            onChange={e => setForm({ ...form, coverImage: e.target.value })}
            placeholder="https://picsum.photos/id/65.."
          />
          {form.coverImage && (
            <img
              src={form.coverImage}
              alt="Cover preview"
              referrerPolicy="no-referrer"
              style={{ width: '100%', maxHeight: 200, objectFit: 'cover', borderRadius: 6 }}
              onError={e => { e.target.style.display = 'none' }}
            />
          )}
          <button type="submit" className="btn-primary">Update Post</button>
        </form>
      </main>
    </div>
  )
}

export async function getServerSideProps({ params, req }) {
  const protocol = req.headers['x-forwarded-proto'] || 'http'
  const host = req.headers.host
  const res = await fetch(`${protocol}://${host}/api/posts/${params.id}`)
  if (!res.ok) return { notFound: true }
  const post = await res.json()
  return { props: { post } }
}