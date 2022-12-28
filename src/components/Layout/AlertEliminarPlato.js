import "./Alert.css";
import { cartaCollectionRef } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";
export function AlertEliminarPlato({
  elId,
  elTitulo,
  closeEliminar,
  closeSingle,
  obtenerPlatos,
}) {
  const eliminarDoc = async () => {
    try {
      await deleteDoc(doc(cartaCollectionRef, elId));
      obtenerPlatos();
      closeEliminar();
      closeSingle();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="alert-container">
      <span className="alert-span">{`¿Estás segura de eliminar item ${elTitulo}?`}</span>
      <button onClick={() => eliminarDoc()} className="alert-button">
        Ok
      </button>
      <button onClick={() => closeEliminar()} className="alert-button">
        Cancelar
      </button>
    </div>
  );
}
