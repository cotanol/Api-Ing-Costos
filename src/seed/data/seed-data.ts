import {
  Comportamiento,
  Frecuencia,
  Naturaleza,
  Tipo,
  TipoFlujo,
} from 'src/items-flujo-base/entities/item-flujo-base.entity';

interface SeedUser {
  id: string;
  email: string;
  nombres: string;
  apellidos: string;
  roles: string[];
  isActive: boolean;
  password: string;
}

interface SeedProyecto {
  id: string;
  nombre: string;
  descripcion: string;
  horizonteAnalisis: number;
  tasaDescuento: number;
  user: string; // user id
}

interface SeedCategoriaFlujo {
  id: string;
  nombre: string;
  descripcion: string;
}

interface SeedItemFlujoBase {
  id: string;
  nombre: string;
  descripcion: string;
  montoSugerido: number;
  frecuencia: Frecuencia;
  naturaleza: Naturaleza;
  tipo: Tipo;
  tipoFlujo: TipoFlujo;
  comportamiento: Comportamiento;
  categoria: string; // categoria id
}

interface SeedFlujoFinanciero {
  id: string;
  nombre: string;
  descripcion: string;
  valoresAnuales: number[];
  tipoFlujo: TipoFlujo;
  tipo: Tipo;
  comportamiento: Comportamiento;
  naturaleza: Naturaleza;
  proyecto: string; // proyecto id
  categoria: string; // categoria id
  itemFlujoBase: string; // itemFlujoBase id
}

interface SeedData {
  users: SeedUser[];
  proyectos: SeedProyecto[];
  categoriasFlujo: SeedCategoriaFlujo[];
  itemsFlujoBase: SeedItemFlujoBase[];
  flujosFinancieros: SeedFlujoFinanciero[];
}

