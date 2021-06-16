import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import { InputGroup } from 'react-bootstrap';
import LineChart from './LineChart';
import BarChart from './BarChart';
import QuestionTable from './QuestionTable';

const QuestionAnalyticsPage = () => {
  const [form, setForm] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const lineData = {
    labels: [
      '13/07',
      '23/08',
      '29/10',
      '21/11',
      '02/12',
      '03/03',
      '04/04',
      '05/05',
    ],
    datasets: [
      {
        label: '# of Questions',
        data: [300, 190, 300, 500, 200, 300, 757, 441],
      },
      {
        label: '# of Answers',
        data: [340, 290, 550, 740, 290, 380, 657, 441],
      },
    ],
  };
  const barData = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'Mai',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        label: 'Questions',
        data: [65, 59, 80, 81, 56, 43, 32, 20, 40, 50, 60, 75],
      },
      {
        label: 'Answers',
        data: [165, 89, 101, 307, 120, 60, 22, 25, 40, 55, 90, 115],
      },
    ],
  };
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (form.endDate < form.startDate) {
      alert('End date must be greater than start date.');
    }
    console.log(form);
  }

  return (
    <>
      <Form inline className='my-3'>
        <Form.Label htmlFor='startDate' srOnly>
          Start Date
        </Form.Label>
        <InputGroup className='mb-2 mr-sm-2'>
          <InputGroup.Prepend>
            <InputGroup.Text>Start date</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            id='startDate'
            type='date'
            name='startDate'
            value={form.startDate}
            onChange={handleChange}
          />
        </InputGroup>
        <Form.Label htmlFor='endDate' srOnly>
          End Date
        </Form.Label>
        <InputGroup className='mb-2 mr-sm-2'>
          <InputGroup.Prepend>
            <InputGroup.Text>End date</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            id='endDate'
            type='date'
            name='endDate'
            value={form.startDate}
            onChange={handleChange}
          />
        </InputGroup>
        <Button type='submit' className='mb-2' onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
      <Row>
        <Col sm={12} md={6} className='bg-white rounded mb-3'>
          <LineChart title='Questions Per Day' data={lineData} />
        </Col>
        <Col sm={12} md={5} className='bg-white rounded mb-3 ml-auto'>
          <BarChart
            title='Avg Questions/Answers'
            subTitle='12 month basis'
            data={barData}
          />
        </Col>
      </Row>
      <Row>
        <QuestionTable />
      </Row>
    </>
  );
};
export default QuestionAnalyticsPage;
