import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AddProductForm from '../AddProductForm/AddProductForm';
import './AddProduct.css';

//eslint-disable-next-line
const AddProduct = ({ open, setOpen }) => {
  const [show, setShow] = useState(false);
  const [submited, setSubmited] = useState(false);

  const handleClose = () => {
    setShow(false);
    setOpen(false);
  };
  const handleShow = () => {
    setShow(true);
    setOpen(true);
  };

  useEffect(() => {
    if (open) {
      handleShow();
    } else {
      handleClose();
    }
  }, [open]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      dialogClassName='modal-size'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      id='add-product-modal'
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddProductForm submited={submited} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
        <Button variant='primary' onClick={() => setSubmited(true)}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddProduct;
