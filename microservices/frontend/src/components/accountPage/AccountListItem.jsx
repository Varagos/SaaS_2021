import ListGroupItem from 'react-bootstrap/ListGroupItem';
import { Link } from 'react-router-dom';
import { BsChevronDoubleRight } from 'react-icons/bs';
import dayjs from 'dayjs';
import React from 'react';
import PropTypes from 'prop-types';

const AccountListItem = ({ id, text, date }) => (
  <ListGroupItem>
    {text}
    <div className='d-flex flex-row-reverse justify-content-between'>
      <Link class to={`/posts/${id}`}>
        <BsChevronDoubleRight />
      </Link>
      <div>
        <small>{dayjs(date).format('LLL')}</small>
      </div>
    </div>
  </ListGroupItem>
);

AccountListItem.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default AccountListItem;
