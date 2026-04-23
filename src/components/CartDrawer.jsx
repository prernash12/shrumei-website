import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/store';

export default function CartDrawer() {
  const { cartOpen, setCartOpen, cart, removeFromCart, getCartTotal, setAuthOpen, session, showToast } = useStore();
  const subtotal = getCartTotal();

  const checkout = () => {
    if (!session) { setCartOpen(false); setAuthOpen(true, 'login'); showToast('Please login to checkout 🔐'); return; }
    showToast('Processing your order... 🍄');
    setTimeout(() => setCartOpen(false), 1500);
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[1100]"
            style={{ background:'rgba(0,0,0,0.35)', backdropFilter:'blur(6px)' }}/>

          <motion.div initial={{ x:'100%' }} animate={{ x:0 }} exit={{ x:'100%' }}
            transition={{ ease:[.16,1,.3,1], duration:.45 }}
            className="fixed top-0 right-0 w-full max-w-[400px] h-screen z-[1200] flex flex-col"
            style={{ background:'#ffffff', borderLeft:'1px solid rgba(0,0,0,0.08)', boxShadow:'-8px 0 40px rgba(0,0,0,0.1)' }}>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom:'1px solid rgba(0,0,0,0.07)' }}>
              <h3 style={{ fontFamily:'"Noto Serif",serif', fontSize:20, fontWeight:700, color:'#1a1a1a', display:'flex', alignItems:'center', gap:8 }}>
                <span className="material-symbols-outlined text-[20px]" style={{ color:'#1e5a3c' }}>shopping_bag</span>
                Your Cart
              </h3>
              <button onClick={() => setCartOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                style={{ border:'1px solid rgba(0,0,0,0.1)', color:'#888888' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='#1e5a3c'; e.currentTarget.style.color='#1e5a3c'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(0,0,0,0.1)'; e.currentTarget.style.color='#888888'; }}>
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <span className="material-symbols-outlined text-[52px] block mb-4"
                    style={{ color:'#dddddd', fontVariationSettings:"'FILL' 1" }}>shopping_bag</span>
                  <p style={{ fontFamily:'"Noto Serif",serif', fontSize:18, color:'#aaaaaa', marginBottom:4 }}>Your cart is empty</p>
                  <span style={{ fontFamily:'Manrope,sans-serif', fontSize:13, color:'#cccccc' }}>Add some products to begin</span>
                </div>
              ) : (
                <div className="flex flex-col">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-3 py-4"
                      style={{ borderBottom:'1px solid rgba(0,0,0,0.06)' }}>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background:'#e8f5ee' }}>
                        <span className="material-symbols-outlined text-[22px]" style={{ color:'#1e5a3c', fontVariationSettings:"'FILL' 1" }}>
                          {item.icon}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 style={{ fontFamily:'"Noto Serif",serif', fontSize:14, fontWeight:700, color:'#1a1a1a', marginBottom:2 }}
                          className="truncate">{item.name}</h4>
                        <p style={{ fontFamily:'Manrope,sans-serif', fontSize:12, color:'#aaaaaa' }}>Qty: {item.qty}</p>
                      </div>
                      <span style={{ fontFamily:'"Noto Serif",serif', fontSize:16, fontWeight:700, color:'#1e5a3c', flexShrink:0 }}>
                        ₹{(item.price * item.qty).toLocaleString()}
                      </span>
                      <button onClick={() => removeFromCart(item.id)}
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                        style={{ border:'1px solid rgba(0,0,0,0.1)', color:'#cccccc' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor='#ef4444'; e.currentTarget.style.color='#ef4444'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(0,0,0,0.1)'; e.currentTarget.style.color='#cccccc'; }}>
                        <span className="material-symbols-outlined text-[13px]">close</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="px-6 pb-8 pt-4 flex flex-col gap-3"
                style={{ borderTop:'1px solid rgba(0,0,0,0.07)' }}>
                <div className="flex justify-between items-center">
                  <span style={{ fontFamily:'Manrope,sans-serif', fontSize:13, color:'#888888' }}>Subtotal</span>
                  <span style={{ fontFamily:'"Noto Serif",serif', fontSize:20, fontWeight:700, color:'#1a1a1a' }}>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span style={{ fontFamily:'Manrope,sans-serif', fontSize:13, color:'#888888' }}>Shipping</span>
                  <span style={{ fontFamily:'Manrope,sans-serif', fontSize:13, color: subtotal >= 999 ? '#1e5a3c' : '#1a1a1a', fontWeight:600 }}>
                    {subtotal >= 999 ? 'Free' : '₹99'}
                  </span>
                </div>
                <button onClick={checkout}
                  className="w-full py-4 rounded-full flex items-center justify-center gap-2 transition-all mt-1"
                  style={{ background:'#1e5a3c', color:'#ffffff', fontFamily:'Manrope,sans-serif', fontSize:13, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', border:'none', cursor:'pointer', boxShadow:'0 4px 16px rgba(30,90,60,0.25)' }}>
                  <span className="material-symbols-outlined text-[16px]">lock</span>
                  Checkout
                </button>
                <button onClick={() => setCartOpen(false)}
                  className="w-full py-3 rounded-full transition-all"
                  style={{ background:'transparent', color:'#888888', fontFamily:'Manrope,sans-serif', fontSize:13, border:'1px solid rgba(0,0,0,0.1)', cursor:'pointer' }}>
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}