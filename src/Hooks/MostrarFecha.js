export function MostrarFechas(fechaPrimero, fechaUltimo, pagina){
    const fecha1 = new Date(fechaPrimero * 1000).toDateString()
    const fecha2 = new Date(fechaUltimo * 1000).toDateString()
    console.log("--------------")
    console.log("página: " + pagina)
    console.log("fecha del primero: " + fecha1)
    console.log("fecha del último: " + fecha2)
    console.log("--------------")
}