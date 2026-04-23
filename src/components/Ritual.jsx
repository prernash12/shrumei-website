import { motion } from 'framer-motion';

const STEPS = [
  {
    n: '01',
    t: 'Wild Strain Selection',
    p: 'Indigenous Indian fungal strains selected for peak bioactive concentration.',
    icon: 'forest',
  },
  {
    n: '02',
    t: 'Precision Extraction',
    p: 'Dual-extraction preserving water and alcohol-soluble bioactive compounds.',
    icon: 'science',
  },
  {
    n: '03',
    t: 'Lab Verification',
    p: 'Third-party testing for potency, purity, and heavy metal compliance every batch.',
    icon: 'verified',
  },
  {
    n: '04',
    t: 'Precision Formulation',
    p: 'Clinically-dosed in the most bioavailable delivery matrix available.',
    icon: 'biotech',
  },
];

export default function Ritual() {
  return (
    <section id="ritual" className="py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 md:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity:0, x:-40 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }} transition={{ duration:.9, ease:[.16,1,.3,1] }}>

            <span style={{
              fontFamily:'Manrope,sans-serif', fontSize:11, fontWeight:700,
              letterSpacing:'0.22em', textTransform:'uppercase',
              color:'#1e5a3c', display:'block', marginBottom:14,
            }}>
              The Process
            </span>

            <h2 style={{ fontFamily:'"Noto Serif",Georgia,serif', fontWeight:700, color:'#1a1a1a', lineHeight:1.08, marginBottom:20 }}
              className="text-[clamp(34px,5vw,60px)]">
              From Forest<br/>
              <em style={{ fontStyle:'italic', color:'#1e5a3c' }}>to Formula.</em>
            </h2>

            <p style={{ fontFamily:'Manrope,sans-serif', fontSize:16, color:'#666666', lineHeight:1.85, marginBottom:40, fontWeight:400, maxWidth:440 }}>
              Every Shrumei product is a precision instrument. We don't cut
              corners. We don't dilute potency. We extract intelligence from
              fungi and deliver it to you in its purest form.
            </p>

            {/* Stats */}
            <div className="flex gap-10">
              {[['15+','Species'],['3x','More Bioavailable'],['100%','Traceable']].map(([n,l]) => (
                <div key={l}>
                  <div style={{ fontFamily:'"Noto Serif",serif', fontSize:34, fontWeight:700, color:'#1e5a3c', lineHeight:1 }}>
                    {n}
                  </div>
                  <div style={{ fontFamily:'Manrope,sans-serif', fontSize:10, letterSpacing:'0.12em', textTransform:'uppercase', color:'#aaaaaa', marginTop:6 }}>
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — steps */}
          <motion.div
            initial={{ opacity:0, x:40 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }} transition={{ duration:.9, ease:[.16,1,.3,1] }}
            className="flex flex-col">
            {STEPS.map((s, i) => (
              <motion.div key={i}
                initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay: i * .1 }}
                className="flex items-start gap-5 py-6 group"
                style={{ borderTop: i > 0 ? '1px solid rgba(0,0,0,0.07)' : 'none' }}>

                {/* Number circle */}
                <div className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-300 group-hover:bg-brand group-hover:border-brand"
                  style={{ borderColor:'rgba(30,90,60,0.2)', background:'#f7f6f3' }}>
                  <span style={{ fontFamily:'Manrope,sans-serif', fontSize:11, fontWeight:800, letterSpacing:'0.08em', color:'#1e5a3c' }}
                    className="group-hover:text-white transition-colors duration-300">
                    {s.n}
                  </span>
                </div>

                <div className="pt-1 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-[16px]" style={{ color:'#1e5a3c' }}>
                      {s.icon}
                    </span>
                    <h4 style={{ fontFamily:'"Noto Serif",Georgia,serif', fontSize:17, fontWeight:700, color:'#1a1a1a' }}>
                      {s.t}
                    </h4>
                  </div>
                  <p style={{ fontFamily:'Manrope,sans-serif', fontSize:13, color:'#888888', lineHeight:1.75, fontWeight:400 }}>
                    {s.p}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom banner */}
        <motion.div
          initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ delay:.2, duration:.8 }}
          className="mt-20 rounded-2xl p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8"
          style={{ background:'linear-gradient(135deg, #1e5a3c 0%, #2d7a50 100%)' }}>
          <div>
            <p style={{ fontFamily:'Manrope,sans-serif', fontSize:11, fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(255,255,255,0.6)', marginBottom:8 }}>
              Wellness Through Fungal Biotechnology
            </p>
            <h3 style={{ fontFamily:'"Noto Serif",Georgia,serif', fontSize:'clamp(22px,3vw,34px)', fontWeight:700, color:'#ffffff', lineHeight:1.2 }}>
              Harnessing the healing power<br/>of mushrooms and fungi.
            </h3>
          </div>
          <button
            onClick={() => document.getElementById('elixirs')?.scrollIntoView({ behavior:'smooth' })}
            style={{
              fontFamily:'Manrope,sans-serif', fontSize:12, fontWeight:700,
              letterSpacing:'0.14em', textTransform:'uppercase',
              padding:'14px 32px', borderRadius:9999,
              background:'#ffffff', color:'#1e5a3c',
              border:'none', cursor:'pointer',
              whiteSpace:'nowrap', flexShrink:0,
              transition:'all 0.3s',
              boxShadow:'0 4px 20px rgba(0,0,0,0.15)',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 28px rgba(0,0,0,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 4px 20px rgba(0,0,0,0.15)'; }}>
            Explore Elixirs →
          </button>
        </motion.div>
      </div>
    </section>
  );
}