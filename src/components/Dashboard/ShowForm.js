import { useState } from "react";
import "./Dashboard.css";
import Titulo from "../CRUDshows/Titulo";
import Subtitulo from "../CRUDshows/Subtitulo";
import Descripcion from "../CRUDshows/Descripcion";
import Fecha from "../CRUDshows/Fecha";
import Imagen from "../CRUDshows/Imagen";
import { Alert } from "../Layout/Alert";

//firestore
import { addDoc } from "firebase/firestore";
import { showsCollectionRef } from "../../firebase";

//Storage
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";
import Precios from "../CRUDshows/Precios";

export default function ShowForm() {
  const [titulo, setTitulo] = useState("");
  const [subtitulo, setSubtitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaYHora, setFechaYHora] = useState(Date.now);
  const [precios, setPrecios] = useState("");
  const [habilitado, setHabilitado] = useState(true);
  const [eliminado, setEliminado] = useState(false);
  const [destacado, setDestacado] = useState(false);
  const [suspendido, setSuspendido] = useState(false);

  const [file, setFile] = useState(null);

  const [error, setError] = useState(null);
  const resetError = () => setError(null);
  const [ok, setOk] = useState(null);
  const resetOk = () => setOk(null);

  const cambiaTitulo = (e) => setTitulo(e.target.value);
  const cambiaSubtitulo = (e) => setSubtitulo(e.target.value);
  const cambiaDescripcion = (e) => setDescripcion(e);
  const cambiaFechaYHora = (e) => setFechaYHora(e);
  const cambiaPrecios = (e) => setPrecios(e);
  const cambiaFile = (file) => setFile(file);

  const enviar = () => {
    !file && setError("No se puede subir un show sin una imagen");
    const storageRef = ref(storage, `imagenes-shows/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (error) => {
        console.log(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          addDoc(showsCollectionRef, {
            titulo,
            subtitulo,
            descripcion,
            fechaYHora: fechaYHora.$d,
            imagenURL: downloadURL,
            precios: precios,
          })
            .then((res) => {
              console.log(res);
              setOk(`Se subio correctamente el show \n"${titulo}"`);
              setTitulo("");
              setTimeout(() => {
                window.location.replace("");
              }, 3000);
            })
            .catch((err) => {
              setError(err.message);
            });
        });
      }
    );
  };

  return (
    <div>
      {error && <Alert message={error} resetError={resetError} />}
      {ok && <Alert message={ok} resetError={resetOk} />}
      <div className="formShow-container">
        <h2 className="titulo-form">Agregar un show</h2>
        <Titulo cambiaTitulo={cambiaTitulo} />
        <Subtitulo cambiaSubtitulo={cambiaSubtitulo} />
        <Descripcion
          cambiaDescripcion={cambiaDescripcion}
          descripcion={descripcion}
        />
        <Precios cambiaPrecios={cambiaPrecios} precios={precios}></Precios>
        <Fecha cambiaFechaYHora={cambiaFechaYHora} fechaYHora={fechaYHora} />
        <Imagen cambiaFile={cambiaFile} />
        <div className="formShow-button-container">
          <button className="formShow-button" onClick={enviar}>
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}

// 31:41 https://www.youtube.com/watch?v=Y9-UkL6ent4&t=1593s
