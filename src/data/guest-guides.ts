import { parqueHouse } from './parque/house';
import { avellanedaHouse } from './avellaneda/house';

const collectionDays = 'domingo, lunes, miércoles, jueves y viernes';

const shared = {
  checkIn: '15:00',
  checkOut: '10:00',
  collectionDays,
  wifiPassword: '',
  quietHours: '23:00 a 07:00',
  rules: [
    'Solo pueden ingresar las personas registradas en la reserva.',
    'No se permiten fiestas, eventos ni ruidos que molesten al entorno.',
    'No está permitido fumar ni hacer frituras dentro de la casa.',
    'Las mascotas requieren autorización y registro previo, y no pueden quedarse solas ni subir a camas, sofás o sillas.',
    'La vajilla, los utensilios y la churrasquera deben quedar limpios después de usarlos.',
    'Cualquier daño o rotura debe informarse de inmediato.'
  ],
  checkout: [
    'Cerrar puertas, ventanas con seguro y cortinas.',
    'Apagar luces, calefacción, aires y electrodomésticos, sin desenchufarlos.',
    'Dejar la vajilla y la churrasquera limpias.',
    'Dejar las toallas usadas dentro de la tina del baño; las que no se usaron, dobladas.',
    'Revisar placares y lugares de guardado para no olvidar pertenencias.',
    'Guardar las llaves en el mismo locker de llegada y cerrarlo correctamente.'
  ],
  poolRules: [
    { icon: 'guests', title: 'Menores acompañados', text: 'Siempre bajo la supervisión permanente de una persona adulta.' },
    { icon: 'alert', title: 'Sin vidrio ni loza', text: 'No lleves vasos, botellas, platos ni elementos que puedan romperse.' },
    { icon: 'bath', title: 'Toallas de piscina', text: 'Usá únicamente las toallas sencillas destinadas a este sector. Sugerimos traer una propia.' },
    { icon: 'check', title: 'Antes de ingresar', text: 'Duchate y mantené el pelo atado.' },
    { icon: 'lock', title: 'No tocar el sistema', text: 'No retires productos ni pastillas, no operes equipos, no vacíes la piscina ni vuelques líquidos.' },
    { icon: 'clock', title: 'Cuidemos el descanso', text: 'Evitá ruidos durante la siesta y por la noche.' }
  ],
  emergencies: [
    { label: 'Policía y Bomberos', value: '911', href: 'tel:911' },
    { label: 'Documentos extraviados', value: '0800 2222 999', href: 'tel:08002222999' },
    { label: 'Policía Turística', value: '261 413 2135', href: 'tel:+542614132135' }
  ]
};

