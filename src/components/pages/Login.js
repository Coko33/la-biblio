import { useState } from "react";
import { useAuth } from "./../../context/authContext";
import { useNavigate, Navigate } from "react-router-dom";
import { Alert } from "../Layout/Alert";
import Spinner from "../Spinner/Spinner";
import "./Login.css";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();
  const resetError = () => setError(null);
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) =>
    setUser({ ...user, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(user.email, user.password);
      navigate("/admin");
    } catch (err) {
      if (err.code === "auth/user-not-found")
        setError("No se encuentra el usuario o mail");
      if (err.code === "auth/invalid-email")
        setError("No se ingresó un correo válido");
      if (err.code === "auth/wrong-password")
        setError("La contraseña no es correcta");
    }
  };

  /* const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }; 
  
  
  
  onSubmit={handleSubmit} 
  */

  return (
    <div className="login-container">
      {error && <Alert message={error} resetError={resetError} />}
      {loading && <Spinner></Spinner>}
      <form className="form-container">
        <div className="emailInput-container">
          <label htmlFor="email" className="email-label">
            Email
          </label>
          <input
            className="email-input"
            type="email"
            name="email"
            placeholder="Ingresar email"
            onChange={handleChange}
          ></input>
        </div>

        <div className="passInput-container">
          <label htmlFor="password" className="password-label">
            Password
          </label>
          <input
            className="password-input"
            type="password"
            name="password"
            id="password"
            placeholder="******"
            onChange={handleChange}
          ></input>
        </div>

        <button className="button-login" onClick={(e) => handleSubmit(e)}>
          Login
        </button>
      </form>
      {/*<button onClick={handleGoogleSignIn}>Login with google</button>*/}
    </div>
  );
}
