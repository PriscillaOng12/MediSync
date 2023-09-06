import React from 'react';
import Chart from 'react-apexcharts';

const medications = [
    { name: 'Medication A', totalDosage: 30, dosageTaken: 15 },
    { name: 'Medication B', totalDosage: 20, dosageTaken: 10 },
    // ... other medication objects
  ];

const MedicationCharts = () => {
  const charts = medications.map((medication) => {
    const options = {
      labels: ['Dosage Taken', 'Dosage Left'],
      plotOptions: {
        pie: {
          expandOnClick: false,
        },
      },
    };

    const series = [medication.dosageTaken, medication.totalDosage - medication.dosageTaken];

    return (
      <div key={medication.name}>
        <h2>{medication.name}</h2>
        <Chart options={options} series={series} type="pie" width="400" />
      </div>
    );
  });

  return (
    
    <div className=' grid'>
        {charts}
    </div>
  )
};

export default MedicationCharts;
