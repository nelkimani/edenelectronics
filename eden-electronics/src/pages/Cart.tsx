import { useNavigate } from 'react-router-dom'
import { Trash2, Minus, Plus, ShoppingBag, MessageCircle } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { finalPrice } from '../data/products'
import Footer from '../components/Footer'

export default function Cart() {
  const navigate = useNavigate()
  const { cart, totalItems, totalPrice, removeFromCart, updateQty, checkoutWhatsApp } = useCart()

  return (
    <div style={{ paddingTop: 'var(--nav-h)' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(180deg, var(--bg2), var(--bg))', padding: '52px 24px 40px', textAlign: 'center', borderBottom: '1px solid var(--border)' }}>
        <h1 style={{ fontFamily: '"Playfair Display",serif', fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 700, color: '#fff' }}>
          Your Cart
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: 10, fontSize: 16 }}>
          {totalItems > 0 ? `${totalItems} item${totalItems !== 1 ? 's' : ''} ready to order` : 'Your cart is empty'}
        </p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 24px' }}>
        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 24px' }}>
            <div style={{ fontSize: 80, marginBottom: 24, opacity: 0.4 }}>
              <ShoppingBag size={80} style={{ margin: '0 auto', color: 'var(--text-muted)' }} />
            </div>
            <h2 style={{ fontFamily: '"Playfair Display",serif', fontSize: 26, color: 'var(--text-muted)', marginBottom: 12 }}>
              Your cart is empty
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: 28 }}>
              Add some products to get started
            </p>
            <button className="btn-primary" onClick={() => navigate('/products')}>
              Browse Products
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
              {cart.map(item => {
                const price = finalPrice(item)
                return (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 20,
                      background: 'var(--bg2)',
                      border: '1px solid var(--border)',
                      borderRadius: 16,
                      padding: 20,
                    }}
                  >
                    {/* Emoji */}
                    <div style={{ width: 80, height: 80, background: 'var(--bg3)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, flexShrink: 0, cursor: 'pointer' }}
                      onClick={() => navigate(`/products/${item.id}`)}>
                      {item.emoji}
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: '"Playfair Display",serif', fontWeight: 700, color: '#fff', fontSize: 17, marginBottom: 4, cursor: 'pointer' }}
                        onClick={() => navigate(`/products/${item.id}`)}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 10 }}>{item.category}</div>
                      <div style={{ color: 'var(--gold)', fontWeight: 700, fontSize: 15, marginBottom: 10 }}>
                        KES {price.toLocaleString()} each
                        {item.discount ? <span style={{ color: 'var(--text-muted)', textDecoration: 'line-through', fontWeight: 400, marginLeft: 8, fontSize: 13 }}>KES {item.price.toLocaleString()}</span> : null}
                      </div>
                      {/* Qty controls */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--bg3)', border: '1px solid var(--border)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s' }}
                          onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold)'}
                          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                        >
                          <Minus size={12} />
                        </button>
                        <span style={{ fontWeight: 700, minWidth: 24, textAlign: 'center', fontSize: 15 }}>{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--bg3)', border: '1px solid var(--border)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s' }}
                          onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold)'}
                          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                        >
                          <Plus size={12} />
                        </button>
                        <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>
                          = <span style={{ color: '#fff', fontWeight: 600 }}>KES {(price * item.qty).toLocaleString()}</span>
                        </span>
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      title="Remove item"
                      style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 8, borderRadius: 8, display: 'flex', alignItems: 'center', transition: 'color .2s', flexShrink: 0 }}
                      onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                )
              })}
            </div>

            {/* Summary */}
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 16, padding: 28 }}>
              {/* Line items summary */}
              <div style={{ marginBottom: 20 }}>
                {cart.map(item => {
                  const p = finalPrice(item)
                  return (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 14 }}>
                      <span style={{ color: 'var(--text-muted)' }}>{item.name} × {item.qty}</span>
                      <span style={{ color: '#fff' }}>KES {(p * item.qty).toLocaleString()}</span>
                    </div>
                  )
                })}
              </div>

              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, marginBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, fontWeight: 700 }}>
                  <span>Total ({totalItems} item{totalItems !== 1 ? 's' : ''})</span>
                  <span style={{ color: 'var(--gold)' }}>KES {totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <button
                className="btn-whatsapp"
                onClick={checkoutWhatsApp}
                style={{ width: '100%', justifyContent: 'center', fontSize: 16, padding: '16px 28px' }}
              >
                <MessageCircle size={20} />
                Checkout via WhatsApp
              </button>
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: 12, marginTop: 12, lineHeight: 1.6 }}>
                Your order details will be sent to our WhatsApp. We'll confirm availability and arrange payment.
              </p>

              <div style={{ marginTop: 20, textAlign: 'center' }}>
                <button
                  onClick={() => navigate('/products')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 14, fontFamily: '"DM Sans",sans-serif', textDecoration: 'underline' }}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  )
}
