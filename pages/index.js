import Navbar from '../components/Navbar'
import PostCard from '../components/PostCard'
import SearchBar from '../components/SearchBar'

export default function Home({ posts, search }) {
  const featured = posts[0]
  const recent = posts.slice(1, 4)
  const rest = posts.slice(4)

  return (
    <div>
      <Navbar />

      <section className="hero">
        <h1>Zlog: Stories and Perspectives</h1>
        <p>Ideas on technology, design, culture and the way we work.</p>
        <SearchBar defaultValue={search} />
      </section>

      <main className="container">
        {posts.length === 0 && <p className="empty">No posts found.</p>}

        {!search && featured && (
          <section className="section">
            <h2 className="section-title">Recent blog posts</h2>
            <div className="featured-grid">
              <div className="featured-main">
                {featured.coverImage && <img src={featured.coverImage} alt={featured.title} />}
                <span className="card-meta">{featured.author} • {new Date(featured.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                <h2><a href={`/posts/${featured._id}`}>{featured.title}</a></h2>
                <p>{featured.content.slice(0, 140)}...</p>
                <div className="card-tags">
                  {featured.tags && featured.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
              <div className="featured-side">
                {recent.map(p => <PostCard key={p._id} post={p} />)}
              </div>
            </div>
          </section>
        )}

        <section className="section">
          <h2 className="section-title">{search ? `Results for "${search}"` : 'All blog posts'}</h2>
          <div className="posts-grid">
            {(search ? posts : rest).map(p => <PostCard key={p._id} post={p} />)}
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Zlog. Built with Next.js.</p>
      </footer>
    </div>
  )
}

export async function getServerSideProps({ query, req }) {
  const search = query.search || ''
  const protocol = req.headers['x-forwarded-proto'] || 'http'
  const host = req.headers.host
  const url = `${protocol}://${host}/api/posts${search ? `?search=${search}` : ''}`

  try {
    const res = await fetch(url)
    if (!res.ok) return { props: { posts: [], search } }
    const posts = await res.json()
    return { props: { posts, search } }
  } catch {
    return { props: { posts: [], search } }
  }
}