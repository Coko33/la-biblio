import "./Dashboard.css";
import { useEffect, useState } from "react";
import { getDocs, addDoc, setDoc, doc, query, where, orderBy, Timestamp } from "firebase/firestore";
import { useModal } from "./../../Hooks/useModal";
import { showsCollectionRef } from "../../firebase";
import ShowFormEdit from "./ShowFormEdit";
import { AlertEliminar } from "../Layout/AlertEliminar";
import { Alert } from "../Layout/Alert";
import { obtenerProximo } from "../../Hooks/useProximo";

export default function EditShows({ setEditandoShows }) {
  const [losShows, setLosShows] = useState([]);
  const [losShowsPasados, setLosShowsPasados] = useState([]);
  const [isOpenSingle, openSingle, closeSingle] = useModal(false);
  const [isOpenEliminar, openEliminar, closeEliminar] = useModal(false);
  const [verPasados, setVerPasados] = useState(false);
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

  async function getShows() {
    try {
        const ahora = new Date();
        const hace48hs = new Date(ahora.getTime() - 48 * 60 * 60 * 1000);

        const qUnicos = query(
          showsCollectionRef, 
          where("fechaYHora", ">", hace48hs),
          orderBy("fechaYHora", "asc")
        );

        const qDiarios = query(
          showsCollectionRef,
          where("esDiario", "==", true),
          where("fechaHasta", ">=", hace48hs),
          orderBy("fechaHasta", "asc")
        );

        const qSemanales = query(
          showsCollectionRef,
          where("esSemanal", "==", true),
          where("fechaHasta", ">=", hace48hs),
          orderBy("fechaHasta", "asc")
        );

        const [resUnicos, resDiarios, resSemanales] = await Promise.all([
          getDocs(qUnicos),
          getDocs(qDiarios),
          getDocs(qSemanales),
        ]);

        const showsData = [
          ...resUnicos.docs,
          ...resDiarios.docs,
          ...resSemanales.docs,
        ].map((d) => {
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

        const group = esDiario ? 0 : esSemanal ? 1 : 2;

        return {
          id: d.id,
          titulo: raw.titulo,
          subtitulo: raw.subtitulo,
          descripcion: raw.descripcion,
          precios: raw.precios,
          fecha: (esDiario || esSemanal)
            ? (proximo ? proximo.toLocaleDateString("es-ES", { month: "short", day: "numeric", year: "2-digit" }) : "")
            : (fechaYHora ? fechaYHora.toLocaleDateString("es-ES", { month: "short", day: "numeric", year: "2-digit" }) : ""),
          hora: (esDiario || esSemanal)
            ? (proximo ? proximo.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit", hour12: false }) : "")
            : (fechaYHora ? fechaYHora.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit", hour12: false }) : ""),
          imagenURL: raw.imagenURL,
          fechaYHora,
          fechaDesde,
          fechaHasta,
          esDiario,
          esSemanal,
          diaSemana: raw.diaSemana,
          destacado: !!raw.destacado,
          link: raw.link,
          _sortKey: sortKey,
          _group: group,
        };
      });
      showsData.sort((a, b) => {
        if (a._group !== b._group) return a._group - b._group;
        return a._nextTime - b._nextTime; 
      });
      setLosShows(showsData);
    } catch (err) {
      console.log(err.message);
    }
  }

  async function getPasados() {
    try {
        const ahora = new Date();
        const hace48hs = new Date(ahora.getTime() - 48 * 60 * 60 * 1000);

        const qUnicos = query(
          showsCollectionRef, 
          where("fechaYHora", "<=", hace48hs),
          orderBy("fechaYHora", "desc")
        );

        const qDiarios = query(
          showsCollectionRef,
          where("esDiario", "==", true),
          where("fechaHasta", "<=", hace48hs),
          orderBy("fechaHasta", "desc")
        );

        const qSemanales = query(
          showsCollectionRef,
          where("esSemanal", "==", true),
          where("fechaHasta", "<=", hace48hs),
          orderBy("fechaHasta", "desc")
        );

        const [resUnicos, resDiarios, resSemanales] = await Promise.all([
          getDocs(qUnicos),
          getDocs(qDiarios),
          getDocs(qSemanales),
        ]);

        const showsData = [
          ...resUnicos.docs,
          ...resDiarios.docs,
          ...resSemanales.docs,
        ].map((d) => {
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

        const group = esDiario ? 0 : esSemanal ? 1 : 2;

        return {
          id: d.id,
          titulo: raw.titulo,
          subtitulo: raw.subtitulo,
          descripcion: raw.descripcion,
          precios: raw.precios,
          fecha: (esDiario || esSemanal)
            ? (proximo ? proximo.toLocaleDateString("es-ES", { month: "short", day: "numeric", year: "2-digit" }) : "")
            : (fechaYHora ? fechaYHora.toLocaleDateString("es-ES", { month: "short", day: "numeric", year: "2-digit" }) : ""),
          hora: (esDiario || esSemanal)
            ? (proximo ? proximo.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit", hour12: false }) : "")
            : (fechaYHora ? fechaYHora.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit", hour12: false }) : ""),
          imagenURL: raw.imagenURL,
          fechaYHora,
          fechaDesde,
          fechaHasta,
          esDiario,
          esSemanal,
          diaSemana: raw.diaSemana,
          destacado: !!raw.destacado,
          link: raw.link,
          _sortKey: sortKey,
          _group: group,
        };
      });
      showsData.sort((a, b) => {
        if (a._group !== b._group) return a._group - b._group;
        return b._sortKey - a._sortKey; 
      });
      setLosShowsPasados(showsData);
    } catch (err) {
      console.log(err.message);
    }
  }

  function mostrarPasados() {
    getPasados();
    setVerPasados(v => !v);
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
    addDoc(showsCollectionRef, {
      titulo: show.titulo + " (copia)",
      subtitulo: show.subtitulo || null,
      descripcion: show.descripcion,
      /* fechaYHora: (!show.esDiario && !show.esSemanal) ? new Date(show.fechaYHora * 1000) : null,
      fechaDesde: show.fechaDesde ? show.fechaDesde.seconds : null,
      fechaHasta: show.fechaHasta ? show.fechaHasta.seconds : null, */
      fechaYHora: (!show.esDiario && !show.esSemanal) ? (show.fechaYHora ? Timestamp.fromDate(show.fechaYHora) : null) : null,
      fechaDesde: show.fechaDesde ? Timestamp.fromDate(show.fechaDesde) : null,
      fechaHasta: show.fechaHasta ? Timestamp.fromDate(show.fechaHasta) : null,
      imagenURL: show.imagenURL,
      precios: show.precios,
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
    setDoc(doc(showsCollectionRef, show.id), {
      titulo: show.titulo,
      subtitulo: show.subtitulo || null,
      descripcion: show.descripcion,
      /* fechaYHora: !show.esSemanal && !show.esDiario ? new Date(show.fechaYHora * 1000) : null, 
      fechaDesde: show.fechaDesde ? new Date(show.fechaDesde.seconds * 1000) : null,
      fechaHasta: show.fechaHasta ? new Date(show.fechaHasta.seconds * 1000) : null, */
      fechaYHora: (!show.esSemanal && !show.esDiario) ? (show.fechaYHora ? Timestamp.fromDate(show.fechaYHora) : null) : null,
      fechaDesde: show.fechaDesde ? Timestamp.fromDate(show.fechaDesde) : null,
      fechaHasta: show.fechaHasta ? Timestamp.fromDate(show.fechaHasta) : null,
      imagenURL: show.imagenURL,
      precios: show.precios,
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

        <button
          className="formShow-button "
          onClick={() => mostrarPasados()}
        >
          {!verPasados ? "Ver pasados" : "Ocultar pasados"}
        </button>
        {verPasados && <div className="containter-tablaEditar">
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
              {losShowsPasados ? (
                losShowsPasados.map((show, i) => (
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
        </div>}
      </div>
    </div>
  );
}
