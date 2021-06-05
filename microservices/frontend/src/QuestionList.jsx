import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import PaginationButtons from './components/PaginationButtons';
import { getQuestionsPage as getQuestionsPageAction } from './actions/questionActions';

const QuestionList = ({
  questions,
  questionsLoading,
  lastPage,
  isAuthenticated,
  error,
  getQuestionsPage,
}) => {
  const { id } = useParams();

  const history = useHistory();

  // Instead of componentDidMount
  useEffect(() => {
    if (!isAuthenticated && id !== '1') history.push('/login');
    if (id < 1) history.push('/posts/page/1');

    // Perhaps new action getPage here instead?
    getQuestionsPage(id);
  }, [id]);

  return (
    <>
      <Container fluid='sm' className='mt-5 p-3'>
        {error.status && <div>{error.msg}</div>}
        {questionsLoading && <div>Loading... </div>}
        {questions && (
          <>
            <h2 className='pl-3'>Question List</h2>
            {questions.map((question) => (
              <div className='blog-preview' key={question.question_id}>
                <Link
                  to={isAuthenticated ? `/posts/${question.question_id}` : '#'}
                >
                  <h2>{question.title}</h2>
                  <p className='text-truncate'>{question.text}</p>
                  <ListGroup horizontal='sm'>
                    {question.keywords.map(
                      ({ keyword_id: keywordId, description }) => (
                        <ListGroup.Item as='div' key={keywordId}>
                          {description}
                        </ListGroup.Item>
                      )
                    )}
                  </ListGroup>
                </Link>
              </div>
            ))}
          </>
        )}
        {isAuthenticated && (
          <div className='pl-3'>
            <PaginationButtons
              first={1}
              current={parseInt(id, 10)}
              last={parseInt(lastPage, 10)}
            />
          </div>
        )}
      </Container>
    </>
  );
};

QuestionList.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      question_id: PropTypes.number,
      title: PropTypes.string,
      text: PropTypes.string,
      date: PropTypes.string,
      user_id: PropTypes.number,
      keywords: PropTypes.arrayOf(
        PropTypes.shape({
          keyword_id: PropTypes.number,
          description: PropTypes.string,
        })
      ),
    })
  ).isRequired,
  questionsLoading: PropTypes.bool.isRequired,
  lastPage: PropTypes.number,
  isAuthenticated: PropTypes.bool,
  error: PropTypes.shape({
    msg: PropTypes.string,
    status: PropTypes.number,
    id: PropTypes.string,
  }).isRequired,
  getQuestionsPage: PropTypes.func.isRequired,
};

QuestionList.defaultProps = {
  isAuthenticated: null,
  lastPage: null,
};

const mapStateToProps = (state) => ({
  questions: state.question.questions,
  questionsLoading: state.question.loading,
  lastPage: state.question.lastPage,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, {
  getQuestionsPage: getQuestionsPageAction,
})(QuestionList);
