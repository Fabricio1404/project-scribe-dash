// Datos de ejemplo para el prototipo de CIT Nexus.
// Reemplazables por la API NestJS del equipo.

export type EstadoLinea = "Activa" | "En riesgo" | "Discontinuada";
export type EstadoProyecto = "En formulación" | "En ejecución" | "Finalizado" | "Suspendido";
export type EstadoTransferencia =
  | "En investigación"
  | "En evaluación"
  | "Lista para transferir"
  | "Transferida"
  | "Licenciada";
export type EstadoConvenio = "Vigente" | "Vencido" | "En negociación";

export interface Linea {
  id: string;
  nombre: string;
  area: string;
  directorActual: string;
  historialDirectores: { nombre: string; periodo: string }[];
  descripcion: string;
  estado: EstadoLinea;
  proyectos: number;
}

export interface Objetivo {
  descripcion: string;
  avance: number;
}

export interface Actividad {
  nombre: string;
  anio: number;
  estado: "Planificada" | "En curso" | "Completada" | "Demorada";
}

export interface RubroPresupuesto {
  categoria: "Gastos de capital" | "Gastos corrientes";
  rubro: string;
  anio: number;
  asignado: number;
  ejecutado: number;
}

export interface MiembroProyecto {
  investigadorId: string;
  rol: "Director" | "Co-director" | "Integrante" | "Colaborador";
  dedicacion: number;
}

export interface Proyecto {
  id: string;
  codigo: string;
  titulo: string;
  lineaId: string;
  resumen: string;
  objetivoGeneral: string;
  objetivos: Objetivo[];
  estado: EstadoProyecto;
  inicio: string;
  fin: string;
  financiador: string;
  directorId: string;
  metodologia: string;
  avance: number;
  equipo: MiembroProyecto[];
  cronograma: Actividad[];
  presupuesto: RubroPresupuesto[];
  hitos: { fecha: string; texto: string }[];
  contingencias: { fecha: string; texto: string }[];
}

export interface Investigador {
  id: string;
  nombre: string;
  dni: string;
  categoria: string;
  area: string;
  orcid: string;
  tipo: "Investigador" | "Becario";
  tipoBeca?: string;
  periodoBeca?: string;
  directorAsignado?: string;
  lineas: string[];
  dedicacionTotal: number;
  email: string;
}

export interface Publicacion {
  id: string;
  titulo: string;
  tipo: "Artículo" | "Libro" | "Capítulo" | "Congreso";
  doi: string;
  autores: string[];
  proyectoId: string;
  fecha: string;
  revista: string;
  visibilidad: "Pública" | "Solo interna";
}

export interface Transferencia {
  id: string;
  nombre: string;
  descripcion: string;
  proyectoId: string;
  estado: EstadoTransferencia;
  beneficiario: string;
  responsableId: string;
}

export interface Convenio {
  id: string;
  titulo: string;
  entidad: string;
  tipo: string;
  firma: string;
  vencimiento: string;
  proyectos: string[];
  estado: EstadoConvenio;
}

