import "./CRUDshows.css";
export default function Subtitulo({ cambiaSubtitulo, subtitulo }) {
  return (
    <div>
      <label className="input-labelTitulo" htmlFor="subtitulo">
        Subtítulo
      </label>
      <input
        type="text"
        className="input-titulo"
        placeholder="Subtítulo opcional"
        value={subtitulo}
        onChange={cambiaSubtitulo}
      />
    </div>
  );
}
