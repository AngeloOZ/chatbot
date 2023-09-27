const express = require('express');

const router = express.Router();

router.post('/send', async (req, res) => {
    try {
        const { phone, message } = req.body;
        const adapterProvider = req.providerWS;

        const id = `${sanitizePhoneNumber(phone)}@s.whatsapp.net`;


        // await adapterProvider.sendText(id, message);
        // await adapterProvider.sendText(`${phone}@s.whatsapp.net`, 'Mensaje desde el bot');

        // numero, latitud, longitud
        await adapterProvider.sendLocation(id, '-0.2767118', '-79.1940512');


        // TODO: Revisar
        // await adapterProvider.sendMedia(id, 'https://phantom-elmundo.unidadeditorial.es/f06e2af729c7118608e161785ab66e01/resize/473/f/webp/assets/multimedia/imagenes/2022/03/09/16468231873512.jpg', 'holaa');

        //    const re2s = await adapterProvider.sendButtons(id, "Your Text", [
        //         {
        //             body: "Button 1",
        //         },
        //         {
        //             body: "Button 2",
        //         }
        //     ]);

        // Arreglar Adapter Baeilys
        // await adapterProvider.sendContact(id, '+593982863244', "Angel Ordonez");

        res.json({ message: "mensaje enviado" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: error.message });
    }
});

/**
 * Sanitiza el numero de telefono
 * @param {string} number 
 * @returns string
 */
function sanitizePhoneNumber(number) {
    let phone = number.replace('+', '').replace(/\s/g, "").trim();

    if (phone.startsWith('593')) {
        return phone;
    }

    if (phone.startsWith('09')) {
        return `593${phone.slice(1)}`;
    }
}

module.exports = router;