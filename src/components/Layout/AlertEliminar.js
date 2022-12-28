import "./Alert.css";
import { showsCollectionRef } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";
export function AlertEliminar({ elId, elTitulo, closeEliminar, getShows }) {
  const eliminarDoc = async () => {
    try {
      await deleteDoc(doc(showsCollectionRef, elId));
      getShows();
      closeEliminar();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="alert-container">
      <span className="alert-span">{`¿Estás segura de eliminar el show ${elTitulo}?`}</span>
      <button onClick={() => eliminarDoc()} className="alert-button">
        Ok
      </button>
      <button onClick={() => closeEliminar()} className="alert-button">
        Cancelar
      </button>
    </div>
  );
}
