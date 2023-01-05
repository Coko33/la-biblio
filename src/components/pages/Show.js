import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { showsCollectionRef } from "../../firebase";
import "./Show.css";
import Reservas from "./../Layout/Reservas";

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
            <div className="elShow-text-container mobile">
              <h2 className="elShow-titulo">{elShow.titulo}</h2>
              <h3 className="elShow-subtitulo">{elShow.subtitulo}</h3>
            </div>
          </div>
          <div className="elShow-dataContainer">
            <div className="elShow-text-container desk">
              <h2 className="elShow-titulo">{elShow.titulo}</h2>
              <h3 className="elShow-subtitulo">{elShow.subtitulo}</h3>
            </div>
            <div className="elShow-descripcion-container">
              <div
                className="elShow-descripcion-container"
                dangerouslySetInnerHTML={{ __html: elShow.descripcion }}
              ></div>
              <div
                className="elShow-precios-container"
                dangerouslySetInnerHTML={{ __html: elShow.precios }}
              ></div>
            </div>
            <div className="elShow-fecha-container">
              <div className="elShow-fecha-iconoSchedule">
                <i className="material-icons">schedule</i>
              </div>
              <p className="elShow-fecha-texto">
                {new Date(elShow.fechaYHora.seconds * 1000).toLocaleDateString(
                  "es-ES",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}{" "}
                {<br></br>}{" "}
                {new Date(elShow.fechaYHora.seconds * 1000)
                  .toLocaleTimeString()
                  .slice(0, -3) + " hs."}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p></p>
      )}
    </>
  );
};

export default Show;
