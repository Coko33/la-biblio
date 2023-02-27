import React from "react";
import "./MenuDelDia.css";
//import { useModal } from "../../Hooks/useModal";

export default function MenuDelDia() {
  return (
    <div>
      <input type="checkbox" id="cerrar"></input>
      <label for="cerrar" id="btn-cerrar">
        X
      </label>
      <div class="modal">
        <div class="contenido">
          <h1>Almuerzo Ejecutivo</h1>
          <p>
            La Biblioteca Café ofrece almuerzo ejecutivo los dias habiles, con
            plato bebida y postre o cafe
          </p>
          <p>¡Consultá la carta!</p>
          <img src="http://lorempixel.com/200/200" alt=""></img>
        </div>
      </div>
    </div>
  );
}
