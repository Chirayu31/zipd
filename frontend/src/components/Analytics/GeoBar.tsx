import fakeData from '../../../FAKE_DATA.ts';
import { Bar } from 'react-chartjs-2';
import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState } from 'react';

import * as React from "react";

Chartjs.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);


const GeoBar: React.FC = () => {
  const user = fakeData[0];
  
  const [value, setValue] = React.useState("All");

  const dropDownArray = [{value: "All", label: "All"}];
  user.User.Url.map((url) => {
    dropDownArray.push({value: url.shortUrl, label: url.shortUrl});
  });

 const locations: { [key: string]: number }[] = [
   {
     AFRICA: 0,
     ANTARCTICA: 0,
     ASIA: 0,
     EUROPE: 0,
     NORTH_AMERICA: 0,
     OCEANIA: 0,
     SOUTH_AMERICA: 0,
   },
 ];
  user.User.Url.map((url) => {
    url.UrlAnalytics.map((click)=>{
      locations[0][click.geo] += 1;
    })
  });

  const bardata = {
    labels: [
      "AFRICA",
      "ANTARCTICA",
      "ASIA",
      "EUROPE",
      "NORTH_AMERICA",
      "OCEANIA",
      "SOUTH_AMERICA",
    ],
    datasets: [
      {
        label: "Clicks",
        data: [
          locations[0].AFRICA,
          locations[0].ANTARCTICA,
          locations[0].ASIA,
          locations[0].EUROPE,
          locations[0].NORTH_AMERICA,
          locations[0].OCEANIA,
          locations[0].SOUTH_AMERICA,
        ],
        backgroundColor: ["rgb(250,204,21)"],
        borderColor: ["rgb(250,250,250)"],
        borderWidth: 1,
      },
    ],
  };
  const [data,setData] = useState(bardata);
  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };
  const handleChoice = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
    if (e.target.value === "All") {
      setData(bardata);
    }
    user.User.Url.map((url) => {
      if (url.shortUrl === e.target.value) {
        const loc: { [key: string]: number }[] = [
          {
            AFRICA: 0,
            ANTARCTICA: 0,
            ASIA: 0,
            EUROPE: 0,
            NORTH_AMERICA: 0,
            OCEANIA: 0,
            SOUTH_AMERICA: 0,
          },
        ];
        url.UrlAnalytics.map((click) => {
          loc[0][click.geo] += 1;
        });
        const bardata1 = {
          labels: [
            "AFRICA",
            "ANTARCTICA",
            "ASIA",
            "EUROPE",
            "NORTH_AMERICA",
            "OCEANIA",
            "SOUTH_AMERICA",
          ],
          datasets: [
            {
              label: "Clicks",
              data: [
                loc[0].AFRICA,
                loc[0].ANTARCTICA,
                loc[0].ASIA,
                loc[0].EUROPE,
                loc[0].NORTH_AMERICA,
                loc[0].OCEANIA,
                loc[0].SOUTH_AMERICA,
              ],
              backgroundColor: ["rgb(250,204,21)"],
              borderColor: ["rgb(250,204,21)"],
              borderWidth: 1,
            },
          ],
        };
        setData(bardata1);
        console.log(data);
      }
    });
  };


  return (
    <div className='flex flex-col items-center'>
      <select className=" bg-slate-950" onChange={handleChoice}>
        {dropDownArray.map((item) => (
          <option value={item.value}>{item.label}</option>
        ))}
      </select>

      <div className='w-full h-3/4' >
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}

export default GeoBar
