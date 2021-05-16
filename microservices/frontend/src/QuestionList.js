import { Link } from "react-router-dom";
//import useFetch from "./useFetch";
import { connect } from "react-redux";
import { getQuestions } from "./actions/questionActions";
import PropTypes from "prop-types";
import { useEffect } from "react";

const QuestionList = (props) => {
  // const {
  //   data: questions,
  //   setData: setQuestions,
  //   isPending,
  //   error,
  // } = useFetch("https://jsonplaceholder.typicode.com/posts");
  const error = false;
  const isPending = false;

  //Instead of componentDidMount
  useEffect(() => {
    props.getQuestions();
  }, []);

  return (
    <>
      {error && <div>{error}</div>}
      {isPending && <div>Loading... </div>}
      {props.question.questions && (
        <div className="content">
          <div className="blog-list">
            <h2>Question List</h2>
            {props.question.questions.map((question) => (
              <div className="blog-preview" key={question.id}>
                <Link to={`/blogs/${question.id}`}>
                  <h2>{question.title}</h2>
                  <p>
                    Written by
                    {question.author}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

QuestionList.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired,
};

/*
  Map action to component property
  and redux state to component property
  It's called question in our root Reducer
*/
const mapStateToProps = (state) => ({
  question: state.question,
});

export default connect(mapStateToProps, { getQuestions })(QuestionList);
