"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TooltipItem,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { StockSummary } from "@/lib/types";
import { formatDate, formatPercentage, getStockColor } from "@/lib/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface StockChartProps {
  summary: StockSummary;
}

export function StockChart({ summary }: StockChartProps) {
  const { ticker, data } = summary;
  const color = getStockColor(ticker);

  const chartData = {
    labels: data.map((point) => formatDate(point.date)),
    datasets: [
      {
        label: `${ticker} Daily Returns`,
        data: data.map((point) => point.return * 100), // Convert to percentage
        borderColor: color,
        backgroundColor: `${color}20`,
        borderWidth: 2,
        fill: true,
        tension: 0.1,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: color,
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: color,
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          title: (context: TooltipItem<"line">[]) => {
            return `Date: ${context[0].label}`;
          },
          label: (context: TooltipItem<"line">) => {
            const value = context.parsed.y;
            return `${ticker}: ${formatPercentage(value / 100)}`;
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Date",
          color: "#6b7280",
          font: {
            size: 12,
            weight: "bold" as const,
          },
        },
        grid: {
          display: false,
        },
        ticks: {
          maxTicksLimit: 8,
          color: "#6b7280",
          font: {
            size: 11,
          },
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Daily Return (%)",
          color: "#6b7280",
          font: {
            size: 12,
            weight: "bold" as const,
          },
        },
        grid: {
          color: "#e5e7eb",
          drawBorder: false,
        },
        ticks: {
          color: "#6b7280",
          font: {
            size: 11,
          },
          callback: function (tickValue: string | number) {
            const value =
              typeof tickValue === "number" ? tickValue : parseFloat(tickValue);
            return `${value.toFixed(1)}%`;
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index" as const,
    },
    elements: {
      point: {
        hoverBackgroundColor: color,
        hoverBorderColor: "#ffffff",
        hoverBorderWidth: 2,
      },
    },
  };

  return (
    <div className="w-full h-80">
      <Line data={chartData} options={options} />
    </div>
  );
}
