import { useEffect, useState, useRef } from "react";
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
import "./Shows.css";
import Show from "./Show";
import Spinner from "../Spinner/Spinner";

const Shows = () => {
  const [losShows, setLosShows] = useState([]);
  const [isOpenSingle, openSingle, closeSingle] = useModal(false);
  const [elId, setElId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState();
  const showsPorPagina = 10;
  const fechaHoy = {fecha: new Date(Date.now() - 3600 * 1000 * 12)}
  const [firstVisible, setFirstVisible] = useState(fechaHoy);
  const [lastVisible, setLastVisible] = useState(fechaHoy);

  useEffect(() => {
    console.log("pagina: " + pagina) 
    setIsLoading(true);
    const fetchData = async () => {
      try {
          const showsData = await getShows();
          setLosShows(showsData);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      } finally {
        setIsLoading(false);
        console.log(losShows)
      }
    };
    fetchData();
  }, [pagina]);
  
  useEffect(() => {
    if (losShows.length > 0) {
      setFirstVisible(losShows[0])
      setLastVisible(losShows[losShows.length - 1]);
      console.log("ultimafecha: " + lastVisible.titulo)
    }
  }, [losShows]);
  
/*   useEffect(() => {
    if (losShows.length > 0) {
      setIsLoading(true);
      const fetchData = async () => {
        try {
          const periodicosData = await getPeriodicos();
          const nuevosPeriodicosData = periodicosData.filter((periodico) => {
            return (periodico.fecha >= firstVisible.fecha && periodico.fecha <= lastVisible.fecha);
          });
          setLosShows([...losShows, ...nuevosPeriodicosData].sort((a, b) => a.fecha - b.fecha));
        } catch (error) {
          console.error("Error al obtener datos:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [firstVisible, lastVisible]); */
  
  useEffect(() => {
    contarPaginas();
  }, [totalPaginas]);

  async function contarPaginas() {
    const q = query(
      showsCollectionRef,
      where("fechaYHora", ">=", new Date(Date.now()))
    );
    const snapshot = await getCountFromServer(q);
    setTotalPaginas(Math.ceil(snapshot.data().count / showsPorPagina));
  }

  function openUnShow(id) {
    setElId(id);
    openSingle();
    window.scrollTo(0, 0);
  }

  function formatFecha(f) {
    const fecha = new Date(f * 1000).toLocaleDateString(
      "es-ES",
      {
        weekday: "long",
        month: "long",
        day: "numeric",
      }
    )
    return fecha
  }

  function formatHora(f) {
    const hora = new Date(f * 1000)
        .toLocaleTimeString()
        .slice(0, -3)
    return hora
  }
  function obtenerProximo(fecha, esDiario, esSemanal){
    if (esSemanal) {
      return fecha.seconds + 3600 * 24 * 7
    }
    if (esDiario) {
      if (Date.now().getDay() === 0) {
        return fecha.seconds + 3600 * 24 * 3
      } else if (Date.now().getDay() === 6) {
        return fecha.seconds + 3600 * 24 * 2
      } else {
        const fechaActual = new Date();
        const fechaOriginal = new Date(fecha.seconds * 1000); 
        fechaOriginal.setDate(fechaActual.getDate());
        if (fechaOriginal > fechaActual) {
          fechaOriginal.setDate(fechaActual.getDate() - 1);
        }
        return fechaOriginal
      }
    }
  }

  async function getPeriodicos() {
    const fechaNueva = new Date(lastVisible.fecha)
    try {
      const q = query(
      showsCollectionRef,
      where("fechaHasta", ">=", fechaNueva),
      where("esSemanal", "==", true || "esDiario", "==", true),
    )
    const documentSnapshots = await getDocs(q);
    const showsData = documentSnapshots.docs.map((show) => ({
      id: show.id,
      titulo: show.data().titulo,
      subtitulo: show.data().subtitulo,
      descripcion: show.data().descripcion,
      fecha: obtenerProximo(show.data().fechaDesde, show.data().esDiario, show.data().esSemanal),
      fechaDesde: show.data().fechaDesde,
      fechaHasta: show.data().fechaHasta,
      esDiario: show.data().esDiario,
      esSemanal: show.data().esSemanal,
      imagenURL: show.data().imagenURL,
    })); 
    return showsData;
    } catch (err) {
      console.log(err)
    } finally {
    }
  }

  async function getShows() {
    const fechaNueva = new Date(lastVisible.fecha)
    try {
        const q = query(
        showsCollectionRef,
        where("fechaYHora", ">=" , fechaNueva),
        limit(showsPorPagina)
      );
  
      const documentSnapshots = await getDocs(q);
      const showsData = documentSnapshots.docs.map((show) => ({
        id: show.id,
        titulo: show.data().titulo,
        subtitulo: show.data().subtitulo,
        descripcion: show.data().descripcion,
        fecha: show.data().fechaYHora.seconds,
        hora: show.data().fechaYHora.seconds,
        imagenURL: show.data().imagenURL,
        fechaYHora: show.data().fechaYHora,
      }));
      return showsData;
    } catch (error) {
      console.error("Error al obtener los shows:", error);
    } finally {
    }
  }
  

  return (
    <div>
      {isLoading && <Spinner></Spinner>}
      {isOpenSingle && <Show closeSingle={closeSingle} elId={elId}></Show>}
      {!isOpenSingle && (
        <div className="shows-container">
          {pagina > 1 && (
            <div className="pagination-container">
              <p>página {pagina}</p>
              <button
                onClick={() => {
                  setLastVisible({fecha: new Date(Date.now() - 3600 * 1000 * 12)});
                  setPagina(1);
                }}
              >
                volver al inicio
              </button>
            </div>
          )}
          {losShows != [] ? (
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
                      {formatFecha(show.fecha)} {<br></br>} {formatHora(show.fecha) + "hs."}
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
          <div className="pagination-container">
            <p>página {pagina}</p>
            <button
              onClick={() => {
                setPagina(pagina + 1);
                window.scrollTo(0, 0);
              }}
            >
              Mostrar mas shows
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shows;
