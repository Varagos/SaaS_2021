import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

export default function ConfirmationModal({ deleteFunc, objectId, title }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleConfirm = () => {
    deleteFunc(objectId);
    handleClose();
  };

  return (
    <>
      <Button className='ml-auto pt-0' variant='link' onClick={handleShow}>
        Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> {title} </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure?</Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={handleConfirm}>
            Confirm
          </Button>
          <Button variant='secondary' onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

ConfirmationModal.propTypes = {
  objectId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  deleteFunc: PropTypes.func.isRequired,
};
