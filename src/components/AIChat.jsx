import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/store';

const SYSTEM = `You are Shrumei's AI wellness assistant for India's first Fungal Biotechnology brand.

Brand: Shrumei — premium wellness brand with 4 verticals:
1. Nutrition (Mycoproteins)
2. Nutraceutical OTC (Supplements)
3. Cosmetics (Skincare)
4. Health Teas & Beverages

Products: Myco Protein Powder (₹1,299), Immunity Shield Capsules (₹999), Fungi Glow Serum (₹1,499), Reishi Calm Tea (₹599), Cordyceps Energy Boost (₹1,199), Mushroom Face Mask (₹799).

Key compounds: Cordycepin (energy/ATP), Beta-Glucan (immunity), Ergothioneine (anti-aging), Tremella (hydration).

Tone: Warm, scientific, knowledgeable. Keep answers to 2-4 sentences. Recommend products based on user needs.`;

const FALLBACK = q => {
  const ql = q.toLowerCase();
  if (ql.match(/energy|stamina|gym|workout/))
    return "**Cordyceps Energy Boost** (₹1,199) is perfect for you — Cordycepin directly stimulates ATP synthesis, improving VO2 max by up to 18% in clinical trials.";
  if (ql.match(/sleep|stress|calm|relax/))
    return "**Reishi Calm Tea** (₹599) — adaptogenic Reishi modulates cortisol for deep, restorative sleep without any synthetic sedation.";
  if (ql.match(/skin|glow|serum|face|bright/))
    return "**Fungi Glow Serum** (₹1,499) — Tremella mushroom retains 400x its weight in moisture, plus Ergothioneine for cellular protection. Brighter skin in 14 days.";
  if (ql.match(/immun|sick|protect/))
    return "**Immunity Shield** (₹999) — clinically dosed Beta-Glucan 1,3/1,6 activates your immune response. The most researched immunomodulating compound in fungal science.";
  if (ql.match(/protein|muscle|gains/))
    return "**Myco Protein Powder** (₹1,299) — 28g complete amino acids from Shiitake + Reishi. BCAA-rich, gut-friendly and far more sustainable than whey.";
  return "Hi! I'm Shrumei's wellness guide 🍄 Tell me your goal — energy, immunity, skincare, or sleep — and I'll find the right formulation for you.";
};