export const lineas: Linea[] = [
  {
    id: "l1",
    nombre: "Sanidad Animal",
    area: "Ciencias Veterinarias",
    directorActual: "Dra. Mirta Sosa",
    historialDirectores: [
      { nombre: "Dr. Raúl Benítez", periodo: "1998 – 2021" },
      { nombre: "Dra. Mirta Sosa", periodo: "2021 – actual" },
    ],
    descripcion:
      "Diagnóstico, control y prevención de enfermedades del ganado bovino y bubalino en la provincia de Formosa.",
    estado: "Activa",
    proyectos: 3,
  },
  {
    id: "l2",
    nombre: "Sanidad Vegetal",
    area: "Ciencias Agronómicas",
    directorActual: "Ing. Agr. Carlos Duarte",
    historialDirectores: [{ nombre: "Ing. Agr. Carlos Duarte", periodo: "2016 – actual" }],
    descripcion:
      "Detección temprana y manejo de plagas y enfermedades en cultivos regionales de importancia económica.",
    estado: "Activa",
    proyectos: 2,
  },
  {
    id: "l3",
    nombre: "Nutrición Animal",
    area: "Producción Animal",
    directorActual: "Dr. Hugo Villalba",
    historialDirectores: [
      { nombre: "Ing. Zoot. Ana Rojas", periodo: "2005 – 2022" },
      { nombre: "Dr. Hugo Villalba", periodo: "2022 – actual" },
    ],
    descripcion:
      "Evaluación de forrajes nativos y suplementación estratégica para sistemas ganaderos del este formoseño.",
    estado: "Activa",
    proyectos: 2,
  },
  {
    id: "l4",
    nombre: "Primatología",
    area: "Biología",
    directorActual: "—",
    historialDirectores: [{ nombre: "Dr. Eduardo Maidana", periodo: "1985 – 2023 (jubilado)" }],
    descripcion:
      "Estudio de poblaciones de primates neotropicales y su rol como centinelas sanitarios regionales.",
    estado: "En riesgo",
    proyectos: 1,
  },
  {
    id: "l5",
    nombre: "Controladores Biológicos",
    area: "Entomología aplicada",
    directorActual: "Dra. Lucía Ferreyra",
    historialDirectores: [{ nombre: "Dra. Lucía Ferreyra", periodo: "2019 – actual" }],
    descripcion:
      "Producción y liberación de agentes de control biológico como alternativa al uso de agroquímicos.",
    estado: "Activa",
    proyectos: 2,
  },
];

export const investigadores: Investigador[] = [
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
    email: "m.sosa@cit-formosa.gob.ar",
  },
  {
    id: "i2",
    nombre: "Ing. Agr. Carlos Duarte",
    dni: "22.780.334",
    categoria: "Investigador Independiente",
    area: "Ciencias Agronómicas",
    orcid: "0000-0001-5109-3700",
    tipo: "Investigador",
    lineas: ["Sanidad Vegetal"],
    dedicacionTotal: 80,
    email: "c.duarte@cit-formosa.gob.ar",
  },
  {
    id: "i3",
    nombre: "Dr. Hugo Villalba",
    dni: "24.556.901",
    categoria: "Investigador Adjunto",
    area: "Producción Animal",
    orcid: "0000-0003-4321-1188",
    tipo: "Investigador",
    lineas: ["Nutrición Animal"],
    dedicacionTotal: 70,
    email: "h.villalba@cit-formosa.gob.ar",
  },
  {
    id: "i4",
    nombre: "Dra. Lucía Ferreyra",
    dni: "27.980.114",
    categoria: "Investigador Adjunto",
    area: "Entomología aplicada",
    orcid: "0000-0002-9981-4410",
    tipo: "Investigador",
    lineas: ["Controladores Biológicos"],
    dedicacionTotal: 85,
    email: "l.ferreyra@cit-formosa.gob.ar",
  },
  {
    id: "i5",
    nombre: "Lic. Nahuel Cáceres",
    dni: "38.220.775",
    categoria: "Becario doctoral",
    area: "Ciencias Veterinarias",
    orcid: "0000-0001-7788-2210",
    tipo: "Becario",
    tipoBeca: "Doctoral CONICET",
    periodoBeca: "03/2023 – 03/2028",
    directorAsignado: "Dra. Mirta Sosa",
    lineas: ["Sanidad Animal"],
    dedicacionTotal: 100,
    email: "n.caceres@cit-formosa.gob.ar",
  },
  {
    id: "i6",
    nombre: "Lic. Sofía Ojeda",
    dni: "40.115.220",
    categoria: "Becaria de iniciación",
    area: "Entomología aplicada",
    orcid: "0000-0002-3344-9080",
    tipo: "Becario",
    tipoBeca: "Colaboración Provincia–CONICET",
    periodoBeca: "08/2024 – 08/2026",
    directorAsignado: "Dra. Lucía Ferreyra",
    lineas: ["Controladores Biológicos"],
    dedicacionTotal: 60,
    email: "s.ojeda@cit-formosa.gob.ar",
  },
  {
    id: "i7",
    nombre: "Méd. Vet. Julián Ramírez",
    dni: "33.410.667",
    categoria: "Profesional de apoyo",
    area: "Ciencias Veterinarias",
    orcid: "0000-0003-1122-8890",
    tipo: "Investigador",
    lineas: ["Sanidad Animal", "Nutrición Animal"],
    dedicacionTotal: 110,
    email: "j.ramirez@cit-formosa.gob.ar",
  },
  {
    id: "i8",
    nombre: "Lic. Camila Benítez",
    dni: "39.887.201",
    categoria: "Becaria postdoctoral",
    area: "Biología",
    orcid: "0000-0002-6677-1120",
    tipo: "Becario",
    tipoBeca: "Postdoctoral CONICET",
    periodoBeca: "05/2024 – 05/2026",
    directorAsignado: "—",
    lineas: ["Primatología"],
    dedicacionTotal: 100,
    email: "c.benitez@cit-formosa.gob.ar",
  },
];

