import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BarChart from './BarChart';

const KeywordAnalyticsPage = () => {
  const barData = {
    labels: ['Keyword1', 'id2', 'id3', 'id4'],
    datasets: [
      {
        label: 'Questions',
        data: [65, 59, 80, 81],
      },
    ],
  };

  return (
    <>
      <Row />
      <Row>
        <Col md={8} className='bg-white rounded'>
          <BarChart
            title='Keywords Usage'
            subTitle='Total questions of top 20 keywords'
            data={barData}
          />
        </Col>
      </Row>
    </>
  );
};
export default KeywordAnalyticsPage;
