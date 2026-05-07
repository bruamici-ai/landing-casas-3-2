export const site = {
  brand: 'Experiencias Mendoza',
  url: 'https://experienciasmendoza.com',
  defaultImage: 'https://res.cloudinary.com/drne78uzo/image/upload/q_auto/f_auto/v1775873958/_BRU1492_yuclbe.jpg',
  whatsapp: '5492616931948',
  whatsappUrl(message: string, phone = this.whatsapp) {
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  }
};

export const commonRules = [
  'Check-in desde las 15:00 y check-out hasta las 10:00.',
  'Solo pueden ingresar huespedes registrados en la reserva.',
  'No se permiten fiestas, eventos ni reuniones que molesten al entorno.',
  'No se permite fumar dentro de la casa.',
  'La vajilla, utensilios y parrilla deben quedar limpios luego de su uso.',
  'Todo dano o rotura debe ser informado de inmediato.',
  'Las mascotas requieren autorizacion previa y cumplimiento del reglamento.',
  'El uso, posesion o almacenamiento de sustancias ilegales esta estrictamente prohibido.'
];

export const commonPenalties = [
  { reason: 'Fumar en interiores', amount: '50 USD' },
  { reason: 'Vajilla, sartenes o utensilios sin lavar', amount: '50 USD' },
  { reason: 'Parrilla sucia', amount: '50 USD' },
  { reason: 'Ruidos molestos o eventos', amount: '500 USD' },
  { reason: 'Invitados no registrados o ingresos no coordinados', amount: 'hasta 1000 USD' },
  { reason: 'Perdida de llaves', amount: '100 USD' },
  { reason: 'Danos o roturas', amount: 'a costo real' },
  { reason: 'Incumplimientos vinculados a mascotas', amount: '50 a 100 USD o costo real' }
];

export const services = [
  {
    slug: 'traslados',
    title: 'Traslados',
    short: 'Aeropuerto a las casas y salidas privadas.',
    body: 'El foco principal es coordinar la llegada desde el aeropuerto directo a la casa. Tambien se pueden consultar traslados a bodegas, Valle de Uco, Potrerillos, Uspallata, rafting, cabalgatas, sunset o city tour.'
  },
  {
    slug: 'compras-previas',
    title: 'Compras previas',
    short: 'Llegar y tener resuelto lo importante.',
    body: 'Podemos dejar en la casa lena, hielo, agua, cerveza, vino y basicos de supermercado. Se compra en Carrefour y se cobra ticket mas 10% por coordinacion.'
  },
  {
    slug: 'degustaciones',
    title: 'Degustaciones',
    short: 'Experiencia gratis en casa o salida a bodega.',
    body: 'Una experiencia guiada gratuita dentro del alojamiento con QR y recorrido paso a paso, o un espacio para elegir degustaciones en bodegas conocidas de Mendoza.'
  },
  {
    slug: 'parrillero',
    title: 'Parrillero',
    short: 'Chef al fuego en la casa.',
    body: 'Chef parrillero para carnes, vegetales y verduras. Incluye vino libre, empanadas, plato principal al fuego y postre. Valor de referencia: USD 130 por persona.'
  },
  {
    slug: 'detalles-regionales',
    title: 'Detalles regionales',
    short: 'Productos mendocinos para sumar a la estadia.',
    body: 'Una vidriera de productos regionales para dejar preparados en la casa: vinos, conservas, dulces, regalos y detalles locales, con valores confirmados antes de comprar.'
  },
  {
    slug: 'otro',
    title: 'Otros proyectos',
    short: 'Espacio abierto para lo que viene.',
    body: 'Base flexible para pedidos especiales, nuevas experiencias, alianzas y proximos proyectos vinculados a la estadia.'
  }
];
