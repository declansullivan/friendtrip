import React, { Component } from "react";
import { Button, Modal, Form, Col } from "react-bootstrap";

class EditUsername extends Component {
  constructor(props) {
    super(props);
  }
  updateUsername = event => {
    event.preventDefault();
    const {username} = event.target.elements;
    const data = {
        travelerId: this.props.traveler.id,
        username: username.value,
    }
    
    fetch("/account/editAccount", {
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
        <Form onSubmit={this.updateUsername}>
          <Modal.Body>
            <h4>Edit Username</h4>
            <Form.Row>
              <Form.Group as={Col} controlId="exampleForm.ControlTextarea1">
                <Form.Label>Username</Form.Label>
                <Form.Control defaultValue={this.props.traveler.username} name="username" as="textarea" rows={1} />
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

export default EditUsername;
