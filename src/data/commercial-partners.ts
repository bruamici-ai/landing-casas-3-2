// Public guest-facing information only. Negotiation history lives in ADMCasas.
export const partnerCategories = [
  { id:'fiambreria', name:'Fiambrerías', initials:'FI', description:'Quesos, fiambres y propuestas para compartir.' },
  { id:'cafeteria', name:'Cafeterías', initials:'CA', description:'Pausas de café y sabores para empezar el día.' },
  { id:'heladeria', name:'Heladerías', initials:'HE', description:'Una pausa dulce para disfrutar el barrio.' },
  { id:'vinoteca', name:'Vinotecas', initials:'VI', description:'Vinos y propuestas para descubrir Mendoza.' },
  { id:'carniceria', name:'Carnicerías', initials:'CR', description:'Opciones para compartir una comida en casa.' },
  { id:'experiencias', name:'Experiencias', initials:'EX', description:'Actividades y propuestas para conocer la zona.' },
];

export const commercialPartners = [{
  id: 'almacen-de-sabores',
  name: 'Almacén de Sabores',
  category: 'Fiambrería · Quesos y picadas',
  categoryId: 'fiambreria',
  initials: 'AS',
  photos: [{
    src:'/images/partners/almacen-de-sabores/fachada.jpg',
    thumbnail:'/images/partners/almacen-de-sabores/fachada-tarjeta.jpg',
    alt:'Cartel y frente de Almacén de Sabores, en Granaderos 1190, Mendoza',
    author:'Lucia Scatolon',
    sourceUrl:'https://maps.app.goo.gl/qnYzwU6XLQ5WSJPVA',
  }],
  highlight: 'Degustación de bienvenida',
  availability: 'Con coordinación previa',
  summary: 'Cortesía de queso con coordinación previa. También podés consultar picadas por encargo.',
  status: 'active',
  houses: ['parque', 'avellaneda'],
  mapsUrl: 'https://maps.app.goo.gl/qnYzwU6XLQ5WSJPVA',
  description: 'Una propuesta para descubrir quesos y fiambres durante tu estadía.',
  offers: [{
    action: 'tasting',
    label: 'Cortesía · con coordinación previa',
    buttonLabel: 'Coordinar degustación con el anfitrión',
    message: 'Me interesa coordinar la degustación. ¿Podés confirmarme las condiciones?',
    title: 'Degustación de bienvenida',
    description: 'Una degustación gratuita de queso, con selección a cargo del local según disponibilidad.',
    conditions: 'Coordiná con tu anfitrión antes de ir. Te confirmaremos la visita, la cantidad y las condiciones para tu grupo. La cortesía requiere confirmación previa.',
  }, {
    action: 'boards',
    label: 'Venta por encargo · un día de anticipación',
    buttonLabel: 'Consultar picadas con el anfitrión',
    message: 'Quiero consultar opciones y precios de picadas por encargo. Entiendo que requieren al menos un día de anticipación.',
    title: 'Picadas por encargo',
    description: 'Para compartir en la casa: consultá las opciones y el precio antes de encargar.',
    conditions: 'Encargá con al menos un día de anticipación. La picada se vende por separado de la degustación; precio y disponibilidad a confirmar.',
  }],
}];
