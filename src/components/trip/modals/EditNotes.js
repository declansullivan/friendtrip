import React, { Component } from "react";
import { Button, Modal, Form } from "react-bootstrap";

class EditNotes extends Component {
    constructor(props) {
        super(props);
    }

    updateItinerary = event => {
        event.preventDefault();
        const { text } = event.target.elements;
        const data = {
            id: this.props.id,
            itinerary: text.value,
        }

        fetch("/trip/updateItinerary", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => {
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
                animation={false}
                onHide={this.props.handleClose}
                centered
                >
                <Form onSubmit={this.updateItinerary}>
                    <Modal.Body>
                        <h4>Edit Notes</h4>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Revise notes here</Form.Label>
                            <Form.Control 
                                defaultValue={this.props.notes}
                                name="text" as="textarea" rows={6} />
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

export default EditNotes;

