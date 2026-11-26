/* =========================================================================
   ASIGNATURA: MATES (asignaturas/mates.js)
   - Módulo de 3º de Primaria: cálculo, tablas, geometría, medidas y problemas.
   ========================================================================= */
window.ASIGNATURAS_MODULOS.mates = {
  id: 'mates',
  name: 'Mates',
  icon: '🧮',
  desc: 'Cálculo, tablas y problemas',
  bg: 'bg-mates',

  // Fichas de repaso con botón Ocultar/Ver
  studyTitle: '🧮 Repaso de Mates (Trucos, Medidas, Geometría y Números)',
  studyBlocks: {
    dobles: {
      label: '✖️ Dobles y Triples',
      title: '✖️ Dobles (×2), Triples (×3) y Mitades (÷2)',
      practiceMode: 'multiplicar',
      items: [
        { es: 'El doble de 6 (6 × 2)', va: '12' },
        { es: 'El doble de 8 (8 × 2)', va: '16' },
        { es: 'El doble de 15 (15 × 2)', va: '30' },
        { es: 'El doble de 25 (25 × 2)', va: '50' },
        { es: 'El triple de 4 (4 × 3)', va: '12' },
        { es: 'El triple de 7 (7 × 3)', va: '21' },
        { es: 'El triple de 10 (10 × 3)', va: '30' },
        { es: 'La mitad de 20 (20 ÷ 2)', va: '10' },
        { es: 'La mitad de 36 (36 ÷ 2)', va: '18' },
        { es: 'La mitad de 100 (100 ÷ 2)', va: '50' }
      ]
    },
    medidas: {
      label: '📏 Medidas y Tiempo',
      title: '📏 Unidades de medida, reloj y dinero',
      practiceMode: 'problemas',
      items: [
        { es: '1 metro en centímetros', va: '100 cm' },
        { es: '1 kilómetro en metros', va: '1.000 m' },
        { es: '1 kilogramo en gramos', va: '1.000 g' },
        { es: 'Medio kilo (½ kg)', va: '500 g' },
        { es: 'Un cuarto de kilo (¼ kg)', va: '250 g' },
        { es: '1 litro en medios litros', va: '2 medios litros' },
        { es: '1 hora en minutos', va: '60 min' },
        { es: 'Media hora en minutos', va: '30 min' },
        { es: 'Un cuarto de hora', va: '15 min' },
        { es: 'Tres cuartos de hora', va: '45 min' },
        { es: '1 euro en céntimos', va: '100 cént.' },
        { es: '1 año en días (normal)', va: '365 días' }
      ]
    },
    numeros: {
      label: '🔢 Números y Valor',
      title: '🔢 Unidades, decenas, centenas y romanos',
      practiceMode: 'mixto',
      items: [
        { es: '1 decena (1 D)', va: '10 unidades' },
        { es: '1 centena (1 C)', va: '100 unidades' },
        { es: '1 unidad de millar (1 UM)', va: '1.000 unidades' },
        { es: 'Número anterior a 1.000', va: '999' },
        { es: 'Número posterior a 599', va: '600' },
        { es: 'Números pares acaban en...', va: '0, 2, 4, 6 u 8' },
        { es: 'Números impares acaban en...', va: '1, 3, 5, 7 o 9' },
        { es: 'Número romano V', va: '5' },
        { es: 'Número romano X', va: '10' },
        { es: 'Número romano L', va: '50' }
      ]
    },
    geometria: {
      label: '📐 Geometría',
      title: '📐 Polígonos, ángulos y cuerpos geométricos',
      practiceMode: 'mixto',
      items: [
        { es: 'Polígono de 3 lados', va: 'Triángulo' },
        { es: 'Polígono de 4 lados iguales', va: 'Cuadrado' },
        { es: 'Polígono de 5 lados', va: 'Pentágono' },
        { es: 'Polígono de 6 lados', va: 'Hexágono' },
        { es: 'Ángulo de 90° (esquina)', va: 'Ángulo recto' },
        { es: 'Ángulo menor que un recto', va: 'Ángulo agudo' },
        { es: 'Ángulo mayor que un recto', va: 'Ángulo obtuso' },
        { es: 'Cuerpo con forma de dado', va: 'Cubo' },
        { es: 'Cuerpo con forma de balón', va: 'Esfera' },
        { es: 'Cuerpo con forma de lata', va: 'Cilindro' }
      ]
    }
  },

  generateQuestion: function (state) {
    const { randInt, pick, shuffle } = window.APP_UTILS;
    let mode = state.matesMode || 'suma';
    if (mode === 'mixto') {
      mode = pick(['suma', 'resta', 'multiplicar', 'problemas', 'conceptos']);
    }

    if (mode === 'conceptos') {
      const qBank = [
        { t: 'Valor posicional', q: '¿Cuántas unidades son 4 centenas y 3 decenas?', o: ['430', '403', '340', '43'], a: 0, e: '4 centenas son 400 y 3 decenas son 30: 400 + 30 = 430.' },
        { t: 'Números pares e impares', q: '¿Cuál de estos números es IMPAR?', o: ['347', '512', '890', '644'], a: 0, e: '347 termina en 7, así que es un número impar.' },
        { t: 'Medidas de tiempo', q: '¿Cuántos minutos son una hora y media?', o: ['90 minutos', '75 minutos', '100 minutos', '65 minutos'], a: 0, e: '1 hora (60 min) + media hora (30 min) = 90 minutos.' },
        { t: 'Medidas de masa', q: '¿Cuántos gramos son un kilo y medio?', o: ['1.500 g', '1.050 g', '500 g', '2.000 g'], a: 0, e: '1 kg = 1.000 g y medio kilo = 500 g. En total 1.500 g.' },
        { t: 'Geometría · Polígonos', q: '¿Cuántos lados tiene un hexágono?', o: ['6 lados', '5 lados', '8 lados', '4 lados'], a: 0, e: 'Un hexágono es un polígono de 6 lados y 6 vértices.' },
        { t: 'Geometría · Ángulos', q: '¿Cómo se llama el ángulo que mide menos que un ángulo recto?', o: ['Ángulo agudo', 'Ángulo obtuso', 'Ángulo llano', 'Ángulo completo'], a: 0, e: 'Los ángulos menores de 90° (más cerrados que el recto) se llaman agudos.' },
        { t: 'Números romanos', q: '¿Qué número representa XIV en números romanos?', o: ['14', '16', '15', '19'], a: 0, e: 'X (10) + IV (4) = 14.' },
        { t: 'Cálculo mental · Mitad', q: '¿Cuál es la mitad de 48?', o: ['24', '22', '26', '96'], a: 0, e: 'La mitad de 40 es 20 y la mitad de 8 es 4: 20 + 4 = 24.' },
        { t: 'Dinero · Euros', q: 'Si tienes 3 monedas de 50 céntimos, ¿cuánto dinero tienes?', o: ['1 euro y 50 céntimos', '1 euro', '2 euros', '50 céntimos'], a: 0, e: '50 + 50 + 50 = 150 céntimos, que es 1 euro y 50 céntimos.' },
        { t: 'División exacta · Reparto', q: 'Si repartes 24 caramelos en partes iguales entre 4 amigos, ¿cuántos tocan a cada uno?', o: ['6 caramelos', '5 caramelos', '8 caramelos', '4 caramelos'], a: 0, e: '24 ÷ 4 = 6, porque 4 × 6 = 24.' }
      ];
      const item = pick(qBank);
      const correctText = item.o[item.a];
      const opts = shuffle(item.o);
      return {
        subject: 'mates',
        type: 'choice',
        topic: item.t,
        q: item.q,
        options: opts,
        answer: opts.indexOf(correctText),
        explanation: item.e
      };
    }

    if (mode === 'problemas') {
      const names = ['Hugo', 'Sofía', 'Leo', 'Martina', 'Lucas', 'Valeria', 'Mateo', 'Lucía', 'Daniel', 'Carla'];
      const n1 = pick(names);
      let n2 = pick(names);
      while (n2 === n1) n2 = pick(names);

      const type = randInt(1, 5);
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
      } else if (type === 4) {
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
      } else {
        const amigos = randInt(3, 6);
        const cadaUno = randInt(4, 9);
        const total = amigos * cadaUno;
        const opts = shuffle([cadaUno + ' lápices', (cadaUno + 2) + ' lápices', (total - amigos) + ' lápices', Math.max(2, cadaUno - 1) + ' lápices']);
        return {
          subject: 'mates',
          type: 'choice',
          topic: 'Problema · Reparto (División)',
          storyTitle: '🧩 Material de clase',
          story: 'La profe reparte ' + total + ' lápices en partes iguales entre ' + amigos + ' equipos.',
          q: '¿Cuántos lápices recibe cada equipo?',
          options: opts,
          answer: opts.indexOf(cadaUno + ' lápices'),
          explanation: 'Repartimos ' + total + ' ÷ ' + amigos + ' = ' + cadaUno + ' lápices por equipo.'
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
