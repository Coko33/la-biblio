import "./Alert.css";
export function Alert({ message, resetError }) {
  return (
    <div className="alert-container">
      <span className="alert-span">{message}</span>
      <button onClick={() => resetError()} className="alert-button">
        Cerrar
      </button>
    </div>
  );
}
