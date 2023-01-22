import ReactQuill from "react-quill";
import "../../../node_modules/react-quill/dist/quill.snow.css";
import "./../CRUDshows/CRUDshows.css";

export default function DescripcionPlato({ cambiaDescripcion, descripcion }) {
  const modules = {
    toolbar: [
      [{ header: [false, 3, 2, 1] }],
      [{ color: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "color",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  return (
    <div>
      <label className="input-labelDescripcion" htmlFor="descripcion">
        Descripción (opcional)
      </label>
      <ReactQuill
        className="input-descripcion"
        placeholder="opcionalmente escribir la descripcion del plato"
        modules={modules}
        formats={formats}
        value={descripcion}
        onChange={cambiaDescripcion}
      />
    </div>
  );
}
