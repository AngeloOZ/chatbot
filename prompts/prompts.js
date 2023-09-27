const prompts = {
    promptHorarios: 'El horario de turnos es el siguiente: "%HORARIOS%" El cliente quiere "%HORA_CLIENTE%" basado en el listado de horarios mencionado determinar si la hora esta disponible, si la hora esta disponible responder un mensaje afirmativo de la siguiente forma DISPONIBLE-{mensage generado}, si no existe genera un mensaje corto amable disculpandote y sugiriendo la sigueinte hora más cercana nunca una anterior de la siguiente forma NO_DISPONIBLE-{mensage generado}',
    promptFechaHora: 'Ayudatme a determinar la fecha que el cliente quiere viajar la fecha actual es "27/9/2023" y día "miercoles" y el cliente quiere viajar el "me reserva un turno para hoy a las 4pm" con base a la fecha actual y la fecha del cliente, determina la fecha y hora y devuelve la respuesta DD/MM/YYYY-HH:MM sin texto adicional',
}

module.exports = prompts;