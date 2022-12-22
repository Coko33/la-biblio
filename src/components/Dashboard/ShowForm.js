import { useState } from "react";
import "./Dashboard.css";
import Titulo from "../CRUDshows/Titulo";
import Subtitulo from "../CRUDshows/Subtitulo";
import Descripcion from "../CRUDshows/Descripcion";
import Fecha from "../CRUDshows/Fecha";
import Imagen from "../CRUDshows/Imagen";

//firestore
import { addDoc } from "firebase/firestore";
import { showsCollectionRef } from "../../firebase";

//Storage
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";

export default function ShowForm() {
  const [titulo, setTitulo] = useState("");
  const [subtitulo, setSubtitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaYHora, setFechaYHora] = useState("");
  const [habilitado, setHabilitado] = useState(true);
  const [eliminado, setEliminado] = useState(false);
  const [destacado, setDestacado] = useState(false);
  const [suspendido, setSuspendido] = useState(false);

  const [file, setFile] = useState(null);

  const cambiaTitulo = (e) => setTitulo(e.target.value);
  const cambiaSubtitulo = (e) => setSubtitulo(e.target.value);
  const cambiaDescripcion = (e) => setDescripcion(e);
  const cambiaFechaYHora = (e) => setFechaYHora(e);
  const cambiaFile = (file) => setFile(file);

  const enviar = () => {
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
          })
            .then((res) => console.log(res))
            .catch((err) => {
              console.log(err.message);
            });
        });
      }
    );
  };

  return (
    <>
      <div className="formShow-container">
        <h2 className="titulo-form">Agregar un show</h2>
        <Titulo cambiaTitulo={cambiaTitulo} />
        <Subtitulo cambiaSubtitulo={cambiaSubtitulo} />
        <Descripcion cambiaDescripcion={cambiaDescripcion} />
        <Fecha cambiaFechaYHora={cambiaFechaYHora} fechaYHora={fechaYHora} />
        <Imagen cambiaFile={cambiaFile} />
        <div className="formShow-button-container">
          <button className="formShow-button" onClick={enviar}>
            Enviar
          </button>
        </div>
      </div>
    </>
  );
}

// 31:41 https://www.youtube.com/watch?v=Y9-UkL6ent4&t=1593s
