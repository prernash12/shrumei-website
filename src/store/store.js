import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set, get) => ({
      // Cart
      cart: [],
      addToCart: (product, qty = 1) => {
        const cart = get().cart;
        const existing = cart.find(x => x.id === product.id);
        if (existing) {
          set({ cart: cart.map(x => x.id === product.id ? { ...x, qty: x.qty + qty } : x) });
        } else {
          set({ cart: [...cart, { ...product, qty }] });
        }
      },
      removeFromCart: (id) => set({ cart: get().cart.filter(x => x.id !== id) }),
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => get().cart.reduce((s, x) => s + x.price * x.qty, 0),
      getCartCount: () => get().cart.reduce((s, x) => s + x.qty, 0),

      // Wishlist
      wishlist: [],
      toggleWishlist: (product) => {
        const wl = get().wishlist;
        const exists = wl.find(x => x.id === product.id);
        set({ wishlist: exists ? wl.filter(x => x.id !== product.id) : [...wl, product] });
        return !exists;
      },
      isWishlisted: (id) => get().wishlist.some(x => x.id === id),

      // Auth
      session: null,
      users: [],
      login: (user) => set({ session: user }),
      logout: () => set({ session: null }),
      registerUser: (user) => {
        set({ users: [...get().users, user], session: user });
      },

      // UI state
      cartOpen:      false,
      wishlistOpen:  false,
      authOpen:      false,
      authMode:      'login',
      quickViewId:   null,
      aiOpen:        false,
      setCartOpen:     (v) => set({ cartOpen: v }),
      setWishlistOpen: (v) => set({ wishlistOpen: v }),
      setAuthOpen:     (v, mode = 'login') => set({ authOpen: v, authMode: mode }),
      setQuickView:    (id) => set({ quickViewId: id }),
      setAiOpen:       (v) => set({ aiOpen: v }),

      // Toast
      toast: null,
      showToast: (msg) => {
        set({ toast: msg });
        setTimeout(() => set({ toast: null }), 3200);
      },
    }),
    {
      name: 'shrumei-store',
      partialize: (s) => ({
        cart: s.cart, wishlist: s.wishlist,
        session: s.session, users: s.users
      }),
    }
  )
);
