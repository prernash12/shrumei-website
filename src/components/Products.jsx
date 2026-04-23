import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/store';

const PRODUCTS = [
  { id:1, name:'Myco Protein Powder',    price:1299, cat:'Nutrition',     icon:'fitness_center', desc:'Complete amino profile from Shiitake & Reishi. 28g protein, BCAA-rich, gut-friendly.',      batch:'0042-A', rating:5, reviews:248 },
  { id:2, name:'Immunity Shield',        price:999,  cat:'Nutraceutical', icon:'shield',         desc:'Beta-glucan enriched. Clinically dosed immune modulation. 60 capsules per pack.',           batch:'0038-B', rating:5, reviews:182 },
  { id:3, name:'Fungi Glow Serum',       price:1499, cat:'Cosmetics',     icon:'spa',            desc:'Tremella + Ergothioneine. Deep hydration and cellular antioxidant defence.',               batch:'0051-C', rating:5, reviews:316 },
  { id:4, name:'Reishi Calm Tea',        price:599,  cat:'Teas',          icon:'local_cafe',     desc:'Adaptogenic Reishi blend. Cortisol reduction and deep restorative sleep.',                 batch:'0039-D', rating:4, reviews:94  },
  { id:5, name:'Cordyceps Energy Boost', price:1199, cat:'Nutraceutical', icon:'bolt',           desc:'Pure Cordyceps militaris. Proven +18% VO2 max improvement. 1000mg per capsule.',          batch:'0044-E', rating:5, reviews:207 },
  { id:6, name:'Mushroom Face Mask',     price:799,  cat:'Cosmetics',     icon:'face',           desc:'Chaga + Snow Mushroom clay mask. Pore refinement and natural skin brightening.',           batch:'0047-F', rating:4, reviews:128 },
];

const CATS = ['All', 'Nutrition', 'Nutraceutical', 'Cosmetics', 'Teas'];

const CAT_COLORS = {
  Nutrition:     { bg:'#e8f5ee', text:'#1e5a3c', border:'#c8e6d4' },
  Nutraceutical: { bg:'#fff7e6', text:'#a05c00', border:'#ffdfa0' },
  Cosmetics:     { bg:'#f5f0ff', text:'#6b3fa0', border:'#d4bfff' },
  Teas:          { bg:'#e6f7f5', text:'#0a6b5e', border:'#a0ddd8' },
};

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(s => (
        <span key={s} style={{ fontSize:12, color: s <= rating ? '#f59e0b' : '#dddddd' }}>★</span>
      ))}
    </div>
  );
}

