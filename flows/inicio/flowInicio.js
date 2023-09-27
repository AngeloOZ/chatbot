const { addKeyword, EVENTS } = require('@bot-whatsapp/bot')


const flowCancelar = addKeyword('4')
    .addAnswer('Tu solicitud ha sido cancelada', null, (_, { endFlow }) => endFlow());

const flowReservar = addKeyword('1')
    .addAnswer()

const flowPrincipal = addKeyword(EVENTS.WELCOME)
    .addAnswer(['¡Bienvenido a *Colibrí Express!* 🌟', '', 'Tu transporte puerta a puerta de confianza, disponible cada hora de 4 AM a 8 PM.', '', '¡Estamos listos para llevarte a tu destino! 🚗✨'])
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

