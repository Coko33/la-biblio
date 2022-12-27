//import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import "./CRUDshows.css";

export default function Fecha({ cambiaFechaYHora, fechaYHora, labelFecha }) {
  //const [fechaYHora, setFechaYHora] = useState();

  return (
    <>
      <label className="input-labelDescripcion" htmlFor="descripcion">
        {labelFecha || "Fecha"}
      </label>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          //label="Basic example"
          inputFormat="DD/MM/YYYY hh:mm"
          value={fechaYHora}
          onChange={(newValue) => {
            cambiaFechaYHora(newValue);
            //  console.log(new Date(newValue.$d).getTime() / 1000);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </>
  );
}
