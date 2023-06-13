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
        }
      ],
      xaxis: {
        categories: ["2W", "1W", "NOW"],
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
    plotOptions: {
      bar: {
        colors: {
          ranges: [
            {
              from: 0,
              to: 9,
              color: '#E6E6E6',
            },
            {
              from: 10,
              to: 12,
              color: '#E6E6E6',
            },
            {
              from: 13,
              to: 15,
              color: '#33A771',
            },
          ],
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: false
    }
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

export default WeeklyChart;
