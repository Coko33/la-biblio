import { useEffect, useState } from "react";
import "./Dashboard.css";
import Titulo from "../CRUDshows/Titulo";
import Subtitulo from "../CRUDshows/Subtitulo";
import Descripcion from "../CRUDshows/Descripcion";
import Fecha from "../CRUDshows/Fecha";
import Imagen from "../CRUDshows/Imagen";
import { Alert } from "../Layout/Alert";
import { obtenerProximo } from "../../Hooks/useProximo";

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
  const [esDiario, setEsDiario] = useState(false);
  const [esSemanal, setEsSemanal] = useState(false);
  const [fechaDesde, setFechaDesde] = useState(null);
  const [fechaHasta, setFechaHasta] = useState(null);
  const [diaSemana, setDiaSemana] = useState("");
  const [fecha, setFecha] = useState(null)
  const [hora, setHora] = useState(null)

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
      setFechaYHora(elDoc.data().fechaYHora ? new Date(elDoc.data().fechaYHora.seconds * 1000) : obtenerProximo(elDoc.data().fechaDesde, elDoc.data().esDiario, elDoc.data().esSemanal));
      setFechaDesde(elDoc.data().fechaDesde && new Date(elDoc.data().fechaDesde.seconds * 1000));
      setFechaHasta(elDoc.data().fechaHasta && new Date(elDoc.data().fechaHasta.seconds * 1000));
      setEsDiario(elDoc.data().esDiario || false);
      setEsSemanal(elDoc.data().esSemanal || false);
      setImagenURL(elDoc.data().imagenURL);
      setDiaSemana(elDoc.data().diaSemana || null);
      console.log(elDoc.data().fechaYHora)
    } else {
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
    setFechaYHora(new Date(e.$d));
  };
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
  const cambiaFechaDesde = (e) => setFechaDesde(new Date(e.$d));
  const cambiaFechaHasta = (e) => setFechaHasta(new Date(e.$d));
  const cambiaFile = (file) => setFile(file);
  const cambiaDiaSemana = (e) => setDiaSemana(e.target.value);

  const enviarEditado = () => {
    !file & !imagenURL && setError("No se puede subir un show sin una imagen");
    //fechaYHora.$d && setFechaYHora(fechaYHora.$d);
    //cambiando la imagen
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
            console.log(fechaYHora)
            setDoc(doc(showsCollectionRef, elId), {
              titulo,
              subtitulo: subtitulo || "",
              descripcion: descripcion || "",
              precios: precios || "",
              fechaYHora: (esDiario || esSemanal) ? null : fechaYHora, //!isNaN(fechaYHora) ? fechaYHora : null,
              fechaDesde: fechaDesde ? fechaDesde : null, 
              fechaHasta: fechaHasta ? fechaHasta : null,
              esDiario,
              esSemanal,
              imagenURL: downloadURL,
              diaSemana: diaSemana ? diaSemana : null,

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
    //dejando la misma imagen
    } else {
      setDoc(doc(showsCollectionRef, elId), {
        titulo,
        subtitulo: subtitulo || "",
        descripcion: descripcion || "",
        precios: precios || "",
        fechaYHora: (esDiario || esSemanal) ? null : fechaYHora,
        fechaDesde: fechaDesde ? fechaDesde : null,
        fechaHasta: fechaHasta ? fechaHasta : null,
        esDiario,
        esSemanal,
        imagenURL: imagenURL,
        diaSemana: diaSemana ? diaSemana : null
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
          <Fecha mostrarChecks={true} cambiaFechaYHora={cambiaFechaYHora} cambiaEsDiario={cambiaEsDiario} cambiaEsSemanal={cambiaEsSemanal} cambiaFechaDesde={cambiaFechaDesde} cambiaFechaHasta={cambiaFechaHasta} cambiaDiaSemana={cambiaDiaSemana} fechaYHora={fechaYHora} esDiario={esDiario} esSemanal={esSemanal} fechaDesde={fechaDesde} fechaHasta={fechaHasta} diaSemana={diaSemana}/>
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
