import Card from "react-bootstrap/Card";
export default function Comment({ body, author }) {
  const today = new Date();
  console.log(today.toJSON().slice(0, 10));
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <small className="text-muted">Written by {author}</small>
        </Card.Title>
        <Card.Text>{body}</Card.Text>
        <Card.Text>
          <small className="text-muted font-italic">10 mins ago</small>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
