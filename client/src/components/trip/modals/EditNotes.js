import React, { Component } from "react";
import { Button, Modal, Form } from "react-bootstrap";

class EditNotes extends Component {
    constructor(props) {
        super(props);
    }

    updateItinerary = () => {

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
                    <h4>Edit Notes</h4>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Revise notes here</Form.Label>
                            <Form.Control name="text" as="textarea" rows={6} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.handleClose}>Close</Button>
                    <Button onClick={this.updateItinerary} variant="success">Save</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default EditNotes;

