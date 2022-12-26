import "./Dashboard.css";
import { useState } from "react";
import fileDownload from "js-file-download";
import Fecha from "../CRUDshows/Fecha";
import { showsCollectionRef } from "../../firebase";
import { getDocs, query, where, orderBy, limit } from "firebase/firestore";

export default function DownloadHTML() {
  const [fechaInicio, setFechaInicio] = useState();
  const [fechaFin, setFechaFin] = useState();
  const [newsletterData, setNewsletterData] = useState([]);

  /* useEffect(() => {}, [newsletterData]); */
  const cambiaFechaInicio = (e) => setFechaInicio(e);
  const cambiaFechaFin = (e) => setFechaFin(e);

  const encabezadoNews = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>`;

  const cuerpoNews = newsletterData.map(
    (show) => `<div style="position: relative; width: 100%">
  <div style="position: relative; width: 100%; max-height: 281px;">
    <img style="width: 100%" alt="" src=${show.imagenURL}></img>
    <div style="position: absolute; background-color: rgba(0, 0, 0, 0.412); width: 100%; height: 100px; bottom: 0; margin: auto;">
      <h2 style="font-size: 32px; font-weight: 200; margin: 20px 0 0 25px; color: var(--blanco); line-height: 36px;">${show.titulo}</h2>
      <h3 style="font-family: 'Archivo', sans-serif; margin: 5px 0 30px 29px; font-size: 14px; color: var(--blanco)">${show.subtitulo}</h3>
    </div>
  </div>
  <div style="position: relative; top:0; background-color: var(--gris-nav); width: 100%; height: 60px; display: flex; align-items: center; box-sizing: border-box;">
    <p style="font-family: 'Archivo', sans-serif; color: var(--icon-enabled); font-size: 14px; font-weight: bold; position: relative; display: inline; margin-left: 8px;">
      ${show.fecha} - ${show.hora}
    </p>
  </div>
  <div style="margin:20px;">
    <p style="margin:0; font-family: 'Archivo', sans-serif; color: var(--marron-logo); font-size: 14px;">${show.fechaYHora}</p>
  </div>
  <div style="margin:20px;">
      <p style="margin:0; font-family: 'Archivo', sans-serif; color: var(--marron-logo); font-size: 14px;">${show.fechaYHora}</p>
  </div>
</div>`
  );

  const footerNews = `</body></html>`;
  const elNewsletter = encabezadoNews + cuerpoNews + footerNews;
  let textFileAsBlob = new Blob([elNewsletter], { type: "text/html" });
  function mostrarShows() {
    const q = query(
      showsCollectionRef,
      where("fechaYHora", ">=", fechaInicio.$d),
      where("fechaYHora", "<=", fechaFin.$d)
    );
    getDocs(q)
      .then((res) => {
        const showsData = res.docs.map((show) => ({
          id: show.id,
          titulo: show.data().titulo,
          subtitulo: show.data().subtitulo,
          descripcion: show.data().descripcion,
          fecha: new Date(
            show.data().fechaYHora.seconds * 1000
          ).toLocaleDateString("es-ES", {
            month: "short",
            day: "numeric",
          }),
          hora: new Date(show.data().fechaYHora.seconds * 1000)
            .toLocaleTimeString()
            .slice(0, -3),
          imagenURL: show.data().imagenURL,
          fechaYHora: show.data().fechaYHora.seconds,
        }));
        setNewsletterData(
          showsData.sort((a, b) => a.fechaYHora - b.fechaYHora)
        );
      })
      .catch((err) => console.log(err.message));
  }

  /*   fechaInicio != null &&
    console.log(
      "Fecha de Inicio: " + new Date(fechaInicio.$d).getTime() / 1000
    );
  fechaFin != null &&
    console.log("Fecha de Fin: " + new Date(fechaFin.$d).getTime() / 1000); */

  const descargarNews = () => {
    let nombre = "archivo.html";
    /*     if (window.webkitURL != null) {
      elLink = window.webkitURL.createObjectURL(textFileAsBlob);
    } else {
      elLink = window.URL.createObjectURL(textFileAsBlob);
    } */
    fileDownload(textFileAsBlob, nombre);
  };
  return (
    <>
      <div className="formShow-container">
        <h2 className="dwHTML-titulo">
          Desacrgar Newsletter<br></br>en HTML
        </h2>
        <Fecha
          cambiaFechaYHora={cambiaFechaInicio}
          fechaYHora={fechaInicio}
          labelFecha={"Desde"}
        ></Fecha>
        <Fecha
          cambiaFechaYHora={cambiaFechaFin}
          fechaYHora={fechaFin}
          labelFecha={"Hasta"}
        ></Fecha>
        <table className="dwHTMLtable">
          <tbody>
            {newsletterData ? (
              newsletterData.map((show, i) => (
                <tr className="dwHTMLrow-show" key={i}>
                  <td className="dwHTMLcell-showFecha">{show.fecha + " - "}</td>
                  <td className="dwHTMLcell-showTitulo">{show.titulo}</td>
                  <td className="dwHTMLcell-showTitulo">Hola</td>
                </tr>
              ))
            ) : (
              <h3>Sin Shows</h3>
            )}
          </tbody>
        </table>
        <div className="dwHTMLbutton-container">
          <button
            onClick={() => mostrarShows()}
            className="buttonLogout-dashboard buttonMostrarShows"
          >
            mostrar shows
          </button>

          <button
            onClick={() => descargarNews()}
            className="buttonLogout-dashboard buttonDownload"
          >
            descargar newsletter
          </button>
        </div>
      </div>
    </>
  );
}
