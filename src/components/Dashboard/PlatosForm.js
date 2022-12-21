import { useState } from "react";
import "./Dashboard.css";
import TituloPlato from "../CRUDcarta/TituloPlato";
import CategoriaPlato from "../CRUDcarta/CategoriaPlato";
import DescripcionPlato from "../CRUDcarta/DescripcionPlato";
import PrecioPlato from "../CRUDcarta/PrecioPlato";
import ImagenPlato from "../CRUDcarta/ImagenPlato";

//firestore
import { addDoc } from "firebase/firestore";
import { cartaCollectionRef } from "../../firebase";

//Storage
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";

export default function ShowForm() {
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState();
  const [habilitado, setHabilitado] = useState(true);
  const [eliminado, setEliminado] = useState(false);
  const [destacado, setDestacado] = useState(false);
  const [suspendido, setSuspendido] = useState(false);

  const [file, setFile] = useState(null);

  const cambiaTitulo = (e) => setTitulo(e.target.value);
  const cambiaCategoria = (e) => setCategoria(e.target.value);
  const cambiaDescripcion = (e) => setDescripcion(e.target.value);
  const cambiaPrecio = (e) => setPrecio(e.target.value);
  const cambiaFile = (file) => setFile(file);

  const subirDoc = (downloadURL) => {
    addDoc(cartaCollectionRef, {
      titulo,
      categoria,
      descripcion,
      precio: parseInt(precio, 10),
      imagenURL: downloadURL || null,
    })
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err.message);
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
    <>
      <div className="formShow-container">
        <h2 className="titulo-form">Agregar un plato o bebida</h2>
        <TituloPlato cambiaTitulo={cambiaTitulo} />
        <CategoriaPlato cambiaCategoria={cambiaCategoria}></CategoriaPlato>
        <DescripcionPlato cambiaDescripcion={cambiaDescripcion} />
        <PrecioPlato cambiaPrecio={cambiaPrecio} />
        <ImagenPlato cambiaFile={cambiaFile} />
        <div className="formShow-button-container">
          <button className="formShow-button" onClick={enviar}>
            Enviar
          </button>
        </div>
      </div>
    </>
  );
}