export const proyectos: Proyecto[] = [
  {
    id: "p1",
    codigo: "CIT-SA-2024-01",
    titulo: "Vigilancia epidemiológica de brucelosis bovina en el este formoseño",
    lineaId: "l1",
    resumen:
      "Relevamiento serológico en establecimientos ganaderos para determinar prevalencia de brucelosis y generar un mapa de riesgo provincial.",
    objetivoGeneral:
      "Reducir la prevalencia de brucelosis bovina mediante diagnóstico temprano y articulación con SENASA.",
    objetivos: [
      { descripcion: "Muestreo en 120 establecimientos del departamento Pilcomayo", avance: 78 },
      { descripcion: "Procesamiento serológico y carga en base provincial", avance: 64 },
      { descripcion: "Mapa de riesgo georreferenciado", avance: 30 },
    ],
    estado: "En ejecución",
    inicio: "2024-03-01",
    fin: "2026-12-31",
    financiador: "Ministerio de Producción de Formosa",
    directorId: "i1",
    metodologia:
      "Muestreo estratificado por departamento, diagnóstico por BPA y confirmación por FPA, análisis espacial con QGIS.",
    avance: 57,
    equipo: [
      { investigadorId: "i1", rol: "Director", dedicacion: 40 },
      { investigadorId: "i5", rol: "Integrante", dedicacion: 70 },
      { investigadorId: "i7", rol: "Colaborador", dedicacion: 30 },
    ],
    cronograma: [
      { nombre: "Diseño de muestreo y permisos", anio: 2024, estado: "Completada" },
      { nombre: "Campañas de muestreo a campo", anio: 2025, estado: "En curso" },
      { nombre: "Procesamiento de sueros", anio: 2025, estado: "Demorada" },
      { nombre: "Análisis espacial y reporte final", anio: 2026, estado: "Planificada" },
    ],
    presupuesto: [
      { categoria: "Gastos de capital", rubro: "Equipamiento", anio: 2025, asignado: 4800000, ejecutado: 4500000 },
      { categoria: "Gastos corrientes", rubro: "Reactivos e insumos", anio: 2025, asignado: 6200000, ejecutado: 3100000 },
      { categoria: "Gastos corrientes", rubro: "Viajes y viáticos", anio: 2025, asignado: 3500000, ejecutado: 2750000 },
      { categoria: "Gastos corrientes", rubro: "Difusión de resultados", anio: 2025, asignado: 900000, ejecutado: 320000 },
      { categoria: "Gastos corrientes", rubro: "Servicios de terceros", anio: 2025, asignado: 1400000, ejecutado: 620000 },
    ],
    hitos: [
      { fecha: "2024-11-20", texto: "Primeros 60 establecimientos relevados" },
      { fecha: "2025-04-08", texto: "Convenio operativo firmado con SENASA regional" },
    ],
    contingencias: [
      { fecha: "2025-02-14", texto: "Inundaciones en Laguna Blanca: se reprogramaron 3 campañas de muestreo." },
      { fecha: "2025-06-02", texto: "Demora de 78 días en kits importados; se priorizó procesamiento por lotes." },
    ],
  },
  {
    id: "p2",
    codigo: "CIT-SV-2023-04",
    titulo: "Manejo integrado de HLB en cítricos del corredor Ruta 81",
    lineaId: "l2",
    resumen:
      "Monitoreo de vectores y detección temprana de Huanglongbing en quintas citrícolas familiares del oeste provincial.",
    objetivoGeneral:
      "Establecer un sistema de alerta temprana de HLB adaptado a la pequeña producción citrícola formoseña.",
    objetivos: [
      { descripcion: "Red de trampas amarillas en 40 quintas", avance: 92 },
      { descripcion: "Protocolo de manejo integrado validado", avance: 55 },
      { descripcion: "Capacitación a productores", avance: 40 },
    ],
    estado: "En ejecución",
    inicio: "2023-08-01",
    fin: "2026-07-31",
    financiador: "Financiamiento nacional (PICT)",
    directorId: "i2",
    metodologia:
      "Monitoreo quincenal de Diaphorina citri, análisis por PCR de material vegetal sintomático y ensayos de control.",
    avance: 62,
    equipo: [
      { investigadorId: "i2", rol: "Director", dedicacion: 50 },
      { investigadorId: "i4", rol: "Co-director", dedicacion: 25 },
    ],
    cronograma: [
      { nombre: "Instalación de red de trampas", anio: 2024, estado: "Completada" },
      { nombre: "Monitoreo y análisis PCR", anio: 2025, estado: "En curso" },
      { nombre: "Talleres con productores", anio: 2026, estado: "Planificada" },
    ],
    presupuesto: [
      { categoria: "Gastos de capital", rubro: "Equipamiento", anio: 2025, asignado: 2600000, ejecutado: 2600000 },
      { categoria: "Gastos corrientes", rubro: "Reactivos e insumos", anio: 2025, asignado: 4100000, ejecutado: 2350000 },
      { categoria: "Gastos corrientes", rubro: "Viajes y viáticos", anio: 2025, asignado: 2200000, ejecutado: 1480000 },
      { categoria: "Gastos corrientes", rubro: "Otros gastos", anio: 2025, asignado: 600000, ejecutado: 180000 },
    ],
    hitos: [{ fecha: "2025-03-12", texto: "Primer reporte provincial de densidad de vector" }],
    contingencias: [
      { fecha: "2025-01-25", texto: "Ola de calor extremo: se suspendieron 2 semanas de monitoreo a campo." },
    ],
  },
  {
    id: "p3",
    codigo: "CIT-NA-2025-02",
    titulo: "Suplementación estratégica con forrajes nativos en cría bovina",
    lineaId: "l3",
    resumen:
      "Evaluación de la respuesta productiva de vientres bajo suplementación con especies forrajeras nativas del bañado.",
    objetivoGeneral:
      "Mejorar índices de preñez en rodeos de cría mediante suplementación de bajo costo con recursos locales.",
    objetivos: [
      { descripcion: "Caracterización nutricional de 8 especies nativas", avance: 45 },
      { descripcion: "Ensayo a campo en 3 establecimientos", avance: 20 },
    ],
    estado: "En ejecución",
    inicio: "2025-02-01",
    fin: "2027-12-31",
    financiador: "Convenio bilateral CIT – INTA",
    directorId: "i3",
    metodologia:
      "Análisis bromatológico en laboratorio y ensayos con lotes testigo y tratamiento durante dos servicios.",
    avance: 33,
    equipo: [
      { investigadorId: "i3", rol: "Director", dedicacion: 45 },
      { investigadorId: "i7", rol: "Integrante", dedicacion: 40 },
    ],
    cronograma: [
      { nombre: "Colecta y análisis bromatológico", anio: 2025, estado: "En curso" },
      { nombre: "Ensayo productivo servicio 1", anio: 2026, estado: "Planificada" },
      { nombre: "Ensayo productivo servicio 2", anio: 2027, estado: "Planificada" },
    ],
    presupuesto: [
      { categoria: "Gastos corrientes", rubro: "Reactivos e insumos", anio: 2025, asignado: 3200000, ejecutado: 980000 },
      { categoria: "Gastos corrientes", rubro: "Viajes y viáticos", anio: 2025, asignado: 2800000, ejecutado: 1120000 },
      { categoria: "Gastos de capital", rubro: "Bibliografía", anio: 2025, asignado: 350000, ejecutado: 120000 },
    ],
    hitos: [],
    contingencias: [],
  },
  {
    id: "p4",
    codigo: "CIT-CB-2022-07",
    titulo: "Cría masiva de Trichogramma para control de lepidópteros en algodón",
    lineaId: "l5",
    resumen:
      "Escalado de la producción de parasitoides en biofábrica del CIT y evaluación a campo en lotes algodoneros.",
    objetivoGeneral:
      "Disponer de un paquete tecnológico de control biológico transferible al sector algodonero provincial.",
    objetivos: [
      { descripcion: "Protocolo de cría masiva optimizado", avance: 100 },
      { descripcion: "Validación a campo en 6 lotes", avance: 85 },
      { descripcion: "Documento de transferencia al sector", avance: 60 },
    ],
    estado: "En ejecución",
    inicio: "2022-06-01",
    fin: "2026-05-31",
    financiador: "Ministerio de Producción de Formosa",
    directorId: "i4",
    metodologia:
      "Cría sobre huéspedes alternativos, liberaciones inundativas y evaluación de porcentaje de parasitismo.",
    avance: 82,
    equipo: [
      { investigadorId: "i4", rol: "Director", dedicacion: 40 },
      { investigadorId: "i6", rol: "Integrante", dedicacion: 60 },
    ],
    cronograma: [
      { nombre: "Optimización de cría en biofábrica", anio: 2023, estado: "Completada" },
      { nombre: "Liberaciones a campo", anio: 2025, estado: "En curso" },
      { nombre: "Manual de transferencia", anio: 2026, estado: "Planificada" },
    ],
    presupuesto: [
      { categoria: "Gastos de capital", rubro: "Equipamiento", anio: 2025, asignado: 5400000, ejecutado: 5400000 },
      { categoria: "Gastos corrientes", rubro: "Reactivos e insumos", anio: 2025, asignado: 2900000, ejecutado: 2410000 },
      { categoria: "Gastos corrientes", rubro: "Difusión de resultados", anio: 2025, asignado: 1200000, ejecutado: 860000 },
    ],
    hitos: [
      { fecha: "2024-09-30", texto: "Biofábrica alcanza 2 millones de individuos/mes" },
      { fecha: "2025-05-18", texto: "72% de parasitismo promedio en lotes validados" },
    ],
    contingencias: [],
  },
  {
    id: "p5",
    codigo: "CIT-PR-2021-03",
    titulo: "Monitoreo sanitario de poblaciones de Alouatta caraya",
    lineaId: "l4",
    resumen:
      "Seguimiento de poblaciones de mono aullador negro como centinela de arbovirosis en el corredor del río Paraguay.",
    objetivoGeneral:
      "Sostener la serie histórica de vigilancia de fiebre amarilla en primates de la provincia.",
    objetivos: [{ descripcion: "Relevamiento anual de tropas", avance: 100 }],
    estado: "Suspendido",
    inicio: "2021-01-01",
    fin: "2025-12-31",
    financiador: "Fondos propios CIT",
    directorId: "i8",
    metodologia: "Transectas lineales, registro acústico y muestreo oportunista.",
    avance: 100,
    equipo: [{ investigadorId: "i8", rol: "Integrante", dedicacion: 50 }],
    cronograma: [{ nombre: "Relevamiento de tropas", anio: 2024, estado: "Completada" }],
    presupuesto: [
      { categoria: "Gastos corrientes", rubro: "Viajes y viáticos", anio: 2025, asignado: 1500000, ejecutado: 300000 },
    ],
    hitos: [{ fecha: "2023-10-02", texto: "Serie histórica de 12 años consolidada" }],
    contingencias: [
      { fecha: "2025-01-10", texto: "Jubilación del director de línea: proyecto suspendido hasta designar responsable." },
    ],
  },
  {
    id: "p6",
    codigo: "CIT-SV-2026-01",
    titulo: "Detección temprana de Fusarium en banano del norte provincial",
    lineaId: "l2",
    resumen: "Formulación de una red de diagnóstico rápido para el mal de Panamá raza 4 tropical.",
    objetivoGeneral: "Prevenir el ingreso y dispersión de Foc R4T en la producción bananera formoseña.",
    objetivos: [{ descripcion: "Protocolo de vigilancia definido", avance: 15 }],
    estado: "En formulación",
    inicio: "2026-09-01",
    fin: "2029-08-31",
    financiador: "A definir",
    directorId: "i2",
    metodologia: "Diagnóstico molecular y vigilancia participativa con productores.",
    avance: 8,
    equipo: [{ investigadorId: "i2", rol: "Director", dedicacion: 15 }],
    cronograma: [{ nombre: "Formulación y presentación", anio: 2026, estado: "En curso" }],
    presupuesto: [],
    hitos: [],
    contingencias: [],
  },
];

