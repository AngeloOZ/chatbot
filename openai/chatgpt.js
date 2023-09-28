// import { Configuration, OpenAIApi } from "openai";

const { Configuration, OpenAIApi } = require("openai");


/**
 * Función para realizar consultas con IA a OPENIA
 * @param {string} dataIn prompt para el sistema
 * @param {number} temperature temperatura de la respuesta
 * @returns 
 */
const completion = async (dataIn = '', temperature = 0) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: dataIn,
    max_tokens: 256,
    temperature,
  });

  return response
}


/**
 * Función para enviar peticiones a CHATGPT
 * @param {string} text contenido del mensaje del usuario
 * @param {string} roleContent Descripcion del rol del sistema
 * @returns string
 */
const chat = async (text, roleContent = '') => {
  try {
    if (roleContent == '') {
      roleContent = "Tu eres un vendedor amable que saluda al cliente, con frases cortas pero carismatico";
    }

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: roleContent },
        { role: "user", content: text },
      ],
    });
    return completion.data.choices[0].message;
  } catch (err) {
    console.log(err.response.data);
    return "ERROR";
  }
};

module.exports = { chat, completion };
