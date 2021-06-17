import { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

const DateForm = ({ submitAction }) => {
  const [form, setForm] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  // In case start or end date was left as default
  function confirmDateFormat(myDate) {
    return new Date(myDate).toISOString().slice(0, 10);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const start = confirmDateFormat(form.startDate);
    const end = confirmDateFormat(form.endDate);
    // Reset hook
    setForm({
      startDate: new Date(),
      endDate: new Date(),
    });
    submitAction(start, end);
  }

  return (
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
          value={form.endDate}
          onChange={handleChange}
        />
      </InputGroup>
      <Button type='submit' className='mb-2' onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
};

DateForm.propTypes = {
  submitAction: PropTypes.func.isRequired,
};

export default DateForm;
