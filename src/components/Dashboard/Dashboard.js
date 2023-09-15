import "./Dashboard.css";
import ShowForm from "./ShowForm";
import PlatosForm from "./PlatosForm";
import DownloadHTML from "./DownloadHTML";
import EditShows from "./EditShows";
import EditPrecios from "./EditPrecios";
import { useAuth } from "../../context/authContext";
import { useState, useEffect } from "react";
import EditPlatos from "./EditPlatos";
import { doc, getDoc } from "firebase/firestore";
import { preciosCollectionRef } from "../../firebase";

export default function Dashboard() {
  const { logout } = useAuth();
  const [editandoShows, setEditandoShows] = useState(false);
  const [editandoCarta, setEditandoCarta] = useState(false);
  const [editandoPrecios, setEditandoPrecios] = useState(false);
  const editarShows = () => setEditandoShows(true);
  const editarCarta = () => setEditandoCarta(true);
  const editarPrecios = () => setEditandoPrecios(true);
  const [precios, setPrecios] = useState(null); //PXVg7zkPfjA4k2QuSZu5
  useEffect(()=>{
    if (precios !== null) {
      return;
    }
    async function getDocument (coll, id) {
      const snap = await getDoc(doc(preciosCollectionRef, id))
      if (snap.exists()) {
        setPrecios(snap.data())
        //console.log(snap.data());
      }    
      else
        return Promise.reject(Error(`No such document: ${coll}.${id}`))
    }
    getDocument("precios", "PXVg7zkPfjA4k2QuSZu5");
  },[precios])
  return (
    <div>
      <div className="headerDashboard-container">
        <h2 className="titulo-dashboard">Hola Edith!</h2>        
        <div className="buttonsLogoutEdit-Container">
          <button onClick={() => logout()} className="buttonLogout-dashboard">
            Cerrar sesion
          </button>
          <button
            onClick={() => editarShows()}
            className="buttonEdit-dashboard"
          >
            Editar shows
          </button>
          <button
            onClick={() => editarCarta()}
            className="buttonEdit-dashboard"
          >
            Editar carta
          </button>
        </div>
        
      </div>
      <div className="precios-container">
          <h3>Los precios actuales son:</h3>
          <h3>Consumición mínima: ${precios && precios.consumicionMinima}</h3><button
            onClick={() => editarPrecios()}
            className="buttonEdit-dashboard"
          >
            Editar precios
          </button>
          <h3>Menú Ejecutivo: ${precios && precios.menuEjecutivo}</h3>
        </div>
        {editandoPrecios && <EditPrecios setEditandoPrecios={setEditandoPrecios}/>}
      {editandoShows && <EditShows setEditandoShows={setEditandoShows} />}
      {editandoCarta && <EditPlatos setEditandoCarta={setEditandoCarta} />}
      <DownloadHTML />
      <ShowForm />
      <PlatosForm />
    </div>
  );
}
