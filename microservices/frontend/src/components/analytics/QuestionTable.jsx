import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';

const QuestionTable = ({ data }) => {
  const { labels } = data;
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Date</th>
          <th># of Questions</th>
          {/* <th># of Answers</th> */}
        </tr>
      </thead>
      <tbody>
        {labels.map((label, idx) => (
          <tr key={label}>
            <td>{label}</td>
            <td>{data.datasets[0].data[idx]}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

QuestionTable.propTypes = {
  data: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string),
    datasets: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.number),
      })
    ),
  }).isRequired,
};

export default QuestionTable;
