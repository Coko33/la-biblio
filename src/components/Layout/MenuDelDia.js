import React from "react";
import "./MenuDelDia.css";

export default function MenuDelDia({closeMenuDelDia}) {
  return (
    <div className="menuDelDia-container" onClick={closeMenuDelDia}>
      <div className="menuDelDia-modal">
      <button className="menuDelDia-cerrar" onClick={closeMenuDelDia}>x</button>
        <div className="menuDelDia-contenido">
          <h2>Almuerzo Ejecutivo</h2>
          <p>
            La Biblioteca Café ofrece almuerzo ejecutivo los dias hábiles de 12:30 a 15hs. <br></br>
            incluye plato, bebida y postre o café.
          </p>
          <p>¡Consultá la carta!</p>
        </div>
      </div>
    </div>
  );
}
