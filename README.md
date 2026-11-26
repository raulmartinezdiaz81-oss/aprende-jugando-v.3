# Aprende Jugando · 3º Primaria (Versión Modular)

## Estructura de archivos
- `index.html`: Estructura principal de la web.
- `styles.css`: Diseño, colores y estilos responsivos.
- `app.js`: Motor del juego (puntos, medallas, tablas de multiplicar y modo Repaso Ocultar/Ver).
- `asignaturas/`: Un archivo independiente por cada una de las 10 asignaturas:
  - `mates.js`
  - `lengua.js`
  - `valencia.js`
  - `ingles.js`
  - `lectura.js`
  - `cmedio.js`
  - `musica.js`
  - `plastica.js`
  - `efisica.js`
  - `religion.js`

## Cómo añadir contenido nuevo en el futuro
1. **Para añadir fichas de Repaso (con el botón Ocultar / Ver al tocar):**
   Abre el archivo de la asignatura (por ejemplo `asignaturas/ingles.js` o `asignaturas/valencia.js`) y añade pares `{ es: 'Texto izquierda', va: 'Respuesta derecha' }` dentro de `studyBlocks`. Cualquier asignatura que tenga `studyBlocks` activa automáticamente el botón **📖 Repaso (Ocultar/Ver)**.
2. **Para añadir preguntas nuevas de test:**
   En las asignaturas con banco de preguntas (`cmedio.js`, `musica.js`, `plastica.js`, `efisica.js`, `religion.js`), añade una línea más al array `questions`:
   `{ t: 'Tema', q: '¿Pregunta?', o: ['Correcta', 'Opción 2', 'Opción 3', 'Opción 4'], a: 0, e: 'Explicación.' }`
