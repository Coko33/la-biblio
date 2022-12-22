import "./Dashboard.css";
import { useEffect, useState } from "react";
import { getDocs } from "firebase/firestore";
import { useModal } from "./../../Hooks/useModal";
import { showsCollectionRef } from "../../firebase";

export default function EditShows() {
  const [losShows, setLosShows] = useState([]);
  const [isOpenSingle, openSingle, closeSingle] = useModal(false);
  const [elId, setElId] = useState(null);

  useEffect(() => {
    getShows();
  }, []);

  function getShows() {
    getDocs(showsCollectionRef)
      .then((res) => {
        const showsData = res.docs.map((show) => ({
          id: show.id,
          titulo: show.data().titulo,
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
        setLosShows(showsData.sort((a, b) => a.fechaYHora - b.fechaYHora));
      })
      .catch((err) => console.log(err.message));
  }

  return (
    <>
      <table className="dwHTMLtable">
        <tbody>
          {losShows ? (
            losShows.map((show, i) => (
              <tr className="dwHTMLrow-show" key={i}>
                <td className="dwHTMLcell-showFecha">{show.fecha + " - "}</td>
                <td className="dwHTMLcell-showTitulo">{show.titulo}</td>
              </tr>
            ))
          ) : (
            <h3>Sin Shows</h3>
          )}
        </tbody>
      </table>
    </>
  );
}
