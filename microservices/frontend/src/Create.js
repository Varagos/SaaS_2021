import { useState } from "react";
import { useHistory } from "react-router-dom";
import TagInput from "./components/TagInput";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isPending, setIsPending] = useState(false);

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body };
    setIsPending(true);

    fetch("http://localhost:8000/blogs/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    }).then(() => {
      console.log("new blog added");
      setIsPending(false);

      // history.go(-1);
      history.push("/");
    });
  };

  return (
    <div className="create">
      <h2 className="p-3 m-3">Make a new question</h2>
      <form onSubmit={handleSubmit}>
        <label>Question title:</label>
        <input
          type="text"
          className="create-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label>Question body:</label>
        <textarea
          type="text"
          className="create-textarea"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />

        <label>Keywords:</label>
        <TagInput />

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

export default Create;
