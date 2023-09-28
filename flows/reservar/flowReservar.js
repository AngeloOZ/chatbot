const { addKeyword, EVENTS, addAnswer, addAction } = require('@bot-whatsapp/bot')

const promps = require('../../prompts/prompts');
const openAI = require('../../openai/chatgpt');
const { obtenerDiaSemana, obtenerFechaFormateada } = require('../../utils/fechas')

const flowClienteNuevo = addAnswer('¡Bienvenido a *Colibrí Express!* 🌟');


const flowClienteRegistrado = addAction({ capture: true }, async (ctx, { state, flowDynamic }) => {

    console.log(ctx.body);

    const prompt = promps.promptFechaHora.replace('%FECHA_ACTUAL%', obtenerFechaFormateada()).replace('%DIA_ACTUAL%', obtenerDiaSemana()).replace('%FECHA_CLIENTE%', ctx.body);

    console.log(prompt);

    const res = await openAI.completion(prompt);

    console.log(res);

});



const flowReservar = addKeyword('1')
    .addAnswer('Dame un momento ⌛ para consultar unos datos')
    .addAction(async (ctx, { flowDynamic, gotoFlow, state }) => {
        const phone = ctx.from;

        // TODO: consultar datos del cliente con el número de teléfono
        // const cliente = await consultarCliente(phone);

        const cliente = {
            nombre: 'Juan',
            apellido: 'Perez',
            email: 'juan@gmail.com',
            direccion: 'Av. Los Incas 123',
            telfono: '593996921873',
        }

        if (cliente != null) {

            state.update({
                nombre: cliente.nombre,
                apellido: cliente.apellido,
                nombreCompleto: `${cliente.nombre} ${cliente.apellido}`,
                email: cliente.email,
                telfono: cliente.telfono,
                direccion: cliente.direccion,
            });

            await flowDynamic(`Hola *${cliente.nombre}* 👋! para que día y hora te gustaria revervar tu viaje`);
            await gotoFlow(flowClienteRegistrado);
        } else {
            await gotoFlow(flowClienteNuevo);
        }
    });


module.exports = { flowReservar }




