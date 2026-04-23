import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const VERTICALS = [
  {
    id: 1,
    number: '01',
    title: 'Nutrition',
    subtitle: 'Mycoproteins',
    desc: 'Complete amino acid profiles from Shiitake & Reishi. High-protein, gut-friendly, sustainable alternative to animal protein.',
    tag: 'High Protein · BCAA Rich · Gut Friendly',
    color: '#e8f5ee',
    accent: '#1e5a3c',
    icon: 'fitness_center',
    image: '/Nutrition Mycoproteins.jpg',
  },
  {
    id: 2,
    number: '02',
    title: 'Nutraceutical',
    subtitle: 'OTC Supplements',
    desc: 'Clinically dosed Beta-Glucan and Cordycepin for immunity, energy and cognitive performance.',
    tag: 'Immunity · Energy · Focus',
    color: '#fff7e6',
    accent: '#a05c00',
    icon: 'science',
    image: '/Nutraceutical.jpg',
  },
  {
    id: 3,
    number: '03',
    title: 'Cosmetics',
    subtitle: 'Skincare Range',
    desc: 'Ergothioneine and Tremella-powered skincare. Visible skin repair and natural glow in 14 days.',
    tag: 'Glow · Repair · Anti-Aging',
    color: '#f5f0ff',
    accent: '#6b3fa0',
    icon: 'spa',
    image: '/Cosmetics.jpg',
  },
  {
    id: 4,
    number: '04',
    title: 'Health Teas',
    subtitle: '& Beverages',
    desc: 'Adaptogenic Reishi and Chaga blends for deep sleep, stress relief and daily wellness rituals.',
    tag: 'Sleep · Calm · Adaptogenic',
    color: '#e6f7f5',
    accent: '#0a6b5e',
    icon: 'local_cafe',
    image: '/Health Teas.jpg',
  },
];

const ITEMS = [...VERTICALS, ...VERTICALS, ...VERTICALS];

