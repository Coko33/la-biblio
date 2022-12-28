import "./../CRUDshows/CRUDshows.css";
export default function TituloPlato({ cambiaTitulo, titulo }) {
  return (
    <>
      <label className="input-labelTitulo" htmlFor="titulo">
        Nombre del plato o bebida
      </label>
      <input
        type="text"
        className="input-titulo"
        placeholder="nombre del plato o bebida"
        value={titulo}
        onChange={cambiaTitulo}
      />
    </>
  );
}
