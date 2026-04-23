import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/store';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cart, wishlist, session, logout, setCartOpen, setWishlistOpen, setAuthOpen, showToast } = useStore();
  const cartCount = cart.reduce((s, x) => s + x.qty, 0);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [
    { label: 'Products',  href: '#elixirs' },
    { label: 'Science',   href: '#science' },
    { label: 'Process',   href: '#ritual' },
    { label: 'Our Story', href: '#about' },
  ];

  const navBg = 'rgba(0,0,0,0.25)';

  const textColor   = '#ffffff';
  const mutedColor  = 'rgba(255,255,255,0.8)';
  const borderColor = 'rgba(255,255,255,0.25)';
  const logoColor   = '#ffffff';

  return (
    <>
      <div className="scroll-prog" id="scrollProg" />

      <header
        className="fixed top-0 w-full z-[1000] transition-all duration-400"
        style={{
          background: navBg,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.08)' : 'none',
        }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-[66px] flex items-center justify-between gap-4">

          {/* Logo */}
          <a href="#"
            className="font-headline text-[18px] font-bold tracking-[.2em] uppercase flex items-center gap-2 transition-all"
            style={{ color: logoColor }}>
            🍄 SHRUMEI
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <a key={l.label} href={l.href}
                className="font-label text-[13px] font-medium px-4 py-2 rounded-full transition-all duration-200"
                style={{ color: mutedColor }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = scrolled ? '#1e5a3c' : '#ffffff';
                  e.currentTarget.style.background = scrolled ? '#e8f5ee' : 'rgba(255,255,255,0.15)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = mutedColor;
                  e.currentTarget.style.background = 'transparent';
                }}>
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2">

            {/* Wishlist */}
            <button onClick={() => setWishlistOpen(true)}
              className="relative w-9 h-9 rounded-full flex items-center justify-center transition-all"
              style={{ border: `1px solid ${borderColor}`, color: scrolled ? '#666666' : '#ffffff' }}
              onMouseEnter={e => { e.currentTarget.style.background = scrolled ? '#e8f5ee' : 'rgba(255,255,255,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
              <span className="material-symbols-outlined text-[18px]">favorite</span>
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart */}
            <button onClick={() => setCartOpen(true)}
              className="relative w-9 h-9 rounded-full flex items-center justify-center transition-all"
              style={{ border: `1px solid ${borderColor}`, color: scrolled ? '#666666' : '#ffffff' }}
              onMouseEnter={e => { e.currentTarget.style.background = scrolled ? '#e8f5ee' : 'rgba(255,255,255,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Auth */}
            {session ? (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center font-bold text-[13px] text-white">
                  {session.firstName?.[0]?.toUpperCase()}
                </div>
                <button
                  onClick={() => { logout(); showToast('Logged out. See you soon 🍄'); }}
                  className="font-label text-[12px] px-3 py-1.5 rounded-full transition-all"
                  style={{ color: mutedColor, border: `1px solid ${borderColor}` }}>
                  Exit
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={() => setAuthOpen(true, 'login')}
                  className="font-label text-[13px] font-medium px-4 py-2 rounded-full transition-all"
                  style={{ color: mutedColor, border: `1px solid ${borderColor}` }}
                  onMouseEnter={e => { e.currentTarget.style.background = scrolled ? '#f7f6f3' : 'rgba(255,255,255,0.15)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
                  Login
                </button>
                <button
                  onClick={() => setAuthOpen(true, 'signup')}
                  className="font-label text-[13px] font-bold px-5 py-2 rounded-full transition-all"
                  style={{
                    background: scrolled ? '#1e5a3c' : '#ffffff',
                    color: scrolled ? '#ffffff' : '#1e5a3c',
                    border: 'none',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.15)'; }}>
                  Get Started
                </button>
              </div>
            )}

            {/* Mobile burger */}
            <button
              className="md:hidden w-9 h-9 flex flex-col justify-center items-center gap-[5px]"
              onClick={() => setMobileOpen(!mobileOpen)}>
              {[0,1,2].map(i => (
                <span key={i} className="block h-0.5 w-5 transition-all duration-300"
                  style={{ background: scrolled ? '#1a1a1a' : '#ffffff' }}/>
              ))}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="fixed inset-0 z-[999] bg-white flex flex-col items-center justify-center gap-6">
            <button onClick={() => setMobileOpen(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full border border-black/10 flex items-center justify-center text-ink3">
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
            <div className="font-headline text-[28px] font-bold tracking-[.2em] text-brand">🍄 SHRUMEI</div>
            {links.map(l => (
              <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)}
                className="font-headline text-[26px] italic text-ink2 hover:text-brand transition-colors">
                {l.label}
              </a>
            ))}
            {!session && (
              <div className="flex gap-3 mt-4">
                <button onClick={() => { setAuthOpen(true, 'login'); setMobileOpen(false); }}
                  className="px-6 py-3 rounded-full font-label text-[13px] text-ink2 border border-black/10">
                  Login
                </button>
                <button onClick={() => { setAuthOpen(true, 'signup'); setMobileOpen(false); }}
                  className="px-6 py-3 rounded-full font-label text-[13px] font-bold text-white bg-brand">
                  Get Started
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}