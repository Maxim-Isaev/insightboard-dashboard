import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setCredentials } from "../../store/userSlice";
import { getProfile } from "../../api/authApi";
import Header from "./Header";
import styles from "./Layout.module.css";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { token, email } = useAppSelector((state) => state.user);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        const { id, email: userEmail } = response.data;
        dispatch(setCredentials({ token: token!, email: userEmail, id }));
      } catch (error) {
        console.error(error);
      }
    };
    if (token && !email) {
      fetchProfile();
    }
  }, [token, email, dispatch]);

  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;
