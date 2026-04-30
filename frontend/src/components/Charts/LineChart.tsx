import React from "react";
import { Line } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";

interface LineChartProps {
  ChartData: ChartData<"line">;
  title?: string;
}

const LineChart: React.FC<LineChartProps> = ({ ChartData, title }) => {
  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: !!title,
        text: title,
      },
    },
  };
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Line data={ChartData} options={options} />
    </div>
  );
};

export default LineChart;