export const parqueGuide = {
  ...shared,
  slug: 'parque',
  house: parqueHouse,
  eyebrow: 'Tu estadía frente al Parque San Martín',
  welcome: 'Bienvenidos a La Casa Frente al Parque',
  intro: 'Preparamos esta guía para que la llegada sea simple y puedan disfrutar la casa con tranquilidad desde el primer momento.',
  address: 'Av. Boulogne Sur Mer 1317, Mendoza',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Av.%20Boulogne%20Sur%20Mer%201317%2C%20Mendoza',
  wifiName: 'La casa frente al parque',
  wifiPassword: 'todomundo',
  host: { name: 'Bruno', phone: '5492616931948' },
  backupHost: { name: 'Heliana', phone: '5492616545175' },
  parking: 'Estacionamiento exclusivo y sin cargo frente a la propiedad, para hasta 3 vehículos livianos. No es techado y está monitoreado por cámaras las 24 horas.',
  arrival: 'El día de la llegada recibirán por WhatsApp el código del locker. Al retirarse, deben dejar las llaves dentro del mismo locker y cerrarlo correctamente.',
  wasteRegular: 'Dejá las bolsas cerradas en el canasto metálico junto al árbol, directamente frente a la puerta de entrada.',
  wasteExceptional: 'Si queda una pequeña cantidad de residuos de la mañana del check-out, o la noche anterior no hubo recolección, dejala en el patio junto a la churrasquera.',
  climate: 'La casa utiliza sistemas diferentes en invierno y verano. Elegí la temporada para ver cómo operar cada uno.',
  climateSeasons: [
    {
      name: 'Invierno',
      icon: 'snowflake',
      title: 'Calorama a gas y apoyo con aires',
      instructions: [
        'La calefacción principal es el Calorama a gas del living, monitoreado por una alarma de monóxido de carbono.',
        'La pequeña llama que permanece encendida todo el año es el piloto. Es normal verla: no la apagues ni cierres la llave de gas.',
        'Para calefaccionar, llevá el control desde “Piloto” hacia “Mínimo” o “Máximo”, según la temperatura que necesites.',
        'Mantené cerradas las aberturas exteriores. El calor sube por la escalera: dejá abiertas las puertas interiores de los dormitorios que quieras calefaccionar.',
        'Si necesitás complementar, los dormitorios 1, 2 y 3 tienen aire frío/calor. En modo calor no deben superar los 24 °C y deben apagarse al salir.'
      ]
    },
    {
      name: 'Verano',
      icon: 'sun',
      title: 'Aire acondicionado y ventilación',
      instructions: [
        'Los dormitorios 1, 2 y 3 cuentan con aire acondicionado. La habitación 4 dispone de ventilador.',
        'Usá los aires en modo frío con una temperatura mínima de 22 °C.',
        'Mantené puertas y ventanas exteriores cerradas mientras los equipos estén funcionando.',
        'Apagá el aire al dejar la habitación. La llama piloto del Calorama permanece encendida también en verano: no la manipules.'
      ]
    }
  ],
  poolTitle: 'Piscina de temporada',
  poolNote: 'En estadías de más de dos noches puede ser necesario coordinar mantenimiento. El anfitrión avisará previamente y acompañará al jardinero o piletero durante su trabajo.',
  specialTitle: 'Jacuzzi',
  specialInstructions: [
    { icon: 'climate', title: 'Agua caliente', text: 'Evitá usar las duchas antes de llenarlo para obtener una mejor temperatura.' },
    { icon: 'clock', title: 'Dale tiempo al termotanque', text: 'Si el agua se enfría, esperá a que se recupere antes de agregar más agua caliente.' },
    { icon: 'alert', title: 'Primero llenar, después encender', text: 'Activá los hidrojets únicamente con el jacuzzi lleno. Sin agua, la bomba puede quemarse.' }
  ],
  grillTips: [
    { icon: 'check', title: 'Dejala limpia', text: 'Limpiá la churrasquera y los utensilios después de usarlos.' },
    { icon: 'trash', title: 'Cenizas completamente frías', text: 'Cuando se enfríen, descartalas en el recipiente ubicado junto a la churrasquera.' },
    { icon: 'fire', title: 'Material para encender', text: 'Los cartones, hojas o maderas de este sector son para el fuego: no son basura.' }
  ],
  kitchenTips: [
    { icon: 'guests', title: 'Preparada para 14', text: 'La cocina, la vajilla y los utensilios están pensados para la capacidad total de la casa.' },
    { icon: 'alert', title: 'Sin frituras', text: 'No está permitido hacer frituras dentro de la casa.' },
    { icon: 'kitchen', title: 'Cuidá la vajilla', text: 'No uses las tazas con agua extremadamente caliente ni lleves utensilios fuera de la propiedad.' },
    { icon: 'check', title: 'Lavado disponible', text: 'La casa cuenta con lavarropas y lavavajillas. Sumaremos las instrucciones de cada modelo.' }
  ],
  heroImage: parqueHouse.images[0],
  sectionImage: parqueHouse.virtualTour.find((item) => item.title === 'Patio y pileta')?.images?.[0] ?? parqueHouse.images[2]
};

