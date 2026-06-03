import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <div style={{ paddingTop: 'var(--nav-h)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - var(--nav-h))', textAlign: 'center', padding: '40px 24px' }}>
      <div style={{ fontFamily: '"Playfair Display",serif', fontSize: 'clamp(6rem,20vw,12rem)', fontWeight: 900, lineHeight: 1, background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
        404
      </div>
      <h2 style={{ fontFamily: '"Playfair Display",serif', fontSize: 26, color: '#fff', marginBottom: 12 }}>Page Not Found</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: 32, maxWidth: 380, lineHeight: 1.6 }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <button className="btn-primary" onClick={() => navigate('/')}>Go Home</button>
        <button className="btn-outline" onClick={() => navigate('/products')}>Browse Products</button>
      </div>
    </div>
  )
}
