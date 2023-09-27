const { addKeyword, EVENTS } = require('@bot-whatsapp/bot')

const turnos = [
    '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00',
    '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00'
];

const flowCancelar = addKeyword('4')
    .addAnswer('Tu solicitud ha sido cancelada', null, (_, { endFlow }) => endFlow());



const flowPrincipal = addKeyword(EVENTS.WELCOME)
    .addAnswer(['¡Bienvenido a *Colibrí Express!* 🌟', '', 'Tu transporte puerta a puerta de confianza, disponible cada hora de 04:00 AM a 20:00 PM.', '', '¡Estamos listos para llevarte a tu destino! 🚗✨'])
    .addAnswer([
        'Que deseas hacer?\n',
        '*1* 👉 Reservar viaje',
        '👉 *2* Actualizar ubicación de recogida',
        '👉 *3* Cancelar viaje',
        '👉 *4* Cancelar solicitud',
    ],
        { capture: true, },
        async (ctx, { flowDynamic, fallBack }) => {
            const option = Number(ctx.body);
            if (Number.isNaN(option)) {
                await flowDynamic('Debe ingresar un número Ej: 1');
                return fallBack();
            }
        },
        [flowCancelar]
    )



module.exports = { flowPrincipal }

