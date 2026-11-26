/* =========================================================================
   ASIGNATURA: PLÁSTICA (asignaturas/plastica.js)
   ========================================================================= */
window.ASIGNATURAS_MODULOS.plastica = {
  id: 'plastica',
  name: 'Plástica',
  icon: '🎨',
  desc: 'Colores, mezclas y formas',
  bg: 'bg-plastica',

  studyTitle: '🎨 Repaso de Plástica (Colores y Geometría)',
  studyBlocks: {
    colores: {
      label: '🌈 Mezcla de colores',
      title: '🌈 Colores primarios, secundarios, cálidos y fríos',
      items: [
        { es: 'Amarillo + Azul =', va: 'Verde' },
        { es: 'Rojo + Amarillo =', va: 'Naranja' },
        { es: 'Azul + Rojo =', va: 'Violeta / Morado' },
        { es: 'Colores cálidos', va: 'Rojo, naranja, amarillo' },
        { es: 'Colores fríos', va: 'Azul, verde, violeta' },
        { es: 'Rojo + Blanco =', va: 'Rosa' }
      ]
    }
  },

  questions: [
    { t: 'Colores primarios', q: '¿Cuáles son los tres colores PRIMARIOS?', o: ['Amarillo, azul (cian) y rojo (magenta)', 'Verde, naranja y morado', 'Blanco, negro y gris', 'Rosa, marrón y verde'], a: 0, e: 'Con los tres primarios se pueden mezclar los demás colores.' },
    { t: 'Colores secundarios', q: '¿Qué color sale al mezclar AMARILLO + AZUL?', o: ['Verde', 'Naranja', 'Violeta', 'Marrón'], a: 0, e: 'Amarillo y azul forman el verde.' },
    { t: 'Colores secundarios', q: '¿Qué color sale al mezclar ROJO + AMARILLO?', o: ['Naranja', 'Verde', 'Azul', 'Morado'], a: 0, e: 'Rojo y amarillo forman el naranja.' },
    { t: 'Colores secundarios', q: '¿Qué color sale al mezclar AZUL + ROJO?', o: ['Violeta / Morado', 'Verde', 'Naranja', 'Amarillo'], a: 0, e: 'Azul y rojo forman el violeta o morado.' },
    { t: 'Colores cálidos', q: '¿Cuál de estos colores es CÁLIDO?', o: ['Naranja', 'Azul', 'Verde oscuro', 'Violeta'], a: 0, e: 'Rojo, naranja y amarillo son colores cálidos.' },
    { t: 'Colores fríos', q: '¿Cuál de estos colores es FRÍO?', o: ['Azul', 'Rojo', 'Amarillo', 'Naranja'], a: 0, e: 'Azul, verde y violeta transmiten frescor.' },
    { t: 'Tonos y luz', q: '¿Qué ocurre si mezclamos color ROJO con pintura BLANCA?', o: ['Obtenemos color rosa (un tono más claro)', 'Obtenemos negro', 'Obtenemos verde', 'Se vuelve transparente'], a: 0, e: 'El blanco aclara los colores.' },
    { t: 'Geometría', q: '¿Cuántos lados tiene un HEXÁGONO?', o: ['6 lados', '5 lados', '4 lados', '8 lados'], a: 0, e: 'Hexa significa seis: el hexágono tiene 6 lados.' },
    { t: 'Geometría', q: '¿Cuántos lados tiene un PENTÁGONO?', o: ['5 lados', '6 lados', '3 lados', '4 lados'], a: 0, e: 'Penta significa cinco: 5 lados.' },
    { t: 'Geometría', q: '¿Qué figura tiene 4 lados iguales y 4 ángulos rectos?', o: ['Cuadrado', 'Triángulo', 'Romboide', 'Círculo'], a: 0, e: 'El cuadrado tiene los 4 lados exactamente iguales.' },
    { t: 'Simetría', q: 'Una mariposa con las dos alas idénticas es un ejemplo de...', o: ['Simetría', 'Perspectiva aérea', 'Textura rugosa', 'Collage'], a: 0, e: 'Ambos lados coinciden respecto al eje central.' },
    { t: 'Texturas', q: 'El algodón o la lana tienen una textura...', o: ['Suave y blanda', 'Áspera como una lija', 'Dura como el hierro', 'Metálica'], a: 0, e: 'Las texturas pueden ser suaves, ásperas, lisas o rugosas.' },
    { t: 'Técnicas', q: '¿Cómo se llama la técnica de pegar recortes de papeles, revistas o telas?', o: ['Collage', 'Acuarela', 'Grabado', 'Modelado'], a: 0, e: 'El collage combina distintos materiales pegados.' },
    { t: 'Herramientas', q: '¿Qué herramienta sirve para trazar círculos perfectos?', o: ['El compás', 'La regla recta', 'La tijera', 'El sacapuntas'], a: 0, e: 'El compás dibuja circunferencias.' },
    { t: 'Escultura', q: '¿Qué material moldeable usamos en clase para hacer figuras en 3D con volumen?', o: ['Plastilina o barro', 'Acuarela líquida', 'Tiza', 'Carboncillo'], a: 0, e: 'El modelado con barro o plastilina crea volumen.' },
    { t: 'Líneas', q: '¿Cómo son las líneas en zigzag de un rayo o una sierra?', o: ['Líneas quebradas', 'Líneas curvas', 'Líneas paralelas rectas', 'Círculos'], a: 0, e: 'Las líneas quebradas cambian de dirección formando picos.' }
  ]
};
