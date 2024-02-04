'use client';

// import ReactApexChart from 'react-apexcharts';

import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

type ChartPropType = {
  type: 'line' | 'area';
  height: string | number;
  options: {};
  series: { name: string; data: number[][] }[];
};

const Chart = ({ type, height, options, series }: ChartPropType) => {
  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type={type}
        height={height || 350}
        width={'100%'}
        id={'chart'}
      />
    </div>
  );
};

export default Chart;
