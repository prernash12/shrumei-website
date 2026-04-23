import { AnimatePresence, motion } from 'framer-motion';
import { useStore } from '../store/store';

export default function Toast() {
  const toast = useStore(s => s.toast);
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity:0, y:40, x:'-50%' }}
          animate={{ opacity:1, y:0, x:'-50%' }}
          exit={{ opacity:0, y:40, x:'-50%' }}
          transition={{ ease:[.16,1,.3,1], duration:.4 }}
          className="fixed bottom-8 left-1/2 z-[9999] whitespace-nowrap"
          style={{
            background: '#1e5a3c',
            color: '#ffffff',
            padding: '12px 24px',
            borderRadius: 9999,
            fontFamily: 'Manrope,sans-serif',
            fontSize: 13,
            fontWeight: 600,
            boxShadow: '0 8px 32px rgba(30,90,60,0.3)',
            letterSpacing: '0.02em',
          }}>
          {toast}
        </motion.div>
      )}
    </AnimatePresence>
  );
}