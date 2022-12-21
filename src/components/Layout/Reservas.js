import "./Reservas.css";
export default function Reservas() {
  return (
    <>
      <div className="reservas-container">
        <div className="reservasText-container">
          <div className="reservasText-reservas-container">
            <p>Reservas:</p>
          </div>
          <div className="barrita"></div>
          <div className="reservasText-contactos-container">
            <div className="reservasText-telefono-container">
              <i className="material-icons icon-telefono">local_phone</i>
              <p className="text-telefono">4811-0673 ó 15 6515 9514</p>
            </div>
            <div className="reservasText-mail-container">
              <i className="material-icons icon-mail">local_post_office</i>
              <p className="text-email">edith@labibliotecacafe.com.ar</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
