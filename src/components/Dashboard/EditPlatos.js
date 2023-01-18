import "./Dashboard.css";
import { useEffect, useState } from "react";
import { getDocs } from "firebase/firestore";
import { useModal } from "../../Hooks/useModal";
import { cartaCollectionRef } from "../../firebase";
import PlatoFormEdit from "./PlatoFormEdit";
import { AlertEliminarPlato } from "../Layout/AlertEliminarPlato";

export default function EditPlatos() {
  const [losPlatos, setLosPlatos] = useState([]);
  const [isOpenSingle, openSingle, closeSingle] = useModal(false);
  const [isOpenEliminar, openEliminar, closeEliminar] = useModal(false);
  const [elId, setElId] = useState(null);
  const [elTitulo, setElTitulo] = useState("");

  useEffect(() => {
    obtenerPlatos();
    return obtenerPlatos();
  }, []);

  function obtenerPlatos() {
    getDocs(cartaCollectionRef)
      .then((res) => {
        const platosData = res.docs.map((plato) => ({
          id: plato.id,
          titulo: plato.data().titulo,
          categoria: plato.data().categoria,
          precio: plato.data().precio,
          imagenURL: plato.data().imagenURL,
        }));
        setLosPlatos(platosData);
      })
      .catch((err) => console.log(err.message));
  }

  function editarUnPlato(id) {
    openSingle();
    setElId(id);
  }

  function eliminarUnPlato(id, titulo) {
    openEliminar();
    setElId(id);
    setElTitulo(titulo);
  }

  return (
    <>
      {isOpenEliminar && (
        <AlertEliminarPlato
          elId={elId}
          elTitulo={elTitulo}
          closeEliminar={closeEliminar}
          closeSingle={closeSingle}
          obtenerPlatos={obtenerPlatos}
        ></AlertEliminarPlato>
      )}
      {isOpenSingle && (
        <PlatoFormEdit elId={elId} closeSingle={closeSingle}></PlatoFormEdit>
      )}
      <table className="dwHTMLtable">
        <tbody>
          {losPlatos ? (
            losPlatos.map((show, i) => (
              <tr className="dwHTMLrow-show" key={i}>
                <td className="dwHTMLcell-showFecha">{show.fecha + " - "}</td>
                <td className="dwHTMLcell-showTitulo">{show.titulo}</td>
                <td>
                  <button onClick={() => editarUnPlato(show.id)}>editar</button>
                </td>
                <td>
                  <button onClick={() => eliminarUnPlato(show.id, show.titulo)}>
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
