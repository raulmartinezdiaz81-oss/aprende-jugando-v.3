/* =========================================================================
   MÓDULO DE JUEGOS EDUCATIVOS (asignaturas/juegos.js)
   - Registra minijuegos interactivos en window.JUEGOS_EDUCATIVOS.
   - Incluye bancos amplios de vocabulario/retos, memoria anti-repetición en
     localStorage y limpieza de temporizadores mediante unmount().
   ========================================================================= */
(function () {
  const ANTI_REPEAT_KEY = 'aprende_jugando_3primaria_juegos_vistos_v1';

  const FALLBACK_UTILS = {
    randInt: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    pick: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },
    shuffle: function (arr) {
      const a = arr.slice();
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const t = a[i];
        a[i] = a[j];
        a[j] = t;
      }
      return a;
    }
  };

  function getUtils() {
    return window.APP_UTILS || FALLBACK_UTILS;
  }

  /* =======================================================================
     MEMORIA ANTI-REPETICIÓN EN LOCALSTORAGE
     ======================================================================= */
  function loadSeenMap() {
    try {
      const raw = localStorage.getItem(ANTI_REPEAT_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function saveSeenMap(map) {
    try {
      localStorage.setItem(ANTI_REPEAT_KEY, JSON.stringify(map));
    } catch (e) {
      // Ignorar si el almacenamiento está restringido
    }
  }

  function clearSeenHistory(bucketKey) {
    const map = loadSeenMap();
    if (bucketKey) {
      delete map[bucketKey];
      saveSeenMap(map);
    } else {
      saveSeenMap({});
    }
  }

  function pickNonRepeating(bucketKey, items, count) {
    const utils = getUtils();
    const list = Array.isArray(items) ? items.slice() : [];
    const targetCount = Math.min(count || 1, list.length);
    if (!targetCount) return [];

    const map = loadSeenMap();
    const seen = Array.isArray(map[bucketKey]) ? map[bucketKey].slice() : [];

    let unseen = list.filter(function (item) {
      const key = typeof item === 'string' ? item : (item.id || item.key || item.q || item.es || item.va || item.en || JSON.stringify(item));
      return seen.indexOf(key) === -1;
    });

    if (unseen.length < targetCount) {
      seen.length = 0;
      unseen = list.slice();
    }

    const chosen = utils.shuffle(unseen).slice(0, targetCount);
    chosen.forEach(function (item) {
      const key = typeof item === 'string' ? item : (item.id || item.key || item.q || item.es || item.va || item.en || JSON.stringify(item));
      if (seen.indexOf(key) === -1) {
        seen.push(key);
      }
    });

    map[bucketKey] = seen.slice(-120);
    saveSeenMap(map);
    return chosen;
  }

  /* =======================================================================
     BANCOS DE VOCABULARIO, GRAMÁTICA, ORTOGRAFÍA Y REGLAS (3.º PRIMARIA)
     ======================================================================= */
  const VOCAB_VALENCIA = [
    { es: 'Lunes', va: 'Dilluns', cat: 'dias' },
    { es: 'Martes', va: 'Dimarts', cat: 'dias' },
    { es: 'Miércoles', va: 'Dimecres', cat: 'dias' },
    { es: 'Jueves', va: 'Dijous', cat: 'dias' },
    { es: 'Viernes', va: 'Divendres', cat: 'dias' },
    { es: 'Sábado', va: 'Dissabte', cat: 'dias' },
    { es: 'Domingo', va: 'Diumenge', cat: 'dias' },
    { es: 'Enero', va: 'Gener', cat: 'meses' },
    { es: 'Febrero', va: 'Febrer', cat: 'meses' },
    { es: 'Marzo', va: 'Març', cat: 'meses' },
    { es: 'Abril', va: 'Abril', cat: 'meses' },
    { es: 'Mayo', va: 'Maig', cat: 'meses' },
    { es: 'Junio', va: 'Juny', cat: 'meses' },
    { es: 'Julio', va: 'Juliol', cat: 'meses' },
    { es: 'Agosto', va: 'Agost', cat: 'meses' },
    { es: 'Septiembre', va: 'Setembre', cat: 'meses' },
    { es: 'Octubre', va: 'Octubre', cat: 'meses' },
    { es: 'Noviembre', va: 'Novembre', cat: 'meses' },
    { es: 'Diciembre', va: 'Desembre', cat: 'meses' },
    { es: 'Primavera', va: 'Primavera', cat: 'estaciones' },
    { es: 'Verano', va: 'Estiu', cat: 'estaciones' },
    { es: 'Otoño', va: 'Tardor', cat: 'estaciones' },
    { es: 'Invierno', va: 'Hivern', cat: 'estaciones' },
    { es: 'Agua', va: 'Aigua', cat: 'natura' },
    { es: 'Árbol', va: 'Arbre', cat: 'natura' },
    { es: 'Bosque', va: 'Bosc', cat: 'natura' },
    { es: 'Montaña', va: 'Muntanya', cat: 'natura' },
    { es: 'Playa', va: 'Platja', cat: 'natura' },
    { es: 'Sol', va: 'Sol', cat: 'natura' },
    { es: 'Luna', va: 'Lluna', cat: 'natura' },
    { es: 'Estrella', va: 'Estrela', cat: 'natura' },
    { es: 'Flor', va: 'Flor', cat: 'natura' },
    { es: 'Río', va: 'Riu', cat: 'natura' },
    { es: 'Mar', va: 'Mar', cat: 'natura' },
    { es: 'Nube', va: 'Núvol', cat: 'natura' },
    { es: 'Perro', va: 'Gos', cat: 'animals' },
    { es: 'Gato', va: 'Gat', cat: 'animals' },
    { es: 'Pájaro', va: 'Ocell', cat: 'animals' },
    { es: 'Pez', va: 'Peix', cat: 'animals' },
    { es: 'Caballo', va: 'Cavall', cat: 'animals' },
    { es: 'Vaca', va: 'Vaca', cat: 'animals' },
    { es: 'Conejo', va: 'Conill', cat: 'animals' },
    { es: 'Tortuga', va: 'Tortuga', cat: 'animals' },
    { es: 'Escuela', va: 'Escola', cat: 'cole' },
    { es: 'Libro', va: 'Llibre', cat: 'cole' },
    { es: 'Lápiz', va: 'Llapis', cat: 'cole' },
    { es: 'Goma', va: 'Goma', cat: 'cole' },
    { es: 'Mochila', va: 'Motxilla', cat: 'cole' },
    { es: 'Mesa', va: 'Taula', cat: 'cole' },
    { es: 'Silla', va: 'Cadira', cat: 'cole' },
    { es: 'Pizarra', va: 'Pissarra', cat: 'cole' },
    { es: 'Casa', va: 'Casa', cat: 'casa' },
    { es: 'Puerta', va: 'Porta', cat: 'casa' },
    { es: 'Ventana', va: 'Finestra', cat: 'casa' },
    { es: 'Cama', va: 'Llit', cat: 'casa' },
    { es: 'Cocina', va: 'Cuina', cat: 'casa' },
    { es: 'Pan', va: 'Pa', cat: 'menjar' },
    { es: 'Leche', va: 'Llet', cat: 'menjar' },
    { es: 'Manzana', va: 'Poma', cat: 'menjar' },
    { es: 'Naranja', va: 'Taronja', cat: 'menjar' },
    { es: 'Agua fresca', va: 'Aigua fresca', cat: 'menjar' },
    { es: 'Hoy', va: 'Hui', cat: 'temps' },
    { es: 'Mañana', va: 'Demà', cat: 'temps' },
    { es: 'Ayer', va: 'Ahir', cat: 'temps' },
    { es: 'Amigo', va: 'Amic', cat: 'persones' },
    { es: 'Niño', va: 'Xiquet', cat: 'persones' },
    { es: 'Niña', va: 'Xiqueta', cat: 'persones' },
    { es: 'Maestro', va: 'Mestre', cat: 'persones' },
    { es: 'Maestra', va: 'Mestra', cat: 'persones' },
    { es: 'Rojo', va: 'Roig', cat: 'colors' },
    { es: 'Azul', va: 'Blau', cat: 'colors' },
    { es: 'Verde', va: 'Verd', cat: 'colors' },
    { es: 'Amarillo', va: 'Groc', cat: 'colors' },
    { es: 'Blanco', va: 'Blanc', cat: 'colors' },
    { es: 'Negro', va: 'Negre', cat: 'colors' }
  ];

  const VOCAB_INGLES = [
    { es: 'Perro', en: 'Dog', cat: 'animals' },
    { es: 'Gato', en: 'Cat', cat: 'animals' },
    { es: 'Pájaro', en: 'Bird', cat: 'animals' },
    { es: 'Pez', en: 'Fish', cat: 'animals' },
    { es: 'Caballo', en: 'Horse', cat: 'animals' },
    { es: 'Vaca', en: 'Cow', cat: 'animals' },
    { es: 'León', en: 'Lion', cat: 'animals' },
    { es: 'Elefante', en: 'Elephant', cat: 'animals' },
    { es: 'Rojo', en: 'Red', cat: 'colors' },
    { es: 'Azul', en: 'Blue', cat: 'colors' },
    { es: 'Verde', en: 'Green', cat: 'colors' },
    { es: 'Amarillo', en: 'Yellow', cat: 'colors' },
    { es: 'Naranja', en: 'Orange', cat: 'colors' },
    { es: 'Morado', en: 'Purple', cat: 'colors' },
    { es: 'Rosa', en: 'Pink', cat: 'colors' },
    { es: 'Negro', en: 'Black', cat: 'colors' },
    { es: 'Blanco', en: 'White', cat: 'colors' },
    { es: 'Libro', en: 'Book', cat: 'cole' },
    { es: 'Lápiz', en: 'Pencil', cat: 'cole' },
    { es: 'Mochila', en: 'Schoolbag', cat: 'cole' },
    { es: 'Mesa', en: 'Desk', cat: 'cole' },
    { es: 'Silla', en: 'Chair', cat: 'cole' },
    { es: 'Profesor', en: 'Teacher', cat: 'cole' },
    { es: 'Manzana', en: 'Apple', cat: 'menjar' },
    { es: 'Plátano', en: 'Banana', cat: 'menjar' },
    { es: 'Agua', en: 'Water', cat: 'men