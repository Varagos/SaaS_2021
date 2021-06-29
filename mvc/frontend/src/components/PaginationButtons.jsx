import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';
import PropTypes from 'prop-types';

const PaginationButtons = ({ first, current, last }) => {
  const range = (max) => {
    if (!max) return [];
    // [1, 2, 3, 4 ... ]
    return Array(max)
      .fill(0)
      .map((_, i) => i + 1);
  };

  const limit = 2;
  const pagesArr = range(last);

  const path = '/posts/page/';

  return (
    <Pagination>
      <Button
        variant='outline-secondary'
        as={Link}
        to={current !== first ? `${path}${current - 1}` : '#'}
      >
        {'<'}
      </Button>
      {current - limit > first && (
        <Button variant='outline-secondary' as={Link} to={`${path}${first}`}>
          {first}
        </Button>
      )}
      {current - limit - 1 > first && <Pagination.Ellipsis disabled />}

      {pagesArr.map((ind) =>
        Math.abs(current - ind) <= limit ? (
          <Button
            key={ind}
            variant={ind !== current ? 'outline-secondary' : 'outline-primary'}
            active={ind === current}
            as={Link}
            to={`${path}${ind}`}
          >
            {ind}
          </Button>
        ) : (
          <></>
        )
      )}
      {current + limit + 1 < last && <Pagination.Ellipsis disabled />}
      {current + limit < last && (
        <Button variant='outline-secondary' as={Link} to={`${path}${last}`}>
          {last}
        </Button>
      )}
      <Button
        variant='outline-secondary'
        as={Link}
        to={current !== last ? `${path}${current + 1}` : '#'}
      >
        {'>'}
      </Button>
    </Pagination>
  );
};

PaginationButtons.propTypes = {
  first: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  last: PropTypes.number.isRequired,
};

export default PaginationButtons;
