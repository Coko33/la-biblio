import { useState } from "react";
import Descripcion from "../CRUDshows/Descripcion";
import Titulo from "../CRUDshows/Titulo";

export default function ShowForm() {
  const [titulo, setTitulo] = useState();
  const [descripcion, setDescripcion] = useState();
  const cambiaTitulo = (e) => setTitulo(e.target.value);
  const cambiaDescripcion = (e) => setDescripcion(e);

  const enviar = () => {
    console.log({ titulo, descripcion });
  };
  return (
    <>
      <Titulo cambiaTitulo={cambiaTitulo} />
      <Descripcion cambiaDescripcion={cambiaDescripcion} />
      <button onClick={enviar}>Enviar</button>
    </>
  );
}

// 31:41 https://www.youtube.com/watch?v=Y9-UkL6ent4&t=1593s
