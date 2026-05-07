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
const habitaciones = distribucion.find((d) => d.includes('habitaciones en total')) ?? '3 habitaciones en total';
const banos = itemDetails('Baños').find((d) => d.includes('baños en total')) ?? '4 baños en total';
const numeroDesdeTexto = (text: string, fallback: number) => Number(text.match(/\d+/)?.[0] ?? fallback);
const featureChips = Array.from(new Set([
  `Hasta ${capacidad} huespedes`,
  habitaciones,
  banos,
  ...destacados,
  ...conectividad,
  ...exterior,
  ...confort,
  ...accesos
]));

export const avellanedaHouse = {
  slug: ficha.slug,
  name: ficha.nombre,
  contactName: 'Heliana',
  whatsapp: '5492616545175',
  location: ficha.direccion,
  capacity: capacidad,
  bedrooms: numeroDesdeTexto(habitaciones, 3),
  bathrooms: numeroDesdeTexto(banos, 4),
  badge: `${capacidad} huéspedes · ${totalServicios} comodidades`,
  heroImage: 'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775883738/IMG_4587_aaqvhd.jpg',
  images: [
    'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775883738/IMG_4587_aaqvhd.jpg',
    'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775883739/IMG_4598_cwncxw.jpg',
    'https://res.cloudinary.com/drne78uzo/image/upload/q_auto,f_auto/v1775883741/IMG_4631_rmcvwh.jpg',
    'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775883738/IMG_4590_gmib4r.jpg'
  ],
  eyebrow: 'CASA COMPLETA · QUINTA SECCION · CERCA DE ARISTIDES',
  heroTitle: 'Una casa amplia para vivir Mendoza con la ciudad cerca.',
  heroSummary: 'Llegar, guardar el auto, abrir el patio y organizar el dia desde una casa amplia en Quinta Seccion. Avellaneda funciona para grupos que quieren moverse facil y volver a un lugar comodo.',
  summary: ficha.descripcion_corta,
  experienceTitle: 'Comodidad de casa grande, con planes a pocas cuadras.',
  experienceSummary: 'La casa acompaña distintos ritmos del grupo: living para encontrarse, pergola para comer afuera, dormitorios amplios para descansar y una ubicacion comoda para salir a recorrer la zona.',
  previewTourTitles: ['Living', 'Habitacion principal', 'Exteriores y patio'],
  virtualTour: [
    {
      title: 'Exteriores y patio',
      text: 'La llegada, el patio y los espacios al aire libre le dan a la casa una pausa propia dentro de la ciudad.',
      images: [
        {
          src: 'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775883741/IMG_4627_yhj2sl.jpg',
          caption: 'Un refugio urbano para bajar un cambio sin alejarse de la ciudad.'
        },
        {
          src: 'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775883741/IMG_4629_ykk1dl.jpg',
          caption: 'Exterior simple y habitable, pensado para quedarse un rato mas.'
        },
        {
          src: 'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775883738/IMG_4591_w9tsck.jpg',
          caption: 'Aire, pausa y ese ritmo tranquilo de volver a casa despues de recorrer Mendoza.'
        }
      ]
    },
    {
      title: 'Living',
      text: 'Un ambiente de encuentro para volver de la ciudad, conversar, descansar y planear la siguiente salida.',
      images: [
        {
          src: 'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775883738/IMG_4590_gmib4r.jpg',
          caption: 'Un lugar comodo para compartir, conversar y volver al mismo ritmo.'
        },
        {
          src: 'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775883738/IMG_4594_yapt8a.jpg',
          caption: 'La misma atmosfera serena se repite en cada espacio comun.'
        }
      ]
    },
    {
      title: 'Habitacion principal',
      text: 'Dormitorio amplio con vestidor y baño en suite, pensado para descansar con mas privacidad.',
      images: [
        {
          src: 'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775883738/IMG_4600_upipwh.jpg',
          caption: 'Privacidad y comodidad para cerrar el dia con otro tempo.'
        },
        {
          src: 'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775883737/IMG_4603_zj8dqb.jpg',
          caption: 'Un dormitorio pensado para descansar bien, no solo para dormir.'
        }
      ]
    },
    {
      title: 'Habitacion doble',
      text: 'Un dormitorio comodo para dos personas, con armado flexible segun el grupo.',
      images: [
        {
          src: 'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775883739/IMG_4613_u1gdxu.jpg',
          caption: 'Comodidad real para viajar en grupo sin perder intimidad.'
        },
        {
          src: 'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775883739/IMG_4601_qkexta.jpg',
          caption: 'Espacios de descanso simples, claros y faciles de habitar.'
        },
        {
          src: 'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775883739/IMG_4617_zrjksh.jpg',
          caption: 'Una habitacion practica para acomodar el viaje segun el grupo.'
        }
      ]
    },
    {
      title: 'Habitacion familiar',
      text: 'Dormitorio de mayor capacidad, practico para familias, niños o grupos de amigos.',
      images: [
        {
          src: 'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775883740/IMG_4621_puxhxl.jpg',
          caption: 'Tranquilidad para que todos encuentren su lugar dentro de la casa.'
        },
        {
          src: 'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775883740/IMG_4623_euazyn.jpg',
          caption: 'Un cuarto funcional para familias o grupos que necesitan resolver bien el descanso.'
        },
        {
          src: 'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775883740/IMG_4625_mkwxus.jpg',
          caption: 'Descanso flexible, pensado para estadias compartidas.'
        }
      ]
    },
    {
      title: 'Baños',
      text: 'Baños distribuidos para que la convivencia de grupos grandes sea mas simple.',
      images: [
        {
          src: 'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775883740/IMG_4604_xagxvy.jpg',
          caption: 'Confort moderno y funcional para una estadia que se siente facil.'
        },
        {
          src: 'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775883740/IMG_4619_m68loq.jpg',
          caption: 'Detalles cuidados que validan la calidad general de la casa.'
        },
        {
          src: 'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775883739/IMG_4611_oslz2z.jpg',
          caption: 'Comodidad cotidiana, resuelta con sobriedad.'
        }
      ]
    }
  ],
  description: [
    `${ficha.nombre} esta pensada para grupos que quieren buena ubicacion, distribucion amplia y espacios comodos para convivir sin friccion.`,
    `Entre sus diferenciales aparecen ${destacados.slice(0, 4).join(', ').toLowerCase()}, con una configuracion especialmente practica para familias y grupos amplios.`,
    `La casa combina ${habitaciones.toLowerCase()}, ${banos.toLowerCase()}, confort interior y patios pensados para aprovechar la estadia puertas adentro y puertas afuera.`
  ],
  features: [
    ...featureChips
  ],
  momentsTitle: 'Cada imagen cuenta una forma de habitar Avellaneda.',
  momentsSummary: 'La casa no se muestra como una lista de ambientes: se entiende en escenas. Luz, pausa, conversacion y descanso van armando una estadia tranquila, residencial y muy mendocina.',
  moments: [
    {
      label: 'Manana',
      title: 'Una manana que empieza sin apuro',
      text: 'La imagen transmite claridad y calma domestica: ese primer momento del dia en el que el grupo se acomoda, prepara la salida y la casa empieza a sentirse propia.',
      image: 'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775883738/IMG_4594_yapt8a.jpg'
    },
    {
      label: 'Tarde',
      title: 'Una pausa con aire propio',
      text: 'El exterior baja el ritmo de la estadia. Despues de recorrer Mendoza, esta escena habla de volver, sentarse un rato y dejar que la tarde se estire.',
      image: 'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775883741/IMG_4629_ykk1dl.jpg'
    },
    {
      label: 'Noche',
      title: 'Compartir sin perder intimidad',
      text: 'La composicion se siente cercana y habitable: un espacio para juntarse sin protocolo, abrir un vino, conversar y seguir viviendo Mendoza puertas adentro.',
      image: 'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775883738/IMG_4590_gmib4r.jpg'
    },
    {
      label: 'Descanso',
      title: 'Bajar el volumen del viaje',
      text: 'La habitacion valida lo que promete el resto de la casa: descanso real, tonos tranquilos y privacidad para cerrar el dia con otra energia.',
      image: 'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775883739/IMG_4613_u1gdxu.jpg'
    }
  ],
  amenities: [
    ...destacados,
    ...confort,
    ...conectividad,
    ...accesos
  ].slice(0, 12),
  amenityGroups: categorias.map((categoria) => ({
    title: categoria.categoria,
    items: categoria.items.map((item) => ({
      name: item.nombre,
      detail: item.detalle
    }))
  }))
};
