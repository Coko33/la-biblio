export function obtenerProximo(fecha, esDiario, esSemanal){

    const fechaHoy = new Date(Date.now() - 3600 * 1000 * 12)

    if (esSemanal) {
      let fechaProximo = fecha.seconds;
        while (fechaProximo < Math.floor(fechaHoy.getTime() / 1000)) {
            fechaProximo += 3600 * 24 * 7;
        }
        return new Date(fechaProximo * 1000);
    }
    if (esDiario) {
      const milis = new Date(fecha.seconds * 1000);
      const hora = milis.getHours();
      const minutos = milis.getMinutes();
      let nuevaFecha;
      if (fechaHoy.getDay() === 5) {
        nuevaFecha = new Date(Date.now() + 3600 * 24 * 3);
      } else if (fechaHoy.getDay() === 6) {
        nuevaFecha = new Date(Date.now() + 3600 * 24 * 2);
      } else {
        nuevaFecha = new Date(Date.now() + 3600 * 24);
      }
      nuevaFecha.setHours(hora);
      nuevaFecha.setMinutes(minutos);
      return nuevaFecha;
    }
  }