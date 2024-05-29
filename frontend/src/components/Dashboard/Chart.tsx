import {Line} from 'react-chartjs-2';
import {Chart as Chartjs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip,Legend} from 'chart.js';

Chartjs.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const Chart = () => {
    const options = {
        responsive: true,
        scales: {
            x: {
                grid: {
                display: false,
                }
            },
            y: {
                grid: {
                display: false,
                }
            }
        }
    };
    const data = {
      labels: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        ".",
        ".",
        ".",
        "30",
      ],
      datasets: [
        {
          label: "Clicks",
          data: [3, 5, 7, 6, 10, 13, 5, 17, 19, 21, 13, 25, 27, 18, 20, 23],
          borderColor: "rgb(250,204,21)",
        },
      ],
    };
  return <Line options={options} data={data} />;
}

export default Chart
