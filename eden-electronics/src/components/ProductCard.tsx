import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { finalPrice } from '../data/products'
import type { Product } from '../types'

export default function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const price = finalPrice(product)

  return (
    <div className="hover-lift" onClick={()=>navigate(`/products/${product.id}`)}
      style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:16, overflow:'hidden', cursor:'pointer', display:'flex', flexDirection:'column', transition:'border-color .25s' }}
      onMouseEnter={e=>(e.currentTarget.style.borderColor='rgba(255,120,0,0.4)')}
      onMouseLeave={e=>(e.currentTarget.style.borderColor='var(--border)')}>
      <div style={{ height:200, display:'flex', alignItems:'center', justifyContent:'center', background:'var(--bg3)', position:'relative', flexShrink:0 }}>
        {product.featured && <div style={{ position:'absolute', top:12, left:12, background:'linear-gradient(135deg,var(--gold),var(--gold-dark))', color:'#fff', fontSize:11, fontWeight:700, padding:'4px 10px', borderRadius:20 }}>★ Featured</div>}
        {product.discount && <div style={{ position:'absolute', top:12, right:12, background:'#ef4444', color:'#fff', fontSize:11, fontWeight:700, padding:'4px 10px', borderRadius:20 }}>-{product.discount}%</div>}
        <span style={{ fontSize:64 }}>{product.emoji}</span>
      </div>
      <div style={{ padding:18, flex:1, display:'flex', flexDirection:'column' }}>
        <div style={{ fontSize:11, fontWeight:600, letterSpacing:'1.5px', textTransform:'uppercase', color:'var(--gold)', marginBottom:6 }}>{product.category}</div>
        <div style={{ fontFamily:'"Playfair Display",serif', fontWeight:700, fontSize:17, color:'#fff', marginBottom:8, lineHeight:1.3 }}>{product.name}</div>
        <div style={{ fontSize:13, color:'var(--text-muted)', lineHeight:1.6, marginBottom:12, flex:1 }}>{product.desc.substring(0,80)}...</div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:'auto' }}>
          <div>
            <span style={{ fontSize:20, fontWeight:700, color:'var(--gold)' }}>KES {price.toLocaleString()}</span>
            {product.discount && <span style={{ fontSize:13, color:'var(--text-muted)', textDecoration:'line-through', marginLeft:6 }}>KES {product.price.toLocaleString()}</span>}
          </div>
          <button style={{ width:38, height:38, borderRadius:'50%', background:'linear-gradient(135deg,var(--gold),var(--gold-dark))', border:'none', color:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'transform .2s, box-shadow .2s', flexShrink:0 }}
            onClick={e=>{ e.stopPropagation(); addToCart(product) }}
            onMouseEnter={e=>{ e.currentTarget.style.transform='scale(1.1)'; e.currentTarget.style.boxShadow='0 6px 20px rgba(255,120,0,.4)' }}
            onMouseLeave={e=>{ e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow='none' }}
            title="Add to cart">
            <Plus size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
