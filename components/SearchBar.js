import { useState } from 'react'
import { useRouter } from 'next/router'

export default function SearchBar({ defaultValue = '' }) {
  const [query, setQuery] = useState(defaultValue)
  const router = useRouter()

  function handleSearch(e) {
    e.preventDefault()
    router.push(query ? `/?search=${query}` : '/')
  }

  return (
    <form className="search-form" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search stories, topics, tags..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-btn">Search</button>
    </form>
  )
}