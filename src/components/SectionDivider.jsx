export default function SectionDivider() {
  return (
    <div style={{ position: 'relative', width: '100%', height: 90 }}>

      {/* Thick green line */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 4,
        background: '#1e5a3c',
        zIndex: 2,
        boxShadow: '0 0 20px rgba(30,90,60,0.35)',
      }}/>

      {/* Premium green shadow glow */}
      <div style={{
        position: 'absolute',
        top: 4, left: 0, right: 0,
        height: 86,
        background: `
          linear-gradient(to bottom,
            rgba(30,90,60,0.42) 0%,
            rgba(30,90,60,0.28) 20%,
            rgba(30,90,60,0.14) 50%,
            rgba(30,90,60,0.05) 80%,
            transparent 100%)
        `,
        pointerEvents: 'none',
        zIndex: 1,
      }}/>
    </div>
  );
}