import "./Reservas.css";
export default function Reservas() {
  return (
    <div>
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
        <div className="logosFooter-container">
          <div className="logoFooter logoBamusica-container">
            <img src="https://firebasestorage.googleapis.com/v0/b/la-biblio.appspot.com/o/layout%2FLogo%20BA%20Musica.png?alt=media&token=04408d3a-aa4d-4e17-9815-3aa1dad632bb"></img>
          </div>
          <div className="logoFooter logoFondo-container">
            <img src="https://firebasestorage.googleapis.com/v0/b/la-biblio.appspot.com/o/layout%2Ffondo-metropolitano.png?alt=media&token=b4273f66-d273-4db5-92e6-53ffc6d0eee3"></img>
          </div>
        </div>
      </div>
    </div>
  );
}
