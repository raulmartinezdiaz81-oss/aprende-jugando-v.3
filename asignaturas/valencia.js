/* =========================================================================
   ASIGNATURA: VALENCIÀ (asignaturas/valencia.js)
   - Incluye todos los bloques de Repaso (Castellano ↔ Valencià) y las preguntas.
   ========================================================================= */
window.ASIGNATURAS_MODULOS.valencia = {
  id: 'valencia',
  name: 'Valencià',
  icon: '🍊',
  desc: 'Días, meses, repaso y test',
  bg: 'bg-valencia',

  studyTitle: '🍊 Repaso de Valencià (Castellano ↔ Valencià)',
  studyBlocks: {
    dias: {
      label: '📅 Días semana',
      title: '📅 Días de la semana (Els dies de la setmana)',
      practiceMode: 'dias',
      items: [
        { es: 'Lunes', va: 'dilluns' },
        { es: 'Martes', va: 'dimarts' },
        { es: 'Miércoles', va: 'dimecres' },
        { es: 'Jueves', va: 'dijous' },
        { es: 'Viernes', va: 'divendres' },
        { es: 'Sábado', va: 'dissabte' },
        { es: 'Domingo', va: 'diumenge' },
        { es: 'Ayer / Hoy / Mañana', va: 'ahir / avui / demà' },
        { es: 'Fin de semana', va: 'cap de setmana' },
        { es: 'La semana', va: 'la setmana' }
      ]
    },
    meses: {
      label: '🗓️ Meses del año',
      title: '🗓️ Meses del año (Els mesos de l’any)',
      practiceMode: 'meses',
      items: [
        { es: 'Enero', va: 'gener' },
        { es: 'Febrero', va: 'febrer' },
        { es: 'Marzo', va: 'març' },
        { es: 'Abril', va: 'abril' },
        { es: 'Mayo', va: 'maig' },
        { es: 'Junio', va: 'juny' },
        { es: 'Julio', va: 'juliol' },
        { es: 'Agosto', va: 'agost' },
        { es: 'Septiembre', va: 'setembre' },
        { es: 'Octubre', va: 'octubre' },
        { es: 'Noviembre', va: 'novembre' },
        { es: 'Diciembre', va: 'desembre' }
      ]
    },
    estaciones: {
      label: '🍂 Estaciones',
      title: '🍂 Estaciones del año (Les estacions)',
      practiceMode: 'meses',
      items: [
        { es: 'La primavera', va: 'la primavera' },
        { es: 'El verano', va: "l'estiu" },
        { es: 'El otoño', va: 'la tardor' },
        { es: 'El invierno', va: "l'hivern" },
        { es: 'Hace sol', va: 'fa sol' },
        { es: 'Hace frío / calor', va: 'fa fred / calor' },
        { es: 'Llueve / Nieva', va: 'plou / neva' },
        { es: 'Hace viento', va: 'fa vent' }
      ]
    },
    articles: {
      label: '🏷️ Artículos',
      title: '🏷️ Artículos y apóstrofo (Els articles)',
      practiceMode: 'articles',
      items: [
        { es: 'El perro (masc. sing.)', va: 'el gos' },
        { es: 'La mesa (fem. sing.)', va: 'la taula' },
        { es: 'La escuela (vocal → l’)', va: "l'escola" },
        { es: 'El árbol (vocal → l’)', va: "l'arbre" },
        { es: 'El agua (vocal → l’)', va: "l'aigua" },
        { es: 'El hombre (h muda → l’)', va: "l'home" },
        { es: 'Los libros (masc. plural)', va: 'els llibres' },
        { es: 'Las ventanas (fem. plural)', va: 'les finestres' },
        { es: 'Un / Una', va: 'un / una' },
        { es: 'Unos / Unas', va: 'uns / unes' }
      ]
    },
    escola: {
      label: '🎒 Escuela',
      title: '🎒 Vocabulario de clase (L’escola)',
      practiceMode: 'vocab',
      items: [
        { es: 'El colegio', va: 'el col·legi / l’escola' },
        { es: 'El libro', va: 'el llibre' },
        { es: 'La libreta / cuaderno', va: 'la llibreta' },
        { es: 'El lápiz', va: 'el llapis' },
        { es: 'La goma', va: 'la goma' },
        { es: 'El estuche', va: "l'estoig" },
        { es: 'La mochila', va: 'la motxilla' },
        { es: 'La pizarra', va: 'la pissarra' },
        { es: 'Las tijeras', va: 'les tisores' },
        { es: 'El recreo / patio', va: 'el pati' }
      ]
    },
    saludos: {
      label: '👋 Saludos / Núm.',
      title: '👋 Saludos y números (Salutacions i números)',
      practiceMode: 'vocab',
      items: [
        { es: 'Buenos días', va: 'Bon dia' },
        { es: 'Buenas tardes', va: 'Bona vesprada' },
        { es: 'Buenas noches', va: 'Bona nit' },
        { es: 'Muchas gracias', va: 'Moltes gràcies' },
        { es: 'Por favor', va: 'Per favor' },
        { es: 'Adiós / Hasta mañana', va: 'Adéu / Fins demà' },
        { es: 'Diez / Veinte', va: 'deu / vint' },
        { es: 'Treinta / Cuarenta', va: 'trenta / quaranta' },
        { es: 'Cincuenta / Cien', va: 'cinquanta / cent' },
        { es: 'Amarillo / Rojo / Azul', va: 'groc / roig / blau' }
      ]
    }
  },

  generateQuestion: function (state) {
    const { randInt, pick, shuffle } = window.APP_UTILS;
    let mode = (state && state.playMode === 'subject' && state.currentSubject === 'valencia')
      ? (state.valenciaMode || 'mixto')
      : 'mixto';

    if (mode === 'mixto') {
      mode = pick(['dias', 'meses', 'articles', 'vocab']);
    }

    if (mode === 'dias') {
      const items = [
        { q: 'Com es diu "Lunes" en valencià?', ok: 'dilluns', bad: ['dimarts', 'dimecres', 'dijous'], e: 'Lunes en valencià és "dilluns".' },
        { q: 'Com es diu "Miércoles" en valencià?', ok: 'dimecres', bad: ['dimarts', 'dijous', 'divendres'], e: 'Miércoles en valencià és "dimecres".' },
        { q: 'Quin dia ve després de "dijous"?', ok: 'divendres', bad: ['dimecres', 'dissabte', 'dilluns'], e: 'Després de dijous (jueves) ve divendres (viernes).' },
        { q: 'Com es diu "Sábado" en valencià?', ok: 'dissabte', bad: ['diumenge', 'divendres', 'dimarts'], e: 'Sábado s’escriu amb doble s: "dissabte".' },
        { q: 'Com es diu "Domingo" en valencià?', ok: 'diumenge', bad: ['dissabte', 'dilluns', 'dijous'], e: 'Domingo en valencià és "diumenge".' },
        { q: 'Què significa "ahir" en castellà?', ok: 'Ayer', bad: ['Hoy', 'Mañana', 'Ahora'], e: '"Ahir" és ayer, "avui" és hoy i "demà" és mañana.' },
        { q: 'Quins dos dies formen el "cap de setmana"?', ok: 'dissabte i diumenge', bad: ['dilluns i dimarts', 'dijous i divendres', 'dimecres i dijous'], e: 'El cap de setmana són dissabte i diumenge.' }
      ];
      const it = pick(items);
      const opts = shuffle([it.ok, it.bad[0], it.bad[1], it.bad[2]]);
      return {
        subject: 'valencia', type: 'choice', topic: 'Els dies de la setmana',
        q: it.q, options: opts, answer: opts.indexOf(it.ok), explanation: it.e
      };
    }

    if (mode === 'meses') {
      const items = [
        { q: 'Com es diu "Enero" en valencià?', ok: 'gener', bad: ['febrer', 'juny', 'juliol'], e: 'Enero en valencià és "gener".' },
        { q: 'Com es diu "Marzo" en valencià?', ok: 'març', bad: ['maig', 'mars', 'marz'], e: 'Marzo s’escriu amb ce trencada: "març".' },
        { q: 'Com es diu "Mayo" en valencià?', ok: 'maig', bad: ['març', 'juny', 'agost'], e: 'Mayo en valencià és "maig".' },
        { q: 'Com es diu "Diciembre" en valencià?', ok: 'desembre', bad: ['novembre', 'setembre', 'octubre'], e: 'Diciembre en valencià és "desembre".' },
        { q: 'Quin mes va després de "juny"?', ok: 'juliol', bad: ['maig', 'agost', 'abril'], e: 'Després de juny (junio) ve juliol (julio).' },
        { q: 'Com es diu "El verano" en valencià?', ok: "l'estiu", bad: ["l'hivern", 'la tardor', 'la primavera'], e: 'El verano en valencià és "l’estiu".' },
        { q: 'Com es diu "El otoño" en valencià?', ok: 'la tardor', bad: ["l'hivern", "l'estiu", 'la primavera'], e: 'El otoño en valencià és "la tardor".' },
        { q: 'Com es diu "El invierno" en valencià?', ok: "l'hivern", bad: ["l'estiu", 'la tardor', 'la primavera'], e: 'El invierno s’escriu amb h: "l’hivern".' }
      ];
      const it = pick(items);
      const opts = shuffle([it.ok, it.bad[0], it.bad[1], it.bad[2]]);
      return {
        subject: 'valencia', type: 'choice', topic: 'Mesos i estacions',
        q: it.q, options: opts, answer: opts.indexOf(it.ok), explanation: it.e
      };
    }

    if (mode === 'articles') {
      const nouns = [
        { noun: 'escola', art: "l'", expl: 'Davant de vocal o h en singular s’apostrofa: l’escola.' },
        { noun: 'arbre', art: "l'", expl: '"Arbre" comença per vocal i és singular: l’arbre.' },
        { noun: 'taula', art: 'la', expl: '"Taula" és femení singular i comença per consonant: la taula.' },
        { noun: 'gos', art: 'el', expl: '"Gos" és masculí singular i comença per consonant: el gos.' },
        { noun: 'llibres', art: 'els', expl: '"Llibres" és masculí plural: els llibres.' },
        { noun: 'finestres', art: 'les', expl: '"Finestres" és femení plural: les finestres.' },
        { noun: 'home', art: "l'", expl: '"Home" comença per h muda en singular: l’home.' },
        { noun: 'aigua', art: "l'", expl: '"Aigua" comença per vocal i s’apostrofa: l’aigua.' }
      ];
      const it = pick(nouns);
      const opts = ['el', 'la', "l'", 'els'];
      return {
        subject: 'valencia', type: 'choice', topic: 'Articles i apòstrof',
        q: 'Tria l’article correcte per a: "___ ' + it.noun + '"',
        options: opts, answer: opts.indexOf(it.art), explanation: it.expl
      };
    }

    const sub = randInt(1, 2);
    if (sub === 1) {
      const vocab = [
        { q: 'Com es diu "perro" en valencià?', ok: 'gos', bad: ['gat', 'ocell', 'peix'], e: '"Gos" significa perro.' },
        { q: 'Quin color és el "groc"?', ok: 'Amarillo', bad: ['Rojo', 'Verde', 'Azul'], e: '"Groc" és el color amarillo.' },
        { q: 'Quin animal és un "conill"?', ok: 'Conejo', bad: ['Caballo', 'Tortuga', 'Rana'], e: '"Conill" és conejo.' },
        { q: 'Què significa "llibreta" en castellà?', ok: 'Libreta / cuaderno', bad: ['Lápiz', 'Goma', 'Estuche'], e: 'La llibreta és el cuaderno.' },
        { q: 'Com diem "Buenos días" en valencià?', ok: 'Bon dia', bad: ['Bona nit', 'Bona vesprada', 'Fins demà'], e: 'Pel matí diem "Bon dia".' },
        { q: 'Què és "l’estoig"?', ok: 'El estuche', bad: ['La mochila', 'La pizarra', 'El libro'], e: 'L’estoig és el estuche.' },
        { q: 'Quin número és "trenta-quatre"?', ok: '34', bad: ['43', '24', '14'], e: 'Trenta (30) i quatre (4) = 34.' }
      ];
      const v = pick(vocab);
      const opts = shuffle([v.ok, v.bad[0], v.bad[1], v.bad[2]]);
      return {
        subject: 'valencia', type: 'choice', topic: 'Vocabulari · 3r Primària',
        q: v.q, options: opts, answer: opts.indexOf(v.ok), explanation: v.e
      };
    } else {
      const ortho = [
        { ok: 'col·legi', bad: ['colegi', 'col-legi', 'collegi'], e: '"Col·legi" s’escriu amb ela geminada (l·l).' },
        { ok: 'plaça', bad: ['plasa', 'plaza', 'plassa'], e: 'Davant de a, o, u s’escriu ç: plaça.' },
        { ok: 'muntanya', bad: ['montaña', 'muntana', 'muntanyia'], e: 'El so /ñ/ en valencià s’escriu ny: muntanya.' },
        { ok: 'beure (aigua)', bad: ['veure (aigua)', 'beber', 'vebre'], e: 'Prendre líquid és "beure" amb b; mirar és "veure" amb v.' },
        { ok: 'xicotet', bad: ['chicotet', 'xicotett', 'sicotet'], e: 'En valencià s’escriu amb x inicial: xicotet.' },
        { ok: 'taronges', bad: ['taronjes', 'tarongues', 'taronxes'], e: 'Davant de e, i s’escriu g: taronja → taronges.' }
      ];
      const o = pick(ortho);
      const opts = shuffle([o.ok, o.bad[0], o.bad[1], o.bad[2]]);
      return {
        subject: 'valencia', type: 'choice', topic: 'Ortografia valenciana',
        q: 'Quina paraula està ben escrita en valencià?',
        options: opts, answer: opts.indexOf(o.ok), explanation: o.e
      };
    }
  }
};
