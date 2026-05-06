export const site = {
  brand: 'Experiencias Mendoza',
  whatsapp: '5492616931948',
  whatsappUrl(message: string) {
    return `https://wa.me/${this.whatsapp}?text=${encodeURIComponent(message)}`;
  }
};

export const commonRules = [
  'Check-in desde las 15:00 y check-out hasta las 10:00.',
  'Solo pueden ingresar huéspedes registrados en la reserva.',
  'No se permiten fiestas, eventos ni reuniones que molesten al entorno.',
  'No se permite fumar dentro de la casa.',
  'La vajilla, utensilios y parrilla deben quedar limpios luego de su uso.',
  'Todo daño o rotura debe ser informado de inmediato.',
  'Las mascotas requieren autorización previa y cumplimiento del reglamento.',
  'El uso, posesión o almacenamiento de sustancias ilegales está estrictamente prohibido.'
];

export const commonPenalties = [
  { reason: 'Fumar en interiores', amount: '50 USD' },
  { reason: 'Vajilla, sartenes o utensilios sin lavar', amount: '50 USD' },
  { reason: 'Parrilla sucia', amount: '50 USD' },
  { reason: 'Ruidos molestos o eventos', amount: '500 USD' },
  { reason: 'Invitados no registrados o ingresos no coordinados', amount: 'hasta 1000 USD' },
  { reason: 'Pérdida de llaves', amount: '100 USD' },
  { reason: 'Daños o roturas', amount: 'a costo real' },
  { reason: 'Incumplimientos vinculados a mascotas', amount: '50 a 100 USD o costo real' }
];

export const services = [
  {
    slug: 'traslados',
    title: 'Traslados',
    short: 'Moverse sin complicaciones.',
    body: 'Podemos coordinar traslados tercerizados para aeropuerto, bodegas, montaña, cenas o salidas puntuales. La idea no es llenar la web de promesas, sino resolver lo que suma valor real al viaje.'
  },
  {
    slug: 'compras-previas',
    title: 'Compras previas',
    short: 'Llegar y tener resuelto lo importante.',
    body: 'Antes de la llegada podemos ayudarte a organizar compras básicas, bebidas o algunos pedidos especiales para que la experiencia empiece más cómoda desde el primer minuto.'
  },
  {
    slug: 'degustaciones',
    title: 'Degustaciones y experiencias en casa',
    short: 'Una experiencia más íntima y a tu ritmo.',
    body: 'La lógica del proyecto es que la casa sea el centro de la estadía. Sobre esa base, algunas experiencias se pueden coordinar como complemento: degustaciones, detalles regionales o propuestas especiales dentro de la casa.'
  },
  {
    slug: 'parrillero',
    title: 'Parrillero',
    short: 'El asado resuelto.',
    body: 'Para grupos o familias que quieren disfrutar sin cocinar, se puede coordinar un parrillero externo y convertir la comida en parte del viaje sin sumar logística al huésped.'
  },
  {
    slug: 'detalles-regionales',
    title: 'Detalles regionales',
    short: 'Pequeños complementos con identidad local.',
    body: 'Vinos, conservas, productos regionales o regalos simples que pueden completar la llegada o sumar valor a una estadía especial.'
  },
  {
    slug: 'otro',
    title: 'Otro',
    short: 'Servicio adicional a medida.',
    body: 'Propuestas personalizadas según el tipo de estadía, el grupo y la experiencia que quieran armar en Mendoza.'
  }
];
