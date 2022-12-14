import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { showsCollectionRef } from "../../firebase";
import "./Show.css";

import img1 from "./../../assets/show1.jpg";
const Show = () => {
  const [elShow, setElShow] = useState({
    titulo: "Sil Wassington",
    subtitulo: "Jazz & Movies",
    imagen: img1,
    fechaYHora: "Jueves 15 - 20:30 hs.",
    descripcion:
      "<p>A través de las películas hemos conocido y se han inmortalizado casi todos los clásicos que seguimos escuchando, tocando y reversionando hasta el día de hoy.</p></br><p>La cantante Silvina Wassington presenta un repertorio de jazz que evoca aquellos primeros musicales y películas de los años 40′, rememorando clásicos de la gran Ella Fitzgerald, pasando por la inolvidable Judy Garland con temas de George Gershwin, Irving Berlin, Mc Hugh, Henderson y llegando hasta el genial Ennio Morricone con su música para Cinema Paradiso.</p></br><p>Entre baladas, blues, un poco de historia y swing, acercaremos la magia de aquellos tiempos. Acompaña en piano Javier Müller</p>",
    precios:
      "<p>Show $1700 / Consumición mínima $1200</p><p>Show con cena $4500</p>",
  });

  return (
    <>
      <div className="elShow-container">
        <div className="elShow-imagen-container">
          <button className="volver">
            <i class="material-icons volver-icon">keyboard_arrow_left</i>
          </button>
          <img className="elShow-imagen" src={img1}></img>
          <div className="elShow-text-container">
            <h2 className="elShow-titulo">{elShow.titulo}</h2>
            <h3 className="elShow-subtitulo">{elShow.subtitulo}</h3>
          </div>
        </div>
        <div className="elShow-fecha-container">
          <div className="elShow-fecha-iconoSchedule">
            <i class="material-icons">schedule</i>
          </div>
          <p className="elShow-fecha-texto">{elShow.fechaYHora}</p>
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
    </>
  );
};

export default Show;
