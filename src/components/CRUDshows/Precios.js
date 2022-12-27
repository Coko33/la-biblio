import ReactQuill from "react-quill";
import "../../../node_modules/react-quill/dist/quill.snow.css";
import "./CRUDshows.css";

export default function Precios({ cambiaPrecios, precios }) {
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
    <>
      <label className="input-labelDescripcion" htmlFor="descripcion">
        Precios
      </label>
      <ReactQuill
        className="input-descripcion"
        placeholder="Escribir la descripcion del show"
        modules={modules}
        formats={formats}
        value={precios}
        onChange={cambiaPrecios}
      />
    </>
  );
}
