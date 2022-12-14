import "./CRUDshows.css";
export default function Subtitulo({ cambiaSubtitulo }) {
  return (
    <>
      <label className="input-labelTitulo" htmlFor="subtitulo">
        Subtítulo
      </label>
      <input
        type="text"
        className="input-titulo"
        placeholder="Subtítulo opcional"
        onChange={cambiaSubtitulo}
      />
    </>
  );
}
