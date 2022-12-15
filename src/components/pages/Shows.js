import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useModal } from "./../../Hooks/useModal";
import { showsCollectionRef } from "../../firebase";
import "./Shows.css";
import Show from "./Show";

const Shows = () => {
  const [losShows, setLosShows] = useState([]);
  const [isOpenSingle, openSingle, closeSingle] = useModal(false);

  useEffect(() => {
    getShows();
  }, []);

  function getShows() {
    getDocs(showsCollectionRef)
      .then((res) => {
        const showsData = res.docs.map((show) => ({
          id: show.id,
          titulo: show.data().titulo,
          subtitulo: show.data().subtitulo,
          descripcion: show.data().descripcion,
          imagenURL: show.data().imagenURL,
        }));
        setLosShows(showsData);
      })
      .catch((err) => console.log(err.message));
  }
  return (
    <>
      {isOpenSingle && <Show closeSingle={closeSingle}></Show>}
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
                <h2 className="show-titulo">{show.titulo}</h2>
                <h3 className="show-subtitulo">{show.subtitulo}</h3>
                <div
                  className="descripcion-container"
                  dangerouslySetInnerHTML={{ __html: show.descripcion }}
                ></div>
                <div className="fecha-container">
                  <div className="fecha-iconoSchedule">
                    <i className="material-icons">schedule</i>
                  </div>
                  <p className="fecha-texto">{show.fechaYHora}</p>
                  <button onClick={openSingle} className="fecha-button">
                    Información
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h3>Sin Shows</h3>
          )}
        </div>
      )}
    </>
  );
};

export default Shows;
