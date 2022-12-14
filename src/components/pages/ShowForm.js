import { useState } from "react";

import Descripcion from "../CRUDshows/Descripcion";
import Subtitulo from "../CRUDshows/Subtitulo";
import Titulo from "../CRUDshows/Titulo";

import { addDoc, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { showsCollectionRef } from "../../firebase";
import Fecha from "../CRUDshows/Fecha";

export default function ShowForm() {
  const [titulo, setTitulo] = useState("");
  const [subtitulo, setSubtitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaYHora, setFechaYHora] = useState("");
  const cambiaTitulo = (e) => setTitulo(e.target.value);
  const cambiaSubtitulo = (e) => setSubtitulo(e.target.value);
  const cambiaDescripcion = (e) => setDescripcion(e);
  const cambiaFechaYHora = (e) => setFechaYHora(e);
  const [previewUrl, setPreviewUrl] = useState([]);

  const enviar = async () => {
    console.log({ titulo, subtitulo, descripcion, fechaYHora });
    /* addDoc(showsCollectionRef, {
      titulo,
      subtitulo,
      descripcion,
    })
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err.message);
      }); */
  };
  return (
    <>
      <Titulo cambiaTitulo={cambiaTitulo} />
      <Subtitulo cambiaSubtitulo={cambiaSubtitulo} />
      <Descripcion cambiaDescripcion={cambiaDescripcion} />
      <Fecha cambiaFechaYHora={cambiaFechaYHora} />
      <button onClick={enviar}>Enviar</button>
    </>
  );
}

// 31:41 https://www.youtube.com/watch?v=Y9-UkL6ent4&t=1593s
