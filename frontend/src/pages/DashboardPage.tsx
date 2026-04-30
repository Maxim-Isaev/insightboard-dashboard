// import { useAppSelector } from "../hooks/redux";
import LineChart from "../components/Charts/LineChart";

const DashboardPage = () => {
  const ChartData = {
    labels: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
    datasets: [
      {
        label: "Активность",
        data: [12, 19, 3, 5, 2, 3, 7],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Добро пожаловать в дашборд InsightBoard!</h1>
      <LineChart ChartData={ChartData} title="Активность за неделю" />
    </div>
  );
};
export default DashboardPage;
