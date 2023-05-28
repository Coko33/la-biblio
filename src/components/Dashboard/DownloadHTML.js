import "./Dashboard.css";
import { useState, useEffect } from "react";
import fileDownload from "js-file-download";
import Fecha from "../CRUDshows/Fecha";
import { showsCollectionRef } from "../../firebase";
import { getDocs, query, where, orderBy, limit } from "firebase/firestore";

export default function DownloadHTML() {
  const [fechaInicio, setFechaInicio] = useState(
    new Date(Date.now()).toString()
  );
  const [fechaFin, setFechaFin] = useState(new Date(Date.now()).toString());
  const [seleccionados, setSeleccionados] = useState([]);
  const [newsletterData, setNewsletterData] = useState([]);
  const cambiaFechaInicio = (e) => setFechaInicio(e.$d);
  const cambiaFechaFin = (e) => setFechaFin(e.$d);

  const encabezadoNews = `<!DOCTYPE html>
  <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>La Biblioteca Café newsletter </title>
        <style type = “text/css”>
          @font-face {
            font-family: 'DM Serif Display';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url(https://fonts.gstatic.com/s/dmserifdisplay/v10/-nFnOHM81r4j6k0gjAW3mujVU2B2K_Q.woff) format('woff');
          }
          @font-face {
            font-family: 'Archivo';
            font-style: normal;
            font-weight: 400;
            font-stretch: normal;
            font-display: swap;
            src: url(https://fonts.gstatic.com/s/archivo/v18/k3k6o8UDI-1M0wlSV9XAw6lQkqWY8Q82sJaRE-NWIDdgffTTNDNp8w.woff) format('woff');
          }
          h1 {font-family:"DM Serif Display", Helvetica !important;margin:0px !important;}
          p {font-family:'Archivo', Helvetica !important;} 
        </style>
        <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Archivo&family=DM+Serif+Display&display=swap" rel="stylesheet">
          
    </head>
    <body style="margin: 0px; width: 100%; background-color: #e8e3df;">
      <table style="width: 100%; height: 200px; margin: 0px; border-collapse:collapse;border-spacing: 0px;" id="banner">
        <tr style="width: 100%; margin: 0px; background-size: cover;" background="https://firebasestorage.googleapis.com/v0/b/la-biblio.appspot.com/o/layout%2Fbiblioteca-baner1.jpg?alt=media&token=77e64746-f70d-4a2e-8bb3-36b0f37cce60">
          <td style="width: 140px;">
            <img style="display: inline; width: 80px; margin-left: 30px;" src="https://firebasestorage.googleapis.com/v0/b/la-biblio.appspot.com/o/layout%2Flogo-blanco.png?alt=media&token=5a4139a7-9623-4a26-bf4a-f10bf7d8066b" alt="">
          </td>
          <td>
            <h1 style="font-family: 'DM Serif Display', Helvetica; font-weight: 400; font-size: 36px; color: #ffffff; margin: 0px;line-height: 36px;">La Biblioteca Café</h1>
            <p style="font-family: 'Archivo', Helvetica; font-size: 18px; color: #ffffff; margin: 0px; margin: 0px;">Un espacio para la música en vivo</p>
          </td>
        </tr>
      </table>
      <table style="background-color: #e8e3df; border-collapse:collapse;border-spacing: 0px;" id="show">
          <tbody style="border-collapse:collapse">
            <tr>
              <td align="center">
              <table style="width:80%;border-collapse:collapse;border-bottom: 3px solid #7f4437;border-spacing: 0px;">
                <tr>
                  <td style="width: 50%; text-align: center;"><img style="width: 300px; margin-bottom: 0px; margin-top: 50px;" src="https://firebasestorage.googleapis.com/v0/b/la-biblio.appspot.com/o/imagenes-carta%2FPlato2.jpeg?alt=media&token=5d0badaa-6889-43b6-b248-facd6e3a16b0"></td>
                  <tr style="width: 80%;">
                    <td>
                      <p style="text-align: center;font-family: 'Archivo', Helvetica;margin-top: 10px;margin-bottom:10px; margin-left:20px; margin-right:20px;line-height: 16px; font-size:16px; font-weight: 700">Almuerzo Ejecutivo</p>
                      <p style="text-align: center;font-family: 'Archivo', Helvetica;margin-top: 0px;margin-bottom: 0px; margin-left:20px; margin-right:20px;line-height: 16px; font-size:14px;">días hábiles de 12:30 a 15:00</p>
                      <p style="text-align: center;font-family: 'Archivo', Helvetica;margin-top: 0px;margin-bottom: 0px; margin-left:20px; margin-right:20px;line-height: 16px; font-size:14px;">incluye plato, bebida y postre o café</p>
                      <p style="text-align: center;font-family: 'Archivo', Helvetica;margin-top: 0px;margin-bottom: 30px; margin-left:20px; margin-right:20px;line-height: 16px; font-size:14px;">$2700</p>
                    </td>
                  </tr>
                </tr>
                </table><table style="width:80%;border-collapse:collapse;border-bottom: 3px solid #7f4437;border-spacing: 0px;">
                </table>`;

  const cuerpoNews = filtrarSeleccionados().map(
    (show) =>
      `<table style="width:80%;border-collapse:collapse;border-bottom: 3px solid #7f4437;border-spacing: 0px;">
    <tr >
      <td style="width: 10%;"><img style="width: 200px; margin-bottom: 50px; margin-top: 50px;" src="${
        show.imagenURL
      }"></td>
      <td style="width: 90%;">
        <div style="padding: 20px;">
          <h2 style="font-family: 'DM Serif Display', Helvetica;font-size: 28px;margin:0;line-height: 28px;">${
            show.titulo
          }</h2>
          <h6 style="font-family: 'Archivo', Helvetica; font-size: 16px;margin:0;">${
            show.subtitulo ? show.subtitulo : ""
          }</h6>
          <p style="font-family: 'Archivo', Helvetica;">${show.descripcion}
            </p>
            <div style="width: 100%;">
              <img style="width:17px; display:inline;" src="https://firebasestorage.googleapis.com/v0/b/la-biblio.appspot.com/o/layout%2Ficono-relojito.png?alt=media&token=e4490e9e-12ea-4d4f-8c8c-b189c29b8540" alt="">
              <div style="display:inline;height: 17px;width:100%;">
                <p style="display:inline;font-family: 'Archivo', Helvetica;font-weight: 700;">${
                  show.fecha
                } - ${show.hora}hs.</p>
              </div>
              <p style="margin: 0px;font-family: 'Archivo', Helvetica;line-height: 20px;margin-top: 10px;">${
                show.precios ? show.precios : ""
              }</p>
            </div>
        </div>
      </td>
    </tr>
  </table>`
  );

  const footerNews = `</td>
  </tr>

  <tr style="width: 100%; text-align: center;">
    <td class="footer" align="center">
      <table style="width: 100%;border-collapse:collapse;border-spacing: 0px;">
        <tr style="width: 80%;">
          <td>
            <p style="text-align: center;font-family: 'Archivo', Helvetica;margin-top: 30px;margin-bottom:10px; margin-left:20px; margin-right:20px;line-height: 16px; font-size:14px;">La Biblioteca Café esta abierta desde las 9 horas y de lunes a viernes para almorzar (plato, bebida y postre o cafe x $2700) y también para desayunar, tomar algo, leer un libro de sus estantes, o simplemente sentarse a descansar del ruido de Buenos Aires!</p>
            <p style="text-align: center;font-family: 'Archivo', Helvetica;margin-top: 0px;margin-bottom: 0px; margin-left:20px; margin-right:20px;line-height: 16px; font-size:16px; font-weight: 700;">tel: 4811-0673 ó 15 6515-9514</p>
            <p style="text-align: center;font-family: 'Archivo', Helvetica;margin-top: 5px;margin-bottom: 0px; margin-left:20px; margin-right:20px;line-height: 16px; font-size:16px; font-weight: 700;">email: edith@labibliotecacafe.com.ar</p>
            <p style="text-align: center;font-family: 'Archivo', Helvetica;margin-top: 5px;margin-bottom:20px; margin-left:20px; margin-right:20px;line-height: 14px; font-size:16px;font-weight: 700;">Marcelo T. de Alvear 1155 - CABA</p>
          </td>
        </tr>
        <tr style="background-size: contain;background-repeat: no-repeat;" background="https://firebasestorage.googleapis.com/v0/b/la-biblio.appspot.com/o/layout%2Ffooter-newsletter2.jpg?alt=media&token=e2e359e7-5c09-4fc9-929b-021b074458a6">
          <td style="width: 100%; height: 150px;">
            
          </td>
        </tr>
      </table>
    </td>
  </tr>

</table>

</table>
</body>
</html>`;

  function acumShows(e) {
    const indexShow = parseInt(e, 10);
    if (seleccionados.indexOf(indexShow) === -1) {
      setSeleccionados([...seleccionados, indexShow]);
    } else if (seleccionados.indexOf(indexShow) >= 0) {
      setSeleccionados(seleccionados.filter((i) => i !== indexShow));
    }
  }

  function seleccionarTodos(checked) {
    if (checked) {
      newsletterData.forEach((show, i) =>
        setSeleccionados((seleccionados) => [...seleccionados, i])
      );
    } else {
      setSeleccionados([]);
    }
  }

  function mostrarShows() {
    fechaInicio.$d && setFechaInicio(fechaInicio.$d);
    fechaFin.$d && setFechaInicio(fechaFin.$d);
    const q = query(
      showsCollectionRef,
      where("fechaYHora", ">=", fechaInicio),
      where("fechaYHora", "<=", fechaFin)
    );
    const r = query(showsCollectionRef, where("titulo", "!=", null));
    getDocs(q)
      .then((res) => {
        const showsData = res.docs.map((show) => ({
          id: show.id,
          titulo: show.data().titulo,
          subtitulo: show.data().subtitulo,
          descripcion: show.data().descripcion,
          precios: show.data().precios,
          fecha: new Date(
            show.data().fechaYHora.seconds * 1000
          ).toLocaleDateString("es-ES", {
            month: "long",
            weekday: "long",
            day: "numeric",
          }),
          hora: new Date(show.data().fechaYHora.seconds * 1000)
            .toLocaleTimeString()
            .slice(0, -3),
          imagenURL: show.data().imagenURL,
          fechaYHora: show.data().fechaYHora.seconds,
          seleccionado: false,
        }));
        setNewsletterData(
          showsData.sort((a, b) => a.fechaYHora - b.fechaYHora)
        );
      })
      .catch((err) => console.log(err.message));
  }

  function filtrarSeleccionados() {
    const evFilt = [];
    newsletterData.forEach((show, i) => {
      if (seleccionados.indexOf(i) >= 0) {
        evFilt.push(show);
      }
    });
    return evFilt;
  }
  function descargarNews() {
    let nombre = `newsletter desde ${fechaInicio.toLocaleDateString()} hasta ${fechaFin.toLocaleDateString()} .html`;
    const elNewsletter = encabezadoNews + cuerpoNews.join("") + footerNews;
    let textFileAsBlob = new Blob([elNewsletter], { type: "text/html" });
    fileDownload(textFileAsBlob, nombre);
  }

  return (
    <div>
      <div className="formShow-container">
        <h2 className="dwHTML-titulo">
          Descargar Newsletter<br></br>en HTML
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

        <div className="containter-tablaEditar">
          <table className="dwHTMLtable">
            <thead className="tablaHead">
              <tr>
                <th>Fecha</th>
                <th>Título</th>
                <th>Seleccionados</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr className="dwHTMLrow-show">
                <td></td>
                <td></td>
                <td>
                  <input
                    onChange={(e) => seleccionarTodos(e.target.checked)}
                    type="checkbox"
                  ></input>
                  Seleccionar todos
                </td>
                <td></td>
                <td></td>
              </tr>
              {newsletterData ? (
                newsletterData.map((show, i) => (
                  <tr className="dwHTMLrow-show" key={i}>
                    <td className="dwHTMLcell-showFecha">
                      {show.fecha} &nbsp; &nbsp; &nbsp; &nbsp;
                    </td>
                    <td className="dwHTMLcell-showTitulo">
                      {show.titulo} &nbsp; &nbsp; &nbsp; &nbsp;
                    </td>
                    <td className="dwHTMLcell-showTitulo">
                      <input
                        onChange={(e) => acumShows(e.target.value)}
                        type="checkbox"
                        value={i}
                        checked={seleccionados.includes(i)}
                      ></input>
                    </td>
                  </tr>
                ))
              ) : (
                <h3>Sin Shows</h3>
              )}
            </tbody>
          </table>
        </div>

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
    </div>
  );
}
