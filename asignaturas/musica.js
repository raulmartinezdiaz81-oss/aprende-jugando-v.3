/* =========================================================================
   ASIGNATURA: MÚSICA (asignaturas/musica.js)
   ========================================================================= */
window.ASIGNATURAS_MODULOS.musica = {
  id: 'musica',
  name: 'Música',
  icon: '🎵',
  desc: 'Notas, figuras e instrumentos',
  bg: 'bg-musica',

  studyTitle: '🎵 Repaso de Música (Figuras y Cualidades)',
  studyBlocks: {
    figuras: {
      label: '🎼 Figuras y Pentagrama',
      title: '🎼 Duración de las figuras musicales',
      items: [
        { es: 'La REDONDA dura...', va: '4 tiempos' },
        { es: 'La BLANCA dura...', va: '2 tiempos' },
        { es: 'La NEGRA dura...', va: '1 tiempo' },
        { es: 'La CORCHEA dura...', va: 'Medio tiempo (½)' },
        { es: 'Líneas del pentagrama', va: '5 líneas (de abajo a arriba)' },
        { es: 'Dónde nace la Clave de Sol', va: 'En la 2.ª línea' }
      ]
    },
    cualidades: {
      label: '🔊 Cualidades del sonido',
      title: '🔊 Las 4 cualidades del sonido',
      items: [
        { es: 'Diferencia agudo de grave', va: 'Altura' },
        { es: 'Diferencia fuerte de suave', va: 'Intensidad' },
        { es: 'Diferencia largo de corto', va: 'Duración' },
        { es: 'Identifica quién o qué suena', va: 'Timbre' }
      ]
    }
  },

  questions: [
    { t: 'Figuras musicales', q: '¿Cuántos tiempos (pulsos) dura una NEGRA?', o: ['1 tiempo', '2 tiempos', '4 tiempos', 'Medio tiempo'], a: 0, e: 'La negra vale 1 pulso.' },
    { t: 'Figuras musicales', q: '¿Cuántos tiempos dura una BLANCA?', o: ['2 tiempos', '1 tiempo', '3 tiempos', '4 tiempos'], a: 0, e: 'La blanca vale 2 pulsos.' },
    { t: 'Figuras musicales', q: '¿Cuántos tiempos dura una REDONDA?', o: ['4 tiempos', '2 tiempos', '1 tiempo', '6 tiempos'], a: 0, e: 'La redonda dura 4 pulsos.' },
    { t: 'Figuras musicales', q: '¿Cuántas CORCHEAS caben en 1 tiempo (una negra)?', o: ['2 corcheas', '4 corcheas', '1 corchea', '8 corcheas'], a: 0, e: 'Cada corchea dura medio tiempo: 2 corcheas = 1 negra.' },
    { t: 'El pentagrama', q: '¿Cuántas líneas tiene un pentagrama?', o: ['5 líneas', '4 líneas', '6 líneas', '3 líneas'], a: 0, e: 'El pentagrama tiene 5 líneas y 4 espacios.' },
    { t: 'El pentagrama', q: '¿Cómo se cuentan las líneas y espacios del pentagrama?', o: ['De abajo hacia arriba', 'De arriba hacia abajo', 'De derecha a izquierda', 'Desde el centro'], a: 0, e: 'Siempre se numeran de abajo hacia arriba (1.ª línea abajo).' },
    { t: 'Notas musicales', q: '¿Qué nota está justo después de FA en la escala ascendente?', o: ['SOL', 'MI', 'LA', 'RE'], a: 0, e: 'Do - Re - Mi - Fa - Sol - La - Si.' },
    { t: 'Notas musicales', q: '¿Qué nota va antes de RE?', o: ['DO', 'MI', 'FA', 'SI'], a: 0, e: 'La escala empieza en Do y sigue con Re.' },
    { t: 'Clave de Sol', q: '¿En qué línea del pentagrama se empieza a dibujar la Clave de Sol?', o: ['En la segunda línea', 'En la quinta línea', 'En la primera línea', 'Fuera del pentagrama'], a: 0, e: 'La Clave de Sol nace en la 2.ª línea y ahí coloca la nota Sol.' },
    { t: 'Familia de cuerda', q: '¿Cuál de estos instrumentos es de CUERDA FROTADA?', o: ['Violonchelo', 'Trompeta', 'Flauta dulce', 'Pandereta'], a: 0, e: 'El violonchelo se toca frotando sus cuerdas con un arco.' },
    { t: 'Familia de cuerda', q: '¿Cómo se toca el arpa o la guitarra?', o: ['Pulsando o rasgueando las cuerdas', 'Soplando por una boquilla', 'Golpeando con baquetas', 'Agitando cascabeles'], a: 0, e: 'Son instrumentos de cuerda pulsada.' },
    { t: 'Familia de viento', q: '¿Cuál de estos instrumentos pertenece a la familia de VIENTO?', o: ['Clarinete', 'Violín', 'Xilófono', 'Triángulo'], a: 0, e: 'El clarinete suena al soplar aire por su tubo.' },
    { t: 'Familia de viento', q: '¿A qué familia pertenece la trompeta?', o: ['Viento metal', 'Cuerda pulsada', 'Percusión', 'Teclado'], a: 0, e: 'La trompeta es un instrumento de viento metal.' },
    { t: 'Familia de percusión', q: '¿Cuál de estos instrumentos es de PERCUSIÓN?', o: ['Bombo', 'Flauta travesera', 'Oboe', 'Contrabajo'], a: 0, e: 'El bombo suena al golpearlo con una maza.' },
    { t: 'Cualidades del sonido', q: '¿Qué cualidad diferencia un sonido AGUDO de uno GRAVE?', o: ['La altura', 'La intensidad', 'La duración', 'El timbre'], a: 0, e: 'La altura indica si el sonido es agudo o grave.' },
    { t: 'Cualidades del sonido', q: '¿Qué cualidad diferencia un sonido FUERTE de uno SUAVE?', o: ['La intensidad', 'La altura', 'La duración', 'El compás'], a: 0, e: 'La intensidad es el volumen (fuerte o suave).' },
    { t: 'Cualidades del sonido', q: '¿Qué cualidad nos permite distinguir la voz de mamá de la voz de papá?', o: ['El timbre', 'La duración', 'La altura', 'El silencio'], a: 0, e: 'El timbre identifica qué instrumento o persona produce el sonido.' },
    { t: 'Cualidades del sonido', q: '¿Qué cualidad indica si un sonido es LARGO o CORTO?', o: ['La duración', 'La intensidad', 'El timbre', 'La altura'], a: 0, e: 'La duración mide el tiempo que dura el sonido.' }
  ]
};
