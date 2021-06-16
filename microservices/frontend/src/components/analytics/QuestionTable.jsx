import Table from 'react-bootstrap/Table';

const QuestionTable = () => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>Date</th>
        <th># of Questions</th>
        <th># of Answers</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Mark</td>
        <td>Otto</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Jacob</td>
        <td>THronton</td>
      </tr>

      <tr>
        <td>3</td>
        <td>Nick</td>
        <td>Rehagel</td>
      </tr>
    </tbody>
  </Table>
);

export default QuestionTable;
