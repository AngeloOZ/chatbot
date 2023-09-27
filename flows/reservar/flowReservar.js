const { addKeyword, EVENTS, addAnswer } = require('@bot-whatsapp/bot')


const flowClienteNuevo = addAnswer('¡Bienvenido a *Colibrí Express!* 🌟');


const flowClienteRegistrado = addAnswer('La fecha de tu viaje es el *{{fecha}}* a las *{{hora}}*');



const flowReservar = addKeyword('1')
    .addAnswer('Dame un momento ⌛ para consultar unos datos')
    .addAction(async (ctx, { flowDynamic, gotoFlow, state }) => {
        const phone = ctx.from;
        
        // TODO: consultar datos del cliente con el número de teléfono
        const cliente = await consultarCliente(phone);

        if(cliente != null){

            state.update({
                nombre: cliente.nombre,
                apellido: cliente.apellido,
                nombreCompleto: `${cliente.nombre} ${cliente.apellido}`,
                email: cliente.email,
                telfono: cliente.telfono,
                direccion: cliente.direccion,
            });

            await flowDynamic(`Hola *${cliente.nombre}* 👋! para que día de gustaria revervar tu viaje`);
            // TODO
            await gotoFlow(flowClienteRegistrado);
        }else{
            await gotoFlow(flowClienteNuevo);
        }
    });





