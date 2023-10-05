const { addKeyword, EVENTS, addAnswer, addAction } = require('@bot-whatsapp/bot')

const promps = require('../../prompts/prompts');
const openAI = require('../../openai/chatgpt');
const { obtenerDiaSemana, obtenerFechaFormateada } = require('../../utils/fechas');
const { default: axios } = require('axios');

const flowClienteNuevo = addAnswer('¡Bienvenido a *Colibrí Express!* 🌟');


const flowClienteRegistrado = addKeyword("USUARIOS_REGISTRADO")
    .addAction(null, async (_, { state, flowDynamic }) => {

        const cliente = state.getAllState();
        
        await flowDynamic(`Hola *${cliente.nombre + " " + cliente.apellido}* 👋! que gusto tenerte de nuevo, dime para que día y hora te gustaria revervar tu viaje`);
    })
    .addAction({ capture: true }, async (ctx, { state, flowDynamic }) => {

        console.log(ctx.body);

        const prompt = promps.promptFechaHora.replace('%FECHA_ACTUAL%', obtenerFechaFormateada()).replace('%DIA_ACTUAL%', obtenerDiaSemana()).replace('%FECHA_CLIENTE%', ctx.body);

        console.log(prompt);

        const res = await openAI.completion(prompt);

        console.log(res);

    });



const flowReservar = addKeyword('1')
    .addAnswer(
        'Dame un momento ⌛ para consultar unos datos',
        null,

        async (ctx, { flowDynamic, gotoFlow, state }) => {
            const phone = ctx.from;

            const cliente = await consultarDatosCliente(phone);

            if (cliente != null) {
                state.update({
                    cedula: cliente.cedula,
                    nombre: cliente.nombre,
                    apellido: cliente.apellido,
                    nombreCompleto: `${cliente.nombre} ${cliente.apellido}`,
                    whatsapp: cliente.whatsapp,
                });

                console.log(state.getAllState());


                await gotoFlow(flowClienteRegistrado);
            } else {
                await gotoFlow(flowClienteNuevo);
            }
        }
    );


async function consultarDatosCliente(phone) {
    try {
        const url = process.env.API_URL || 'http://localhost:3000/api';

        const { data } = await axios.get(`${url}/clientes/whatsapp/${phone}`);
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = { flowReservar }




