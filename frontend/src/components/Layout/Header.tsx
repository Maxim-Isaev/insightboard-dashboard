import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { logout } from "../../store/userSlice";
import styles from "./Header.module.css";

const Header = () => {
  const dispatch = useAppDispatch();
  const { email } = useAppSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/login";
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>InsightBoard</div>
      <div className={styles.userInfo}>
        <span>{email?.split("@")[0] || "Гость"}</span>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          Выйти
        </button>
      </div>
    </header>
  );
};

export default Header;
