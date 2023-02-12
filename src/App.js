import "./App.css";
import { lazy, Suspense } from "react";
import { Routes, Route, HashRouter, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./Helpers/ProtectedRoute";
import Nav from "./components/Layout/Nav";
import Spinner from "./components/Spinner/Spinner";
import Reservas from "./components/Layout/Reservas";
import BotonWsp from "./components/Layout/BotonWsp";
import AcercaDe from "./components/pages/AcercaDe";

function App() {
  const Shows = lazy(() => import("./components/pages/Shows"));
  const Carta = lazy(() => import("./components/pages/Carta"));
  const FAQs = lazy(() => import("./components/pages/FAQs"));
  const Login = lazy(() => import("./components/pages/Login"));
  const Dashboard = lazy(() => import("./components/Dashboard/Dashboard"));
  return (
    <BrowserRouter>
      <Nav></Nav>
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
                <Shows />
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
