/* =========================================================================
   ASIGNATURA: INGLÉS (asignaturas/ingles.js)
   - Listo para añadir nuevos bloques de verbos o vocabulario fácilmente.
   ========================================================================= */
window.ASIGNATURAS_MODULOS.ingles = {
  id: 'ingles',
  name: 'Inglés',
  icon: '🇬🇧',
  desc: 'Vocabulary, grammar & numbers',
  bg: 'bg-ingles',

  videos: [
    {
      id: 'pnOxR7gwePY',
      label: '📅 Days of the week',
      title: 'Days of the week song in English'
    },
    {
      id: 'd2Dn0q-WP98',
      label: '🗓️ Months of the year',
      title: 'Months of the year song in English'
    }
  ],

  studyTitle: '🇬🇧 Repaso de Inglés (English ↔ Español)',
  studyBlocks: {
    verbs: {
      label: '🏃 Verbos (Actions)',
      title: '🏃 Verbos más usados en 3º Primaria',
      items: [
        { es: 'Correr', va: 'to run' },
        { es: 'Saltar', va: 'to jump' },
        { es: 'Nadar', va: 'to swim' },
        { es: 'Volar', va: 'to fly' },
        { es: 'Leer', va: 'to read' },
        { es: 'Escribir', va: 'to write' },
        { es: 'Cantar / Bailar', va: 'to sing / to dance' },
        { es: 'Comer / Beber', va: 'to eat / to drink' },
        { es: 'Ser o estar (I / He / They)', va: 'am / is / are' },
        { es: 'Tener (I / He)', va: 'have got / has got' }
      ]
    },
    vocab: {
      label: '🐾 Vocabulario clave',
      title: '🐾 Animales, colores y colegio',
      items: [
        { es: 'Conejo / Mariposa', va: 'rabbit / butterfly' },
        { es: 'Morado / Amarillo', va: 'purple / yellow' },
        { es: 'Pantalones / Zapatos', va: 'trousers / shoes' },
        { es: 'Fresa / Manzana', va: 'strawberry / apple' },
        { es: 'Sacapuntas / Regla', va: 'sharpener / ruler' },
        { es: 'Nublado / Soleado', va: 'cloudy / sunny' },
        { es: 'Abuela / Hermano', va: 'grandmother / brother' },
        { es: 'Miércoles / Sábado', va: 'Wednesday / Saturday' }
      ]
    }
  },

  generateQuestion: function () {
    const { randInt, pick, shuffle } = window.APP_UTILS;
    const type = randInt(1, 3);
    if (type === 1) {
      const dict = [
        { en: 'rabbit', es: 'Conejo', bad: ['Perro', 'Caballo', 'Tortuga'], cat: 'Animals' },
        { en: 'butterfly', es: 'Mariposa', bad: ['Abeja', 'Araña', 'Hormiga'], cat: 'Animals' },
        { en: 'purple', es: 'Morado', bad: ['Amarillo', 'Verde', 'Naranja'], cat: 'Colours' },
        { en: 'trousers', es: 'Pantalones', bad: ['Camiseta', 'Zapatos', 'Sombrero'], cat: 'Clothes' },
        { en: 'strawberry', es: 'Fresa', bad: ['Plátano', 'Manzana', 'Naranja'], cat: 'Food' },
        { en: 'sharpener', es: 'Sacapuntas', bad: ['Regla', 'Goma', 'Estuche'], cat: 'School' },
        { en: 'cloudy', es: 'Nublado', bad: ['Soleado', 'Nevado', 'Ventoso'], cat: 'Weather' },
        { en: 'grandmother', es: 'Abuela', bad: ['Hermana', 'Tía', 'Prima'], cat: 'Family' },
        { en: 'shoulders', es: 'Hombros', bad: ['Rodillas', 'Dedos', 'Orejas'], cat: 'Body' },
        { en: 'Wednesday', es: 'Miércoles', bad: ['Martes', 'Jueves', 'Viernes'], cat: 'Days' }
      ];
      const item = pick(dict);
      const opts = shuffle([item.es, item.bad[0], item.bad[1], item.bad[2]]);
      return {
        subject: 'ingles', type: 'choice', topic: 'English · ' + item.cat,
        q: 'What does "' + item.en + '" mean in Spanish?',
        options: opts, answer: opts.indexOf(item.es),
        explanation: '"' + item.en + '" means "' + item.es + '".'
      };
    } else if (type === 2) {
      const tens = [
        { n: 20, w: 'twenty' }, { n: 30, w: 'thirty' }, { n: 40, w: 'forty' },
        { n: 50, w: 'fifty' }, { n: 60, w: 'sixty' }, { n: 70, w: 'seventy' }, { n: 80, w: 'eighty' }
      ];
      const units = [
        { n: 1, w: 'one' }, { n: 2, w: 'two' }, { n: 3, w: 'three' },
        { n: 4, w: 'four' }, { n: 5, w: 'five' }, { n: 7, w: 'seven' }, { n: 8, w: 'eight' }
      ];
      const t = pick(tens);
      const u = pick(units);
      const fullNum = t.n + u.n;
      const word = t.w + '-' + u.w;
      const opts = shuffle([String(fullNum), String(u.n * 10 + (t.n / 10)), String(fullNum + 10), String(fullNum - 2)]);
      return {
        subject: 'ingles', type: 'choice', topic: 'English · Numbers',
        q: 'Which number is "' + word + '"?',
        options: opts, answer: opts.indexOf(String(fullNum)),
        explanation: t.w + ' (' + t.n + ') + ' + u.w + ' (' + u.n + ') = ' + fullNum + '.'
      };
    } else {
      const grammar = [
        { q: 'Complete: "She ___ my sister."', ok: 'is', bad: ['am', 'are', 'have'], e: 'With "she / he / it" we use "is".' },
        { q: 'Complete: "They ___ happy at school."', ok: 'are', bad: ['is', 'am', 'has'], e: 'With "they / we / you" we use "are".' },
        { q: 'Complete: "I ___ got a green turtle."', ok: 'have', bad: ['has', 'is', 'am'], e: 'With "I" we use "have got".' },
        { q: 'Complete: "He ___ got two brothers."', ok: 'has', bad: ['have', 'are', 'am'], e: 'With "he / she" we use "has got".' },
        { q: 'Complete: "___ four pencils on the table."', ok: 'There are', bad: ['There is', 'There am', 'Is there'], e: 'For plural ("four pencils") we use "There are".' },
        { q: 'Complete: "A bird ___ fly, but a dog ___ fly."', ok: "can / can't", bad: ["can't / can", 'is / are', 'has / have'], e: 'Birds can fly and dogs can’t fly.' }
      ];
      const g = pick(grammar);
      const opts = shuffle([g.ok, g.bad[0], g.bad[1], g.bad[2]]);
      return {
        subject: 'ingles', type: 'choice', topic: 'English · Grammar',
        q: g.q, options: opts, answer: opts.indexOf(g.ok), explanation: g.e
      };
    }
  }
};
