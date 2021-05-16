import { useState } from "react";
import { useHistory } from "react-router-dom";
import TagInput from "./components/TagInput";
import { connect } from "react-redux";
import { addQuestion } from "./actions/questionActions";

const Create = (props) => {
  const [question, setQuestion] = useState({
    title: "",
    body: "",
  });

  //Pass down state to TagInput child
  const [tags, setTags] = useState([
    { id: 184, name: "Thailand" },
    { id: 86, name: "India" },
  ]);
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    setQuestion((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const post = { ...question, userId: 1 };
    console.log("post", post);
    console.log("keywords: ", tags);
    setIsPending(true);

    // Add question addQuestion action
    props.addQuestion(post);

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(post),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("new blog added");
        console.log(json);
        setIsPending(false);

        // history.go(-1);
        history.push("/");
      })
      .catch((err) => console.log(err));
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
          name="body"
          value={question.body}
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

const mapStateToProps = (state) => ({
  question: state.question,
});

export default connect(mapStateToProps, { addQuestion })(Create);
