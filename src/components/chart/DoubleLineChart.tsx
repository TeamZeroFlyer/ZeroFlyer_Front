import React, { useEffect, useRef, useState } from 'react';
import ApexCharts from 'apexcharts';

const DoubleLineChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [graphWidth, setGraphWidth] = useState(window.innerWidth >= 768 ? 768 - 80 : window.innerWidth - 80);
  window.addEventListener('resize', ()=>{setGraphWidth(window.innerWidth >= 768 ? 768 - 80 : window.innerWidth - 80)});
  useEffect(() => {
    const options: ApexCharts.ApexOptions = {
      chart: {
        type: 'line',
        height: 180,
        width: graphWidth,
        toolbar: {
          show: false,
        },
        fontFamily: 'Nanum Square',
      },
      series: [
        {
          name: '이번주',
          data: [null, 9, 12, 15, 18, 21, null],
          color: '#006C3A',
        },        
        {
          name: '지난주',
          data: [null, 30, 40, 35, 50, 49, null],
          color: '#6c0000',
        },
      ],
      xaxis: {
        categories: ['', "9시", "12시", "15시", "18시", "21시", ''],
      },
      dataLabels: {
        enabled: true,
      },
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    // 컴포넌트 언마운트 시 차트 해제
    return () => {
      chart.destroy();
    };
  }, [graphWidth]);

  return <div ref={chartRef} />;
};

export default DoubleLineChart;
