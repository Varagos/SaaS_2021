import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DatePicker from 'react-date-picker';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs';
import { BsFillFunnelFill } from 'react-icons/bs';
import TagInput from './TagInput';

const Filter = ({ keywords }) => {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // Pass down state to TagInput child
  const [tags, setTags] = useState([]);
  const history = useHistory();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();
  };

  const keywordsSubmit = (e) => {
    e.preventDefault();
    console.log(tags);
    const queryRaw = tags.reduce(
      (accum, curr) => `${accum}keywords[]=${curr.id}&`,
      '?'
    );
    const query = queryRaw.slice(0, -1); // Remove last character

    // handleClose();
    history.push(`/posts/page/1${query}`);
  };

  const datesSubmit = (e) => {
    e.preventDefault();
    const start = dayjs(startDate).format('YYYY-MM-DD');
    const end = dayjs(endDate).format('YYYY-MM-DD');
    const query = `?start=${start}&end=${end}`;
    history.push(`/posts/page/1${query}`);
    // handleClose();
  };

  const suggestion = keywords.map(({ keyword_id: keywordId, description }) => ({
    id: keywordId,
    name: description,
  }));

  return (
    <>
      <div className='d-flex flex-row-reverse'>
        <Button
          variant='info'
          onClick={() => setOpen(!open)}
          aria-controls='collapse-input'
          aria-expanded={open}
        >
          <BsFillFunnelFill /> Filter
        </Button>
      </div>
      <Collapse in={open}>
        <div
          id='collapse-input'
          className='my-4 p-3 border border-secondary rounded-top'
        >
          <Container>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col className='border-right'>
                  <h5>Sort by</h5>
                  <p className='mb-0 mt-2'>Start Date:</p>
                  <DatePicker
                    onChange={setStartDate}
                    value={startDate}
                    format='dd-MM-y'
                  />
                  <p className='mb-0 mt-2'>End Date:</p>
                  <DatePicker
                    onChange={setEndDate}
                    value={endDate}
                    minDate={startDate}
                    format='dd-MM-y'
                  />
                  <br />
                  <Button
                    className='mt-3 mr-5'
                    variant='info'
                    type='submit'
                    onClick={datesSubmit}
                  >
                    Sort by Dates
                  </Button>
                </Col>
                <Col>
                  <h5>Tagged with</h5>
                  <TagInput
                    tags={tags}
                    setTags={setTags}
                    keywords={suggestion}
                    includeDescription={false}
                  />
                  <p>
                    <small>
                      <em>Select from existing tags</em>
                    </small>
                  </p>
                  <br />
                  <Button
                    className='mt-3 mr-5'
                    variant='info'
                    type='submit'
                    onClick={keywordsSubmit}
                  >
                    Sort by Tags
                  </Button>
                </Col>
              </Row>
            </Form>
          </Container>
        </div>
      </Collapse>
    </>
  );
};

Filter.propTypes = {
  keywords: PropTypes.arrayOf(
    PropTypes.shape({
      keyword_id: PropTypes.number,
      description: PropTypes.string,
    })
  ).isRequired,
};

export default Filter;