export const publicaciones: Publicacion[] = [
  {
    id: "pub1",
    titulo: "Seroprevalencia de Brucella abortus en rodeos de cría del este de Formosa",
    tipo: "Artículo",
    doi: "10.1016/j.rvsc.2025.104412",
    autores: ["Sosa, M.", "Cáceres, N.", "Ramírez, J."],
    proyectoId: "p1",
    fecha: "2025-06-14",
    revista: "Revista Veterinaria Argentina",
    visibilidad: "Pública",
  },
  {
    id: "pub2",
    titulo: "Dinámica poblacional de Diaphorina citri en quintas familiares del oeste formoseño",
    tipo: "Artículo",
    doi: "10.1590/1678-4499.20250088",
    autores: ["Duarte, C.", "Ferreyra, L."],
    proyectoId: "p2",
    fecha: "2025-03-02",
    revista: "Bragantia",
    visibilidad: "Pública",
  },
  {
    id: "pub3",
    titulo: "Cría masiva de Trichogramma pretiosum: escalado en biofábrica regional",
    tipo: "Congreso",
    doi: "10.5281/zenodo.10992331",
    autores: ["Ferreyra, L.", "Ojeda, S."],
    proyectoId: "p4",
    fecha: "2024-11-08",
    revista: "XI Congreso Argentino de Control Biológico",
    visibilidad: "Pública",
  },
  {
    id: "pub4",
    titulo: "Informe técnico interno: costos operativos de la biofábrica CIT",
    tipo: "Capítulo",
    doi: "—",
    autores: ["Ferreyra, L."],
    proyectoId: "p4",
    fecha: "2025-02-20",
    revista: "Serie Documentos CIT",
    visibilidad: "Solo interna",
  },
  {
    id: "pub5",
    titulo: "Doce años de vigilancia de fiebre amarilla en Alouatta caraya",
    tipo: "Artículo",
    doi: "10.1007/s10329-024-01120-1",
    autores: ["Maidana, E.", "Benítez, C."],
    proyectoId: "p5",
    fecha: "2024-05-30",
    revista: "Primates",
    visibilidad: "Pública",
  },
];

