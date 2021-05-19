import Button from 'react-bootstrap/Button'
import { Link} from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination'

const PageButtons = ({first, current, last}) => {
    const range = (max) => {
        const arr = Array(max)
            .fill(0)
            .map((_, i) => i + 1)
        return arr
    }

    current = parseInt(current)
    first = parseInt(first)
    last = parseInt(last)
    const limit = 2;
    const pagesArr = range(last)

    const path = '/posts/page/'

    return (
        <Pagination>
            <Button
                variant={"outline-secondary"}
                as={Link}
                to={ current !== first ?`${path}${current-1}`: "#"}
            >
                {"<"}
            </Button>
            {(current - limit) > first && <Button variant={"outline-secondary"} as={Link} to={`${path}${first}`}>{first}</Button>}
            {(current - limit - 1) > first && <Pagination.Ellipsis disabled={true}/>}

            {pagesArr.map(ind =>
                (Math.abs(current - ind) <= limit )?
                    <Button
                        key={ind}
                        variant={ind !== current ? "outline-secondary": "outline-primary"}
                        active={ind === current}
                        as={Link}
                        to={`${path}${ind}`}
                    >
                        {ind}
                    </Button> : <></>
            )}
            {(current + limit + 1) < last && <Pagination.Ellipsis disabled={true}/>}
            {(current + limit) < last && <Button variant={"outline-secondary"} as={Link} to={`${path}${last}`}>{last}</Button>}
            <Button
                variant={"outline-secondary"}
                as={Link}
                to={current !== last ? `${path}${current+1}`:"#"}
            >
                {">"}
            </Button>
        </Pagination>
    )

}

export default PageButtons;