export const avellanedaGuide = {
  ...shared,
  slug: 'avellaneda',
  house: avellanedaHouse,
  eyebrow: 'Tu estadía en Quinta Sección',
  welcome: 'Bienvenidos a Casa Avellaneda',
  intro: 'Esta guía reúne todo lo necesario para llegar, usar la casa y organizar la salida de una manera simple.',
  address: 'Nicolás Avellaneda 40, Capital, Mendoza',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Nicol%C3%A1s%20Avellaneda%2040%2C%20Mendoza',
  wifiName: 'Casa Avellaneda',
  wifiPassword: 'avellaneda',
  host: { name: 'Heliana', phone: '5492616545175' },
  backupHost: { name: 'Bruno', phone: '5492616931948' },
  parking: 'La cochera es techada, doble y sin cargo. El portón del lado derecho es automático y el del lado izquierdo es manual. También se puede estacionar sin cargo frente a la propiedad.',
  arrival: 'El día de la llegada recibirán por WhatsApp el código del locker. Al retirarse, deben dejar las llaves dentro del mismo locker y cerrarlo correctamente.',
  wasteRegular: 'Dejá las bolsas cerradas junto al poste de luz frente a la propiedad.',
  wasteExceptional: 'Si queda una pequeña cantidad de residuos de la mañana del check-out, o la noche anterior no hubo recolección, usá el contenedor especial de la entrada principal: al salir, a mano derecha, frente al gabinete de máquinas.',
  climate: 'La casa utiliza calefacción central en invierno y aire acondicionado en verano. Elegí la temporada para ver cómo operar cada sistema.',
  climateSeasons: [
    {
      name: 'Invierno',
      icon: 'snowflake',
      title: 'Calefacción central',
      instructions: [
        'La casa se calefacciona mediante caldera y radiadores de agua en los dormitorios y ambientes principales.',
        'El termostato está ubicado en la pared del living y funciona de manera automática.',
        'Ajustalo hasta 20 °C como máximo, salvo días de temperaturas muy bajas.',
        'Mantené cerradas las puertas y ventanas exteriores para conservar el calor. No manipules la caldera ni los radiadores.',
        'Si necesitás apoyo puntual, los aires pueden usarse en modo calor hasta un máximo de 24 °C. Apagalos al salir.'
      ]
    },
    {
      name: 'Verano',
      icon: 'sun',
      title: 'Aire acondicionado',
      instructions: [
        'El living y los tres dormitorios cuentan con aire acondicionado.',
        'Seleccioná el modo frío y una temperatura mínima de 22 °C.',
        'Mantené cerradas las puertas y ventanas exteriores mientras los equipos estén funcionando.',
        'Apagá cada equipo cuando dejes el ambiente o salgas de la casa.'
      ]
    }
  ],
  poolTitle: 'Piscina de temporada',
  poolNote: 'En estadías de más de dos noches puede ser necesario coordinar mantenimiento. El anfitrión avisará previamente y acompañará al jardinero o piletero durante su trabajo.',
  specialTitle: '',
  specialInstructions: [],
  grillTips: [
    { icon: 'check', title: 'Dejala limpia', text: 'Limpiá la churrasquera y los utensilios después de usarlos.' },
    { icon: 'trash', title: 'Cenizas completamente frías', text: 'Cuando se enfríen, descartalas en el recipiente ubicado junto a la churrasquera.' },
    { icon: 'fire', title: 'Material para encender', text: 'Los cartones, hojas o maderas de este sector son para el fuego: no son basura.' }
  ],
  kitchenTips: [
    { icon: 'guests', title: 'Preparada para 14', text: 'La cocina, la vajilla y los utensilios están pensados para la capacidad total de la casa.' },
    { icon: 'alert', title: 'Sin frituras', text: 'No está permitido hacer frituras dentro de la casa.' },
    { icon: 'kitchen', title: 'Cuidá la vajilla', text: 'No uses las tazas con agua extremadamente caliente ni lleves utensilios fuera de la propiedad.' },
    { icon: 'check', title: 'Lavarropas disponible', text: 'Podés utilizar el lavarropas. Sumaremos las instrucciones cuando confirmemos el modelo.' }
  ],
  heroImage: avellanedaHouse.images[0],
  sectionImage: avellanedaHouse.virtualTour.find((item) => item.title === 'Exteriores y patio')?.images?.[0]?.src ?? avellanedaHouse.images[2]
};
