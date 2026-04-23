import Navbar from '../../components/Navbar'
import Link from 'next/link'

export default function PostPage({ post }) {
  if (!post) return (
    <div>
      <Navbar />
      <main className="container post-detail">
        <Link href="/" className="back-link">← Back to all posts</Link>
        <p className="empty">Post not found.</p>
      </main>
    </div>
  )

  const date = new Date(post.createdAt).toLocaleDateString('en-US', {
    day: 'numeric', month: 'long', year: 'numeric'
  })

  return (
    <div>
      <Navbar />
      <main className="container post-detail">
        <Link href="/" className="back-link">← Back to all posts</Link>
        {post.coverImage && <img src={post.coverImage} alt={post.title} className="detail-img" />}
        <span className="card-meta">{post.author} • {date}</span>
        <h1>{post.title}</h1>
        <div className="card-tags">
          {post.tags && post.tags.map(t => <span key={t} className="tag">{t}</span>)}
        </div>
        <article className="post-content">{post.content}</article>
      </main>
    </div>
  )
}

export async function getServerSideProps({ params, req }) {
  const protocol = req.headers['x-forwarded-proto'] || 'http'
  const host = req.headers.host

  try {
    const res = await fetch(`${protocol}://${host}/api/posts/${params.id}`)
    if (!res.ok) return { props: { post: null } }
    const post = await res.json()
    return { props: { post } }
  } catch {
    return { props: { post: null } }
  }
}