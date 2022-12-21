import { useState } from "react";
import { useAuth } from "./../../context/authContext";
import { useNavigate } from "react-router-dom";
import { Alert } from "../Layout/Alert";
import "./Login.css";

export function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const resetError = () => setError(null);

  const handleChange = ({ target: { name, value } }) =>
    setUser({ ...user, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/dashboard");
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
  }; */

  return (
    <div className="login-container">
      {error && <Alert message={error} resetError={resetError} />}
      <form onSubmit={handleSubmit} className="form-container">
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

        <button className="button-login">Login</button>
      </form>
      {/*<button onClick={handleGoogleSignIn}>Login with google</button>*/}
    </div>
  );
}
