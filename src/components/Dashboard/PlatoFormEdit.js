import { useEffect, useState } from "react";
import "./Dashboard.css";
import TituloPlato from "../CRUDcarta/TituloPlato";
import OrdenPlato from "./../CRUDcarta/OrdenPlato";
import DescripcionPlato from "../CRUDcarta/DescripcionPlato";
import CategoriaPlato from "../CRUDcarta/CategoriaPlato";
import ImagenPlato from "../CRUDcarta/ImagenPlato";
import PrecioPlato from "../CRUDcarta/PrecioPlato";
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

export default function ShowFormEdit({ elId, closeSingle, obtenerPlatos }) {
  const [titulo, setTitulo] = useState("");
  const [orden, setOrden] = useState();
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
  }, []);

  async function getSingle(elId) {
    const docRef = doc(cartaCollectionRef, elId);
    const elDoc = await getDoc(docRef);
    if (elDoc.exists()) {
      setTitulo(elDoc.data().titulo);
      setOrden(elDoc.data().orden);
      setDescripcion(elDoc.data().descripcion);
      setCategoria(elDoc.data().categoria);
      setPrecio(elDoc.data().precio);
      setImagenURL(elDoc.data().imagenURL);
      console.log(orden);
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
  const cambiaOrden = (e) => setOrden(e.target.value);
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
              orden: parseInt(orden, 10) || 0,
              categoria: categoria,
              descripcion: descripcion || "",
              precio: parseInt(precio, 10) || "",
              imagenURL: downloadURL,
            })
              .then((res) => {
                setOk(`Se editó correctamente el item \n"${titulo}"`);
                obtenerPlatos();
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
      setDoc(doc(cartaCollectionRef, elId), {
        titulo: titulo,
        orden: parseInt(orden, 10) || 0,
        categoria: categoria,
        descripcion: descripcion || "",
        precio: parseInt(precio, 10) || "",
        imagenURL: imagenURL,
      })
        .then((res) => {
          setOk(`Se editó correctamente el item\n"${titulo}"`);
          obtenerPlatos();
          setTimeout(() => {
            resetOk();
            closeSingle();
            setTitulo("");
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
      <div className="formShow-container">
        <button className="formShow-button" onClick={() => closeSingle()}>
          Cerrar
        </button>
        <h2 className="titulo-form">Modificar "{titulo}"</h2>
        <TituloPlato cambiaTitulo={cambiaTitulo} titulo={titulo} />
        <CategoriaPlato
          cambiaCategoria={cambiaCategoria}
          categoria={categoria}
        />
        <OrdenPlato cambiaOrden={cambiaOrden} orden={orden} />
        <DescripcionPlato
          cambiaDescripcion={cambiaDescripcion}
          descripcion={descripcion}
        />
        <PrecioPlato cambiaPrecio={cambiaPrecio} precio={precio} />
        <ImagenPlato cambiaFile={cambiaFile} imagenURL={imagenURL} />
        <div className="formShow-button-container">
          <button className="formShow-button" onClick={enviarEditado}>
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
