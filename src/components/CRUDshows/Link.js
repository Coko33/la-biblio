import "./CRUDshows.css";
export default function Link({ cambiaLink, link }) {
  return (
    <div>
      <label className="input-labelLink" htmlFor="link">
        Link
      </label>
      <input
        type="text"
        className="input-link"
        placeholder="Link del boton comprar"
        value={link}
        onChange={cambiaLink}
      />
    </div>
  );
}
