import React from "react";
import "./Spinner.css";

export default function Spinner() {
  return (
    <div className="spinnerContainer">
      <div class="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p className="spinner__cargando">cargando...</p>
    </div>
  );
}
