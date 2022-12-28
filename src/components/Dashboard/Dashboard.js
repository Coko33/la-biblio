import "./Dashboard.css";
import ShowForm from "./ShowForm";
import PlatosForm from "./PlatosForm";
import DownloadHTML from "./DownloadHTML";
import EditShows from "./EditShows";
import { useAuth } from "../../context/authContext";
import { useState } from "react";
import EditPlatos from "./EditPlatos";

export default function Dashboard() {
  const { logout } = useAuth();
  const [editandoShows, setEditandoShows] = useState(false);
  const [editandoCarta, setEditandoCarta] = useState(false);
  const editarShows = () => setEditandoShows(true);
  const editarCarta = () => setEditandoCarta(true);
  return (
    <>
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
      {editandoShows && <EditShows />}
      {editandoCarta && <EditPlatos />}
      <DownloadHTML />
      <ShowForm />
      <PlatosForm />
    </>
  );
}
