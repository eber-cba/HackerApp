import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import InputScreen      from './components/InputScreen';
import HackScreen       from './components/HackScreen';
import TransitionScreen from './components/TransitionScreen';
import FinalScreen      from './components/FinalScreen';
import './index.css';

// Pantallas posibles
const SCREENS = {
  LOADING:    'loading',
  INPUT:      'input',
  HACK:       'hack',
  TRANSITION: 'transition',
  FINAL:      'final',
};

// Variantes de transición entre pantallas
const pageVariants = {
  initial:  { opacity: 0, filter: 'blur(8px)' },
  animate:  { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.5 } },
  exit:     { opacity: 0, filter: 'blur(8px)', transition: { duration: 0.35 } },
};

export default function App() {
  const [screen, setScreen] = useState(SCREENS.LOADING);
  const [nombre, setNombre] = useState('');

  // Cursor personalizado
  const cursorRef = useRef(null);
  const ringRef   = useRef(null);
  const mousePos  = useRef({ x: -100, y: -100 });
  const ringPos   = useRef({ x: -100, y: -100 });
  const rafRef    = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
      }
    };

    // El ring sigue con suavidad (lerp)
    const animateRing = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ringPos.current.x - 10}px, ${ringPos.current.y - 10}px)`;
      }
      rafRef.current = requestAnimationFrame(animateRing);
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    rafRef.current = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Pantalla de carga inicial
  useEffect(() => {
    const t = setTimeout(() => setScreen(SCREENS.INPUT), 2000);
    return () => clearTimeout(t);
  }, []);

  const handleInput   = useCallback((n) => { setNombre(n); setScreen(SCREENS.HACK); }, []);
  const handleHackDone= useCallback(() => setScreen(SCREENS.TRANSITION), []);
  const handleTransDone=useCallback(() => setScreen(SCREENS.FINAL), []);

  return (
    <>
      {/* ── Cursor hacker ── */}
      <div ref={cursorRef} className="custom-cursor" style={{ position: 'fixed', zIndex: 9999, pointerEvents: 'none' }}>
        <div className="cursor-dot" />
      </div>
      <div ref={ringRef} className="custom-cursor" style={{ position: 'fixed', zIndex: 9998, pointerEvents: 'none' }}>
        <div className="cursor-ring" />
      </div>

      {/* ── Pantalla de carga ── */}
      <AnimatePresence>
        {screen === SCREENS.LOADING && (
          <motion.div
            key="loading"
            className="loading-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(12px)' }}
            transition={{ duration: 0.6 }}
          >
            <div className="loading-text blink">INICIALIZANDO...</div>
            <div className="loading-bar">
              <div className="loading-bar-fill" />
            </div>
            <div style={{
              marginTop: '16px', fontSize: '0.65rem',
              color: 'var(--text-dim)', letterSpacing: '0.15em'
            }}>
              G109_SYSTEM v2.0 · CARGANDO MÓDULOS
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Pantallas principales ── */}
      <AnimatePresence mode="wait">
        {screen === SCREENS.INPUT && (
          <motion.div key="input" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <InputScreen onSubmit={handleInput} />
          </motion.div>
        )}

        {screen === SCREENS.HACK && (
          <motion.div key="hack" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <HackScreen nombre={nombre} onDone={handleHackDone} />
          </motion.div>
        )}

        {screen === SCREENS.TRANSITION && (
          <motion.div key="transition" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <TransitionScreen onDone={handleTransDone} />
          </motion.div>
        )}

        {screen === SCREENS.FINAL && (
          <motion.div key="final" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <FinalScreen nombre={nombre} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
