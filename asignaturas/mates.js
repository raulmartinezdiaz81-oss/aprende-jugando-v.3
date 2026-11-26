/* =========================================================================
   ASIGNATURA: MATES (asignaturas/mates.js)
   - Aquí puedes añadir divisiones, nuevas operaciones o más fichas de repaso.
   ========================================================================= */
window.ASIGNATURAS_MODULOS.mates = {
  id: 'mates',
  name: 'Mates',
  icon: '🧮',
  desc: 'Cálculo, tablas y problemas',
  bg: 'bg-mates',

  // Fichas de repaso con botón Ocultar/Ver
  studyTitle: '🧮 Repaso de Mates (Trucos, Dobles y Medidas)',
  studyBlocks: {
    dobles: {
      label: '✖️ Dobles y Triples',
      title: '✖️ Dobles (×2) y Triples (×3)',
      practiceMode: 'multiplicar',
      items: [
        { es: 'El doble de 6 (6 × 2)', va: '12' },
        { es: 'El doble de 8 (8 × 2)', va: '16' },
        { es: 'El doble de 15 (15 × 2)', va: '30' },
        { es: 'El doble de 25 (25 × 2)', va: '50' },
        { es: 'El triple de 4 (4 × 3)', va: '12' },
        { es: 'El triple de 7 (7 × 3)', va: '21' },
        { es: 'El triple de 10 (10 × 3)', va: '30' },
        { es: 'La mitad de 20 (20 ÷ 2)', va: '10' }
      ]
    },
    medidas: {
      label: '📏 Medidas y Tiempo',
      title: '📏 Unidades de medida y reloj',
      practiceMode: 'problemas',
      items: [
        { es: '1 metro en centímetros', va: '100 cm' },
        { es: '1 kilómetro en metros', va: '1.000 m' },
        { es: '1 kilogramo en gramos', va: '1.000 g' },
        { es: 'Medio kilo en gramos', va: '500 g' },
        { es: '1 hora en minutos', va: '60 min' },
        { es: 'Media hora en minutos', va: '30 min' },
        { es: 'Un cuarto de hora', va: '15 min' },
        { es: '1 euro en céntimos', va: '100 cént.' }
      ]
    }
  },

  generateQuestion: function (state) {
    const { randInt, pick, shuffle } = window.APP_UTILS;
    let mode = state.matesMode || 'suma';
    if (mode === 'mixto') {
      mode = pick(['suma', 'resta', 'multiplicar', 'problemas']);
    }

    if (mode === 'problemas') {
      const names = ['Hugo', 'Sofía', 'Leo', 'Martina', 'Lucas', 'Valeria', 'Mateo', 'Lucía', 'Daniel', 'Carla'];
      const n1 = pick(names);
      let n2 = pick(names);
      while (n2 === n1) n2 = pick(names);

      const type = randInt(1, 4);
      if (type === 1) {
        const cajas = randInt(3, 9);
        const porCaja = randInt(4, 9);
        const total = cajas * porCaja;
        const opts = shuffle([total + ' cromos', (total + porCaja) + ' cromos', (cajas + porCaja) + ' cromos', Math.max(2, total - cajas) + ' cromos']);
        return {
          subject: 'mates',
          type: 'choice',
          topic: 'Problema · Multiplicación',
          storyTitle: '🧩 Problema de Mates',
          story: n1 + ' tiene ' + cajas + ' sobres y en cada sobre hay ' + porCaja + ' cromos.',
          q: '¿Cuántos cromos tiene ' + n1 + ' en total?',
          options: opts,
          answer: opts.indexOf(total + ' cromos'),
          explanation: 'Multiplicamos ' + cajas + ' sobres × ' + porCaja + ' cromos = ' + total + ' cromos.'
        };
      } else if (type === 2) {
        const a = randInt(24, 58);
        const b = randInt(18, 49);
        const faltan = randInt(4, 15);
        const ans = a + b - faltan;
        const opts = shuffle([ans + ' alumnos', (a + b) + ' alumnos', (ans + 5) + ' alumnos', Math.max(10, ans - 4) + ' alumnos']);
        return {
          subject: 'mates',
          type: 'choice',
          topic: 'Problema · Dos operaciones',
          storyTitle: '🧩 Problema de clase',
          story: 'En 3º A hay ' + a + ' alumnos y en 3º B hay ' + b + ' alumnos. Hoy han ido al museo ' + faltan + ' alumnos.',
          q: '¿Cuántos alumnos quedan hoy en las dos clases?',
          options: opts,
          answer: opts.indexOf(ans + ' alumnos'),
          explanation: 'Sumamos ' + a + ' + ' + b + ' = ' + (a + b) + ' alumnos en total, y restamos ' + faltan + ': quedan ' + ans + ' alumnos.'
        };
      } else if (type === 3) {
        const tenia = randInt(65, 140);
        const gasto = randInt(23, 54);
        const queda = tenia - gasto;
        const opts = shuffle([queda + ' euros', (tenia + gasto) + ' euros', (queda + 10) + ' euros', Math.max(5, queda - 6) + ' euros']);
        return {
          subject: 'mates',
          type: 'choice',
          topic: 'Problema · Resta',
          storyTitle: '🧩 Ahorros en la hucha',
          story: n1 + ' tenía ' + tenia + ' euros en su hucha y compró un libro y un juego por ' + gasto + ' euros.',
          q: '¿Cuánto dinero le queda ahora?',
          options: opts,
          answer: opts.indexOf(queda + ' euros'),
          explanation: 'Restamos ' + tenia + ' − ' + gasto + ' = ' + queda + ' euros.'
        };
      } else {
        const base = randInt(6, 15);
        const mult = pick([2, 3]);
        const label = mult === 2 ? 'el doble' : 'el triple';
        const res = base * mult;
        const opts = shuffle([res + ' canicas', (base + mult) + ' canicas', (res + base) + ' canicas', Math.max(4, res - 3) + ' canicas']);
        return {
          subject: 'mates',
          type: 'choice',
          topic: 'Problema · Doble y triple',
          storyTitle: '🧩 Juego en el patio',
          story: n1 + ' tiene ' + base + ' canicas y ' + n2 + ' tiene ' + label + ' de canicas que ' + n1 + '.',
          q: '¿Cuántas canicas tiene ' + n2 + '?',
          options: opts,
          answer: opts.indexOf(res + ' canicas'),
          explanation: (mult === 2 ? 'El doble' : 'El triple') + ' de ' + base + ' es ' + base + ' × ' + mult + ' = ' + res + ' canicas.'
        };
      }
    }

    if (mode === 'suma') {
      const carry = Math.random() < 0.55;
      let a, b;
      if (!carry) {
        const d1 = randInt(1, 7), d2 = randInt(1, 9 - d1);
        const u1 = randInt(0, 8), u2 = randInt(1, 9 - u1);
        a = d1 * 10 + u1;
        b = d2 * 10 + u2;
        return {
          subject: 'mates', type: 'numeric', topic: 'Suma sin llevadas',
          q: 'Resuelve la suma:', expr: a + ' + ' + b, answer: a + b,
          explanation: 'Unidades: ' + u1 + ' + ' + u2 + ' = ' + (u1 + u2) + '. Decenas: ' + d1 + ' + ' + d2 + ' = ' + (d1 + d2) + '. Total: ' + (a + b) + '.'
        };
      } else {
        const three = Math.random() < 0.4;
        do {
          a = three ? randInt(125, 489) : randInt(28, 89);
          b = three ? randInt(48, 369) : randInt(16, 78);
        } while ((a % 10) + (b % 10) < 10);
        return {
          subject: 'mates', type: 'numeric', topic: 'Suma con llevadas',
          q: 'Resuelve la suma con llevadas:', expr: a + ' + ' + b, answer: a + b,
          explanation: (a % 10) + ' + ' + (b % 10) + ' = ' + ((a % 10) + (b % 10)) + ', escribimos las unidades y nos llevamos 1. Resultado: ' + (a + b) + '.'
        };
      }
    }

    if (mode === 'resta') {
      const carry = Math.random() < 0.55;
      let a, b;
      if (!carry) {
        const d1 = randInt(3, 9), d2 = randInt(1, d1 - 1);
        const u1 = randInt(2, 9), u2 = randInt(1, u1);
        a = d1 * 10 + u1;
        b = d2 * 10 + u2;
        return {
          subject: 'mates', type: 'numeric', topic: 'Resta sin llevadas',
          q: 'Resuelve la resta:', expr: a + ' − ' + b, answer: a - b,
          explanation: 'Unidades: ' + u1 + ' − ' + u2 + ' = ' + (u1 - u2) + '. Decenas: ' + d1 + ' − ' + d2 + ' = ' + (d1 - d2) + '. Total: ' + (a - b) + '.'
        };
      } else {
        do {
          a = randInt(42, 95);
          b = randInt(16, 69);
        } while (a <= b + 10 || (a % 10) >= (b % 10));
        return {
          subject: 'mates', type: 'numeric', topic: 'Resta con llevadas',
          q: 'Resuelve la resta con llevadas:', expr: a + ' − ' + b, answer: a - b,
          explanation: 'Pedimos 1 decena: en las unidades ' + (10 + (a % 10)) + ' − ' + (b % 10) + ' = ' + ((10 + (a % 10)) - (b % 10)) + '. Resultado: ' + (a - b) + '.'
        };
      }
    }

    const tChoice = state.selectedMatesTable || 'all';
    const fa = tChoice === 'all' ? randInt(1, 10) : parseInt(tChoice, 10);
    const fb = randInt(1, 10);
    return {
      subject: 'mates', type: 'numeric',
      topic: tChoice === 'all' ? 'Tablas de multiplicar' : ('Tabla del ' + fa),
      q: 'Calcula la multiplicación:', expr: fa + ' × ' + fb, answer: fa * fb,
      explanation: fa + ' × ' + fb + ' = ' + (fa * fb) + '.'
    };
  }
};
