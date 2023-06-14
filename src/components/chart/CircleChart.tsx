import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

interface HomeElement {
  "chartData" : {
    "yesterday": {
        "nine": number,
        "twelve": number,
        "fifteen": number,
        "eighteen": number,
        "twentyOne": number,
    },
    "today": {
        "nine": number,
        "twelve": number,
        "fifteen": number,
        "eighteen": number,
        "twentyOne": number,
    },
    "percent": number,
    "first_week": number,
    "second_week": number,
    "third_week": number,
  }
}

const CircleChart: React.FC<HomeElement> = (props) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const perc = Math.round(props.chartData.percent);
    const result = perc >= 0 ? perc+'%↑' : perc+'%↓';

  
    const options: ApexCharts.ApexOptions = {
      chart: {
        type: 'radialBar',
        height: 220,
        toolbar: {
          show: false,
        },
        fontFamily: 'Nanum Square',
      },
      series: [Math.abs(perc)],
      labels: [result],
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
  }, [props.chartData.percent]);

  return <div ref={chartRef} />;
};

export default CircleChart;
