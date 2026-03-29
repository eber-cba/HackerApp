import { useEffect, useRef } from 'react';

/**
 * MatrixRain — Canvas effect con caracteres cayendo estilo Matrix real
 * Incluye katakana, kanji, números y ascii para máxima autenticidad
 */

const CHARS =
  'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン' +
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()[]{}|;:<>?/\\~`' +
  '日月火水木金土年人口大中小上下左右手足目耳口鼻';

export default function MatrixRain({ opacity = 0.18 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const FONT_SIZE = 14;
    let columns, drops, animId;

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / FONT_SIZE);
      drops   = new Array(columns).fill(1).map(() => Math.random() * -50);
    }

    resize();
    window.addEventListener('resize', resize);

    let lastTime = 0;
    const FPS_LIMIT = 30; // rendimiento optimizado

    function draw(timestamp) {
      animId = requestAnimationFrame(draw);

      if (timestamp - lastTime < 1000 / FPS_LIMIT) return;
      lastTime = timestamp;

      // Trail — efecto estela
      ctx.fillStyle = 'rgba(5, 5, 5, 0.07)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const y = drops[i] * FONT_SIZE;

        // Cabeza brillante (blanco-verde)
        const isHead = drops[i] === Math.floor(drops[i]);
        if (isHead) {
          ctx.fillStyle = '#ccffcc';
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#00ff41';
        } else {
          // Variación de brillo: más brillante cerca de la cabeza
          const brightness = Math.random() > 0.9 ? '88' : '44';
          ctx.fillStyle = `#00ff41${brightness}`;
          ctx.shadowBlur = 0;
        }

        ctx.font = `${FONT_SIZE}px 'Share Tech Mono', monospace`;
        ctx.fillText(char, i * FONT_SIZE, y);

        // Reset drop cuando sale de la pantalla
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i] += 0.5 + Math.random() * 0.5; // velocidad variable
      }
    }

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="matrix-canvas"
      style={{ opacity }}
      aria-hidden="true"
    />
  );
}
