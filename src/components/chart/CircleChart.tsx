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
      labels: ['4%↑'],
      colors: ['#33A771'],
      plotOptions: {
        radialBar: {
         
          dataLabels: {
            name: {
              offsetY: 5,
              show: true,
              color: "black",
              fontSize: "20px",
              fontWeight: "800",
            },
            value: {
              show: false
            }
          }
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
