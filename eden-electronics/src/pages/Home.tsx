import { useEffect, useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowRight as Arrow } from 'lucide-react'
import { PRODUCTS, CATEGORIES, finalPrice } from '../data/products'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'
import Toast, { useToast } from '../components/Toast'

const SLIDES = [
  {
    badge: 'New Arrivals 2024',
    title: ['The Latest', 'Smartphones', '& Accessories'],
    titleGold: 1,
    sub: 'Samsung, iPhone, Tecno & more — experience cutting-edge tech at Chuka\'s best electronics store.',
    cta: 'Shop Phones',
    cat: 'Smartphones',
    promo: 'Up to 25% Off',
    accent: 'hsl(24,60%,20%)',
  },
  {
    badge: 'Home Essentials',
    title: ['Premium', 'Home Appliances', 'for Modern Living'],
    titleGold: 1,
    sub: 'Refrigerators, blenders, cookers & more — upgrade every corner of your home with quality appliances.',
    cta: 'Shop Appliances',
    cat: 'Kitchen Appliances',
    promo: 'Up to 30% Off',
    accent: 'hsl(200,40%,18%)',
  },
  {
    badge: 'Entertainment Hub',
    title: ['Immersive', 'TVs & Sound', 'Systems'],
    titleGold: 1,
    sub: 'Smart TVs, woofers, speakers & entertainment gear — transform your living room into a cinema.',
    cta: 'Explore All',
    cat: '',
    promo: 'Up to 20% Off',
    accent: 'hsl(260,30%,20%)',
  },
]

