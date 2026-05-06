import ficha from './ficha-casa-avellaneda.json';

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

export const avellanedaHouse = {
  slug: ficha.slug,
  name: ficha.nombre,
  location: ficha.direccion,
  badge: `${capacidad} huéspedes · ${totalServicios} servicios habilitados`,
  heroImage: 'https://res.cloudinary.com/drne78uzo/image/upload/q_auto,f_auto/v1775883741/IMG_4631_rmcvwh.jpg',
  images: [
    'https://res.cloudinary.com/drne78uzo/image/upload/q_auto,f_auto/v1775883741/IMG_4631_rmcvwh.jpg',
    'https://res.cloudinary.com/drne78uzo/image/upload/q_auto,f_auto/v1775883741/IMG_4631_rmcvwh.jpg',
    'https://res.cloudinary.com/drne78uzo/image/upload/q_auto,f_auto/v1775883741/IMG_4631_rmcvwh.jpg',
    'https://res.cloudinary.com/drne78uzo/image/upload/q_auto,f_auto/v1775883741/IMG_4631_rmcvwh.jpg'
  ],
  summary: ficha.descripcion_corta,
  description: [
    `${ficha.nombre} está pensada para grupos que quieren base urbana, buena distribución y espacios cómodos para convivir sin fricción.`,
    `Entre sus diferenciales aparecen ${destacados.slice(0, 4).join(', ').toLowerCase()}, con una configuración especialmente práctica para familias y grupos amplios.`,
    `La ficha operativa registra ${habitaciones.toLowerCase()}, ${banos.toLowerCase()} y una combinación sólida entre confort interior, patios y capacidad real.`
  ],
  features: [
    `Hasta ${capacidad} huéspedes`,
    habitaciones,
    banos,
    ...(destacados.slice(0, 2))
  ],
  moments: [
    {
      title: 'Mañanas cómodas en ciudad',
      text: `La casa funciona bien como base para empezar el día sin apuro, con cochera, cocina completa y salida simple hacia la ciudad.`
    },
    {
      title: 'Tardes de patio y encuentro',
      text: `El exterior combina ${exterior.slice(0, 3).join(', ').toLowerCase()} y espacios que ayudan a sostener reuniones tranquilas dentro de la propiedad.`
    },
    {
      title: 'Noches con movimiento cerca',
      text: `La ubicación en Quinta Sección, cerca de Arístides, permite salir y volver fácil sin perder la lógica de casa amplia y funcional.`
    }
  ],
  amenities: [
    ...destacados,
    ...confort,
    ...conectividad,
    ...accesos
  ].slice(0, 12)
};
