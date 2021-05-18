import { Link } from 'react-router-dom';
import Jumbotron from "react-bootstrap/Jumbotron";

const NotFound = () => (
    <Jumbotron>
        <h1>Sorry</h1>
        <p>This page cannot be found</p>
        <Link to="/">Back to homepage</Link>
    </Jumbotron>
);

export default NotFound;
