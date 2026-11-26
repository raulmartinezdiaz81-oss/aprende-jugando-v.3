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
    },
    animals: {
      label: '🐾 Animals i llocs',
      title: '🐾 Animals, sons i refugis (Els animals)',
      practiceMode: 'vocab',
      items: [
        { es: 'Caballo (duerme en el establo)', va: 'el cavall (a l’estable)' },
        { es: 'Gallina (pone huevos)', va: 'la gallina (pon ous)' },
        { es: 'Pato (nada / pico)', va: 'l’ànec (nada / bec)' },
        { es: 'Oveja (lana)', va: 'l’ovella (la llana)' },
        { es: 'Conejo (conejera)', va: 'el conill (la conillera)' },
        { es: 'Vaca (leche)', va: 'la vaca (la llet)' },
        { es: 'Cerdo (pocilga)', va: 'el porc (la porquera)' },
        { es: 'Avestruz (corre, no vuela)', va: 'l’estruç (corre fins a 89 km/h)' },
        { es: 'Paloma / Burro', va: 'el colom / l’ase' },
        { es: 'Ladrar / Maullar', va: 'lladrar / maular' }
      ]
    },
    polisemia: {
      label: '🔤 Polisèmia i g/gu',
      title: '🔤 Paraules polisèmiques i ortografia (g / gu)',
      practiceMode: 'vocab',
      items: [
        { es: 'Ala (de pájaro, avión o sombrero)', va: 'l’ala (paraula polisèmica)' },
        { es: 'Cabeza / Cabo / Jefe', va: 'el cap (paraula polisèmica)' },
        { es: 'Banco (asiento / entidad / peces)', va: 'el banc (paraula polisèmica)' },
        { es: 'Punta (de lápiz / de tijeras)', va: 'la punta (paraula polisèmica)' },
        { es: 'Tortuga (so g + a/o/u)', va: 'la tortuga' },
        { es: 'Manga (so g + a)', va: 'la mànega' },
        { es: 'Higo (so g + a)', va: 'la figa' },
        { es: 'Hormiga (so g + a)', va: 'la formiga' }
      ]
    },
    cultura: {
      label: '🎆 Festes i lectura',
      title: '🎆 Festes populars i La formiga Piga',
      practiceMode: 'vocab',
      items: [
        { es: 'Hogueras de San Juan (junio)', va: 'les Fogueres de Sant Joan (juny)' },
        { es: 'Mascletà / Fallas', va: 'la mascletà / les falles' },
        { es: 'Horchata con fartons', va: 'l’orxata amb fartons' },
        { es: 'Coca de atún', va: 'la coca amb tonyina' },
        { es: 'Madriguera bajo tierra', va: 'el cau sota terra (La formiga Piga)' },
        { es: 'Miga de pan', va: 'una molla de pa (La formiga Piga)' }
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

    const sub = randInt(1, 5);
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
    } else if (sub === 2) {
      const ortho = [
        { ok: 'col·legi', bad: ['colegi', 'col-legi', 'collegi'], e: '"Col·legi" s’escriu amb ela geminada (l·l).' },
        { ok: 'plaça', bad: ['plasa', 'plaza', 'plassa'], e: 'Davant de a, o, u s’escriu ç: plaça.' },
        { ok: 'muntanya', bad: ['montaña', 'muntana', 'muntanyia'], e: 'El so /ñ/ en valencià s’escriu ny: muntanya.' },
        { ok: 'beure (aigua)', bad: ['veure (aigua)', 'beber', 'vebre'], e: 'Prendre líquid és "beure" amb b; mirar és "veure" amb v.' },
        { ok: 'xicotet', bad: ['chicotet', 'xicotett', 'sicotet'], e: 'En valencià s’escriu amb x inicial: xicotet.' },
        { ok: 'taronges', bad: ['taronjes', 'tarongues', 'taronxes'], e: 'Davant de e, i s’escriu g: taronja → taronges.' },
        { ok: 'tortuga', bad: ['tortuga', 'tortuga', 'tortuga'], e: 'Davant de a, o, u s’escriu "g": tortuga.' },
        { ok: 'mànega', bad: ['mànuega', 'màneja', 'mànega'], e: 'Davant de a s’escriu "g" per al so de gol: mànega.' }
      ];
      const orthoClean = [
        { ok: 'col·legi', bad: ['colegi', 'col-legi', 'collegi'], e: '"Col·legi" s’escriu amb ela geminada (l·l).' },
        { ok: 'plaça', bad: ['plasa', 'plaza', 'plassa'], e: 'Davant de a, o, u s’escriu ç: plaça.' },
        { ok: 'muntanya', bad: ['montaña', 'muntana', 'muntanyia'], e: 'El so /ñ/ en valencià s’escriu ny: muntanya.' },
        { ok: 'beure (aigua)', bad: ['veure (aigua)', 'beber', 'vebre'], e: 'Prendre líquid és "beure" amb b; mirar és "veure" amb v.' },
        { ok: 'xicotet', bad: ['chicotet', 'xicotett', 'sicotet'], e: 'En valencià s’escriu amb x inicial: xicotet.' },
        { ok: 'taronges', bad: ['taronjes', 'tarongues', 'taronxes'], e: 'Davant de e, i s’escriu g: taronja → taronges.' },
        { ok: 'tortuga', bad: ['tortuguua', 'tortuja', 'tortugue'], e: 'Davant de a, o, u s’escriu "g": tortuga.' },
        { ok: 'mànega', bad: ['mànuega', 'màneja', 'mànegue'], e: 'Davant de a s’escriu "g" per al so de gol: mànega.' }
      ];
      const o = pick(orthoClean);
      const opts = shuffle([o.ok, o.bad[0], o.bad[1], o.bad[2]]);
      return {
        subject: 'valencia', type: 'choice', topic: 'Ortografia valenciana',
        q: 'Quina paraula està ben escrita en valencià?',
        options: opts, answer: opts.indexOf(o.ok), explanation: o.e
      };
    } else if (sub === 3) {
      const polisemia = [
        {
          q: 'Quina paraula pot significar tant l’extremitat d’un ocell com la part d’un avió?',
          ok: 'ala',
          bad: ['cap', 'banc', 'punta'],
          e: '"Ala" és polisèmica: pot ser l’ala d’un ocell/avió o l’ala d’un barret.'
        },
        {
          q: 'En "La senyora que seu al banc dóna pa sec als coloms", què significa "banc"?',
          ok: 'Seient per a seure',
          bad: ['Lloc on es guarda diners', 'Un conjunt de peixos', 'Una eina de cuina'],
          e: 'En aquesta frase "banc" és el seient on s’asseu la gent.'
        },
        {
          q: 'Què vol dir que una paraula és "polisèmica"?',
          ok: 'Que té més d’un significat',
          bad: ['Que sempre és un animal', 'Que no té vocals', 'Que és un verb'],
          e: 'Una paraula és polisèmica quan té més d’un significat (com "ala", "cap" o "banc").'
        },
        {
          q: 'A quina endevinalla correspon: "La meva feina és rosegar, formatge m’agrada menjar"?',
          ok: 'El ratolí',
          bad: ['El ninot de neu', 'El bolet', 'Les tisores'],
          e: 'El ratolí rosega i li agrada el formatge; si hi ha un gat a prop, s’espanta.'
        },
        {
          q: 'A quina endevinalla correspon: "Sóc un senyor gros i rodó, fresc com un cotó. Sempre em desfà l’escalfor"?',
          ok: 'El ninot de neu',
          bad: ['El bolet', 'El ratolí', 'Les tisores'],
          e: 'El ninot de neu està fet de neu i es desfà amb l’escalfor.'
        }
      ];
      const p = pick(polisemia);
      const opts = shuffle([p.ok, p.bad[0], p.bad[1], p.bad[2]]);
      return {
        subject: 'valencia', type: 'choice', topic: 'Polisèmia i endevinalles',
        q: p.q, options: opts, answer: opts.indexOf(p.ok), explanation: p.e
      };
    } else if (sub === 4) {
      const animals = [
        {
          q: 'On dorm el cavall?',
          ok: 'A l’estable',
          bad: ['A la porquera', 'A la conillera', 'Al niu'],
          e: 'El cavall dorm a l’estable; el porc a la porquera i el conill a la conillera.'
        },
        {
          q: 'Quin animal té plomes, no pot volar i pot córrer fins als 89 km/h?',
          ok: 'L’estruç',
          bad: ['La gallina', 'L’ànec', 'El colom'],
          e: 'L’estruç és una au que no pot volar però pot córrer molt de pressa.'
        },
        {
          q: 'Quin animal ens proporciona llana per a fer roba?',
          ok: 'L’ovella',
          bad: ['El porc', 'L’ànec', 'El cavall'],
          e: 'Amb la llana de l’ovella es pot fer molta roba.'
        },
        {
          q: 'Com es diu el so que fa el gat?',
          ok: 'Maular',
          bad: ['Lladrar', 'Cantar', 'Piular'],
          e: 'El gat fa "mèu" i l’acció és maular; el gos fa "bup" i lladra.'
        }
      ];
      const a = pick(animals);
      const opts = shuffle([a.ok, a.bad[0], a.bad[1], a.bad[2]]);
      return {
        subject: 'valencia', type: 'choice', topic: 'Animals i refugis',
        q: a.q, options: opts, answer: opts.indexOf(a.ok), explanation: a.e
      };
    } else {
      const lectura = [
        {
          q: 'On vivia la formiga Piga de la lectura?',
          ok: 'En un cau sota terra',
          bad: ['Dalt d’un arbre', 'Dins d’un riu', 'En un niu'],
          e: 'La formiga Piga vivia al bosc, en un cau sota terra.'
        },
        {
          q: 'Què va olorar la formiga Piga al bosc?',
          ok: 'Una gran molla de pa',
          bad: ['Una flor vermella', 'Un tros de formatge', 'Una poma madura'],
          e: 'Va olorar una gran molla de pa que pesava tant que la va portar amb la seua amiga.'
        },
        {
          q: 'Qui va ajudar la formiga Piga a portar la molla de pa al cau?',
          ok: 'La seua amiga',
          bad: ['El seu germà', 'Un ocell del bosc', 'La seua mare'],
          e: 'Darrere seu venia la seua amiga i totes dues van poder dur la molla de pa al cau.'
        },
        {
          q: 'En quin mes se celebren les Fogueres de Sant Joan?',
          ok: 'Al juny',
          bad: ['A l’abril', 'A l’octubre', 'Al gener'],
          e: 'Les Fogueres de Sant Joan se celebren al mes de juny.'
        },
        {
          q: 'Què es menja tradicionalment amb l’orxata?',
          ok: 'Els fartons',
          bad: ['Les castanyes', 'Els bunyols de vent', 'Les pomes'],
          e: 'L’orxata se sol prendre ben fresca acompanyada de fartons.'
        }
      ];
      const l = pick(lectura);
      const opts = shuffle([l.ok, l.bad[0], l.bad[1], l.bad[2]]);
      return {
        subject: 'valencia', type: 'choice', topic: 'Comprensió i festes',
        q: l.q, options: opts, answer: opts.indexOf(l.ok), explanation: l.e
      };
    }
  }
};
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
