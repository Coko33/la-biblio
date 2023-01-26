import "./Dashboard.css";
import { useEffect, useState } from "react";
import { getDocs, addDoc } from "firebase/firestore";
import { useModal } from "./../../Hooks/useModal";
import { showsCollectionRef } from "../../firebase";
import ShowFormEdit from "./ShowFormEdit";
import { AlertEliminar } from "../Layout/AlertEliminar";
import { Alert } from "../Layout/Alert";

export default function EditShows({ setEditandoShows }) {
  const [losShows, setLosShows] = useState([]);
  const [isOpenSingle, openSingle, closeSingle] = useModal(false);
  const [isOpenEliminar, openEliminar, closeEliminar] = useModal(false);
  const [elId, setElId] = useState(null);
  const [elTitulo, setElTitulo] = useState("");

  const [error, setError] = useState(null);
  const resetError = () => setError(null);
  const [ok, setOk] = useState(null);
  const resetOk = () => setOk(null);

  useEffect(() => {
    getShows();
  }, []);

  function getShows() {
    getDocs(showsCollectionRef)
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
          precios: show.data().precios,
        }));
        setLosShows(showsData.sort((a, b) => b.fechaYHora - a.fechaYHora));
      })
      .catch((err) => console.log(err.message));
  }

  function editarUnShow(id) {
    openSingle();
    setElId(id);
    window.scrollTo(0, 0);
  }

  function eliminarUnShow(id, titulo) {
    openEliminar();
    setElId(id);
    setElTitulo(titulo);
  }

  function duplicarUnShow(show) {
    addDoc(showsCollectionRef, {
      titulo: show.titulo,
      subtitulo: show.subtitulo || null,
      descripcion: show.descripcion,
      fechaYHora: new Date(show.fechaYHora.seconds).toLocaleTimeString(),
      imagenURL: show.imagenURL,
      precios: show.precios,
    })
      .then((res) => {
        getShows();
        setOk(`Se duplicó el show \n"${show.titulo}"`);
        setTimeout(() => {
          resetOk();
        }, 2000);
      })
      .catch((err) => {
        setError(err.message);
      });
  }

  return (
    <div>
      {ok && <Alert message={ok} resetError={resetOk} />}
      {isOpenEliminar && (
        <AlertEliminar
          elId={elId}
          elTitulo={elTitulo}
          closeEliminar={closeEliminar}
          getShows={getShows}
          setOk={setOk}
        ></AlertEliminar>
      )}
      {isOpenSingle && (
        <ShowFormEdit
          elId={elId}
          closeSingle={closeSingle}
          getShows={getShows}
        ></ShowFormEdit>
      )}
      <div className="formShow-container">
        <h2 className="dwHTML-titulo">Editar Shows</h2>
        <button
          className="formShow-button"
          onClick={() => setEditandoShows(false)}
        >
          Cerrar
        </button>
        <div className="containter-tablaEditar">
          <table className="dwHTMLtable">
            <thead className="tablaHead">
              <tr>
                <th>Fecha</th>
                <th>Título</th>
                <th></th>
                <th>Acciones</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {losShows ? (
                losShows.map((show, i) => (
                  <tr className="dwHTMLrow-show" key={i}>
                    <td className="dwHTMLcell-showFecha">
                      {show.fecha}&nbsp; &nbsp; &nbsp; &nbsp;
                    </td>
                    <td className="dwHTMLcell-showTitulo">
                      {show.titulo}&nbsp; &nbsp; &nbsp; &nbsp;
                    </td>
                    <td>
                      &nbsp;&nbsp;
                      <button onClick={() => editarUnShow(show.id)}>
                        editar
                      </button>
                    </td>
                    <td>
                      &nbsp;&nbsp;
                      <button
                        onClick={() => eliminarUnShow(show.id, show.titulo)}
                      >
                        borrar
                      </button>
                    </td>
                    <td>
                      &nbsp;&nbsp;
                      <button onClick={() => duplicarUnShow(show)}>
                        duplicar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <h3>Sin Shows</h3>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
