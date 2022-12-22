import { useState } from "react";
import Fecha from "../CRUDshows/Fecha";
import { showsCollectionRef } from "../../firebase";
import { getDocs, query, where, orderBy, limit } from "firebase/firestore";

export default function DownloadHTML() {
  const [fechaInicio, setFechaInicio] = useState();
  const [fechaFin, setFechaFin] = useState();
  const [newsletterData, setNewsletterData] = useState([]);

  const cambiaFechaInicio = (e) => setFechaInicio(e);
  const cambiaFechaFin = (e) => setFechaFin(e);

  function mostrarShows() {
    const q = query(showsCollectionRef, where("titulo", "!=", "un show mas"))
      .getDocs(showsCollectionRef)
      .then((res) => {
        const showsData = res.docs.map((show) => ({
          id: show.id,
          titulo: show.data().titulo,
          subtitulo: show.data().subtitulo,
          descripcion: show.data().descripcion,
          fecha: new Date(
            show.data().fechaYHora.seconds * 1000
          ).toLocaleDateString("es-ES", {
            weekday: "long",
            year: "numeric",
            month: "long",
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
        console.table(newsletterData);
      })
      .catch((err) => console.log(err.message));
  }

  /* fechaInicio != null &&
    console.log(
      "Fecha de Inicio: " + new Date(fechaInicio.$d).getTime() / 1000
    );
  fechaFin != null &&
    console.log("Fecha de Fin: " + new Date(fechaFin.$d).getTime() / 1000); */

  return (
    <>
      <h2>Desacrgar Newsletter en HTML</h2>
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
      <button
        onClick={() => mostrarShows()}
        className="buttonLogout-dashboard buttonDownload"
      >
        mostrarShows
      </button>
      <button className="buttonLogout-dashboard buttonDownload">
        descargar HTML
      </button>
    </>
  );
}
