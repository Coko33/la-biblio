import { getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { cartaCollectionRef } from "../../firebase";
import "./Carta.css";

export default function Carta() {
  const [laCarta, setLaCarta] = useState([]);

  useEffect(() => {
    getItems();
  }, []);

  function ordenarPorPrecio(cartaData) {
    console.log(cartaData);
  }

  function getItems() {
    getDocs(cartaCollectionRef)
      .then((res) => {
        const cartaData = res.docs.map((item) => ({
          id: item.id,
          titulo: item.data().titulo,
          descripcion: item.data().descripcion,
          imagenURL: item.data().imagenURL,
          precio: item.data().precio,
        }));
        const cartaOrdenada = ordenarPorPrecio(cartaData);
        console.log(cartaOrdenada);
        setLaCarta(cartaOrdenada);
      })
      .catch((err) => console.log(err.message));
  }

  function openUnShow(id) {
    console.log(id);
    /* setElId(id);
    openSingle(); */
  }

  const separador =
    " ...........................................................";

  return (
    <>
      <div className="carta-salados-container">
        <div className="carta-separadorHorizontal"></div>
        <h2 className="carta-salados-titulo">Salados</h2>
        <table className="carta-salados-tabla">
          <tbody>
            {laCarta ? (
              laCarta.map((item, i) => (
                <tr key={i}>
                  <td className="carta-itemNombre">
                    {item.titulo + separador}
                  </td>
                  <td className="carta-itemPrecio">${item.precio}</td>
                </tr>
              ))
            ) : (
              <h3>Sin Shows</h3>
            )}
          </tbody>
        </table>
      </div>
      <div className="laCarta-container">
        {laCarta ? (
          laCarta.map((item, i) => (
            <div className="show-container" key={i}>
              <img
                className="show-img"
                alt="imagen show"
                src={item.imagenURL}
              ></img>
              <h2 className="show-titulo">{item.titulo}</h2>
              <h3 className="show-subtitulo">{item.subtitulo}</h3>
              <div
                className="descripcion-container"
                dangerouslySetInnerHTML={{ __html: item.descripcion }}
              ></div>
              <div className="fecha-container">
                <div className="fecha-iconoSchedule">
                  <i className="material-icons">schedule</i>
                </div>
                <p className="fecha-texto">{item.fechaYHora}</p>
                <button
                  onClick={() => openUnShow(item.id)}
                  className="fecha-button"
                >
                  Información
                </button>
              </div>
            </div>
          ))
        ) : (
          <h3>Sin Shows</h3>
        )}
      </div>
    </>
  );
}
