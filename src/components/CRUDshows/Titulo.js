import "./CRUDshows.css";
export default function Titulo({ cambiaTitulo }) {
  return (
    <>
      <label className="input-labelTitulo" htmlFor="titulo">
        Título
      </label>
      <input
        type="text"
        className="input-titulo"
        placeholder="Título del show"
        onChange={cambiaTitulo}
      />
    </>
  );
}
