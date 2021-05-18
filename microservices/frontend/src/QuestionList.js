import { Link } from "react-router-dom";
//import useFetch from "./useFetch";
import { connect } from "react-redux";
import { getQuestions } from "./actions/questionActions";
import { loadUser } from "./actions/authActions";
import PropTypes from "prop-types";
import { useEffect } from "react";

const QuestionList = (props) => {
  const error = false;
  const isPending = false;

  //Instead of componentDidMount
  useEffect(() => {
    props.loadUser();
    // Perhaps new action getPage here instead?
    props.getQuestions();
  }, []);

  const { questions } = props.question

  return (
    <>
      {error && <div>{error}</div>}
      {isPending && <div>Loading... </div>}
      {props.question.questions && (
        <div className="content">
          <div className="blog-list">
            <h2>Question List</h2>
            {questions.map((question) => (
              <div className="blog-preview" key={question.question_id}>
                <Link to={props.isAuthenticated? `/posts/${question.question_id}` : '#'}>
                  <h2>{question.title}</h2>
                  <p>{question.text}</p>
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
  loadUser: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  question: state.question,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getQuestions, loadUser })(QuestionList);
