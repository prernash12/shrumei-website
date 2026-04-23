import { useEffect, useRef } from 'react';

export default function Cursor() {
  const cursor = useRef();

  useEffect(() => {
    if (window.innerWidth < 768) return;

    // Create mushroom emoji cursor
    if (cursor.current) {
      cursor.current.style.cssText = `
        position: fixed;
        font-size: 22px;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: transform 0.1s;
        user-select: none;
        line-height: 1;
      `;
      cursor.current.textContent = '🍄';
    }

    const move = e => {
      if (cursor.current) {
        cursor.current.style.left = e.clientX + 'px';
        cursor.current.style.top  = e.clientY + 'px';
      }
    };

    window.addEventListener('mousemove', move);

    const grow = () => {
      if (!cursor.current) return;
      cursor.current.style.fontSize = '30px';
      cursor.current.style.transform = 'translate(-50%, -50%) rotate(-15deg)';
    };

    const shrink = () => {
      if (!cursor.current) return;
      cursor.current.style.fontSize = '22px';
      cursor.current.style.transform = 'translate(-50%, -50%) rotate(0deg)';
    };

    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', grow);
      el.addEventListener('mouseleave', shrink);
    });

    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div ref={cursor} id="cur-dot" />
  );
}