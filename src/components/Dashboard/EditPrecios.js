import { useState, useEffect } from "react";
import { preciosCollectionRef } from "../../firebase";
import { setDoc, doc, getDoc} from "firebase/firestore";
import "./Dashboard.css";

export default function EditPrecios() {
    const [consumicion, setConsumicion] = useState();
    const [menu, setMenu] = useState();

    const cambiaConsumicion = (e) => setConsumicion(e.target.value);
    const cambiaMenu = (e) => setMenu(e.target.value);

    useEffect(()=>{
          async function getDocument (coll, id) {
            const snap = await getDoc(doc(preciosCollectionRef, id))
            if (snap.exists()) {
              setConsumicion(snap.data().consumicionMinima);
              setMenu(snap.data().menuEjecutivo);
            }    
            else
              return Promise.reject(Error(`No such document: ${coll}.${id}`))
          }
          getDocument("precios", "PXVg7zkPfjA4k2QuSZu5");
    },[])

    const enviarEditado = (e) => {
        e.preventDefault()
        console.log(consumicion, menu);
        setDoc(doc(preciosCollectionRef, "PXVg7zkPfjA4k2QuSZu5"), {
            consumicionMinima: consumicion,
            menuEjecutivo: menu
        }).then((res) => {
            window.location.replace("/admin");
            console.log(res);
        })
    }

    return(
        <>
        <div className="editarPrecios-container">
            <form>
                <label htmlFor="consumicion">Consumición mínima $</label>
                <input name="consumicion" onChange={cambiaConsumicion} placeholder={consumicion} value={consumicion}></input>
                <br></br>
                <label htmlFor="menu">Menú ejecutivo $</label>
                <input name="menu" onChange={cambiaMenu} placeholder={menu} value={menu}></input>
                <br></br>
                <button className="buttonEdit-dashboard confirmarPrecios" onClick={(e)=> enviarEditado(e)}>Enviar</button>
            </form>
        </div>
        </>
    )
}