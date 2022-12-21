import "./../CRUDshows/CRUDshows.css";
export default function PrecioPlato({ cambiaPrecio }) {
  return (
    <>
      <label className="input-labelPrecio" htmlFor="precio">
        Precio
      </label>
      <input
        type="text"
        className="input-titulo"
        placeholder="precio del producto en $"
        onChange={cambiaPrecio}
      />
    </>
  );
}
