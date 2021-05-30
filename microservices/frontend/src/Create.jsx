import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { getKeywords as getKeywordsAction } from './actions/keywordActions';
import { addQuestion as addQuestionAction } from './actions/questionActions';
import TagInput from './components/TagInput';

const Create = ({ keywords, getKeywords, addQuestion }) => {
  const [question, setQuestion] = useState({
    title: '',
    text: '',
  });

  // Pass down state to TagInput child
  const [tags, setTags] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [validated, setValidated] = useState(false);
  const history = useHistory();

  useEffect(() => {
    getKeywords();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setQuestion((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    if (form.checkValidity() === true) {
      const stringKeywords = tags.map((x) => x.name);
      const post = { ...question, keywords: stringKeywords };
      setIsPending(true);

      addQuestion(post);
      history.push('/');
    }
  };

  const suggestion = keywords.map(({ keyword_id: keywordId, description }) => ({
    id: keywordId,
    name: description,
  }));

  return (
    <Container fluid='sm'>
      <div className='create py-5'>
        <h2 className='py-3 my-3'>Make a new question</h2>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId='createForm.ControlInput1'>
            <Form.Label>Question title:</Form.Label>
            <Form.Control
              type='text'
              className='create-input'
              name='title'
              value={question.title}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type='invalid'>
              Title is missing
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId='createForm.ControlTextarea1'>
            <Form.Label>Question body:</Form.Label>
            <Form.Control
              as='textarea'
              type='text'
              name='text'
              value={question.text}
              onChange={handleChange}
              rows={3}
              required
            />
            <Form.Control.Feedback type='invalid'>
              Body is missing
            </Form.Control.Feedback>
          </Form.Group>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>Keywords:</label>
          <TagInput tags={tags} setTags={setTags} keywords={suggestion} />

          <Button variant='info' disabled={isPending} type='submit'>
            {isPending ? 'Adding... question' : 'Add question'}
          </Button>
        </Form>
      </div>
    </Container>
  );
};
Create.propTypes = {
  addQuestion: PropTypes.func.isRequired,
  getKeywords: PropTypes.func.isRequired,
  keywords: PropTypes.arrayOf(
    PropTypes.shape({
      keyword_id: PropTypes.number,
      description: PropTypes.string,
    })
  ).isRequired,
};

const mapStateToProps = (state) => ({
  keywords: state.keyword.keywords,
});

export default connect(mapStateToProps, {
  addQuestion: addQuestionAction,
  getKeywords: getKeywordsAction,
})(Create);
