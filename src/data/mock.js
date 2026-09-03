const lineas = [
  {
    id: "l1",
    nombre: "Sanidad Animal",
    area: "Ciencias Veterinarias",
    directorActual: "Dra. Mirta Sosa",
    historialDirectores: [
      { nombre: "Dr. Ra\xFAl Ben\xEDtez", periodo: "1998 \u2013 2021" },
      { nombre: "Dra. Mirta Sosa", periodo: "2021 \u2013 actual" }
    ],
    descripcion: "Diagn\xF3stico, control y prevenci\xF3n de enfermedades del ganado bovino y bubalino en la provincia de Formosa.",
    estado: "Activa",
    proyectos: 3
  },
  {
    id: "l2",
    nombre: "Sanidad Vegetal",
    area: "Ciencias Agron\xF3micas",
    directorActual: "Ing. Agr. Carlos Duarte",
    historialDirectores: [{ nombre: "Ing. Agr. Carlos Duarte", periodo: "2016 \u2013 actual" }],
    descripcion: "Detecci\xF3n temprana y manejo de plagas y enfermedades en cultivos regionales de importancia econ\xF3mica.",
    estado: "Activa",
    proyectos: 2
  },
  {
    id: "l3",
    nombre: "Nutrici\xF3n Animal",
    area: "Producci\xF3n Animal",
    directorActual: "Dr. Hugo Villalba",
    historialDirectores: [
      { nombre: "Ing. Zoot. Ana Rojas", periodo: "2005 \u2013 2022" },
      { nombre: "Dr. Hugo Villalba", periodo: "2022 \u2013 actual" }
    ],
    descripcion: "Evaluaci\xF3n de forrajes nativos y suplementaci\xF3n estrat\xE9gica para sistemas ganaderos del este formose\xF1o.",
    estado: "Activa",
    proyectos: 2
  },
  {
    id: "l4",
    nombre: "Primatolog\xEDa",
    area: "Biolog\xEDa",
    directorActual: "\u2014",
    historialDirectores: [{ nombre: "Dr. Eduardo Maidana", periodo: "1985 \u2013 2023 (jubilado)" }],
    descripcion: "Estudio de poblaciones de primates neotropicales y su rol como centinelas sanitarios regionales.",
    estado: "En riesgo",
    proyectos: 1
  },
  {
    id: "l5",
    nombre: "Controladores Biol\xF3gicos",
    area: "Entomolog\xEDa aplicada",
    directorActual: "Dra. Luc\xEDa Ferreyra",
    historialDirectores: [{ nombre: "Dra. Luc\xEDa Ferreyra", periodo: "2019 \u2013 actual" }],
    descripcion: "Producci\xF3n y liberaci\xF3n de agentes de control biol\xF3gico como alternativa al uso de agroqu\xEDmicos.",
    estado: "Activa",
    proyectos: 2
  }
];
const investigadores = [
  {
    id: "i1",
    nombre: "Dra. Mirta Sosa",
    dni: "20.114.552",
    categoria: "Investigador Principal",
    area: "Ciencias Veterinarias",
    orcid: "0000-0002-1825-0097",
    tipo: "Investigador",
    lineas: ["Sanidad Animal"],
    dedicacionTotal: 90,
    email: "m.sosa@cit-formosa.gob.ar"
  },
  {
    id: "i2",
    nombre: "Ing. Agr. Carlos Duarte",
    dni: "22.780.334",
    categoria: "Investigador Independiente",
    area: "Ciencias Agron\xF3micas",
    orcid: "0000-0001-5109-3700",
    tipo: "Investigador",
    lineas: ["Sanidad Vegetal"],
    dedicacionTotal: 80,
    email: "c.duarte@cit-formosa.gob.ar"
  },
  {
    id: "i3",
    nombre: "Dr. Hugo Villalba",
    dni: "24.556.901",
    categoria: "Investigador Adjunto",
    area: "Producci\xF3n Animal",
    orcid: "0000-0003-4321-1188",
    tipo: "Investigador",
    lineas: ["Nutrici\xF3n Animal"],
    dedicacionTotal: 70,
    email: "h.villalba@cit-formosa.gob.ar"
  },
  {
    id: "i4",
    nombre: "Dra. Luc\xEDa Ferreyra",
    dni: "27.980.114",
    categoria: "Investigador Adjunto",
    area: "Entomolog\xEDa aplicada",
    orcid: "0000-0002-9981-4410",
    tipo: "Investigador",
    lineas: ["Controladores Biol\xF3gicos"],
    dedicacionTotal: 85,
    email: "l.ferreyra@cit-formosa.gob.ar"
  },
  {
    id: "i5",
    nombre: "Lic. Nahuel C\xE1ceres",
    dni: "38.220.775",
    categoria: "Becario doctoral",
    area: "Ciencias Veterinarias",
    orcid: "0000-0001-7788-2210",
    tipo: "Becario",
    tipoBeca: "Doctoral CONICET",
    periodoBeca: "03/2023 \u2013 03/2028",
    directorAsignado: "Dra. Mirta Sosa",
    lineas: ["Sanidad Animal"],
    dedicacionTotal: 100,
    email: "n.caceres@cit-formosa.gob.ar"
  },
  {
    id: "i6",
    nombre: "Lic. Sof\xEDa Ojeda",
    dni: "40.115.220",
    categoria: "Becaria de iniciaci\xF3n",
    area: "Entomolog\xEDa aplicada",
    orcid: "0000-0002-3344-9080",
    tipo: "Becario",
    tipoBeca: "Colaboraci\xF3n Provincia\u2013CONICET",
    periodoBeca: "08/2024 \u2013 08/2026",
    directorAsignado: "Dra. Luc\xEDa Ferreyra",
    lineas: ["Controladores Biol\xF3gicos"],
    dedicacionTotal: 60,
    email: "s.ojeda@cit-formosa.gob.ar"
  },
  {
    id: "i7",
    nombre: "M\xE9d. Vet. Juli\xE1n Ram\xEDrez",
    dni: "33.410.667",
    categoria: "Profesional de apoyo",
    area: "Ciencias Veterinarias",
    orcid: "0000-0003-1122-8890",
    tipo: "Investigador",
    lineas: ["Sanidad Animal", "Nutrici\xF3n Animal"],
    dedicacionTotal: 110,
    email: "j.ramirez@cit-formosa.gob.ar"
  },
  {
    id: "i8",
    nombre: "Lic. Camila Ben\xEDtez",
    dni: "39.887.201",
    categoria: "Becaria postdoctoral",
    area: "Biolog\xEDa",
    orcid: "0000-0002-6677-1120",
    tipo: "Becario",
    tipoBeca: "Postdoctoral CONICET",
    periodoBeca: "05/2024 \u2013 05/2026",
    directorAsignado: "\u2014",
    lineas: ["Primatolog\xEDa"],
    dedicacionTotal: 100,
    email: "c.benitez@cit-formosa.gob.ar"
  }
];
const proyectos = [
  {
    id: "p1",
    codigo: "CIT-SA-2024-01",
    titulo: "Vigilancia epidemiol\xF3gica de brucelosis bovina en el este formose\xF1o",
    lineaId: "l1",
    resumen: "Relevamiento serol\xF3gico en establecimientos ganaderos para determinar prevalencia de brucelosis y generar un mapa de riesgo provincial.",
    objetivoGeneral: "Reducir la prevalencia de brucelosis bovina mediante diagn\xF3stico temprano y articulaci\xF3n con SENASA.",
    objetivos: [
      { descripcion: "Muestreo en 120 establecimientos del departamento Pilcomayo", avance: 78 },
      { descripcion: "Procesamiento serol\xF3gico y carga en base provincial", avance: 64 },
      { descripcion: "Mapa de riesgo georreferenciado", avance: 30 }
    ],
    estado: "En ejecuci\xF3n",
    inicio: "2024-03-01",
    fin: "2026-12-31",
    financiador: "Ministerio de Producci\xF3n de Formosa",
    directorId: "i1",
    metodologia: "Muestreo estratificado por departamento, diagn\xF3stico por BPA y confirmaci\xF3n por FPA, an\xE1lisis espacial con QGIS.",
    avance: 57,
    equipo: [
      { investigadorId: "i1", rol: "Director", dedicacion: 40 },
      { investigadorId: "i5", rol: "Integrante", dedicacion: 70 },
      { investigadorId: "i7", rol: "Colaborador", dedicacion: 30 }
    ],
    cronograma: [
      { nombre: "Dise\xF1o de muestreo y permisos", anio: 2024, estado: "Completada" },
      { nombre: "Campa\xF1as de muestreo a campo", anio: 2025, estado: "En curso" },
      { nombre: "Procesamiento de sueros", anio: 2025, estado: "Demorada" },
      { nombre: "An\xE1lisis espacial y reporte final", anio: 2026, estado: "Planificada" }
    ],
    presupuesto: [
      { categoria: "Gastos de capital", rubro: "Equipamiento", anio: 2025, asignado: 48e5, ejecutado: 45e5 },
      { categoria: "Gastos corrientes", rubro: "Reactivos e insumos", anio: 2025, asignado: 62e5, ejecutado: 31e5 },
      { categoria: "Gastos corrientes", rubro: "Viajes y vi\xE1ticos", anio: 2025, asignado: 35e5, ejecutado: 275e4 },
      { categoria: "Gastos corrientes", rubro: "Difusi\xF3n de resultados", anio: 2025, asignado: 9e5, ejecutado: 32e4 },
      { categoria: "Gastos corrientes", rubro: "Servicios de terceros", anio: 2025, asignado: 14e5, ejecutado: 62e4 }
    ],
    hitos: [
      { fecha: "2024-11-20", texto: "Primeros 60 establecimientos relevados" },
      { fecha: "2025-04-08", texto: "Convenio operativo firmado con SENASA regional" }
    ],
    contingencias: [
      { fecha: "2025-02-14", texto: "Inundaciones en Laguna Blanca: se reprogramaron 3 campa\xF1as de muestreo." },
      { fecha: "2025-06-02", texto: "Demora de 78 d\xEDas en kits importados; se prioriz\xF3 procesamiento por lotes." }
    ]
  },
  {
    id: "p2",
    codigo: "CIT-SV-2023-04",
    titulo: "Manejo integrado de HLB en c\xEDtricos del corredor Ruta 81",
    lineaId: "l2",
    resumen: "Monitoreo de vectores y detecci\xF3n temprana de Huanglongbing en quintas citr\xEDcolas familiares del oeste provincial.",
    objetivoGeneral: "Establecer un sistema de alerta temprana de HLB adaptado a la peque\xF1a producci\xF3n citr\xEDcola formose\xF1a.",
    objetivos: [
      { descripcion: "Red de trampas amarillas en 40 quintas", avance: 92 },
      { descripcion: "Protocolo de manejo integrado validado", avance: 55 },
      { descripcion: "Capacitaci\xF3n a productores", avance: 40 }
    ],
    estado: "En ejecuci\xF3n",
    inicio: "2023-08-01",
    fin: "2026-07-31",
    financiador: "Financiamiento nacional (PICT)",
    directorId: "i2",
    metodologia: "Monitoreo quincenal de Diaphorina citri, an\xE1lisis por PCR de material vegetal sintom\xE1tico y ensayos de control.",
    avance: 62,
    equipo: [
      { investigadorId: "i2", rol: "Director", dedicacion: 50 },
      { investigadorId: "i4", rol: "Co-director", dedicacion: 25 }
    ],
    cronograma: [
      { nombre: "Instalaci\xF3n de red de trampas", anio: 2024, estado: "Completada" },
      { nombre: "Monitoreo y an\xE1lisis PCR", anio: 2025, estado: "En curso" },
      { nombre: "Talleres con productores", anio: 2026, estado: "Planificada" }
    ],
    presupuesto: [
      { categoria: "Gastos de capital", rubro: "Equipamiento", anio: 2025, asignado: 26e5, ejecutado: 26e5 },
      { categoria: "Gastos corrientes", rubro: "Reactivos e insumos", anio: 2025, asignado: 41e5, ejecutado: 235e4 },
      { categoria: "Gastos corrientes", rubro: "Viajes y vi\xE1ticos", anio: 2025, asignado: 22e5, ejecutado: 148e4 },
      { categoria: "Gastos corrientes", rubro: "Otros gastos", anio: 2025, asignado: 6e5, ejecutado: 18e4 }
    ],
    hitos: [{ fecha: "2025-03-12", texto: "Primer reporte provincial de densidad de vector" }],
    contingencias: [
      { fecha: "2025-01-25", texto: "Ola de calor extremo: se suspendieron 2 semanas de monitoreo a campo." }
    ]
  },
  {
    id: "p3",
    codigo: "CIT-NA-2025-02",
    titulo: "Suplementaci\xF3n estrat\xE9gica con forrajes nativos en cr\xEDa bovina",
    lineaId: "l3",
    resumen: "Evaluaci\xF3n de la respuesta productiva de vientres bajo suplementaci\xF3n con especies forrajeras nativas del ba\xF1ado.",
    objetivoGeneral: "Mejorar \xEDndices de pre\xF1ez en rodeos de cr\xEDa mediante suplementaci\xF3n de bajo costo con recursos locales.",
    objetivos: [
      { descripcion: "Caracterizaci\xF3n nutricional de 8 especies nativas", avance: 45 },
      { descripcion: "Ensayo a campo en 3 establecimientos", avance: 20 }
    ],
    estado: "En ejecuci\xF3n",
    inicio: "2025-02-01",
    fin: "2027-12-31",
    financiador: "Convenio bilateral CIT \u2013 INTA",
    directorId: "i3",
    metodologia: "An\xE1lisis bromatol\xF3gico en laboratorio y ensayos con lotes testigo y tratamiento durante dos servicios.",
    avance: 33,
    equipo: [
      { investigadorId: "i3", rol: "Director", dedicacion: 45 },
      { investigadorId: "i7", rol: "Integrante", dedicacion: 40 }
    ],
    cronograma: [
      { nombre: "Colecta y an\xE1lisis bromatol\xF3gico", anio: 2025, estado: "En curso" },
      { nombre: "Ensayo productivo servicio 1", anio: 2026, estado: "Planificada" },
      { nombre: "Ensayo productivo servicio 2", anio: 2027, estado: "Planificada" }
    ],
    presupuesto: [
      { categoria: "Gastos corrientes", rubro: "Reactivos e insumos", anio: 2025, asignado: 32e5, ejecutado: 98e4 },
      { categoria: "Gastos corrientes", rubro: "Viajes y vi\xE1ticos", anio: 2025, asignado: 28e5, ejecutado: 112e4 },
      { categoria: "Gastos de capital", rubro: "Bibliograf\xEDa", anio: 2025, asignado: 35e4, ejecutado: 12e4 }
    ],
    hitos: [],
    contingencias: []
  },
  {
    id: "p4",
    codigo: "CIT-CB-2022-07",
    titulo: "Cr\xEDa masiva de Trichogramma para control de lepid\xF3pteros en algod\xF3n",
    lineaId: "l5",
    resumen: "Escalado de la producci\xF3n de parasitoides en biof\xE1brica del CIT y evaluaci\xF3n a campo en lotes algodoneros.",
    objetivoGeneral: "Disponer de un paquete tecnol\xF3gico de control biol\xF3gico transferible al sector algodonero provincial.",
    objetivos: [
      { descripcion: "Protocolo de cr\xEDa masiva optimizado", avance: 100 },
      { descripcion: "Validaci\xF3n a campo en 6 lotes", avance: 85 },
      { descripcion: "Documento de transferencia al sector", avance: 60 }
    ],
    estado: "En ejecuci\xF3n",
    inicio: "2022-06-01",
    fin: "2026-05-31",
    financiador: "Ministerio de Producci\xF3n de Formosa",
    directorId: "i4",
    metodologia: "Cr\xEDa sobre hu\xE9spedes alternativos, liberaciones inundativas y evaluaci\xF3n de porcentaje de parasitismo.",
    avance: 82,
    equipo: [
      { investigadorId: "i4", rol: "Director", dedicacion: 40 },
      { investigadorId: "i6", rol: "Integrante", dedicacion: 60 }
    ],
    cronograma: [
      { nombre: "Optimizaci\xF3n de cr\xEDa en biof\xE1brica", anio: 2023, estado: "Completada" },
      { nombre: "Liberaciones a campo", anio: 2025, estado: "En curso" },
      { nombre: "Manual de transferencia", anio: 2026, estado: "Planificada" }
    ],
    presupuesto: [
      { categoria: "Gastos de capital", rubro: "Equipamiento", anio: 2025, asignado: 54e5, ejecutado: 54e5 },
      { categoria: "Gastos corrientes", rubro: "Reactivos e insumos", anio: 2025, asignado: 29e5, ejecutado: 241e4 },
      { categoria: "Gastos corrientes", rubro: "Difusi\xF3n de resultados", anio: 2025, asignado: 12e5, ejecutado: 86e4 }
    ],
    hitos: [
      { fecha: "2024-09-30", texto: "Biof\xE1brica alcanza 2 millones de individuos/mes" },
      { fecha: "2025-05-18", texto: "72% de parasitismo promedio en lotes validados" }
    ],
    contingencias: []
  },
  {
    id: "p5",
    codigo: "CIT-PR-2021-03",
    titulo: "Monitoreo sanitario de poblaciones de Alouatta caraya",
    lineaId: "l4",
    resumen: "Seguimiento de poblaciones de mono aullador negro como centinela de arbovirosis en el corredor del r\xEDo Paraguay.",
    objetivoGeneral: "Sostener la serie hist\xF3rica de vigilancia de fiebre amarilla en primates de la provincia.",
    objetivos: [{ descripcion: "Relevamiento anual de tropas", avance: 100 }],
    estado: "Suspendido",
    inicio: "2021-01-01",
    fin: "2025-12-31",
    financiador: "Fondos propios CIT",
    directorId: "i8",
    metodologia: "Transectas lineales, registro ac\xFAstico y muestreo oportunista.",
    avance: 100,
    equipo: [{ investigadorId: "i8", rol: "Integrante", dedicacion: 50 }],
    cronograma: [{ nombre: "Relevamiento de tropas", anio: 2024, estado: "Completada" }],
    presupuesto: [
      { categoria: "Gastos corrientes", rubro: "Viajes y vi\xE1ticos", anio: 2025, asignado: 15e5, ejecutado: 3e5 }
    ],
    hitos: [{ fecha: "2023-10-02", texto: "Serie hist\xF3rica de 12 a\xF1os consolidada" }],
    contingencias: [
      { fecha: "2025-01-10", texto: "Jubilaci\xF3n del director de l\xEDnea: proyecto suspendido hasta designar responsable." }
    ]
  },
  {
    id: "p6",
    codigo: "CIT-SV-2026-01",
    titulo: "Detecci\xF3n temprana de Fusarium en banano del norte provincial",
    lineaId: "l2",
    resumen: "Formulaci\xF3n de una red de diagn\xF3stico r\xE1pido para el mal de Panam\xE1 raza 4 tropical.",
    objetivoGeneral: "Prevenir el ingreso y dispersi\xF3n de Foc R4T en la producci\xF3n bananera formose\xF1a.",
    objetivos: [{ descripcion: "Protocolo de vigilancia definido", avance: 15 }],
    estado: "En formulaci\xF3n",
    inicio: "2026-09-01",
    fin: "2029-08-31",
    financiador: "A definir",
    directorId: "i2",
    metodologia: "Diagn\xF3stico molecular y vigilancia participativa con productores.",
    avance: 8,
    equipo: [{ investigadorId: "i2", rol: "Director", dedicacion: 15 }],
    cronograma: [{ nombre: "Formulaci\xF3n y presentaci\xF3n", anio: 2026, estado: "En curso" }],
    presupuesto: [],
    hitos: [],
    contingencias: []
  }
];
const publicaciones = [
  {
    id: "pub1",
    titulo: "Seroprevalencia de Brucella abortus en rodeos de cr\xEDa del este de Formosa",
    tipo: "Art\xEDculo",
    doi: "10.1016/j.rvsc.2025.104412",
    autores: ["Sosa, M.", "C\xE1ceres, N.", "Ram\xEDrez, J."],
    proyectoId: "p1",
    fecha: "2025-06-14",
    revista: "Revista Veterinaria Argentina",
    visibilidad: "P\xFAblica"
  },
  {
    id: "pub2",
    titulo: "Din\xE1mica poblacional de Diaphorina citri en quintas familiares del oeste formose\xF1o",
    tipo: "Art\xEDculo",
    doi: "10.1590/1678-4499.20250088",
    autores: ["Duarte, C.", "Ferreyra, L."],
    proyectoId: "p2",
    fecha: "2025-03-02",
    revista: "Bragantia",
    visibilidad: "P\xFAblica"
  },
  {
    id: "pub3",
    titulo: "Cr\xEDa masiva de Trichogramma pretiosum: escalado en biof\xE1brica regional",
    tipo: "Congreso",
    doi: "10.5281/zenodo.10992331",
    autores: ["Ferreyra, L.", "Ojeda, S."],
    proyectoId: "p4",
    fecha: "2024-11-08",
    revista: "XI Congreso Argentino de Control Biol\xF3gico",
    visibilidad: "P\xFAblica"
  },
  {
    id: "pub4",
    titulo: "Informe t\xE9cnico interno: costos operativos de la biof\xE1brica CIT",
    tipo: "Cap\xEDtulo",
    doi: "\u2014",
    autores: ["Ferreyra, L."],
    proyectoId: "p4",
    fecha: "2025-02-20",
    revista: "Serie Documentos CIT",
    visibilidad: "Solo interna"
  },
  {
    id: "pub5",
    titulo: "Doce a\xF1os de vigilancia de fiebre amarilla en Alouatta caraya",
    tipo: "Art\xEDculo",
    doi: "10.1007/s10329-024-01120-1",
    autores: ["Maidana, E.", "Ben\xEDtez, C."],
    proyectoId: "p5",
    fecha: "2024-05-30",
    revista: "Primates",
    visibilidad: "P\xFAblica"
  }
];
const transferencias = [
  {
    id: "t1",
    nombre: "Paquete tecnol\xF3gico Trichogramma para algod\xF3n",
    descripcion: "Protocolo completo de cr\xEDa, liberaci\xF3n y monitoreo de parasitoides adaptado a lotes algodoneros de hasta 50 ha.",
    proyectoId: "p4",
    estado: "Lista para transferir",
    beneficiario: "Cooperativa algodonera de Piran\xE9",
    responsableId: "i4"
  },
  {
    id: "t2",
    nombre: "Servicio de diagn\xF3stico serol\xF3gico de brucelosis",
    descripcion: "Diagn\xF3stico BPA/FPA con emisi\xF3n de certificado para establecimientos ganaderos y tr\xE1mites ante SENASA.",
    proyectoId: "p1",
    estado: "Transferida",
    beneficiario: "Productores ganaderos y SENASA regional",
    responsableId: "i1"
  },
  {
    id: "t3",
    nombre: "Sistema de alerta temprana de HLB",
    descripcion: "Red de trampeo y protocolo de aviso a productores citr\xEDcolas ante detecci\xF3n de vector por encima del umbral.",
    proyectoId: "p2",
    estado: "En evaluaci\xF3n",
    beneficiario: "Ministerio de Producci\xF3n de Formosa",
    responsableId: "i2"
  },
  {
    id: "t4",
    nombre: "Bloque nutricional con forrajes nativos",
    descripcion: "Formulaci\xF3n de suplemento de bajo costo con recursos forrajeros del ba\xF1ado formose\xF1o.",
    proyectoId: "p3",
    estado: "En investigaci\xF3n",
    beneficiario: "Peque\xF1os productores de cr\xEDa",
    responsableId: "i3"
  }
];
const convenios = [
  {
    id: "c1",
    titulo: "Convenio marco de cooperaci\xF3n t\xE9cnica CIT \u2013 SENASA",
    entidad: "SENASA",
    tipo: "Cooperaci\xF3n",
    firma: "2023-04-11",
    vencimiento: "2027-04-10",
    proyectos: ["p1"],
    estado: "Vigente"
  },
  {
    id: "c2",
    titulo: "Acuerdo espec\xEDfico de vigilancia fitosanitaria",
    entidad: "Ministerio de Producci\xF3n de Formosa",
    tipo: "Financiamiento",
    firma: "2024-02-20",
    vencimiento: "2026-12-31",
    proyectos: ["p2", "p4"],
    estado: "Vigente"
  },
  {
    id: "c3",
    titulo: "Convenio de asistencia t\xE9cnica en nutrici\xF3n de rodeos",
    entidad: "INTA EEA Colonia Ben\xEDtez",
    tipo: "Transferencia",
    firma: "2025-01-15",
    vencimiento: "2028-01-14",
    proyectos: ["p3"],
    estado: "Vigente"
  },
  {
    id: "c4",
    titulo: "Carta de intenci\xF3n para producci\xF3n de biocontroladores",
    entidad: "Cooperativa algodonera de Piran\xE9",
    tipo: "Servicio",
    firma: "2026-05-05",
    vencimiento: "2026-11-05",
    proyectos: ["p4"],
    estado: "En negociaci\xF3n"
  },
  {
    id: "c5",
    titulo: "Convenio de uso de laboratorio de biolog\xEDa molecular",
    entidad: "Universidad Nacional de Formosa",
    tipo: "Cooperaci\xF3n",
    firma: "2021-09-01",
    vencimiento: "2025-08-31",
    proyectos: ["p2", "p5"],
    estado: "Vencido"
  }
];
const diagnosticosPorMes = [
  { mes: "Ene", positivos: 12, negativos: 148 },
  { mes: "Feb", positivos: 9, negativos: 132 },
  { mes: "Mar", positivos: 17, negativos: 175 },
  { mes: "Abr", positivos: 14, negativos: 190 },
  { mes: "May", positivos: 21, negativos: 168 },
  { mes: "Jun", positivos: 11, negativos: 145 },
  { mes: "Jul", positivos: 8, negativos: 121 },
  { mes: "Ago", positivos: 15, negativos: 160 }
];
const alertas = [
  {
    id: "a1",
    tipo: "Cadena de suministro",
    severidad: "alta",
    texto: "Kit de FPA importado sin orden de compra: 78 d\xEDas de demora estimada, impacta el hito de procesamiento serol\xF3gico de CIT-SA-2024-01."
  },
  {
    id: "a2",
    tipo: "Continuidad de l\xEDnea",
    severidad: "alta",
    texto: "La l\xEDnea Primatolog\xEDa est\xE1 sin director formado desde la jubilaci\xF3n del Dr. Maidana (2023)."
  },
  {
    id: "a3",
    tipo: "Dedicaci\xF3n horaria",
    severidad: "media",
    texto: "M\xE9d. Vet. Juli\xE1n Ram\xEDrez acumula 110% de dedicaci\xF3n entre CIT-SA-2024-01 y CIT-NA-2025-02."
  },
  {
    id: "a4",
    tipo: "Vencimiento de beca",
    severidad: "media",
    texto: "La beca de Lic. Sof\xEDa Ojeda vence en 08/2026; iniciar pr\xF3rroga o nueva convocatoria."
  }
];
const getLinea = (id) => lineas.find((l) => l.id === id);
const getProyecto = (id) => proyectos.find((p) => p.id === id);
const getInvestigador = (id) => investigadores.find((i) => i.id === id);
const formatMoney = (n) => new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(n);
const formatDate = (iso) => iso === "\u2014" ? "\u2014" : (/* @__PURE__ */ new Date(iso + "T12:00:00")).toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "numeric" });
const totalPresupuesto = (p) => p.presupuesto.reduce(
  (acc, r) => ({ asignado: acc.asignado + r.asignado, ejecutado: acc.ejecutado + r.ejecutado }),
  { asignado: 0, ejecutado: 0 }
);
export {
  alertas,
  convenios,
  diagnosticosPorMes,
  formatDate,
  formatMoney,
  getInvestigador,
  getLinea,
  getProyecto,
  investigadores,
  lineas,
  proyectos,
  publicaciones,
  totalPresupuesto,
  transferencias
};
