import { useNavigate } from "react-router-dom";
import "./FAQs.css";
export default function FAQs() {
  const navigate = useNavigate();

  return <div className="container-FAQs">
    <ul className="lista-FAQs">
      <li className="itemLista-FAQs"><span className="pregunta-FAQs">¿Dónde está ubicada La Biblioteca Café?</span> Marcelo T. de Alvear 1155 (entre Cerrito y Libertad). Barrio de Recoleta/Retiro, al lado del Teatro Coliseo.</li>
      <li className="itemLista-FAQs"><span className="pregunta-FAQs">¿A qué hora debo llegar? </span> A la hora que esté citado el show al que se atiende. El horario en que citamos es para la cena o consumición. El show empieza entre 45 y 75 minutos después.</li>
      <li className="itemLista-FAQs"><span className="pregunta-FAQs">¿Cuánto tiempo se guarda mi reserva si llego tarde? </span> La reserva se guarda hasta media hora después de la hora que esté citado del show.</li>
      <li className="itemLista-FAQs"><span className="pregunta-FAQs">¿Se requiere un gasto mínimo por persona?</span> Sí. Además de la entrada al show, hay una consumición mínima por persona, que en este momento es de $1200. Consultar <a href="/carta" >CARTA</a></li>
      <li className="itemLista-FAQs"><span className="pregunta-FAQs">¿Se puede cenar en La Biblioteca Café? </span> Sí. Se puede cenar a la carta, o también tenemos una cena sugerida que incluye plato, postre, y derecho a show. No es menú fijo. Hay opciones. El precio varía por espectáculo.</li>
      <li className="itemLista-FAQs"><span className="pregunta-FAQs">¿Hay estacionamiento cerca? </span> A partir de las 21 horas, el estacionamiento en la cuadra es libre. De no encontrar lugar, las opciones son: el estacionamiento subterráneo de la Plaza Libertad (justo en frente) con acceso en la esquina de Cerrito y Marcelo T. de Alvear, o el estacionamiento del Hotel de Las Américas, situado en Libertad entre Cerrito y Marcelo T. de Alvear. No tenemos convenio con ninguno de ellos.</li>
      <li className="itemLista-FAQs"><span className="pregunta-FAQs">¿Cuáles son mis opciones de pago? </span> Aceptamos efectivo, tarjeta de débito, Mercado Pago, o transferencia bancaria. No trabajamos con tarjetas de crédito.</li>
      <li className="itemLista-FAQs"><span className="pregunta-FAQs">¿Hay restricción de edad? </span> No. Todas las edades son bienvenidas </li>
      <li className="itemLista-FAQs"><span className="pregunta-FAQs">¿La Biblioteca Café se alquila para eventos privados? </span> ¡Si! A La Biblioteca Café le encantaría organizar tu próximo evento. Para obtener información, llamar al 11-6515-9514 o enviar un mail a <a href="mailto:edith@labibliotecacafe.com.ar">edith@labibliotecacafe.com.ar</a></li>
      <li className="itemLista-FAQs"><span className="pregunta-FAQs">¿La Biblioteca Café se alquila para filmaciones? </span> ¡Absolutamente! Para obtener información, llamar al 11-6515-9514 o enviar un mail a <a href="mailto:edith@labibliotecacafe.com.ar">edith@labibliotecacafe.com.ar</a></li>
      <li className="itemLista-FAQs"><span className="pregunta-FAQs">¿Hay acceso para discapacitados?</span> Dada la antigüedad del edificio, no contamos con una rampa, pero con buena voluntad siempre logramos posibilitar el acceso a personas con movilidad reducida.</li>
      <li className="itemLista-FAQs"><span className="pregunta-FAQs">¿Hay platos aptos para celiacos? </span> Sí. Nuestro menú incluye opciones para todo tipo de dietas.</li>
      <li className="itemLista-FAQs"><span className="pregunta-FAQs">¿Hay platos aptos para vegetarianos y/o veganos? </span> Sí. Nuestro menú incluye opciones para todo tipo de dietas.</li>
    </ul>
  </div>;
}
