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
        placeholder="Link de passline. Si queda vacío lleva al whatsapp"
        value={link}
        onChange={cambiaLink}
      />
    </div>
  );
}
