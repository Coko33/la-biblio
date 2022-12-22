//import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import "./CRUDshows.css";

export default function Fecha({ cambiaFechaYHora, fechaYHora }) {
  //const [fechaYHora, setFechaYHora] = useState();

  return (
    <>
      <label className="input-labelDescripcion" htmlFor="descripcion">
        Fecha
      </label>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          //label="Basic example"
          value={fechaYHora}
          onChange={(newValue) => {
            cambiaFechaYHora(newValue);
            console.log(fechaYHora);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </>
  );
}
