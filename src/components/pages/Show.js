import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { showsCollectionRef } from "../../firebase";
import "./Show.css";
import Reservas from "./../Layout/Reservas";
import img1 from "./../../assets/show1.jpg";

const Show = ({ closeSingle, elId }) => {
  const [elShow, setElShow] = useState();

  useEffect(() => {
    getShow();
  }, []);

  async function getShow() {
    try {
      const docRef = doc(showsCollectionRef, elId);
      const docSnap = await getDoc(docRef);
      setElShow(docSnap.data());
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <>
      {elShow ? (
        <div className="elShow-container">
          <div className="elShow-imagen-container">
            <button onClick={closeSingle} className="volver">
              <i className="material-icons volver-icon">keyboard_arrow_left</i>
            </button>
            <img className="elShow-imagen" alt="" src={elShow.imagenURL}></img>
            <div className="elShow-text-container">
              <h2 className="elShow-titulo">{elShow.titulo}</h2>
              <h3 className="elShow-subtitulo">{elShow.subtitulo}</h3>
            </div>
          </div>
          <div className="elShow-fecha-container">
            <div className="elShow-fecha-iconoSchedule">
              <i className="material-icons">schedule</i>
            </div>
            <p className="elShow-fecha-texto">
              {new Date(elShow.fechaYHora.seconds * 1000)
                .toLocaleTimeString()
                .slice(0, -3) +
                "hs. - " +
                new Date(elShow.fechaYHora.seconds * 1000).toLocaleDateString(
                  "es-ES",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
            </p>
          </div>
          <div
            className="elShow-descripcion-container"
            dangerouslySetInnerHTML={{ __html: elShow.descripcion }}
          ></div>
          <div
            className="elShow-precios-container"
            dangerouslySetInnerHTML={{ __html: elShow.precios }}
          ></div>
        </div>
      ) : (
        <p></p>
      )}
      <Reservas></Reservas>
    </>
  );
};

export default Show;
