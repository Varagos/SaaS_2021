import { useHistory, useParams } from "react-router";
import { connect } from "react-redux";
import { getQuestion, deleteQuestion } from "./actions/questionActions";
import Comment from "./components/Comment";
import React, {useEffect} from "react";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import NewComment from "./components/NewComment";

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
            <h2>{question.title}</h2>
              <p>
                  <small>
                      Asked{" "}
                      <em>
                          {dayjs(question.date).fromNow() }
                      </em>
                  </small>
              </p>

            <div><p>{question.text}</p></div>
              <div style={{display: 'block'}} >
              <small >
                  Written by{" "}
                   {question.user.email}
              </small>
              </div>
            <button onClick={handleDelete.bind(this, id)}>Delete</button>
            <div className="TO-BE-IMPLEMENTED">
              {/*{commentIsPending && <p>Loading comments...</p>}*/}
              {/*{commentError && <p> Unable to load comments ...</p>}*/}
              {question.comments &&
                question.comments.map((comment) => (
                  <Comment
                    key={comment.comment_id}
                    body={comment.text}
                    author={comment.user.email}
                    date={comment.date}
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
});

export default connect(mapStateToProps, { getQuestion, deleteQuestion })(
  QuestionDetails
);
