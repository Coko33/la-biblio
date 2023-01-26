import "./Dashboard.css";
import { useEffect, useState } from "react";
import { getDocs } from "firebase/firestore";
import { useModal } from "../../Hooks/useModal";
import { cartaCollectionRef } from "../../firebase";
import PlatoFormEdit from "./PlatoFormEdit";
import { AlertEliminarPlato } from "../Layout/AlertEliminarPlato";
import { Alert } from "../Layout/Alert";

export default function EditPlatos({ setEditandoCarta }) {
  const [losPlatos, setLosPlatos] = useState([]);
  const [isOpenSingle, openSingle, closeSingle] = useModal(false);
  const [isOpenEliminar, openEliminar, closeEliminar] = useModal(false);
  const [elId, setElId] = useState(null);
  const [elTitulo, setElTitulo] = useState("");

  const [error, setError] = useState(null);
  const resetError = () => setError(null);
  const [ok, setOk] = useState(null);
  const resetOk = () => setOk(null);

  useEffect(() => {
    obtenerPlatos();
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
    window.scrollTo(0, 0);
  }
  function eliminarUnPlato(id, titulo) {
    openEliminar();
    setElId(id);
    setElTitulo(titulo);
  }

  return (
    <div>
      {ok && <Alert message={ok} resetError={resetOk} />}
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
        <PlatoFormEdit
          elId={elId}
          closeSingle={closeSingle}
          setOk={setOk}
          obtenerPlatos={obtenerPlatos}
        ></PlatoFormEdit>
      )}
      <div className="formShow-container">
        <h2 className="dwHTML-titulo">Editar Carta</h2>
        <button
          className="formShow-button"
          onClick={() => setEditandoCarta(false)}
        >
          Cerrar
        </button>
        <div className="containter-tablaEditar">
          <table className="dwHTMLtable">
            <thead className="tablaHead">
              <tr>
                <th>Categoria</th>
                <th>Item</th>
                <th>Precio</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {losPlatos ? (
                losPlatos.map((plato, i) => (
                  <tr className="dwHTMLrow-show" key={i}>
                    <td className="dwHTMLcell-showFecha">
                      {plato.categoria} &nbsp; &nbsp; &nbsp; &nbsp;
                    </td>
                    <td className="dwHTMLcell-showTitulo">
                      {plato.titulo}&nbsp; &nbsp; &nbsp; &nbsp;
                    </td>
                    <td className="dwHTMLcell-showTitulo">${plato.precio}</td>
                    <td>
                      <button onClick={() => editarUnPlato(plato.id)}>
                        editar
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => eliminarUnPlato(plato.id, plato.titulo)}
                      >
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
        </div>
      </div>
    </div>
  );
}