export default function AIChat() {
  const { aiOpen, setAiOpen } = useStore();
  const [msgs, setMsgs] = useState([
    { role:'bot', text:"Hi! I'm Shrumei's AI wellness guide. Ask me about our products or which formulation is right for your needs 🍄" }
  ]);
  const [input, setInput]   = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior:'smooth' });
  }, [msgs, loading]);

  const send = async () => {
    const q = input.trim();
    if (!q || loading) return;
    setInput('');
    setMsgs(p => [...p, { role:'user', text:q }]);
    setLoading(true);
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 300,
          system: SYSTEM,
          messages: [{ role:'user', content:q }],
        }),
      });
      const data = await res.json();
      const reply = data?.content?.[0]?.text || FALLBACK(q);
      setMsgs(p => [...p, { role:'bot', text:reply }]);
    } catch {
      setMsgs(p => [...p, { role:'bot', text:FALLBACK(q) }]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* FAB */}
      <motion.button
        whileHover={{ scale:1.05 }}
        whileTap={{ scale:.95 }}
        onClick={() => setAiOpen(!aiOpen)}
        className="fixed bottom-7 right-7 z-[1000] flex items-center gap-2.5 px-5 py-3.5 rounded-full"
        style={{
          background: '#ffffff',
          border: '1.5px solid rgba(30,90,60,0.2)',
          boxShadow: '0 8px 28px rgba(0,0,0,0.1)',
          cursor: 'pointer',
        }}>
        {/* Live dot */}
        <div className="relative">
          <div className="w-2 h-2 rounded-full" style={{ background:'#1e5a3c' }}>
            <span className="absolute inset-0 rounded-full animate-ping"
              style={{ background:'#1e5a3c', opacity:0.4 }}/>
          </div>
        </div>
        <span style={{ fontFamily:'Manrope,sans-serif', fontSize:12, fontWeight:700, letterSpacing:'0.1em', color:'#1e5a3c' }}>
          AI Guide
        </span>
        <span className="material-symbols-outlined" style={{ fontSize:18, color:'#1e5a3c' }}>
          auto_awesome
        </span>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {aiOpen && (
          <motion.div
            initial={{ opacity:0, y:16, scale:.96 }}
            animate={{ opacity:1, y:0, scale:1 }}
            exit={{ opacity:0, y:16, scale:.96 }}
            transition={{ ease:[.16,1,.3,1], duration:.4 }}
            className="fixed bottom-28 right-7 z-[1000] flex flex-col overflow-hidden"
            style={{
              width: 360,
              height: 500,
              background: '#ffffff',
              border: '1px solid rgba(0,0,0,0.1)',
              borderRadius: 20,
              boxShadow: '0 24px 80px rgba(0,0,0,0.15)',
            }}>

            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3.5"
              style={{ borderBottom:'1px solid rgba(0,0,0,0.07)', background:'#f7f6f3' }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-[18px]"
                style={{ background:'#e8f5ee', border:'1px solid #c8e6d4' }}>
                🍄
              </div>
              <div className="flex-1">
                <p style={{ fontFamily:'Manrope,sans-serif', fontSize:13, fontWeight:700, color:'#1a1a1a' }}>
                  Shrumei AI
                </p>
                <p style={{ fontFamily:'Manrope,sans-serif', fontSize:11, color:'#1e5a3c' }}>
                  Wellness Guide · Online
                </p>
              </div>
              <button onClick={() => setAiOpen(false)}
                style={{ color:'#aaaaaa', background:'none', border:'none', cursor:'pointer', lineHeight:1 }}>
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {msgs.map((m, i) => (
                <div key={i} className={`flex max-w-[88%] ${m.role === 'user' ? 'self-end' : 'self-start'}`}>
                  <div
                    style={{
                      padding: '10px 14px',
                      borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                      fontFamily: 'Manrope,sans-serif',
                      fontSize: 13,
                      lineHeight: 1.65,
                      background: m.role === 'user' ? '#1e5a3c' : '#f7f6f3',
                      color: m.role === 'user' ? '#ffffff' : '#1a1a1a',
                      border: m.role === 'user' ? 'none' : '1px solid rgba(0,0,0,0.07)',
                    }}
                    dangerouslySetInnerHTML={{
                      __html: m.text
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\n/g, '<br/>'),
                    }}
                  />
                </div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <div className="self-start px-4 py-3 rounded-[18px] rounded-bl-sm"
                  style={{ background:'#f7f6f3', border:'1px solid rgba(0,0,0,0.07)' }}>
                  <div className="flex gap-1.5 items-center">
                    {[0, .2, .4].map(d => (
                      <span key={d} className="w-1.5 h-1.5 rounded-full"
                        style={{ background:'#aaaaaa', animation:`bounce 1.2s ${d}s ease-in-out infinite` }}/>
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef}/>
            </div>

            {/* Input */}
            <div className="flex p-3 gap-0"
              style={{ borderTop:'1px solid rgba(0,0,0,0.07)' }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="Ask about your wellness goals..."
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  background: '#f7f6f3',
                  border: '1px solid rgba(0,0,0,0.08)',
                  borderRight: 'none',
                  borderRadius: '12px 0 0 12px',
                  fontFamily: 'Manrope,sans-serif',
                  fontSize: 13,
                  color: '#1a1a1a',
                  outline: 'none',
                }}
              />
              <button onClick={send}
                style={{
                  padding: '10px 16px',
                  background: '#1e5a3c',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '0 12px 12px 0',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#2d7a50'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#1e5a3c'; }}>
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-5px); }
        }
      `}</style>
    </>
  );
}