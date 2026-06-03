import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import { PRODUCTS, CATEGORIES } from '../data/products'
import type { Category } from '../types'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState<'All' | Category>('All')

  // Sync category from URL param
  useEffect(() => {
    const cat = searchParams.get('cat')
    if (cat) setActiveFilter(cat as Category)
  }, [searchParams])

  const setFilter = (cat: 'All' | Category) => {
    setActiveFilter(cat)
    if (cat === 'All') setSearchParams({})
    else setSearchParams({ cat })
  }

  const filtered = PRODUCTS.filter(p => {
    const matchesCat = activeFilter === 'All' || p.category === activeFilter
    const matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase())
    return matchesCat && matchesSearch
  })

  return (
    <div style={{ paddingTop: 'var(--nav-h)' }}>
      {/* Page Header */}
      <div style={{ background: 'linear-gradient(180deg, var(--bg2), var(--bg))', padding: '52px 24px 40px', textAlign: 'center', borderBottom: '1px solid var(--border)' }}>
        <h1 style={{ fontFamily: '"Playfair Display",serif', fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 700, color: '#fff' }}>
          Our Products
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: 10, fontSize: 16 }}>
          Premium electronics & home goods — discover your next upgrade
        </p>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px' }}>
        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 50, padding: '10px 20px', marginBottom: 24, gap: 10 }}>
          <Search size={18} color="var(--text-muted)" style={{ flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ background: 'none', border: 'none', color: '#fff', fontSize: 15, fontFamily: '"DM Sans",sans-serif', flex: 1, outline: 'none' }}
          />
          {search && (
            <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 18, lineHeight: 1 }}>×</button>
          )}
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32 }}>
          {(['All', ...CATEGORIES.map(c => c.name)] as Array<'All' | Category>).map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                background: activeFilter === cat ? 'var(--gold)' : 'var(--bg2)',
                border: `1px solid ${activeFilter === cat ? 'var(--gold)' : 'var(--border)'}`,
                color: activeFilter === cat ? '#fff' : 'var(--text-muted)',
                padding: '8px 20px',
                borderRadius: 50,
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all .2s',
                fontFamily: '"DM Sans",sans-serif',
              }}
              onMouseEnter={e => { if (activeFilter !== cat) { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)' } }}
              onMouseLeave={e => { if (activeFilter !== cat) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' } }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 20 }}>
          Showing <span style={{ color: 'var(--gold)', fontWeight: 600 }}>{filtered.length}</span> product{filtered.length !== 1 ? 's' : ''}
          {activeFilter !== 'All' && <> in <span style={{ color: '#fff' }}>{activeFilter}</span></>}
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 24px', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: 56, marginBottom: 20 }}>🔍</div>
            <h3 style={{ fontFamily: '"Playfair Display",serif', fontSize: 22, color: 'var(--text-muted)', marginBottom: 10 }}>No products found</h3>
            <p>Try a different search term or category</p>
            <button onClick={() => { setSearch(''); setFilter('All') }} className="btn-primary" style={{ marginTop: 20 }}>
              Clear Filters
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
