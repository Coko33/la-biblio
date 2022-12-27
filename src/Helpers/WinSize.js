import React from "react";
import "./WinSize.css";
import useWindowDimensions from "./../Hooks/useWindowDimensions.js";

export default function WinSize() {
  let size = useWindowDimensions();

  return (
    <>
      <div className="winsize">
        <h6>{`ancho: ${size.width}, alto: ${size.height}`}</h6>
      </div>
    </>
  );
}
