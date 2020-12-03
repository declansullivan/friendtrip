import React, { Component } from "react";
import { Button, Modal, Form } from "react-bootstrap";

class EditTrip extends Component {
    constructor(props) {
        super(props);
    }

    updateTrip = (event) => {
        event.preventDefault();

        const { name, description } = event.target.elements;
        const data = {
            id: this.props.tripId,
            name: name.value,
            description: description.value
        }

        fetch("http://localhost:9000/trip/updateTrip", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((res) => {
                this.props.refreshTrip();
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
                animation={false}
                centered
                >
                <Form onSubmit={this.updateTrip}>
                    <Modal.Body>
                        <h4>Edit Trip Information</h4>
                        <Form.Group>
                            <Form.Label>Trip Name</Form.Label>
                            <Form.Control id="name" name="name" defaultValue={this.props.name} as="textarea" rows={1} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Trip Description</Form.Label>
                            <Form.Control id="description" name="descripton" defaultValue={this.props.description} as="textarea" rows={4} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.handleClose}>Close</Button>
                        <Button type="submit" variant="success">Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }
}

export default EditTrip;

