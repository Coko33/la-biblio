import "./App.css";
import { Suspense } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./Helpers/ProtectedRoute";
import Nav from "./components/Layout/Nav";
import { Login } from "./components/pages/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Shows from "./components/pages/Shows";
import Carta from "./components/pages/Carta";
import FAQs from "./components/pages/FAQs";
//import Footer from "./components/Layout/Footer";
//import WinSize from "./Helpers/WinSize";
import Spinner from "./components/Spinner/Spinner";
import Reservas from "./components/Layout/Reservas";
import BotonWsp from "./components/Layout/BotonWsp";

function App() {
  return (
    <HashRouter>
      <Nav />
      <Suspense fallback={<Spinner></Spinner>}></Suspense>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Shows />} />
          <Route path="/carta" element={<Carta />} />
          <Route path="/FAQs" element={<FAQs />} />
        </Routes>
        <Reservas></Reservas>
        <BotonWsp></BotonWsp>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;
