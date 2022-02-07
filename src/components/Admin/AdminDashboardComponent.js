import React, { useState } from "react";
import Chart from "react-apexcharts";

const AdminDashboardComponent = (props) => {
  const [sampleChartData, setSampleChartData] = useState({
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
      }
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }
    ]
  });

  const [sampleLineChartData, setSampleLineChartData] = useState({
    options: {
      chart: {
        height: 350,
        type: 'line',
        stacked: true,
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000
          }
        },
        dropShadow: {
          enabled: true,
          opacity: 0.2,
          blur: 3,
          left: -2,
          top: 15,
          color: '#0073e1',
        },
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
      },
      stroke: {
        curve: "smooth"
      }
    },
    series: [
      {
        name: "series-1",
        data: [30, 50, 49, 60, 70, 91, 40, 45]
      }
    ]
  });

  const [sampleRadialBarChartData, setSampleRadialBarChartData] = useState({
    options: {
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: '22px',
            },
            value: {
              fontSize: '16px',
            },
            total: {
              show: true,
              label: 'Total',
              formatter: function (w) {
                // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                return 249
              }
            }
          }
        }
      },
      labels: ['Apples', 'Oranges'],
    },
    series: [44, 67],
  });
    
  return (
    <div>
      <Chart
        options={sampleChartData.options}
        series={sampleChartData.series}
        type="bar"
        width="500"
      />
      <Chart
        options={sampleLineChartData.options}
        series={sampleLineChartData.series}
        width="500"
      />
      <Chart
        options={sampleRadialBarChartData.options}
        series={sampleRadialBarChartData.series}
        type="radialBar"
        width="500"
      />
    </div>
  );
};

export default AdminDashboardComponent;
