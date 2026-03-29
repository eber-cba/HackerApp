# 💀 HackerApp // G109_SECURE_ACCESS

¡Bienvenido al sistema! Esta es una aplicación web interactiva desarrollada con **React** y **Vite** diseñada para simular una experiencia de "hackeo" cinematográfica (estilo Matrix / Mr. Robot) y luego revelar un mensaje amigable para los estudiantes de la clase G109.

![Hacker App Preview](./public/favicon.svg)

## 🚀 Tecnologías

El proyecto está construido utilizando las siguientes herramientas modernas:
- **[React](https://reactjs.org/)** (v18)
- **[Vite](https://vitejs.dev/)** (Empaquetador ultrarrápido)
- **[GSAP](https://gsap.com/)** (Animaciones cinematográficas y text-effects)
- **[Framer Motion](https://www.framer.com/motion/)** (Transiciones de pantalla fluidas)
- **Canvas API Vanilla** (Lluvia Matrix en fondo con alto rendimiento)

## ⚡ Características Principales

1. **Estilo Cinematográfico Avanzado**: Efectos de _glitch_, texto que se escribe solo (_typewriter_), parpadeos de consola y scanlines CRT.
2. **Matrix Rain Realista**: Animación con Canvas que incluye Katakana, Kanjis y caracteres ASCII con estelas brillantes optimizadas.
3. **Flujo de 4 Pantallas**:
   - `InputScreen`: Ingreso de credenciales estilo terminal.
   - `HackScreen`: Simulación de brecha de seguridad con **sonido MP3**, flashes de pantalla y vibración en dispositivos móviles (`navigator.vibrate`).
   - `TransitionScreen`: Pausa dramática que rompe la ilusión.
   - `FinalScreen`: Mensaje real con animación escalonada revelando el contenido de la clase.

## 🛠 Instalación y Uso Local

Para correr el proyecto clonado en tu máquina:

```bash
# 1. Clona el repositorio
git clone https://github.com/eber-cba/HackerApp.git

# 2. Entra al directorio
cd HackerApp

# 3. Instala todas las dependencias
npm install

# 4. Levanta el servidor de desarrollo
npm run dev
```
Luego ve en tu navegador a `http://localhost:5173`.

## 🔄 Cómo Reutilizar en Otra Clase

Si eres profesor y quieres usar este proyecto para otro grupo o para anunciar otra clase diferente, no necesitas tocar el código de los componentes.

Simplemente abre y modifica el archivo de configuración central:
**`src/config.js`**

Allí podrás cambiar:
- El subtítulo (`"BIENVENIDOS G109"` -> `"BIENVENIDOS G110"`).
- Los temas de la clase y el horario.
- El link del video de YouTube a adelantar.
- Las frases que dice la consola de hackeo.
- Los colores del "Design System".

---

> _"El código fuente es poder."_
