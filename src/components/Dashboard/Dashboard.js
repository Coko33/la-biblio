import "./Dashboard.css";
import ShowForm from "./ShowForm";
import PlatosForm from "./PlatosForm";
import DownloadHTML from "./DownloadHTML";
import EditShows from "./EditShows";
import { useAuth } from "../../context/authContext";
import { useState } from "react";

export default function Dashboard() {
  const { logout } = useAuth();
  const [editando, setEditando] = useState(false);

  const editar = () => setEditando(true);
  return (
    <>
      <div className="headerDashboard-container">
        <h2 className="titulo-dashboard">Hola Edith!</h2>
        <div className="buttonsLogoutEdit-Container">
          <button onClick={() => logout()} className="buttonLogout-dashboard">
            Cerrar sesion
          </button>
          <button onClick={() => editar()} className="buttonEdit-dashboard">
            Editar shows
          </button>
        </div>
      </div>
      {editando && <EditShows />}
      <DownloadHTML />
      <ShowForm />
      <PlatosForm />
    </>
  );
}