export default function Home() {
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { toast, showToast } = useToast()
  const [slide, setSlide] = useState(0)
  const timerRef = useRef<number>(0)

  const goSlide = useCallback((i: number) => {
    setSlide(i)
    clearInterval(timerRef.current)
    timerRef.current = window.setInterval(() => setSlide(s => (s + 1) % SLIDES.length), 5000)
  }, [])

  useEffect(() => {
    timerRef.current = window.setInterval(() => setSlide(s => (s + 1) % SLIDES.length), 5000)
    return () => clearInterval(timerRef.current)
  }, [])

  // Touch swipe
  const touchStart = useRef(0)
  const handleTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX }
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStart.current
    if (Math.abs(dx) > 50) goSlide(dx < 0 ? (slide + 1) % 3 : (slide + 2) % 3)
  }

  const featured = PRODUCTS.filter(p => p.featured).slice(0, 8)

  return (
    <div style={{ paddingTop: 'var(--nav-h)' }}>
      <Toast message={toast.message} visible={toast.visible} />

      {/* HERO */}
      <section
        style={{ position: 'relative', height: 'calc(100vh - var(--nav-h))', minHeight: 560, overflow: 'hidden' }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {SLIDES.map((s, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: slide === i ? 1 : 0,
              transform: slide === i ? 'scale(1)' : 'scale(1.04)',
              transition: 'opacity .8s ease, transform 1s ease',
              pointerEvents: slide === i ? 'auto' : 'none',
            }}
          >
            <div style={{
              position: 'absolute', inset: 0,
              backgroundColor: 'hsl(220,30%,10%)',
              backgroundImage: `radial-gradient(ellipse 80% 60% at 70% 50%, ${s.accent}, transparent)`,
            }} />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, rgba(10,13,22,.88) 0%, rgba(10,13,22,.45) 55%, transparent 100%)',
            }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 8vw', maxWidth: 700 }}>
              <div style={{ display: 'inline-block', background: 'var(--gold)', color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', padding: '6px 16px', borderRadius: 20, marginBottom: 20, width: 'fit-content' }}>
                {s.badge}
              </div>
              <h1 style={{ fontFamily: '"Playfair Display",serif', fontSize: 'clamp(2.2rem,6vw,4.8rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: 16, color: '#fff' }}>
                {s.title.map((t, ti) =>
                  ti === s.titleGold
                    ? <span key={ti} className="text-gold-gradient">{t}<br /></span>
                    : <span key={ti}>{t}{ti < s.title.length - 1 ? <br /> : ''}</span>
                )}
              </h1>
              <p style={{ fontSize: 'clamp(1rem,2vw,1.15rem)', color: 'rgba(255,255,255,.72)', marginBottom: 32, lineHeight: 1.7, fontWeight: 300 }}>
                {s.sub}
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
                <button
                  className="btn-primary"
                  onClick={() => s.cat ? navigate(`/products?cat=${encodeURIComponent(s.cat)}`) : navigate('/products')}
                >
                  <Arrow size={16} />
                  {s.cta}
                </button>
                <div style={{ background: 'rgba(255,255,255,.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,.2)', color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: 1.5, padding: '6px 16px', borderRadius: 20 }}>
                  {s.promo}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Arrows */}
        <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: '100%', display: 'flex', justifyContent: 'space-between', padding: '0 20px', zIndex: 10, pointerEvents: 'none' }}>
          {[
            { icon: <ArrowLeft size={20} />, action: () => goSlide((slide + 2) % 3) },
            { icon: <ArrowRight size={20} />, action: () => goSlide((slide + 1) % 3) },
          ].map((btn, i) => (
            <button
              key={i}
              onClick={btn.action}
              style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.2)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s', pointerEvents: 'all', backdropFilter: 'blur(8px)' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.borderColor = 'var(--gold)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.2)' }}
            >
              {btn.icon}
            </button>
          ))}
        </div>

        {/* Dots */}
        <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, zIndex: 10 }}>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goSlide(i)}
              style={{
                width: slide === i ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: slide === i ? 'var(--gold)' : 'rgba(255,255,255,.3)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all .3s',
                padding: 0,
              }}
            />
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="section-label">Browse By</div>
          <h2 style={{ fontFamily: '"Playfair Display",serif', fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 700, color: '#fff', marginBottom: 14 }}>
            Shop Our Categories
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 16, maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            Everything you need for smart living — from pocket to living room.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 16 }}>
          {CATEGORIES.map(cat => {
            const count = PRODUCTS.filter(p => p.category === cat.name).length
            return (
              <div
                key={cat.name}
                className="hover-lift"
                onClick={() => navigate(`/products?cat=${encodeURIComponent(cat.name)}`)}
                style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 16, padding: '28px 20px', textAlign: 'center', cursor: 'pointer', transition: 'border-color .25s', position: 'relative', overflow: 'hidden' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
              >
                <span style={{ fontSize: 36, display: 'block', marginBottom: 12 }}>{cat.emoji}</span>
                <div style={{ fontWeight: 600, color: '#fff', fontSize: 14, marginBottom: 4 }}>{cat.name}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: 12 }}>{count} items</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      <div style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-label">Handpicked</div>
            <h2 style={{ fontFamily: '"Playfair Display",serif', fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 700, color: '#fff', marginBottom: 14 }}>
              Featured Products
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 16, maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
              Our best-selling and most-loved items, curated just for you.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
            {featured.map(p => (
              <ProductCard
                key={p.id}
                product={p}
              />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <button className="btn-outline" onClick={() => navigate('/products')}>
              View All Products
            </button>
          </div>
        </div>
      </div>

      {/* PROMO BANNER */}
      <div style={{
        background: 'linear-gradient(135deg, var(--gold-dark), var(--gold), var(--gold-light))',
        padding: '64px 24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255,255,255,.05) 30px, rgba(255,255,255,.05) 60px)' }} />
        <div style={{ maxWidth: 680, margin: '0 auto', position: 'relative' }}>
          <h2 style={{ fontFamily: '"Playfair Display",serif', fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 900, color: '#fff', marginBottom: 12 }}>
            Smart Living Starts Here
          </h2>
          <p style={{ color: 'rgba(255,255,255,.85)', fontSize: 17, marginBottom: 28, lineHeight: 1.6 }}>
            Visit us at Chuka Town — two branches ready to serve you with the best electronics deals.
          </p>
          <button
            onClick={() => navigate('/contact')}
            style={{ background: '#fff', color: 'var(--gold-dark)', border: 'none', padding: '14px 36px', borderRadius: 50, fontSize: 15, fontWeight: 700, cursor: 'pointer', transition: 'all .2s', fontFamily: '"DM Sans",sans-serif' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,.2)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
          >
            Find Our Stores
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}
