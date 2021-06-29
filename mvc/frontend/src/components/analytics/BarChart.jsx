import { Bar } from 'react-chartjs-2';
import { useState } from 'react';
import dayjs from 'dayjs';
import { BsClockHistory } from 'react-icons/bs';
import PropTypes from 'prop-types';

const BarChart = ({ title, subTitle, data }) => {
  const [time, setTime] = useState(`${dayjs().hour()}:${dayjs().minute()}`);

  const backGroundColors = ['rgba(29,199,234,255)', 'rgba(251,64,75,255)'];

  const state = {
    labels: data.labels,
    datasets: data.datasets.map(({ label, data: dataArr }, idx) => ({
      label,
      data: dataArr,
      backgroundColor: backGroundColors[idx],
    })),
  };

  function handleUpdate() {
    setTime(`${dayjs().hour()}:${dayjs().minute()}`);
  }
  return (
    <div>
      <h5>{title}</h5>
      <p>{subTitle}</p>
      <br />
      <Bar
        data={state}
        options={{
          title: {
            display: true,
            text: 'Average Rainfall per month',
            fontSize: 20,
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              grid: {
                borderDash: [2, 4],
              },
            },
          },
        }}
      />
      <hr />
      <p>
        <BsClockHistory onClick={handleUpdate} /> Updated at {time}
      </p>
    </div>
  );
};

BarChart.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  data: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string),
    datasets: PropTypes.arrayOf({}),
  }).isRequired,
};

export default BarChart;
