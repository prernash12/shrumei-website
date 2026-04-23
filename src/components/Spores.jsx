import { useEffect, useRef } from 'react';

export default function Spores({ count = 40 }) {
  const ref = useRef();
  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      const size = 2 + Math.random() * 5;
      const left = Math.random() * 100;
      const dur  = 8 + Math.random() * 18;
      const delay = -Math.random() * 20;
      const opacity = 0.2 + Math.random() * 0.55;
      el.className = 'spore';
      el.style.cssText = `
        left:${left}%; width:${size}px; height:${size}px;
        animation-duration:${dur}s; animation-delay:${delay}s;
        opacity:${opacity};
        background: ${Math.random()>.5 ? 'rgba(0,255,65,':'rgba(114,255,112,'}${opacity})`;
      ref.current.appendChild(el);
    }
  }, [count]);
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none z-[1]"/>
  );
}
