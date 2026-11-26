/* =========================================================================
   ASIGNATURA: LECTURA COMPRENSIVA (asignaturas/lectura.js)
   ========================================================================= */
window.ASIGNATURAS_MODULOS.lectura = {
  id: 'lectura',
  name: 'Lectura',
  icon: '📚',
  desc: 'Cuentos nuevos en cada partida',
  bg: 'bg-lectura',

  generateQuestion: function () {
    const { randInt, pick, shuffle } = window.APP_UTILS;
    const template = randInt(1, 4);
    const chars = ['Nora', 'Lucas', 'Martina', 'Hugo', 'Valeria', 'Mateo', 'Clara', 'Leo'];
    const name = pick(chars);

    if (template === 1) {
      const lugares = ['el bosque de pinos', 'la playa de arena dorada', 'el huerto del abuelo', 'la montaña nevada'];
      const objetos = ['una brújula antigua', 'un mapa escondido', 'una caja de madera', 'una llave dorada'];
      const colores = ['azul', 'roja', 'verde', 'amarilla'];
      const lugar = pick(lugares);
      const objeto = pick(objetos);
      const color = pick(colores);

      const text = 'El sábado por la mañana, ' + name + ' fue de excursión a ' + lugar + ' con su mochila ' + color + '. Mientras caminaba junto a un arroyo, encontró ' + objeto + ' debajo de una piedra lisa.';
      const askObject = Math.random() < 0.5;
      if (askObject) {
        const opts = shuffle([objeto, 'un reloj de arena', 'una moneda de plata', 'un libro de cuentos']);
        return {
          subject: 'lectura', type: 'choice', topic: 'Comprensión lectora',
          storyTitle: '📖 La excursión de ' + name, story: text,
          q: '¿Qué encontró ' + name + ' debajo de una piedra?',
          options: opts, answer: opts.indexOf(objeto),
          explanation: 'En el texto se explica que encontró ' + objeto + '.'
        };
      } else {
        const opts = shuffle(['De color ' + color, 'De color naranja', 'De color morado', 'De color negro']);
        return {
          subject: 'lectura', type: 'choice', topic: 'Comprensión lectora',
          storyTitle: '📖 La excursión de ' + name, story: text,
          q: '¿De qué color era la mochila de ' + name + '?',
          options: opts, answer: opts.indexOf('De color ' + color),
          explanation: 'La primera frase dice que llevaba su mochila ' + color + '.'
        };
      }
    } else if (template === 2) {
      const animales = ['un gatito blanco', 'un perrito marrón', 'una tortuga pequeña', 'un conejo gris'];
      const comidas = ['zanahorias frescas', 'galletas crujientes', 'manzanas dulces', 'hojas de lechuga'];
      const horas = ['las cinco de la tarde', 'las diez de la mañana', 'las seis de la tarde'];
      const animal = pick(animales);
      const comida = pick(comidas);
      const hora = pick(horas);

      const text = name + ' cuida con mucho cariño a ' + animal + '. Todos los días a ' + hora + ' le prepara ' + comida + ' y juega un rato en el jardín antes de hacer los deberes.';
      const opts = shuffle([comida, 'helado de fresa', 'sopa caliente', 'pan con queso']);
      return {
        subject: 'lectura', type: 'choice', topic: 'Comprensión lectora',
        storyTitle: '📖 La mascota de ' + name, story: text,
        q: '¿Qué le prepara ' + name + ' a su mascota todos los días?',
        options: opts, answer: opts.indexOf(comida),
        explanation: 'El cuento indica que a ' + hora + ' le prepara ' + comida + '.'
      };
    } else if (template === 3) {
      const inventos = ['un robot que ordena lápices', 'un barco de papel impermeable', 'un molino de viento con cartón', 'un telescopio con tubos'];
      const dias = ['el viernes', 'el miércoles', 'el jueves'];
      const invento = pick(inventos);
      const dia = pick(dias);

      const text = 'Para la feria de ciencias del colegio que se celebraba ' + dia + ', ' + name + ' construyó ' + invento + '. Todos los compañeros de 3º aplaudieron mucho cuando vieron lo bien que funcionaba.';
      const opts = shuffle([dia, 'el lunes', 'el domingo', 'el sábado']);
      return {
        subject: 'lectura', type: 'choice', topic: 'Comprensión lectora',
        storyTitle: '📖 El invento de 3º', story: text,
        q: '¿Qué día se celebraba la feria de ciencias del colegio?',
        options: opts, answer: opts.indexOf(dia),
        explanation: 'La feria de ciencias se celebraba ' + dia + '.'
      };
    } else {
      const vehiculos = ['en tren', 'en bicicleta', 'en autobús', 'en barco'];
      const destinos = ['la casa de sus abuelos', 'el parque natural', 'el museo de dinosaurios', 'el observatorio'];
      const tiempos = ['dos horas', 'cuarenta minutos', 'una hora'];
      const vehiculo = pick(vehiculos);
      const destino = pick(destinos);
      const tiempo = pick(tiempos);

      const text = 'Durante las vacaciones, ' + name + ' viajó ' + vehiculo + ' hasta ' + destino + '. El trayecto duró ' + tiempo + ' y durante el camino estuvo dibujando paisajes en su cuaderno.';
      const opts = shuffle([tiempo, 'cinco horas', 'diez minutos', 'todo el día']);
      return {
        subject: 'lectura', type: 'choice', topic: 'Comprensión lectora',
        storyTitle: '📖 Un viaje especial', story: text,
        q: '¿Cuánto tiempo duró el trayecto?',
        options: opts, answer: opts.indexOf(tiempo),
        explanation: 'El texto dice que el trayecto duró ' + tiempo + '.'
      };
    }
  }
};
