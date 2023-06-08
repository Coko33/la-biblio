import "./Nav.css";
import { NavLink, Link } from "react-router-dom";
import logo from "./../../assets/logo biblioteca café-11.svg";
export default function Nav() {
  return (
    <div>
      <div className="nav-container">
        <div className="titulo-container">
          <a href="/">
            <div className="logo-container">
              <img src={logo} alt=""></img>
            </div>
          </a>
          <div className="tituloYDirContainer">
            <h1 className="navTitulo">La Biblioteca Café</h1>
            <p className="navDir">Marcelo T. de Alvear 1155</p>
          </div>
        </div>
        <div className="navButtons-container">
          <div className="navButton showsButton">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <div className="nav-icon">
                {/*                 <i class="material-icons">star</i>
                 */}{" "}
                <p className="icon-text">Shows</p>
              </div>
              <div className="nav-notch"></div>
            </NavLink>
          </div>
          <div className="navButton cartaButton">
            <NavLink
              to="/carta"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <div className="nav-icon">
                {/*                 <i class="material-icons">restaurant</i>
                 */}{" "}
                <p className="icon-text">Carta</p>
              </div>
              <div className="nav-notch"></div>
            </NavLink>
          </div>
          <div className="navButton acercaDeButton">
            <NavLink
              to="/acercaDe"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <div className="nav-icon">
                {/*                 <i class="material-icons">favorite</i>
                 */}
                <p className="icon-text">Acerca de</p>
              </div>
              <div className="nav-notch"></div>
            </NavLink>
          </div>
          <div className="navButton FAQsButton">
            <NavLink
              to="/faqs"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <div className="nav-icon">
                {/*                 <i class="material-icons">favorite</i>
                 */}
                <p className="icon-text">
                  Preguntas
                  <br />
                  frecuentes
                </p>
              </div>
              <div className="nav-notch"></div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
