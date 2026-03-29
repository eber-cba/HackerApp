import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import MatrixRain from '../effects/MatrixRain';
import config from '../config';

export default function InputScreen({ onSubmit }) {
  const cardRef    = useRef(null);
  const titleRef   = useRef(null);
  const inputRef   = useRef(null);

  useEffect(() => {
    // Animación de entrada con GSAP
    const tl = gsap.timeline();
    tl.fromTo(titleRef.current,
      { opacity: 0, y: -40, filter: 'blur(10px)' },
      { opacity: 1, y: 0,  filter: 'blur(0px)', duration: 1, ease: 'power3.out' }
    )
    .fromTo(cardRef.current,
      { opacity: 0, y: 30, scale: 0.96 },
      { opacity: 1, y: 0,  scale: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    );

    // Focus automático
    setTimeout(() => inputRef.current?.focus(), 800);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const nombre = inputRef.current?.value?.trim();
    if (nombre) onSubmit(nombre);
  }

  return (
    <div className="screen">
      <MatrixRain opacity={0.18} />
      <div className="scanlines" />

      {/* Logo / Título de bienvenida */}
      <div ref={titleRef} style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div
          className="glitch glow input-screen__logo"
          data-text={config.welcomeTitle}
        >
          {config.welcomeTitle}
        </div>
        <div className="input-screen__subtitle">{config.welcomeSubtitle}</div>
      </div>

      {/* Tarjeta terminal */}
      <motion.div
        ref={cardRef}
        className="terminal-card"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Barra de botones del terminal */}
        <div className="terminal-card__header">
          <span className="terminal-card__dot dot--red" />
          <span className="terminal-card__dot dot--yellow" />
          <span className="terminal-card__dot dot--green" />
          <span className="terminal-card__title">secure_login.sh</span>
        </div>

        <p className="input-label">
          <span style={{ color: 'var(--green)' }}>root@g109</span>
          <span style={{ color: 'var(--text-dim)' }}>:~$</span>
          &nbsp;identify_user
        </p>

        {/* Input */}
        <form onSubmit={handleSubmit} style={{ marginTop: '12px' }}>
          <div className="terminal-input-wrap">
            <span className="terminal-prompt">/&gt;</span>
            <input
              ref={inputRef}
              id="nombre-input"
              type="text"
              className="terminal-input"
              placeholder={config.inputPlaceholder}
              maxLength={40}
              autoComplete="off"
              spellCheck={false}
            />
          </div>

          <motion.button
            type="submit"
            id="btn-acceder"
            className="btn-access"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            [ ACCEDER ]
          </motion.button>
        </form>

        {/* Badge de seguridad */}
        <div className="security-badge">
          <span className="blink" style={{ color: 'var(--green)' }}>●</span>
          <span>CONEXIÓN SEGURA · AES-256 · v2.0</span>
        </div>
      </motion.div>

      {/* Versión / pie */}
      <div style={{
        position: 'absolute', bottom: '20px',
        fontSize: '0.65rem', color: 'var(--text-dim)',
        letterSpacing: '0.15em'
      }}>
        SYS_BUILD 20261337 · {new Date().toLocaleDateString('es-CL')}
      </div>
    </div>
  );
}
