import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart, Search, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { totalItems } = useCart()
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const active = (p: string) => pathname === p

  const links = [{ to:'/', label:'Home' }, { to:'/products', label:'Shop' }, { to:'/contact', label:'Contact' }]

  return (
    <>
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:1000, height:'var(--nav-h)', background:'rgba(10,13,22,0.9)', backdropFilter:'blur(20px)', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', padding:'0 24px' }}>
        <div style={{ maxWidth:1200, width:'100%', margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <Link to="/" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none', transition:'transform .2s' }}
            onMouseEnter={e=>(e.currentTarget.style.transform='scale(1.04)')}
            onMouseLeave={e=>(e.currentTarget.style.transform='scale(1)')}>
            <div style={{ width:38, height:38, background:'linear-gradient(135deg,var(--gold),var(--gold-dark))', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'"Playfair Display",serif', fontWeight:900, color:'#fff', fontSize:18 }}>E</div>
            <div style={{ lineHeight:1 }}>
              <div style={{ fontFamily:'"Playfair Display",serif', fontWeight:700, color:'#fff', fontSize:18 }}>Eden</div>
              <div style={{ color:'var(--gold)', fontSize:11, letterSpacing:2, textTransform:'uppercase' }}>Electronics</div>
            </div>
          </Link>

          <ul style={{ display:'flex', gap:32, listStyle:'none' }} className="hidden md:flex">
            {links.map(l => (
              <li key={l.to}>
                <Link to={l.to} style={{ color: active(l.to) ? '#fff' : 'var(--text-muted)', textDecoration:'none', fontSize:14, fontWeight:500, letterSpacing:'0.5px', paddingBottom:4, borderBottom: active(l.to) ? '1.5px solid var(--gold)' : '1.5px solid transparent', transition:'color .2s' }}
                  onMouseEnter={e=>{ e.currentTarget.style.color='#fff'; e.currentTarget.style.borderBottomColor='var(--gold)' }}
                  onMouseLeave={e=>{ if(!active(l.to)){ e.currentTarget.style.color='var(--text-muted)'; e.currentTarget.style.borderBottomColor='transparent' } }}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <Link to="/products" style={{ background:'none', border:'none', cursor:'pointer', color:'var(--text-muted)', padding:8, borderRadius:8, display:'flex', alignItems:'center', textDecoration:'none', transition:'color .2s' }}
              onMouseEnter={e=>(e.currentTarget.style.color='#fff')}
              onMouseLeave={e=>(e.currentTarget.style.color='var(--text-muted)')}>
              <Search size={20} />
            </Link>
            <Link to="/cart" style={{ position:'relative', background:'none', border:'none', cursor:'pointer', color:'var(--text-muted)', padding:8, borderRadius:8, display:'flex', alignItems:'center', textDecoration:'none', transition:'color .2s' }}
              onMouseEnter={e=>(e.currentTarget.style.color='#fff')}
              onMouseLeave={e=>(e.currentTarget.style.color='var(--text-muted)')}>
              <ShoppingCart size={20} />
              {totalItems > 0 && <span style={{ position:'absolute', top:2, right:2, background:'var(--gold)', color:'#fff', fontSize:10, fontWeight:700, width:16, height:16, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center' }}>{totalItems > 99 ? '99+' : totalItems}</span>}
            </Link>
            <button onClick={()=>setOpen(!open)} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--text-muted)', padding:8, display:'flex', alignItems:'center' }} className="md:hidden">
              {open ? <X size={22}/> : <Menu size={22}/>}
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div style={{ position:'fixed', top:'var(--nav-h)', left:0, right:0, background:'rgba(10,13,22,0.97)', backdropFilter:'blur(20px)', padding:'20px 24px 32px', borderBottom:'1px solid var(--border)', zIndex:999 }}>
          {[...links, { to:'/cart', label:'Cart' }].map(l => (
            <Link key={l.to} to={l.to} onClick={()=>setOpen(false)}
              style={{ display:'block', color: active(l.to) ? 'var(--gold)' : 'var(--text-muted)', textDecoration:'none', padding:'14px 0', fontSize:16, fontWeight:500, borderBottom:'1px solid var(--border)' }}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
