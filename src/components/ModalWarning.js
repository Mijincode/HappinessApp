import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

function ModalWarning({ isLoggedIn }) {
  const [show, setShow] = useState(!isLoggedIn);

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please login to access factors data</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" as={Link} to="/login">
            Click here to login
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalWarning;
