import { useState } from "react";
import "./../CRUDshows/CRUDshows.css";

export default function CategoriaPlato({ cambiaCategoria, categoria }) {
  return (
    <div>
      <label className="input-labelCategoria" htmlFor="categoria">
        Elegir una Categoria
      </label>
      <select
        name=""
        className="input-selectCategoria"
        id="categoria"
        value={categoria}
        onChange={cambiaCategoria}
      >
        <option value="">elegir una categoria</option>
        <option value="Salados">Salados</option>
        <option value="Dulces">Dulces</option>
        <option value="Entradas">Entradas</option>
        <option value="Principales">Principales</option>
        <option value="Vinos tintos">Vinos tintos</option>
        <option value="Vinos blancos">Vinos blancos</option>
        <option value="Champagnes">Champagnes</option>
        <option value="Cafeteria">Cafeteria</option>
        <option value="Bebidas">Bebidas</option>
        <option value="Cervezas">Cervezas</option>
        <option value="Tragos">Tragos</option>
      </select>
    </div>
  );
}
