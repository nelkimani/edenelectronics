import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, ShoppingCart, MessageCircle, Minus, Plus } from 'lucide-react'
import { PRODUCTS, finalPrice, WHATSAPP_NUMBER } from '../data/products'
import { useCart } from '../context/CartContext'
import Footer from '../components/Footer'
import Toast, { useToast } from '../components/Toast'

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { toast, showToast } = useToast()
  const [qty, setQty] = useState(1)

  const product = PRODUCTS.find(p => p.id === Number(id))

  if (!product) {
    return (
      <div style={{ paddingTop: 'var(--nav-h)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', textAlign: 'center', padding: 24 }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>😕</div>
        <h2 style={{ fontFamily: '"Playfair Display",serif', fontSize: 28, color: '#fff', marginBottom: 12 }}>Product Not Found</h2>
        <button className="btn-primary" onClick={() => navigate('/products')}>Back to Shop</button>
      </div>
    )
  }

  const price = finalPrice(product)

  const handleAddToCart = () => {
    addToCart(product, qty)
    showToast(`${product.name} added to cart! 🛒`)
  }

  const handleWhatsApp = () => {
    const msg = `Hello Eden Electronics! I'm interested in the *${product.name}* priced at KES ${price.toLocaleString()}. Is it available?\n\nThank you! 🙏`
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <div style={{ paddingTop: 'var(--nav-h)' }}>
      <Toast message={toast.message} visible={toast.visible} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontFamily: '"DM Sans",sans-serif', padding: '8px 0', marginBottom: 24, transition: 'color .2s' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {/* Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48 }}>
          {/* Image */}
          <div style={{ background: 'var(--bg2)', borderRadius: 20, border: '1px solid var(--border)', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 120, position: 'relative', minHeight: 320 }}>
            {product.discount && (
              <div style={{ position: 'absolute', top: 16, right: 16, background: '#ef4444', color: '#fff', fontSize: 13, fontWeight: 700, padding: '5px 14px', borderRadius: 20 }}>
                -{product.discount}%
              </div>
            )}
            <span>{product.emoji}</span>
          </div>

          {/* Info */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}>
              {product.category}
            </div>
            <h1 style={{ fontFamily: '"Playfair Display",serif', fontSize: 'clamp(1.8rem,3vw,2.4rem)', fontWeight: 700, color: '#fff', marginBottom: 14, lineHeight: 1.2 }}>
              {product.name}
            </h1>

            {/* Stock badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, padding: '5px 14px', borderRadius: 20, marginBottom: 18, background: product.inStock ? 'rgba(34,197,94,.12)' : 'rgba(239,68,68,.12)', color: product.inStock ? '#22c55e' : '#ef4444', border: `1px solid ${product.inStock ? 'rgba(34,197,94,.3)' : 'rgba(239,68,68,.3)'}` }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </div>

            {/* Price */}
            <div style={{ fontSize: 34, fontWeight: 700, color: 'var(--gold)', marginBottom: 4 }}>
              KES {price.toLocaleString()}
            </div>
            {product.discount && (
              <div style={{ fontSize: 16, color: 'var(--text-muted)', textDecoration: 'line-through', marginBottom: 18 }}>
                KES {product.price.toLocaleString()}
                <span style={{ background: 'rgba(239,68,68,.15)', color: '#ef4444', fontSize: 12, fontWeight: 700, padding: '2px 8px', borderRadius: 10, marginLeft: 8, textDecoration: 'none', display: 'inline-block' }}>
                  Save KES {(product.price - price).toLocaleString()}
                </span>
              </div>
            )}

            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 24, fontSize: 15 }}>
              {product.desc}
            </p>

            {/* Specs */}
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, padding: 20, marginBottom: 28 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>Specifications</div>
              {Object.entries(product.specs).map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: 14 }}>
                  <span style={{ color: 'var(--text-muted)' }}>{k}</span>
                  <span style={{ color: '#fff', fontWeight: 500, textAlign: 'right', maxWidth: '55%' }}>{v}</span>
                </div>
              ))}
            </div>

            {/* Qty */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span style={{ color: 'var(--text-muted)', fontSize: 14, fontWeight: 500 }}>Quantity:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--bg3)', border: '1px solid var(--border)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s' }}>
                  <Minus size={14} />
                </button>
                <span style={{ fontWeight: 700, minWidth: 28, textAlign: 'center', fontSize: 16 }}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)} style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--bg3)', border: '1px solid var(--border)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s' }}>
                  <Plus size={14} />
                </button>
              </div>
              <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>
                = KES {(price * qty).toLocaleString()}
              </span>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button className="btn-primary" onClick={handleAddToCart} disabled={!product.inStock}>
                <ShoppingCart size={16} />
                Add to Cart
              </button>
              <button className="btn-whatsapp" onClick={handleWhatsApp}>
                <MessageCircle size={16} />
                Order on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
