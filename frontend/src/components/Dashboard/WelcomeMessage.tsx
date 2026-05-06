import styles from "./WelcomeMessage.module.css";

const WelcomeMessage = () => {
  return (
    <div className={styles.welcome}>
      <h1>Добро пожаловать!</h1>
      <p>
        Рады видеть вас в InsightBoard. Управляйте задачами и отслеживайте
        активность.
      </p>
    </div>
  );
};

export default WelcomeMessage;
