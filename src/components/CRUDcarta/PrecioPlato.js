import "./../CRUDshows/CRUDshows.css";
export default function PrecioPlato({ cambiaPrecio, precio }) {
  return (
    <div>
      <label className="input-labelPrecio" htmlFor="precio">
        Precio (solo números!)
      </label>
      <input
        type="text"
        className="input-titulo"
        placeholder="precio del producto en $"
        value={precio}
        onChange={cambiaPrecio}
      />
    </div>
  );
}
