import { useState } from "react";
import "./../CRUDshows/CRUDshows.css";

export default function ImagenPlato({ cambiaFile }) {
  const [preview, setPreview] = useState();
  const handlePreview = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
    cambiaFile(e.target.files[0]);
  };

  return (
    <>
      <label className="input-labelDescripcion" htmlFor="descripcion">
        Imagen del plato o bebida
      </label>
      <div className="input-imagen">
        {<img className="imagenPreview" width="320" src={preview} alt=""></img>}
        <form>
          <input
            className="input-imagen-input"
            type="file"
            onChange={handlePreview}
          ></input>
          {/*<button type="submit">subir</button>*/}
        </form>
      </div>
    </>
  );
}
