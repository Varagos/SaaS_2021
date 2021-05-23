import { useHistory, useParams } from "react-router";
import { connect } from "react-redux";
import { getQuestion, deleteQuestion } from "./actions/questionActions";
import { deleteComment } from "./actions/commentActions";
import Comment from "./components/Comment";
import React, {useEffect} from "react";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import NewComment from "./components/NewComment";
import ConfirmationModal from "./components/ConfirmationModal";
import ListGroup from "react-bootstrap/ListGroup";
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import NotFound from "./NotFound";

dayjs.extend(relativeTime)

const QuestionDetails = (props) => {
  // pas id from ReactRouter Params
  const { id } = useParams();

  const history = useHistory();

  useEffect(() => {
      props.getQuestion(id)

  },[])

  const handleDelete = (questionId) => {
    console.log("delete called", questionId);
    props.deleteQuestion(questionId);
    history.push(`/posts/page/1`);
  };


  const { question, loading } = props.question
    const { error } = props

  return (
      <Container className="my-5 pt-3">
      <div className="blog-details">
        {loading && <div>Loading... </div>}
        {error.status &&
        <div>
            {error.status === 404? <NotFound /> : error.msg}
        </div>}
        {question && (
          <article>
            <div className="p-3 mb-5 rounded bg-light">
              <h3 className="mb-3">{question.title}</h3>
              <div className="mt-4 mb-5"> <p> {question.text} </p> </div>

              <ListGroup horizontal={'sm'} className="my-3">
                {question.keywords.map(({keyword_id, description}) =>
                    <Button key={keyword_id} variant="outline-dark" className="mr-2" size="sm" >
                      {description}
                    </Button>) }
              </ListGroup>
              <div className="d-flex p-0 m-0">
                <div>
                    <small>
                      Asked by {question.user.email} {" "}
                      <em>
                        {dayjs(question.date).fromNow() }
                      </em>
                    </small>
                </div>

                 {props.user?.user_id === question.user.user_id &&
                 <div className="ml-auto">
                   <ConfirmationModal title="Delete question" objectId={id} deleteFunc={handleDelete}/>
                 </div>
                 }
               </div>
            </div>

              {question.comments &&
                question.comments.map((comment) => (
                  <Comment
                    key={comment.comment_id}
                    id={comment.comment_id}
                    body={comment.text}
                    author={comment.user}
                    date={comment.date}
                    userId={props.user?.user_id}
                    deleteFunc={props.deleteComment}
                  />
                ))}
            <div className="mt-5">
              <NewComment questionId={id}/>
            </div>
          </article>
        )}
      </div>
      </Container>
  );
};

const mapStateToProps = (state) => ({
  question: state.question,
  user: state.auth.user,
    error: state.error
});

export default connect(mapStateToProps, { getQuestion, deleteQuestion,deleteComment })(
  QuestionDetails
);
