import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

const WeeklyChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options: ApexCharts.ApexOptions = {
      chart: {
        type: 'bar',
        height: 180,
        toolbar: {
          show: false,
        },
        fontFamily: 'Nanum Square',
      },
      series: [
        {
          name: '총 합',
          data: [9, 12, 15],
          color: '#006C3A',
        }
      ],
      xaxis: {
        categories: ["2주전", "저번주", "이번주"],
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false, // y축 데이터 설명 숨김
        },
    }};

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    // 컴포넌트 언마운트 시 차트 해제
    return () => {
      chart.destroy();
    };
  }, []);

  return <div ref={chartRef} />;
};

export default WeeklyChart;
