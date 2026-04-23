import { motion } from 'framer-motion';
import Bottle3D from './Bottle3D';
import { useStore } from '../store/store';

export default function SignatureProduct() {
  const { addToCart, showToast } = useStore();
  const product = { id:99, name:'The Signature Tincture', price:8499, cat:'Ritual', icon:'science', desc:'Our flagship adaptogenic elixir.', batch:'0042', rating:5, reviews:312 };

  return (
    <section className="py-28 bg-surface-container-lowest overflow-hidden relative">
      {/* Background atmosphere */}
      <div className="absolute inset-0 glow-radial opacity-30 pointer-events-none"/>

      <div className="max-w-[1280px] mx-auto px-6 md:px-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Left — 3D bottle */}
          <motion.div initial={{opacity:0,x:-50}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:1,ease:[.16,1,.3,1]}}>
            <Bottle3D height={500} autoRotate={true} interactive={true}/>
          </motion.div>

          {/* Right — product info */}
          <motion.div initial={{opacity:0,x:50}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:1,ease:[.16,1,.3,1]}}
            className="flex flex-col gap-7">
            <div>
              <span className="font-label text-[10px] tracking-[.3em] uppercase text-primary-container font-bold block mb-3">Signature Collection</span>
              <h2 className="font-headline text-[clamp(36px,5vw,64px)] text-primary font-bold italic leading-[1.05] mb-2">The Signature<br/>Tincture</h2>
              <p className="font-label text-[10px] tracking-[.2em] uppercase text-on-surface-variant/50">Batch No. 0042 — Shadow Harvest</p>
            </div>

            <p className="font-body text-[16px] text-on-surface-variant font-light leading-[1.85]">
              Our most potent formulation. A concentrated full-spectrum extract combining Cordyceps militaris, Lion's Mane, and Reishi in a bioavailable liquid tincture. 50ml of pure fungal intelligence.
            </p>

            {/* Ingredients */}
            <div className="flex flex-wrap gap-2">
              {['Cordyceps Militaris','Lions Mane','Reishi','Chaga','Turkey Tail'].map(ing => (
                <span key={ing} className="font-label text-[10px] tracking-[.08em] px-3 py-1.5 rounded-full ghost-border text-on-surface-variant/70 hover:text-primary-container hover:border-primary-container/30 transition-all">
                  {ing}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 py-6" style={{borderTop:'1px solid rgba(59,75,55,0.2)',borderBottom:'1px solid rgba(59,75,55,0.2)'}}>
              {[['50ml','Per Ritual'],['5x','Concentrated'],['30','Day Supply']].map(([n,l]) => (
                <div key={l} className="text-center">
                  <span className="font-headline text-[28px] text-primary-container font-bold block" style={{textShadow:'0 0 16px rgba(0,255,65,.4)'}}>{n}</span>
                  <span className="font-label text-[9px] tracking-[.14em] uppercase text-on-surface-variant/50">{l}</span>
                </div>
              ))}
            </div>

            {/* Price + CTA */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="font-headline text-[38px] text-primary-container font-bold" style={{textShadow:'0 0 20px rgba(0,255,65,.35)'}}>₹8,499</span>
                <p className="font-label text-[9px] tracking-widest uppercase text-on-surface-variant/50">Single 50ml Ritual</p>
              </div>
              <button onClick={() => { addToCart(product,1); showToast('Signature Tincture added to your ritual 🍄'); }}
                className="pulse-btn bg-surface-container-highest rounded-full p-4 ghost-border hover:bg-primary-container hover:text-on-primary transition-all duration-400 hover:shadow-[0_0_24px_rgba(0,255,65,.4)] group">
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-on-primary text-2xl">add_shopping_cart</span>
              </button>
            </div>

            {/* Review quote */}
            <div className="bg-surface-container p-5 rounded-xl relative overflow-hidden">
              <span className="absolute top-2 right-3 font-headline text-[80px] text-primary-container/5 leading-none">"</span>
              <p className="font-headline text-[15px] text-primary italic leading-relaxed">
                "A quantum leap in adaptogenic science. The cognitive clarity is unparalleled."
              </p>
              <div className="flex items-center gap-3 mt-3">
                <div className="w-6 h-px bg-primary-container"/>
                <span className="font-label text-[9px] tracking-[.2em] uppercase text-on-surface-variant/50">Global Biotech Journal</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
