import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/store';
import Bottle3D from './Bottle3D';

const PRODUCTS_DATA = {
  1: { name:'Myco Protein Powder',    price:1299, cat:'Nutrition',     icon:'fitness_center', desc:'Complete amino profile from Shiitake & Reishi. 28g protein per serving, BCAA-rich, gut-friendly and completely plant-based. Certified GMP.', ingredients:['Shiitake Extract','Reishi Powder','Pea Protein','Cordyceps','Ashwagandha','Black Pepper'], batch:'0042-A', rating:5, reviews:248 },
  2: { name:'Immunity Shield',        price:999,  cat:'Nutraceutical', icon:'shield',         desc:'Beta-glucan enriched formula for superior immune modulation. 60 capsules, 500mg per serving. Clinically dosed and third-party verified.', ingredients:['Beta-Glucan 1,3/1,6','Turkey Tail','Chaga','Vitamin D3','Zinc','Elderberry'], batch:'0038-B', rating:5, reviews:182 },
  3: { name:'Fungi Glow Serum',       price:1499, cat:'Cosmetics',     icon:'spa',            desc:'Tremella mushroom holds 400x its weight in water. Ergothioneine antioxidant defence. Visibly brighter skin in 14 days guaranteed.', ingredients:['Tremella Fuciformis','Ergothioneine','Snow Mushroom','Hyaluronic Acid','Niacinamide','Bakuchiol'], batch:'0051-C', rating:5, reviews:316 },
  4: { name:'Reishi Calm Tea',        price:599,  cat:'Teas',          icon:'local_cafe',     desc:'Adaptogenic Reishi blend scientifically formulated for deep relaxation and sleep. 30 premium tea bags. No melatonin, no synthetic additives.', ingredients:["Reishi Extract","Lion's Mane",'Chamomile','L-Theanine','Ashwagandha Root','Passionflower'], batch:'0039-D', rating:4, reviews:94  },
  5: { name:'Cordyceps Energy Boost', price:1199, cat:'Nutraceutical', icon:'bolt',           desc:'Pure Cordyceps militaris extract. Clinically proven +18% VO2 max improvement. 1000mg per capsule. Athletes and high performers only.', ingredients:['Cordyceps Militaris','Cordycepin','Adenosine','CoQ10','B12','Black Pepper'], batch:'0044-E', rating:5, reviews:207 },
  6: { name:'Mushroom Face Mask',     price:799,  cat:'Cosmetics',     icon:'face',           desc:'Chaga + Snow Mushroom clay mask for deep pore refinement, brightening, and the signature bioluminescent glow. 100g, all skin types.', ingredients:['Chaga Extract','Snow Mushroom','Kaolin Clay','Kojic Acid','Vitamin C','Niacinamide'], batch:'0047-F', rating:4, reviews:128 },
};

