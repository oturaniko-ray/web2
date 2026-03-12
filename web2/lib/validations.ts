// lib/validations.ts
import { z } from 'zod';

// ============================================
// ESQUEMAS DE VALIDACIÓN PARA FORMULARIOS
// ============================================

// 1. FORMULARIO DE TRACKING (Localiza tu envío)
export const trackingSchema = z.object({
  trackingNumber: z
    .string()
    .min(1, 'Número de seguimiento requerido')
    .regex(/^[A-Z0-9-]+$/i, 'Formato inválido. Ej: QR-2024-XXXXXX')
    .transform(val => val.toUpperCase())
});

export type TrackingFormData = z.infer<typeof trackingSchema>;

// 2. FORMULARIO DE CONTACTO (Hablemos de logística)
export const contactLogisticsSchema = z.object({
  nombre: z
    .string()
    .min(2, 'Nombre demasiado corto (mínimo 2 caracteres)')
    .max(100, 'Nombre demasiado largo'),
  empresa: z
    .string()
    .min(2, 'Empresa requerida (mínimo 2 caracteres)')
    .max(200, 'Nombre de empresa demasiado largo'),
  email: z
    .string()
    .email('Email inválido. Ej: nombre@empresa.com')
    .transform(val => val.toLowerCase()),
  telefono: z
    .string()
    .regex(/^\+?[\d\s\-()]{7,}$/, 'Teléfono inválido. Ej: +34 600 000 000')
    .optional()
    .or(z.literal('')),
  operativa: z
    .string()
    .min(20, 'Describe brevemente tu operativa (mínimo 20 caracteres)')
    .max(2000, 'Descripción demasiado larga'),
  volumenes: z
    .string()
    .optional()
    .or(z.literal(''))
});

export type ContactLogisticsFormData = z.infer<typeof contactLogisticsSchema>;

// 3. FORMULARIO DE TRANSPORTISTAS (Crece con nosotros)
export const carrierSchema = z.object({
  nombre: z
    .string()
    .min(2, 'Nombre demasiado corto (mínimo 2 caracteres)')
    .max(100, 'Nombre demasiado largo'),
  empresa: z
    .string()
    .min(2, 'Empresa requerida (mínimo 2 caracteres)')
    .max(200, 'Nombre de empresa demasiado largo'),
  email: z
    .string()
    .email('Email inválido. Ej: nombre@empresa.com')
    .transform(val => val.toLowerCase()),
  telefono: z
    .string()
    .regex(/^\+?[\d\s\-()]{7,}$/, 'Teléfono inválido. Ej: +34 600 000 000'),
  zona: z
    .string()
    .min(2, 'Zona de actividad requerida')
    .max(500, 'Descripción de zona demasiado larga'),
  servicios: z
    .string()
    .min(2, 'Servicios requeridos')
    .max(1000, 'Descripción de servicios demasiado larga'),
  vehiculos: z
    .string()
    .min(2, 'Tipología y número de vehículos requeridos')
    .max(500, 'Descripción demasiado larga')
});

export type CarrierFormData = z.infer<typeof carrierSchema>;

