/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║        ARCHIVO DE CONFIGURACIÓN — EDITAR AQUÍ           ║
 * ║   Cambia este archivo para reutilizar la app            ║
 * ╚══════════════════════════════════════════════════════════╝
 */

const appConfig = {
  // ─── PANTALLA INICIAL ──────────────────────────────────────
  welcomeTitle: "BIENVENIDOS G109",
  welcomeSubtitle: "// Sistema de acceso seguro v2.0",
  inputPlaceholder: "/_ ingresa tu nombre...",

  // ─── PANTALLA HACKER ───────────────────────────────────────
  hackLines: [
    "Iniciando secuencia de acceso...",
    "Verificando credenciales...",
    "Inyectando payload...",
    "Usuario detectado: {nombre}",
    "Acceso concedido. Preparando datos...",
    "Has sido HACKEADO...",
  ],

  // ─── TRANSICIÓN ────────────────────────────────────────────
  transitionLines: ["...", "Nah 😄 mentira"],

  // ─── PANTALLA FINAL ────────────────────────────────────────
  finalScreen: {
    greeting: "Hola {nombre} 👋",
    intro: "Gracias por entrar 😄",
    meetingInfo: "Nos vemos el martes a las 19:00 (hora Chile) 🇨🇱",
    classTitle: "En la clase veremos:",
    topics: [
      "Condiciones (if, else, else if)",
      "Control de flujo",
      "Manipulación del DOM",
    ],
    videoLabel: "👉 Te dejo un video para ir adelantando:",
    videoUrl: "https://youtu.be/Z34BF9PCfYg?si=yGflfV_PM26lVgZG",
    videoBtnText: "Ver video ahora",
    githubRepoUrl: "https://github.com/eber-cba/HackerApp",
    githubBtnText: "Ver código fuente",
  },

  // ─── AUDIO ─────────────────────────────────────────────────
  // Nombre del archivo de audio en /public/
  audioFile: "/Welcome to the Game - Hacking Alert.mp3",

  // ─── COLORES (para personalizar si cambia el grupo) ────────
  accentColor: "#00ff41",   // Verde Matrix
  dangerColor: "#ff0033",   // Rojo alerta
  bgColor: "#0a0a0a",       // Fondo oscuro
};

export default appConfig;
