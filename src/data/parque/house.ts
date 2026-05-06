import ficha from './ficha-casa-parque.json';

type Categoria = { categoria: string; items: { nombre: string; detalle: string }[] };

const categorias = ficha.servicios_por_categoria as Categoria[];
const totalServicios = categorias.reduce((acc, cat) => acc + cat.items.length, 0);

const findCategory = (name: string) => categorias.find((cat) => cat.categoria === name);
const itemNames = (name: string) => findCategory(name)?.items.map((item) => item.nombre) ?? [];
const itemDetails = (name: string) => findCategory(name)?.items.map((item) => item.detalle) ?? [];

const destacados = itemNames('Destacados de la casa');
const distribucion = itemDetails('Distribución y capacidad');
const exterior = itemNames('Exterior y experiencia');
const confort = itemNames('Climatización y confort');
const conectividad = itemNames('Entretenimiento y conectividad');
const accesos = itemNames('Acceso y estacionamiento');

const capacidad = ficha.capacidad_publicada.huespedes;
const habitaciones = distribucion.find((d) => d.includes('habitaciones en total')) ?? 'Habitaciones según ficha';
const banos = itemDetails('Baños').find((d) => d.includes('baños en total')) ?? 'Baños según ficha';

const cualidadesPremium = [
  'Jacuzzi',
  'Internet fibra 100 Mb',
  'Home theater Sony',
  'Smart TV Samsung 75”',
  'Vajilla completa para 14',
  'Cocina equipada para grupos',
  'Espacios amplios de encuentro',
  'Ubicación frente al Parque San Martín'
];

export const parqueHouse = {
  slug: ficha.slug,
  name: ficha.nombre,
  location: ficha.direccion,
  badge: `${capacidad} huéspedes · ${totalServicios} servicios habilitados`,
  heroImage: 'https://res.cloudinary.com/drne78uzo/image/upload/q_auto,f_auto/v1775873954/BRU_1444_dywtrx.jpg',
  images: [
    'https://res.cloudinary.com/drne78uzo/image/upload/q_auto,f_auto/v1775873954/BRU_1444_dywtrx.jpg',
    'https://res.cloudinary.com/drne78uzo/image/upload/q_auto,f_auto/v1775873945/_BRU1602_a7hpbb.jpg',
    'https://res.cloudinary.com/drne78uzo/image/upload/q_auto,f_auto/v1775888578/IMG_7668_qj1zdm.jpg',
    'https://res.cloudinary.com/drne78uzo/image/upload/q_auto,f_auto/v1775873941/_BRU1510_kupufv.jpg'
  ],
  summary: ficha.descripcion_corta,
  description: [
    `${ficha.nombre} está pensada para grupos grandes que buscan una estadía cómoda, bien ubicada y con espacios exteriores de uso real.`,
    `Entre sus diferenciales aparecen ${destacados.slice(0, 4).join(', ').toLowerCase()}, jacuzzi, internet de fibra 100 Mb, home theater Sony y Smart TV Samsung de 75 pulgadas.`,
    `La ficha operativa registra ${habitaciones.toLowerCase()}, ${banos.toLowerCase()}, vajilla completa para 14 personas y una base amplia de servicios para cocinar, descansar y compartir la estadía.`
  ],
  features: [
    `Hasta ${capacidad} huéspedes`,
    habitaciones,
    banos,
    'Jacuzzi',
    'Fibra 100 Mb',
    'Smart TV 75”',
    'Home theater Sony',
    'Vajilla para 14',
    ...(destacados.slice(0, 2))
  ],
  moments: [
    {
      title: 'Mañanas frente al parque',
      text: `La ubicación frente al Parque San Martín ordena el ritmo del viaje y le da valor inmediato a la experiencia desde que salís de la casa.`
    },
    {
      title: 'Tardes de patio, agua y descanso',
      text: `El exterior combina ${exterior.slice(0, 3).join(', ').toLowerCase()}, jacuzzi y espacios preparados para que quedarse en casa también sea parte del plan.`
    },
    {
      title: 'Noches de grupo bien resueltas',
      text: `La capacidad, la cocina equipada, la vajilla completa para 14 y el confort interior ayudan a que la convivencia del grupo sea simple y fluida durante toda la estadía.`
    },
    {
      title: 'Entretenimiento puertas adentro',
      text: `El home theater Sony, la Smart TV Samsung de 75 pulgadas y la conexión de fibra 100 Mb suman una experiencia cómoda para películas, música, trabajo remoto o momentos de pausa.`
    }
  ],
  amenities: [
    ...cualidadesPremium,
    ...destacados,
    ...confort,
    ...conectividad,
    ...accesos
  ].slice(0, 16)
};
