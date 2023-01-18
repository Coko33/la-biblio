import { useEffect, useState } from "react";
import "./Dashboard.css";
import Titulo from "../CRUDcarta/TituloPlato";
import Descripcion from "../CRUDcarta/DescripcionPlato";
import Categoria from "../CRUDcarta/CategoriaPlato";
import Imagen from "../CRUDcarta/ImagenPlato";
import Precio from "../CRUDcarta/PrecioPlato";
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
import { cartaCollectionRef } from "../../firebase";

//Storage
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";

export default function ShowFormEdit({ elId, closeSingle }) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagenURL, setImagenURL] = useState("");
  const [precio, setPrecio] = useState("");
  const [habilitado, setHabilitado] = useState(true);
  const [eliminado, setEliminado] = useState(false);
  const [destacado, setDestacado] = useState(false);
  const [suspendido, setSuspendido] = useState(false);

  useEffect(() => {
    getSingle(elId);
    return getSingle();
  }, []);

  async function getSingle(elId) {
    const docRef = doc(cartaCollectionRef, elId);
    const elDoc = await getDoc(docRef);
    if (elDoc.exists()) {
      setTitulo(elDoc.data().titulo);
      setDescripcion(elDoc.data().descripcion);
      setCategoria(elDoc.data().categoria);
      setPrecio(elDoc.data().precio);
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
  const cambiaDescripcion = (e) => setDescripcion(e);
  const cambiaCategoria = (e) => setCategoria(e.target.value);
  const cambiaPrecio = (e) => setPrecio(e.target.value);
  const cambiaFile = (file) => setFile(file);

  const enviarEditado = () => {
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
            setDoc(doc(cartaCollectionRef, elId), {
              titulo,
              subtitulo: categoria || "",
              categoria: categoria,
              descripcion: descripcion || "",
              precio: precio || "",
              imagenURL: downloadURL,
            })
              .then((res) => {
                console.log(res);
                setOk(`Se editó correctamente el item \n"${titulo}"`);
                setTitulo("");
              })
              .catch((err) => {
                setError(err.message);
              });
          });
        }
      );
    } else {
      setDoc(doc(cartaCollectionRef, elId), {
        titulo: titulo,
        categoria: categoria,
        descripcion: descripcion || "",
        precio: precio || "",
        imagenURL: imagenURL,
      })
        .then((res) => {
          console.log(res);
          setOk(`Se editó correctamente el item\n"${titulo}"`);
          setTitulo("");
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  };

  return (
    <>
      {error && <Alert message={error} resetError={resetError} />}
      {ok && <Alert message={ok} resetError={resetOk} />}
      <div className="formShow-container">
        <button className="formShow-button" onClick={() => closeSingle()}>
          Cerrar
        </button>
        <h2 className="titulo-form">Modificar "{titulo}"</h2>
        <Titulo cambiaTitulo={cambiaTitulo} titulo={titulo} />
        <Categoria cambiaCategoria={cambiaCategoria} categoria={categoria} />
        <Descripcion
          cambiaDescripcion={cambiaDescripcion}
          descripcion={descripcion}
        />
        <Precio cambiaPrecio={cambiaPrecio} precio={precio}></Precio>
        <Imagen cambiaFile={cambiaFile} imagenURL={imagenURL} />
        <div className="formShow-button-container">
          <button className="formShow-button" onClick={enviarEditado}>
            Enviar
          </button>
        </div>
      </div>
    </>
  );
}
