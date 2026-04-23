import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const SCAN_BOXES = [
    { id: 1, label: 'Cordycepin', sub: 'ATP Booster · Energy', top: '60%', left: '50%', width: 150, height: 88 },
    { id: 2, label: 'Beta-Glucan', sub: 'Immunomodulator', top: '5%', left: '35%', width: 148, height: 86 },
    { id: 3, label: 'Ergothioneine', sub: 'Longevity Antioxidant', top: '28%', left: '55%', width: 148, height: 86 },
    { id: 4, label: "Lion's Mane", sub: 'Cognitive · Neural', top: '20%', left: '8%', width: 148, height: 86 },
];

function Corner({ pos }) {
    const s = 10, t = 1.5, c = 'rgba(0,255,65,0.95)';
    const styles = {
        tl: { top: 0, left: 0, borderTop: `${t}px solid ${c}`, borderLeft: `${t}px solid ${c}` },
        tr: { top: 0, right: 0, borderTop: `${t}px solid ${c}`, borderRight: `${t}px solid ${c}` },
        bl: { bottom: 0, left: 0, borderBottom: `${t}px solid ${c}`, borderLeft: `${t}px solid ${c}` },
        br: { bottom: 0, right: 0, borderBottom: `${t}px solid ${c}`, borderRight: `${t}px solid ${c}` },
    };
    return <div style={{ position: 'absolute', width: s, height: s, ...styles[pos] }} />;
}

function ScanBox({ box, active, visible }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: visible ? (active ? 1 : 0.45) : 0, scale: visible ? 1 : 0.88 }}
            transition={{ duration: 0.6 }}
            style={{
                position: 'absolute',
                top: box.top,
                left: box.left,
                width: box.width,
                height: box.height,
                zIndex: 10,
                pointerEvents: 'none',
                filter: active ? 'drop-shadow(0 0 6px rgba(0,255,65,0.5))' : 'none',
            }}
        >
            <Corner pos="tl" />
            <Corner pos="tr" />
            <Corner pos="bl" />
            <Corner pos="br" />

            <motion.div
                animate={{ opacity: active ? [0.5, 1, 0.5] : 0.5 }}
                transition={{ duration: 1.4, repeat: Infinity }}
                style={{
                    position: 'absolute',
                    top: -3,
                    left: -3,
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#00ff41',
                    boxShadow: '0 0 10px rgba(0,255,65,0.9)',
                }}
            />

            {/* Glow overlay instead of dark */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at center, rgba(0,255,100,0.15), transparent)',
                }}
            />

            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'rgba(0,255,65,0.08)',
                    backdropFilter: 'blur(12px)',
                    borderTop: '1px solid rgba(0,255,65,0.2)',
                    padding: '6px 8px',
                }}
            >
                <p style={{
                    fontSize: 9,
                    fontWeight: 800,
                    letterSpacing: '0.14em',
                    color: '#00ff41'
                }}>
                    {box.label}
                </p>
                <p style={{
                    fontSize: 8,
                    color: 'rgba(0,255,65,0.7)'
                }}>
                    {box.sub}
                </p>
            </div>
        </motion.div>
    );
}

export default function MushroomScan() {
    const [activeBox, setActiveBox] = useState(0);
    const [visible, setVisible] = useState(false);
    const sweepRef = useRef();

    useEffect(() => {
        setTimeout(() => setVisible(true), 1000);
        const interval = setInterval(() => {
            setActiveBox(p => (p + 1) % SCAN_BOXES.length);
        }, 1600);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{
            position: 'relative',
            width: 'clamp(340px,42vw,560px)',
            height: 'clamp(400px,62vh,620px)',
            overflow: 'hidden',
        }}>

            {/* Bright image */}
            <video
                src="/product-hero.mp4"
                autoPlay
                loop
                muted
                playsInline
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'brightness(1.25) contrast(1.1) saturate(1.2)',
                }}
            />

            {/* ✨ PURE BLUR EDGES (NO DARKNESS) */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',

                    /* Pure blur */
                    backdropFilter: 'blur(40px)',
                    WebkitBackdropFilter: 'blur(40px)',

                    /* IMPORTANT: remove black masking */
                    maskImage: `
      radial-gradient(circle at center, 
        transparent 55%, 
        rgba(0,0,0,0.2) 70%, 
        rgba(0,0,0,0.4) 85%, 
        rgba(0,0,0,0.6) 100%
      )
    `,
                    WebkitMaskImage: `
      radial-gradient(circle at center, 
        transparent 55%, 
        rgba(0,0,0,0.2) 70%, 
        rgba(0,0,0,0.4) 85%, 
        rgba(0,0,0,0.6) 100%
      )
    `,
                }}
            />

            {/* Scan line */}
            <div
                ref={sweepRef}
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    height: 2,
                    background: 'linear-gradient(90deg,transparent,#00ff41,transparent)',
                    top: '30%',
                    opacity: 0.5,
                }}
            />

            {SCAN_BOXES.map((box, i) => (
                <ScanBox key={box.id} box={box} active={activeBox === i} visible={visible} />
            ))}

        </div>
    );
}