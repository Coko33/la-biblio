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
import Link from "../CRUDshows/Link";

export default function ShowForm() {
  const [titulo, setTitulo] = useState("");
  const [subtitulo, setSubtitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaYHora, setFechaYHora] = useState(null);
  const [fechaDesde, setFechaDesde] = useState(null);
  const [fechaHasta, setFechaHasta] = useState(null);
  const [diaSemana, setDiaSemana] = useState(null);
  const [link, setLink] = useState(null)
  
  const [precios, setPrecios] = useState("");
  const [habilitado, setHabilitado] = useState(true);
  const [eliminado, setEliminado] = useState(false);
  const [destacado, setDestacado] = useState(false);
  const [suspendido, setSuspendido] = useState(false);
  const [esDiario, setEsDiario] = useState(false);
  const [esSemanal, setEsSemanal] = useState(false);

  const [file, setFile] = useState(null);

  const [error, setError] = useState(null);
  const resetError = () => setError(null);
  const [ok, setOk] = useState(null);
  const resetOk = () => setOk(null);

  const cambiaTitulo = (e) => setTitulo(e.target.value);
  const cambiaSubtitulo = (e) => setSubtitulo(e.target.value);
  const cambiaDescripcion = (e) => setDescripcion(e);
  const cambiaFechaYHora = (e) => setFechaYHora(e);
  const cambiaEsDiario = (e) => {
    setEsDiario(e);
    e && setFechaYHora(null);
    if (esSemanal) {
      setEsSemanal(false);
    };
    if (!e & !esSemanal) {
      setFechaDesde(null);
      setFechaHasta(null);
    }
  };
  const cambiaEsSemanal = (e) => {
    setEsSemanal(e);
    e && setFechaYHora(null);
    if (esDiario) {
      setEsDiario(false);
    };
    if (!e & !esDiario) {
      setFechaDesde(null);
      setFechaHasta(null);
    }
  };
  const cambiaFechaDesde = (e) => setFechaDesde(e);
  const cambiaFechaHasta = (e) => setFechaHasta(e);
  const cambiaDiaSemana = (event) => setDiaSemana(event.target.value);
  const cambiaPrecios = (e) => setPrecios(e);
  const cambiaFile = (file) => setFile(file);
  const cambiaLink = (e) => setLink(e.target.value)

  const enviar = () => {
    !file && setError("No se puede subir un show sin una imagen!");
    if((esDiario || esSemanal) & (!fechaDesde || !fechaHasta)) {
      setError("Falta la fecha de inicio o finalización!")
    } else if((!esDiario & !esSemanal) & !fechaYHora) {
      setError("Falta la fecha!")
    } else if(esSemanal & !diaSemana) {
      setError("Falta seleccionar el dia de la semana!")
    } else resetError();
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
        //bug. se setea el error pero se envía el show igualmente
        error === null && getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          addDoc(showsCollectionRef, {
            titulo,
            subtitulo,
            descripcion,
            fechaYHora: fechaYHora && fechaYHora.$d,
            fechaDesde: fechaDesde && fechaDesde.$d,
            fechaHasta: fechaHasta && fechaHasta.$d,
            esDiario,
            esSemanal,
            diaSemana,
            imagenURL: downloadURL,
            precios,
            link
          })
            .then((res) => {
              setOk(`Se subió correctamente el show \n"${titulo}"`);
              setTitulo("");
              setTimeout(() => {
                window.location.replace("");
              }, 2000);
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
        <Fecha mostrarChecks={true} cambiaFechaYHora={cambiaFechaYHora} cambiaEsDiario={cambiaEsDiario} cambiaEsSemanal={cambiaEsSemanal} cambiaFechaDesde={cambiaFechaDesde} cambiaFechaHasta={cambiaFechaHasta} cambiaDiaSemana={cambiaDiaSemana} fechaYHora={fechaYHora} esDiario={esDiario} esSemanal={esSemanal} fechaDesde={fechaDesde} fechaHasta={fechaHasta} diaSemana={diaSemana}/>
        <Imagen cambiaFile={cambiaFile} />
        <Link cambiaLink={cambiaLink}></Link>
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
