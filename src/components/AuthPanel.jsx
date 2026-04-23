import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/store';

export default function AuthPanel() {
  const { authOpen, authMode, setAuthOpen, login, registerUser, users, showToast } = useStore();
  const [mode, setMode] = useState(authMode);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [strength, setStrength] = useState(0);
  const [errors, setErrors] = useState({});

  const [lEmail, setLEmail] = useState('');
  const [lPass, setLPass] = useState('');
  const [sFirst, setSFirst] = useState('');
  const [sLast, setSLast] = useState('');
  const [sEmail, setSEmail] = useState('');
  const [sPass, setSPass] = useState('');
  const [sConf, setSConf] = useState('');

  const calcStrength = v => {
    let s = 0;
    if (v.length >= 6) s++;
    if (v.length >= 10) s++;
    if (/[A-Z]/.test(v)) s++;
    if (/[0-9]/.test(v)) s++;
    if (/[^A-Za-z0-9]/.test(v)) s++;
    setStrength(s);
  };

  const doLogin = () => {
    const e = {};
    if (!lEmail.includes('@')) e.lEmail = 'Valid email required';
    if (!lPass) e.lPass = 'Password required';
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const u = users.find(u => u.email === lEmail && u.password === btoa(lPass));
      if (!u) { setErrors({ lPass: 'Invalid email or password' }); return; }
      login(u); setAuthOpen(false); showToast(`Welcome back, ${u.firstName} 🍄`);
    }, 800);
  };

  const doSignup = () => {
    const e = {};
    if (!sFirst) e.sFirst = 'First name required';
    if (!sEmail.includes('@')) e.sEmail = 'Valid email required';
    if (sPass.length < 6) e.sPass = 'Min. 6 characters';
    if (sPass !== sConf) e.sConf = 'Passwords do not match';
    if (Object.keys(e).length) { setErrors(e); return; }
    if (users.find(u => u.email === sEmail)) { setErrors({ sEmail: 'Already registered' }); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const u = { id: Date.now(), firstName: sFirst, lastName: sLast, email: sEmail, password: btoa(sPass) };
      registerUser(u); setAuthOpen(false); showToast(`Welcome to Shrumei, ${sFirst} 🍄`);
    }, 900);
  };

  const strColors = ['', '#ef4444', '#f97316', '#eab308', '#22c55e', '#1e5a3c'];
  const strLabels = ['', 'Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];

  const inputStyle = (hasError) => ({
    width: '100%',
    padding: '11px 14px 11px 38px',
    border: `1px solid ${hasError ? '#ef4444' : 'rgba(0,0,0,0.12)'}`,
    borderRadius: 10,
    fontFamily: 'Manrope,sans-serif',
    fontSize: 14,
    color: '#1a1a1a',
    background: '#ffffff',
    outline: 'none',
    transition: 'border-color 0.2s',
  });

  return (
    <AnimatePresence>
      {authOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            onClick={() => setAuthOpen(false)}
            className="fixed inset-0 z-[1100]"
            style={{ background:'rgba(0,0,0,0.35)', backdropFilter:'blur(6px)' }}
          />

          {/* Panel */}
          <motion.div
            initial={{ x:'100%' }} animate={{ x:0 }} exit={{ x:'100%' }}
            transition={{ ease:[.16,1,.3,1], duration:.48 }}
            className="fixed top-0 right-0 w-full max-w-[440px] h-screen z-[1200] overflow-y-auto"
            style={{ background:'#ffffff', borderLeft:'1px solid rgba(0,0,0,0.08)', boxShadow:'-8px 0 40px rgba(0,0,0,0.1)' }}>

            <div className="p-10">

              {/* Close */}
              <button onClick={() => setAuthOpen(false)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center transition-all"
                style={{ border:'1px solid rgba(0,0,0,0.1)', color:'#888888', background:'white' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='#1e5a3c'; e.currentTarget.style.color='#1e5a3c'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(0,0,0,0.1)'; e.currentTarget.style.color='#888888'; }}>
                <span className="material-symbols-outlined text-[17px]">close</span>
              </button>

              {/* Logo */}
              <div style={{ fontFamily:'"Noto Serif",serif', fontSize:20, fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', color:'#1e5a3c', marginBottom:28 }}>
                🍄 SHRUMEI
              </div>

              {/* Tabs */}
              <div className="flex p-1 rounded-xl gap-1 mb-7"
                style={{ background:'#f7f6f3', border:'1px solid rgba(0,0,0,0.07)' }}>
                {['login', 'signup'].map(m => (
                  <button key={m} onClick={() => { setMode(m); setErrors({}); }}
                    className="flex-1 py-2.5 rounded-lg transition-all duration-300"
                    style={{
                      fontFamily:'Manrope,sans-serif', fontSize:13, fontWeight:700,
                      letterSpacing:'0.08em', textTransform:'capitalize',
                      background: mode === m ? '#ffffff' : 'transparent',
                      color: mode === m ? '#1e5a3c' : '#888888',
                      boxShadow: mode === m ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                      border: 'none', cursor:'pointer',
                    }}>
                    {m === 'login' ? 'Login' : 'Create Account'}
                  </button>
                ))}
              </div>

              {mode === 'login' ? (
                <div className="flex flex-col gap-5">
                  <div>
                    <h3 style={{ fontFamily:'"Noto Serif",serif', fontSize:24, fontWeight:700, color:'#1a1a1a', marginBottom:4 }}>Welcome back</h3>
                    <p style={{ fontFamily:'Manrope,sans-serif', fontSize:13, color:'#aaaaaa' }}>Sign in to your wellness account</p>
                  </div>
                  <Field label="Email" icon="mail" type="email" value={lEmail}
                    onChange={v => { setLEmail(v); setErrors({}); }} error={errors.lEmail}/>
                  <Field label="Password" icon="lock" type={showPass ? 'text' : 'password'} value={lPass}
                    onChange={v => { setLPass(v); setErrors({}); }} error={errors.lPass}
                    right={
                      <button type="button" onClick={() => setShowPass(!showPass)}
                        style={{ color:'#aaaaaa', background:'none', border:'none', cursor:'pointer' }}>
                        <span className="material-symbols-outlined text-[17px]">{showPass ? 'visibility_off' : 'visibility'}</span>
                      </button>
                    }/>
                  <button onClick={doLogin} disabled={loading}
                    className="w-full py-3.5 rounded-full flex items-center justify-center gap-2 transition-all"
                    style={{ background:'#1e5a3c', color:'#ffffff', fontFamily:'Manrope,sans-serif', fontSize:13, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', border:'none', cursor:'pointer', boxShadow:'0 4px 16px rgba(30,90,60,0.25)' }}>
                    {loading
                      ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                      : 'Login'}
                  </button>
                  <p style={{ textAlign:'center', fontFamily:'Manrope,sans-serif', fontSize:13, color:'#aaaaaa' }}>
                    New here?{' '}
                    <button onClick={() => setMode('signup')} style={{ color:'#1e5a3c', fontWeight:600, background:'none', border:'none', cursor:'pointer' }}>
                      Create an account
                    </button>
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  <div>
                    <h3 style={{ fontFamily:'"Noto Serif",serif', fontSize:24, fontWeight:700, color:'#1a1a1a', marginBottom:4 }}>Join Shrumei</h3>
                    <p style={{ fontFamily:'Manrope,sans-serif', fontSize:13, color:'#aaaaaa' }}>Create your wellness account</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="First Name" icon="person" type="text" value={sFirst}
                      onChange={v => { setSFirst(v); setErrors({}); }} error={errors.sFirst}/>
                    <Field label="Last Name" icon="person" type="text" value={sLast} onChange={setSLast}/>
                  </div>
                  <Field label="Email" icon="mail" type="email" value={sEmail}
                    onChange={v => { setSEmail(v); setErrors({}); }} error={errors.sEmail}/>
                  <div>
                    <Field label="Password" icon="lock" type={showPass ? 'text' : 'password'} value={sPass}
                      onChange={v => { setSPass(v); calcStrength(v); setErrors({}); }} error={errors.sPass}
                      right={
                        <button type="button" onClick={() => setShowPass(!showPass)}
                          style={{ color:'#aaaaaa', background:'none', border:'none', cursor:'pointer' }}>
                          <span className="material-symbols-outlined text-[17px]">{showPass ? 'visibility_off' : 'visibility'}</span>
                        </button>
                      }/>
                    {sPass && (
                      <div style={{ marginTop:6 }}>
                        <div style={{ height:3, background:'#f0f0f0', borderRadius:2, overflow:'hidden' }}>
                          <div style={{ height:'100%', width:`${strength * 20}%`, background: strColors[strength], borderRadius:2, transition:'all 0.3s' }}/>
                        </div>
                        <span style={{ fontFamily:'Manrope,sans-serif', fontSize:10, color: strColors[strength], marginTop:3, display:'block' }}>
                          {strLabels[strength]}
                        </span>
                      </div>
                    )}
                  </div>
                  <Field label="Confirm Password" icon="lock" type="password" value={sConf}
                    onChange={v => { setSConf(v); setErrors({}); }} error={errors.sConf}/>
                  <button onClick={doSignup} disabled={loading}
                    className="w-full py-3.5 rounded-full flex items-center justify-center gap-2 transition-all"
                    style={{ background:'#1e5a3c', color:'#ffffff', fontFamily:'Manrope,sans-serif', fontSize:13, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', border:'none', cursor:'pointer', boxShadow:'0 4px 16px rgba(30,90,60,0.25)' }}>
                    {loading
                      ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                      : 'Create Account'}
                  </button>
                  <p style={{ textAlign:'center', fontFamily:'Manrope,sans-serif', fontSize:13, color:'#aaaaaa' }}>
                    Already have an account?{' '}
                    <button onClick={() => setMode('login')} style={{ color:'#1e5a3c', fontWeight:600, background:'none', border:'none', cursor:'pointer' }}>
                      Login
                    </button>
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Field({ label, icon, type, value, onChange, error, right }) {
  return (
    <div>
      <label style={{ fontFamily:'Manrope,sans-serif', fontSize:10, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'#888888', display:'block', marginBottom:6 }}>
        {label}
      </label>
      <div style={{ position:'relative', display:'flex', alignItems:'center' }}>
        <span className="material-symbols-outlined text-[16px]"
          style={{ position:'absolute', left:12, color:'#aaaaaa', pointerEvents:'none', zIndex:1 }}>
          {icon}
        </span>
        <input type={type} value={value}
          onChange={e => onChange(e.target.value)}
          style={{
            width:'100%', padding:'11px 14px 11px 38px',
            border:`1px solid ${error ? '#ef4444' : 'rgba(0,0,0,0.12)'}`,
            borderRadius:10, fontFamily:'Manrope,sans-serif',
            fontSize:14, color:'#1a1a1a', background:'#ffffff',
            outline:'none', transition:'border-color 0.2s',
          }}
          onFocus={e => { if (!error) e.target.style.borderColor = '#1e5a3c'; }}
          onBlur={e => { if (!error) e.target.style.borderColor = 'rgba(0,0,0,0.12)'; }}
        />
        {right && <div style={{ position:'absolute', right:12 }}>{right}</div>}
      </div>
      {error && <p style={{ fontFamily:'Manrope,sans-serif', fontSize:11, color:'#ef4444', marginTop:4 }}>{error}</p>}
    </div>
  );
}