function VerticalCard({ v, cardWidth, onMouseEnter, onMouseLeave }) {
  const [hovered, setHovered] = useState(false);

  const handleEnter = () => { setHovered(true); onMouseEnter?.(); };
  const handleLeave = () => { setHovered(false); onMouseLeave?.(); };

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="group flex-shrink-0"
      style={{ width: cardWidth, cursor: 'pointer' }}>

      <div className="relative overflow-hidden"
        style={{
          borderRadius: 20, height: 400,
          boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.22)' : '0 6px 24px rgba(0,0,0,0.09)',
          border: hovered ? `2px solid ${v.accent}44` : '1px solid rgba(0,0,0,0.07)',
          transition: 'box-shadow 0.4s ease, border 0.4s ease',
        }}>

        <div className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${v.color} 0%, white 100%)` }}/>

        <img
          src={v.image} alt={v.title}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: 0.88,
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
            transition: 'transform 0.7s cubic-bezier(.16,1,.3,1)',
          }}
          onError={e => { e.currentTarget.style.display = 'none'; }}
        />

        <div className="absolute inset-0 z-10"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.08) 55%, transparent 100%)' }}/>

        <div className="absolute inset-0 z-10"
          style={{ background: 'rgba(0,0,0,0.15)', opacity: hovered ? 1 : 0, transition: 'opacity 0.5s' }}/>

        {/* Number badge */}
        <div className="absolute top-4 left-4 z-20"
          style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(12px)', borderRadius: 10, padding: '6px 14px', border: '1px solid rgba(255,255,255,0.3)' }}>
          <span style={{ fontFamily: 'Manrope,sans-serif', fontSize: 12, fontWeight: 800, color: '#fff', letterSpacing: '0.1em' }}>
            {v.number}
          </span>
        </div>

        {/* Tag pill */}
        <div className="absolute top-4 right-4 z-20"
          style={{
            background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(12px)',
            borderRadius: 9999, padding: '5px 14px', border: '1px solid rgba(255,255,255,0.3)',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(6px)',
            transition: 'all 0.4s ease',
          }}>
          <span style={{ fontFamily: 'Manrope,sans-serif', fontSize: 10, fontWeight: 600, color: '#fff' }}>
            {v.tag}
          </span>
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
          <h3 style={{ fontFamily: '"Noto Serif",Georgia,serif', fontSize: 22, fontWeight: 700, color: '#ffffff', lineHeight: 1.1, marginBottom: 4, textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
            {v.title}
          </h3>
          <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>
            {v.subtitle}
          </p>
          <div style={{
            maxHeight: hovered ? 80 : 0, overflow: 'hidden',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(8px)',
            transition: 'all 0.45s cubic-bezier(.16,1,.3,1)',
            marginTop: hovered ? 10 : 0,
          }}>
            <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 1.65 }}>
              {v.desc}
            </p>
          </div>
          <div style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(8px)',
            transition: 'all 0.45s cubic-bezier(.16,1,.3,1) 0.08s',
            marginTop: hovered ? 14 : 0,
          }}>
            <button style={{
              fontFamily: 'Manrope,sans-serif', fontSize: 12, fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff',
              background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.3)', padding: '8px 18px',
              borderRadius: 9999, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
            }}>
              Explore Range
              <span className="material-symbols-outlined" style={{ fontSize: 15 }}>arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Below card */}
      <div style={{ padding: '14px 4px 0' }} className="flex items-center justify-between">
        <h4 style={{ fontFamily: '"Noto Serif",Georgia,serif', fontSize: 16, fontWeight: 700, color: '#1a1a1a' }}>
          {v.title}{' '}
          <em style={{ color: v.accent, fontStyle: 'italic' }}>· {v.subtitle}</em>
        </h4>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: v.color, border: `1px solid ${v.accent}25`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          transform: hovered ? 'scale(1.12)' : 'scale(1)',
          transition: 'transform 0.3s ease',
        }}>
          <span className="material-symbols-outlined"
            style={{ fontSize: 17, color: v.accent, fontVariationSettings: "'FILL' 1" }}>
            {v.icon}
          </span>
        </div>
      </div>
    </div>
  );
}

const ArrowBtn = ({ dir, onClick }) => {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
        background: hov ? '#2d7a50' : '#1e5a3c',
        border: '2px solid rgba(255,255,255,0.25)',
        color: '#ffffff', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: hov ? '0 8px 28px rgba(30,90,60,0.5)' : '0 4px 16px rgba(30,90,60,0.3)',
        transform: hov ? 'scale(1.1)' : 'scale(1)',
        transition: 'all 0.25s ease',
      }}>
      <span className="material-symbols-outlined" style={{ fontSize: 24 }}>
        {dir === 'left' ? 'chevron_left' : 'chevron_right'}
      </span>
    </button>
  );
};

export default function Features() {
  const trackRef   = useRef();
  const wrapperRef = useRef();
  const pausedRef  = useRef(false);
  const posRef     = useRef(0);
  const rafRef     = useRef();
  const [active, setActive]       = useState(0);
  const [cardWidth, setCardWidth] = useState(420);

  useEffect(() => {
    const calc = () => {
      if (wrapperRef.current) {
        const total = wrapperRef.current.offsetWidth;
        const w = Math.floor((total - 40 - 60) / 3);
        setCardWidth(w);
      }
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  const GAP    = 20;
  const CARD_W = cardWidth + GAP;
  const TOTAL  = VERTICALS.length * CARD_W;
  const SPEED  = 0.5;

  useEffect(() => {
    const tick = () => {
      if (!pausedRef.current && trackRef.current) {
        posRef.current += SPEED;
        if (posRef.current >= TOTAL) posRef.current -= TOTAL;
        trackRef.current.style.transform = `translateX(-${posRef.current}px)`;
        const idx = Math.floor((posRef.current + CARD_W / 2) / CARD_W) % VERTICALS.length;
        setActive(Math.max(0, idx));
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [TOTAL, CARD_W]);

  const pause  = () => { pausedRef.current = true; };
  const resume = () => { pausedRef.current = false; };

  const goLeft = () => {
    pausedRef.current = true;
    let target = posRef.current - CARD_W;
    if (target < 0) target += TOTAL;
    posRef.current = target;
    if (trackRef.current) {
      trackRef.current.style.transition = 'transform 0.5s cubic-bezier(.16,1,.3,1)';
      trackRef.current.style.transform = `translateX(-${target}px)`;
      setTimeout(() => {
        if (trackRef.current) trackRef.current.style.transition = '';
        pausedRef.current = false;
      }, 550);
    }
  };

  const goRight = () => {
    pausedRef.current = true;
    let target = posRef.current + CARD_W;
    if (target >= TOTAL) target -= TOTAL;
    posRef.current = target;
    if (trackRef.current) {
      trackRef.current.style.transition = 'transform 0.5s cubic-bezier(.16,1,.3,1)';
      trackRef.current.style.transform = `translateX(-${target}px)`;
      setTimeout(() => {
        if (trackRef.current) trackRef.current.style.transition = '';
        pausedRef.current = false;
      }, 550);
    }
  };

  return (
    <section id="science" className="pb-20 bg-white overflow-hidden">

      {/* Header */}
      <div style={{ paddingLeft: 56, paddingRight: 56, paddingTop: 24, paddingBottom: 40, position: 'relative', zIndex: 5 }}>
        <div className="flex items-end justify-between">
          <motion.div
            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:.7 }}>
            <span style={{ fontFamily:'Manrope,sans-serif', fontSize:11, fontWeight:700, letterSpacing:'0.22em', textTransform:'uppercase', color:'#1e5a3c', display:'block', marginBottom:12 }}>
              Our 4 Verticals
            </span>
            <h2 style={{ fontFamily:'"Noto Serif",Georgia,serif', fontWeight:700, color:'#1a1a1a', lineHeight:1.08 }}
              className="text-[clamp(30px,4vw,52px)]">
              Wellness Through<br/>
              <em style={{ fontStyle:'italic', color:'#1e5a3c' }}>Fungal Biotechnology</em>
            </h2>
          </motion.div>

          {/* Right side — live indicator + arrows */}
          <div className="hidden md:flex flex-col items-end gap-4">
            <div className="flex items-center gap-2">
              <div style={{ width:8, height:8, borderRadius:'50%', background:'#1e5a3c', animation:'blink 1.5s ease-in-out infinite' }}/>
              <span style={{ fontFamily:'Manrope,sans-serif', fontSize:11, color:'#aaa', fontWeight:600 }}>
                Auto-scrolling · Hover to pause
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll track with LEFT and RIGHT arrows on edges */}
<div className="relative">

  {/* LEFT arrow — far left corner */}
  <div className="absolute left-0 top-[200px] z-30" style={{ transform:'translateY(-50%)' }}>
    <ArrowBtn dir="left" onClick={goLeft} />
  </div>

  {/* RIGHT arrow — far right corner */}
  <div className="absolute right-0 top-[200px] z-30" style={{ transform:'translateY(-50%)' }}>
    <ArrowBtn dir="right" onClick={goRight} />
  </div>

  <div ref={wrapperRef} className="overflow-hidden" style={{ paddingLeft:56 }}>
        <div
          ref={trackRef}
          className="flex"
          style={{ gap: GAP, width: 'max-content', willChange: 'transform' }}>
          {ITEMS.map((v, i) => (
            <VerticalCard
              key={`${v.id}-${i}`}
              v={v}
              cardWidth={cardWidth}
              onMouseEnter={pause}
              onMouseLeave={resume}
            />
          ))}
        </div>
      </div>

      {/* Dots + arrows mobile */}
      <div className="flex items-center justify-between mt-8" style={{ paddingLeft:56, paddingRight:56 }}>
        <div className="flex items-center gap-2">
          {VERTICALS.map((_, i) => (
            <div key={i} style={{
              width: i === active ? 24 : 6, height: 6, borderRadius: 9999,
              background: i === active ? '#1e5a3c' : '#e0e0e0',
              transition: 'all 0.4s ease',
            }}/>
          ))}
          <span style={{ fontFamily:'Manrope,sans-serif', fontSize:11, color:'#bbb', marginLeft:8 }}>
            Hover any card to pause
          </span>
        </div>
      </div>
</div>
    </section>
  );
}