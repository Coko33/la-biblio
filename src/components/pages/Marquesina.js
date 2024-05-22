import "./Marquesina.css"
import { useEffect, useState } from "react";
import { useModal } from "./../../Hooks/useModal";
import { showsCollectionRef } from "../../firebase";
import {
  query,
  orderBy,
  startAfter,
  limit,
  where,
  getCountFromServer,
  getDocs,
} from "firebase/firestore";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { obtenerProximo } from "../../Hooks/useProximo";
import useWindowDimensions from "../../Hooks/useWindowDimensions";



export default function Marquesina() {
    const deviceDimensions = useWindowDimensions();
    const [losDestacados, setLosDestacados] = useState([]);
    const [currentElementIndex, setCurrentElementIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        getShows();
      }, []);

      useEffect(() => {
        const intervalId = setInterval(() => {
          setCurrentElementIndex((prevIndex) => (prevIndex + 1) % losDestacados.length);
        }, 3000);
    
        return () => clearInterval(intervalId);
      }, [currentElementIndex, losDestacados.length]); 

    async function getShows() {
        setIsLoading(true);
        const q = query(
          showsCollectionRef,
          //where("fechaYHora", ">=", new Date(Date.now() - 3600 * 1000 * 12)),
          where("destacado", "==", true),
          orderBy("fechaYHora"),
        );    
        const q2 = query(
          showsCollectionRef,
          where("fechaYHora", ">=", new Date(Date.now() - 3600 * 1000 * 12)),
          orderBy("fechaYHora"),
          limit(4)
        );    
        
        let documentSnapshots = await getDocs(q);

        if (documentSnapshots.empty) {
            documentSnapshots = await getDocs(q2);
        }
        
        const showsData = documentSnapshots.docs.map((show) => ({
          id: show.id,
          titulo: show.data().titulo,
          subtitulo: show.data().subtitulo,
          descripcion: show.data().descripcion,
          fecha: (!show.data().esSemanal & !show.data().esDiario) ? new Date(show.data().fechaYHora.seconds * 1000).toLocaleDateString(
            "es-ES",
            {
              weekday: "long",
              month: "long",
              day: "numeric",
            }
          ) : obtenerProximo(show.data().fechaDesde, show.data().esDiario, show.data().esSemanal).toLocaleDateString(
            "es-ES",
            {
              weekday: "long",
              month: "long",
              day: "numeric",
            }
          ),
          hora: (!show.data().esSemanal & !show.data().esDiario) ? new Date(show.data().fechaYHora.seconds * 1000)
          .toLocaleTimeString()
          .slice(0, -3) : obtenerProximo(show.data().fechaDesde, show.data().esDiario, show.data().esSemanal)
          .toLocaleTimeString()
          .slice(0, -3),
          imagenURL: show.data().imagenURL,
          fechaYHora: show.data().fechaYHora ? show.data().fechaYHora.seconds : obtenerProximo(show.data().fechaDesde, show.data().esDiario, show.data().esSemanal),
          esDiario: show.data().esDiario,
          esSemanal: show.data().esSemanal,
          diaSemana: show.data().diaSemana,
        }));
        setLosDestacados(showsData);
        setIsLoading(false);
      }

      const numDivs = Math.floor(deviceDimensions.width / 22);
      
      return (
        <>
        {!isLoading && <div className="Marquesina__luces">
        {/* <img src="https://firebasestorage.googleapis.com/v0/b/la-biblio.appspot.com/o/layout%2FCaptura%20de%20pantalla%202024-05-17%20105826.png?alt=media&token=184f7e2e-0770-442b-9a03-3044e9b7e654"></img> */}
          <div className="Marquesina__luces-arriba">
            {Array.from({ length: numDivs }, (_, index) => (
              <div key={index} className="foquito"></div>
            ))}
          </div>
            <div className="Marquesina__luces-abajo">
            {Array.from({ length: numDivs }, (_, index) => (
              <div key={index} className="foquito"></div>
            ))}
            </div>
            <div className="Marquesina__luces-derecha">
          <div className="foquito2"></div>
          <div className="foquito2"></div>
          <div className="foquito2"></div>
          <div className="foquito2"></div>
          <div className="foquito2"></div>
          <div className="foquito2"></div>
            </div>
            <div className="Marquesina__luces-izquierda">
          <div className="foquito2"></div>
          <div className="foquito2"></div>
          <div className="foquito2"></div>
          <div className="foquito2"></div>
          <div className="foquito2"></div>
          <div className="foquito2"></div>
            </div>
        </div>}
        <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={deviceDimensions.width > 600}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper Marquesina__container"
      > 
          {losDestacados.map((element, index) => (
            <SwiperSlide
              className="Marquesina__element"
              key={index}
              style={{
                display: 'flex',
                width: '100%', 
                /* padding: '10px',  */
                /* border: '1px solid #ccc' */
              }}
            >

              <img src={element.imagenURL}></img>
              <div className="Marquesina__element-textContainer">
                <h3 className="Marquesina__element-titulo">{element.titulo}</h3>
                <div className="Marquesina__fecha-container">
                    <div className="Marquesina__fecha-iconoSchedule">
                      <i className="material-icons">schedule</i>
                    </div>
                    <p className="Marquesina__fecha-texto">
                      {element.esDiario ? "de Lunes a Viernes" : null}
                      {element.esSemanal ? `todos los ${element.diaSemana}` : null}
                      {!element.esDiario & !element.esSemanal ? element.fecha.replace(/^\w/, (c) => c.toUpperCase()) : null} {<br></br>} {element.hora + "hs."}
                    </p>
                    {/* <button
                      onClick={() => openUnShow(show.id)}
                      className="fecha-button"
                    >
                      + Información
                    </button> */}
                  </div>

              </div>
            </SwiperSlide>
          ))}
      </Swiper>
      
      </>);
}