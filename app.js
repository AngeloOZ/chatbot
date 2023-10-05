const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const JsonFileAdapter = require('@bot-whatsapp/database/json')

const Server = require('./server/server');

const { flowPrincipal } = require('./flows/inicio');

const flowLocation = addKeyword(EVENTS.LOCATION)
    .addAnswer('🙌 Hols hemos recivido tu ubicacion')
    .addAnswer('estamos haciendo una consulta')
    .addAnswer('⌚ por favor espera')
    .addAction(async (ctx) => {
        const location = ctx.message;
        console.log(ctx);
        console.log(location.locationMessage.degreesLatitude);
        console.log(location.locationMessage.degreesLongitude);
    })

const main = async () => {
    const adapterDB = new JsonFileAdapter()
    const adapterFlow = createFlow([flowPrincipal, flowLocation])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    const httpServer = new Server(5678, adapterProvider, adapterDB)
    httpServer.start();

    // QRPortalWeb()
}

main()
