import { useEffect } from 'react';
import Cursor         from './components/Cursor';
import Toast          from './components/Toast';
import Nav            from './components/Nav';
import Hero           from './components/Hero';
import Marquee        from './components/Marquee';
import SectionDivider from './components/SectionDivider';
import Features       from './components/Features';
// import SignatureProduct from './components/SignatureProduct'; // removed for now
import Products       from './components/Products';
import Ritual         from './components/Ritual';
import SocialProof    from './components/SocialProof';
import Footer         from './components/Footer';
import AuthPanel      from './components/AuthPanel';
import CartDrawer     from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import QuickView      from './components/QuickView';
import AIChat         from './components/AIChat';

export default function App() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.section-reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Marquee />

        <SectionDivider />
        <Features />

        <SectionDivider />
        <Products />

        <SectionDivider />
        <Ritual />

        <SectionDivider />
        <SocialProof />
      </main>

      <SectionDivider />
      <Footer />

      <AuthPanel />
      <CartDrawer />
      <WishlistDrawer />
      <QuickView />
      <AIChat />
      <Toast />
    </div>
  );
}