export const transferencias: Transferencia[] = [
  {
    id: "t1",
    nombre: "Paquete tecnológico Trichogramma para algodón",
    descripcion:
      "Protocolo completo de cría, liberación y monitoreo de parasitoides adaptado a lotes algodoneros de hasta 50 ha.",
    proyectoId: "p4",
    estado: "Lista para transferir",
    beneficiario: "Cooperativa algodonera de Pirané",
    responsableId: "i4",
  },
  {
    id: "t2",
    nombre: "Servicio de diagnóstico serológico de brucelosis",
    descripcion:
      "Diagnóstico BPA/FPA con emisión de certificado para establecimientos ganaderos y trámites ante SENASA.",
    proyectoId: "p1",
    estado: "Transferida",
    beneficiario: "Productores ganaderos y SENASA regional",
    responsableId: "i1",
  },
  {
    id: "t3",
    nombre: "Sistema de alerta temprana de HLB",
    descripcion:
      "Red de trampeo y protocolo de aviso a productores citrícolas ante detección de vector por encima del umbral.",
    proyectoId: "p2",
    estado: "En evaluación",
    beneficiario: "Ministerio de Producción de Formosa",
    responsableId: "i2",
  },
  {
    id: "t4",
    nombre: "Bloque nutricional con forrajes nativos",
    descripcion: "Formulación de suplemento de bajo costo con recursos forrajeros del bañado formoseño.",
    proyectoId: "p3",
    estado: "En investigación",
    beneficiario: "Pequeños productores de cría",
    responsableId: "i3",
  },
];