export default function QuickView() {
  const { quickViewId, setQuickView, addToCart, setAuthOpen, session, showToast } = useStore();
  const [qty, setQty] = useState(1);
  const product = PRODUCTS_DATA[quickViewId];

  if (!product) return null;

  const handleBuy = () => {
    if (!session) { setQuickView(null); setAuthOpen(true,'login'); showToast('Please login first 🔐'); return; }
    addToCart({...product, id:quickViewId}, qty);
    showToast(`${product.name} added to ritual 🍄`);
    setQuickView(null);
  };

  return (
    <AnimatePresence>
      {quickViewId && (
        <>
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            onClick={() => setQuickView(null)}
            className="fixed inset-0 z-[1200]"
            style={{background:'rgba(13,15,13,0.85)', backdropFilter:'blur(16px)'}}/>

          <motion.div
            initial={{opacity:0, scale:.94, y:24}}
            animate={{opacity:1, scale:1, y:0}}
            exit={{opacity:0, scale:.94, y:24}}
            transition={{ease:[.16,1,.3,1], duration:.45}}
            className="fixed inset-0 z-[1300] flex items-center justify-center p-5"
          >
            <div className="w-full max-w-[900px] max-h-[90vh] overflow-y-auto rounded-2xl grid grid-cols-1 md:grid-cols-2 relative shadow-[0_0_80px_rgba(0,255,65,0.08)]"
              style={{background:'#1a1c1a', border:'1px solid rgba(59,75,55,0.3)'}}>

              {/* Close */}
              <button onClick={() => setQuickView(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full ghost-border flex items-center justify-center text-on-surface-variant hover:text-primary-container transition-all">
                <span className="material-symbols-outlined text-[17px]">close</span>
              </button>

              {/* Left — 3D visual */}
              <div className="flex items-center justify-center p-8 min-h-[320px] relative"
                style={{background:'#0d0f0d', borderRadius:'inherit'}}>
                <div className="absolute inset-0 glow-radial opacity-40 rounded-2xl pointer-events-none"/>
                <Bottle3D height={300} autoRotate={true}/>
              </div>

              {/* Right — Info */}
              <div className="p-8 md:p-10 flex flex-col gap-5">
                <div>
                  <span className="font-label text-[9px] tracking-[.2em] uppercase text-primary-container/70 font-bold border border-primary-container/20 px-2.5 py-1 rounded-full inline-block mb-3">{product.cat}</span>
                  <h2 className="font-headline text-[clamp(22px,3vw,30px)] text-primary font-bold mb-1">{product.name}</h2>
                  <p className="font-label text-[10px] tracking-[.15em] uppercase text-on-surface-variant/40">Batch {product.batch}</p>
                </div>

                <div className="text-primary-container/70 text-[13px]">
                  {'★'.repeat(product.rating)}{'☆'.repeat(5-product.rating)}
                  <span className="text-on-surface-variant/40 ml-1 text-[11px]">({product.reviews} verified reviews)</span>
                </div>

                <p className="font-body text-[14px] text-on-surface-variant font-light leading-[1.75]">{product.desc}</p>

                {/* Ingredients */}
                <div>
                  <p className="font-label text-[10px] tracking-[.15em] uppercase text-on-surface-variant/40 font-bold mb-2.5">Key Compounds</p>
                  <div className="flex flex-wrap gap-2">
                    {product.ingredients.map(ing => (
                      <span key={ing} className="font-label text-[10px] tracking-[.06em] px-2.5 py-1 rounded-full ghost-border text-on-surface-variant/60 hover:text-primary-container hover:border-primary-container/30 transition-all">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price + Qty */}
                <div className="flex items-center justify-between py-4" style={{borderTop:'1px solid rgba(59,75,55,0.2)', borderBottom:'1px solid rgba(59,75,55,0.2)'}}>
                  <span className="font-headline text-[32px] text-primary-container font-bold" style={{textShadow:'0 0 16px rgba(0,255,65,.3)'}}>
                    ₹{product.price.toLocaleString()}
                  </span>
                  <div className="flex items-center ghost-border rounded-full overflow-hidden">
                    <button onClick={() => setQty(Math.max(1,qty-1))} className="w-10 h-10 flex items-center justify-center text-[18px] text-on-surface-variant hover:text-primary-container transition-colors">−</button>
                    <span className="px-4 font-body text-[15px] font-semibold text-primary">{qty}</span>
                    <button onClick={() => setQty(qty+1)} className="w-10 h-10 flex items-center justify-center text-[18px] text-on-surface-variant hover:text-primary-container transition-colors">+</button>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex gap-3">
                  <button onClick={() => { addToCart({...product, id:quickViewId}, qty); showToast(`${product.name} added 🍄`); setQuickView(null); }}
                    className="pulse-btn flex-1 py-3.5 bg-primary-container text-on-primary rounded-full font-label font-bold text-[10px] tracking-[.15em] uppercase flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(0,255,65,.4)] transition-all">
                    <span className="material-symbols-outlined text-sm">add_shopping_cart</span> Add to Ritual
                  </button>
                  <button onClick={handleBuy}
                    className="flex-1 py-3.5 ghost-border rounded-full font-label font-medium text-[10px] tracking-[.15em] uppercase text-on-surface-variant hover:text-primary-container hover:border-primary-container/30 flex items-center justify-center gap-2 transition-all">
                    <span className="material-symbols-outlined text-sm">bolt</span> Buy Now
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
