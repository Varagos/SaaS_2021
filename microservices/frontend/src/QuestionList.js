import { Link } from "react-router-dom";
import useFetch from "./useFetch";

const QuestionList = () => {
  const {
    data: blogs,
    isPending,
    error,
  } = useFetch("https://jsonplaceholder.typicode.com/posts");

  return (
    <>
      {error && <div>{error}</div>}
      {isPending && <div>Loading... </div>}
      {blogs && (
        <div className="content">
          <div className="blog-list">
            <h2>Question List</h2>
            {blogs.map((blog) => (
              <div className="blog-preview" key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>
                  <h2>{blog.title}</h2>
                  <p>
                    Written by
                    {blog.author}
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

export default QuestionList;
