const items = [
  'Fungal Biotechnology',
  'Ancient Wisdom',
  'Modern Precision',
  'Zero Side Effects',
  'Cordycepin',
  'Beta-Glucan',
  'Lab Grown',
  'Wild Sourced',
  'Bio-Available',
  'Made in India',
];

export default function Marquee() {
  return (
    <div className="py-4 bg-bg2 border-t border-b border-border-light overflow-hidden">
      <div className="flex overflow-hidden">
        <div
          className="flex items-center gap-8 whitespace-nowrap flex-shrink-0"
          style={{ animation: 'marquee 28s linear infinite' }}
        >
          {[...items, ...items, ...items, ...items].map((item, i) => (
            <span key={i} className="flex items-center gap-8">
              <span
                style={{
                  fontFamily: 'Manrope,sans-serif',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: '#888888',
                }}
              >
                {item}
              </span>
              <span style={{ color: '#1e5a3c', fontSize: 8, opacity: 0.5 }}>✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}