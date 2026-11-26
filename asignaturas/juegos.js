/* =========================================================================
   MÓDULO COMPLETO DE JUEGOS EDUCATIVOS (asignaturas/juegos.js)
   - Registra los 10 minijuegos interactivos en window.JUEGOS_EDUCATIVOS.
   - Incluye bancos amplios de vocabulario, ortografía, cálculo y retos,
     memoria anti-repetición en localStorage y limpieza mediante unmount().
   ========================================================================= */
(function () {
  const PROFILE_KEY = 'aprende_jugando_3primaria_modular_v1';
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
      const key = typeof item === 'string'
        ? item
        : (item.id || item.key || item.q || item.es || item.va || item.en || JSON.stringify(item));
      return seen.indexOf(key) === -1;
    });

    if (unseen.length < targetCount) {
      seen.length = 0;
      unseen = list.slice();
    }

    const chosen = utils.shuffle(unseen).slice(0, targetCount);
    chosen.forEach(function (item) {
      const key = typeof item === 'string'
        ? item
        : (item.id || item.key || item.q || item.es || item.va || item.en || JSON.stringify(item));
      if (seen.indexOf(key) === -1) {
        seen.push(key);
      }
    });

    map[bucketKey] = seen.slice(-150);
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
    { es: 'Agua', en: 'Water', cat: 'menjar' },
    { es: 'Pan', en: 'Bread', cat: 'menjar' },
    { es: 'Leche', en: 'Milk', cat: 'menjar' },
    { es: 'Sol', en: 'Sun', cat: 'natura' },
    { es: 'Luna', en: 'Moon', cat: 'natura' },
    { es: 'Árbol', en: 'Tree', cat: 'natura' },
    { es: 'Flor', en: 'Flower', cat: 'natura' },
    { es: 'Casa', en: 'House', cat: 'casa' },
    { es: 'Puerta', en: 'Door', cat: 'casa' },
    { es: 'Ventana', en: 'Window', cat: 'casa' },
    { es: 'Cama', en: 'Bed', cat: 'casa' },
    { es: 'Lunes', en: 'Monday', cat: 'dias' },
    { es: 'Martes', en: 'Tuesday', cat: 'dias' },
    { es: 'Miércoles', en: 'Wednesday', cat: 'dias' },
    { es: 'Jueves', en: 'Thursday', cat: 'dias' },
    { es: 'Viernes', en: 'Friday', cat: 'dias' },
    { es: 'Sábado', en: 'Saturday', cat: 'dias' },
    { es: 'Domingo', en: 'Sunday', cat: 'dias' }
  ];

  const SOPA_BOARDS = [
    {
      subj: 'cmedio',
      words: [
        { word: 'SOL',  cells: [0, 1, 2] },
        { word: 'MAR',  cells: [14, 15, 16] },
        { word: 'LUNA', cells: [25, 26, 27, 28] },
        { word: 'RIO',  cells: [12, 18, 24] }
      ],
      grid: [
        'S','O','L','P','A','N',
        'T','E','R','R','A','V',
        'R','O','M','A','R','A',
        'I','C','I','E','L','O',
        'O','L','U','N','A','S',
        'F','L','O','R','E','S'
      ]
    },
    {
      subj: 'lengua',
      words: [
        { word: 'LIBRO', cells: [0, 1, 2, 3, 4] },
        { word: 'LAPIZ', cells: [13, 14, 15, 16, 17] },
        { word: 'MESA',  cells: [24, 25, 26, 27] },
        { word: 'HOJA',  cells: [30, 31, 32, 33] }
      ],
      grid: [
        'L','I','B','R','O','H',
        'C','U','E','N','T','O',
        'A','L','A','P','I','Z',
        'Z','P','A','P','E','J',
        'M','E','S','A','L','A',
        'H','O','J','A','E','S'
      ]
    },
    {
      subj: 'valencia',
      words: [
        { word: 'GOS',    cells: [0, 1, 2] },
        { word: 'AIGUA',  cells: [12, 13, 14, 15, 16] },
        { word: 'LLIBRE', cells: [24, 25, 26, 27, 28, 29] },
        { word: 'SOL',    cells: [21, 22, 23] }
      ],
      grid: [
        'G','O','S','S','A','R',
        'T','A','U','O','L','A',
        'A','I','G','U','A','U',
        'A','C','A','S','O','L',
        'L','L','I','B','R','E',
        'D','I','A','M','A','R'
      ]
    },
    {
      subj: 'mates',
      words: [
        { word: 'SUMA',  cells: [0, 1, 2, 3] },
        { word: 'RESTA', cells: [13, 14, 15, 16, 17] },
        { word: 'DOBLE', cells: [24, 25, 26, 27, 28] },
        { word: 'MITAD', cells: [30, 31, 32, 33, 34] }
      ],
      grid: [
        'S','U','M','A','N','M',
        'C','A','L','C','U','I',
        'L','R','E','S','T','A',
        'A','N','U','M','E','A',
        'D','O','B','L','E','D',
        'M','I','T','A','D','S'
      ]
    }
  ];

  const INTRUSO_GROUPS = [
    { q: '¿Cuál es el intruso entre estos animales?', opts: ['Perro', 'Gato', 'Martillo', 'Conejo'], ans: 2, exp: 'El martillo es una herramienta, no un animal.', subj: 'cmedio' },
    { q: '¿Cuál NO es un día de la semana?', opts: ['Lunes', 'Enero', 'Viernes', 'Domingo'], ans: 1, exp: 'Enero es un mes del año.', subj: 'lengua' },
    { q: '¿Cuál es el intruso entre estos colores?', opts: ['Rojo', 'Azul', 'Silla', 'Verde'], ans: 2, exp: 'Silla es un mueble, no un color.', subj: 'ingles' },
    { q: '¿Cuál NO es una estación del año?', opts: ['Primavera', 'Verano', 'Jueves', 'Invierno'], ans: 2, exp: 'Jueves es un día de la semana.', subj: 'cmedio' },
    { q: '¿Cuál es el intruso en la clase?', opts: ['Lápiz', 'Goma', 'Zapatilla', 'Mochila'], ans: 2, exp: 'Zapatilla es calzado, no material escolar.', subj: 'lengua' },
    { q: '¿Cuál NO es una figura geométrica?', opts: ['Triángulo', 'Cuadrado', 'Círculo', 'Cuchara'], ans: 3, exp: 'Cuchara es un cubierto, no una figura geométrica.', subj: 'mates' },
    { q: '¿Cuál es el intruso entre estas frutas?', opts: ['Manzana', 'Plátano', 'Tomate', 'Naranja'], ans: 2, exp: 'En los grupos básicos de 3.º se agrupa junto a las verduras/hortalizas.', subj: 'cmedio' },
    { q: '¿Cuál es el intruso en valencià?', opts: ['Gos', 'Gat', 'Taula', 'Ocell'], ans: '2' in ['0','1','2','3'] ? 2 : 0, exp: 'Taula significa mesa; gos, gat y ocell son animales.', subj: 'valencia' }
  ];

  const ORDENA_FRASES = [
    { words: ['El', 'sol', 'sale', 'por', 'la', 'mañana.'], subj: 'lengua' },
    { words: ['Nosaltres', 'anem', 'a', "l'escola."], subj: 'valencia' },
    { words: ['La', 'Tierra', 'gira', 'alrededor', 'del', 'Sol.'], subj: 'cmedio' },
    { words: ['I', 'like', 'playing', 'football', 'at', 'school.'], subj: 'ingles' },
    { words: ['Los', 'alumnos', 'leen', 'un', 'libro', 'divertido.'], subj: 'lectura' },
    { words: ['El', 'doble', 'de', 'seis', 'es', 'doce.'], subj: 'mates' },
    { words: ['Avui', 'fa', 'molt', 'bon', 'dia.'], subj: 'valencia' },
    { words: ['Las', 'plantas', 'necesitan', 'agua', 'y', 'luz.'], subj: 'cmedio' }
  ];

  const VF_BANK = [
    { q: 'El agua en estado sólido se llama hielo.', ans: true, exp: '¡Sí! Al enfriarse por debajo de 0 °C se vuelve hielo.', subj: 'cmedio' },
    { q: '7 × 8 es igual a 54.', ans: false, exp: '7 × 8 = 56.', subj: 'mates' },
    { q: '"Perro" en inglés se dice "Dog".', ans: true, exp: '¡Correcto! Perro = Dog.', subj: 'ingles' },
    { q: 'Un año bisiesto tiene 366 días.', ans: true, exp: '¡Así es! Febrero tiene 29 días en los años bisiestos.', subj: 'cmedio' },
    { q: 'La mitad de 50 es 20.', ans: false, exp: 'La mitad de 50 es 25.', subj: 'mates' },
    { q: '"Dilluns" en castellano es Lunes.', ans: true, exp: '¡Correcto! Dilluns = Lunes.', subj: 'valencia' },
    { q: 'Las palabras agudas siempre llevan tilde.', ans: false, exp: 'Solo llevan tilde cuando acaban en vocal, -n o -s.', subj: 'lengua' },
    { q: 'Un triángulo tiene tres lados.', ans: true, exp: '¡Correcto! Tri- significa tres.', subj: 'mates' }
  ];

  const HUECO_BANK = [
    { q: 'Completa: "I have a red _____" (manzana)', opts: ['apple', 'dog', 'chair', 'sun'], ans: 0, exp: 'Apple significa manzana.', subj: 'ingles' },
    { q: 'Completa: "Avui és _____" (martes)', opts: ['dilluns', 'dimarts', 'divendres', 'diumenge'], ans: 1, exp: 'Martes en valencià es dimarts.', subj: 'valencia' },
    { q: 'Completa la serie: 10, 20, 30, _____, 50', opts: ['35', '40', '45', '60'], ans: 1, exp: 'Va sumando de 10 en 10.', subj: 'mates' },
    { q: 'Completa: "She _____ a blue schoolbag."', opts: ['has', 'have', 'are', 'is'], ans: 0, exp: 'Con "she" usamos "has".', subj: 'ingles' },
    { q: 'Completa la serie: 5, 10, 15, _____, 25', opts: ['18', '20', '22', '30'], ans: 1, exp: 'Va sumando de 5 en 5.', subj: 'mates' },
    { q: 'Completa en valencià: "El _____ brilla al cel." (sol)', opts: ['sol', 'lluna', 'mar', 'riu'], ans: 0, exp: 'Sol en valencià también se escribe sol.', subj: 'valencia' }
  ];

  const RAPIDO_BANK = [
    { q: '¿Cuántos lados tiene un hexágono?', opts: ['5', '6', '7', '8'], ans: 1, exp: 'Un hexágono tiene 6 lados.', subj: 'mates' },
    { q: '¿Cuál es el plural de "luz"?', opts: ['luzes', 'luces', 'luses', 'luzs'], ans: 1, exp: 'El plural de luz es luces.', subj: 'lengua' },
    { q: '¿Qué planeta está más cerca del Sol?', opts: ['Marte', 'Mercurio', 'Saturno', 'Urano'], ans: 1, exp: 'Mercurio es el planeta más cercano al Sol.', subj: 'cmedio' },
    { q: '¿Cuánto es 9 × 6?', opts: ['48', '54', '56', '63'], ans: 1, exp: '9 × 6 = 54.', subj: 'mates' },
    { q: '¿Cómo se dice "Gracias" en valencià?', opts: ['Gràcies', 'Bon dia', 'Adéu', 'Per favor'], ans: 0, exp: 'Gracias en valencià es "Gràcies".', subj: 'valencia' },
    { q: '¿Cómo se dice "Azul" en inglés?', opts: ['Red', 'Green', 'Blue', 'Yellow'], ans: 2, exp: 'Azul en inglés es "Blue".', subj: 'ingles' }
  ];

  /* =======================================================================
     MOTOR DE EJECUCIÓN DE LOS 10 JUEGOS EDUCATIVOS
     ======================================================================= */
  const ENGINE = {
    activeGameId: null,
    activeCleanup: null,
    timerId: null,
    timeLeft: 55,
    score: 0,
    round: 1,
    maxRounds: 6,
    selectedCards: [],
    matchedIds: new Set(),
    wordTokens: [],
    ladderStep: 0
  };

  function clearTimer() {
    if (ENGINE.timerId) {
      clearInterval(ENGINE.timerId);
      ENGINE.timerId = null;
    }
  }

  function cleanupGame() {
    clearTimer();
    if (typeof ENGINE.activeCleanup === 'function') {
      try {
        ENGINE.activeCleanup();
      } catch (e) {
        // Ignorar errores al desmontar
      }
      ENGINE.activeCleanup = null;
    }
  }

  function addPoints(pts, subjId) {
    ENGINE.score += pts;
    const scoreBadge = document.getElementById('g-live-score');
    if (scoreBadge) scoreBadge.textContent = '⭐ +' + ENGINE.score + ' pts';

    try {
      const raw = localStorage.getItem(PROFILE_KEY);
      if (raw) {
        const p = JSON.parse(raw);
        p.points = (p.points || 0) + pts;
        if (subjId && p.subjectPoints && typeof p.subjectPoints[subjId] === 'number') {
          p.subjectPoints[subjId] += pts;
        }
        localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
        const hdrPts = document.getElementById('header-points');
        if (hdrPts) hdrPts.textContent = p.points;
      }
    } catch (e) {
      // Ignorar si está restringido
    }
  }

  function setMsg(text, ok) {
    const el = document.getElementById('g-msg');
    if (!el) return;
    el.style.display = 'block';
    el.className = 'feedback-box visible ' + (ok ? 'is-correct' : 'is-wrong');
    el.innerHTML = '<div class="feedback-header">' + (ok ? '🎉 ¡Muy bien!' : '💡 ¡Casi!') + '</div><div>' + text + '</div>';
    const nextBtn = document.getElementById('g-next-btn');
    if (nextBtn) nextBtn.style.display = 'inline-flex';
  }

  function hideMsg() {
    const el = document.getElementById('g-msg');
    const nextBtn = document.getElementById('g-next-btn');
    if (el) el.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
  }

  function renderGameEnd(title, gameDef) {
    clearTimer();
    hideMsg();
    const canvas = document.getElementById('g-canvas');
    if (!canvas) return;
    canvas.innerHTML = [
      '<div style="text-align:center;padding:20px 10px;">',
        '<div style="font-size:3.2rem;">🏆</div>',
        '<h3 style="margin:8px 0 6px;font-size:1.35rem;font-weight:900;">' + title + '</h3>',
        '<p style="margin:0 0 16px;color:var(--muted);font-weight:700;">Has ganado <strong>+' + ENGINE.score + ' puntos</strong>.</p>',
        '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">',
          '<button type="button" class="btn-primary" id="g-retry-btn" style="max-width:200px;">🔁 Jugar otra vez</button>',
          '<button type="button" class="btn-secondary" id="g-all-btn" style="max-width:200px;">🎮 Ver los 10 juegos</button>',
        '</div>',
      '</div>'
    ].join('');

    document.getElementById('g-retry-btn').addEventListener('click', function () {
      mountGame(gameDef, document.getElementById('custom-game-host'));
    });
    document.getElementById('g-all-btn').addEventListener('click', function () {
      if (window.GAMES_ENGINE && typeof window.GAMES_ENGINE.showMenu === 'function') {
        window.GAMES_ENGINE.showMenu();
      }
    });
  }

  function renderChoiceQuestion(promptText, options, correctIdx, explanation, pts, subj) {
    const canvas = document.getElementById('g-canvas');
    const letters = ['A', 'B', 'C', 'D'];
    canvas.innerHTML = [
      '<div style="text-align:center;">',
        '<p style="font-size:1.22rem;font-weight:900;margin:8px 0 18px;color:#0f172a;">' + promptText + '</p>',
        '<div class="options-grid" style="max-width:540px;margin:0 auto;">',
          options.map(function (opt, i) {
            return '<button type="button" class="option-btn" data-opt="' + i + '"><span class="option-letter">' + letters[i] + '</span><span>' + opt + '</span></button>';
          }).join(''),
        '</div>',
      '</div>'
    ].join('');

    canvas.querySelectorAll('[data-opt]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        canvas.querySelectorAll('[data-opt]').forEach(function (b) { b.disabled = true; });
        const picked = parseInt(btn.getAttribute('data-opt'), 10);
        if (picked === correctIdx) {
          btn.classList.add('correct');
          addPoints(pts, subj);
          setMsg(explanation + ' (+' + pts + ' pts)', true);
        } else {
          btn.classList.add('wrong');
          const right = canvas.querySelector('[data-opt="' + correctIdx + '"]');
          if (right) right.classList.add('correct');
          setMsg(explanation, false);
        }
      });
    });
  }

  function renderRound(gameDef) {
    const utils = getUtils();
    hideMsg();
    const rLbl = document.getElementById('g-round-lbl');
    if (rLbl) rLbl.textContent = 'Ronda ' + ENGINE.round + '/' + ENGINE.maxRounds;

    const id = gameDef.id;

    if (id === 'tablas_reto') {
      const a = utils.randInt(2, 10);
      const b = utils.randInt(1, 10);
      const ans = a * b;
      const set = new Set([ans]);
      while (set.size < 4) {
        const c = ans + utils.randInt(-10, 10);
        if (c >= 0 && c !== ans) set.add(c);
      }
      const opts = utils.shuffle(Array.from(set));
      renderChoiceQuestion('¿Cuánto es ' + a + ' × ' + b + '?', opts, opts.indexOf(ans), a + ' × ' + b + ' = ' + ans + '.', 15, 'mates');
      return;
    }

    if (id === 'escalera_calculo') {
      ENGINE.ladderStep = Math.min(ENGINE.maxRounds, ENGINE.round);
      const isAdd = ENGINE.round % 2 === 1;
      const a = utils.randInt(20, 140);
      const b = utils.randInt(5, 65);
      const ans = isAdd ? a + b : a - b;
      const set = new Set([ans]);
      while (set.size < 4) {
        const c = ans + utils.randInt(-9, 9);
        if (c >= 0 && c !== ans) set.add(c);
      }
      const opts = utils.shuffle(Array.from(set));
      renderChoiceQuestion(
        'Peldaño ' + ENGINE.ladderStep + '/' + ENGINE.maxRounds + ' · Resuelve: ' + a + (isAdd ? ' + ' : ' - ') + b,
        opts,
        opts.indexOf(ans),
        'Resultado correcto: ' + ans + '.',
        15,
        'mates'
      );
      return;
    }

    if (id === 'mayor_menor') {
      const n1 = utils.randInt(10, 99);
      const n2 = ENGINE.round % 3 === 0 ? n1 : utils.randInt(10, 99);
      const rightSym = n1 > n2 ? '>' : (n1 < n2 ? '<' : '=');
      const opts = ['>', '<', '='];
      renderChoiceQuestion(
        'Compara los números: ' + n1 + '  [ ? ]  ' + n2,
        opts,
        opts.indexOf(rightSym),
        n1 + ' ' + rightSym + ' ' + n2 + '.',
        15,
        'mates'
      );
      return;
    }

    if (id === 'memory_vocab') {
      const valSample = pickNonRepeating('memory_val', VOCAB_VALENCIA, 2);
      const enSample = pickNonRepeating('memory_en', VOCAB_INGLES, 2);
      const pairs = utils.shuffle([
        { id: 'v1', a: valSample[0].es, b: valSample[0].va + ' (Val)', subj: 'valencia' },
        { id: 'v2', a: valSample[1].es, b: valSample[1].va + ' (Val)', subj: 'valencia' },
        { id: 'e1', a: enSample[0].es, b: enSample[0].en + ' (En)', subj: 'ingles' },
        { id: 'e2', a: enSample[1].es, b: enSample[1].en + ' (En)', subj: 'ingles' }
      ]);
      const cards = utils.shuffle(
        pairs.map(function (p) { return { pid: p.id, txt: p.a, subj: p.subj }; })
          .concat(pairs.map(function (p) { return { pid: p.id, txt: p.b, subj: p.subj }; }))
      );
      ENGINE.selectedCards = [];
      ENGINE.matchedIds = new Set();

      const canvas = document.getElementById('g-canvas');
      canvas.innerHTML = [
        '<p style="text-align:center;font-weight:800;color:var(--muted);margin:0 0 12px;">Toca dos tarjetas que signifiquen lo mismo:</p>',
        '<div class="options-grid" style="max-width:560px;margin:0 auto;">',
          cards.map(function (c, i) {
            return '<button type="button" class="option-btn" data-mcard="' + i + '" data-pid="' + c.pid + '" data-subj="' + c.subj + '">' + c.txt + '</button>';
          }).join(''),
        '</div>'
      ].join('');

      canvas.querySelectorAll('[data-mcard]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          const pid = btn.getAttribute('data-pid');
          if (ENGINE.matchedIds.has(pid) || ENGINE.selectedCards.indexOf(btn) !== -1) return;
          btn.style.borderColor = '#2563eb';
          ENGINE.selectedCards.push(btn);

          if (ENGINE.selectedCards.length === 2) {
            const [b1, b2] = ENGINE.selectedCards;
            ENGINE.selectedCards = [];
            if (b1.getAttribute('data-pid') === b2.getAttribute('data-pid')) {
              ENGINE.matchedIds.add(pid);
              b1.classList.add('correct');
              b2.classList.add('correct');
              b1.disabled = true;
              b2.disabled = true;
              if (ENGINE.matchedIds.size === pairs.length) {
                addPoints(25, b1.getAttribute('data-subj'));
                setMsg('¡Has emparejado todas las palabras! (+25 pts)', true);
              }
            } else {
              setTimeout(function () {
                b1.style.borderColor = '';
                b2.style.borderColor = '';
              }, 400);
            }
          }
        });
      });
      return;
    }

    if (id === 'sopa_letras') {
      const bData = SOPA_BOARDS[(ENGINE.round - 1) % SOPA_BOARDS.length];
      let foundWords = new Set();
      let foundCells = new Set();
      let pickedCells = [];

      const canvas = document.getElementById('g-canvas');
      canvas.innerHTML = [
        '<div style="text-align:center;">',
          '<p style="font-weight:900;margin:0 0 8px;">Toca las letras en orden para ir marcándolas; al completar la palabra se guarda sola:</p>',
          '<div id="sopa-targets" style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-bottom:10px;">',
            bData.words.map(function (wObj) {
              return '<span class="pill-btn" data-tword="' + wObj.word + '" style="cursor:default;font-weight:900;">' + wObj.word + '</span>';
            }).join(''),
          '</div>',
          '<div id="sopa-status" style="min-height:30px;font-size:1.05rem;font-weight:900;margin-bottom:10px;color:#0f172a;">Marcando: <span id="sopa-live-word" style="color:#1d4ed8;">—</span></div>',
          '<div style="display:grid;grid-template-columns:repeat(6,44px);gap:6px;justify-content:center;margin-bottom:12px;">',
            bData.grid.map(function (ch, idx) {
              return (
                '<button type="button" class="mode-btn" data-scell="' + idx + '" ' +
                  'style="width:44px;height:44px;padding:0;justify-content:center;align-items:center;font-size:1.05rem;font-weight:900;">' +
                  ch +
                '</button>'
              );
            }).join(''),
          '</div>',
          '<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">',
            '<button type="button" class="pill-btn" id="sopa-clear-sel">Borrar selección actual</button>',
            '<button type="button" class="pill-btn" id="sopa-reset-all">Reiniciar tablero</button>',
          '</div>',
        '</div>'
      ].join('');

      const statusEl = document.getElementById('sopa-status');
      const cellBtns = Array.from(canvas.querySelectorAll('[data-scell]'));

      function updateStatusText(customText) {
        const currentWord = pickedCells.map(function (i) { return bData.grid[i]; }).join('');
        if (customText) {
          statusEl.innerHTML = customText;
        } else {
          statusEl.innerHTML = 'Marcando: <span id="sopa-live-word" style="color:#1d4ed8;">' + (currentWord || '—') + '</span>';
        }
      }

      function paintGrid() {
        cellBtns.forEach(function (btn, idx) {
          btn.classList.remove('active-green');
          btn.style.background = '';
          btn.style.color = '';
          btn.style.borderColor = '';

          if (foundCells.has(idx)) {
            btn.classList.add('active-green');
          } else if (pickedCells.indexOf(idx) !== -1) {
            btn.style.background = '#dbeafe';
            btn.style.color = '#1d4ed8';
            btn.style.borderColor = '#2563eb';
          }
        });

        bData.words.forEach(function (wObj) {
          const pill = canvas.querySelector('[data-tword="' + wObj.word + '"]');
          if (pill && foundWords.has(wObj.word)) {
            pill.classList.add('active-green');
            pill.textContent = '✔ ' + wObj.word;
          }
        });
      }

      cellBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          const idx = parseInt(btn.getAttribute('data-scell'), 10);

          const existingPos = pickedCells.indexOf(idx);
          if (existingPos !== -1) {
            if (existingPos === pickedCells.length - 1) {
              pickedCells.pop();
              paintGrid();
              updateStatusText();
            }
            return;
          }

          pickedCells.push(idx);
          paintGrid();

          const formed = pickedCells.map(function (i) { return bData.grid[i]; }).join('');
          const matchedObj = bData.words.find(function (wObj) {
            return !foundWords.has(wObj.word) && wObj.word === formed;
          });

          if (matchedObj) {
            foundWords.add(matchedObj.word);
            pickedCells.forEach(function (i) { foundCells.add(i); });
            pickedCells = [];
            addPoints(10, bData.subj);
            paintGrid();

            if (foundWords.size === bData.words.length) {
              updateStatusText('<span style="color:#15803d;">¡Todas guardadas (' + foundWords.size + '/' + bData.words.length + ')!</span>');
              setMsg('¡Has encontrado y guardado todas las palabras! (+' + (foundWords.size * 10) + ' pts)', true);
            } else {
              updateStatusText('<span style="color:#15803d;">✔ Guardada "' + matchedObj.word + '" (' + foundWords.size + '/' + bData.words.length + ')</span>');
            }
            return;
          }

          const maxPendingLen = bData.words
            .filter(function (wObj) { return !foundWords.has(wObj.word); })
            .reduce(function (m, wObj) { return Math.max(m, wObj.word.length); }, 0);

          if (maxPendingLen > 0 && pickedCells.length >= maxPendingLen) {
            updateStatusText('<span style="color:#dc2626;">"' + formed + '" no coincide · Reiniciando selección...</span>');
            setTimeout(function () {
              pickedCells = [];
              paintGrid();
              updateStatusText();
            }, 450);
          } else {
            updateStatusText();
          }
        });
      });

      document.getElementById('sopa-clear-sel').addEventListener('click', function () {
        pickedCells = [];
        paintGrid();
        updateStatusText();
      });

      document.getElementById('sopa-reset-all').addEventListener('click', function () {
        pickedCells = [];
        foundWords = new Set();
        foundCells = new Set();
        hideMsg();
        canvas.querySelectorAll('[data-tword]').forEach(function (pill) {
          pill.classList.remove('active-green');
          pill.textContent = pill.getAttribute('data-tword');
        });
        paintGrid();
        updateStatusText();
      });
      return;
    }

    if (id === 'el_intruso') {
      const item = pickNonRepeating('intruso_q', INTRUSO_GROUPS, 1)[0];
      renderChoiceQuestion(item.q, item.opts, item.ans, item.exp, 15, item.subj);
      return;
    }

    if (id === 'ordena_frase') {
      const s = pickNonRepeating('ordena_q', ORDENA_FRASES, 1)[0];
      const target = s.words.join(' ');
      const scr = utils.shuffle(s.words);
      ENGINE.wordTokens = [];

      const canvas = document.getElementById('g-canvas');
      canvas.innerHTML = [
        '<div style="text-align:center;">',
          '<p style="font-weight:800;color:var(--muted);margin:0 0 10px;">Toca las palabras en el orden correcto:</p>',
          '<div id="ord-box" style="min-height:46px;padding:10px;border-radius:12px;border:2px dashed #cbd5e1;background:#f8fafc;font-weight:900;margin-bottom:12px;"></div>',
          '<div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:12px;">',
            scr.map(function (w, i) {
              return '<button type="button" class="mode-btn" data-w="' + i + '" data-val="' + w + '">' + w + '</button>';
            }).join(''),
          '</div>',
          '<div style="display:flex;gap:8px;justify-content:center;">',
            '<button type="button" class="pill-btn" id="ord-clear">Borrar</button>',
            '<button type="button" class="mode-btn active-green" id="ord-check">Comprobar</button>',
          '</div>',
        '</div>'
      ].join('');

      const box = document.getElementById('ord-box');
      const wBtns = Array.from(canvas.querySelectorAll('[data-w]'));
      wBtns.forEach(function (b) {
        b.addEventListener('click', function () {
          if (b.disabled) return;
          b.disabled = true;
          b.style.opacity = '0.45';
          ENGINE.wordTokens.push(b.getAttribute('data-val'));
          box.textContent = ENGINE.wordTokens.join(' ');
        });
      });

      document.getElementById('ord-clear').addEventListener('click', function () {
        ENGINE.wordTokens = [];
        box.textContent = '';
        hideMsg();
        wBtns.forEach(function (b) {
          b.disabled = false;
          b.style.opacity = '1';
        });
      });

      document.getElementById('ord-check').addEventListener('click', function () {
        const attempt = ENGINE.wordTokens.join(' ');
        if (attempt === target) {
          addPoints(15, s.subj);
          setMsg('Frase correcta: "' + target + '" (+15 pts)', true);
        } else {
          setMsg('La frase correcta es: "' + target + '"', false);
        }
      });
      return;
    }

    if (id === 'verdadero_falso') {
      const item = pickNonRepeating('vf_q', VF_BANK, 1)[0];
      renderChoiceQuestion(item.q, ['Verdadero', 'Falso'], item.ans ? 0 : 1, item.exp, 15, item.subj);
      return;
    }

    if (id === 'completa_hueco') {
      const item = pickNonRepeating('hueco_q', HUECO_BANK, 1)[0];
      renderChoiceQuestion(item.q, item.opts, item.ans, item.exp, 15, item.subj);
      return;
    }

    const rItem = pickNonRepeating('rapido_q', RAPIDO_BANK, 1)[0];
    renderChoiceQuestion(rItem.q, rItem.opts, rItem.ans, rItem.exp, 20, rItem.subj);
  }

  function mountGame(gameDef, hostEl) {
    cleanupGame();
    ENGINE.activeGameId = gameDef.id;
    ENGINE.score = 0;
    ENGINE.round = 1;
    ENGINE.maxRounds = 6;
    ENGINE.timeLeft = 55;
    ENGINE.ladderStep = 0;

    hostEl.innerHTML = [
      '<div class="card" style="gap:14px;">',
        '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;padding-bottom:10px;border-bottom:1px solid var(--border);">',
          '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">',
            '<span class="round-badge">' + (gameDef.icon || '🎮') + ' ' + gameDef.name + '</span>',
            '<span id="g-round-lbl" style="font-weight:800;color:var(--muted);font-size:0.86rem;">Ronda 1/' + ENGINE.maxRounds + '</span>',
          '</div>',
          '<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">',
            '<span id="g-live-timer" style="font-weight:900;color:#ea580c;">⏱ ' + ENGINE.timeLeft + 's</span>',
            '<span id="g-live-score" style="font-weight:900;color:#15803d;">⭐ +0 pts</span>',
          '</div>',
        '</div>',
        '<div id="g-canvas" style="min-height:220px;"></div>',
        '<div id="g-msg" class="feedback-box" style="display:none;"></div>',
        '<div style="display:flex;justify-content:flex-end;gap:10px;">',
          '<button type="button" class="btn-primary" id="g-next-btn" style="display:none;max-width:220px;">Siguiente ➔</button>',
        '</div>',
      '</div>'
    ].join('');

    const nextBtn = document.getElementById('g-next-btn');
    const onNext = function () {
      if (ENGINE.timeLeft <= 0 || ENGINE.round >= ENGINE.maxRounds) {
        renderGameEnd(ENGINE.timeLeft <= 0 ? '¡Tiempo agotado!' : '¡Partida completada!', gameDef);
      } else {
        ENGINE.round++;
        renderRound(gameDef);
      }
    };
    nextBtn.addEventListener('click', onNext);

    ENGINE.timerId = setInterval(function () {
      ENGINE.timeLeft--;
      const tEl = document.getElementById('g-live-timer');
      if (tEl) {
        tEl.textContent = '⏱ ' + Math.max(0, ENGINE.timeLeft) + 's';
        tEl.style.color = ENGINE.timeLeft <= 10 ? '#dc2626' : '#ea580c';
      }
      if (ENGINE.timeLeft <= 0) {
        clearTimer();
        renderGameEnd('¡Se acabó el tiempo!', gameDef);
      }
    }, 1000);

    ENGINE.activeCleanup = function () {
      clearTimer();
      nextBtn.removeEventListener('click', onNext);
    };

    renderRound(gameDef);
    return ENGINE.activeCleanup;
  }

  const GAMES_LIST = [
    { id: 'tablas_reto',     icon: '✖️', name: 'Tablas Exprés',        desc: 'Acierta multiplicaciones del 1 al 10 contrarreloj.', badge: '+15 pts', subj: 'mates',    bg: 'bg-mates',    mount: function (h) { return mountGame(this, h); } },
    { id: 'memory_vocab',     icon: '🃏', name: 'Memory Idiomas',       desc: 'Empareja palabras en castellano, valencià e inglés sin repetir.', badge: '+25 pts', subj: 'valencia', bg: 'bg-valencia', mount: function (h) { return mountGame(this, h); } },
    { id: 'sopa_letras',      icon: '🔤', name: 'Sopa de Letras',       desc: 'Cuadrícula 6×6 con varias palabras ocultas en cada ronda.', badge: '+40 pts', subj: 'lengua',   bg: 'bg-lengua',   mount: function (h) { return mountGame(this, h); } },
    { id: 'el_intruso',       icon: '🕵️', name: 'El Intruso',           desc: 'Detecta el elemento que no pertenece al grupo.', badge: '+15 pts', subj: 'cmedio',   bg: 'bg-cmedio',   mount: function (h) { return mountGame(this, h); } },
    { id: 'escalera_calculo', icon: '🪜', name: 'Escalera de Cálculo',  desc: 'Sube peldaños resolviendo sumas y restas.', badge: '+15 pts', subj: 'mates',    bg: 'bg-mates',    mount: function (h) { return mountGame(this, h); } },
    { id: 'ordena_frase',     icon: '🧩', name: 'Ordena la Frase',      desc: 'Forma oraciones correctas en castellano, valencià e inglés.', badge: '+15 pts', subj: 'lengua',   bg: 'bg-lectura',  mount: function (h) { return mountGame(this, h); } },
    { id: 'verdadero_falso',  icon: '✅', name: 'Verdadero o Falso',   desc: 'Responde a retos de ciencias, matemáticas, lengua e inglés.', badge: '+15 pts', subj: 'cmedio',   bg: 'bg-musica',   mount: function (h) { return mountGame(this, h); } },
    { id: 'completa_hueco',   icon: '✍️', name: 'Completa el Hueco',    desc: 'Elige la palabra o número exacto que completa cada reto.', badge: '+15 pts', subj: 'ingles',   bg: 'bg-ingles',   mount: function (h) { return mountGame(this, h); } },
    { id: 'mayor_menor',      icon: '⚖️', name: 'Mayor, Menor o Igual', desc: 'Compara números antes de que termine el tiempo.', badge: '+15 pts', subj: 'mates',    bg: 'bg-plastica', mount: function (h) { return mountGame(this, h); } },
    { id: 'reto_relampago',   icon: '⚡', name: 'Reto Relámpago',       desc: 'Preguntas rápidas variadas de distintas asignaturas.', badge: '+20 pts', subj: 'lectura',  bg: 'bg-efisica',  mount: function (h) { return mountGame(this, h); } }
  ];

  window.JUEGOS_EDUCATIVOS = GAMES_LIST;
  window.JUEGOS_UTILS = {
    clearSeenHistory: clearSeenHistory,
    pickNonRepeating: pickNonRepeating
  };
})();
