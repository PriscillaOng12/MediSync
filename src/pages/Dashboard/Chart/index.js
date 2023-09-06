import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

const MedicationComplianceChart = ({data}) => {
  const [chartData, setChartData] = useState({
    options: {
        colors: ["#7ECCE7", "#366B7A"],
      chart:{
        sparkline: {
          enabled: false
        },
        toolbar:{
          show:false
        }
      },
      
      xaxis: {
        categories: [],
      },
      yaxis: {
        show: false, // Hide the y-axis
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 6,
      },
    },
    series: [
      {
        name: 'Missed Doses',
        data: data? data.weekly.map((item)=>({
          x: item.week,
          y: item.missed,
        })): [],
      },
      {
        name: 'On Time Doses',
        data: data? data.weekly.map((item)=>({
          x: item.week,
          y: item.taken,
        })): [],
      },
    ],
  });

  // useEffect(() => {
  //   // Simulated data for demonstration purposes
  //   const data = {
  //     dates: ['2023-08-01', '2023-08-02', '2023-08-03','2023-08-05', '2023-09-03','2023-10-05','2023-12-05' /* ... */],
  //     missedDoses: [2, 1, 0,2, 2, 1, /* ... */],
  //     onTimeDoses: [1, 2, 3,3 , 2, 1 /* ... */],
  //   };

  //   setChartData((prevChartData) => ({
  //     ...prevChartData,
  //     options: {
  //       ...prevChartData.options,
  //       xaxis: {
  //         categories: data.dates,
  //       },
  //     },
  //     series: [
  //       {
  //         ...prevChartData.series[0],
  //         data: data.missedDoses,
  //       },
  //       {
  //         ...prevChartData.series[1],
  //         data: data.onTimeDoses,
  //       },
  //     ],
  //   }));
  // }, []);

  return (
    <div className="medication-compliance-chart">
      <Chart options={chartData.options} series={chartData.series} type="bar" height={400} />
    </div>
  );
};

export default MedicationComplianceChart;
