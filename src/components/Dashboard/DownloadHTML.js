import "./Dashboard.css";
import { useState } from "react";
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
          <button className="buttonLogout-dashboard buttonDownload">
            descargar newsletter
          </button>
        </div>
      </div>
    </>
  );
}