// 4. FORMULARIO DE SUSCRIPCIÓN (Monitor del e-commerce)
export const newsletterSchema = z.object({
  email: z
    .string()
    .email('Email inválido. Ej: nombre@empresa.com')
    .transform(val => val.toLowerCase()),
  nombre: z
    .string()
    .min(2, 'Nombre demasiado corto')
    .max(100, 'Nombre demasiado largo')
    .optional(),
  empresa: z
    .string()
    .min(2, 'Empresa demasiado corta')
    .max(200, 'Nombre de empresa demasiado largo')
    .optional()
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;

// 5. FORMULARIO DE VISITA AL ALMACÉN (Tecnología)
export const warehouseVisitSchema = z.object({
  nombre: z
    .string()
    .min(2, 'Nombre demasiado corto')
    .max(100, 'Nombre demasiado largo'),
  empresa: z
    .string()
    .min(2, 'Empresa requerida')
    .max(200, 'Nombre de empresa demasiado largo'),
  email: z
    .string()
    .email('Email inválido')
    .transform(val => val.toLowerCase()),
  telefono: z
    .string()
    .regex(/^\+?[\d\s\-()]{7,}$/, 'Teléfono inválido'),
  fechaPreferida: z
    .string()
    .min(1, 'Fecha preferida requerida'),
  participantes: z
    .string()
    .min(1, 'Número de participantes requerido')
    .regex(/^\d+$/, 'Debe ser un número válido'),
  comentarios: z
    .string()
    .max(1000, 'Comentarios demasiado largos')
    .optional()
    .or(z.literal(''))
});

export type WarehouseVisitFormData = z.infer<typeof warehouseVisitSchema>;

// ============================================
// INTERFACES DE DATOS (STATS, EQUIPO, ETC.)
// ============================================

export interface HeroStats {
  dailyDeliveries: number;
  totalPackages: number;
  provinces: number;
  installations: number;
  populationCoverage: string;
  populationPercentage: number;
}

export const heroStats: HeroStats = {
  dailyDeliveries: 50000,
  totalPackages: 2304001,
  provinces: 50,
  installations: 84,
  populationCoverage: '48M+',
  populationPercentage: 80,
};

export interface Installation {
  id: number;
  name: string;
  type: 'hub' | 'crossdocking' | 'warehouse' | 'locker';
  location: string;
  coordinates: { lat: number; lng: number };
  status: 'operativa' | 'prevista';
  description: string;
}

export const installations: Installation[] = [
  {
    id: 1,
    name: 'Hub Central Madrid',
    type: 'hub',
    location: 'Corredor del Henares, Madrid',
    coordinates: { lat: 40.4168, lng: -3.7038 },
    status: 'operativa',
    description: 'Centro automatizado que coordina toda la distribución nacional',
  },
  {
    id: 2,
    name: 'Cross Docking Barcelona',
    type: 'crossdocking',
    location: 'Barcelona',
    coordinates: { lat: 41.3851, lng: 2.1734 },
    status: 'operativa',
    description: 'Plataforma próxima al centro urbano para distribución inmediata',
  },
  {
    id: 3,
    name: 'Almacén Sevilla',
    type: 'warehouse',
    location: 'Sevilla',
    coordinates: { lat: 37.3891, lng: -5.9845 },
    status: 'operativa',
    description: 'Consolidación de pedidos para zonas rurales y semiurbanas',
  },
  {
    id: 4,
    name: 'Lockers Valencia',
    type: 'locker',
    location: 'Valencia',
    coordinates: { lat: 39.4699, lng: -0.3763 },
    status: 'operativa',
    description: 'Red de lockers de proximidad en entorno urbano',
  },
  {
    id: 5,
    name: 'Hub Bilbao',
    type: 'hub',
    location: 'Bilbao',
    coordinates: { lat: 43.2630, lng: -2.9350 },
    status: 'prevista',
    description: 'Próxima apertura - Expansión norte 2027',
  },
];

export interface ServiceStep {
  id: number;
  title: string;
  description: string;
  icon: string;
  link?: string;
}

export const serviceSteps: ServiceStep[] = [
  {
    id: 1,
    title: 'Recepción de la mercancía',
    description: 'Los productos llegan a nuestras instalaciones, se descargan y registran en el sistema.',
    icon: '📥',
  },
  {
    id: 2,
    title: 'Cross docking',
    description: 'Clasificación automatizada sin almacenaje, salida inmediata hacia destino.',
    icon: '🔄',
  },
  {
    id: 3,
    title: 'Line haul',
    description: 'Conexión de los principales nodos mediante rutas regulares en todo el país.',
    icon: '🚛',
  },
  {
    id: 4,
    title: 'Última milla',
    description: 'Distribución adaptada a entornos urbanos con opciones flexibles.',
    icon: '🏙️',
  },
  {
    id: 5,
    title: 'Home delivery',
    description: 'Entrega directa en comercio o domicilio del cliente.',
    icon: '🏠',
  },
  {
    id: 6,
    title: 'Out-of-home delivery',
    description: 'Entrega en puntos alternativos para mayor flexibilidad.',
    icon: '📦',
  },
  {
    id: 7,
    title: 'Logística inversa',
    description: 'Gestión de devoluciones integrada desde recogida hasta reintegración.',
    icon: '↩️',
  },
  {
    id: 8,
    title: 'Tecnología',
    description: 'Coordinación de rutas, flota y operaciones en tiempo real.',
    icon: '💻',
  },
  {
    id: 9,
    title: 'Seguimiento online',
    description: 'Visibilidad completa de cada envío en toda la cadena logística.',
    icon: '🔍',
  },
  {
    id: 10,
    title: 'Atención al cliente',
    description: 'Acompañamiento en toda la operativa y gestión de incidencias.',
    icon: '🎧',
  },
];

export interface ProductCategory {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export const productCategories: ProductCategory[] = [
  {
    id: 1,
    title: 'Moda, calzado y complementos',
    description: 'Alta rotación de referencias, variabilidad de tallas y picos de volumen.',
    icon: '👕',
  },
  {
    id: 2,
    title: 'Belleza, cosmética y cuidado personal',
    description: 'Cosmética estándar y referencias ADR con procedimientos específicos.',
    icon: '💄',
  },
  {
    id: 3,
    title: 'Electrónica de consumo y accesorios',
    description: 'Productos de valor elevado con controles de trazabilidad reforzados.',
    icon: '📱',
  },
  {
    id: 4,
    title: 'Hogar, decoración y equipamiento',
    description: 'Diversidad de formatos gestionada de forma segura.',
    icon: '🏠',
  },
  {
    id: 5,
    title: 'Juguetes, ocio y lifestyle',
    description: 'Productos estacionales con operativa dimensionada para picos.',
    icon: '🎮',
  },
  {
    id: 6,
    title: 'Producto multirreferencia',
    description: 'Elevada dispersión de SKU con ritmos de reposición constantes.',
    icon: '📦',
  },
];

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  linkedin?: string;
  image?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Ana Martínez',
    role: 'CEO & Fundadora',
    description: 'Lideró la expansión a 12 ciudades en 2026',
    linkedin: 'https://linkedin.com/in/anamartinez',
  },
  {
    id: 2,
    name: 'Carlos Ruiz',
    role: 'CTO',
    description: 'Desarrolló el TMS propio de Quick Rabbit',
    linkedin: 'https://linkedin.com/in/carlosruiz',
  },
  {
    id: 3,
    name: 'Laura Sánchez',
    role: 'COO',
    description: 'Gestiona 1M+ paquetes mensuales',
    linkedin: 'https://linkedin.com/in/laurasanchez',
  },
  {
    id: 4,
    name: 'Miguel Ángel Torres',
    role: 'Head de Logística',
    description: 'Diseñó la red de 84 instalaciones',
    linkedin: 'https://linkedin.com/in/migueltorres',
  },
];

export interface Reason {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export const whyQuickRabbit: Reason[] = [
  {
    id: 1,
    title: 'Conocimiento profundo del mercado español',
    description: 'Operamos exclusivamente en España y conocemos el e-commerce en cada ciudad.',
    icon: '🇪',
  },
  {
    id: 2,
    title: 'Experiencia acumulada y capacidad probada',
    description: 'Hemos operado picos de 80.000-100.000 paquetes diarios en campañas.',
    icon: '📊',
  },
  {
    id: 3,
    title: 'Operación acreditada a gran escala',
    description: 'Gestionamos alrededor de 1 millón de paquetes al mes.',
    icon: '📈',
  },
  {
    id: 4,
    title: 'Especialización en e-commerce de alta rotación',
    description: 'Diseñado para marcas con miles de pedidos diarios.',
    icon: '⚡',
  },
  {
    id: 5,
    title: 'Control operativo end-to-end en España',
    description: 'Gestionamos el flujo completo desde recepción hasta entrega.',
    icon: '🔗',
  },
  {
    id: 6,
    title: 'Distribución ultrarrápida a escala nacional',
    description: 'Modelo definido para agilizar procesos y acortar plazos.',
    icon: '🚀',
  },
  {
    id: 7,
    title: 'Comprometidos con la sostenibilidad',
    description: 'Red optimizada para reducir recorridos innecesarios.',
    icon: '🌱',
  },
];

// ============================================
// FUNCIONES DE UTILIDAD PARA VALIDACIÓN
// ============================================

/**
 * Valida un número de teléfono español
 */
export function validateSpanishPhone(phone: string): boolean {
  const regex = /^\+?34?\s?[67]\d{1}\s?\d{3}\s?\d{3}$/;
  return regex.test(phone.replace(/[\s-()]/g, ''));
}

/**
 * Valida un email corporativo
 */
export function validateCorporateEmail(email: string): boolean {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email) && !email.includes('@gmail.com') && !email.includes('@yahoo.com');
}

/**
 * Formatea un número de tracking
 */
export function formatTrackingNumber(input: string): string {
  return input.toUpperCase().replace(/[^A-Z0-9-]/g, '');
}

/**
 * Calcula el tiempo estimado de entrega
 */
export function calculateETA(origin: string, destination: string): string {
  // Lógica placeholder - implementar con API real
  const cities = ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Bilbao'];
  const isSameRegion = origin === destination;
  return isSameRegion ? '24h' : '48-72h';
}

/**
 * Genera un mensaje de error amigable desde un error de Zod
 */
export function getZodErrorMessage(error: z.ZodError): string {
  if (error.errors.length === 0) return 'Error desconocido';
  return error.errors[0].message;
}

/**
 * Valida que una empresa sea sociedad mercantil (para transportistas)
 */
export function validateMercantileSociety(companyType: string): boolean {
  const validTypes = ['SL', 'S.L.', 'S.A.', 'S.L.N.E.', 'S.L.L.', 'S.A.D.', 'S.C.', 'S.CRA.'];
  return validTypes.some(type => companyType.toUpperCase().includes(type));
}

// ============================================
// CONSTANTES Y CONFIGURACIÓN
// ============================================

export const CONTACT_INFO = {
  email: 'customer@quickrabbit.es',
  phone: '900 060 296',
  whatsapp: '+34600000000',
  address: 'Corredor del Henares, Madrid, España',
};

export const SOCIAL_LINKS = {
  linkedin: 'https://linkedin.com/company/quickrabbit',
  instagram: 'https://instagram.com/quickrabbit',
  twitter: 'https://twitter.com/quickrabbit',
};

export const APP_LINKS = {
  googlePlay: 'https://play.google.com/store/apps/details?id=com.quickrabbit',
  appStore: 'https://apps.apple.com/es/app/quickrabbit',
};

export const LEGAL_LINKS = {
  avisoLegal: '/aviso-legal',
  politicaCookies: '/politica-de-cookies',
  politicaPrivacidad: '/politica-de-privacidad',
};

export const LANGUAGE_OPTIONS = [
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'zh', label: '中文', name: '中文' },
];

export default {
  trackingSchema,
  contactLogisticsSchema,
  carrierSchema,
  newsletterSchema,
  warehouseVisitSchema,
  heroStats,
  installations,
  serviceSteps,
  productCategories,
  teamMembers,
  whyQuickRabbit,
  CONTACT_INFO,
  LANGUAGE_OPTIONS,
};