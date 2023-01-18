import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useModal } from "./../../Hooks/useModal";
import { showsCollectionRef } from "../../firebase";
import { query, where } from "firebase/firestore";
import "./Shows.css";
import Show from "./Show";
import Spinner from "../Spinner/Spinner";

const Shows = () => {
  const [losShows, setLosShows] = useState([]);
  const [isOpenSingle, openSingle, closeSingle] = useModal(false);
  const [elId, setElId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getShows();
    return getShows();
  }, []);

  function openUnShow(id) {
    setElId(id);
    openSingle();
    window.scrollTo(0, 0);
  }

  function getShows() {
    setIsLoading(true);
    const q = query(
      showsCollectionRef,
      where("fechaYHora", ">=", new Date(Date.now()))
    );
    const r = query(showsCollectionRef, where("titulo", "!=", null));
    getDocs(q)
      .then((res) => {
        const showsData = res.docs.map((show) => ({
          id: show.id,
          titulo: show.data().titulo,
          subtitulo: show.data().subtitulo,
          descripcion: show.data().descripcion,
          fecha: new Date(
            show.data().fechaYHora.seconds * 1000
          ).toLocaleDateString("es-ES", {
            weekday: "long",
            month: "long",
            day: "numeric",
          }),
          hora: new Date(show.data().fechaYHora.seconds * 1000)
            .toLocaleTimeString()
            .slice(0, -3),
          imagenURL: show.data().imagenURL,
          fechaYHora: show.data().fechaYHora.seconds,
        }));
        setLosShows(showsData.sort((a, b) => a.fechaYHora - b.fechaYHora));
        setIsLoading(false);
      })
      .catch((err) => console.log(err.message));
  }
  return (
    <div>
      {isLoading && <Spinner></Spinner>}
      {isOpenSingle && <Show closeSingle={closeSingle} elId={elId}></Show>}
      {!isOpenSingle && (
        <div className="shows-container">
          {losShows ? (
            losShows.map((show, i) => (
              <div className="show-container" key={i}>
                <img
                  className="show-img"
                  alt="imagen show"
                  src={show.imagenURL}
                ></img>
                <div className="show-dataContainer">
                  <div className="show-descripcionContainer">
                    <h2 className="show-titulo">{show.titulo}</h2>
                    <h3 className="show-subtitulo">{show.subtitulo}</h3>
                    <div
                      className="descripcion-container line-clamp"
                      dangerouslySetInnerHTML={{ __html: show.descripcion }}
                    ></div>
                  </div>
                  <div className="fecha-container">
                    <div className="fecha-iconoSchedule">
                      <i className="material-icons">schedule</i>
                    </div>
                    <p className="fecha-texto">
                      {show.fecha} {<br></br>} {show.hora + "hs."}
                    </p>
                    <button
                      onClick={() => openUnShow(show.id)}
                      className="fecha-button"
                    >
                      + Información
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h3>Sin Shows</h3>
          )}
        </div>
      )}
    </div>
  );
};

export default Shows;
