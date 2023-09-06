import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { DateTime } from "luxon";

const MonthlyDosageChart = ({ data }) => {
    // const monthlyDosageData = [
    //     {
    //         month: '2023-01',
    //         takenDosage: 20,
    //         missedDosage: 5,
    //     },
    //     {
    //         month: '2023-02',
    //         takenDosage: 18,
    //         missedDosage: 8,
    //     },
    //     {
    //         month: '2023-03',
    //         takenDosage: 22,
    //         missedDosage: 3,
    //     },
    //     {
    //         month: '2023-04',
    //         takenDosage: 17,
    //         missedDosage: 6,
    //     },
    //     {
    //         month: '2023-05',
    //         takenDosage: 19,
    //         missedDosage: 4,
    //     },
    //     {
    //         month: '2023-06',
    //         takenDosage: 21,
    //         missedDosage: 2,
    //     },
    //     {
    //         month: '2023-07',
    //         takenDosage: 16,
    //         missedDosage: 7,
    //     },
    //     {
    //         month: '2023-08',
    //         takenDosage: 23,
    //         missedDosage: 1,
    //     },
    //     {
    //         month: '2023-09',
    //         takenDosage: 20,
    //         missedDosage: 5,
    //     },
    //     {
    //         month: '2023-10',
    //         takenDosage: 18,
    //         missedDosage: 8,
    //     },
    //     {
    //         month: '2023-11',
    //         takenDosage: 22,
    //         missedDosage: 3,
    //     },
    //     {
    //         month: '2023-12',
    //         takenDosage: 17,
    //         missedDosage: 6,
    //     },
    // ];
   

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
            data: data?data.monthly.map(item => ({
                x: item.month?  DateTime.fromISO(item.month).toFormat('MMM yyyy'):"",
                y: item.missed,
              })):[],
            },
            {
                name: 'On Time Doses',
                data: data?data.monthly.map(item => ({
                    x: item.month? DateTime.fromISO(item.month).toFormat('MMM yyyy'):"",
                    y: item.taken,
                  })):[],
          },
        ],
        // series:[]
      });
    

    return (
        <div id="monthly-dosage-chart">
            <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="bar"
                height={300}
            />
        </div>
    );
};

export default MonthlyDosageChart;
