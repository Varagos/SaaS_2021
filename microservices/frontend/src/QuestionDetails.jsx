import { useHistory, useParams } from 'react-router';
import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ConfirmationModal from './components/ConfirmationModal';
import NewComment from './components/NewComment';
import Comment from './components/Comment';
import {
  getQuestion as getQuestionConnect,
  deleteQuestion as deleteQuestionConnect,
  deleteComment as deleteCommentConnect,
} from './actions/questionActions';
import NotFound from './NotFound';

dayjs.extend(relativeTime);

const QuestionDetails = ({
  question,
  questionLoading,
  user,
  error,
  getQuestion,
  deleteQuestion,
  deleteComment,
}) => {
  // pas id from ReactRouter Params
  const { id } = useParams();

  const history = useHistory();

  useEffect(() => {
    getQuestion(id);
  }, []);

  const handleDelete = (questionId) => {
    deleteQuestion(questionId);
    history.push(`/posts/page/1`);
  };

  return (
    <Container className='my-5 pt-3'>
      <div className='blog-details'>
        {questionLoading && <div>Loading... </div>}
        {error.status && (
          <div>{error.status === 404 ? <NotFound /> : error.msg}</div>
        )}
        {question && (
          <article>
            <div className='p-3 mb-5 rounded bg-light'>
              <h3 className='mb-3'>{question.title}</h3>
              <div className='mt-4 mb-5'>
                {' '}
                <p> {question.text} </p>{' '}
              </div>

              <ListGroup horizontal='sm' className='my-3'>
                {question.keywords.map(
                  ({ keyword_id: keywordId, description }) => (
                    <Button
                      key={keywordId}
                      variant='outline-dark'
                      className='mr-2'
                      size='sm'
                      as={Link}
                      to={`/posts/page/1?keywords[]=${keywordId}`}
                    >
                      {description}
                    </Button>
                  )
                )}
              </ListGroup>
              <div className='d-flex p-0 m-0'>
                <div>
                  <small>
                    Asked by {question.user.email}{' '}
                    <em>{dayjs(question.date).fromNow()}</em>
                  </small>
                </div>

                {user?.user_id === question.user.user_id && (
                  <div className='ml-auto'>
                    <ConfirmationModal
                      title='Delete question'
                      objectId={parseInt(id, 10)}
                      deleteFunc={handleDelete}
                    />
                  </div>
                )}
              </div>
            </div>

            {question.comments.map((comment) => (
              <Comment
                key={comment.comment_id}
                id={comment.comment_id}
                body={comment.text}
                author={comment.user}
                date={comment.date}
                userId={user?.user_id}
                deleteFunc={deleteComment}
              />
            ))}
            <div className='mt-5'>
              <NewComment questionId={parseInt(id, 10)} />
            </div>
          </article>
        )}
      </div>
    </Container>
  );
};

QuestionDetails.propTypes = {
  question: PropTypes.shape({
    question_id: PropTypes.number,
    title: PropTypes.string,
    text: PropTypes.string,
    date: PropTypes.string,
    user: PropTypes.shape({
      user_id: PropTypes.number,
      email: PropTypes.string,
    }),
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        comment_id: PropTypes.number,
        text: PropTypes.string,
        date: PropTypes.string,
        user: PropTypes.shape({
          user_id: PropTypes.number,
          email: PropTypes.string,
        }),
      })
    ),
    keywords: PropTypes.arrayOf(
      PropTypes.shape({
        keyword_id: PropTypes.number,
        description: PropTypes.string,
      })
    ),
  }),
  questionLoading: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    user_id: PropTypes.number,
    email: PropTypes.string,
  }),
  error: PropTypes.shape({
    msg: PropTypes.string,
    status: PropTypes.number,
    id: PropTypes.string,
  }),
  getQuestion: PropTypes.func.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

QuestionDetails.defaultProps = {
  question: null,
  user: null,
  error: PropTypes.shape({
    msg: null,
    status: null,
    id: null,
  }),
};

const mapStateToProps = (state) => ({
  question: state.question.question,
  questionLoading: state.question.loading,
  user: state.auth.user,
  error: state.error,
});

export default connect(mapStateToProps, {
  getQuestion: getQuestionConnect,
  deleteQuestion: deleteQuestionConnect,
  deleteComment: deleteCommentConnect,
})(QuestionDetails);
