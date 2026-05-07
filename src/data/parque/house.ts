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
const habitaciones = distribucion.find((d) => d.includes('habitaciones en total')) ?? '4 habitaciones en total';
const banos = itemDetails('Baños').find((d) => d.includes('baños en total')) ?? '3 baños en total';
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
  contactName: 'Bruno',
  whatsapp: '5492616931948',
  location: ficha.direccion,
  capacity: capacidad,
  bedrooms: numeroDesdeTexto(habitaciones, 4),
  bathrooms: numeroDesdeTexto(banos, 3),
  badge: `${capacidad} huéspedes · ${totalServicios} comodidades`,
  heroImage: 'https://res.cloudinary.com/drne78uzo/image/upload/q_auto,f_auto/v1775873954/BRU_1444_dywtrx.jpg',
  images: [
    'https://res.cloudinary.com/drne78uzo/image/upload/q_auto,f_auto/v1775873954/BRU_1444_dywtrx.jpg',
    'https://res.cloudinary.com/drne78uzo/image/upload/q_auto,f_auto/v1775873945/_BRU1602_a7hpbb.jpg',
    'https://res.cloudinary.com/drne78uzo/image/upload/q_auto,f_auto/v1775888578/IMG_7668_qj1zdm.jpg',
    'https://res.cloudinary.com/drne78uzo/image/upload/q_auto,f_auto/v1775873941/_BRU1510_kupufv.jpg'
  ],
  virtualTour: [
    {
      title: 'Living',
      text: 'El lugar donde el grupo vuelve a encontrarse despues de recorrer Mendoza: sillones, charla, musica y tiempo compartido sin apuro.',
      images: [
        'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775873958/_BRU1492_yuclbe.jpg',
        'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775873954/BRU_1444_dywtrx.jpg',
        'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775873943/_BRU1564_jfjczt.jpg',
        'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775873943/_BRU1576_uwjlvf.jpg',
        'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775888576/IMG_3442_tr7hzt.jpg'
      ]
    },
    {
      title: 'Cocina y comedor diario',
      text: 'Un espacio cotidiano para desayunos largos, picadas improvisadas y comidas que se arman mientras la casa sigue en movimiento.',
      images: [
        'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775888577/IMG_7313_cu0l4k.jpg',
        'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775873954/_BRU1843_nawict.jpg',
        'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775873952/_BRU1774_wyxxjb.jpg',
        'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775873952/_BRU1800_m3vueb.jpg'
      ]
    },
    {
      title: 'Comedor principal',
      text: 'La mesa grande vuelve ritual cualquier comida: vinos, sobremesa y el grupo reunido en un solo lugar.',
      images: [
        'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775873943/_BRU1556_ov7ers.jpg',
        'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775873942/_BRU1552_lnl1ue.jpg'
      ]
    },
    {
      title: 'Suite principal',
      text: 'Habitacion 1: dormitorio principal con vestidor, baño en suite y armado flexible para cama doble o dos simples.',
      images: [
        'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775873945/_BRU1602_a7hpbb.jpg',
        'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775873952/_BRU1738_vjsasu.jpg',
        'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775873950/_BRU1727_sswi3t.jpg'
      ]
    },
    {
      title: 'Habitaciones 2 y 3',
      text: 'Dos dormitorios espejados, cada uno con capacidad para tres personas y armado flexible.',
      images: [
        'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775873950/_BRU1734_jrndoh.jpg',
        'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775873946/_BRU1638_gcorjf.jpg',
        'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775873945/_BRU1630_c5tben.jpg'
      ]
    },
    {
      title: 'Habitacion 4',
      text: 'Dormitorio mas sencillo, con cajonera y camas simples mediante cucheta con carro.',
      images: [
        'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775873947/_BRU1685_ib5yow.jpg',
        'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775873945/_BRU1586_bpmrfn.jpg',
        'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775873945/_BRU1611_dk9hcw.jpg'
      ]
    },
    {
      title: 'Baños',
      text: 'Espacios pensados para que la rutina de un grupo grande fluya mejor durante toda la estadía.',
      images: [
        'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775873949/_BRU1718_roagq1.jpg',
        'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775873949/_BRU1720_v3eqfg.jpg'
      ]
    },
    {
      title: 'Patio y pileta',
      text: 'El exterior cambia el ritmo de la estadía: aire libre, agua, churrasquera y tardes que invitan a quedarse un rato más.',
      images: [
        'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775888578/IMG_7668_qj1zdm.jpg',
        'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775888576/IMG_0278_ab7kiw.jpg',
        'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775888576/IMG_6243_iaygdh.jpg',
        'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775888577/IMG_6244_magjyj.jpg',
        'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775888579/IMG_7680_sxmfvd.jpg'
      ]
    }
  ],
  eyebrow: 'CASA COMPLETA · FRENTE A LOS PORTONES DEL PARQUE',
  heroTitle: 'Viví Mendoza desde una casa que invita a quedarse.',
  heroSummary: 'Despertar con la luz del parque, desayunar sin apuro, compartir el patio y cerrar el día sintiendo que la casa también fue parte del viaje.',
  summary: ficha.descripcion_corta,
  experienceTitle: 'Una forma distinta de habitar Mendoza.',
  experienceSummary: 'No se trata solo de dónde dormís. Se trata de cómo se siente estar acá: con más aire, más tiempo compartido y una casa que acompaña el viaje de verdad.',
  previewTourTitles: ['Living', 'Suite principal', 'Patio y pileta'],
  description: [
    `${ficha.nombre} esta pensada para grupos que quieren sentir el parque cerca y volver a una casa comoda, amplia y facil de habitar.`,
    `El plan puede empezar con una caminata, seguir con patio y churrasquera, y terminar alrededor de una mesa grande con el grupo reunido.`,
    `Entre living, dormitorios, cocina y exterior, la casa da margen para compartir sin perder momentos de descanso.`
  ],
  features: [
    ...featureChips
  ],
  momentsTitle: 'Escenas grandes para vivir Mendoza frente al parque.',
  momentsSummary: 'En esta casa las imagenes hablan de escala, verde y vida compartida: la luz de la manana, el patio como plan propio, la mesa que reune y los rincones donde el grupo puede bajar el ritmo.',
  moments: [
    {
      label: 'Manana',
      title: 'La casa despierta con amplitud',
      text: 'La imagen transmite un comienzo claro y abierto: luz natural, espacio para moverse y esa sensacion de tener el parque como primera referencia del dia.',
      image: 'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775873952/_BRU1800_m3vueb.jpg'
    },
    {
      label: 'Tarde',
      title: 'El exterior se vuelve plan',
      text: 'La escena del patio no funciona como fondo: vende la tarde completa. Agua, aire, sombra y tiempo compartido sin necesidad de salir corriendo a otro lugar.',
      image: 'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775888578/IMG_7668_qj1zdm.jpg'
    },
    {
      label: 'Noche',
      title: 'La mesa ordena al grupo',
      text: 'Esta imagen valida una de las promesas fuertes de la casa: despues de recorrer Mendoza, hay un lugar comodo para reunirse, cenar y seguir la charla.',
      image: 'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775873943/_BRU1556_ov7ers.jpg'
    },
    {
      label: 'Pausa',
      title: 'Un interior para bajar el volumen',
      text: 'La foto muestra el costado mas tranquilo de una casa grande: un ambiente donde el grupo puede separarse un rato, descansar y volver a encontrarse despues.',
      image: 'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775873945/_BRU1602_a7hpbb.jpg'
    }
  ],
  amenities: [
    ...cualidadesPremium,
    ...destacados,
    ...confort,
    ...conectividad,
    ...accesos
  ].slice(0, 16),
  amenityGroups: categorias.map((categoria) => ({
    title: categoria.categoria,
    items: categoria.items.map((item) => ({
      name: item.nombre,
      detail: item.detalle
    }))
  }))
};
