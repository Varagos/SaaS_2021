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

dayjs.extend(relativeTime)

const QuestionDetails = (props) => {
  // pas id from ReactRouter Params
  const { id } = useParams();
  const error = false
  const isPending = false

  const history = useHistory();

  useEffect(() => {
      props.getQuestion(id)

  },[])

  const handleDelete = (questionId) => {
    console.log("delete called", questionId);
    props.deleteQuestion(questionId);
    history.push("/");
  };



  const { question, loading } = props.question
  console.log(loading)
  console.log(question)

  return (
    <div className="content">
      <div className="blog-details">
        {isPending && <div>Loading... </div>}
        {error && <div>{error} </div>}
        {question && (
          <article>
              <div className="pb-5">
            <h2>{question.title}</h2>

            <div><p>{question.text}</p></div>
               <div className="d-flex p-0 m-0">
                   <div>
                  <p>
                    <small>
                      Asked by {question.user.email} {" "}
                      <em>
                        {dayjs(question.date).fromNow() }
                      </em>
                    </small>
                  </p>
                   </div>
                 {props.user?.user_id === question.user.user_id &&

                 <div className="ml-auto">
                   {/*<Button className="ml-auto pt-0" variant="link" onClick={handleClick}>Delete</Button>*/}
                   <ConfirmationModal title="Delete question" objectId={id} deleteFunc={handleDelete}/>
                 </div>
                 }
               </div>
              </div>


            <div className="TO-BE-IMPLEMENTED">
              {/*{commentIsPending && <p>Loading comments...</p>}*/}
              {/*{commentError && <p> Unable to load comments ...</p>}*/}
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
            </div>
              <NewComment questionId={id}/>
          </article>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  question: state.question,
  user: state.auth.user
});

export default connect(mapStateToProps, { getQuestion, deleteQuestion,deleteComment })(
  QuestionDetails
);
