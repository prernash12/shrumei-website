import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/store';

export default function Footer() {
  const [email, setEmail] = useState('');
  const { showToast } = useStore();

  const subscribe = () => {
    if (!email.includes('@')) { showToast('Please enter a valid email ✉️'); return; }
    setEmail('');
    showToast('Welcome to the ritual. 15% off incoming 🍄');
  };

  return (
    <footer style={{ background:'#0f1f16' }}>

      {/* Newsletter banner */}
      <div style={{ background:'linear-gradient(135deg, #1e5a3c 0%, #2d7a50 100%)' }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-14 py-14">
          <motion.div
            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

            <div>
              <p style={{ fontFamily:'Manrope,sans-serif', fontSize:11, fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(255,255,255,0.55)', marginBottom:8 }}>
                Join the Mycelium Network
              </p>
              <h3 style={{ fontFamily:'"Noto Serif",Georgia,serif', fontSize:'clamp(20px,3vw,30px)', fontWeight:700, color:'#ffffff', lineHeight:1.2 }}>
                Get 15% off your first ritual +<br/>exclusive science dispatches.
              </h3>
            </div>

            <div className="flex-shrink-0 w-full md:w-auto md:min-w-[320px]">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && subscribe()}
                  placeholder="your@email.com"
                  style={{
                    flex: 1,
                    padding: '12px 18px',
                    borderRadius: 9999,
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.1)',
                    color: '#ffffff',
                    fontFamily: 'Manrope,sans-serif',
                    fontSize: 13,
                    outline: 'none',
                    backdropFilter: 'blur(8px)',
                  }}
                  className="placeholder:text-white/40"
                />
                <button
                  onClick={subscribe}
                  style={{
                    padding: '12px 22px',
                    borderRadius: 9999,
                    background: '#ffffff',
                    color: '#1e5a3c',
                    fontFamily: 'Manrope,sans-serif',
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    border: 'none',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.3s',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)'; }}>
                  Subscribe
                </button>
              </div>
              <p style={{ fontFamily:'Manrope,sans-serif', fontSize:11, color:'rgba(255,255,255,0.4)', marginTop:8, paddingLeft:4 }}>
                No spam. Unsubscribe anytime. 🍄
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-14 pt-16 pb-8">

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-14"
          style={{ borderBottom:'1px solid rgba(255,255,255,0.07)' }}>

          {/* Brand col */}
          <div className="md:col-span-2">
            <div style={{ fontFamily:'"Noto Serif",Georgia,serif', fontSize:22, fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', color:'#ffffff', marginBottom:14 }}>
              🍄 SHRUMEI
            </div>
            <p style={{ fontFamily:'Manrope,sans-serif', fontSize:13, color:'rgba(255,255,255,0.35)', lineHeight:1.85, maxWidth:260, marginBottom:20 }}>
              India's first Fungal Biotechnology wellness brand. Nature and science in our DNA.
            </p>

            {/* Social icons */}
            <div className="flex gap-2">
              {[
                { icon:'public',    label:'Web' },
                { icon:'camera_alt',label:'Instagram' },
                { icon:'hub',       label:'LinkedIn' },
              ].map(s => (
                <button key={s.icon}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all"
                  style={{ border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.35)', background:'transparent' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.3)'; e.currentTarget.style.color='#ffffff'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'; e.currentTarget.style.color='rgba(255,255,255,0.35)'; }}>
                  <span className="material-symbols-outlined text-[17px]">{s.icon}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              h: 'Products',
              links: ['Mycoproteins','Nutraceutical','Cosmetics','Health Teas','Signature Tincture'],
            },
            {
              h: 'Company',
              links: ['About Shrumei','The Science','Research','Sustainability','Careers'],
            },
            {
              h: 'Support',
              links: ['Track Order','Returns','FAQ','Contact Us','Privacy Policy'],
            },
          ].map(col => (
            <div key={col.h}>
              <h5 style={{ fontFamily:'Manrope,sans-serif', fontSize:10, fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(255,255,255,0.35)', marginBottom:16 }}>
                {col.h}
              </h5>
              {col.links.map(l => (
                <a key={l} href="#"
                  style={{ fontFamily:'Manrope,sans-serif', fontSize:13, color:'rgba(255,255,255,0.38)', display:'block', marginBottom:10, transition:'color 0.2s', textDecoration:'none' }}
                  onMouseEnter={e => { e.currentTarget.style.color='#ffffff'; }}
                  onMouseLeave={e => { e.currentTarget.style.color='rgba(255,255,255,0.38)'; }}>
                  {l}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 flex-wrap">
          <p style={{ fontFamily:'Manrope,sans-serif', fontSize:11, letterSpacing:'0.1em', color:'rgba(255,255,255,0.2)' }}>
            © 2025 Shrumei Wellness Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex gap-2 flex-wrap">
            {['🔒 SSL Secured','🇮🇳 Made in India','🌿 100% Natural','✓ GMP Certified'].map(b => (
              <span key={b}
                style={{ fontFamily:'Manrope,sans-serif', fontSize:10, color:'rgba(255,255,255,0.2)', letterSpacing:'0.06em', padding:'3px 10px', background:'rgba(255,255,255,0.05)', borderRadius:9999 }}>
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}