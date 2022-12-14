import "./Nav.css";
export default function Nav() {
  return (
    <>
      <div className="nav-container">
        <div className="logo-container"></div>
        <div className="navButtons-container">
          <div className="navButton showsButton">
            <a href="_blank" className="nav-link active">
              <div className="nav-icon">
                <i class="material-icons">star</i>
              </div>
              <div className="nav-notch"></div>
            </a>
          </div>
          <div className="navButton cartaButton">
            <a href="_blank" className="nav-link">
              <div className="nav-icon">
                <i class="material-icons">restaurant</i>
              </div>
              <div className="nav-notch"></div>
            </a>
          </div>
          <div className="navButton nosotrosButton">
            <a href="_blank" className="nav-link">
              <div className="nav-icon">
                <i class="material-icons">favorite</i>
              </div>
              <div className="nav-notch"></div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
