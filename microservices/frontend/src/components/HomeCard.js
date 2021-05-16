import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function HomeCard({ title, body, linkDest, linkTitle }) {
  return (
    <Card bg="light" text="dark" style={{ width: "18rem" }} className="mb-2">
      <Card.Img variant="top" src="https://picsum.photos/200" />
      <Card.Header>Header</Card.Header>
      <Card.Body>
        <Card.Title> {title} </Card.Title>
        <Card.Text>{body}</Card.Text>
        <Button variant="primary" as={Link} to={linkDest}>
          {linkTitle}
        </Button>
      </Card.Body>
    </Card>
  );
}
