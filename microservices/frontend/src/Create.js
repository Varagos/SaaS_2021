import {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import TagInput from "./components/TagInput";
import { connect } from "react-redux";
import { addQuestion } from "./actions/questionActions";
import { loadUser } from "./actions/authActions";
import PropTypes from 'prop-types'

const Create = (props) => {
  const [question, setQuestion] = useState({
    title: "",
    text: "",
  });

  //Pass down state to TagInput child
  const [tags, setTags] = useState([
    { id: 184, name: "Thailand" },
    { id: 86, name: "India" },
  ]);
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  useEffect(() => props.loadUser(),[])

  const handleChange = (event) => {
    const { name, value } = event.target
    setQuestion((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const stringKeywords = tags.map(x => x.name)
    const post = { ...question, keywords: stringKeywords};
    console.log("post", post);
    console.log("keywords: ", tags);
    console.log(stringKeywords)
    setIsPending(true);

    props.addQuestion(post);
    history.push('/')
  };


  return (
    <div className="create">
      <h2 className="p-3 m-3">Make a new question</h2>
      <form onSubmit={handleSubmit}>
        <label>Question title:</label>
        <input
          type="text"
          className="create-input"
          name="title"
          value={question.title}
          onChange={handleChange}
          required
        />
        <label>Question body:</label>
        <textarea
          type="text"
          className="create-textarea"
          name="text"
          value={question.text}
          onChange={handleChange}
          required
        />
        <label>Keywords:</label>
        <TagInput tags={tags} setTags={setTags} />

        {!isPending && <button className="create-button">Add question</button>}
        {isPending && (
          <button className="create-button" disabled>
            Adding... question
          </button>
        )}
      </form>
    </div>
  );
};
Create.propTypes = {
  addQuestion: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  question: PropTypes.object,
}

const mapStateToProps = (state) => ({
  question: state.question,
});

export default connect(mapStateToProps, { addQuestion, loadUser })(Create);
