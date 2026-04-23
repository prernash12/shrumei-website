import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/store';

export default function Hero() {
  const { setAuthOpen } = useStore();
  const [count, setCount] = useState(9212);

  useEffect(() => {
    const iv = setInterval(() => {
      setCount(p => { if (p >= 10000) { clearInterval(iv); return 10000; } return p + 38; });
    }, 18);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const fn = () => {
      const d = document.documentElement;
      const pct = (d.scrollTop / (d.scrollHeight - d.clientHeight)) * 100;
      const bar = document.getElementById('scrollProg');
      if (bar) bar.style.width = pct + '%';
    };
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <section id="hero" className="relative w-full min-h-screen overflow-hidden bg-white">

      {/* ── VIDEO: Full background ── */}
      <div className="absolute top-0 right-0 w-full h-full z-0">
        <video
          src="/product-hero.mp4"
          autoPlay loop muted playsInline
          className="w-full h-full object-cover"
          style={{ filter:'brightness(0.88) saturate(1.05)' }}
        />
        {/* Strong dark gradient on LEFT — text area */}
        <div className="absolute inset-0"
          style={{ background:'linear-gradient(to right, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.85) 28%, rgba(255,255,255,0.3) 50%, transparent 70%)' }}/>
        {/* Top fade */}
        <div className="absolute top-0 left-0 right-0 h-32"
          style={{ background:'linear-gradient(to bottom, rgba(255,255,255,0.6), transparent)' }}/>
        {/* Bottom fade into white */}
        <div className="absolute bottom-0 left-0 right-0 h-40"
          style={{ background:'linear-gradient(to top, #ffffff, transparent)' }}/>
      </div>

      {/* ── LEFT: Content ── */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full">
          <div className="max-w-[520px] flex flex-col gap-5 py-28 pl-12 md:pl-20">

            {/* Trust badge */}
            <motion.div
              initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:.4 }}
              className="inline-flex items-center gap-2.5 w-fit">
              <div style={{ width:8, height:8, borderRadius:'50%', background:'#1e5a3c', animation:'blink 1.5s ease-in-out infinite' }}/>
              <span style={{ fontFamily:'Manrope,sans-serif', fontSize:11, fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', color:'#888888' }}>
                Trusted by <strong style={{ color:'#1e5a3c' }}>{count.toLocaleString()}+</strong> wellness seekers
              </span>
            </motion.div>

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.3 }}
              className="flex items-center gap-3">
              <div style={{ width:3, height:22, background:'#1e5a3c', borderRadius:2, opacity:.6 }}/>
              <span style={{ fontFamily:'Manrope,sans-serif', fontSize:10, fontWeight:700, letterSpacing:'0.3em', textTransform:'uppercase', color:'#aaaaaa' }}>
                Fungal Biotechnology · India
              </span>
            </motion.div>

            {/* Headline */}
            <h1 style={{ fontFamily:'"Noto Serif",Georgia,serif', fontWeight:700, lineHeight:1.08, overflow:'hidden' }}>
              <span className="block reveal-1"
                style={{ fontSize:'clamp(32px,3.2vw,52px)', color:'#1a1a1a' }}>
                Clean Skin.
              </span>
              <span className="block reveal-2"
                style={{ fontSize:'clamp(32px,3.2vw,52px)', color:'#1a1a1a' }}>
                Backed by
              </span>
              <span className="block reveal-3"
                style={{ fontSize:'clamp(32px,3.2vw,52px)', color:'#1e5a3c', fontStyle:'italic' }}>
                Fungal Science.
              </span>
            </h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.1, duration:.7 }}
              style={{ fontFamily:'Manrope,sans-serif', fontSize:15, color:'#666666', lineHeight:1.85, maxWidth:400, fontWeight:400 }}>
              Science-backed skincare powered by Cordycepin and Beta-Glucans —
              built to cleanse, repair, and protect your skin naturally.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.3 }}
              className="flex gap-4 flex-wrap">
              <button
                onClick={() => document.getElementById('elixirs')?.scrollIntoView({ behavior:'smooth' })}
                className="flex items-center gap-2.5"
                style={{ background:'#1e5a3c', color:'#ffffff', padding:'13px 28px', borderRadius:9999, fontFamily:'Manrope,sans-serif', fontWeight:700, fontSize:13, letterSpacing:'0.14em', textTransform:'uppercase', border:'none', cursor:'pointer', boxShadow:'0 4px 20px rgba(30,90,60,0.3)', transition:'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.background='#2d7a50'; e.currentTarget.style.transform='translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background='#1e5a3c'; e.currentTarget.style.transform='translateY(0)'; }}>
                Shop Now
                <span className="material-symbols-outlined" style={{ fontSize:16 }}>arrow_forward</span>
              </button>
              <button
                onClick={() => setAuthOpen(true, 'signup')}
                style={{ background:'transparent', color:'#1a1a1a', padding:'13px 24px', borderRadius:9999, fontFamily:'Manrope,sans-serif', fontWeight:500, fontSize:13, letterSpacing:'0.12em', textTransform:'uppercase', border:'1.5px solid rgba(0,0,0,0.15)', cursor:'pointer', transition:'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='#1e5a3c'; e.currentTarget.style.color='#1e5a3c'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(0,0,0,0.15)'; e.currentTarget.style.color='#1a1a1a'; }}>
                Create Account
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.6 }}
              className="flex gap-10"
              style={{ borderTop:'1px solid rgba(0,0,0,0.08)', paddingTop:20 }}>
              {[['100%','Natural'],['0','Side Effects'],['15+','Species']].map(([n,l]) => (
                <div key={l}>
                  <div style={{ fontFamily:'"Noto Serif",serif', fontSize:24, fontWeight:700, color:'#1e5a3c', lineHeight:1 }}>{n}</div>
                  <div style={{ fontFamily:'Manrope,sans-serif', fontSize:10, letterSpacing:'0.14em', textTransform:'uppercase', color:'#aaaaaa', marginTop:5 }}>{l}</div>
                </div>
              ))}
            </motion.div>

            {/* Brand badges */}
            <motion.div
              initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.9 }}
              className="flex gap-2 flex-wrap">
              {['🌿 100% Natural','🔬 Lab Verified','🇮🇳 Made in India'].map(b => (
                <span key={b} style={{ fontFamily:'Manrope,sans-serif', fontSize:11, fontWeight:600, color:'#888888', padding:'5px 12px', borderRadius:9999, background:'rgba(255,255,255,0.8)', border:'1px solid rgba(0,0,0,0.07)', backdropFilter:'blur(4px)' }}>
                  {b}
                </span>
              ))}
            </motion.div>

          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2.4 }}
        className="absolute bottom-8 left-16 flex items-center gap-3 z-10">
        <div style={{ width:40, height:1, background:'#1e5a3c', opacity:.4 }}/>
        <span style={{ fontFamily:'Manrope,sans-serif', fontSize:9, letterSpacing:'0.22em', textTransform:'uppercase', color:'#aaaaaa' }}>
          scroll to explore
        </span>
      </motion.div>

    </section>
  );
}