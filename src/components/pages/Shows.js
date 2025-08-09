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
  getDoc,
  and
} from "firebase/firestore";
import "./Shows.css";
import Show from "./Show";
import Spinner from "../Spinner/Spinner";
import { obtenerProximo } from "../../Hooks/useProximo";
import { MostrarFechas } from "./../../Hooks/MostrarFecha";
import Marquesina from "./Marquesina";

const Shows = () => {
  const [losShows, setLosShows] = useState([]);
  const [isOpenSingle, openSingle, closeSingle] = useModal(false);
  const [elId, setElId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState();
  const showsPorPagina = 9;
  const fechaAhora = new Date(Date.now())
  const fechaAhora_menos12 = new Date(Date.now() - 1000 * 3600 * 12)
  const [firstVisible, setFirstVisible] = useState(fechaAhora_menos12);
  const [tiempoDelPrimero, setTiempoDelPrimero] = useState()
  const [lastVisible, setLastVisible] = useState(null);
  const [tiempoDelUltimo, setTiempoDelUltimo] = useState(null);
  const [todos, setTodos] = useState([]); 
  const [noHayMas, setNoHayMas] = useState(false)
  
  function openUnShow(id) {
    setElId(id);
    openSingle();
    window.scrollTo(0, 0);
  }

  async function contarPaginas() {
    const q = query(
      showsCollectionRef,
      where("fechaYHora", ">=", fechaAhora_menos12),
      where("esSemanal", "==", false || "esDiario", "==", false),
    );
    const snapshot = await getCountFromServer(q);
    setTotalPaginas(Math.ceil(snapshot.data().count / showsPorPagina));
  }

  function proximaPagina() {
    setPagina(pagina + 1);
  }

  useEffect(() => {
    getShows();
  }, [pagina]);

  useEffect(() => {
    lastVisible ? setNoHayMas(false) : setNoHayMas(true)
    lastVisible && getPeriodicos();
  }, [losShows]);
 
  useEffect(() => {
    contarPaginas();
  }, [totalPaginas]);

  //useEffect(()=>{setNoHayMas(tiempoDelPrimero === tiempoDelUltimo)},[isLoading])

  async function getShows() {
    //MostrarFechas(tiempoDelPrimero, tiempoDelUltimo, pagina)
  try {
    setIsLoading(true);
    let q;
    if (pagina === 1) {
      q = query(
        showsCollectionRef,
        where("fechaYHora", ">", fechaAhora_menos12),
        orderBy("fechaYHora"),
        limit(showsPorPagina)
      );
    } else {
      q = query(
        showsCollectionRef,
        where("fechaYHora", ">", new Date(tiempoDelUltimo * 1000)),//lastVisible.fechaYHora),
        orderBy("fechaYHora"),
        startAfter(lastVisible),
        limit(showsPorPagina)
      );
    }
    const documentSnapshots = await getDocs(q);
    const showsData = documentSnapshots.docs.map((show) => ({
      id: show.id,
      titulo: show.data().titulo,
      subtitulo: show.data().subtitulo,
      descripcion: show.data().descripcion,
      precios: show.data().precios,
      fecha: new Date(show.data().fechaYHora.seconds * 1000).toLocaleDateString(
        "es-ES",
        {
          weekday: "long",
          month: "long",
          day: "numeric",
        }
      ),
      hora: new Date(show.data().fechaYHora.seconds * 1000)
        .toLocaleTimeString()
        .slice(0, -3),
      imagenURL: show.data().imagenURL,
      fechaYHora: new Date(show.data().fechaYHora.seconds * 1000), 
      link: show.data().link,
    }));
    setLosShows(showsData);
    setIsLoading(false);
    documentSnapshots && setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
    setTiempoDelUltimo(documentSnapshots && documentSnapshots.docs[documentSnapshots.docs.length - 1].data().fechaYHora.seconds);
    setearPrimero(documentSnapshots && documentSnapshots.docs[0].data().fechaYHora.seconds);
  } catch (err) {
    console.log(err)
  } finally {
    return
  }
  }
  
  async function getPeriodicos() {
    try {
    const querySemanalesFechaHasta = await getDocs(
      query(
        showsCollectionRef,
        where("fechaHasta", ">=", fechaAhora_menos12),
        where("esSemanal", "==", true),
      )
    );
    const querySemanalesFechaDesde = await getDocs(
      query(
        showsCollectionRef,
        where("fechaDesde", "<=", fechaAhora_menos12),
        where("esSemanal", "==", true),
      )
    );
    /* const periodicosSemanalesFechaHasta = querySemanalesFechaHasta.docs.map(doc => doc.data());
    const periodicosSemanalesFechaDesde = querySemanalesFechaDesde.docs.map(doc => doc.data()); */

    const periodicosSemanalesFechaHasta = querySemanalesFechaHasta.docs.map(doc => ({
      id: doc.id, 
      ...doc.data()
    }));
    const periodicosSemanalesFechaDesde = querySemanalesFechaDesde.docs.map(doc => ({
      id: doc.id, 
      ...doc.data()
    }));
    
    const periodicosSemanales = periodicosSemanalesFechaHasta.filter(periodicoFechaHasta => {
      return periodicosSemanalesFechaDesde.some(periodicoFechaDesde => periodicoFechaDesde.id === periodicoFechaHasta.id);
    });

    const queryDiariosFechaHasta = await getDocs(
      query(
        showsCollectionRef,
        where("fechaHasta", ">=", fechaAhora_menos12),
        where("esDiario", "==", true),
      )
    );
    const queryDiariosFechaDesde = await getDocs(
      query(
        showsCollectionRef,
        where("fechaDesde", "<=", fechaAhora_menos12),
        where("esDiario", "==", true),
      )
    );
    /* const periodicosDiariosFechaHasta = queryDiariosFechaHasta.docs.map(doc => doc.data());
    const periodicosDiariosFechaDesde = queryDiariosFechaDesde.docs.map(doc => doc.data()); */

    const periodicosDiariosFechaHasta = queryDiariosFechaHasta.docs.map(doc => ({
      id: doc.id, 
      ...doc.data()
    }));
    const periodicosDiariosFechaDesde = queryDiariosFechaDesde.docs.map(doc => ({
      id: doc.id, 
      ...doc.data()
    }));
    
    const periodicosDiarios = periodicosDiariosFechaHasta.filter(periodicoFechaHasta => {
      return periodicosDiariosFechaDesde.some(periodicoFechaDesde => periodicoFechaDesde.id === periodicoFechaHasta.id);
    }); 

    //const [querySnapshot1, querySnapshot2] = await Promise.all([getDocs(q1), getDocs(q2)]);
    const documentSnapshots = [...periodicosSemanales, ...periodicosDiarios];
    /* const periodicosData = documentSnapshots.map((show) => ({
      id: show.id,
      titulo: show.data().titulo,
      subtitulo: show.data().subtitulo,
      descripcion: show.data().descripcion,
      fechaYHora: obtenerProximo(show.data().fechaDesde, show.data().esDiario, show.data().esSemanal),
      fecha: obtenerProximo(show.data().fechaDesde, show.data().esDiario, show.data().esSemanal).toLocaleDateString(
        "es-ES",
        {
          weekday: "long",
          month: "long",
          day: "numeric",
        }
      ),
      hora: obtenerProximo(show.data().fechaDesde, show.data().esDiario, show.data().esSemanal).toLocaleTimeString()
      .slice(0, -3),
      fechaDesde: show.data().fechaDesde,
      fechaHasta: show.data().fechaHasta,
      esDiario: show.data().esDiario,
      esSemanal: show.data().esSemanal,
      diaSemana: show.data().diaSemana,
      imagenURL: show.data().imagenURL,
    }));  */
    const periodicosData = documentSnapshots.map((show) => ({
      id: show.id,
      titulo: show.titulo,
      subtitulo: show.subtitulo,
      descripcion: show.descripcion,
      fechaYHora: obtenerProximo(show.fechaDesde, show.esDiario, show.esSemanal),
      fecha: obtenerProximo(show.fechaDesde, show.esDiario, show.esSemanal).toLocaleDateString(
        "es-ES",
        {
          weekday: "long",
          month: "long",
          day: "numeric",
        }
      ),
      //hora: new Date(show.data().fechaYHora.seconds * 1000).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit", hour12: false }),
      hora: obtenerProximo(show.fechaDesde, show.esDiario, show.esSemanal).toLocaleTimeString()
      .slice(0, -3),
      fechaDesde: show.fechaDesde,
      fechaHasta: show.fechaHasta,
      esDiario: show.esDiario,
      esSemanal: show.esSemanal,
      diaSemana: show.diaSemana,
      imagenURL: show.imagenURL,
      precios: show.precios,
      link: show.link
    })); 
    const losPeriodicos = periodicosData.filter((periodico) => {
      if (periodico.esDiario) {
        return true
      } else if(periodico.esSemanal) {
        return (periodico.fechaYHora.getTime() / 1000 >= tiempoDelPrimero / 1000)
      } else {
        return (periodico.fechaYHora.getTime() / 1000 >= tiempoDelPrimero / 1000 && periodico.fechaYHora.getTime() / 1000 <= tiempoDelUltimo)
      }
    });  
    const losTodos = [...losShows, ...losPeriodicos];
    console.log(losTodos)
    setTodos(losTodos.sort((a, b) => a.fechaYHora - b.fechaYHora));
    } catch (err) {
      console.log(err)
    } finally {
      return
    } 
  }

  function setearPrimero(fechaPrimerDoc) {
    //console.log(new Date(fechaPrimerDoc * 1000))
    setTiempoDelPrimero(fechaPrimerDoc)
  }

  function setearLast(ultimoShow) {
    var date = new Date(ultimoShow.fechaYHora);
    var milliseconds = date.getTime();
    var seconds = milliseconds / 1000;
    setLastVisible(ultimoShow);
    setTiempoDelUltimo(seconds)
  }

  //todos && console.log(todos[0].fechaYHora >= new Date(tiempoDelPrimero) && todos[0].fechaYHora <= new Date(tiempoDelUltimo * 1000))

  return (
    <div>
      {isLoading && <Spinner></Spinner>}
      {!isLoading && <Marquesina></Marquesina>}
      {isOpenSingle && <Show closeSingle={closeSingle} elId={elId}></Show>}
      {!isOpenSingle && (
        <>
          {pagina > 1 && (
            <div className="pagination-container">
              {!noHayMas && (<p>página {pagina}</p>)}
              <button
                onClick={() => {
                  setLastVisible(null); //{fechaYHora: fechaAhora_menos12}
                  setPagina(1);
                }}
              >
                volver al inicio
              </button>
            </div>
          )}
        
        <div className="shows-container">
          {todos.length > 0 && !noHayMas ? (
            todos.map((show, i) => (
              <div className="show-container" key={i}>
                <div className="show-img__container">
                  <img
                    className="show-img"
                    alt="imagen show"
                    src={show.imagenURL}
                  ></img>
                </div>
                <div className="show-dataContainer">
                  <div className="show-descripcionContainer">
                    <h2 className="show-titulo">{show.titulo}</h2>
                    <h3 className="show-subtitulo">{show.subtitulo}</h3>
                    <div
                      className="descripcion-container line-clamp"
                      dangerouslySetInnerHTML={{ __html: show.descripcion }}
                    ></div>
                    <div
                      className="descripcion-container line-clamp"
                      dangerouslySetInnerHTML={{ __html: show.precios }}
                    ></div>
                    
                  </div>
                  <div className="fecha-container">
                    <div className="iconoYFecha-container">
                      <div className="fecha-iconoSchedule">
                        <i className="material-icons">schedule</i>
                      </div>
                      <p className="fecha-texto">
                        {show.esDiario ? "de Lunes a Viernes" : null}
                        {show.esSemanal ? `todos los ${show.diaSemana}` : null}
                        {!show.esDiario & !show.esSemanal ? show.fecha.replace(/^\w/, (c) => c.toUpperCase()) : null} {<br></br>} {show.hora + "hs."}
                      </p>
                    </div>
                    <div className="fechaBoton-container">
                      {/* <button
                        onClick={() => openUnShow(show.id)}
                        className="fecha-button"
                      >
                        + Información
                      </button> */}
                      <a 
                        target="_blank"
                        rel="noopener noreferrer" 
                        href={show.link || `https://wa.me/541565159514/?text=${encodeURIComponent(`Hola, Edith. Me gustaría reservar una mesa para el show "${show.titulo}"`)}`}>
                        <button className="comprar-button">Comprar</button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            !isLoading && <h3 className="shows-noHayMas">No hay mas shows</h3>
          )}
        </div>
          {!noHayMas && (
          <div className="pagination-container">
            <p>página {pagina}</p>
            <button
              onClick={() => {
                proximaPagina();
                window.scrollTo(0, 0);
              }}
            >
              Mostrar mas shows
            </button>
          </div>)}
      </>)}
    </div>
  );


  /* 
  useEffect(() => {
    getShows();
  }, [pagina]);

  useEffect(() => {
    contarPaginas();
  }, [totalPaginas]);

  useEffect(()=>{
    if(lastVisible != null) {
        getPeriodicos()
    }
  },[])

  if(firstVisible != null && lastVisible != null) {

    const periodicosData = await getPeriodicos();
      const nuevosPeriodicosData = periodicosData.filter((periodico) => {
        return (periodico.fecha >= firstVisible.fechaYHora && periodico.fecha <= lastVisible.fechaYHora);
      });
      setLosShows([...losShows, ...nuevosPeriodicosData].sort((a, b) => a.fecha - b.fecha));
}
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

  async function getShows() {
    setIsLoading(true);
    const q = query(
      showsCollectionRef,
      where("fechaYHora", ">=", new Date(Date.now() - 3600 * 1000 * 12)),
      orderBy("fechaYHora"),
      startAfter(lastVisible),
      limit(showsPorPagina)
    );
    const documentSnapshots = await getDocs(q);
    const showsData = documentSnapshots.docs.map((show) => ({
      id: show.id,
      titulo: show.data().titulo,
      subtitulo: show.data().subtitulo,
      descripcion: show.data().descripcion,
      fecha: new Date(show.data().fechaYHora.seconds * 1000).toLocaleDateString(
        "es-ES",
        {
          weekday: "long",
          month: "long",
          day: "numeric",
        }
      ),
      hora: new Date(show.data().fechaYHora.seconds * 1000)
        .toLocaleTimeString()
        .slice(0, -3),
      imagenURL: show.data().imagenURL,
      fechaYHora: show.data().fechaYHora.seconds,
    }));
    setLosShows(showsData);
    setIsLoading(false);
    setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
    setFirstVisible(documentSnapshots.docs[0])
  }

  
 */
};

export default Shows;