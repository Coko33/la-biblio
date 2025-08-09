import React from "react";
import "./MenuDelDia.css";
import logo from "./../../assets/lb logo 3.svg";

export default function MenuDelDia({closeMenuDelDia}) {
  return (
    <div className="menuDelDia-container" onClick={closeMenuDelDia}>
      <div className="menuDelDia-modal">
        <button className="menuDelDia-cerrar" onClick={closeMenuDelDia}>x</button>
        <div className="menuDelDia-contenidoYLogo">
          <div className="menuDelDia-logo">
            <img src={logo} alt=""></img>
          </div>
          <div className="menuDelDia-contenido">
            <h2>Almuerzo Ejecutivo</h2>
            <p>
              La Biblioteca Café ofrece almuerzo ejecutivo los dias hábiles de 12:30 a 15hs. <br></br>
              incluye plato y bebida.
            </p>
            <p>¡Consultá la carta!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