function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWishlisted, setQuickView, showToast } = useStore();
  const wished = isWishlisted(product.id);
  const colors = CAT_COLORS[product.cat] || CAT_COLORS.Nutrition;

  return (
    <motion.div
      initial={{ opacity:0, y:32 }} whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:'-60px' }}
      transition={{ duration:.75, ease:[.16,1,.3,1] }}
      className="group card-base bg-white overflow-hidden relative"
    >
      {/* Wishlist */}
      <button
        onClick={() => { const added = toggleWishlist(product); showToast(added ? `${product.name} saved ♥` : `${product.name} removed`); }}
        className="absolute top-3 left-3 z-10 w-8 h-8 rounded-full bg-white border flex items-center justify-center transition-all hover:scale-110"
        style={{ borderColor: wished ? '#dc2626' : 'rgba(0,0,0,0.1)', color: wished ? '#dc2626' : '#aaaaaa' }}>
        <span className="material-symbols-outlined text-[15px]"
          style={{ fontVariationSettings: wished ? "'FILL' 1" : "'FILL' 0" }}>
          favorite
        </span>
      </button>

      {/* Visual area */}
      <div className="relative h-48 flex items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${colors.bg}, white)` }}>
        <span
          className="material-symbols-outlined transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6"
          style={{ fontSize:72, color: colors.text, opacity:0.7, fontVariationSettings:"'FILL' 1" }}>
          {product.icon}
        </span>
        {/* Batch tag */}
        <div className="absolute bottom-3 right-3">
          <span style={{ fontFamily:'Manrope,sans-serif', fontSize:9, letterSpacing:'0.1em', textTransform:'uppercase', color:'#aaaaaa' }}>
            BATCH {product.batch}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        {/* Category tag + stars */}
        <div className="flex items-center justify-between mb-3">
          <span style={{
            fontFamily:'Manrope,sans-serif', fontSize:9, fontWeight:700,
            letterSpacing:'0.12em', textTransform:'uppercase',
            padding:'3px 10px', borderRadius:9999,
            background: colors.bg, color: colors.text, border:`1px solid ${colors.border}`,
          }}>
            {product.cat}
          </span>
          <div className="flex items-center gap-1.5">
            <StarRating rating={product.rating}/>
            <span style={{ fontFamily:'Manrope,sans-serif', fontSize:11, color:'#aaaaaa' }}>
              ({product.reviews})
            </span>
          </div>
        </div>

        {/* Name */}
        <h4 style={{ fontFamily:'"Noto Serif",Georgia,serif', fontSize:17, fontWeight:700, color:'#1a1a1a', marginBottom:6, lineHeight:1.3 }}>
          {product.name}
        </h4>

        {/* Desc */}
        <p style={{ fontFamily:'Manrope,sans-serif', fontSize:12, color:'#888888', lineHeight:1.7, marginBottom:14 }}
          className="line-clamp-2">
          {product.desc}
        </p>

        {/* Footer */}
        <div className="flex items-center gap-2">
          <span style={{ fontFamily:'"Noto Serif",serif', fontSize:20, fontWeight:700, color:'#1a1a1a', flex:1 }}>
            ₹{product.price.toLocaleString()}
          </span>

          {/* Quick view */}
          <button onClick={() => setQuickView(product.id)}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all ghost-border text-ink3 hover:text-brand hover:border-brand-border">
            <span className="material-symbols-outlined text-[16px]">visibility</span>
          </button>

          {/* Add to cart */}
          <button
            onClick={() => { addToCart(product, 1); showToast(`${product.name} added to cart 🍄`); }}
            className="w-9 h-9 rounded-full bg-brand text-white flex items-center justify-center hover:bg-brand-mid transition-all hover:scale-105"
            style={{ boxShadow:'0 4px 12px rgba(30,90,60,0.2)' }}>
            <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Products() {
  const [cat, setCat] = useState('All');
  const filtered = cat === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat);

  return (
    <section id="elixirs" className="py-24 bg-bg2">
      <div className="max-w-[1280px] mx-auto px-6 md:px-14">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.span initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
            style={{ fontFamily:'Manrope,sans-serif', fontSize:11, fontWeight:700, letterSpacing:'0.22em', textTransform:'uppercase', color:'#1e5a3c', display:'block', marginBottom:12 }}>
            The Elixir Collection
          </motion.span>
          <motion.h2 initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:.1 }}
            style={{ fontFamily:'"Noto Serif",Georgia,serif', fontWeight:700, color:'#1a1a1a', lineHeight:1.1 }}
            className="text-[clamp(32px,5vw,58px)]">
            Our <em style={{ fontStyle:'italic', color:'#1e5a3c' }}>Formulations</em>
          </motion.h2>
        </div>

        {/* Filter tabs */}
        <div className="flex justify-center gap-2 flex-wrap mb-12">
          {CATS.map(c => (
            <button key={c} onClick={() => setCat(c)}
              style={{
                fontFamily: 'Manrope,sans-serif',
                fontSize: 11, fontWeight: 700,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                padding: '8px 20px', borderRadius: 9999,
                transition: 'all 0.25s',
                background: cat === c ? '#1e5a3c' : 'white',
                color:      cat === c ? '#ffffff' : '#888888',
                border:     cat === c ? '1px solid #1e5a3c' : '1px solid rgba(0,0,0,0.1)',
                boxShadow:  cat === c ? '0 4px 14px rgba(30,90,60,0.2)' : 'none',
                cursor: 'pointer',
              }}>
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="wait">
            {filtered.map(p => <ProductCard key={p.id} product={p}/>)}
          </AnimatePresence>
        </div>

        {/* View all */}
        <div className="text-center mt-14">
          <button
            style={{
              fontFamily: 'Manrope,sans-serif', fontSize:13, fontWeight:600,
              letterSpacing:'0.1em', textTransform:'uppercase',
              padding:'13px 36px', borderRadius:9999,
              border:'1.5px solid rgba(30,90,60,0.3)',
              color:'#1e5a3c', background:'transparent',
              cursor:'pointer', transition:'all 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background='#1e5a3c'; e.currentTarget.style.color='#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#1e5a3c'; }}>
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
}

export { PRODUCTS };