import React, { Component } from "react";
import { Button, Modal, Form, Col } from "react-bootstrap";

class AddItem extends Component {
    constructor(props) {
        super(props);
    }

    addItem = () => {

    }

    updateItem = () => {
        
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
                <Form>
                    <Modal.Body>
                        <h4>{this.props.kind} Item</h4>
                        <Form.Row>
                            <Form.Group as={Col} controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Item Name</Form.Label>
                                <Form.Control name="name" as="textarea" rows={1} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="exampleForm.ControlTextarea2">
                                <Form.Label>Item Description</Form.Label>
                                <Form.Control name="description" as="textarea" rows={4} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Check
                                custom
                                type="checkbox"
                                name="group"
                                label="Make Item public?"
                                id="group"
                            />
                        </Form.Row>
                        <Form.Row>
                            <Form.Check
                                custom
                                type="checkbox"
                                name="complete"
                                label="Has this Item been gotten?"
                                id="complete"
                            />
                        </Form.Row>
                        <br></br>
                        
                        <h5>Choose Traveler to Assign</h5>

                        <Form.Row>
                            <br></br>
                            <div key="assignedTraveler">
                                <Form.Check
                                    custom
                                    type="radio"
                                    name="traveler"
                                    label={"Traveler 1"}
                                    id={"Traveler 1"}
                                />
                                <Form.Check
                                    custom
                                    type="radio"
                                    name="traveler"
                                    label={"Traveler 2"}
                                    id={"Traveler 2"}
                                />
                            </div>
                        </Form.Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.handleClose}>Close</Button>
                        <Button onClick={this.addItem} variant="success" type="submit">Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }
}

export default AddItem;

