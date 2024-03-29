import { useEffect, useState } from "react";
import "./Dashboard.css";
import Titulo from "../CRUDshows/Titulo";
import Subtitulo from "../CRUDshows/Subtitulo";
import Descripcion from "../CRUDshows/Descripcion";
import Fecha from "../CRUDshows/Fecha";
import Imagen from "../CRUDshows/Imagen";
import { Alert } from "../Layout/Alert";

//firestore
import {
  addDoc,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { showsCollectionRef } from "../../firebase";

//Storage
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";
import Precios from "../CRUDshows/Precios";

export default function ShowFormEdit({ elId, closeSingle, getShows }) {
  const [titulo, setTitulo] = useState("");
  const [subtitulo, setSubtitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaYHora, setFechaYHora] = useState("");
  const [imagenURL, setImagenURL] = useState("");
  const [precios, setPrecios] = useState("");
  const [habilitado, setHabilitado] = useState(true);
  const [eliminado, setEliminado] = useState(false);
  const [destacado, setDestacado] = useState(false);
  const [suspendido, setSuspendido] = useState(false);

  useEffect(() => {
    getSingle(elId);
  }, []);

  async function getSingle(elId) {
    const docRef = doc(showsCollectionRef, elId);
    const elDoc = await getDoc(docRef);
    if (elDoc.exists()) {
      setTitulo(elDoc.data().titulo);
      setSubtitulo(elDoc.data().subtitulo);
      setDescripcion(elDoc.data().descripcion);
      setPrecios(elDoc.data().precios);
      setFechaYHora(new Date(elDoc.data().fechaYHora.seconds * 1000));
      setImagenURL(elDoc.data().imagenURL);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  const [file, setFile] = useState(null);

  const [error, setError] = useState(null);
  const resetError = () => setError(null);
  const [ok, setOk] = useState(null);
  const resetOk = () => setOk(null);

  const cambiaTitulo = (e) => setTitulo(e.target.value);
  const cambiaSubtitulo = (e) => setSubtitulo(e.target.value);
  const cambiaDescripcion = (e) => setDescripcion(e);
  const cambiaPrecios = (e) => setPrecios(e);
  const cambiaFechaYHora = (e) => {
    setFechaYHora(e.$d);
  };
  const cambiaFile = (file) => setFile(file);

  const enviarEditado = () => {
    !file & !imagenURL && setError("No se puede subir un show sin una imagen");
    fechaYHora.$d && setFechaYHora(fechaYHora.$d);
    if (file) {
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
            setDoc(doc(showsCollectionRef, elId), {
              titulo,
              subtitulo: subtitulo || "",
              descripcion: descripcion || "",
              precios: precios || "",
              fechaYHora: fechaYHora,
              imagenURL: downloadURL,
            })
              .then((res) => {
                console.log(res);
                setOk(`Se editó correctamente el show \n"${titulo}"`);
                getShows();
                setTimeout(() => {
                  resetOk();
                  closeSingle();
                  setTitulo("");
                  /* window.location.replace(""); */
                }, 2000);
              })
              .catch((err) => {
                setError(err.message);
              });
          });
        }
      );
    } else {
      setDoc(doc(showsCollectionRef, elId), {
        titulo,
        subtitulo: subtitulo || "",
        descripcion: descripcion || "",
        precios: precios || "",
        fechaYHora: fechaYHora,
        imagenURL: imagenURL,
      })
        .then((res) => {
          console.log(res);
          setOk(`Se editó correctamente el show \n"${titulo}"`);
          getShows();
          setTimeout(() => {
            resetOk();
            closeSingle();
            setTitulo("");
            /* window.location.replace(""); */
          }, 2000);
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  };

  return (
    <div>
      {error && <Alert message={error} resetError={resetError} />}
      {ok && <Alert message={ok} resetError={resetOk} />}
      {titulo && (
        <div className="formShow-container">
          <button className="formShow-button" onClick={() => closeSingle()}>
            Cerrar
          </button>
          <h2 className="titulo-form">Modificar "{titulo}"</h2>
          <Titulo cambiaTitulo={cambiaTitulo} titulo={titulo} />
          <Subtitulo cambiaSubtitulo={cambiaSubtitulo} subtitulo={subtitulo} />
          <Descripcion
            cambiaDescripcion={cambiaDescripcion}
            descripcion={descripcion}
          />
          <Precios cambiaPrecios={cambiaPrecios} precios={precios}></Precios>
          <Fecha cambiaFechaYHora={cambiaFechaYHora} fechaYHora={fechaYHora} />
          <Imagen cambiaFile={cambiaFile} imagenURL={imagenURL} />
          <div className="formShow-button-container">
            <button className="formShow-button" onClick={enviarEditado}>
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
