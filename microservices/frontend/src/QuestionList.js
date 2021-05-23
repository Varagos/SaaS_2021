import { useEffect } from "react";
import {useHistory, useParams} from "react-router";
import { Link} from "react-router-dom";
import { connect } from "react-redux";
import { getQuestionsPage} from "./actions/questionActions";
import PropTypes from "prop-types";
import PageButtons from "./components/PageButtons";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";

const QuestionList = (props) => {
  const { id } = useParams();

  const history = useHistory()

  //Instead of componentDidMount
  useEffect(() => {
    if (!props.isAuthenticated && id !== '1')  history.push('/login')
    if ( id < 1) history.push('/posts/page/1')

    // Perhaps new action getPage here instead?
    props.getQuestionsPage(id);

  }, [id]);

  const { questions } = props.question
  return (
    <>
    <Container fluid="sm" className="mt-5 p-3">
        {props.error.status && <div>{props.error.msg}</div>}
      {props.loading && <div>Loading... </div>}
      {props.question.questions && (
          <>
            <h2 className="pl-3">Question List</h2>
            {questions.map((question) => (
              <div className="blog-preview" key={question.question_id}>
                <Link to={props.isAuthenticated? `/posts/${question.question_id}` : '#'}>
                  <h2>{question.title}</h2>
                  <p className="text-truncate">{question.text}</p>
                  <p>
                    <ListGroup horizontal={'sm'}>
                      {question.keywords.map(({keyword_id, description}) =>
                      <ListGroup.Item as='div' key={keyword_id}>{description}</ListGroup.Item>)}
                    </ListGroup>
                  </p>
                </Link>
              </div>
            ))}
          </>
      )}
        {props.isAuthenticated && <div className="pl-3"><PageButtons first={1} current={id} last={props.question.lastPage}/></div>}
    </Container>
    </>
  );
}

QuestionList.propTypes = {
  getQuestionsPage: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  question: state.question,
  loading: state.question.loading,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { getQuestionsPage})(QuestionList);
