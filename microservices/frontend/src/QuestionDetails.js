import { useHistory, useParams } from "react-router";
import { connect } from "react-redux";
import { getQuestion, deleteQuestion } from "./actions/questionActions";
import useFetch from "./useFetch";
import Comment from "./components/Comment";
import axios from "axios";

const QuestionDetails = (props) => {
  // pas id from ReactRouter Params
  const { id } = useParams();
  const {
    data: question,
    error,
    isPending,
  } = useFetch(`http://localhost:3004/posts/${id}?_embed=comments`);

  const history = useHistory();

  const handleDelete = (questionId) => {
    console.log("delete called", questionId);
    props.deleteQuestion(questionId);
    history.push("/");
  };

  const handleAddComment = () => {
    axios
      .post("http://localhost:3004/comments", {
        postId: id,
        email: "test@example.com",
        body: "a comment body?",
      })
      .then((res) => console.log(res.data));
  };

  return (
    <div className="content">
      <div className="blog-details">
        {isPending && <div>Loading... </div>}
        {error && <div>{error} </div>}
        {question && (
          <article>
            <h2>{question.title}</h2>
            <p>
              Written by
              {question.author}
            </p>
            <div>{question.body}</div>
            <button onClick={handleDelete.bind(this, id)}>Delete</button>
            <div className="TO-BE-IMPLEMENTED">
              {/*{commentIsPending && <p>Loading comments...</p>}*/}
              {/*{commentError && <p> Unable to load comments ...</p>}*/}
              {question.comments &&
                question.comments.map((comment) => (
                  <Comment
                    key={comment.id}
                    body={comment.body}
                    author={comment.email}
                  />
                ))}
            </div>
            <button onClick={handleAddComment}>comment</button>
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
