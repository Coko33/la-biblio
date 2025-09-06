/* import { useState } from "react";
import "./CRUDshows.css";

export default function Imagen({ cambiaFile, imagenURL }) {
  console.log(imagenURL)
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
 */
import { useEffect, useRef, useState } from "react";

export default function Imagen({ cambiaFile, imagenURL }) {
  const [preview, setPreview] = useState(null);
  const objectUrlRef = useRef(null); // para revocar blobs anteriores

  // Sincroniza el preview cuando cambie la prop
  useEffect(() => {
    setPreview(imagenURL || null);
  }, [imagenURL]);

  // Limpieza al desmontar
  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    };
  }, []);

  const handlePreview = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Revocar el blob anterior si existía
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    const blobUrl = URL.createObjectURL(file);
    objectUrlRef.current = blobUrl;

    setPreview(blobUrl);
    cambiaFile(file);

    // Permite volver a seleccionar el mismo archivo
    e.target.value = "";
  };

  return (
    <div>
      <label className="input-labelDescripcion" htmlFor="descripcion">
        Imagen
      </label>

      <div className="input-imagen">
        {preview ? (
          <img
            className="imagenPreview"
            width="320"
            src={preview}
            alt="Vista previa"
            onError={() => setPreview(null)}
          />
        ) : (
          <div className="imagenPreview placeholder" style={{ width: 320, height: 180 }}>
            {/* Placeholder / skeleton si querés */}
          </div>
        )}

        <input
          className="input-imagen-input"
          type="file"
          accept="image/*"
          onChange={handlePreview}
        />
      </div>
    </div>
  );
}
