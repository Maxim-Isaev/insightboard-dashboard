import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux";
import { setCredentials } from "../store/userSlice";
import { login } from "../api/authApi";
import { getProfile } from "../api/authApi";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      const { token } = res.data;

      localStorage.setItem("token", token);

      const profileRes = await getProfile();
      dispatch(
        setCredentials({
          token,
          email: profileRes.data.email,
          id: profileRes.data.id,
        }),
      );
      navigate("/dashboard");
    } catch {
      setError("Ошибка входа");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Вход в InsightBoard</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.button}>
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
