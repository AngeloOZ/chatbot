
/**
 * Funcion para obtener el nombre del día de la semana
 * @param {number| null} dia dia de la semana, empieza en 1
 * @returns string
 */
function obtenerDiaSemana(dia = null) {
    const diasDeLaSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

    if (dia != null) {
        return diasDeLaSemana[dia - 1];
    }

    const fecha = new Date(); // Fecha actual
    const currentDia = fecha.getDay(); // Obtiene el número del día de la semana
    return diasDeLaSemana[currentDia]; // Devuelve el nombre del día de la semana
}


/**
 * Funcion para obtgener la fecha formateada DD/MM/YYYY
 * @param {string | null} fecha 
 * @returns string
 */
function obtenerFechaFormateada(fecha = null) {

    const fechaActual = (fecha == null) ? new Date() : new Date(fecha);
    const anio = fechaActual.getFullYear();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Los meses comienzan en 0 (enero) y terminan en 11 (diciembre), por lo que sumamos 1.
    const dia = String(fechaActual.getDate()).padStart(2, '0');
    const fechaFormateada = `${dia}/${mes}/${anio}`;
    return fechaFormateada;
}

module.exports = { obtenerDiaSemana, obtenerFechaFormateada }