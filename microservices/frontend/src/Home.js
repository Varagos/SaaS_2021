import HomeCard from "./components/HomeCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Home = () => {
  return (
    <div>
      <h2 className="m-3">Welcome to AskMeAnything</h2>
      <Container fluid>
        <Row>
          <Col>
            <HomeCard
              body="graph / table"
              title="questions per keyword"
              linkDest="/posts"
              linkTitle="Go somewhere"
            />
          </Col>
          <Col>
            <HomeCard
              body="graph / table"
              title="question per day"
              linkDest="/posts"
              linkTitle="Go somewhere"
            />
          </Col>
          <Col>
            <HomeCard
              title="ask a new question"
              body=""
              linkDest="/create"
              linkTitle="Make question"
            />
          </Col>
          <Col>
            <HomeCard
              text="123"
              title="answer a new question"
              linkDest="/posts/page/1"
              linkTitle="Browse questions"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
