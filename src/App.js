import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./Helpers/ProtectedRoute";
import Nav from "./components/Layout/Nav";
import { Login } from "./components/pages/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Shows from "./components/pages/Shows";
import Carta from "./components/pages/Carta";
import FAQs from "./components/pages/FAQs";
import Footer from "./components/Layout/Footer";
import WinSize from "./Helpers/WinSize";
import Reservas from "./components/Layout/Reservas";
import BotonWsp from "./components/Layout/BotonWsp";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <WinSize></WinSize>
          <Nav />
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
        </BrowserRouter>
      </AuthProvider>
      <BotonWsp></BotonWsp>
    </>
  );
}

export default App;
