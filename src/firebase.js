// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/firebase-firestore";
import { startTransition } from "react";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = app.firestore();
const analytics = getAnalytics(app);
