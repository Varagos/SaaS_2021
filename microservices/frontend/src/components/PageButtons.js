import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from 'react-bootstrap/Button'
import { Link} from "react-router-dom";

const PageButtons = ({first, current, last}) => {
    current = parseInt(current)
    first = parseInt(first)
    last = parseInt(last)
    const path = '/posts/page/'

    return (
    <ButtonGroup aria-label="Basic example">
        <Button variant="secondary" as={Link} to={`${path}${current-1}`}>{"<< prev"}</Button>
        <Button variant="secondary" as={Link} to={`${path}${first}`}>{first}</Button>
        <Button variant="secondary" disabled={true}>...</Button>
        <Button variant="primary" disabled={true} >{current}</Button>
        <Button variant="secondary" disabled={true}>...</Button>
        <Button variant="secondary" as={Link} to={`${path}${last}`}> {last}</Button>
        <Button variant="secondary" as={Link} to={`${path}${current+1}`}>{"next >>"}</Button>
    </ButtonGroup>
    )
}

export default PageButtons;
