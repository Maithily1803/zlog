import Link from 'next/link'

export default function PostCard({ post }) {
  const date = new Date(post.createdAt).toLocaleDateString('en-US', {
    day: 'numeric', month: 'short', year: 'numeric'
  })

  return (
    <div className="post-card">
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="card-img"
          referrerPolicy="no-referrer"
          onError={e => { e.target.style.display = 'none' }}
        />
      )}
      <div className="card-body">
        <span className="card-meta">{post.author} • {date}</span>
        <h3 className="card-title">
          <Link href={`/posts/${post._id}`}>{post.title}</Link>
        </h3>
        <p className="card-excerpt">{post.content.slice(0, 100)}...</p>
        <div className="card-tags">
          {post.tags && post.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
        </div>
      </div>
    </div>
  )
}