export const convenios: Convenio[] = [
  {
    id: "c1",
    titulo: "Convenio marco de cooperación técnica CIT – SENASA",
    entidad: "SENASA",
    tipo: "Cooperación",
    firma: "2023-04-11",
    vencimiento: "2027-04-10",
    proyectos: ["p1"],
    estado: "Vigente",
  },
  {
    id: "c2",
    titulo: "Acuerdo específico de vigilancia fitosanitaria",
    entidad: "Ministerio de Producción de Formosa",
    tipo: "Financiamiento",
    firma: "2024-02-20",
    vencimiento: "2026-12-31",
    proyectos: ["p2", "p4"],
    estado: "Vigente",
  },
  {
    id: "c3",
    titulo: "Convenio de asistencia técnica en nutrición de rodeos",
    entidad: "INTA EEA Colonia Benítez",
    tipo: "Transferencia",
    firma: "2025-01-15",
    vencimiento: "2028-01-14",
    proyectos: ["p3"],
    estado: "Vigente",
  },
  {
    id: "c4",
    titulo: "Carta de intención para producción de biocontroladores",
    entidad: "Cooperativa algodonera de Pirané",
    tipo: "Servicio",
    firma: "2026-05-05",
    vencimiento: "2026-11-05",
    proyectos: ["p4"],
    estado: "En negociación",
  },
  {
    id: "c5",
    titulo: "Convenio de uso de laboratorio de biología molecular",
    entidad: "Universidad Nacional de Formosa",
    tipo: "Cooperación",
    firma: "2021-09-01",
    vencimiento: "2025-08-31",
    proyectos: ["p2", "p5"],
    estado: "Vencido",
  },
];