export const initialData: SeedData = {
  users: [
    {
      id: 'd9b7f4a0-5b3a-4b0e-8e7e-9f3a3a3a3a3a',
      email: 'admin@example.com',
      nombres: 'Franchesco',
      apellidos: 'Perez',
      roles: ['user', 'admin'],
      isActive: true,
      password: '123456Ab',
    },
    {
      id: 'd9b7f4a0-5b3a-4b0e-8e7e-9f3a3a3a3a3b',
      email: 'user2@example.com',
      nombres: 'Ana',
      apellidos: 'Gomez',
      roles: ['user'],
      isActive: true,
      password: '123456Ab',
    },
  ],
  categoriasFlujo: [
    // Categorías Originales
    {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      nombre: 'Costos de Adquisición',
      descripcion: 'Costos asociados a la compra de licencias y hardware.',
    },
    {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d480',
      nombre: 'Costos de Implementación',
      descripcion: 'Costos de configuración, personalización e integración.',
    },
    {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d481',
      nombre: 'Beneficios por Eficiencia',
      descripcion: 'Ahorros generados por la automatización de tareas.',
    }, // Nuevas Categorías
    {
      id: 'c1b3e8a0-3b1e-4b8e-9f8b-3e8a2b1c4d5e',
      nombre: 'Costos de Personal',
      descripcion:
        'Salarios, beneficios y otros costos relacionados con el personal del proyecto.',
    },
    {
      id: 'd2c4f9b1-4c2f-5c9f-af9c-4f9b3c2d5e6f',
      nombre: 'Marketing y Ventas',
      descripcion:
        'Costos asociados a la promoción, publicidad y venta de productos o servicios.',
    },
    {
      id: 'e3d50ac2-5d30-6da0-b0ad-50ac4d3e6f70',
      nombre: 'Infraestructura y Mantenimiento',
      descripcion:
        'Costos de hardware, alquiler de oficinas, servicios públicos y mantenimiento general.',
    },
    {
      id: '34322e59-945a-414a-ba2e-e575a60b449d',
      nombre: 'Capacitación y Desarrollo',
      descripcion:
        'Costos para la formación y desarrollo de habilidades del equipo.',
    },
    {
      id: '44db1787-09eb-4824-a3ac-d8c298b209dd',
      nombre: 'Ingresos por Ventas',
      descripcion:
        'Ingresos generados directamente por la venta de productos o servicios.',
    },
    {
      id: '68a53d0f-d25c-4a73-8b84-62e44fe9495b',
      nombre: 'Reducción de Costos Operativos',
      descripcion:
        'Ahorros generados por la optimización de procesos operativos existentes.',
    },
    {
      id: '58a5800c-3381-4d90-bd97-990105087333',
      nombre: 'Costos Legales y de Cumplimiento',
      descripcion:
        'Gastos en asesoría legal, licencias gubernamentales y cumplimiento de normativas.',
    },
  ],
  // --- Items de Flujo Base Extendidos ---
  itemsFlujoBase: [
    // Items Originales
    {
      id: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
      nombre: 'Licencia de Software',
      descripcion: 'Costo anual de la licencia del nuevo software.',
      montoSugerido: 5000,
      frecuencia: Frecuencia.ANUAL,
      naturaleza: Naturaleza.TANGIBLE,
      tipo: Tipo.DIRECTO,
      tipoFlujo: TipoFlujo.EGRESO,
      comportamiento: Comportamiento.FIJO,
      categoria: 'f47ac10b-58cc-4372-a567-0e02b2c3d479', // Costos de Adquisición
    },
    {
      id: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5e',
      nombre: 'Servidores en la Nube',
      descripcion: 'Costo mensual de la infraestructura en la nube.',
      montoSugerido: 1000,
      frecuencia: Frecuencia.MENSUAL,
      naturaleza: Naturaleza.TANGIBLE,
      tipo: Tipo.DIRECTO,
      tipoFlujo: TipoFlujo.EGRESO,
      comportamiento: Comportamiento.VARIABLE,
      categoria: 'f47ac10b-58cc-4372-a567-0e02b2c3d479', // Costos de Adquisición
    },
    {
      id: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5f',
      nombre: 'Ahorro en Horas de Trabajo',
      descripcion:
        'Reducción de horas de trabajo manual gracias a la automatización.',
      montoSugerido: 15000,
      frecuencia: Frecuencia.ANUAL,
      naturaleza: Naturaleza.INTANGIBLE,
      tipo: Tipo.DIRECTO,
      tipoFlujo: TipoFlujo.INGRESO,
      comportamiento: Comportamiento.FIJO,
      categoria: 'f47ac10b-58cc-4372-a567-0e02b2c3d481', // Beneficios por Eficiencia
    }, // Nuevos Items
    // **Costos de Personal**
    {
      id: 'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
      nombre: 'Salarios del Equipo de Proyecto',
      descripcion:
        'Salarios mensuales para los miembros del equipo dedicados al proyecto.',
      montoSugerido: 25000,
      frecuencia: Frecuencia.MENSUAL,
      naturaleza: Naturaleza.TANGIBLE,
      tipo: Tipo.DIRECTO,
      tipoFlujo: TipoFlujo.EGRESO,
      comportamiento: Comportamiento.FIJO,
      categoria: 'c1b3e8a0-3b1e-4b8e-9f8b-3e8a2b1c4d5e',
    },
    {
      id: '2f04239f-cbe8-4229-b192-f7c26c22f92a',
      nombre: 'Contratación de Consultores Externos',
      descripcion: 'Costo por hora de consultores especializados.',
      montoSugerido: 3000,
      frecuencia: Frecuencia.UNICO,
      naturaleza: Naturaleza.TANGIBLE,
      tipo: Tipo.DIRECTO,
      tipoFlujo: TipoFlujo.EGRESO,
      comportamiento: Comportamiento.VARIABLE,
      categoria: 'c1b3e8a0-3b1e-4b8e-9f8b-3e8a2b1c4d5e',
    }, // **Marketing y Ventas**
    {
      id: 'c1d9bc7a-5a51-48dc-bed0-d9320d1d481b',
      nombre: 'Campaña de Marketing Digital',
      descripcion: 'Inversión en anuncios de Google y redes sociales.',
      montoSugerido: 2000,
      frecuencia: Frecuencia.MENSUAL,
      naturaleza: Naturaleza.TANGIBLE,
      tipo: Tipo.INDIRECTO,
      tipoFlujo: TipoFlujo.EGRESO,
      comportamiento: Comportamiento.VARIABLE,
      categoria: 'd2c4f9b1-4c2f-5c9f-af9c-4f9b3c2d5e6f',
    },
    {
      id: '5e96ee03-16b8-49f3-ad64-b15ec359e90a',
      nombre: 'Comisiones de Venta',
      descripcion:
        'Porcentaje de comisión sobre las nuevas ventas generadas por el proyecto.',
      montoSugerido: 8000,
      frecuencia: Frecuencia.ANUAL,
      naturaleza: Naturaleza.TANGIBLE,
      tipo: Tipo.DIRECTO,
      tipoFlujo: TipoFlujo.EGRESO,
      comportamiento: Comportamiento.VARIABLE,
      categoria: 'd2c4f9b1-4c2f-5c9f-af9c-4f9b3c2d5e6f',
    }, // **Infraestructura y Mantenimiento**
    {
      id: 'a9349401-6278-45fb-85d5-d0864ee01510',
      nombre: 'Mantenimiento de Servidores Físicos',
      descripcion:
        'Costo anual de mantenimiento para la infraestructura on-premise.',
      montoSugerido: 12000,
      frecuencia: Frecuencia.ANUAL,
      naturaleza: Naturaleza.TANGIBLE,
      tipo: Tipo.INDIRECTO,
      tipoFlujo: TipoFlujo.EGRESO,
      comportamiento: Comportamiento.FIJO,
      categoria: 'e3d50ac2-5d30-6da0-b0ad-50ac4d3e6f70',
    },
    {
      id: '2410949a-5f4e-44d4-834c-50ce4d8f7d18',
      nombre: 'Alquiler de Espacio de Oficina Adicional',
      descripcion:
        'Costo mensual por alquiler de espacio extra para el equipo del proyecto.',
      montoSugerido: 1500,
      frecuencia: Frecuencia.MENSUAL,
      naturaleza: Naturaleza.TANGIBLE,
      tipo: Tipo.DIRECTO,
      tipoFlujo: TipoFlujo.EGRESO,
      comportamiento: Comportamiento.FIJO,
      categoria: 'e3d50ac2-5d30-6da0-b0ad-50ac4d3e6f70',
    }, // **Capacitación y Desarrollo**
    {
      id: '97e3c7c0-a5bc-445f-a76c-f34b01605bee',
      nombre: 'Curso de Capacitación en Nuevo Software',
      descripcion:
        'Costo único para capacitar al equipo en la nueva herramienta.',
      montoSugerido: 4500,
      frecuencia: Frecuencia.UNICO,
      naturaleza: Naturaleza.INTANGIBLE,
      tipo: Tipo.DIRECTO,
      tipoFlujo: TipoFlujo.EGRESO,
      comportamiento: Comportamiento.FIJO,
      categoria: '34322e59-945a-414a-ba2e-e575a60b449d',
    }, // **Ingresos por Ventas**
    {
      id: 'cf803670-7ef4-4274-b6fe-51c70bd15b95',
      nombre: 'Ingresos por Suscripción a Nuevo Servicio',
      descripcion: 'Ingresos recurrentes mensuales del nuevo servicio lanzado.',
      montoSugerido: 18000,
      frecuencia: Frecuencia.MENSUAL,
      naturaleza: Naturaleza.TANGIBLE,
      tipo: Tipo.DIRECTO,
      tipoFlujo: TipoFlujo.INGRESO,
      comportamiento: Comportamiento.VARIABLE,
      categoria: '44db1787-09eb-4824-a3ac-d8c298b209dd',
    },
    {
      id: '8c4c0a33-8957-4919-94b5-98fc1778d241',
      nombre: 'Venta de Nuevo Producto',
      descripcion:
        'Ingresos anuales estimados por la venta del nuevo producto.',
      montoSugerido: 250000,
      frecuencia: Frecuencia.ANUAL,
      naturaleza: Naturaleza.TANGIBLE,
      tipo: Tipo.DIRECTO,
      tipoFlujo: TipoFlujo.INGRESO,
      comportamiento: Comportamiento.VARIABLE,
      categoria: '44db1787-09eb-4824-a3ac-d8c298b209dd',
    }, // **Reducción de Costos Operativos**
    {
      id: 'f300fe8a-6195-44b5-8340-bf76a88952b4',
      nombre: 'Ahorro en Consumo de Energía',
      descripcion:
        'Reducción de costos de servicios públicos gracias a nueva tecnología.',
      montoSugerido: 6000,
      frecuencia: Frecuencia.ANUAL,
      naturaleza: Naturaleza.TANGIBLE,
      tipo: Tipo.INDIRECTO,
      tipoFlujo: TipoFlujo.INGRESO,
      comportamiento: Comportamiento.FIJO,
      categoria: '68a53d0f-d25c-4a73-8b84-62e44fe9495b',
    }, // **Costos Legales y de Cumplimiento**
    {
      id: 'c38fd200-868f-4700-b384-d72da8c19550',
      nombre: 'Asesoría Legal para Contratos',
      descripcion:
        'Costo único para la revisión y redacción de contratos con proveedores.',
      montoSugerido: 3500,
      frecuencia: Frecuencia.UNICO,
      naturaleza: Naturaleza.TANGIBLE,
      tipo: Tipo.INDIRECTO,
      tipoFlujo: TipoFlujo.EGRESO,
      comportamiento: Comportamiento.FIJO,
      categoria: '58a5800c-3381-4d90-bd97-990105087333',
    }, // **Costos de Implementación (Nuevos)**
    {
      id: '6a4b5c6d-7e8f-4f80-8182-838485868789',
      nombre: 'Migración de Datos',
      descripcion:
        'Costo del proceso de migración de datos desde el sistema antiguo al nuevo.',
      montoSugerido: 8000,
      frecuencia: Frecuencia.UNICO,
      naturaleza: Naturaleza.TANGIBLE,
      tipo: Tipo.DIRECTO,
      tipoFlujo: TipoFlujo.EGRESO,
      comportamiento: Comportamiento.FIJO,
      categoria: 'f47ac10b-58cc-4372-a567-0e02b2c3d480',
    },
    // --- NUEVO Item Base para Imprevistos ---
    {
      id: '7b5c6d7e-8f90-4a81-9283-84858687890a',
      nombre: 'Fondo de Imprevistos',
      descripcion: 'Reserva de contingencia para costos no planificados.',
      montoSugerido: 0,
      frecuencia: Frecuencia.UNICO,
      naturaleza: Naturaleza.TANGIBLE,
      tipo: Tipo.INDIRECTO,
      tipoFlujo: TipoFlujo.EGRESO,
      comportamiento: Comportamiento.FIJO,
      categoria: 'f47ac10b-58cc-4372-a567-0e02b2c3d480', // Costos de Implementación
    },
  ],
  proyectos: [
    {
      id: 'b1c2d3e4-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
      nombre: 'Implementación de CRM',
      descripcion:
        'Análisis de costo-beneficio para la implementación de un nuevo CRM.',
      horizonteAnalisis: 5,
      tasaDescuento: 10,
      user: 'd9b7f4a0-5b3a-4b0e-8e7e-9f3a3a3a3a3a',
    },
    {
      id: 'b1c2d3e4-f6a7-4b8c-9d0e-1f2a3b4c5d6f',
      nombre: 'Migración a la Nube',
      descripcion:
        'Análisis de costo-beneficio para migrar la infraestructura a la nube.',
      horizonteAnalisis: 3,
      tasaDescuento: 12,
      user: 'd9b7f4a0-5b3a-4b0e-8e7e-9f3a3a3a3a3b',
    },
  ],
  flujosFinancieros: [
    {
      id: 'c1d2e3f4-a7b8-4c9d-0e1f-2a3b4c5d6e7f',
      nombre: 'Costo Anual Licencia CRM',
      descripcion: 'Costo de la licencia del CRM para el equipo de ventas.',
      valoresAnuales: [5000, 5000, 5000, 5000, 5000],
      tipoFlujo: TipoFlujo.EGRESO,
      tipo: Tipo.DIRECTO,
      comportamiento: Comportamiento.FIJO,
      naturaleza: Naturaleza.TANGIBLE,
      proyecto: 'b1c2d3e4-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
      categoria: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      itemFlujoBase: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
    },
    {
      id: 'c1d2e3f4-a7b8-4c9d-0e1f-2a3b4c5d6e80',
      nombre: 'Ahorro por Automatización de Reportes',
      descripcion:
        'Beneficio anual estimado por la automatización de reportes de ventas.',
      valoresAnuales: [0, 15000, 15000, 15000, 15000],
      tipoFlujo: TipoFlujo.INGRESO,
      tipo: Tipo.DIRECTO,
      comportamiento: Comportamiento.FIJO,
      naturaleza: Naturaleza.INTANGIBLE,
      proyecto: 'b1c2d3e4-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
      categoria: 'f47ac10b-58cc-4372-a567-0e02b2c3d481',
      itemFlujoBase: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5f',
    },
    // --- Flujos Financieros del Presupuesto (NUEVO) ---
    {
      id: 'd2e3f4a5-b8c9-4d0e-1f2a-3b4c5d6e7f81',
      nombre: 'Costo de Desarrollo (Recursos Humanos)',
      descripcion: 'Costo total de horas de desarrollo para el proyecto.',
      valoresAnuales: [5760, 0, 0, 0, 0], // Inversión en Año 0
      tipoFlujo: TipoFlujo.EGRESO,
      tipo: Tipo.DIRECTO,
      comportamiento: Comportamiento.FIJO,
      naturaleza: Naturaleza.TANGIBLE,
      proyecto: 'b1c2d3e4-f6a7-4b8c-9d0e-1f2a3b4c5d6e', // Asociado al proyecto CRM
      categoria: 'c1b3e8a0-3b1e-4b8e-9f8b-3e8a2b1c4d5e', // Costos de Personal
      itemFlujoBase: 'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
    },
    {
      id: 'e3f4a5b6-c9d0-4e1f-2a3b-4c5d6e7f8082',
      nombre: 'Reserva para Imprevistos',
      descripcion: 'Reserva del 10% para costos no planificados.',
      valoresAnuales: [576, 0, 0, 0, 0], // Inversión en Año 0
      tipoFlujo: TipoFlujo.EGRESO,
      tipo: Tipo.INDIRECTO,
      comportamiento: Comportamiento.FIJO,
      naturaleza: Naturaleza.TANGIBLE,
      proyecto: 'b1c2d3e4-f6a7-4b8c-9d0e-1f2a3b4c5d6e', // Asociado al proyecto CRM
      categoria: 'f47ac10b-58cc-4372-a567-0e02b2c3d480', // Costos de Implementación
      itemFlujoBase: '7b5c6d7e-8f90-4a81-9283-84858687890a', // Nuevo item base de imprevistos
    },
  ],
};
