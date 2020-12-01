import React, { Component } from "react";
import { Button, Modal, Form, Col } from "react-bootstrap";

class EditName extends Component {
  constructor(props) {
    super(props);
  }

  updateName = event => {
    event.preventDefault();
    const {firstName, lastName} = event.target.elements;
    const data = {
        travelerId: this.props.traveler.id,
        firstName: firstName.value,
        lastName: lastName.value,
    }
    fetch("http://localhost:9000/account/editAccount", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((res) => {
        this.props.refreshTraveler();
        this.props.handleClose();
    });
  }

  render() {
    return (
      <Modal
        show={this.props.show}
        dialogClassName="modal-60w"
        aria-labelledby="contained-modal-title-vcenter"
        onHide={this.props.handleClose}
        centered
      >
        <Form onSubmit={this.updateName}>
          <Modal.Body>
            <h4>Edit Name</h4>
            <Form.Row>
              <Form.Group as={Col} controlId="exampleForm.ControlTextarea1">
                <Form.Label>First Name</Form.Label>
                <Form.Control defaultValue={this.props.traveler.firstName} name="firstName" as="textarea" rows={1} />
              </Form.Group>
              <Form.Group as={Col} controlId="exampleForm.ControlTextarea2">
                <Form.Label>Last Name</Form.Label>
                <Form.Control defaultValue={this.props.traveler.lastName} name="lastName" as="textarea" rows={1} />
              </Form.Group>
            </Form.Row>
          </Modal.Body>
          <Modal.Footer>
          <Button type="submit" variant="success">
              Save
            </Button>
            <Button onClick={this.props.handleClose}>Close</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

export default EditName;
