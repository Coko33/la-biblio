import { FormControlUnstyledContext } from "@mui/base";
import { getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { cartaCollectionRef } from "../../firebase";
import "./Carta.css";

export default function Carta() {
  const [laCarta, setLaCarta] = useState([]);
  const [salados, setSalados] = useState([]);
  const [dulces, setDulces] = useState([]);
  const [entradas, setEntradas] = useState([]);
  const [principales, setPrincipales] = useState([]);
  const [vinosTintos, setVinosTintos] = useState([]);
  const [vinosBlancos, setVinosBlancos] = useState([]);
  const [champagnes, setChampagnes] = useState([]);
  const [cafeteria, setCafeteria] = useState([]);
  const [bebidas, setBebidas] = useState([]);
  const [cervezas, setCervezas] = useState([]);
  const [tragos, setTragos] = useState([]);

  useEffect(() => {
    obtenerCarta();
    /*     return obtenerCarta(); */
  }, []);

  async function obtenerCarta() {
    try {
      const cartaData = await getDocs(cartaCollectionRef);
      const p = new Promise((resolve, reject) => {
        const cartaItems = cartaData.docs.map((item) => ({
          id: item.id,
          titulo: item.data().titulo,
          descripcion: item.data().descripcion,
          imagenURL: item.data().imagenURL,
          precio: item.data().precio,
          categoria: item.data().categoria || null,
        }));
        setLaCarta(cartaItems.sort((a, b) => a.precio - b.precio));
        resolve(cartaItems);
      });
      p.then((res) => {
        let sala = [];
        let dulc = [];
        let entr = [];
        let prin = [];
        let vnTn = [];
        let vnBl = [];
        let cham = [];
        let cafe = [];
        let bebi = [];
        let cerv = [];
        let trag = [];
        res.forEach((item) => {
          item.categoria === "Salados" && sala.push(item);
          item.categoria === "Dulces" && dulc.push(item);
          item.categoria === "Entradas" && entr.push(item);
          item.categoria === "Princiales" && prin.push(item);
          item.categoria === "Vinos tintos" && vnTn.push(item);
          item.categoria === "Vinos blancos" && vnBl.push(item);
          item.categoria === "Champagnes" && cham.push(item);
          item.categoria === "Cafeteria" && cafe.push(item);
          item.categoria === "Bebidas" && bebi.push(item);
          item.categoria === "Cervezas" && cerv.push(item);
          item.categoria === "Tragos" && trag.push(item);
        });
        setSalados(sala);
        setDulces(dulc);
        setEntradas(entr);
        setPrincipales(prin);
        setVinosTintos(vnTn);
        setVinosBlancos(vnBl);
        setChampagnes(cham);
        setCafeteria(cafe);
        setBebidas(bebi);
        setCervezas(cerv);
        setTragos(trag);
      });
    } catch (err) {
      console.log(err);
    }
  }

  const separador =
    " ......................................................................................................................................................";

  return (
    <div>
      {salados.length !== 0 && (
        <div className="carta-categoria-container">
          <div className="carta-separadorHorizontal"></div>
          <h2 className="carta-categoria-titulo">Salados</h2>
          <table className="carta-categoria-tabla">
            <tbody>
              {salados ? (
                salados.map((item, i) => (
                  <tr key={i}>
                    <td className="carta-itemNombre">
                      {item.titulo + separador}
                    </td>
                    <td className="carta-itemPrecio">${item.precio}</td>
                  </tr>
                ))
              ) : (
                <div></div>
              )}
            </tbody>
          </table>
        </div>
      )}
      {dulces.length !== 0 && (
        <div className="carta-categoria-container">
          <div className="carta-separadorHorizontal"></div>
          <h2 className="carta-categoria-titulo">Dulces</h2>
          <table className="carta-categoria-tabla">
            <tbody>
              {dulces ? (
                dulces.map((item, i) => (
                  <tr key={i}>
                    <td className="carta-itemNombre">
                      {item.titulo + separador}
                    </td>
                    <td className="carta-itemPrecio">${item.precio}</td>
                  </tr>
                ))
              ) : (
                <div></div>
              )}
            </tbody>
          </table>
        </div>
      )}
      {entradas.length !== 0 && (
        <div className="carta-categoria-container">
          <div className="carta-separadorHorizontal"></div>
          <h2 className="carta-categoria-titulo">Entradas</h2>
          <table className="carta-categoria-tabla">
            <tbody>
              {entradas ? (
                entradas.map((item, i) => (
                  <tr key={i}>
                    <td className="carta-itemNombre">
                      {item.titulo + separador}
                    </td>
                    <td className="carta-itemPrecio">${item.precio}</td>
                  </tr>
                ))
              ) : (
                <div></div>
              )}
            </tbody>
          </table>
        </div>
      )}
      {principales.length !== 0 && (
        <div className="carta-categoria-container">
          <div className="carta-separadorHorizontal"></div>
          <h2 className="carta-categoria-titulo">Principales</h2>
          <table className="carta-categoria-tabla">
            <tbody>
              {principales ? (
                principales.map((item, i) => (
                  <tr key={i}>
                    <td className="carta-itemNombre">
                      {item.titulo + separador}
                    </td>
                    <td className="carta-itemPrecio">${item.precio}</td>
                  </tr>
                ))
              ) : (
                <div></div>
              )}
            </tbody>
          </table>
        </div>
      )}
      {vinosTintos.length !== 0 && (
        <div className="carta-categoria-container">
          <div className="carta-separadorHorizontal"></div>
          <h2 className="carta-categoria-titulo">Vinos Tintos</h2>
          <table className="carta-categoria-tabla">
            <tbody>
              {vinosTintos ? (
                vinosTintos.map((item, i) => (
                  <tr key={i}>
                    <td className="carta-itemNombre">
                      {item.titulo + separador}
                    </td>
                    <td className="carta-itemPrecio">${item.precio}</td>
                  </tr>
                ))
              ) : (
                <div></div>
              )}
            </tbody>
          </table>
        </div>
      )}
      {vinosBlancos.length !== 0 && (
        <div className="carta-categoria-container">
          <div className="carta-separadorHorizontal"></div>
          <h2 className="carta-categoria-titulo">Vinos Blancos</h2>
          <table className="carta-categoria-tabla">
            <tbody>
              {vinosBlancos ? (
                vinosBlancos.map((item, i) => (
                  <tr key={i}>
                    <td className="carta-itemNombre">
                      {item.titulo + separador}
                    </td>
                    <td className="carta-itemPrecio">${item.precio}</td>
                  </tr>
                ))
              ) : (
                <div></div>
              )}
            </tbody>
          </table>
        </div>
      )}
      {champagnes.length !== 0 && (
        <div className="carta-categoria-container">
          <div className="carta-separadorHorizontal"></div>
          <h2 className="carta-categoria-titulo">Espumantes</h2>
          <table className="carta-categoria-tabla">
            <tbody>
              {champagnes ? (
                champagnes.map((item, i) => (
                  <tr key={i}>
                    <td className="carta-itemNombre">
                      {item.titulo + separador}
                    </td>
                    <td className="carta-itemPrecio">${item.precio}</td>
                  </tr>
                ))
              ) : (
                <div></div>
              )}
            </tbody>
          </table>
        </div>
      )}
      {cafeteria.length !== 0 && (
        <div className="carta-categoria-container">
          <div className="carta-separadorHorizontal"></div>
          <h2 className="carta-categoria-titulo">Cafeteria</h2>
          <table className="carta-categoria-tabla">
            <tbody>
              {cafeteria ? (
                cafeteria.map((item, i) => (
                  <tr key={i}>
                    <td className="carta-itemNombre">
                      {item.titulo + separador}
                    </td>
                    <td className="carta-itemPrecio">${item.precio}</td>
                  </tr>
                ))
              ) : (
                <div></div>
              )}
            </tbody>
          </table>
        </div>
      )}
      {bebidas.length !== 0 && (
        <div className="carta-categoria-container">
          <div className="carta-separadorHorizontal"></div>
          <h2 className="carta-categoria-titulo">Bebidas</h2>
          <table className="carta-categoria-tabla">
            <tbody>
              {bebidas ? (
                bebidas.map((item, i) => (
                  <tr key={i}>
                    <td className="carta-itemNombre">
                      {item.titulo + separador}
                    </td>
                    <td className="carta-itemPrecio">${item.precio}</td>
                  </tr>
                ))
              ) : (
                <div></div>
              )}
            </tbody>
          </table>
        </div>
      )}
      {cervezas.length !== 0 && (
        <div className="carta-categoria-container">
          <div className="carta-separadorHorizontal"></div>
          <h2 className="carta-categoria-titulo">Cervezas</h2>
          <table className="carta-categoria-tabla">
            <tbody>
              {cervezas ? (
                cervezas.map((item, i) => (
                  <tr key={i}>
                    <td className="carta-itemNombre">
                      {item.titulo + separador}
                    </td>
                    <td className="carta-itemPrecio">${item.precio}</td>
                  </tr>
                ))
              ) : (
                <div></div>
              )}
            </tbody>
          </table>
        </div>
      )}
      {tragos.length !== 0 && (
        <div className="carta-categoria-container">
          <div className="carta-separadorHorizontal"></div>
          <h2 className="carta-categoria-titulo">Tragos</h2>
          <table className="carta-categoria-tabla">
            <tbody>
              {tragos ? (
                tragos.map((item, i) => (
                  <tr key={i}>
                    <td className="carta-itemNombre">
                      {item.titulo + separador}
                    </td>
                    <td className="carta-itemPrecio">${item.precio}</td>
                  </tr>
                ))
              ) : (
                <div></div>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* <div className="laCarta-container">
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
      </div> */}
    </div>
  );
}
