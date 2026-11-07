export type Color = "verde" | "amarillo" | "rojo";
export type Sistema = "episodica" | "operativa" | "semantica" | "procesual";
export type Bandas = { V: [number, number]; A: [number, number]; R: [number, number] };
export type TipoRespuesta =
  | "checklist"
  | "dosEnsayos"
  | "matriz"
  | "reconocimiento"
  | "series"
  | "trazos"
  | "auditiva"
  | "interferencia"
  | "fluidez"
  | "lectura"
  | "redaccion"
  | "semejanzas"
  | "modos"
  | "motora"
  | "imitacion";
export type EdmItem = {
  orden: number;
  casillas: number[];
  sistema: Sistema;
  dimension: string;
  habilidad: string;
  nombre: string;
  instruccionEvaluador: string;
  consigna: string;
  estimulos?: { imagen?: string; imagenes?: string[]; segundos?: number };
  respuesta: {
    tipo: TipoRespuesta;
    opciones?: string[];
    ayudas?: string[];
    objetivos?: string[];
    series?: string[];
    ejemplo?: string;
    bloqueA?: string[];
    bloqueB?: string[];
  };
  max: number;
  bandas: Bandas;
  provisional?: boolean;
  provisionalSecundaria?: boolean;
  reglaInterrupcion?: string;
  registraMovimiento?: "26a" | "26b" | "26c" | "26d" | "26e";
  ia?: "dibujo_copia" | "dibujo_memoria" | "fluidez" | "video";
  bandasSecundarias?: Bandas;
  aValidar?: string;
};
const b = (v: [number, number], a: [number, number], r: [number, number]): Bandas => ({ V: v, A: a, R: r });
const palabras = ["PERRO", "MANZANA", "DEDO", "GALLINA", "PIE", "UVA"];
const nombres = ["PEDRO", "CARLA", "SANTIAGO", "REGINA", "MATEO", "MARCELO", "SOFÍA", "FLAVIA"];
const serie = [
  "RELOJ",
  "LIBRO",
  "CAMISA",
  "LÁPIZ",
  "CUCHARA",
  "CUADRO",
  "TERMÓMETRO",
  "VASO",
  "CEPILLO",
  "CORREA",
].map((x, i, a) => `Serie ${i + 1}: AYER FUI A LA TIENDA Y COMPRÉ: ${a.slice(0, i + 1).join(", ")}`);
const datos: Omit<EdmItem, "orden">[] = [
  {
    casillas: [3],
    sistema: "episodica",
    dimension: "Orientación",
    habilidad: "Identificación · Persona",
    nombre: "Orientación personal",
    instruccionEvaluador:
      "Explique que debe registrar preguntas sencillas; acompañe la explicación con gestos respetuosos.",
    consigna:
      "A continuación le voy a hacer algunas preguntas, muchas de ellas parecen muy simples, pero necesito hacerlas para tenerlas registradas. Contésteme lo mejor que pueda. ¿Cuál es su nombre? ¿Cuál es su apellido? ¿Qué edad tiene?",
    respuesta: {
      tipo: "checklist",
      opciones: ["¿Cuál es su nombre?", "¿Cuál es su apellido?", "¿Qué edad tiene?"],
    },
    max: 3,
    bandas: b([3, 3], [2, 2], [0, 1]),
    provisional: true,
  },
  {
    casillas: [2],
    sistema: "episodica",
    dimension: "Orientación",
    habilidad: "Espacio",
    nombre: "Orientación espacial",
    instruccionEvaluador: "Pregunte cada dato por separado.",
    consigna: "Bien, ahora continuamos con más preguntas. Empezamos.",
    respuesta: {
      tipo: "checklist",
      opciones: [
        "¿En qué lugar estamos?",
        "¿En qué piso?",
        "¿Cuál es el nombre de la calle?",
        "¿En qué departamento, provincia o ciudad?",
        "¿En qué país?",
      ],
    },
    max: 5,
    bandas: b([5, 5], [3, 4], [0, 2]),
    provisional: true,
  },
  {
    casillas: [4],
    sistema: "episodica",
    dimension: "Orientación",
    habilidad: "Identificación · Remota",
    nombre: "Identificación remota",
    instruccionEvaluador: "Marque cada respuesta correcta. Las respuestas esperadas se muestran como ayuda.",
    consigna: "Seguimos con unas preguntas más.",
    respuesta: {
      tipo: "checklist",
      opciones: [
        "¿En qué fecha es Navidad?",
        "¿Qué se festeja el 6 de agosto?",
        "¿Cuántos días tiene enero?",
        "¿Qué se festeja el 24 de septiembre?",
        "¿Cuáles son los colores de la bandera boliviana?",
        "¿Cuántos departamentos tiene Bolivia?",
        "¿Quién fue Simón Bolívar?",
      ],
      ayudas: [
        "25 de diciembre",
        "Independencia de Bolivia",
        "31",
        "Aniversario de Santa Cruz",
        "Rojo, amarillo y verde",
        "9",
        "Libertador",
      ],
    },
    max: 7,
    bandas: b([6, 7], [4, 5], [0, 3]),
    provisional: true,
  },
  {
    casillas: [5],
    sistema: "operativa",
    dimension: "Atención",
    habilidad: "Cálculo y seguimiento · Progresión",
    nombre: "Días de la semana",
    instruccionEvaluador: "Marque los días dichos en el orden correcto.",
    consigna: "Nombre los días de la semana, del primero que es hábil al último.",
    respuesta: {
      tipo: "checklist",
      opciones: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
    },
    max: 7,
    bandas: b([6, 7], [4, 5], [0, 3]),
    reglaInterrupcion: "Anular si busca ayuda o vuelve a empezar más de dos veces.",
  },
  {
    casillas: [15],
    sistema: "operativa",
    dimension: "Codificación",
    habilidad: "Visoverbal sin interferencia",
    nombre: "Tarjeta de seis palabras (N°3)",
    instruccionEvaluador:
      "Muestre la tarjeta 12 segundos y registre las palabras recordadas. Repita el ensayo una vez.",
    consigna:
      "Ahora le voy a mostrar una tarjeta y usted debe tratar de memorizar las palabras que están ahí. Luego, me dirá qué palabras recuerda y más adelante se las volveré a preguntar.",
    estimulos: { imagen: "/edm/n3-palabras.png", segundos: 12 },
    respuesta: { tipo: "dosEnsayos", opciones: palabras },
    max: 12,
    bandas: b([10, 12], [6, 9], [0, 5]),
    provisional: true,
  },
  {
    casillas: [8],
    sistema: "operativa",
    dimension: "Atención",
    habilidad: "Reconocimiento · Detección visual",
    nombre: "Detección visual (N°1)",
    instruccionEvaluador:
      "Muestre la figura 12 segundos, retírela y dé un minuto para marcar la matriz. Registre los aciertos.",
    consigna:
      "Le voy a mostrar una tarjeta con una figura y luego una lámina con varias figuras; necesito que marque en la lámina todas las figuras iguales a la que le mostré. Revise fila por fila para que sea más sencillo.",
    estimulos: { imagen: "/edm/n1-estimulo.png", imagenes: ["/anexo1-response-edm.png"], segundos: 12 },
    respuesta: { tipo: "matriz" },
    max: 15,
    bandas: b([12, 15], [7, 11], [0, 6]),
    provisional: true,
    reglaInterrupcion:
      "Interrumpir a los 30 segundos sin respuestas correctas; de lo contrario, continuar hasta 1 minuto.",
  },
  {
    casillas: [30],
    sistema: "semantica",
    dimension: "Funciones ejecutivas",
    habilidad: "Evocación verbal por claves",
    nombre: "Evocación por categorías",
    instruccionEvaluador: "Pida las palabras por categoría; escriba las respuestas literales en notas.",
    consigna:
      "Le voy a ayudar un poco para que recuerde las palabras que leyó hace un momento en la tarjeta, entre ellas había: partes del cuerpo… frutas… animales.",
    respuesta: {
      tipo: "checklist",
      opciones: [
        "Cuerpo: DEDO",
        "Cuerpo: PIE",
        "Fruta: MANZANA",
        "Fruta: UVA",
        "Animal: PERRO",
        "Animal: GALLINA",
      ],
    },
    max: 6,
    bandas: b([5, 6], [3, 4], [0, 2]),
    provisional: true,
  },
  {
    casillas: [31],
    sistema: "semantica",
    dimension: "Funciones ejecutivas",
    habilidad: "Evocación por reconocimiento",
    nombre: "Reconocimiento de palabras",
    instruccionEvaluador:
      "Lea la lista y registre Sí o No. Reste una intrusión por cada distractor respondido Sí.",
    consigna:
      "Le voy a leer una lista de palabras, algunas de ellas pertenecen a las que usted memorizó anteriormente y otras no. Yo leeré una por una y usted dirá si escuchó antes la palabra o no.",
    respuesta: {
      tipo: "reconocimiento",
      opciones: [
        "PERRO",
        "BRAZO",
        "MANZANA",
        "ROJO",
        "PIE",
        "GATO",
        "MELÓN",
        "DEDO",
        "FLOR",
        "GALLINA",
        "MESA",
        "UVA",
      ],
      objetivos: palabras,
    },
    max: 6,
    bandas: b([5, 6], [3, 4], [0, 2]),
    provisional: true,
  },
  {
    casillas: [14],
    sistema: "operativa",
    dimension: "Codificación",
    habilidad: "Auditiva verbal numeral",
    nombre: "Memoria de números",
    instruccionEvaluador:
      "Lea la lista dos veces, sin cambiar el tono y con un segundo entre números. El orden de evocación no importa.",
    consigna:
      "Preste mucha atención y recuerde estos números, no los repita en voz alta, solo recuérdelos: 5, 15, 6, 8, 27, 11, 20, 30. ¿Qué números le acabo de decir?",
    respuesta: { tipo: "checklist", opciones: ["5", "15", "6", "8", "27", "11", "20", "30"] },
    max: 8,
    bandas: b([6, 8], [4, 5], [0, 3]),
    provisional: true,
    reglaInterrupcion: "Interrumpir si repite tres veces el mismo número o números errados.",
  },
  {
    casillas: [7],
    sistema: "operativa",
    dimension: "Atención",
    habilidad: "Cálculo y seguimiento · Seguimiento verbal",
    nombre: "Frase creciente",
    instruccionEvaluador: "Agregue una palabra por serie. Puntúe la última serie completa sin errores.",
    consigna:
      "Necesito que usted ponga atención a lo que voy a leer, ya que luego repetirá la misma frase más una palabra.",
    respuesta: { tipo: "series", series: serie },
    max: 10,
    bandas: b([8, 10], [5, 7], [0, 4]),
    provisional: true,
    reglaInterrupcion:
      "Interrumpir después de tres series fallidas consecutivas o de repetir tres veces seguidas la misma palabra.",
  },
  {
    casillas: [12],
    sistema: "operativa",
    dimension: "Codificación",
    habilidad: "Visoespacial compleja",
    nombre: "Copia de figura de Rey (N°2)",
    instruccionEvaluador:
      "Cada uno de los 18 trazos vale 2 si forma y ubicación son correctas; 1 si cumple un criterio; 0 si ninguno.",
    consigna:
      "Ahora necesito que copie la figura lo más parecida posible, porque más adelante le pediré que la dibuje de nuevo.",
    estimulos: { imagen: "/edm/n2-figura-rey.png" },
    respuesta: { tipo: "trazos" },
    max: 36,
    bandas: b([27, 36], [16, 26], [0, 15]),
    reglaInterrupcion: "Interrumpir tras más de un minuto sin copiar más de tres líneas.",
    ia: "dibujo_copia",
  },
  {
    casillas: [9],
    sistema: "operativa",
    dimension: "Atención",
    habilidad: "Reconocimiento · Detección auditiva",
    nombre: "Detección auditiva",
    instruccionEvaluador:
      "Practique el ejemplo. Aplique bloque A; si falla alguna serie, pase al bloque B. Registre si da el golpe aunque sea incorrecto.",
    consigna:
      "Le voy a leer una lista de números y cada vez que escuche un 2 e inmediatamente un 5, usted deberá dar un pequeño golpe en la mesa.",
    respuesta: {
      tipo: "auditiva",
      ejemplo: "7-8-2-5-1-3-9-7-2-6-9-3-8-2-3-4-5-2-5",
      bloqueA: ["7-2-5-1-6-3-8-4-9-1-3-6-9", "1-7-2-6-2-5-4-3-8-2-9-4-1"],
      bloqueB: ["6-2-7-1-9-5-4-3-6-1-8-2-5", "4-3-6-9-7-3-1-8-2-5-4-6-3", "8-1-7-2-5-4-6-9-3-4-8-1-3"],
    },
    max: 3,
    bandas: b([3, 3], [2, 2], [0, 1]),
    provisional: true,
    registraMovimiento: "26a",
  },
  {
    casillas: [28],
    sistema: "semantica",
    dimension: "Funciones ejecutivas",
    habilidad: "Representación visoespacial",
    nombre: "Figura de memoria",
    instruccionEvaluador: "Sin mostrar de nuevo la figura, califique sus 18 trazos igual que en la copia.",
    consigna:
      "Hace un momento copió una figura con figuras geométricas; ahora recuérdela y vuelva a hacerla en esta hoja.",
    respuesta: { tipo: "trazos" },
    max: 36,
    bandas: b([27, 36], [16, 26], [0, 15]),
    ia: "dibujo_memoria",
  },
  {
    casillas: [16, 20],
    sistema: "operativa",
    dimension: "Codificación",
    habilidad: "Visoverbal con interferencia · Lectura",
    nombre: "Nombres con interferencia (N°4)",
    instruccionEvaluador:
      "Muestre la tarjeta 16 segundos. Registre lectura en voz alta y evocación tras preguntar 5×4.",
    consigna:
      "Lea en voz alta estas palabras y trate de memorizarlas hasta que yo le diga; después me responderá una operación y al final me dirá qué palabras recuerda. Ahora dígame: ¿cuánto es 5×4? Ahora dígame qué palabras acaba de leer.",
    estimulos: { imagen: "/edm/n4-nombres.png", segundos: 16 },
    respuesta: { tipo: "interferencia", opciones: nombres },
    max: 8,
    bandas: b([6, 8], [4, 5], [0, 3]),
    bandasSecundarias: b([6, 8], [4, 5], [0, 3]),
    provisionalSecundaria: true,
    reglaInterrupcion: "Suspender al segundo intento fallido de evocación.",
  },
  {
    casillas: [17],
    sistema: "semantica",
    dimension: "Lenguaje",
    habilidad: "Evocación verbal · Denominación",
    nombre: "Denominación de láminas (N°5)",
    instruccionEvaluador: "Muestre las ocho láminas y escriba la respuesta literal en notas.",
    consigna:
      "A continuación voy a mostrarle unas figuras y necesito que me indique qué es lo que ve en cada una.",
    estimulos: {
      imagenes: ["vaca", "dedo", "reloj", "charango", "llave", "bicicleta", "tambor", "serpiente"].map(
        (x, i) => `/edm/n5-${i + 1}-${x}.png`,
      ),
    },
    respuesta: {
      tipo: "checklist",
      opciones: ["VACA", "DEDO", "RELOJ", "CHARANGO", "LLAVE", "BICICLETA", "TAMBOR", "SERPIENTE"],
    },
    max: 8,
    bandas: b([6, 8], [4, 5], [0, 3]),
    reglaInterrupcion: "Anular al tercer error consecutivo.",
  },
  {
    casillas: [18],
    sistema: "semantica",
    dimension: "Lenguaje",
    habilidad: "Evocación verbal · Repetición",
    nombre: "Repetición",
    instruccionEvaluador: "Diga una palabra o frase cada vez.",
    consigna: "Necesito que repita después de mí estas palabras.",
    respuesta: {
      tipo: "checklist",
      opciones: ["SOL", "VENTANA", "EL NIÑO LLORA", "EL HOMBRE CAMINA POR LA CALLE"],
    },
    max: 4,
    bandas: b([3, 4], [2, 2], [0, 1]),
    reglaInterrupcion: "Interrumpir a la tercera equivocación.",
  },
  {
    casillas: [19],
    sistema: "semantica",
    dimension: "Lenguaje",
    habilidad: "Evocación verbal · Comprensión",
    nombre: "Comprensión de órdenes (N°6)",
    instruccionEvaluador: "Explique la diferencia entre señalar y tocar. Muestre la lámina N°6.",
    consigna: "Ahora necesito que me indique con el dedo lo que le voy a pedir.",
    estimulos: { imagen: "/edm/n6-figuras.png" },
    respuesta: {
      tipo: "checklist",
      opciones: [
        "Señale el cuadrado pequeño",
        "Señale el círculo y un cuadrado",
        "Señale un círculo pequeño y un cuadrado grande",
        "Toque el círculo pequeño y luego el cuadrado grande",
        "Toque el círculo grande si hay un cuadrado pequeño",
        "Además de tocar los círculos, toque el cuadrado pequeño",
      ],
    },
    max: 6,
    bandas: b([5, 6], [3, 4], [0, 2]),
    reglaInterrupcion: "Suspender al tercer intento fallido.",
  },
  {
    casillas: [29],
    sistema: "semantica",
    dimension: "Funciones ejecutivas",
    habilidad: "Evocación verbal · Fluidez",
    nombre: "Fluidez verbal",
    instruccionEvaluador:
      "Un minuto por categoría. Cuente palabras válidas; excluya nombres propios y familias de palabras en F.",
    consigna:
      "Dígame la mayor cantidad de nombres de animales que recuerde hasta que le diga basta. Ahora dígame todas las palabras que empiezan por F que conozca, pero no familias de palabras ni nombres propios.",
    estimulos: { segundos: 60 },
    respuesta: { tipo: "fluidez" },
    max: 20,
    bandas: b([16, 20], [9, 15], [0, 8]),
    bandasSecundarias: b([12, 15], [7, 11], [0, 6]),
    provisional: true,
    ia: "fluidez",
  },
  {
    casillas: [21],
    sistema: "semantica",
    dimension: "Lectoescritura",
    habilidad: "Comprensión · Lectura",
    nombre: "Cierre los ojos (N°7)",
    instruccionEvaluador: "Entregue la tarjeta y registre lectura y acción por separado.",
    consigna: "Lea este papel en voz alta y haga lo que ahí se indica.",
    estimulos: { imagen: "/edm/n7-cierre-los-ojos.png" },
    respuesta: { tipo: "lectura", opciones: ["Lee en voz alta", "Realiza la acción"] },
    max: 2,
    bandas: b([2, 2], [1, 1], [0, 0]),
    provisional: true,
    registraMovimiento: "26b",
  },
  {
    casillas: [22],
    sistema: "semantica",
    dimension: "Lectoescritura",
    habilidad: "Redacción",
    nombre: "Escritura de oración",
    instruccionEvaluador: "Un punto por sujeto, verbo y predicado.",
    consigna: "En esta hoja escriba una oración con sujeto y predicado.",
    respuesta: { tipo: "redaccion", opciones: ["Sujeto", "Verbo", "Predicado"] },
    max: 3,
    bandas: b([3, 3], [2, 2], [0, 1]),
    provisional: true,
    registraMovimiento: "26c",
  },
  {
    casillas: [23],
    sistema: "semantica",
    dimension: "Lectoescritura",
    habilidad: "Seguimiento de órdenes · Copia",
    nombre: "Copia de frase (N°8)",
    instruccionEvaluador: "Puntúe cada palabra escrita correctamente.",
    consigna: "Necesito que copie lo escrito en esta tarjeta.",
    estimulos: { imagen: "/edm/n8-copia.png" },
    respuesta: { tipo: "checklist", opciones: ["LAS", "PAPAS", "CRECEN", "EN", "LA", "TIERRA"] },
    max: 6,
    bandas: b([5, 6], [3, 4], [0, 2]),
    registraMovimiento: "26d",
  },
  {
    casillas: [24],
    sistema: "semantica",
    dimension: "Lectoescritura",
    habilidad: "Seguimiento de órdenes · Dictado",
    nombre: "Dictado de frase",
    instruccionEvaluador: "Puntúe cada palabra escrita correctamente.",
    consigna: "Necesito que escriba lo siguiente: EL PERRO CAMINA POR LA CALLE.",
    respuesta: { tipo: "checklist", opciones: ["EL", "PERRO", "CAMINA", "POR", "LA", "CALLE"] },
    max: 6,
    bandas: b([5, 6], [3, 4], [0, 2]),
    registraMovimiento: "26e",
  },
  {
    casillas: [25],
    sistema: "semantica",
    dimension: "Discriminación",
    habilidad: "Conceptualización",
    nombre: "Semejanzas",
    instruccionEvaluador:
      "Verifique que comprenda las semejanzas; use rojo y amarillo = colores como ejemplo.",
    consigna:
      "¿En qué se parecen el rojo y el amarillo? Exacto, los dos son colores. Ahora dígame, ¿en qué se parecen…?",
    respuesta: {
      tipo: "semejanzas",
      opciones: ["NARANJA – PERA", "PERRO – CABALLO", "OJO – NARIZ (a validar)"],
    },
    max: 3,
    bandas: b([3, 3], [2, 2], [0, 1]),
    aValidar: "El tercer par es ilegible en el OCR; confirmar con protocolo original.",
  },
  {
    casillas: [26],
    sistema: "semantica",
    dimension: "Funciones ejecutivas",
    habilidad: "Cálculo y seguimiento · Abstracto",
    nombre: "Cálculo abstracto (N°9)",
    instruccionEvaluador:
      "Un minuto por operación. A oral; si falla, B con tarjetas; si aún falla, C con lápiz y papel. Mayoría = al menos 2 de 3.",
    consigna:
      "Necesito que usted me diga cuánto es… Ahora por favor, resuelva las operaciones que ve en estas tarjetas. Y ahora necesito que resuelva estos ejercicios haciendo el procedimiento en este papel.",
    estimulos: { imagenes: ["/edm/n9-1.png", "/edm/n9-2.png", "/edm/n9-3.png"] },
    respuesta: { tipo: "modos", opciones: ["13 + 15 = 28 (a validar)", "6 × 5 = 30", "20 − 12 = 8"] },
    max: 3,
    bandas: b([3, 3], [2, 2], [0, 1]),
    provisional: true,
    aValidar: "El texto indica 13+19 y la tarjeta 13+15; se usa la tarjeta.",
  },
  {
    casillas: [27],
    sistema: "semantica",
    dimension: "Funciones ejecutivas",
    habilidad: "Cálculo y seguimiento · Concreto",
    nombre: "Cálculo concreto (N°10)",
    instruccionEvaluador: "Use los modos A, B y C como en el ítem anterior; un minuto por problema.",
    consigna:
      "Ahora voy a leerle algunos problemas para que usted los resuelva. Ahora por favor, resuelva los siguientes problemas matemáticos. Y ahora necesito que resuelva estos ejercicios haciendo el procedimiento en este papel.",
    estimulos: { imagenes: ["/edm/n10-1.png", "/edm/n10-2.png", "/edm/n10-3.png"] },
    respuesta: {
      tipo: "modos",
      opciones: [
        "José tenía 12 Bs., recibió 9 y gastó 14. ¿Cuánto le queda? (7)",
        "¿Cuántas naranjas hay en dos docenas y media? (30)",
        "María tenía 49 manzanas y 7 amigos. ¿Cuántas le dio a cada uno? (7)",
      ],
    },
    max: 3,
    bandas: b([3, 3], [2, 2], [0, 1]),
    provisional: true,
  },
  {
    casillas: [33],
    sistema: "procesual",
    dimension: "Funciones ejecutivas",
    habilidad: "Seguimiento de órdenes · Producción motora",
    nombre: "Producción motora (calculada)",
    instruccionEvaluador:
      "No se aplica al paciente. Se calcula con los cinco movimientos observados en ítems anteriores.",
    consigna: "",
    respuesta: { tipo: "motora" },
    max: 10,
    bandas: b([9, 10], [6, 8], [0, 5]),
    provisional: true,
  },
  {
    casillas: [35],
    sistema: "procesual",
    dimension: "Funciones ejecutivas",
    habilidad: "Seguimiento de órdenes · Imitación",
    nombre: "Puño, filo, palma",
    instruccionEvaluador:
      "Muestre la secuencia con la mano derecha. Una vez aprendida, pida tres intentos con cada mano.",
    consigna: "Necesito que se fije bien en lo que voy a hacer con mi mano para que luego lo haga usted.",
    respuesta: {
      tipo: "imitacion",
      opciones: ["Izquierda 1", "Izquierda 2", "Izquierda 3", "Derecha 1", "Derecha 2", "Derecha 3"],
    },
    max: 6,
    bandas: b([5, 6], [3, 4], [0, 2]),
    ia: "video",
  },
];
export const EDM_ITEMS: EdmItem[] = datos.map((item, i) => ({ ...item, orden: i + 1 }));
