import "./Nav.css";
import { NavLink } from "react-router-dom";
import logo from "./../../assets/logo biblioteca café-11.svg";
export default function Nav() {
  //console.log(ruta);
  return (
    <div>
      <div className="nav-container">
        <div className="titulo-container">
          <NavLink to="/">
            <div className="logo-container">
              <img src={logo} alt=""></img>
            </div>
          </NavLink>
          <h1 className="navTitulo">La Biblioteca Café</h1>
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
                <p className="icon-text faq">
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
