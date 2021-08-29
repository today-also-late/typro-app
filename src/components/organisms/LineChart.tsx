import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { PrimaryButton } from "../atoms";

const LineChart = (props: any) => {
  // x軸に渡す配列を作る 今は回数[1, 2, 3]
  let xAxes = [];
  for (let i: number = 0; i < props.scores.length; i++) {
    xAxes.push(props.scores[i].date);
  }

  let yAxes = [];
  for (let i: number = 0; i < props.scores.length; i++) {
    yAxes.push(props.scores[i].score);
  }

  const data = {
    labels: xAxes,
    datasets: [
      {
        label: props.label,
        data: yAxes,
        fill: false,
        backgroundColor: "rgb(75,161,219)",
        borderColor: "rgba(19,237,226,0.9)",
      },
    ],
  };

  const handleClick = (level: string) => {
    if (level === "easy") {
      props.setLevel("normal");
    } else if (level === "normal") {
      props.setLevel("difficult");
    } else {
      props.setLevel("easy");
    }
  };
  const [hoverColor, setHoverColor] = useState("rgb(0,0,0)");
  const changeColor = (hover: boolean) => {
    if (hover) {
      setHoverColor("rgb(75,161,219)");
    } else {
      setHoverColor("rgb(0,0,0)");
    }
  };

  const options = {
    animation: true,
    plugins: {
      title: {
        display: true,
        text: props.title,
      },
      legend: {
        onClick: () => handleClick(props.label),
        onHover: () => changeColor(true),
        onLeave: () => changeColor(false),
        labels: {
          color: hoverColor,
          boxWidth: 15,
        },
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} width={500} height={300} />
    </div>
  );
};

export default LineChart;
