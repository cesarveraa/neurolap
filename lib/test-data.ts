export const testSections = [
  { id: "memoria-procesual-1", 
    title: "Memoria Procesual I", 
    items: [
      {
        itemId: "MP-1",
        title: "Memoria Procesual – Seguimiento de Órdenes (Imitación: puño, filo, palma)",
        instruction:
          "Voy a realizar tres movimientos con mi mano derecha sobre la mesa (puño, filo, palma). Obsérvelo bien y luego haga usted lo mismo. Intentaremos tres veces con cada mano.",
        rubricNote: "V=5–6, A=3–4, R=1–2. Este ítem se documenta con video; el puntaje se ingresa posteriormente.",
        answerType: "VideoRecorder",
        maxScore: 0,
        scoring: { type: "none" },
      }
    ]
  },
  {
    id: "praxis-dibujo-1",
    title: "Praxias y Copia de Dibujo",
    items: [
      {
        itemId: "N",
        title: "Captura de Foto del Dibujo",
        instruction: "Saque una foto clara de la hoja con el dibujo del paciente.",
        rubricNote: "Algoritmo del dibujo (botón para sacar foto a la hoja).",
        answerType: "FileUpload",
        accept: "image/*",
        maxScore: 0,
        scoring: { type: "none" }
      }
    ]
  },
  {
    id: "memoria-semantica-1",
    title: "Memoria Semántica I",
    items: [
      {
        itemId: "MS-FV",
        title: "Memoria Semántica: Fluidez Verbal (ANIMALES / Palabras con “F”)",
        instruction:
          "Primero, diga en voz alta la mayor cantidad de NOMBRES DE ANIMALES que recuerde en 1 minuto (excluya nombres propios y familias de palabras). Luego, diga todas las PALABRAS QUE EMPIEZAN POR “F” en 1 minuto. El examinador dirá 'basta' al cumplirse el tiempo. Se graba cada lista por separado.",
        rubricNote:
          "Se registran dos audios (.wav): ANIMALES y “F”. La puntuación se calcula luego del conteo/transcripción.",
        answerType: "AudioRecorderPair",
        maxScore: 0,
        scoring: { type: "none" }
      },
      {
        itemId: "G",
        title: "Evocación por Categorías",
        instruction:
          "Recuerde palabras por categoría: partes del cuerpo, frutas, animales.",
        rubricNote: "V=≥80% del máximo, A=50–79%, R=<50%",
        answerType: "TextAnswer",
        fields: ["Partes del cuerpo", "Frutas", "Animales"],
        maxScore: 18,
        scoring: { type: "category_count", maxPerCategory: 6 },
        evaluation: {
          type: "percent",
          labels: { R: "Rojo", A: "Amarillo", V: "Verde" },
          thresholds: { V: 0.8, A: 0.5 }
        }
      },
      {
        itemId: "H",
        title: "Reconocimiento de Palabras",
        instruction:
          "Marque Sí si la palabra pertenece a las memorizadas anteriormente, No si no pertenece.",
        rubricNote: "V=≥80% del máximo, A=50–79%, R=<50% (se penalizan intrusiones)",
        answerType: "MultiSelect",
        options: [
          { word: "manzana", correct: true },
          { word: "perro", correct: true },
          { word: "mesa", correct: false },
          { word: "brazo", correct: true },
          { word: "libro", correct: false }
        ],
        maxScore: 5,
        scoring: { type: "recognition", correctBonus: 1, intrusionPenalty: -1 },
        evaluation: {
          type: "percent",
          labels: { R: "Rojo", A: "Amarillo", V: "Verde" },
          thresholds: { V: 0.8, A: 0.5 }
        }
      },
      // I — Meses del año (orden esperado)
      {
        itemId: "I",
        title: "Meses del Año (en orden)",
        instruction: "Diga los meses del año en orden, desde el primero al último.",
        rubricNote: "Respuesta esperada en un orden.",
        answerType: "TextAnswer",
        fields: 1,
        maxScore: 12,
        correctSequence: [
          "enero","febrero","marzo","abril","mayo","junio",
          "julio","agosto","septiembre","octubre","noviembre","diciembre"
        ],
        scoring: { type: "sequence", maxPoints: 12 },
        evaluation: {
          type: "percent",
          labels: { R: "Rojo", A: "Amarillo", V: "Verde" },
          thresholds: { V: 0.8, A: 0.5 }
        }
      },

      // J — Colores (sin orden, 5 objetivos)
      {
        itemId: "J",
        title: "Nombra 5 Colores (sin orden)",
        instruction: "Diga cinco colores. El orden no importa.",
        rubricNote: "Respuesta esperada sin un orden (5 blancos correctos).",
        answerType: "TextAnswer",
        fields: 1,
        maxScore: 5,
        correctAnswers: ["rojo","azul","verde","amarillo","negro","blanco","morado","naranja","café","gris"],
        scoring: { type: "unordered_set", maxCorrect: 5 },   // NUEVO tipo (abajo)
        evaluation: {
          type: "percent",
          labels: { R: "Rojo", A: "Amarillo", V: "Verde" },
          thresholds: { V: 0.8, A: 0.5 }
        }
      },

      // K — Tabla Sujeto–Verbo–Predicado (marcado por evaluador)
      {
        itemId: "K",
        title: "Identificación de Sujeto, Verbo y Predicado",
        instruction:
          "Complete con las palabras propuestas. El evaluador marca Sí/No por cada campo.",
        rubricNote: "Hacer una tabla de Sujeto–Verbo–Predicado para marcar Sí/No.",
        answerType: "TextAnswer",
        fields: ["Sujeto", "Verbo", "Predicado"],
        maxScore: 3,
        scoring: { type: "count", pointsPerCorrect: 1 } // el evaluador valida manualmente
      },

      // L — Resultado matemático (exacto)
      {
        itemId: "L",
        title: "Cálculo: 36 + 47 = ?",
        instruction: "Responda el resultado.",
        rubricNote: "Tiene respuesta esperada (resultado matemático).",
        answerType: "TextAnswer",
        fields: 1,
        maxScore: 1,
        correctAnswers: ["83"],
        scoring: { type: "exact_match", pointsPerCorrect: 1 },
        evaluation: {
          type: "bands",
          labels: { R: "Rojo", A: "Amarillo", V: "Verde" },
          bands: [
            { label: "V", min: 1, max: 1 },
            { label: "R", min: 0, max: 0 }
          ]
        }
      },
    ]
  },
  {
    id: "memoria-episodica-1",
    title: "Memoria Episódica I",
    items: [
      {
        itemId: "A",
        title: "Datos Personales",
        instruction:
          "Responda: ¿Cuál es su nombre? ¿Cuál es su apellido? ¿Qué edad tiene?",
        rubricNote: "Verde (V)=3, Amarillo (A)=2, Rojo (R)=0–1",
        answerType: "TextAnswer",
        fields: ["Nombre", "Apellido", "Edad"],
        maxScore: 3,
        scoring: { type: "count", pointsPerCorrect: 1 },
        evaluation: {
          type: "bands",
          labels: { R: "Rojo", A: "Amarillo", V: "Verde" },
          // bandas por puntaje total
          bands: [
            { label: "V", min: 3, max: 3 },
            { label: "A", min: 2, max: 2 },
            { label: "R", min: 0, max: 1 }
          ]
        }
      },
      {
        itemId: "B",
        title: "Orientación Espacial",
        instruction:
          "¿En qué lugar estamos? ¿En qué piso? ¿Nombre de la calle? ¿Departamento/Provincia/Ciudad? ¿País?",
        rubricNote: "V=5, A=3–4, R=1–2 (0 también se considera R)",
        answerType: "TextAnswer",
        fields: ["Lugar", "Piso", "Calle", "Ciudad/Departamento", "País"],
        maxScore: 5,
        scoring: { type: "count", pointsPerCorrect: 1 },
        evaluation: {
          type: "bands",
          labels: { R: "Rojo", A: "Amarillo", V: "Verde" },
          bands: [
            { label: "V", min: 5, max: 5 },      // Verde
            { label: "A", min: 3, max: 4 },      // Amarillo
            { label: "R", min: 0, max: 2 }       // Rojo
          ]
        }
      },
      {
        itemId: "C",
        title: "Orientación Temporal Remota",
        instruction:
          "¿En qué fecha es Navidad? ¿Qué se festeja el 06 de agosto? ¿Cuántos días tiene enero?",
        rubricNote: "V=3, A=2, R=0–1",
        answerType: "TextAnswer",
        fields: ["Fecha de Navidad", "Festividad del 6 de agosto", "Días de enero"],
        maxScore: 3,
        correctAnswers: ["25 de diciembre", "Independencia de Bolivia", "31"],
        scoring: { type: "exact_match", pointsPerCorrect: 1 },
        evaluation: {
          type: "bands",
          labels: { R: "Rojo", A: "Amarillo", V: "Verde" },
          bands: [
            { label: "V", min: 3, max: 3 },
            { label: "A", min: 2, max: 2 },
            { label: "R", min: 0, max: 1 }
          ]
        }
      }
    ]
  },
  {
    id: "memoria-operativa-1",
    title: "Memoria Operativa I",
    items: [
      {
        itemId: "D",
        title: "Días de la Semana",
        instruction: "Nombre los días de la semana del primero hábil al último.",
        rubricNote: "V=6–7 correctos en orden, A=4–5, R=0–3",
        answerType: "TextAnswer",
        fields: 1,
        maxScore: 7,
        correctSequence: [
          "lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"
        ],
        scoring: { type: "sequence", maxPoints: 7 },
        evaluation: {
          type: "bands",
          labels: { R: "Rojo", A: "Amarillo", V: "Verde" },
          bands: [
            { label: "V", min: 6, max: 7 },
            { label: "A", min: 4, max: 5 },
            { label: "R", min: 0, max: 3 }
          ]
        }
      },
      {
        itemId: "E",
        title: "Codificación Viso-Visual – Estímulo",
        instruction:
          "Observe la tarjeta con la figura durante 12 segundos. Luego se retirará.",
        rubricNote: "Memorice la figura objetivo.",
        answerType: "ImageViewer",
        stimulus: "/anexo1-edm.png", // la 2ª imagen (diamante)
        timer: { duration: 12, startManually: true },
        // no puntúa: sólo prepara al paciente
        maxScore: 0,
        scoring: { type: "none" }
      },
      {
          itemId: "G",
        title: "Detección Visual",
        instruction:
          "Observe la figura durante 12 segundos, luego márquela en la matriz.",
        rubricNote: "V=≥80% del máximo, A=50–79%, R=<50%",
        answerType: "MatrixSelect",
        stimulus: "/placeholder-krl5w.png",
        timer: { duration: 12, startManually: true },
        matrix: "/placeholder-iy3oo.png",
        maxScore: 15,
        scoring: { type: "matrix_hits", maxHits: 15 },
        evaluation: {
          type: "percent",
          labels: { R: "Rojo", A: "Amarillo", V: "Verde" },
          thresholds: { V: 0.8, A: 0.5 }
        }
      },
      // H — Sustracciones seriadas (10 pts, orden esperado)
      {
        itemId: "H",
        title: "Cálculo Mental: Sustracciones seriadas (100 − 7)",
        instruction:
          "Reste 7 empezando en 100 y diga los resultados en voz alta, en orden.",
        rubricNote: "V=8–10, A=5–7, R=0–4 (sobre 10 puntos)",
        answerType: "TextAnswer",
        fields: 1,
        maxScore: 10,
        correctSequence: ["93","86","79","72","65","58","51","44","37","30"],
        scoring: { type: "sequence", maxPoints: 10 },
        evaluation: {
          type: "bands",
          labels: { R: "Rojo", A: "Amarillo", V: "Verde" },
          bands: [
            { label: "V", min: 8,  max: 10 },
            { label: "A", min: 5,  max: 7  },
            { label: "R", min: 0,  max: 4  }
          ]
        }
      },

      // I — Pulsador de atención (3 pts + casilla de confirmación)
      {
        itemId: "I",
        title: "Pulsador de Atención (3 presiones correctas)",
        instruction:
          "Cuando oiga la señal, presione el botón lo más rápido posible, hasta 3 veces.",
        rubricNote: "Puntaje sobre 3pts; añadir casilla Sí/No si presionó.",
        answerType: "ActionRecorder",           // reutiliza tu componente
        action: { kind: "tap", max: 3 },        // el componente debe devolver un count
        confirmField: "Presionó el pulsador",    // muestra un checkbox al evaluador
        maxScore: 3,
        scoring: { type: "press_count", maxPresses: 3 } // NUEVO tipo (abajo)
      },
      {
        itemId: "F",
        title: "Memoria Operativa: Atención – Reconocimiento – Detección Visual (N°1)",
        instruction:
          "Le voy a mostrar una lámina con varias figuras; marque con una ‘X’ todas las figuras iguales a la que memoriza. Revise fila por fila.",
        rubricNote: "V=12–15, A=7–11, R=0–6 (sobre 15 puntos)",
        answerType: "MatrixSelect",
        stimulus: "/anexo1-edm.png",  // opcional: re-mostrar miniatura del target
        matrix: "/anexo1-response-edm.png",    // la 3ª imagen (matriz)
        timer: { duration: 60, startManually: false }, // 1 min total (ajustable)
        maxScore: 15,
        // Hotspots = áreas clicables sobre la matriz. Cada uno tiene un id único.
        hotspots: [
          // Ejemplo; debes rellenar todos los hotspots (uno por figura)
          // coordenadas normalizadas (0..1) o en px, según cómo renders tu <MatrixSelect/>.
          {
            "id": "r1c1",
            "x": 0,
            "y": 0,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r1c2",
            "x": 0.0625,
            "y": 0,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r1c3",
            "x": 0.125,
            "y": 0,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r1c4",
            "x": 0.1875,
            "y": 0,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r1c5",
            "x": 0.25,
            "y": 0,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r1c6",
            "x": 0.3125,
            "y": 0,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r1c7",
            "x": 0.375,
            "y": 0,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r1c8",
            "x": 0.4375,
            "y": 0,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r1c9",
            "x": 0.5,
            "y": 0,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r1c10",
            "x": 0.5625,
            "y": 0,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r1c11",
            "x": 0.625,
            "y": 0,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r1c12",
            "x": 0.6875,
            "y": 0,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r1c13",
            "x": 0.75,
            "y": 0,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r1c14",
            "x": 0.8125,
            "y": 0,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r1c15",
            "x": 0.875,
            "y": 0,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r1c16",
            "x": 0.9375,
            "y": 0,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r2c1",
            "x": 0,
            "y": 0.06666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r2c2",
            "x": 0.0625,
            "y": 0.06666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r2c3",
            "x": 0.125,
            "y": 0.06666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r2c4",
            "x": 0.1875,
            "y": 0.06666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r2c5",
            "x": 0.25,
            "y": 0.06666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r2c6",
            "x": 0.3125,
            "y": 0.06666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r2c7",
            "x": 0.375,
            "y": 0.06666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r2c8",
            "x": 0.4375,
            "y": 0.06666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r2c9",
            "x": 0.5,
            "y": 0.06666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r2c10",
            "x": 0.5625,
            "y": 0.06666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r2c11",
            "x": 0.625,
            "y": 0.06666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r2c12",
            "x": 0.6875,
            "y": 0.06666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r2c13",
            "x": 0.75,
            "y": 0.06666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r2c14",
            "x": 0.8125,
            "y": 0.06666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r2c15",
            "x": 0.875,
            "y": 0.06666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r2c16",
            "x": 0.9375,
            "y": 0.06666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r3c1",
            "x": 0,
            "y": 0.13333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r3c2",
            "x": 0.0625,
            "y": 0.13333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r3c3",
            "x": 0.125,
            "y": 0.13333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r3c4",
            "x": 0.1875,
            "y": 0.13333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r3c5",
            "x": 0.25,
            "y": 0.13333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r3c6",
            "x": 0.3125,
            "y": 0.13333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r3c7",
            "x": 0.375,
            "y": 0.13333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r3c8",
            "x": 0.4375,
            "y": 0.13333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r3c9",
            "x": 0.5,
            "y": 0.13333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r3c10",
            "x": 0.5625,
            "y": 0.13333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r3c11",
            "x": 0.625,
            "y": 0.13333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r3c12",
            "x": 0.6875,
            "y": 0.13333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r3c13",
            "x": 0.75,
            "y": 0.13333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r3c14",
            "x": 0.8125,
            "y": 0.13333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r3c15",
            "x": 0.875,
            "y": 0.13333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r3c16",
            "x": 0.9375,
            "y": 0.13333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r4c1",
            "x": 0,
            "y": 0.2,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r4c2",
            "x": 0.0625,
            "y": 0.2,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r4c3",
            "x": 0.125,
            "y": 0.2,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r4c4",
            "x": 0.1875,
            "y": 0.2,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r4c5",
            "x": 0.25,
            "y": 0.2,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r4c6",
            "x": 0.3125,
            "y": 0.2,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r4c7",
            "x": 0.375,
            "y": 0.2,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r4c8",
            "x": 0.4375,
            "y": 0.2,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r4c9",
            "x": 0.5,
            "y": 0.2,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r4c10",
            "x": 0.5625,
            "y": 0.2,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r4c11",
            "x": 0.625,
            "y": 0.2,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r4c12",
            "x": 0.6875,
            "y": 0.2,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r4c13",
            "x": 0.75,
            "y": 0.2,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r4c14",
            "x": 0.8125,
            "y": 0.2,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r4c15",
            "x": 0.875,
            "y": 0.2,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r4c16",
            "x": 0.9375,
            "y": 0.2,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r5c1",
            "x": 0,
            "y": 0.26666666666666666,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r5c2",
            "x": 0.0625,
            "y": 0.26666666666666666,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r5c3",
            "x": 0.125,
            "y": 0.26666666666666666,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r5c4",
            "x": 0.1875,
            "y": 0.26666666666666666,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r5c5",
            "x": 0.25,
            "y": 0.26666666666666666,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r5c6",
            "x": 0.3125,
            "y": 0.26666666666666666,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r5c7",
            "x": 0.375,
            "y": 0.26666666666666666,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r5c8",
            "x": 0.4375,
            "y": 0.26666666666666666,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r5c9",
            "x": 0.5,
            "y": 0.26666666666666666,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r5c10",
            "x": 0.5625,
            "y": 0.26666666666666666,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r5c11",
            "x": 0.625,
            "y": 0.26666666666666666,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r5c12",
            "x": 0.6875,
            "y": 0.26666666666666666,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r5c13",
            "x": 0.75,
            "y": 0.26666666666666666,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r5c14",
            "x": 0.8125,
            "y": 0.26666666666666666,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r5c15",
            "x": 0.875,
            "y": 0.26666666666666666,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r5c16",
            "x": 0.9375,
            "y": 0.26666666666666666,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r6c1",
            "x": 0,
            "y": 0.3333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r6c2",
            "x": 0.0625,
            "y": 0.3333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r6c3",
            "x": 0.125,
            "y": 0.3333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r6c4",
            "x": 0.1875,
            "y": 0.3333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r6c5",
            "x": 0.25,
            "y": 0.3333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r6c6",
            "x": 0.3125,
            "y": 0.3333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r6c7",
            "x": 0.375,
            "y": 0.3333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r6c8",
            "x": 0.4375,
            "y": 0.3333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r6c9",
            "x": 0.5,
            "y": 0.3333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r6c10",
            "x": 0.5625,
            "y": 0.3333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r6c11",
            "x": 0.625,
            "y": 0.3333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r6c12",
            "x": 0.6875,
            "y": 0.3333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r6c13",
            "x": 0.75,
            "y": 0.3333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r6c14",
            "x": 0.8125,
            "y": 0.3333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r6c15",
            "x": 0.875,
            "y": 0.3333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r6c16",
            "x": 0.9375,
            "y": 0.3333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r7c1",
            "x": 0,
            "y": 0.4,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r7c2",
            "x": 0.0625,
            "y": 0.4,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r7c3",
            "x": 0.125,
            "y": 0.4,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r7c4",
            "x": 0.1875,
            "y": 0.4,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r7c5",
            "x": 0.25,
            "y": 0.4,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r7c6",
            "x": 0.3125,
            "y": 0.4,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r7c7",
            "x": 0.375,
            "y": 0.4,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r7c8",
            "x": 0.4375,
            "y": 0.4,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r7c9",
            "x": 0.5,
            "y": 0.4,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r7c10",
            "x": 0.5625,
            "y": 0.4,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r7c11",
            "x": 0.625,
            "y": 0.4,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r7c12",
            "x": 0.6875,
            "y": 0.4,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r7c13",
            "x": 0.75,
            "y": 0.4,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r7c14",
            "x": 0.8125,
            "y": 0.4,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r7c15",
            "x": 0.875,
            "y": 0.4,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r7c16",
            "x": 0.9375,
            "y": 0.4,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r8c1",
            "x": 0,
            "y": 0.4666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r8c2",
            "x": 0.0625,
            "y": 0.4666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r8c3",
            "x": 0.125,
            "y": 0.4666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r8c4",
            "x": 0.1875,
            "y": 0.4666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r8c5",
            "x": 0.25,
            "y": 0.4666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r8c6",
            "x": 0.3125,
            "y": 0.4666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r8c7",
            "x": 0.375,
            "y": 0.4666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r8c8",
            "x": 0.4375,
            "y": 0.4666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r8c9",
            "x": 0.5,
            "y": 0.4666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r8c10",
            "x": 0.5625,
            "y": 0.4666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r8c11",
            "x": 0.625,
            "y": 0.4666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r8c12",
            "x": 0.6875,
            "y": 0.4666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r8c13",
            "x": 0.75,
            "y": 0.4666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r8c14",
            "x": 0.8125,
            "y": 0.4666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r8c15",
            "x": 0.875,
            "y": 0.4666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r8c16",
            "x": 0.9375,
            "y": 0.4666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r9c1",
            "x": 0,
            "y": 0.5333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r9c2",
            "x": 0.0625,
            "y": 0.5333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r9c3",
            "x": 0.125,
            "y": 0.5333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r9c4",
            "x": 0.1875,
            "y": 0.5333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r9c5",
            "x": 0.25,
            "y": 0.5333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r9c6",
            "x": 0.3125,
            "y": 0.5333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r9c7",
            "x": 0.375,
            "y": 0.5333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r9c8",
            "x": 0.4375,
            "y": 0.5333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r9c9",
            "x": 0.5,
            "y": 0.5333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r9c10",
            "x": 0.5625,
            "y": 0.5333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r9c11",
            "x": 0.625,
            "y": 0.5333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r9c12",
            "x": 0.6875,
            "y": 0.5333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r9c13",
            "x": 0.75,
            "y": 0.5333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r9c14",
            "x": 0.8125,
            "y": 0.5333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r9c15",
            "x": 0.875,
            "y": 0.5333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r9c16",
            "x": 0.9375,
            "y": 0.5333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r10c1",
            "x": 0,
            "y": 0.6,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r10c2",
            "x": 0.0625,
            "y": 0.6,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r10c3",
            "x": 0.125,
            "y": 0.6,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r10c4",
            "x": 0.1875,
            "y": 0.6,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r10c5",
            "x": 0.25,
            "y": 0.6,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r10c6",
            "x": 0.3125,
            "y": 0.6,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r10c7",
            "x": 0.375,
            "y": 0.6,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r10c8",
            "x": 0.4375,
            "y": 0.6,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r10c9",
            "x": 0.5,
            "y": 0.6,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r10c10",
            "x": 0.5625,
            "y": 0.6,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r10c11",
            "x": 0.625,
            "y": 0.6,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r10c12",
            "x": 0.6875,
            "y": 0.6,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r10c13",
            "x": 0.75,
            "y": 0.6,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r10c14",
            "x": 0.8125,
            "y": 0.6,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r10c15",
            "x": 0.875,
            "y": 0.6,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r10c16",
            "x": 0.9375,
            "y": 0.6,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r11c1",
            "x": 0,
            "y": 0.6666666666666666,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r11c2",
            "x": 0.0625,
            "y": 0.6666666666666666,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r11c3",
            "x": 0.125,
            "y": 0.6666666666666666,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r11c4",
            "x": 0.1875,
            "y": 0.6666666666666666,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r11c5",
            "x": 0.25,
            "y": 0.6666666666666666,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r11c6",
            "x": 0.3125,
            "y": 0.6666666666666666,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r11c7",
            "x": 0.375,
            "y": 0.6666666666666666,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r11c8",
            "x": 0.4375,
            "y": 0.6666666666666666,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r11c9",
            "x": 0.5,
            "y": 0.6666666666666666,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r11c10",
            "x": 0.5625,
            "y": 0.6666666666666666,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r11c11",
            "x": 0.625,
            "y": 0.6666666666666666,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r11c12",
            "x": 0.6875,
            "y": 0.6666666666666666,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r11c13",
            "x": 0.75,
            "y": 0.6666666666666666,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r11c14",
            "x": 0.8125,
            "y": 0.6666666666666666,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r11c15",
            "x": 0.875,
            "y": 0.6666666666666666,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r11c16",
            "x": 0.9375,
            "y": 0.6666666666666666,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r12c1",
            "x": 0,
            "y": 0.7333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r12c2",
            "x": 0.0625,
            "y": 0.7333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r12c3",
            "x": 0.125,
            "y": 0.7333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r12c4",
            "x": 0.1875,
            "y": 0.7333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r12c5",
            "x": 0.25,
            "y": 0.7333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r12c6",
            "x": 0.3125,
            "y": 0.7333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r12c7",
            "x": 0.375,
            "y": 0.7333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r12c8",
            "x": 0.4375,
            "y": 0.7333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r12c9",
            "x": 0.5,
            "y": 0.7333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r12c10",
            "x": 0.5625,
            "y": 0.7333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r12c11",
            "x": 0.625,
            "y": 0.7333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r12c12",
            "x": 0.6875,
            "y": 0.7333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r12c13",
            "x": 0.75,
            "y": 0.7333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r12c14",
            "x": 0.8125,
            "y": 0.7333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r12c15",
            "x": 0.875,
            "y": 0.7333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r12c16",
            "x": 0.9375,
            "y": 0.7333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r13c1",
            "x": 0,
            "y": 0.8,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r13c2",
            "x": 0.0625,
            "y": 0.8,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r13c3",
            "x": 0.125,
            "y": 0.8,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r13c4",
            "x": 0.1875,
            "y": 0.8,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r13c5",
            "x": 0.25,
            "y": 0.8,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r13c6",
            "x": 0.3125,
            "y": 0.8,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r13c7",
            "x": 0.375,
            "y": 0.8,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r13c8",
            "x": 0.4375,
            "y": 0.8,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r13c9",
            "x": 0.5,
            "y": 0.8,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r13c10",
            "x": 0.5625,
            "y": 0.8,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r13c11",
            "x": 0.625,
            "y": 0.8,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r13c12",
            "x": 0.6875,
            "y": 0.8,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r13c13",
            "x": 0.75,
            "y": 0.8,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r13c14",
            "x": 0.8125,
            "y": 0.8,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r13c15",
            "x": 0.875,
            "y": 0.8,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r13c16",
            "x": 0.9375,
            "y": 0.8,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r14c1",
            "x": 0,
            "y": 0.8666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r14c2",
            "x": 0.0625,
            "y": 0.8666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r14c3",
            "x": 0.125,
            "y": 0.8666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r14c4",
            "x": 0.1875,
            "y": 0.8666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r14c5",
            "x": 0.25,
            "y": 0.8666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r14c6",
            "x": 0.3125,
            "y": 0.8666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r14c7",
            "x": 0.375,
            "y": 0.8666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r14c8",
            "x": 0.4375,
            "y": 0.8666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r14c9",
            "x": 0.5,
            "y": 0.8666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r14c10",
            "x": 0.5625,
            "y": 0.8666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r14c11",
            "x": 0.625,
            "y": 0.8666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r14c12",
            "x": 0.6875,
            "y": 0.8666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r14c13",
            "x": 0.75,
            "y": 0.8666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r14c14",
            "x": 0.8125,
            "y": 0.8666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r14c15",
            "x": 0.875,
            "y": 0.8666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r14c16",
            "x": 0.9375,
            "y": 0.8666666666666667,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r15c1",
            "x": 0,
            "y": 0.9333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r15c2",
            "x": 0.0625,
            "y": 0.9333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r15c3",
            "x": 0.125,
            "y": 0.9333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r15c4",
            "x": 0.1875,
            "y": 0.9333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r15c5",
            "x": 0.25,
            "y": 0.9333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r15c6",
            "x": 0.3125,
            "y": 0.9333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r15c7",
            "x": 0.375,
            "y": 0.9333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r15c8",
            "x": 0.4375,
            "y": 0.9333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r15c9",
            "x": 0.5,
            "y": 0.9333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r15c10",
            "x": 0.5625,
            "y": 0.9333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r15c11",
            "x": 0.625,
            "y": 0.9333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r15c12",
            "x": 0.6875,
            "y": 0.9333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r15c13",
            "x": 0.75,
            "y": 0.9333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r15c14",
            "x": 0.8125,
            "y": 0.9333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r15c15",
            "x": 0.875,
            "y": 0.9333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          },
          {
            "id": "r15c16",
            "x": 0.9375,
            "y": 0.9333333333333333,
            "w": 0.0625,
            "h": 0.06666666666666667
          }

          // ...
        ],
        // Los 15 que sí son el mismo patrón del estímulo
        expectedTargets: [
          "r1c1","r1c7", "r2c10", "r3c3", "r4c5", "r4c16", "r5c4", "r5c16", "r5c12","r6c4", "r7c12", "r14c16", "r13c16"
        ],
        // Reglas TS para puntaje
        scoring: {
          type: "matrix_hits",
          // si quieres castigar intrusiones:
          penalizeIntrusions: false, // o true para restar 1 por falso positivo
          maxHits: 15
        },
        evaluation: {
          type: "bands",
          labels: { R: "Rojo", A: "Amarillo", V: "Verde" },
          bands: [
            { label: "V", min: 12, max: 15 },
            { label: "A", min: 7,  max: 11 },
            { label: "R", min: 0,  max: 6 }
          ]
        }
      },
    ]
  },
  
  
  
];
