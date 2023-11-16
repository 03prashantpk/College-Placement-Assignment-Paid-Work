import React, { useEffect, useState } from "react";
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler, ArcElement } from "chart.js";

ChartJS.register(Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler, ArcElement );

const Charts = ({onMaxPopulation }) => {
  const [lineChartData, setLineChartData] = useState(null);
  const [pieChartData, setPieChartData] = useState(null);

  useEffect(() => {
    setLineChartData(null);
    setPieChartData(null);

    fetch("https://datausa.io/api/data?drilldowns=Nation&measures=Population")
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.data.sort((a, b) => b.Population - a.Population);
        const top5Years = sortedData.slice(0, 5);
        const maxPopulation = top5Years[0]?.Population || 0;

         // Pass the maximum population to the Home component
         onMaxPopulation(maxPopulation);

        const lineChartLabels = top5Years.map((entry) => entry.Year);
        const lineChartPopulation = top5Years.map((entry) => entry.Population);

        setLineChartData({
          labels: lineChartLabels,
          datasets: [
            {
              label: "Population",
              data: lineChartPopulation,
              fill: false,
              borderColor: "#75c9c8",
            },
          ],
        });

        const pieChartLabels = top5Years.slice(0, 3).map((entry) => entry.Year);
        const pieChartPopulation = top5Years.slice(0, 3).map((entry) => entry.Population);

        setPieChartData({
          labels: pieChartLabels,
          datasets: [
            {
              data: pieChartPopulation,
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error fetching population data:", error);
      });
  }, [onMaxPopulation]);

  const lineOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        align: 'end',
        position: 'top',
        labels: {
          usePointStyle: true,
          color: 'black',
          generateLabels: function (chart) {
            var data = chart.data;
            if (data.datasets.length) {
              var labels = ['United State', 'Dummy Population'];
              return labels.map(function (label, i) {
                var dataset = data.datasets[0];
                if(dataset){} // no use
                return {
                  text: label,
                  fillStyle: i === 0 ? '#75c9c8' : '#E9A0A0',
                  strokeStyle: 'white',
                  lineWidth: 2,
                  index: i,
                };
              });
            }
            return [];
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            var label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            label += context.formattedValue.toLocaleString();
            return label;
          },
        },
      },
    },
    spanGaps: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
        },
        ticks: {
          callback: function (value, index, values) {
            return value.toLocaleString();
          },
        },
      },
    },
  };
  const randomNumber = Math.floor(Math.random() * 3) + 25;
  
  const pieOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            var label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            label += context.formattedValue.toLocaleString() + ' Population Data';
            return label;
          },
        },
      },
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          padding: randomNumber || 22 || 23,
          generateLabels: function (chart) {
            var data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map(function (label, i) {
                var dataset = data.datasets[0];
                var dataValue = dataset.data[i];
                return {
                  text: label + '\n' + dataValue.toLocaleString(),
                  fillStyle: dataset.backgroundColor[i],
                  strokeStyle: 'white',
                  lineWidth: 2,
                  index: i,
                };
              });
            }
            return [];
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <>
      <div className="Chart">
        <div className="head">
          <div className="left">
            <p>Activities</p>
            <select name="" id="filterYear">
              <option value="May - June 2021">May - June 2021</option>
              <option value="June - June 2021">June - June 2021</option>
              <option value="July - June 2021">July - June 2021</option>
            </select>
          </div>
        </div>
        <div className="line-data">
          {lineChartData ? (
            <Line data={lineChartData} options={lineOptions} />
          ) : (
            lineChartData === null ? (
              <p>Loading...</p>
            ) : (
              <p>Something went wrong. Please try again later.</p>
            )
          )}
        </div>
      </div>

      <div className="Stats">
        <div className="top-product">
          <div className="head">
            <p>Top Product</p>
            <select name="" id="filterChartDta">
              <option value="May - June 2021">May - June 2021</option>
              <option value="June - June 2021">June - June 2021</option>
              <option value="July - June 2021">July - June 2021</option>
            </select>
          </div>

          <div className="piechart">
            {/* Pie Chart */}
            {/* Pie chart bullet labels */}
            {pieChartData ? (
              <Pie data={pieChartData} options={pieOptions} />
              ) : (
                pieChartData === null ? (
                  <p>Loading...</p>
                ) :(
                  <p>Something went wrong. Please try again later.</p>
                )
              )
            }
     
          </div>
        </div>
        <div className="Schedules">
          <div className="head">
            <p>Today's schedules</p>
            <p>
              See All <i className="fal fa-angle-right"></i>
            </p>
          </div>
          <div className="data1">
            <p>Meeting with suppliers from Kuta Bali</p>
            <p><i class="fas fa-clock"></i> 14.00-15.00</p>
            <p>at Sunset Road, Kuta, Bali </p>
          </div>
          <div className="data2">
            <p>Check operation at Giga Factory 1</p>
            <p><i class="fas fa-clock"></i> 18.00-20.00</p>
            <p>at Central Jakarta </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Charts;
