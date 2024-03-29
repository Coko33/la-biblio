import { useState } from "react";
import "./Dashboard.css";
import TituloPlato from "../CRUDcarta/TituloPlato";
import CategoriaPlato from "../CRUDcarta/CategoriaPlato";
import OrdenPlato from "../CRUDcarta/OrdenPlato";
import DescripcionPlato from "../CRUDcarta/DescripcionPlato";
import PrecioPlato from "../CRUDcarta/PrecioPlato";
import ImagenPlato from "../CRUDcarta/ImagenPlato";
import { Alert } from "../Layout/Alert";

//firestore
import { addDoc } from "firebase/firestore";
import { cartaCollectionRef } from "../../firebase";

//Storage
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";

export default function PlatosForm() {
  const [titulo, setTitulo] = useState("");
  const [orden, setOrden] = useState();
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState();
  const [habilitado, setHabilitado] = useState(true);
  const [eliminado, setEliminado] = useState(false);
  const [destacado, setDestacado] = useState(false);
  const [suspendido, setSuspendido] = useState(false);

  const [error, setError] = useState(null);
  const resetError = () => setError(null);
  const [ok, setOk] = useState(null);
  const resetOk = () => setOk(null);

  const [file, setFile] = useState(null);

  const cambiaTitulo = (e) => setTitulo(e.target.value);
  const cambiaOrden = (e) => setOrden(e.target.value);
  const cambiaCategoria = (e) => setCategoria(e.target.value);
  const cambiaDescripcion = (e) => setDescripcion(e.target.value);
  const cambiaPrecio = (e) => setPrecio(e.target.value);
  const cambiaFile = (file) => setFile(file);

  const subirDoc = (downloadURL) => {
    addDoc(cartaCollectionRef, {
      titulo,
      orden: parseInt(orden, 10),
      categoria,
      descripcion,
      precio: parseInt(precio, 10),
      imagenURL: downloadURL || null,
    })
      .then((res) => {
        setOk(`Se subio correctamente el ítem \n"${titulo}"`);
        setTimeout(() => {
          window.location.replace("");
        }, 2000);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const enviar = () => {
    if (file != null) {
      const storageRef = ref(storage, `imagenes-carta/${file.name}`);
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
            subirDoc(downloadURL);
          });
        }
      );
    } else {
      subirDoc();
    }
  };

  return (
    <div>
      {error && <Alert message={error} resetError={resetError} />}
      {ok && <Alert message={ok} resetError={resetOk} />}
      <div className="formShow-container">
        <h2 className="titulo-form">Agregar un plato o bebida</h2>
        <TituloPlato cambiaTitulo={cambiaTitulo} titulo={titulo} />
        <CategoriaPlato
          cambiaCategoria={cambiaCategoria}
          categoria={categoria}
        ></CategoriaPlato>
        <OrdenPlato cambiaOrden={cambiaOrden} orden={orden}></OrdenPlato>
        <DescripcionPlato
          cambiaDescripcion={cambiaDescripcion}
          descripcion={descripcion}
        />
        <PrecioPlato cambiaPrecio={cambiaPrecio} precio={precio} />
        <ImagenPlato cambiaFile={cambiaFile} />
        <div className="formShow-button-container">
          <button className="formShow-button" onClick={enviar}>
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
