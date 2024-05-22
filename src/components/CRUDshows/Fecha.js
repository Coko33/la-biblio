import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import "./CRUDshows.css";

export default function Fecha({ mostrarChecks, cambiaFechaYHora, fechaYHora, labelFecha, esDiario, cambiaEsDiario, esSemanal, cambiaEsSemanal, fechaDesde, cambiaFechaDesde, fechaHasta, cambiaFechaHasta, diaSemana, cambiaDiaSemana }) {

  return (
    <>
      {mostrarChecks && <div className="Fecha__checkboxes__container">
          <div className="Fecha__inputCheckbox__container">
            <label className="input-labelDescripcion" htmlFor="descripcion">Es Diario</label>
            <input onChange={(e) => cambiaEsDiario(e.target.checked)} type="checkbox" value={esDiario} checked={esDiario}></input>
          </div>
          <div className="Fecha__inputCheckbox__container">
            <label className="input-labelDescripcion" htmlFor="descripcion">Es Semanal</label>
            <input onChange={(e) => cambiaEsSemanal(e.target.checked)} type="checkbox" value={esSemanal} checked={esSemanal}></input>
          </div>
      </div>}
      {esDiario || esSemanal ? (
        <>
        {esSemanal && <div>
          <label className="input-labelDiaSemana" htmlFor="diasSemana">Día de la semana</label>
          <select id="diasSemana" value={diaSemana} onChange={cambiaDiaSemana}>
            <option value="">-- Selecciona un día --</option>
            <option value="Lunes">Lunes</option>
            <option value="Martes">Martes</option>
            <option value="Miércoles">Miércoles</option>
            <option value="Jueves">Jueves</option>
            <option value="Viernes">Viernes</option>
            <option value="Sábado">Sábado</option>
            <option value="Domingo">Domingo</option>
          </select>
          {/* {diaSemana && <p>Has seleccionado: {diaSemana}</p>} */}
        </div>}
        <div className="Fecha__container">
          <div className="Fecha__inlineItem">
            <label className="input-labelDescripcion" htmlFor="descripcion">
              {labelFecha || "Desde"}
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                inputFormat="DD/MM/YYYY hh:mm"
                value={fechaDesde}
                onChange={(newValue) => {
                  cambiaFechaDesde(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div className="Fecha__inlineContainer">
            <label className="input-labelDescripcion" htmlFor="descripcion">
              {labelFecha || "Hasta"}
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                inputFormat="DD/MM/YYYY hh:mm"
                value={fechaHasta}
                onChange={(newValue) => {
                  cambiaFechaHasta(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </div>
        
      </>
      ) : (
        <div className="Fecha__container">
          <div className="Fecha__inlineItem">
            <label className="input-labelDescripcion" htmlFor="descripcion">
              {labelFecha || "Fecha"}
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                inputFormat="DD/MM/YYYY hh:mm"
                value={fechaYHora}
                onChange={(newValue) => {
                  cambiaFechaYHora(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </div>
      )
      }
      
    </>
  );
}
