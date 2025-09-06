import "./Dashboard.css";
import { useEffect, useState } from "react";
import { getDocs, addDoc, setDoc, doc } from "firebase/firestore";
import { useModal } from "./../../Hooks/useModal";
import { showsCollectionRef } from "../../firebase";
import ShowFormEdit from "./ShowFormEdit";
import { AlertEliminar } from "../Layout/AlertEliminar";
import { Alert } from "../Layout/Alert";
import { obtenerProximo } from "../../Hooks/useProximo";

export default function EditShows({ setEditandoShows }) {
  const [losShows, setLosShows] = useState([]);
  const [isOpenSingle, openSingle, closeSingle] = useModal(false);
  const [isOpenEliminar, openEliminar, closeEliminar] = useModal(false);
  const [elId, setElId] = useState(null);
  const [elTitulo, setElTitulo] = useState("");

  const [error, setError] = useState(null);
  const resetError = () => setError(null);
  const [ok, setOk] = useState(null);
  const resetOk = () => setOk(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getShows(); 
      } catch (error) {
        console.error("Error al obtener los programas:", error);
      }
    };
    fetchData();
  }, []);

  // Convierte Firestore Timestamp | Date | number(ms|s) | null -> Date | null
  function toDate(x) {
    if (!x) return null;
    if (x instanceof Date) return x;
    if (typeof x === "object" && typeof x.seconds === "number") {
      return new Date(x.seconds * 1000);
    }
    if (typeof x === "number") {
      // si parece ser "segundos", lo paso a ms
      return new Date(x < 1e12 ? x * 1000 : x);
    }
    return null;
  }

  /* function getFecha(showData) {
    if (showData.esDiario || showData.esSemanal) {
      return obtenerProximo(showData.fechaDesde, showData.esDiario, showData.esSemanal).toLocaleDateString("es-ES", {
        month: "short",
        day: "numeric",
      })
    } else {
      return new Date(showData.fechaYHora.seconds * 1000).toLocaleDateString("es-ES", {
        month: "short",
        day: "numeric",
      })
    }
  }

  function getHora(showData) {
    if(showData.esDiario || showData.esSemanal) {
      return obtenerProximo(showData.fechaDesde, showData.esDiario, showData.esSemanal).toLocaleTimeString()
      .slice(0, -3)
    } else {
      return new Date(showData.fechaYHora.seconds * 1000)
      .toLocaleTimeString()
      .slice(0, -3)
    }
  } */

  function getFecha(showData) {
    if (showData.esDiario || showData.esSemanal) {
      const base = toDate(showData.fechaDesde);
      const prox = base ? obtenerProximo(base, showData.esDiario, showData.esSemanal) : null;
      return prox ? prox.toLocaleDateString("es-ES", { month: "short", day: "numeric" }) : "";
    } else {
      const fh = toDate(showData.fechaYHora);
      return fh ? fh.toLocaleDateString("es-ES", { month: "short", day: "numeric" }) : "";
    }
  }

  function getHora(showData) {
    if (showData.esDiario || showData.esSemanal) {
      const base = toDate(showData.fechaDesde);
      const prox = base ? obtenerProximo(base, showData.esDiario, showData.esSemanal) : null;
      return prox ? prox.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit", hour12: false }) : "";
    } else {
      const fh = toDate(showData.fechaYHora);
      return fh ? fh.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit", hour12: false }) : "";
    }
  }
  
  /* async function getShows() {
    try {
      const res = await getDocs(showsCollectionRef);
      const showsData = res.docs.map((show) => ({
        id: show.id,
        titulo: show.data().titulo,
        subtitulo: show.data().subtitulo,
        descripcion: show.data().descripcion,
        fecha: show.data().fechaYHora ? getFecha(show.data()) : null,
        hora: show.data().fechaYHora ? getHora(show.data()) : null,
        imagenURL: show.data().imagenURL,
        fechaYHora: show.data().fechaYHora ? show.data().fechaYHora.seconds : obtenerProximo(show.data().fechaDesde, show.data().esDiario, show.data().esSemanal),
        precios: show.data().precios,
        fechaDesde: show.data().fechaDesde,
        fechaHasta: show.data().fechaHasta,
        esDiario: show.data().esDiario,
        esSemanal: show.data().esSemanal,
        diaSemana: show.data().diaSemana,
        destacado: show.data().destacado,
        link: show.data().link
      }));
      console.log(showsData);
      //showsData.forEach((show) => console.log(show.titulo + ": " + (new Date(show.fechaYHora) || null)));
      setLosShows(showsData.sort((a, b) => b.fechaYHora - a.fechaYHora));
    } catch (err) {
      console.log(err.message);
    }
  } */

  async function getShows() {
    try {
      const res = await getDocs(showsCollectionRef);
      const showsData = res.docs.map((d) => {
      const raw = d.data();
      const esDiario = !!raw.esDiario;
      const esSemanal = !!raw.esSemanal;

      const fechaDesde = toDate(raw.fechaDesde);
      const fechaHasta = toDate(raw.fechaHasta);
      const fechaYHora = toDate(raw.fechaYHora);

      const proximo = (esDiario || esSemanal) && fechaDesde
        ? obtenerProximo(fechaDesde, esDiario, esSemanal)
        : null;

      const sortKey = (esDiario || esSemanal)
        ? (proximo ? proximo.getTime() : 0)
        : (fechaYHora ? fechaYHora.getTime() : 0);

      return {
        id: d.id,
        titulo: raw.titulo,
        subtitulo: raw.subtitulo,
        descripcion: raw.descripcion,
        fecha: (esDiario || esSemanal)
          ? (proximo ? proximo.toLocaleDateString("es-ES", { month: "short", day: "numeric" }) : "")
          : (fechaYHora ? fechaYHora.toLocaleDateString("es-ES", { month: "short", day: "numeric" }) : ""),
        hora: (esDiario || esSemanal)
          ? (proximo ? proximo.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit", hour12: false }) : "")
          : (fechaYHora ? fechaYHora.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit", hour12: false }) : ""),
        imagenURL: raw.imagenURL,
        // guardá también las Date originales para reusar en duplicar/destacar
        fechaYHora,
        fechaDesde,
        fechaHasta,
        esDiario,
        esSemanal,
        diaSemana: raw.diaSemana,
        destacado: !!raw.destacado,
        link: raw.link,
        _sortKey: sortKey,
      };
    });
    setLosShows(showsData.sort((a, b) => b._sortKey - a._sortKey));
    } catch (err) {
      console.log(err.message);
    }
  }

  function editarUnShow(id) {
    openSingle();
    setElId(id);
    window.scrollTo(0, 0);
  }

  function eliminarUnShow(id, titulo) {
    openEliminar();
    setElId(id);
    setElTitulo(titulo);
  }

  function duplicarUnShow(show) {
    console.log(show)
    addDoc(showsCollectionRef, {
      titulo: show.titulo + " (copia)",
      subtitulo: show.subtitulo || null,
      descripcion: show.descripcion,
      fechaYHora: (!show.esDiario && !show.esSemanal) ? new Date(show.fechaYHora * 1000) : null,
      imagenURL: show.imagenURL,
      precios: show.precios,
      fechaDesde: show.fechaDesde ? show.fechaDesde.seconds : null,
      fechaHasta: show.fechaHasta ? show.fechaHasta.seconds : null,
      esDiario: show.esDiario || null,
      esSemanal: show.esSemanal || null,
      diaSemana: show.diaSemana || null,
      destacado: false,
      link: show.link || null
    })
      .then((res) => {
        getShows();
        setOk(`Se duplicó el show \n"${show.titulo}"`);
        setTimeout(() => {
          resetOk();
        }, 2000);
      })
      .catch((err) => {
        setError(err.message);
      });
  }
  function destacarUnShow(show) {
    console.log(show.fechaHasta)
    setDoc(doc(showsCollectionRef, show.id), {
      titulo: show.titulo,
      subtitulo: show.subtitulo || null,
      descripcion: show.descripcion,
      fechaYHora: !show.esSemanal && !show.esDiario ? new Date(show.fechaYHora * 1000) : null, //(esDiario || esSemanal) ? null : fechaYHora
      imagenURL: show.imagenURL,
      precios: show.precios,
      fechaDesde: show.fechaDesde ? new Date(show.fechaDesde.seconds * 1000) : null,
      fechaHasta: show.fechaHasta ? new Date(show.fechaHasta.seconds * 1000) : null,
      esDiario: show.esDiario || null,
      esSemanal: show.esSemanal || null,
      diaSemana: show.diaSemana || null,
      destacado: !show.destacado,
      link: show.link || null
    })
      .then((res) => {
        console.log(res);
        setOk( !show.destacado ? `"${show.titulo}" ahora aparece en marquesina` : `"${show.titulo}" se quitó de la marquesina`);
        getShows();
        setTimeout(() => {
          resetOk();
        }, 2000);
      })
      .catch((err) => {
        setError(err.message);
      });
  }

  

  return (
    <div>
      {ok && <Alert message={ok} resetError={resetOk} />}
      {isOpenEliminar && (
        <AlertEliminar
          elId={elId}
          elTitulo={elTitulo}
          closeEliminar={closeEliminar}
          getShows={getShows}
          setOk={setOk}
        ></AlertEliminar>
      )}
      {isOpenSingle && (
        <ShowFormEdit
          elId={elId}
          closeSingle={closeSingle}
          getShows={getShows}
        ></ShowFormEdit>
      )}
      <div className="formShow-container">
        <h2 className="dwHTML-titulo">Editar Shows</h2>
        <button
          className="formShow-button"
          onClick={() => setEditandoShows(false)}
        >
          Cerrar
        </button>
        <div className="containter-tablaEditar">
          <table className="dwHTMLtable">
            <thead className="tablaHead">
              <tr>
                <th>Fecha</th>
                <th>Título</th>
                <th></th>
                <th>Acciones</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {losShows ? (
                losShows.map((show, i) => (
                  <tr className="dwHTMLrow-show" key={i}>
                    <td className="dwHTMLcell-showFecha">
                    {(!show.esSemanal && !show.esDiario) ? show.fecha : show.esDiario ? "de Lunes a Viernes" : show.esSemanal ? `todos los ${show.diaSemana}` : ''}&nbsp; &nbsp; &nbsp; &nbsp;
                    </td>
                    <td className="dwHTMLcell-showTitulo">
                      {show.titulo}&nbsp; &nbsp; &nbsp; &nbsp;
                    </td>
                    <td>
                      &nbsp;&nbsp;
                      <button onClick={() => editarUnShow(show.id)}>
                        editar
                      </button>
                    </td>
                    <td>
                      &nbsp;&nbsp;
                      <button
                        onClick={() => eliminarUnShow(show.id, show.titulo)}
                      >
                        borrar
                      </button>
                    </td>
                    <td>
                      &nbsp;&nbsp;
                      <button onClick={() => duplicarUnShow(show)}>
                        duplicar
                      </button>
                    </td>
                    <td>
                      &nbsp;&nbsp;
                      <button className={show.destacado && 'botonDestacado'} onClick={() => destacarUnShow(show)}>
                        {show.destacado ? "en marquesina" : "destacar"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <h3>Sin Shows</h3>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
