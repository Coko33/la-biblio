import { useState } from "react";
import "./CRUDshows.css";

export default function Imagen({ cambiaFile, imagenURL }) {
  const [preview, setPreview] = useState(imagenURL);
  const handlePreview = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
    cambiaFile(e.target.files[0]);
  };

  return (
    <div>
      <label className="input-labelDescripcion" htmlFor="descripcion">
        Imagen
      </label>
      <div className="input-imagen">
        {<img className="imagenPreview" width="320" src={preview} alt=""></img>}
        <input
          className="input-imagen-input"
          type="file"
          onChange={handlePreview}
        ></input>
      </div>
    </div>
  );
}
