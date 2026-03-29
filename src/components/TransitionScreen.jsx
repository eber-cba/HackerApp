import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import MatrixRain from '../effects/MatrixRain';
import config from '../config';

/**
 * TransitionScreen — Pausa dramática → "Nah mentira"
 * 1. Muestra "..." parpadeando (~1.5s)
 * 2. Aparece el texto de transición
 * 3. Llama a onDone() después de la animación
 */
export default function TransitionScreen({ onDone }) {
  const [phase, setPhase] = useState(0); // 0: "...", 1: "Nah"
  const dotsRef  = useRef(null);
  const nahRef   = useRef(null);

  useEffect(() => {
    // Fase 0 → mostrar "..." durante 1.8s
    const t1 = setTimeout(() => setPhase(1), 1800);
    // Fase 1 → mostrar Nah durante 1.5s y pasar
    const t2 = setTimeout(() => onDone(), 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div className="screen transition-screen">
      <MatrixRain opacity={0.08} />
      <div className="scanlines" />

      {/* Dots */}
      <motion.div
        ref={dotsRef}
        className="transition-text glow"
        animate={{
          opacity: phase === 0 ? [1, 0, 1, 0, 1] : 0,
        }}
        transition={{
          duration: phase === 0 ? 1.5 : 0.3,
          ease: 'easeOut',
        }}
      >
        {config.transitionLines[0]}
      </motion.div>

      {/* Nah mentira */}
      {phase === 1 && (
        <motion.div
          ref={nahRef}
          initial={{ opacity: 0, scale: 0.6, filter: 'blur(20px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.6, ease: 'backOut' }}
          style={{ textAlign: 'center' }}
        >
          <div className="transition-nah" style={{
            fontFamily: 'var(--font-vt)',
            fontSize: 'clamp(2.5rem, 10vw, 5rem)',
            color: 'var(--green)',
            textShadow: '0 0 20px var(--green), 0 0 60px var(--green-dim)',
          }}>
            {config.transitionLines[1]}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              fontSize: '0.8rem',
              color: 'var(--text-dim)',
              letterSpacing: '0.15em',
              marginTop: '12px',
            }}
          >
            cargando mensaje real...
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
