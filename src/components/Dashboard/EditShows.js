import "./Dashboard.css";
import { useEffect, useState } from "react";
import { getDocs } from "firebase/firestore";
import { useModal } from "./../../Hooks/useModal";
import { showsCollectionRef } from "../../firebase";
import ShowFormEdit from "./ShowFormEdit";
import { AlertEliminar } from "../Layout/AlertElimnar";

export default function EditShows() {
  const [losShows, setLosShows] = useState([]);
  const [isOpenSingle, openSingle, closeSingle] = useModal(false);
  const [isOpenEliminar, openEliminar, closeEliminar] = useModal(false);
  const [elId, setElId] = useState(null);
  const [elTitulo, setElTitulo] = useState("");

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
        setLosShows(showsData.sort((a, b) => b.fechaYHora - a.fechaYHora));
      })
      .catch((err) => console.log(err.message));
  }

  function editarUnShow(id) {
    openSingle();
    setElId(id);
  }

  function eliminarUnShow(id, titulo) {
    openEliminar();
    setElId(id);
    setElTitulo(titulo);
  }

  return (
    <>
      {isOpenEliminar && (
        <AlertEliminar
          elId={elId}
          elTitulo={elTitulo}
          closeEliminar={closeEliminar}
          getShows={getShows}
        ></AlertEliminar>
      )}
      {isOpenSingle && (
        <ShowFormEdit elId={elId} closeSingle={closeSingle}></ShowFormEdit>
      )}
      <table className="dwHTMLtable">
        <tbody>
          {losShows ? (
            losShows.map((show, i) => (
              <tr className="dwHTMLrow-show" key={i}>
                <td className="dwHTMLcell-showFecha">{show.fecha + " - "}</td>
                <td className="dwHTMLcell-showTitulo">{show.titulo}</td>
                <td>
                  <button onClick={() => editarUnShow(show.id)}>editar</button>
                </td>
                <td>
                  <button onClick={() => eliminarUnShow(show.id, show.titulo)}>
                    borrar
                  </button>
                </td>
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
