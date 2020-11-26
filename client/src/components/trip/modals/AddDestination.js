import React, { Component } from "react";
import { Button, Modal, Form, Col } from "react-bootstrap";

class AddDestination extends Component {
    constructor(props) {
        super(props);
    }

    addDestination = () => {

    }

    updateDestination = () => {
        
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
                <Form>
                    <Modal.Body>
                        <h4>{this.props.kind} Destination</h4>
                        <Form.Row>
                            <Form.Group as={Col} controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Destination Name</Form.Label>
                                <Form.Control name="name" as="textarea" rows={1} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="exampleForm.ControlTextarea2">
                                <Form.Label>Destination Description</Form.Label>
                                <Form.Control name="description" as="textarea" rows={4} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="exampleForm.ControlTextarea3">
                                <Form.Label>Start Date (dd/mm/yyyy)</Form.Label>
                                <Form.Control name="start" as="textarea" rows={1} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="exampleForm.ControlTextarea4">
                                <Form.Label>End Date (dd/mm/yyyy)</Form.Label>
                                <Form.Control name="end" as="textarea" rows={1} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="exampleForm.ControlTextarea2">
                                <Form.Label>Destination Address</Form.Label>
                                <Form.Control name="address" as="textarea" rows={2} />
                            </Form.Group>
                        </Form.Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.handleClose}>Close</Button>
                        <Button onClick={this.addDestination} variant="success" type="submit">Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }
}

export default AddDestination;

