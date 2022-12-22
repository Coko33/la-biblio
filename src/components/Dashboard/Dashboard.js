import "./Dashboard.css";
import ShowForm from "./ShowForm";
import PlatosForm from "./PlatosForm";
import { useAuth } from "../../context/authContext";
import DownloadHTML from "./DownloadHTML";

export default function Dashboard() {
  const { logout } = useAuth();

  return (
    <>
      <div className="headerDashboard-container">
        <h2 className="titulo-dashboard">Panel de admin</h2>
        <button onClick={() => logout()} className="buttonLogout-dashboard">
          Cerrar sesion
        </button>
      </div>
      <DownloadHTML />
      <ShowForm />
      <PlatosForm />
    </>
  );
}
