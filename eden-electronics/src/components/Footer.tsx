import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, MessageCircle, Facebook, Instagram } from 'lucide-react'
import { PHONE, EMAIL } from '../data/products'

export default function Footer() {
  return (
    <footer style={{ background:'var(--bg2)', borderTop:'1px solid var(--border)', padding:'64px 24px 32px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:48, marginBottom:48 }}>
          <div style={{ gridColumn:'span 2' }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
              <div style={{ width:38, height:38, background:'linear-gradient(135deg,var(--gold),var(--gold-dark))', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'"Playfair Display",serif', fontWeight:900, color:'#fff', fontSize:18 }}>E</div>
              <div style={{ lineHeight:1 }}>
                <div style={{ fontFamily:'"Playfair Display",serif', fontWeight:700, color:'#fff', fontSize:18 }}>Eden</div>
                <div style={{ color:'var(--gold)', fontSize:11, letterSpacing:2, textTransform:'uppercase' }}>Electronics</div>
              </div>
            </div>
            <p style={{ color:'var(--text-muted)', fontSize:14, lineHeight:1.8, marginBottom:20, maxWidth:320 }}>Smart Living Starts Here. Your trusted electronics and home goods partner in Chuka Town, Tharaka Nithi County, Kenya.</p>
            <div style={{ display:'flex', gap:10 }}>
              {[MessageCircle, Facebook, Instagram].map((Icon, i) => (
                <button key={i} style={{ width:36, height:36, borderRadius:'50%', background:'var(--bg3)', border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--text-muted)', cursor:'pointer', transition:'all .2s' }}
                  onMouseEnter={e=>{ e.currentTarget.style.borderColor='var(--gold)'; e.currentTarget.style.color='var(--gold)' }}
                  onMouseLeave={e=>{ e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--text-muted)' }}>
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontWeight:700, color:'#fff', fontSize:15, marginBottom:20, paddingBottom:10, borderBottom:'1px solid var(--border)' }}>Quick Links</h4>
            <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:10 }}>
              {[['/', 'Home'], ['/products', 'All Products'], ['/products?cat=Smartphones', 'Smartphones'], ['/products?cat=Audio+%26+Woofers', 'Audio & Sound'], ['/products?cat=TVs+%26+Electronics', 'TVs & Electronics'], ['/contact', 'Contact Us']].map(([to, label]) => (
                <li key={to}><Link to={to} style={{ color:'var(--text-muted)', textDecoration:'none', fontSize:14, transition:'color .2s' }}
                  onMouseEnter={e=>(e.currentTarget.style.color='var(--gold)')}
                  onMouseLeave={e=>(e.currentTarget.style.color='var(--text-muted)')}>{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontWeight:700, color:'#fff', fontSize:15, marginBottom:20, paddingBottom:10, borderBottom:'1px solid var(--border)' }}>Contact Us</h4>
            {[[<Phone size={14}/>, <a href={`tel:${PHONE}`} style={{ color:'var(--text-muted)', textDecoration:'none' }}>{PHONE}</a>],
              [<Mail size={14}/>, <a href={`mailto:${EMAIL}`} style={{ color:'var(--text-muted)', textDecoration:'none' }}>{EMAIL}</a>],
              [<MapPin size={14}/>, <span>Chuka Town, Tharaka Nithi<br/>2 Branches Available</span>]
            ].map(([icon, content], i) => (
              <div key={i} style={{ display:'flex', gap:10, marginBottom:14, fontSize:14, color:'var(--text-muted)', alignItems:'flex-start' }}>
                <span style={{ color:'var(--gold)', marginTop:2, flexShrink:0 }}>{icon as React.ReactNode}</span>
                {content as React.ReactNode}
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop:'1px solid var(--border)', paddingTop:24, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
          <p style={{ color:'var(--text-muted)', fontSize:13 }}>© {new Date().getFullYear()} <span style={{ color:'var(--gold)' }}>Eden Electronics</span>. All rights reserved. Chuka Town, Kenya.</p>
          <p style={{ color:'var(--text-muted)', fontSize:13 }}>Smart Living Starts Here ✦</p>
        </div>
      </div>
    </footer>
  )
}
