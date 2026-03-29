import { useState, useEffect, useRef } from 'react';

/**
 * useTypewriter — Hook reutilizable de efecto máquina de escribir
 * @param {string} text      — Texto a escribir
 * @param {number} speed     — ms por carácter (default 40)
 * @param {number} delay     — ms antes de empezar (default 0)
 * @param {function} onDone  — callback al finalizar
 * @param {boolean} active   — si false no escribe
 */
export function useTypewriter({ text = '', speed = 40, delay = 0, onDone, active = true }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const onDoneRef = useRef(onDone);

  useEffect(() => { onDoneRef.current = onDone; }, [onDone]);

  useEffect(() => {
    if (!active) { setDisplayed(''); setDone(false); return; }

    setDisplayed('');
    setDone(false);

    let i = 0;
    let timeoutId;
    let intervalId;

    timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(intervalId);
          setDone(true);
          onDoneRef.current?.();
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, speed, delay, active]);

  return { displayed, done };
}
