import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import MatrixRain from '../effects/MatrixRain';
import config from '../config';

/**
 * HackScreen — Pantalla de hackeo cinematográfico
 * Muestra líneas de texto secuenciales con efecto typewriter
 * Reproduce audio, hace vibrar el dispositivo, efectos glitch/flash
 */
export default function HackScreen({ nombre, onDone }) {
  const [lines, setLines]         = useState([]); // líneas ya mostradas
  const [currentIdx, setCurrentIdx] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [progress, setProgress]   = useState(0);
  const [shaking, setShaking]     = useState(false);
  const flashRef  = useRef(null);
  const audioRef  = useRef(null);
  const containerRef = useRef(null);

  // Reemplaza {nombre} en los templates
  const resolvedLines = config.hackLines.map(l =>
    l.replace('{nombre}', nombre.toUpperCase())
  );

  // Iniciar audio
  useEffect(() => {
    const audio = new Audio(config.audioFile);
    audio.loop  = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    audio.play().catch(() => {
      // autoplay puede estar bloqueado — silenciamos el error
    });

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Typewriter secuencial
  useEffect(() => {
    if (currentIdx >= resolvedLines.length) {
      // Terminamos todas las líneas → esperar 1.5s y pasar
      const t = setTimeout(() => onDone(), 1500);
      return () => clearTimeout(t);
    }

    setCurrentText('');
    const text = resolvedLines[currentIdx];
    let i = 0;

    const interval = setInterval(() => {
      i++;
      setCurrentText(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);

        // Efectos especiales en la penúltima y última línea
        if (currentIdx === resolvedLines.length - 2) {
          triggerFlash('rgba(255,0,51,0.25)');
        }
        if (currentIdx === resolvedLines.length - 1) {
          triggerFlash('rgba(255,0,51,0.5)');
          triggerShake();
          triggerVibrate();
        }

        // Progreso
        setProgress(Math.round(((currentIdx + 1) / resolvedLines.length) * 100));

        // Mover a la siguiente línea
        const delay = currentIdx === resolvedLines.length - 1 ? 800 : 500;
        setTimeout(() => {
          setLines(prev => [...prev, { text, idx: currentIdx }]);
          setCurrentIdx(prev => prev + 1);
        }, delay);
      }
    }, 38);

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIdx]);

  function triggerFlash(color) {
    if (!flashRef.current) return;
    gsap.fromTo(flashRef.current,
      { opacity: 1, backgroundColor: color },
      { opacity: 0, duration: 0.6, ease: 'power2.out' }
    );
  }

  function triggerShake() {
    const el = containerRef.current;
    if (!el) return;
    setShaking(true);
    setTimeout(() => setShaking(false), 600);
  }

  function triggerVibrate() {
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200]);
    }
  }

  function getLineClass(idx) {
    const last = resolvedLines.length - 1;
    if (idx === last) return 'hack-line hack-line--danger';
    if (resolvedLines[idx].includes(nombre.toUpperCase())) return 'hack-line hack-line--user';
    return 'hack-line hack-line--active';
  }

  return (
    <div className="screen hack-screen" ref={containerRef}>
      <MatrixRain opacity={0.12} />
      <div className="scanlines" />

      {/* Overlay flash */}
      <div ref={flashRef} className="flash-overlay" />

      {/* Banner de alerta */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        style={{ textAlign: 'center', marginBottom: '16px' }}
      >
        <div className="alert-banner">🚨 ALERTA DE SEGURIDAD 🚨</div>
        <div style={{
          fontSize: '0.7rem', color: 'var(--red)',
          letterSpacing: '0.2em', marginTop: '4px',
          opacity: 0.7
        }}>
          BRECHA DETECTADA · PROTOCOLO OMEGA ACTIVADO
        </div>
      </motion.div>

      {/* Terminal de hackeo */}
      <div
        className={`hack-terminal ${shaking ? 'shake' : ''}`}
        style={{ transition: 'box-shadow 0.3s' }}
      >
        {/* Líneas ya escritas */}
        {lines.map((line) => (
          <div key={line.idx} className={getLineClass(line.idx)}>
            <span className="prefix">$</span>
            <span>{line.text}</span>
            <span style={{ color: 'var(--green-dim)', fontSize: '0.7rem' }}>✓</span>
          </div>
        ))}

        {/* Línea siendo escrita actualmente */}
        {currentIdx < resolvedLines.length && (
          <div className={
            currentIdx === resolvedLines.length - 1
              ? 'hack-line hack-line--danger'
              : 'hack-line hack-line--active'
          }>
            <span className="prefix">$</span>
            <span>{currentText}</span>
            <span className="blink" style={{ color: 'var(--green)' }}>█</span>
          </div>
        )}
      </div>

      {/* Barra de progreso */}
      <div className="progress-bar-wrap">
        <div className="progress-label">
          EXTRAYENDO DATOS... {progress}%
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}
