import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link, useLocation } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import queryString from 'query-string';
import PaginationButtons from './components/PaginationButtons';
import Filter from './components/Filter';
import { getQuestionsPage as getQuestionsPageAction } from './actions/questionActions';
import { getKeywords as getKeywordsAction } from './actions/keywordActions';
import ErrorHandler from './components/ErrorHandler';
import QuestionLoader from './components/QuestionLoader';

const QuestionList = ({
  questions,
  questionsLoading,
  lastPage,
  isAuthenticated,
  error,
  getQuestionsPage,
  keywords,
  getKeywords,
}) => {
  const { id } = useParams();

  const { search } = useLocation();
  const location = useLocation();
  const {
    keywords: keywordParams,
    start,
    end,
  } = queryString.parse(search, {
    arrayFormat: 'bracket',
  });
  console.log('START', start, 'END', end);

  const history = useHistory();
  useEffect(() => {
    getKeywords();
  }, []);

  // Triggered on every useLocation change
  useEffect(() => {
    if (!isAuthenticated && id !== '1') history.push('/login');
    if (id < 1) history.push('/posts/page/1');

    // Perhaps new action getPage here instead?
    getQuestionsPage(id, keywordParams, start, end);
  }, [location]);

  return (
    <>
      <Container fluid='sm' className='mt-5 p-3'>
        {questionsLoading && !error.status && <QuestionLoader />}
        {error.status && <ErrorHandler msg={error.msg} status={error.status} />}
        {questions && !questionsLoading && !error.status && (
          <>
            {isAuthenticated && <Filter keywords={keywords} />}
            {!isAuthenticated && (
              <Alert variant='warning'>
                You need to login before accessing questions
              </Alert>
            )}
            <h2 className='pl-3'>All Questions</h2>
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
  keywords: PropTypes.arrayOf(
    PropTypes.shape({
      keyword_id: PropTypes.number,
      description: PropTypes.string,
    })
  ).isRequired,
  getKeywords: PropTypes.func.isRequired,
};

QuestionList.defaultProps = {
  isAuthenticated: null,
  lastPage: null,
};

const mapStateToProps = (state) => ({
  questions: state.question.questions,
  questionsLoading: state.question.loading,
  lastPage: state.question.lastPage,
  keywords: state.keyword.keywords,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, {
  getQuestionsPage: getQuestionsPageAction,
  getKeywords: getKeywordsAction,
})(QuestionList);
