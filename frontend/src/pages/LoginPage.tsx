import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux";
import { setCredentials } from "../store/userSlice";
import { login, register, getProfile } from "../api/authApi";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
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
        localStorage.removeItem("token");
        setError("Ошибка входа");
      }
    } else {
      try {
        await register(email, password);
        alert("Регистрация успешна! Теперь войдите.");
        setIsLogin(true);
        setPassword("");
      } catch {
        setError("Пользователь с такими email уже существует.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.tabs}>
          <button
            type="button"
            className={`${styles.tab} ${isLogin ? styles.activeTab : ""}`}
            onClick={() => {
              setIsLogin(true);
              setError("");
            }}
          >
            Вход
          </button>
          <button
            type="button"
            className={`${styles.tab} ${!isLogin ? styles.activeTab : ""}`}
            onClick={() => {
              setIsLogin(false);
              setError("");
            }}
          >
            Регистрация
          </button>
        </div>

        <h2>{isLogin ? "Вход в InsightBoard" : "Регистрация"}</h2>
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
            {isLogin ? "Войти" : "Зарегистрироваться"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
