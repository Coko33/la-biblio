import "./App.css";
import { lazy, Suspense, useState } from "react";
import { useEffect } from "react";
import { Routes, Route, HashRouter, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./Helpers/ProtectedRoute";
import { useModal } from "./Hooks/useModal";
import Nav from "./components/Layout/Nav";
import Spinner from "./components/Spinner/Spinner";
import Reservas from "./components/Layout/Reservas";
import BotonWsp from "./components/Layout/BotonWsp";
import AcercaDe from "./components/pages/AcercaDe";
import MenuDelDia from "./components/Layout/MenuDelDia";

function App() {
  const Shows = lazy(() => import("./components/pages/Shows"));
  const Carta = lazy(() => import("./components/pages/Carta"));
  const FAQs = lazy(() => import("./components/pages/FAQs"));
  const Login = lazy(() => import("./components/pages/Login"));
  const Dashboard = lazy(() => import("./components/Dashboard/Dashboard"));
  const [isOpenMenuDelDia, openMenuDelDia, closeMenuDelDia] = useModal();
  const [lastVisible, setLastVisible] = useState(null);
  useEffect(()=>{
    openMenuDelDia();
  },[])
  return (
    <BrowserRouter>
      <Nav></Nav>
      {isOpenMenuDelDia && <MenuDelDia closeMenuDelDia={closeMenuDelDia}></MenuDelDia>}
      <AuthProvider>
        <Routes>
          <Route
            path="/login"
            element={
              <Suspense fallback={<Spinner>loading</Spinner>}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Spinner>loading</Spinner>}>
                  <Dashboard />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route
            path="/"
            element={
              <Suspense fallback={<Spinner>loading</Spinner>}>
                <Shows lastVisible={lastVisible} setLastVisible={setLastVisible}/>
              </Suspense>
            }
          />
          <Route
            path="/carta"
            element={
              <Suspense fallback={<Spinner>loading</Spinner>}>
                <Carta />
              </Suspense>
            }
          />
          <Route
            path="/FAQs"
            element={
              <Suspense fallback={<Spinner>loading</Spinner>}>
                <FAQs />
              </Suspense>
            }
          />
          <Route
            path="/acercaDe"
            element={
              <Suspense fallback={<Spinner>loading</Spinner>}>
                <AcercaDe />
              </Suspense>
            }
          />
          <Route path="*" element={<h1>No se encuentra la url</h1>} />
        </Routes>
      </AuthProvider>
      <Reservas></Reservas>
      <BotonWsp></BotonWsp>
    </BrowserRouter>
  );
}

export default App;
