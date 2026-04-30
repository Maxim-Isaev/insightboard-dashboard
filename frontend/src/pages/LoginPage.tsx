import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux";
import { setCredentials } from "../store/userSlice";
import { login } from "../api/authApi";
import { getProfile } from "../api/authApi";

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
    <div style={{ padding: "2rem" }}>
      <h2>Вход в InsightBoard</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: "0.5rem" }}>
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: "1rem" }}>
          Войти
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
