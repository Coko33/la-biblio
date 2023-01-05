import "./Nav.css";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "./../../assets/logo biblioteca café-11.svg";
import { useState, useEffect } from "react";
export default function Nav() {
  const location = useLocation().pathname;
  const [ruta, setRuta] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    setRuta(location);
  }, [location]);
  return (
    <>
      <div className="nav-container">
        <div className="titulo-container">
          <a onClick={() => navigate("")}>
            <div className="logo-container">
              <img src={logo} alt=""></img>
            </div>
          </a>
          <h1 className="navTitulo">La Biblioteca Café</h1>
        </div>
        <div className="navButtons-container">
          <div className="navButton showsButton">
            <a
              onClick={() => navigate("")}
              className={`nav-link ${ruta === "/" && "active"}`}
            >
              <div className="nav-icon">
                {/*                 <i class="material-icons">star</i>
                 */}{" "}
                <p className="icon-text">Shows</p>
              </div>
              <div className="nav-notch"></div>
            </a>
          </div>
          <div className="navButton cartaButton">
            <a
              onClick={() => navigate("carta")}
              className={`nav-link ${ruta === "/carta" && "active"}`}
            >
              <div className="nav-icon">
                {/*                 <i class="material-icons">restaurant</i>
                 */}{" "}
                <p className="icon-text">Carta</p>
              </div>
              <div className="nav-notch"></div>
            </a>
          </div>
          <div className="navButton FAQsButton">
            <a
              onClick={() => navigate("FAQs")}
              className={`nav-link ${ruta === "/FAQs" && "active"}`}
            >
              <div className="nav-icon">
                {/*                 <i class="material-icons">favorite</i>
                 */}{" "}
                <p className="icon-text faq">
                  Preguntas
                  <br />
                  frecuentes
                </p>
              </div>
              <div className="nav-notch"></div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
