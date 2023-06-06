import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

const CircleChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options: ApexCharts.ApexOptions = {
      chart: {
        type: 'radialBar',
        height: 220,
        toolbar: {
          show: false,
        },
        fontFamily: 'Nanum Square',
      },
      series: [70],
      labels: ['증가'],
      colors: ['#006c3a'],
      title: {
        text: '지난주 대비 증감률',
        align: 'center',
        offsetY: 20,
        style: {
            fontSize: '15px',
            fontFamily: 'Nanum Square',
            color: '#006c3a'
          }
      },
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    // 컴포넌트 언마운트 시 차트 해제
    return () => {
      chart.destroy();
    };
  }, []);

  return <div ref={chartRef} />;
};

export default CircleChart;
