import { useHistory, useParams } from "react-router";
import useFetch from "./useFetch";
import Comment from "./Comment";

const QuestionDetails = () => {
  // pas id from ReactRouter Params
  const { id } = useParams();
  const {
    data: question,
    error,
    isPending,
  } = useFetch(`http://jsonplaceholder.typicode.com/posts/${id}`);

  const {
    data: comments,
    error: commentError,
    isPending: commentIsPending,
  } = useFetch(`http://jsonplaceholder.typicode.com/posts/${id}/comments`);
  console.log(comments, commentIsPending, commentError);

  const history = useHistory();
  const handleClick = () => {
    fetch(`http://localhost:8000/blogs/${id}`, {
      method: "DELETE",
    }).then(() => {
      history.push("/");
    });
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
            <button onClick={handleClick}>delete</button>
            <div className="IMPLEMENT-IT">
              {comments &&
                comments.map((comment) => (
                  <Comment
                    key={comment.id}
                    body={comment.body}
                    author={comment.email}
                  />
                ))}
            </div>
            <button onClick={handleClick}>comment</button>
          </article>
        )}
      </div>
    </div>
  );
};

export default QuestionDetails;
