import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import Data from '../Assets/Manufac _ India Agro Dataset.json';
import './BarChart.css'

// Define TypeScript interface for crop data
interface CropData {
  Country: string;
  Year: string;
  "Crop Name": string;
  "Crop Production (UOM:t(Tonnes))": number | string;
  "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": number | string;
  "Area Under Cultivation (UOM:Ha(Hectares))": number | string;
}

// Ensure data is an array of CropData
const cropsData: CropData[] = Data;

// Aggregate crop production by crop name and calculate average
const aggregateCropData = (data: CropData[]) => {
  const cropAggregation: { [key: string]: { total: number; count: number } } = {};

  data.forEach(crop => {
    if (crop["Crop Production (UOM:t(Tonnes))"] !== "" && !isNaN(Number(crop["Crop Production (UOM:t(Tonnes))"]))) {
      const cropName = crop["Crop Name"];
      const production = Number(crop["Crop Production (UOM:t(Tonnes))"]);

      if (!cropAggregation[cropName]) {
        cropAggregation[cropName] = { total: 0, count: 0 };
      }

      cropAggregation[cropName].total += production;
      cropAggregation[cropName].count += 1;
    }
  });

  // Calculate the average production for each crop
  const averageProduction = Object.entries(cropAggregation).map(([cropName, { total, count }]) => ({
    cropName,
    averageProduction: total / count,
  }));

  return averageProduction;
};

// Prepare data for the bar chart
const aggregatedData = aggregateCropData(cropsData);

const BarChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);

      // Set up the chart options
      const option = {
        title: {
          text: 'Average Crop Production per Crop',
          subtext: 'Average production for each crop over the years',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: aggregatedData.map(item => item.cropName),
          axisLabel: {
            rotate: 45, // Rotate labels to avoid overlap
          },
        },
        yAxis: {
          type: 'value',
          name: 'Average Production (tonnes)',
        },
        series: [
          {
            data: aggregatedData.map(item => item.averageProduction),
            type: 'bar',
            itemStyle: {
              color: '#4CAF50', // Bar color
            },
          },
        ],
      };

      chart.setOption(option);

      // Resize chart when window size changes
      window.addEventListener('resize', chart.resize);

      // Cleanup on component unmount
      return () => {
        window.removeEventListener('resize', chart.resize);
        chart.dispose();
      };
    }
  }, [aggregatedData]);

  return (
    <div>
      <div ref={chartRef} className='barchart'></div>
    </div>
  );
};

export default BarChart;
