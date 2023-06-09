import React, { useEffect, useRef, useState } from 'react';
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

const DoubleLineChart: React.FC<HomeElement> = (props) => {
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
          name: '어제',
          data: [null, props.chartData.yesterday.nine, props.chartData.yesterday.twelve, props.chartData.yesterday.fifteen, props.chartData.yesterday.eighteen, props.chartData.yesterday.twentyOne, null],
          color: '#E6E6E6',
        },
        {
          name: '오늘',
          data: [null, props.chartData.today.nine, props.chartData.today.twelve, props.chartData.today.fifteen, props.chartData.today.eighteen, props.chartData.today.twentyOne, null],
          color: '#33A771',
        },    
      ],
      xaxis: {
        categories: ['', "9h", "12h", "15h", "18h", "21h", ''],
        axisTicks: {
          show: false, // Y축 눈금선 숨기기
        },
        axisBorder: {
          show: false,
        }
      },
      yaxis: {
        labels: {
          show: false, // y축 데이터 설명 숨김
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false, // 범례 숨김
      },
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    // 컴포넌트 언마운트 시 차트 해제
    return () => {
      chart.destroy();
    };
  }, [graphWidth, props.chartData]);

  return <div ref={chartRef} />;
};

export default DoubleLineChart;
