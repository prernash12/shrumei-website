import { motion } from 'framer-motion';

const REVIEWS = [
  {
    av: 'A',
    name: 'Arjun S.',
    role: 'Verified Buyer',
    stars: 5,
    text: '"Cordyceps changed my morning completely. VO2 max improved 12% in 8 weeks. Unreal."',
    prod: 'Cordyceps Energy Boost',
    color: '#e8f5ee',
    textColor: '#1e5a3c',
  },
  {
    av: 'P',
    name: 'Priya M.',
    role: 'Verified Buyer',
    stars: 5,
    text: '"Fungi Glow Serum is unlike anything. My skin genuinely glows. Results in 14 days."',
    prod: 'Fungi Glow Serum',
    color: '#f5f0ff',
    textColor: '#6b3fa0',
  },
  {
    av: 'R',
    name: 'Rohan K.',
    role: 'Naturopath, Verified',
    stars: 5,
    text: '"As a practitioner I am extremely selective. Shrumei\'s sourcing transparency is unmatched."',
    prod: 'Immunity Shield',
    color: '#fff7e6',
    textColor: '#a05c00',
  },
  {
    av: 'D',
    name: 'Divya T.',
    role: 'Verified Buyer',
    stars: 5,
    text: '"Reishi tea transformed my sleep. I wake up genuinely restored every single morning."',
    prod: 'Reishi Calm Tea',
    color: '#e6f7f5',
    textColor: '#0a6b5e',
  },
];

const TRUST_BADGES = [
  { icon: 'verified', label: 'GMP Certified' },
  { icon: 'science',  label: 'Lab Tested' },
  { icon: 'eco',      label: '100% Natural' },
  { icon: 'public',   label: 'Made in India' },
  { icon: 'recycling',label: 'Sustainable' },
  { icon: 'favorite', label: 'Cruelty Free' },
];

export default function SocialProof() {
  return (
    <section className="py-24 bg-bg2">
      <div className="max-w-[1280px] mx-auto px-6 md:px-14">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
            style={{ fontFamily:'Manrope,sans-serif', fontSize:11, fontWeight:700, letterSpacing:'0.22em', textTransform:'uppercase', color:'#1e5a3c', display:'block', marginBottom:12 }}>
            Community Reviews
          </motion.span>
          <motion.h2
            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:.1 }}
            style={{ fontFamily:'"Noto Serif",Georgia,serif', fontWeight:700, color:'#1a1a1a', lineHeight:1.1 }}
            className="text-[clamp(32px,5vw,58px)]">
            Trusted by <em style={{ fontStyle:'italic', color:'#1e5a3c' }}>Thousands</em>
          </motion.h2>

          {/* Rating summary */}
          <motion.div
            initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:.2 }}
            className="flex items-center justify-center gap-4 mt-6">
            <span style={{ fontFamily:'"Noto Serif",serif', fontSize:52, fontWeight:700, color:'#1e5a3c', lineHeight:1 }}>
              4.9
            </span>
            <div>
              <div style={{ fontSize:18, color:'#f59e0b', letterSpacing:2 }}>★★★★★</div>
              <p style={{ fontFamily:'Manrope,sans-serif', fontSize:12, color:'#aaaaaa', marginTop:3 }}>
                from 1,200+ verified reviews
              </p>
            </div>
          </motion.div>
        </div>

        {/* Main quote */}
        <motion.div
          initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:.8 }}
          className="relative rounded-2xl p-10 md:p-14 mb-12 overflow-hidden"
          style={{ background:'#ffffff', border:'1px solid rgba(0,0,0,0.07)' }}>

          {/* Big quote mark */}
          <div className="absolute top-6 right-8 opacity-5"
            style={{ fontFamily:'"Noto Serif",serif', fontSize:160, color:'#1e5a3c', lineHeight:1 }}>
            "
          </div>

          <span style={{ fontFamily:'Manrope,sans-serif', fontSize:11, fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', color:'#1e5a3c', display:'block', marginBottom:16 }}>
            Peer Review
          </span>

          <blockquote style={{ fontFamily:'"Noto Serif",Georgia,serif', fontSize:'clamp(18px,3vw,26px)', color:'#1a1a1a', lineHeight:1.6, fontStyle:'italic', maxWidth:700, marginBottom:24 }}>
            "Shrumei represents the pinnacle of fungal biotechnology, bridging
            the gap between ancient ritual and cellular optimisation."
          </blockquote>

          <div className="flex items-center gap-4">
            <div className="h-px w-12" style={{ background:'#1e5a3c' }}/>
            <cite style={{ fontFamily:'Manrope,sans-serif', fontSize:11, fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', color:'#aaaaaa', fontStyle:'normal' }}>
              Global Biotech Journal
            </cite>
          </div>
        </motion.div>

        {/* Review cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {REVIEWS.map((r, i) => (
            <motion.div key={i}
              initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay: i * .08 }}
              className="card-base bg-white p-6 flex flex-col gap-3">

              {/* User */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                  style={{ background: r.color, color: r.textColor, fontFamily:'Manrope,sans-serif' }}>
                  {r.av}
                </div>
                <div>
                  <p style={{ fontFamily:'Manrope,sans-serif', fontSize:13, fontWeight:700, color:'#1a1a1a' }}>
                    {r.name}
                  </p>
                  <p style={{ fontFamily:'Manrope,sans-serif', fontSize:10, color:'#aaaaaa' }}>
                    {r.role}
                  </p>
                </div>
              </div>

              {/* Stars */}
              <div style={{ color:'#f59e0b', fontSize:13, letterSpacing:1 }}>
                {'★'.repeat(r.stars)}
              </div>

              {/* Text */}
              <p style={{ fontFamily:'Manrope,sans-serif', fontSize:13, color:'#666666', lineHeight:1.7, fontStyle:'italic', flex:1 }}>
                {r.text}
              </p>

              {/* Product tag */}
              <span style={{
                fontFamily:'Manrope,sans-serif', fontSize:10, fontWeight:700,
                letterSpacing:'0.08em', textTransform:'uppercase',
                padding:'3px 10px', borderRadius:9999,
                background: r.color, color: r.textColor,
                display:'inline-block', width:'fit-content',
              }}>
                {r.prod}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ delay:.2 }}
          className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {TRUST_BADGES.map((b, i) => (
            <div key={i} className="flex flex-col items-center gap-2 py-5 rounded-xl"
              style={{ background:'#ffffff', border:'1px solid rgba(0,0,0,0.07)' }}>
              <span className="material-symbols-outlined text-[24px]" style={{ color:'#1e5a3c' }}>
                {b.icon}
              </span>
              <span style={{ fontFamily:'Manrope,sans-serif', fontSize:10, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'#888888', textAlign:'center' }}>
                {b.label}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}