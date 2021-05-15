import { useState } from "react";
import { useHistory } from "react-router-dom";
import { WithContext as ReactTags } from "react-tag-input";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("mario");
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };

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

  const KeyCodes = {
    comma: 188,
    enter: 13,
  };
  const delimiters = [KeyCodes.comma, KeyCodes.enter];
  const [tags, setTags] = useState([
    { id: "Thailand", text: "Thailand" },
    { id: "India", text: "India" },
  ]);
  const [suggestions] = useState([
    { id: "USA", text: "USA" },
    { id: "Germany", text: "Germany" },
    { id: "Austria", text: "Austria" },
    { id: "Costa Rica", text: "Costa Rica" },
    { id: "Sri Lanka", text: "Sri Lanka" },
    { id: "Thailand", text: "Thailand" },
  ]);
  function handleDelete(i) {
    const { tags } = this.state;
    setTags({
      tags: tags.filter((tag, index) => index !== i),
    });
  }

  function handleAddition(tag) {
    setTags((prevTags) => [...prevTags, tag]);
  }

  function handleDrag(tag, currPos, newPos) {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  }

  return (
    <div className="create">
      <h2 className="p-3 m-3">Make a new question</h2>
      <form onSubmit={handleSubmit}>
        <label>Question title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Question body:</label>
        <textarea
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />

        <label>Keywords:</label>
        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
        </select>
        <ReactTags
          tags={tags}
          suggestions={suggestions}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
          delimiters={delimiters}
        />
        {!isPending && <button>Add question</button>}
        {isPending && <button disabled>Adding... question</button>}
      </form>
    </div>
  );
};

export default Create;
