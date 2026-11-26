/* =========================================================================
   ASIGNATURA: CONOCIMIENTO DEL MEDIO (asignaturas/cmedio.js)
   ========================================================================= */
window.ASIGNATURAS_MODULOS.cmedio = {
  id: 'cmedio',
  name: 'C. Medio',
  icon: '🌍',
  desc: 'Cuerpo, animales, plantas y Tierra',
  bg: 'bg-cmedio',

  studyTitle: '🌍 Repaso de Conocimiento del Medio',
  studyBlocks: {
    cuerpo: {
      label: '🫀 Cuerpo y Sentidos',
      title: '🫀 Órganos y sentidos del cuerpo humano',
      items: [
        { es: 'Bombea la sangre por todo el cuerpo', va: 'El corazón' },
        { es: 'Toman oxígeno del aire al respirar', va: 'Los pulmones' },
        { es: 'Huesos que protegen el cerebro', va: 'El cráneo' },
        { es: 'Órgano del sentido del gusto', va: 'La lengua' },
        { es: 'Órgano del sentido del tacto', va: 'La piel' },
        { es: 'Rotación de la Tierra (día y noche)', va: '24 horas (1 día)' },
        { es: 'Traslación alrededor del Sol (estaciones)', va: '365 días (1 año)' }
      ]
    },
    naturaleza: {
      label: '🐾 Animales y Plantas',
      title: '🐾 Clasificación de seres vivos',
      items: [
        { es: 'Tienen columna vertebral y esqueleto', va: 'Vertebrados' },
        { es: 'Nacen del vientre y maman leche', va: 'Mamíferos' },
        { es: 'Tienen plumas, pico y dos alas', va: 'Aves' },
        { es: 'Cuántas patas tienen los insectos', va: '6 patas' },
        { es: 'Fabrican alimento con luz del sol', va: 'Fotosíntesis' },
        { es: 'Estados del agua en la naturaleza', va: 'Sólido, líquido, gas' }
      ]
    }
  },

  questions: [
    { t: 'El cuerpo humano', q: '¿Qué órgano bombea la sangre por todo nuestro cuerpo?', o: ['El corazón', 'Los pulmones', 'El estómago', 'El hígado'], a: 0, e: 'El corazón impulsa la sangre a través de los vasos sanguíneos.' },
    { t: 'El cuerpo humano', q: '¿Qué órganos usamos para respirar y tomar oxígeno del aire?', o: ['Los pulmones', 'Los riñones', 'Los intestinos', 'Los músculos'], a: 0, e: 'Los pulmones absorben el oxígeno al inspirar.' },
    { t: 'El cuerpo humano', q: '¿Qué parte del cuerpo protege el cerebro?', o: ['El cráneo', 'Las costillas', 'El fémur', 'La pelvis'], a: 0, e: 'Los huesos del cráneo protegen el cerebro.' },
    { t: 'Los sentidos', q: '¿Cuál es el órgano del sentido del gusto?', o: ['La lengua', 'La nariz', 'El oído', 'La piel'], a: 0, e: 'En la lengua están las papilas gustativas.' },
    { t: 'Los sentidos', q: '¿Qué sentido nos permite notar si algo está frío, caliente, suave o áspero?', o: ['El tacto (piel)', 'La vista', 'El olfato', 'El oído'], a: 0, e: 'La piel es el órgano del sentido del tacto.' },
    { t: 'Alimentación', q: '¿Qué alimentos debemos tomar varias veces al día porque tienen muchas vitaminas?', o: ['Frutas y verduras', 'Golosinas y refrescos', 'Patatas fritas de bolsa', 'Bollería industrial'], a: 0, e: 'Las frutas y verduras aportan vitaminas, fibra y agua.' },
    { t: 'Animales vertebrados', q: '¿Qué tienen todos los animales vertebrados?', o: ['Columna vertebral y esqueleto interno', 'Plumas de colores', 'Branquias para el agua', 'Ocho patas'], a: 0, e: 'Los vertebrados tienen esqueleto con columna vertebral.' },
    { t: 'Mamíferos', q: '¿Cómo nacen y se alimentan al principio los mamíferos?', o: ['Nacen del vientre de su madre y maman leche', 'Nacen de huevos en el agua', 'Nacen de semillas', 'Tienen escamas duras'], a: 0, e: 'Los mamíferos son vivíparos y maman leche.' },
    { t: 'Aves', q: '¿De qué está cubierto el cuerpo de las aves?', o: ['De plumas', 'De escamas', 'De pelo', 'De piel desnuda'], a: 0, e: 'Las aves tienen plumas, pico y dos alas.' },
    { t: 'Anfibios', q: '¿A qué grupo pertenecen las ranas y las salamandras?', o: ['Anfibios', 'Reptiles', 'Peces', 'Insectos'], a: 0, e: 'Los anfibios viven cerca del agua y sufren metamorfosis.' },
    { t: 'Reptiles', q: '¿Cómo se desplazan las serpientes y los lagartos?', o: ['Reptando o arrastrándose con patas muy cortas', 'Volando alto', 'Nadando con aletas', 'Saltando con alas'], a: 0, e: 'Los reptiles tienen escamas y reptan.' },
    { t: 'Invertebrados', q: '¿Cuántas patas tienen los insectos como la hormiga o la abeja?', o: ['6 patas', '8 patas', '4 patas', '10 patas'], a: 0, e: 'Todos los insectos tienen 6 patas y suelen tener antenas.' },
    { t: 'Las plantas', q: '¿Cómo se llama el proceso por el que las plantas fabrican su alimento con luz solar?', o: ['Fotosíntesis', 'Respiración', 'Evaporación', 'Germinación'], a: 0, e: 'Con luz del sol, agua, aire y sales minerales hacen la fotosíntesis.' },
    { t: 'Partes de la planta', q: '¿Qué parte de la planta se transforma en el fruto que contiene las semillas?', o: ['La flor', 'La raíz', 'El tallo', 'La corteza'], a: 0, e: 'Tras la polinización, la flor da lugar al fruto.' },
    { t: 'El agua', q: '¿En qué tres estados podemos encontrar el agua en la naturaleza?', o: ['Sólido, líquido y gaseoso', 'Duro, blando y dulce', 'Caliente, templado y salado', 'Río, nube y piedra'], a: 0, e: 'Hielo (sólido), agua líquida y vapor de agua (gaseoso).' },
    { t: 'Ciclo del agua', q: '¿Qué ocurre cuando el vapor de agua sube, se enfría y forma las nubes?', o: ['Condensación', 'Fusión', 'Filtración', 'Erosión'], a: 0, e: 'Al enfriarse, el vapor se condensa en gotitas formando nubes.' },
    { t: 'El aire y el tiempo', q: '¿Cómo se llama el aire en movimiento?', o: ['Viento', 'Granizo', 'Niebla', 'Rocío'], a: 0, e: 'El viento es aire que se desplaza.' },
    { t: 'El Sistema Solar', q: '¿Qué planeta es conocido como el "planeta azul" por la gran cantidad de agua que tiene?', o: ['La Tierra', 'Marte', 'Mercurio', 'Saturno'], a: 0, e: 'La mayor parte de la superficie de la Tierra está cubierta de agua.' },
    { t: 'La Tierra', q: '¿Cuánto tarda la Tierra en dar una vuelta completa sobre sí misma (rotación)?', o: ['24 horas (1 día)', '365 días (1 año)', '7 días', '12 horas'], a: 0, e: 'La rotación dura 24 horas y produce el día y la noche.' },
    { t: 'La Tierra', q: '¿Qué origina el movimiento de traslación de la Tierra alrededor del Sol?', o: ['Las cuatro estaciones del año', 'El día y la noche', 'Las olas del mar', 'Los terremotos'], a: 0, e: 'La traslación dura 365 días y da lugar a primavera, verano, otoño e invierno.' },
    { t: 'Paisajes', q: '¿Cómo se llama un conjunto de montañas alineadas?', o: ['Cordillera o sierra', 'Llanura', 'Archipiélago', 'Bahía'], a: 0, e: 'Varias montañas unidas forman una sierra o cordillera.' },
    { t: 'Paisajes de costa', q: '¿Cómo se llama un conjunto de islas cercanas entre sí?', o: ['Archipiélago', 'Península', 'Cabo', 'Golfo'], a: 0, e: 'Por ejemplo, las Islas Baleares y las Islas Canarias son archipiélagos.' },
    { t: 'Los ríos', q: '¿Cómo se llama el lugar donde un río termina y entrega sus aguas al mar?', o: ['Desembocadura', 'Nacimiento', 'Afluente', 'Meandro'], a: 0, e: 'Un río nace en la montaña y acaba en su desembocadura.' },
    { t: 'La localidad', q: '¿Qué servicio municipal se encarga de apagar incendios y rescatar personas?', o: ['Los bomberos', 'Los jardineros', 'Los carteros', 'Los bibliotecarios'], a: 0, e: 'Los bomberos actúan en emergencias e incendios.' }
  ]
};
