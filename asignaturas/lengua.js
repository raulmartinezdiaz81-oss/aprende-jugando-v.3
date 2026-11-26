/* =========================================================================
   ASIGNATURA: LENGUA CASTELLANA (asignaturas/lengua.js)
   ========================================================================= */
window.ASIGNATURAS_MODULOS.lengua = {
  id: 'lengua',
  name: 'Lengua',
  icon: '📝',
  desc: 'Ortografía, acentos y gramática',
  bg: 'bg-lengua',

  studyTitle: '📝 Repaso de Lengua (Reglas, Sinónimos y Antónimos)',
  studyBlocks: {
    ortografia: {
      label: '✍️ Ortografía clave',
      title: '✍️ Palabras y reglas de ortografía',
      items: [
        { es: 'Delante de P y B se escribe...', va: 'M (tambor, campo)' },
        { es: 'Delante de R y L se escribe...', va: 'B (brazo, blanco)' },
        { es: 'Empiezan por HUE- / HIE-', va: 'Con H (huevo, hielo)' },
        { es: 'Después de N se escribe...', va: 'V (invierno, envidia)' },
        { es: 'Plural de pez / lápiz / luz', va: 'peces / lápices / luces' },
        { es: 'Esdrújulas (pájaro, música)', va: 'Siempre llevan tilde' }
      ]
    },
    sinonimos: {
      label: '🔄 Sinónimos y Antónimos',
      title: '🔄 Sinónimos (parecido) y Antónimos (contrario)',
      items: [
        { es: 'Sinónimo de veloz', va: 'rápido' },
        { es: 'Sinónimo de contento', va: 'alegre' },
        { es: 'Sinónimo de gigante', va: 'enorme' },
        { es: 'Antónimo de subir', va: 'bajar' },
        { es: 'Antónimo de antiguo', va: 'moderno' },
        { es: 'Antónimo de lleno', va: 'vacío' }
      ]
    }
  },

  generateQuestion: function () {
    const { randInt, pick, shuffle } = window.APP_UTILS;
    const cat = randInt(1, 5);
    if (cat === 1) {
      const items = [
        { ok: 'avión', bad: ['abión', 'habión', 'abion'], rule: '"Avión" se escribe con v y lleva tilde en la o.' },
        { ok: 'brazo', bad: ['vrazo', 'hrazo', 'braso'], rule: 'Delante de r y l siempre se escribe b (brazo, blanco).' },
        { ok: 'huevo', bad: ['uevo', 'guevo', 'buevo'], rule: 'Las palabras que empiezan por hue- llevan h inicial.' },
        { ok: 'queso', bad: ['ceso', 'keso', 'qeso'], rule: 'Con e, i el sonido fuerte /k/ se escribe con qu.' },
        { ok: 'girasol', bad: ['jirasol', 'guirasol', 'girasoll'], rule: '"Girasol" se escribe con g.' },
        { ok: 'perro', bad: ['pero', 'perrro', 'pelo'], rule: 'Entre vocales el sonido fuerte de r se escribe rr.' },
        { ok: 'invierno', bad: ['inbierno', 'imbierno', 'invirno'], rule: 'Después de n siempre se escribe v (invierno).' },
        { ok: 'tambor', bad: ['tanbor', 'tamvor', 'tanvor'], rule: 'Delante de b siempre se escribe m (tambor).' },
        { ok: 'hielo', bad: ['ielo', 'yelo', 'gielo'], rule: 'Las palabras que empiezan por hie- llevan h.' },
        { ok: 'jirafa', bad: ['girafa', 'guirafa', 'jirrafa'], rule: '"Jirafa" se escribe con j.' },
        { ok: 'blanco', bad: ['vlanco', 'blanqo', 'hlanco'], rule: 'Delante de l siempre se escribe b (blanco).' },
        { ok: 'zapato', bad: ['sapato', 'capato', 'zapto'], rule: 'Con a, o, u se escribe z (zapato, zorro, zumo).' }
      ];
      const it = pick(items);
      const opts = shuffle([it.ok, it.bad[0], it.bad[1], it.bad[2]]);
      return {
        subject: 'lengua', type: 'choice', topic: 'Ortografía · 3º Primaria',
        q: '¿Cuál de estas palabras está escrita correctamente?',
        options: opts, answer: opts.indexOf(it.ok), explanation: it.rule
      };
    } else if (cat === 2) {
      const words = [
        { w: 'pájaro', tipo: 'Esdrújula', reason: 'Pá-ja-ro tiene su sílaba tónica en la antepenúltima sílaba (todas las esdrújulas llevan tilde).' },
        { w: 'camión', tipo: 'Aguda', reason: 'Ca-mión tiene la fuerza en la última sílaba y lleva tilde por acabar en n.' },
        { w: 'lápiz', tipo: 'Llana', reason: 'Lá-piz es llana y lleva tilde porque no acaba en vocal, n ni s.' },
        { w: 'música', tipo: 'Esdrújula', reason: 'Mú-si-ca tiene la fuerza en la antepenúltima sílaba: es esdrújula.' },
        { w: 'sofá', tipo: 'Aguda', reason: 'So-fá tiene la sílaba tónica al final y lleva tilde por terminar en vocal.' },
        { w: 'árbol', tipo: 'Llana', reason: 'Ár-bol es llana y lleva tilde por acabar en l.' },
        { w: 'plátano', tipo: 'Esdrújula', reason: 'Plá-ta-no es esdrújula (antepenúltima sílaba).' },
        { w: 'reloj', tipo: 'Aguda', reason: 'Re-loj tiene la sílaba tónica en la última sílaba (loj): es aguda.' }
      ];
      const chosen = pick(words);
      const opts = ['Aguda', 'Llana', 'Esdrújula', 'Monosílaba'];
      return {
        subject: 'lengua', type: 'choice', topic: 'Acentuación y sílabas',
        q: 'Según su sílaba tónica, ¿qué tipo de palabra es "' + chosen.w + '"?',
        options: opts, answer: opts.indexOf(chosen.tipo), explanation: chosen.reason
      };
    } else if (cat === 3) {
      const isSyn = Math.random() < 0.5;
      const pairs = isSyn ? [
        { w: 'veloz', ans: 'rápido', bad: ['lento', 'pesado', 'dormido'] },
        { w: 'contento', ans: 'alegre', bad: ['triste', 'enfadado', 'aburrido'] },
        { w: 'bonito', ans: 'hermoso', bad: ['feo', 'roto', 'sucio'] },
        { w: 'empezar', ans: 'comenzar', bad: ['terminar', 'acabar', 'frenar'] },
        { w: 'gigante', ans: 'enorme', bad: ['diminuto', 'corto', 'bajo'] },
        { w: 'charlar', ans: 'hablar', bad: ['callar', 'dormir', 'correr'] }
      ] : [
        { w: 'subir', ans: 'bajar', bad: ['trepar', 'volar', 'saltar'] },
        { w: 'oscuro', ans: 'claro', bad: ['negro', 'gris', 'nocturno'] },
        { w: 'lleno', ans: 'vacío', bad: ['completo', 'grande', 'pesado'] },
        { w: 'frío', ans: 'caliente', bad: ['helado', 'fresco', 'nevado'] },
        { w: 'antiguo', ans: 'moderno', bad: ['viejo', 'roto', 'lejos'] },
        { w: 'fácil', ans: 'difícil', bad: ['sencillo', 'rápido', 'corto'] }
      ];
      const p = pick(pairs);
      const opts = shuffle([p.ans, p.bad[0], p.bad[1], p.bad[2]]);
      return {
        subject: 'lengua', type: 'choice', topic: isSyn ? 'Sinónimos' : 'Antónimos',
        q: '¿Cuál es un ' + (isSyn ? 'SINÓNIMO (significado parecido)' : 'ANTÓNIMO (significado contrario)') + ' de "' + p.w + '"?',
        options: opts, answer: opts.indexOf(p.ans),
        explanation: (isSyn ? 'Sinónimo: ' : 'Antónimo: ') + '"' + p.w + '" y "' + p.ans + '".'
      };
    } else if (cat === 4) {
      const bank = [
        { word: 'mochila', type: 'Sustantivo', expl: '"Mochila" nombra un objeto, por lo tanto es un sustantivo.' },
        { word: 'saltar', type: 'Verbo', expl: '"Saltar" expresa una acción, por lo tanto es un verbo.' },
        { word: 'simpático', type: 'Adjetivo', expl: '"Simpático" dice cómo es una persona o animal: es un adjetivo.' },
        { word: 'escribir', type: 'Verbo', expl: '"Escribir" indica una acción: es un verbo.' },
        { word: 'montaña', type: 'Sustantivo', expl: '"Montaña" nombra un lugar o elemento: es un sustantivo.' },
        { word: 'brillante', type: 'Adjetivo', expl: '"Brillante" describe una cualidad: es un adjetivo.' }
      ];
      const it = pick(bank);
      const opts = ['Sustantivo', 'Adjetivo', 'Verbo', 'Artículo'];
      return {
        subject: 'lengua', type: 'choice', topic: 'Gramática',
        q: '¿Qué clase de palabra es "' + it.word + '"?',
        options: opts, answer: opts.indexOf(it.type), explanation: it.expl
      };
    } else {
      const plurals = [
        { s: 'pez', p: 'peces', bad: ['pezs', 'pezes', 'los pez'], r: 'Las palabras acabadas en z cambian z por c en plural: peces.' },
        { s: 'lápiz', p: 'lápices', bad: ['lápizs', 'lápizes', 'lápis'], r: 'Acaba en z, así que en plural se escribe con c: lápices.' },
        { s: 'luz', p: 'luces', bad: ['luzs', 'luzes', 'luses'], r: 'Luz → luces (z cambia a c).' },
        { s: 'nuez', p: 'nueces', bad: ['nuezs', 'nuezes', 'nueses'], r: 'Nuez → nueces.' }
      ];
      const it = pick(plurals);
      const opts = shuffle([it.p, it.bad[0], it.bad[1], it.bad[2]]);
      return {
        subject: 'lengua', type: 'choice', topic: 'Singular y plural',
        q: '¿Cuál es el plural correcto de "' + it.s + '"?',
        options: opts, answer: opts.indexOf(it.p), explanation: it.r
      };
    }
  }
};
