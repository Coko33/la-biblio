import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";

export default function Fecha({ cambiaFechaYHora }) {
  //const [fechaYHora, setFechaYHora] = useState();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        //label="Basic example"
        //value={fechaYHora}
        onChange={(newValue) => {
          cambiaFechaYHora(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
