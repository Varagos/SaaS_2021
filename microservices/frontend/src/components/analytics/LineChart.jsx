import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { BsClockHistory } from 'react-icons/bs';
import dayjs from 'dayjs';
import { useState } from 'react';

const LineChart = ({ title, subTitle, data }) => {
  const [time, setTime] = useState(`${dayjs().hour()}:${dayjs().minute()}`);

  const backgroundColor = ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'];

  const borderColor = ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'];
  const state = {
    labels: data.labels,
    datasets: data.datasets.map(({ label, data: dataArr }, idx) => ({
      label,
      data: dataArr,
      backgroundColor: backgroundColor[idx],
      borderColor: borderColor[idx],
    })),
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    tension: 0.2,
  };

  function handleUpdate() {
    setTime(`${dayjs().hour()}:${dayjs().minute()}`);
  }

  return (
    <div>
      <h5>{title}</h5>
      <p>
        <small>{subTitle}</small>{' '}
      </p>
      <br />
      <Line data={state} options={options} />
      <hr />

      <p>
        <BsClockHistory onClick={handleUpdate} /> Updated at {time}
      </p>
    </div>
  );
};

LineChart.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  data: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string),
    datasets: PropTypes.arrayOf({}),
  }).isRequired,
};

export default LineChart;
