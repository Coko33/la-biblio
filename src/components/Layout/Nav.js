import "./Nav.css";
import { NavLink, Link } from "react-router-dom";
import logo from "./../../assets/logo biblioteca café-11.svg";
import useWindowDimensions from "../../Hooks/useWindowDimensions";
import { useState, useEffect } from "react";
export default function Nav() {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = (e) => {
    e.preventDefault();
    setIsActive(!isActive);
  };
  useEffect(() => {
    if (isActive) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isActive]);
  const { width } = useWindowDimensions();
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
        {width < 600 && 
          <button className={`nav-toggle ${isActive ? 'nav-toggle--active' : ''}`}
            onClick={handleToggle}>
            <span className="nav-toggle__text">Toggle Menu</span>
          </button>
        }
        <div className={`navButtons-container ${!isActive ? 'navButtons-container--active' : ''}`}>
          <div className="navButton showsButton" onClick={handleToggle}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <div className="nav-icon">
                {/*<i class="material-icons">star</i>*/}{" "}
                <p className="icon-text">Shows</p>
              </div>
              <div className="nav-notch"></div>
            </NavLink>
          </div>
          <div className="navButton cartaButton" onClick={handleToggle}>
            <NavLink
              to="/carta"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <div className="nav-icon">
                {/*<i class="material-icons">restaurant</i>*/}{" "}
                <p className="icon-text">Carta</p>
              </div>
              <div className="nav-notch"></div>
            </NavLink>
          </div>
          <div className="navButton acercaDeButton" onClick={handleToggle}>
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
          <div className="navButton FAQsButton" onClick={handleToggle}>
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
