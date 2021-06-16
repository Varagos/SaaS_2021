import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LineChart from './LineChart';

const UserAnalyticsPage = () => {
  const data = {
    labels: [
      '9:00AM',
      '12:00AM',
      '3:00PM',
      '6:00PM',
      '9:00PM',
      '12:00PM',
      '3:00PM',
      '6:00PM',
    ],
    datasets: [
      {
        label: '# of Questions',
        data: [300, 190, 300, 500, 200, 300, 757, 441],
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
      {
        label: '# of Answers',
        fill: false,
        data: [340, 290, 550, 740, 290, 380, 657, 441],
        backgroundColor: 'rgb(54, 162, 235)',
        borderColor: 'rgba(54, 162, 235, 0.2)',
      },
    ],
  };

  return (
    <>
      <Row>
        <Col md={8} className='bg-white rounded'>
          <LineChart
            title='Users Behavior'
            subTitle='24 Hours Performance'
            data={data}
          />
        </Col>
      </Row>
    </>
  );
};
export default UserAnalyticsPage;
