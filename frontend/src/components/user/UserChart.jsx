import React, { memo } from "react";
import { Pie } from "react-chartjs-2";

const r = () => (Math.random() * 256) >> 0;

function random_rgba() {
  return `rgb(${r()}, ${r()}, ${r()})`;
}

const options = {
  plugins: {
    tooltip: {
      callbacks: {
        label: function ({ label, formattedValue }) {
          return ` ${label} ${formattedValue}%`;
        },
      },
    },
    title: {
      display: true,
      text: "Percentage spent per category vs total spent",
    },
  },
};

const UserChart = memo(function UserChart({ data }) {
  const totalPerCategory = {};

  const categories = Array.from(new Set(data.map((t) => t.category)));
  data.forEach((t) => {
    if (!totalPerCategory?.[t.category])
      totalPerCategory[t.category] = t.amount;
    else totalPerCategory[t.category] += t.amount;
  });

  const totalSpending = data.reduce((a, b) => ({
    amount: parseInt(a.amount) + parseInt(b.amount),
  })).amount;

  const percentPerCategory = categories.map((t) =>
    ((totalPerCategory[t] / totalSpending) * 100).toFixed(2)
  );

  // console.log(categories, totalSpending, totalPerCategory, percentPerCategory);
  const colors = categories.map((t) => random_rgba());

  const chartData = {
    labels: categories,
    datasets: [
      {
        label: "% spending per category",
        data: percentPerCategory,
        backgroundColor: colors,
        borderColor: colors,
      },
    ],
  };

  return <Pie data={chartData} options={options} />;
});

export { UserChart };
