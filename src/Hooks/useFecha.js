import { useState } from "react";

export const useFecha = (fechaHora) => {
  console.log(fechaHora);
  const [fecha, setFecha] = useState(null);
  const [hora, setHora] = useState(null);
  const unixDateEpochTimeMS = fechaHora * 1000;
  const d = new Date(unixDateEpochTimeMS);
  const date = d.toLocaleString();
  const [fech, hor] = date.split(" ");
  setFecha(fech);
  setHora(hor);
  return { fecha, hora };
};
