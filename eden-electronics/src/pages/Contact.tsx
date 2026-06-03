import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'
import { PHONE, EMAIL, WHATSAPP_NUMBER } from '../data/products'
import Footer from '../components/Footer'

const BRANCHES = [
  {
    tag: 'Main Branch',
    name: 'Town Center Store',
    address: 'Town Center, Chuka Town\nTharaka Nithi County, Kenya',
    phone: PHONE,
    email: EMAIL,
    hours: 'Mon–Sat: 8:00 AM – 7:00 PM\nSunday: 10:00 AM – 5:00 PM',
    mapsUrl: 'https://maps.google.com/?q=Chuka+Town+Center+Tharaka+Nithi+Kenya',
  },
  {
    tag: 'Market Branch',
    name: 'Open Market Store',
    address: 'Open Market Area, Chuka Town\nTharaka Nithi County, Kenya',
    phone: PHONE,
    email: EMAIL,
    hours: 'Mon–Sat: 7:30 AM – 7:30 PM\nSunday: 9:00 AM – 6:00 PM',
    mapsUrl: 'https://maps.google.com/?q=Chuka+Open+Market+Tharaka+Nithi+Kenya',
  },
]

export default function Contact() {
  const contactRows = (branch: typeof BRANCHES[0]) => [
    {
      icon: <MapPin size={16} />,
      label: 'Address',
      content: branch.address.split('\n').map((l, i) => <span key={i}>{l}{i === 0 ? <br /> : ''}</span>),
    },
    {
      icon: <Phone size={16} />,
      label: 'Phone & WhatsApp',
      content: <a href={`tel:${branch.phone}`} style={{ color: '#fff', textDecoration: 'none' }}>{branch.phone}</a>,
    },
    {
      icon: <Mail size={16} />,
      label: 'Email',
      content: <a href={`mailto:${branch.email}`} style={{ color: '#fff', textDecoration: 'none' }}>{branch.email}</a>,
    },
    {
      icon: <Clock size={16} />,
      label: 'Opening Hours',
      content: branch.hours.split('\n').map((l, i) => <span key={i}>{l}{i === 0 ? <br /> : ''}</span>),
    },
  ]

  return (
    <div style={{ paddingTop: 'var(--nav-h)' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(180deg, var(--bg2), var(--bg))', padding: '52px 24px 40px', textAlign: 'center', borderBottom: '1px solid var(--border)' }}>
        <h1 style={{ fontFamily: '"Playfair Display",serif', fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 700, color: '#fff' }}>
          Visit Our Stores
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: 10, fontSize: 16 }}>
          Two convenient locations in Chuka Town, Tharaka Nithi County
        </p>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px' }}>
        {/* Branch cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24, marginBottom: 32 }}>
          {BRANCHES.map(branch => (
            <div
              key={branch.tag}
              style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 20, padding: 32, position: 'relative', overflow: 'hidden' }}
            >
              {/* Top accent line */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, var(--gold), var(--gold-light))' }} />

              <div style={{ display: 'inline-block', background: 'rgba(255,120,0,.15)', color: 'var(--gold)', fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', padding: '4px 12px', borderRadius: 20, marginBottom: 14 }}>
                {branch.tag}
              </div>
              <h2 style={{ fontFamily: '"Playfair Display",serif', fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 24 }}>
                {branch.name}
              </h2>

              {contactRows(branch).map((row, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 18, alignItems: 'flex-start' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,120,0,.1)', border: '1px solid rgba(255,120,0,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', flexShrink: 0 }}>
                    {row.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 3 }}>
                      {row.label}
                    </div>
                    <div style={{ color: '#fff', fontSize: 14, lineHeight: 1.6 }}>{row.content}</div>
                  </div>
                </div>
              ))}

              {/* Map placeholder */}
              <a
                href={branch.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 12, height: 160, marginTop: 8, textDecoration: 'none', cursor: 'pointer', transition: 'border-color .2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <MapPin size={32} color="var(--gold)" style={{ opacity: 0.6 }} />
                <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>{branch.name}</span>
                <span style={{ color: 'var(--gold)', fontSize: 13 }}>Open in Google Maps →</span>
              </a>
            </div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 20, padding: 40, textAlign: 'center' }}>
          <div style={{ fontSize: 44, marginBottom: 16 }}>💬</div>
          <h3 style={{ fontFamily: '"Playfair Display",serif', fontSize: 26, color: '#fff', marginBottom: 10 }}>
            Order via WhatsApp
          </h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: 28, maxWidth: 480, margin: '0 auto 28px', lineHeight: 1.7 }}>
            Prefer chatting? Send us a message on WhatsApp and we'll help you find exactly what you need — fast, easy, no account needed.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Eden Electronics! I would like to enquire about your products.')}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#25d366', color: '#fff', textDecoration: 'none', padding: '14px 32px', borderRadius: 50, fontWeight: 700, fontSize: 15, fontFamily: '"DM Sans",sans-serif', transition: 'all .2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#1ebe5b'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#25d366'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <MessageCircle size={20} />
            Chat on WhatsApp
          </a>

          <div style={{ marginTop: 28, display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: 'var(--gold)', fontWeight: 700, fontSize: 20, marginBottom: 4 }}>{PHONE}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>Phone & WhatsApp</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: 'var(--gold)', fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{EMAIL}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>Email Us</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
