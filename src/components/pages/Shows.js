import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { showsCollectionRef } from "../../firebase";
import "./Shows.css";

import img1 from "./../../assets/show1.jpg";
import img2 from "./../../assets/show2.jpg";

const Shows = () => {
  const [losShows, setLosShows] = useState([
    {
      titulo: "Sil Wassington, entre dos guerras otro espectaculo",
      subtitulo: "Jazz & Movies",
      imagen: img1,
      fechaYHora: "Jueves 15 - 20:30 hs.",
      descripcion: "<p>lorem ipsum</p>",
    },
    {
      titulo: "Entre dos guerras",
      subtitulo: "otro espectaculo",
      imagen: img2,
      fechaYHora: "Mie 14 a las 21",
      descripcion: "<p>lorem ipsum</p>",
    },
  ]);

  /* useEffect(() => {
    getShows();
  }, []);

  function getShows() {
    getDocs(showsCollectionRef)
      .then((res) => {
        const showsData = res.docs.map((show) => ({
          data: show.data(),
          id: show.id,
        }));
        setLosShows(showsData);
      })
      .catch((err) => console.log(err.message));
  } */
  return (
    <>
      <div className="shows-container">
        {losShows ? (
          losShows.map((show) => (
            <div className="show-container">
              <img className="show-img" src={show.imagen}></img>
              <h2 className="show-titulo">{show.titulo}</h2>
              <h3 className="show-subtitulo">{show.subtitulo}</h3>
              <div
                className="descripcion-container"
                dangerouslySetInnerHTML={{ __html: show.descripcion }}
              ></div>
              <div className="fecha-container">
                <div className="fecha-iconoSchedule">
                  <i class="material-icons">schedule</i>
                </div>
                <p className="fecha-texto">{show.fechaYHora}</p>
                <button className="fecha-button">Información</button>
              </div>
            </div>
          ))
        ) : (
          <h3>Sin Shows</h3>
        )}
      </div>
    </>
  );
};

export default Shows;
