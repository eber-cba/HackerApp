import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import MatrixRain from '../effects/MatrixRain';
import config from '../config';

const { finalScreen: fs } = config;

/**
 * FinalScreen — Mensaje amigable para estudiantes
 * Animaciones suaves, lista de temas escalonada, botón de video
 */
export default function FinalScreen({ nombre }) {
  const cardRef = useRef(null);

  const greeting = fs.greeting.replace('{nombre}', nombre);

  useEffect(() => {
    // Animación GSAP de entrada de la card
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 50, filter: 'blur(8px)' },
      { opacity: 1, y: 0,  filter: 'blur(0px)', duration: 0.9, ease: 'power3.out' }
    );
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden:  { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  return (
    <div className="screen final-screen">
      <MatrixRain opacity={0.06} />
      <div className="scanlines" />

      {/* Partícula decorativa superior */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'absolute', top: '30px',
          fontSize: '0.7rem', color: 'var(--green-dim)',
          letterSpacing: '0.2em'
        }}
      >
        ■ ACCESO CONCEDIDO ■
      </motion.div>

      {/* Card principal */}
      <div ref={cardRef} className="final-card">

        {/* Saludo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="final-greeting glow">{greeting}</div>
          <div className="final-intro">{fs.intro}</div>
        </motion.div>

        <div style={{
          width: '100%', height: '1px',
          background: 'linear-gradient(90deg, var(--green) 0%, transparent 100%)',
          margin: '20px 0'
        }} />

        {/* Info de reunión */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <p className="final-section-label">📅 PRÓXIMA CLASE</p>
          <div className="final-meeting">{fs.meetingInfo}</div>
        </motion.div>

        {/* Temas */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="final-section-label">💻 CONTENIDO</p>
          <p style={{
            fontSize: '0.85rem', color: 'var(--text)',
            marginBottom: '10px'
          }}>
            {fs.classTitle}
          </p>

          <motion.ul
            className="final-topics"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {fs.topics.map((topic, i) => (
              <motion.li key={i} variants={itemVariants}>
                {topic}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Botón de video */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          <p className="final-section-label">🎬 MATERIAL</p>
          <p className="video-label">{fs.videoLabel}</p>
          <motion.a
            href={fs.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-video"
            id="btn-video"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>▶</span>
            <span>{fs.videoBtnText}</span>
          </motion.a>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          style={{
            marginTop: '24px',
            textAlign: 'center',
            fontSize: '0.65rem',
            color: 'var(--text-dim)',
            letterSpacing: '0.12em'
          }}
        >
          // hasta el martes 🖥️ · G109 · {new Date().getFullYear()}
        </motion.div>
      </div>
    </div>
  );
}
