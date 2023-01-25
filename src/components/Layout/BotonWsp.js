import React from "react";
import "./BotonWsp.css";
import { ReactComponent as BtnWsp } from "./../../assets/btnWsp.svg";

export default function BotonWsp() {
  return (
    <div>
      <div className="botonWsp">
        {/* <a href="https://api.whatsapp.com/send?phone=0123456789&text=Hola, Nececito mas informacion!"
        >
          {" "}
          <BtnWsp></BtnWsp>
        </a> */}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://wa.me/541565159514/?text=Hola,%20Edith.%20Me%20gustaria%20reservar%20una%20mesa"
        >
          {" "}
          <BtnWsp></BtnWsp>
        </a>
      </div>
    </div>
  );
}
