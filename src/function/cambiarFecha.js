/* const functions = require('firebase-functions');
const admin = require('firebase-admin');
import { showsCollectionRef } from "../../firebase";
import { addDoc, doc, setDoc } from "firebase/firestore";
import { showsCollectionRef } from "../../firebase";

admin.initializeApp();

exports.cambiarFecha = functions.firestore.document('shows-test/{showId}').onCreate((snapshot, context) => {
    const show = snapshot.data();

    addDoc(showsCollectionRef, {
        titulo,
        subtitulo,
        descripcion,
        fechaYHora: fechaYHora && fechaYHora.$d,
        fechaDesde: fechaDesde && fechaDesde.$d,
        fechaHasta: fechaHasta && fechaHasta.$d,
        esDiario,
        esSemanal,
        imagenURL: downloadURL,
        precios,
      })
        .then((res) => {
          console.log(res);
          setOk(`Se subió correctamente el show \n"${titulo}"`);
          setTitulo("");
          setTimeout(() => {
            window.location.replace("");
          }, 2000);
        })
        .catch((err) => {
          setError(err.message);
        });

    return transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el correo:', error);
            return;
        }
        console.log('Correo enviado:', info.response);
    });
});
 */