export const diagnosticosPorMes = [
  { mes: "Ene", positivos: 12, negativos: 148 },
  { mes: "Feb", positivos: 9, negativos: 132 },
  { mes: "Mar", positivos: 17, negativos: 175 },
  { mes: "Abr", positivos: 14, negativos: 190 },
  { mes: "May", positivos: 21, negativos: 168 },
  { mes: "Jun", positivos: 11, negativos: 145 },
  { mes: "Jul", positivos: 8, negativos: 121 },
  { mes: "Ago", positivos: 15, negativos: 160 },
];

export const alertas = [
  {
    id: "a1",
    tipo: "Cadena de suministro",
    severidad: "alta" as const,
    texto:
      "Kit de FPA importado sin orden de compra: 78 días de demora estimada, impacta el hito de procesamiento serológico de CIT-SA-2024-01.",
  },
  {
    id: "a2",
    tipo: "Continuidad de línea",
    severidad: "alta" as const,
    texto: "La línea Primatología está sin director formado desde la jubilación del Dr. Maidana (2023).",
  },
  {
    id: "a3",
    tipo: "Dedicación horaria",
    severidad: "media" as const,
    texto: "Méd. Vet. Julián Ramírez acumula 110% de dedicación entre CIT-SA-2024-01 y CIT-NA-2025-02.",
  },
  {
    id: "a4",
    tipo: "Vencimiento de beca",
    severidad: "media" as const,
    texto: "La beca de Lic. Sofía Ojeda vence en 08/2026; iniciar prórroga o nueva convocatoria.",
  },
];

// Helpers ------------------------------------------------------------------

export const getLinea = (id: string) => lineas.find((l) => l.id === id);
export const getProyecto = (id: string) => proyectos.find((p) => p.id === id);
export const getInvestigador = (id: string) => investigadores.find((i) => i.id === id);

export const formatMoney = (n: number) =>
  new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(n);

export const formatDate = (iso: string) =>
  iso === "—" ? "—" : new Date(iso + "T12:00:00").toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "numeric" });

export const totalPresupuesto = (p: Proyecto) =>
  p.presupuesto.reduce(
    (acc, r) => ({ asignado: acc.asignado + r.asignado, ejecutado: acc.ejecutado + r.ejecutado }),
    { asignado: 0, ejecutado: 0 },
  );
