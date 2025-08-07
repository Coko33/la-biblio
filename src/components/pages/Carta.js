import { FormControlUnstyledContext } from "@mui/base";
import { getDocs, doc, getDoc } from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import { cartaCollectionRef } from "../../firebase";
import { preciosCollectionRef } from "../../firebase";
import { Swiper, SwiperSlide } from 'swiper/react';
import "./Carta.css";
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import useWindowDimensions from "../../Hooks/useWindowDimensions";
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';

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
  const [precios, setPrecios] = useState(null); //PXVg7zkPfjA4k2QuSZu5
  useEffect(()=>{
    if (precios !== null) {
      return;
    }
    async function getDocument (coll, id) {
      const snap = await getDoc(doc(preciosCollectionRef, id))
      if (snap.exists()) {
        setPrecios(snap.data())
        //console.log(snap.data());
      }    
      else
        return Promise.reject(Error(`No such document: ${coll}.${id}`))
    }
    getDocument("precios", "PXVg7zkPfjA4k2QuSZu5");
  },[precios])

  useEffect(() => {
    obtenerCarta();
    /*return obtenerCarta();*/
  }, []);

  const deviceDimensions = useWindowDimensions();

  async function obtenerCarta() {
    try {
      const cartaData = await getDocs(cartaCollectionRef);
      const p = new Promise((resolve, reject) => {
        const cartaItems = cartaData.docs.map((item) => ({
          id: item.id,
          titulo: item.data().titulo,
          orden: item.data().orden,
          descripcion: item.data().descripcion,
          imagenURL: item.data().imagenURL,
          precio: item.data().precio,
          categoria: item.data().categoria || null,
        }));
        setLaCarta(cartaItems);
        //setLaCarta(cartaItems.sort((a, b) => a.precio - b.precio));
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
          item.categoria === "Principales" && prin.push(item);
          item.categoria === "Vinos tintos" && vnTn.push(item);
          item.categoria === "Vinos blancos" && vnBl.push(item);
          item.categoria === "Champagnes" && cham.push(item);
          item.categoria === "Cafeteria" && cafe.push(item);
          item.categoria === "Bebidas" && bebi.push(item);
          item.categoria === "Cervezas" && cerv.push(item);
          item.categoria === "Tragos" && trag.push(item);
        });
        setSalados(sala.sort((a, b) => a.orden - b.orden));
        setDulces(dulc.sort((a, b) => a.orden - b.orden));
        setEntradas(entr.sort((a, b) => a.orden - b.orden));
        setPrincipales(prin.sort((a, b) => a.orden - b.orden));
        setVinosTintos(vnTn.sort((a, b) => a.orden - b.orden));
        setVinosBlancos(vnBl.sort((a, b) => a.orden - b.orden));
        setChampagnes(cham.sort((a, b) => a.orden - b.orden));
        setCafeteria(cafe.sort((a, b) => a.orden - b.orden));
        setBebidas(bebi.sort((a, b) => a.orden - b.orden));
        setCervezas(cerv.sort((a, b) => a.orden - b.orden));
        setTragos(trag.sort((a, b) => a.orden - b.orden));
      });
    } catch (err) {
      console.log(err);
    }
  }

  const separador =
    " ......................................................................................................................................................................................................................................................................................";

  //fotos anteriores https://firebasestorage.googleapis.com/v0/b/la-biblio.appspot.com/o/imagenes-carta%2F2.png?alt=media&token=b3c22cc8-7edd-47ec-a331-385c154382f6
  
  return (
    <>
      <Swiper
        spaceBetween={30}
        effect={'fade'}
        navigation={false}
        pagination={{
          clickable: false,
        }}
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        className="swiperCarta"
      >
        {/* <SwiperSlide>
        {({ isActive }) => (
          <>
          <div className="descripcionFoto__container">
            <h3>Pastel de papa</h3>
          </div>
          <img className={isActive && 'zoomear'} src="https://firebasestorage.googleapis.com/v0/b/la-biblio.appspot.com/o/imagenes-carta2%2Fcartapic1.jpeg?alt=media&token=762343f1-6e12-4a96-b752-5baf046237cd" />
          </>
        )}
        </SwiperSlide> */}
        {deviceDimensions.width > 600 && <SwiperSlide>
          {({ isActive }) => (
            <>
            <div className="descripcionFoto__container">
              <h3>Goulash</h3>
              <h6>(plato de la casa)</h6>
            </div>
          <img className={isActive && 'zoomear'} src="https://firebasestorage.googleapis.com/v0/b/la-biblio.appspot.com/o/imagenes-carta2%2Fcartapic2.jpeg?alt=media&token=762343f1-6e12-4a96-b752-5baf046237cd" />
          </>
          )}
        </SwiperSlide>}
        <SwiperSlide>
          {({ isActive }) => (
            <>
            <div className="descripcionFoto__container">
              <h3>Pastas</h3>
            </div>
            <img className={isActive && 'zoomear'} src="https://firebasestorage.googleapis.com/v0/b/la-biblio.appspot.com/o/imagenes-carta2%2Fcartapic3.jpeg?alt=media&token=762343f1-6e12-4a96-b752-5baf046237cd" />
            </>
          )}
        </SwiperSlide>
        <SwiperSlide>
          {({ isActive }) => (
            <>
            <div className="descripcionFoto__container">
              <h3>Postres</h3>
            </div>
            <img className={isActive && 'zoomear'} src="https://firebasestorage.googleapis.com/v0/b/la-biblio.appspot.com/o/imagenes-carta2%2Fcartapic4.jpeg?alt=media&token=762343f1-6e12-4a96-b752-5baf046237cd" />
            </>
          )}
        </SwiperSlide>
        <SwiperSlide>
          {({ isActive }) => (
            <>
            <div className="descripcionFoto__container">
              <h3>Postres</h3>
            </div>
          <img className={isActive && 'zoomear'} src="https://firebasestorage.googleapis.com/v0/b/la-biblio.appspot.com/o/imagenes-carta2%2Fcartapic5.jpeg?alt=media&token=762343f1-6e12-4a96-b752-5baf046237cd" />
          </>
          )}
        </SwiperSlide>
        <SwiperSlide>
          {({ isActive }) => (
            <>
            <div className="descripcionFoto__container">
              <h3>Crepes</h3>
            </div>
          <img className={isActive && 'zoomear'} src="https://firebasestorage.googleapis.com/v0/b/la-biblio.appspot.com/o/imagenes-carta2%2Fcartapic6.jpeg?alt=media&token=762343f1-6e12-4a96-b752-5baf046237cd" />
          </>
          )}
        </SwiperSlide>
        <SwiperSlide>
          {({ isActive }) => (
            <>
            <div className="descripcionFoto__container">
              <h3>Postres</h3>
            </div>
          <img className={isActive && 'zoomear'} src="https://firebasestorage.googleapis.com/v0/b/la-biblio.appspot.com/o/imagenes-carta2%2Fcartapic7.jpeg?alt=media&token=762343f1-6e12-4a96-b752-5baf046237cd" />
          </>
          )}
        </SwiperSlide>
        <SwiperSlide>
          {({ isActive }) => (
            <>
            <div className="descripcionFoto__container">
              <h3>Pastel de papas</h3>
            </div>
          <img className={isActive && 'zoomear'} src="https://firebasestorage.googleapis.com/v0/b/la-biblio.appspot.com/o/imagenes-carta2%2Fcartapic8.jpeg?alt=media&token=762343f1-6e12-4a96-b752-5baf046237cd" />
          </>
          )}
        </SwiperSlide>
        {/* <SwiperSlide>
          {({ isActive }) => (
            <>
            <div className="descripcionFoto__container">
              <h3>Postres</h3>
              <h6>(plato de la casa)</h6>
            </div>
          <img className={isActive && 'zoomear'} src="https://firebasestorage.googleapis.com/v0/b/la-biblio.appspot.com/o/imagenes-carta2%2Fcartapic9.jpeg?alt=media&token=762343f1-6e12-4a96-b752-5baf046237cd" />
          </>
          )}
        </SwiperSlide> */}{/* 
        {deviceDimensions.width > 600 && <SwiperSlide>
          {({ isActive }) => (
            <>
            <div className="descripcionFoto__container">
              <h3>Pastel de papas</h3>
            </div>
            <img className={isActive && 'zoomear'} src="https://firebasestorage.googleapis.com/v0/b/la-biblio.appspot.com/o/imagenes-carta%2F11.png?alt=media&token=b8c8da05-8c06-4ae2-9f86-e1a27f2178cd" />
            </>
          )}
        </SwiperSlide>} */}
        {/* <SwiperSlide>
          {({ isActive }) => (
          <img className={isActive && 'zoomear'} src="https://firebasestorage.googleapis.com/v0/b/la-biblio.appspot.com/o/imagenes-carta%2F12.png?alt=media&token=d94f98a6-5cc6-4cab-85fd-a9a6d8164c1d" />
          )}
        </SwiperSlide> */}
        {/* <SwiperSlide>
          {({ isActive }) => (
            <>
            <div className="descripcionFoto__container">
              <h3>Postres</h3>
            </div>
            <img className={isActive && 'zoomear'} src="https://firebasestorage.googleapis.com/v0/b/la-biblio.appspot.com/o/imagenes-carta%2F13.png?alt=media&token=16908883-591d-4a9b-bb7f-f7fbda8ffb73" />
            </>
          )}
        </SwiperSlide> */}
        {/* <SwiperSlide>
          {({ isActive }) => (
            <>
            <div className="descripcionFoto__container">
              <h3>Postres</h3>
            </div>
          <img className={isActive && 'zoomear'} src="https://firebasestorage.googleapis.com/v0/b/la-biblio.appspot.com/o/imagenes-carta%2F14.png?alt=media&token=2208d6a2-5274-477c-bc5f-9ff99000f046" />
          </>
          )}
        </SwiperSlide> */}
        {/* <SwiperSlide>
          {({ isActive }) => (
            <>
            <div className="descripcionFoto__container">
              <h3>Postres</h3>
            </div>
          <img className={isActive && 'zoomear'} src="https://firebasestorage.googleapis.com/v0/b/la-biblio.appspot.com/o/imagenes-carta%2F15.png?alt=media&token=b0c0c943-edd8-42d4-9f82-8ce53686bc37" />
          </>
          )}
        </SwiperSlide> */}
      </Swiper>

    <div className="container-carta"><div className="menuDelDia-carta-container">
        {/* 
        <div className="menuDelDia-carta-imgContainer">
          <div className="menuDelDia-carta-almuerzoEjecutivo">
            <h6>Almuerzo Ejecutivo</h6>
          </div>
          <img src="https://firebasestorage.googleapis.com/v0/b/la-biblio.appspot.com/o/imagenes-carta%2FPlato2.jpeg?alt=media&token=5d0badaa-6889-43b6-b248-facd6e3a16b0"></img>
        </div>
        <div className="menuDelDia-carta-texto">
          <p>
            Dias hábiles de 12:30 a 15hs. <br></br>
            Incluye plato, bebida y postre o café.
          </p>
          <div className="menuDelDia-carta-almuerzoEjecutivo precio">
            <h6>${precios && precios.menuEjecutivo}</h6>
          </div>
        </div> 
        */}
        <div className="menuDelDia-carta-texto">
          <p>
          <b>Almuerzo Ejecutivo </b>{`dias hábiles de 12:30 a 15hs.`} <br></br> {`
            Incluye plato y bebida. $${precios && precios.menuEjecutivo}`}
          </p>
        </div> 
      </div>
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
    </>
  );
}
