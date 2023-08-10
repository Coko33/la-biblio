// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";

//import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxU5nnBnrFqCd3HKIArgf8THMa9-WOsYk",
  authDomain: "la-biblio.firebaseapp.com",
  projectId: "la-biblio",
  storageBucket: "la-biblio.appspot.com",
  messagingSenderId: "548436869179",
  appId: "1:548436869179:web:657ba8f6c0be2143e15c1e",
  measurementId: "G-767BW1QGYK",
};

export const app = initializeApp(firebaseConfig);
// Initialize Firebase
export const db = getFirestore(app);
//Auth
export const auth = getAuth(app);
//referencia a la base de datos
export const showsCollectionRef = collection(db, "shows");
export const cartaCollectionRef = collection(db, "carta");
export const preciosCollectionRef = collection(db, "precios");
//Storage
export const storage = getStorage();

//analytics
//const analytics = getAnalytics(app);
