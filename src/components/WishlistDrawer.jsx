import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/store';

export default function WishlistDrawer() {
  const { wishlistOpen, setWishlistOpen, wishlist, toggleWishlist, addToCart, showToast } = useStore();

  return (
    <AnimatePresence>
      {wishlistOpen && (
        <>
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            onClick={() => setWishlistOpen(false)}
            className="fixed inset-0 z-[1100]"
            style={{background:'rgba(13,15,13,0.75)', backdropFilter:'blur(10px)'}}/>

          <motion.div initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}}
            transition={{ease:[.16,1,.3,1], duration:.45}}
            className="fixed top-0 right-0 w-full max-w-[400px] h-screen z-[1200] flex flex-col"
            style={{background:'#121412', borderLeft:'1px solid rgba(59,75,55,0.25)'}}>

            <div className="flex items-center justify-between px-6 py-5" style={{borderBottom:'1px solid rgba(59,75,55,0.2)'}}>
              <h3 className="font-headline text-[20px] text-primary font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-container text-[20px]" style={{fontVariationSettings:"'FILL' 1"}}>favorite</span>
                Saved Rituals
              </h3>
              <button onClick={() => setWishlistOpen(false)}
                className="w-8 h-8 rounded-full ghost-border flex items-center justify-center text-on-surface-variant hover:text-primary-container transition-all">
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {wishlist.length === 0 ? (
                <div className="text-center py-20">
                  <span className="material-symbols-outlined text-[60px] text-on-surface-variant/20 block mb-4" style={{fontVariationSettings:"'FILL' 1"}}>favorite</span>
                  <p className="font-headline text-[18px] text-on-surface-variant/40 mb-2">Nothing saved yet</p>
                  <span className="font-body text-[13px] text-on-surface-variant/30">Heart a product to save it here</span>
                </div>
              ) : (
                <div className="flex flex-col gap-1">
                  {wishlist.map(item => (
                    <div key={item.id} className="flex items-center gap-3 py-4" style={{borderBottom:'1px solid rgba(59,75,55,0.15)'}}>
                      <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-primary-container text-[22px]" style={{fontVariationSettings:"'FILL' 1"}}>{item.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-headline text-[14px] text-primary font-bold truncate">{item.name}</h4>
                        <span className="font-headline text-[16px] text-primary-container font-bold">₹{item.price.toLocaleString()}</span>
                      </div>
                      <button onClick={() => { addToCart(item,1); showToast(`${item.name} added 🍄`); }}
                        className="w-9 h-9 bg-primary-container text-on-primary rounded-full flex items-center justify-center hover:scale-110 hover:shadow-[0_0_14px_rgba(0,255,65,.4)] transition-all flex-shrink-0">
                        <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                      </button>
                      <button onClick={() => toggleWishlist(item)}
                        className="w-7 h-7 rounded-full ghost-border flex items-center justify-center text-on-surface-variant/40 hover:text-error transition-all flex-shrink-0">
                        <span className="material-symbols-outlined text-[13px]">close</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
