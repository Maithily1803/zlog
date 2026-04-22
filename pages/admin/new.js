import { useState } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../../components/Navbar'

export default function NewPost() {
  const [form, setForm] = useState({ title: '', content: '', tags: '', coverImage: '' })
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    const body = {
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
    }
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (res.ok) {
      router.push('/admin')
    } else {
      setError('Failed to create post. Are you logged in?')
    }
  }

  return (
    <div>
      <Navbar />
      <main className="container post-form-page">
        <h2>Create New Post</h2>
        {error && <p className="error">{error}</p>}
        <form className="post-form" onSubmit={handleSubmit}>
          <label>Title</label>
          <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
          <label>Content</label>
          <textarea rows={10} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} required />
          <label>Tags (comma separated)</label>
          <input type="text" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} placeholder="Design, Research, UX" />
          <label>Cover Image URL</label>
          <input type="text" value={form.coverImage} onChange={e => setForm({ ...form, coverImage: e.target.value })} />
          <button type="submit" className="btn-primary">Publish Post</button>
        </form>
      </main>
    </div>
  )
}