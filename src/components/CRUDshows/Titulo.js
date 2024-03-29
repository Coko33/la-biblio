import "./CRUDshows.css";
export default function Titulo({ cambiaTitulo, titulo }) {
  return (
    <div>
      <label className="input-labelTitulo" htmlFor="titulo">
        Título
      </label>
      <input
        type="text"
        className="input-titulo"
        placeholder="Título del show"
        value={titulo}
        onChange={cambiaTitulo}
      />
    </div>
  );
}
