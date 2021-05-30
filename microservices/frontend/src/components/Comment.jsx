import Card from 'react-bootstrap/Card';
import React from 'react';
// import Button from "react-bootstrap/Button";
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import PropTypes from 'prop-types';
import ConfirmationModal from './ConfirmationModal';

dayjs.extend(localizedFormat);

export default function Comment({
  id,
  body,
  author,
  date,
  userId,
  deleteFunc,
}) {
  return (
    <Card>
      <Card.Body className='pt-3 mt-0'>
        <Card.Title className='d-flex p-0 m-0'>
          <div>
            <small className='text-muted'>{author.email} commented </small>
          </div>
          {userId === author.user_id && (
            <div className='ml-auto'>
              <ConfirmationModal
                title='Delete comment'
                objectId={id}
                deleteFunc={deleteFunc}
              />
            </div>
          )}
        </Card.Title>
        <Card.Text className='mt-3'>{body}</Card.Text>
        <Card.Text>
          <small className='text-muted font-italic'>
            {dayjs(date).format('LLL')}
          </small>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

Comment.propTypes = {
  id: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  author: PropTypes.shape({
    user_id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  date: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  deleteFunc: PropTypes.func.isRequired,
};
