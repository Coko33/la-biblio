import "./../CRUDshows/CRUDshows.css";
export default function OrdenPlato({ cambiaOrden, orden }) {
  return (
    <div>
      <label className="input-labelOrden" htmlFor="orden">
        Orden en la lista
      </label>
      <input
        type="number"
        className="input-orden"
        placeholder="orden en que se muestra en la categoria. 1 es arriba"
        value={orden}
        onChange={cambiaOrden}
      />
    </div>
  );
}
