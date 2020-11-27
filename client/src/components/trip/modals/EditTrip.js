import React, { Component } from "react";
import { Button, Modal, Form } from "react-bootstrap";

class EditTrip extends Component {
    constructor(props) {
        super(props);
    }

    updateTrip = () => {

    }

    render() {
        return (
            <Modal
                show={this.props.show}
                dialogClassName="modal-60w"
                aria-labelledby="contained-modal-title-vcenter"
                animation={false}
                centered
                >
                <Modal.Body>
                    <h4>Edit Trip Information</h4>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Trip Name</Form.Label>
                            <Form.Control name="name" as="textarea" rows={1} />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea2">
                            <Form.Label>Trip Description</Form.Label>
                            <Form.Control name="descripton" as="textarea" rows={4} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.handleClose}>Close</Button>
                    <Button onClick={this.updateTrip} variant="success">Save</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default EditTrip;

