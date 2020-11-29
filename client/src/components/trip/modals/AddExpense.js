import React, { Component } from "react";
import { Button, Modal, Form, Col } from "react-bootstrap";

class AddExpense extends Component {
    constructor(props) {
        super(props);
    }

    addExpense = () => {

    }

    udpateExpense = () => {
        
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
                        <h4>{this.props.kind} Expense</h4>
                        <h5>Split a cost equally amongst Travelers</h5>
                        <Form.Row>
                            <Form.Group as={Col} controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Expense Name</Form.Label>
                                <Form.Control name="name" as="textarea" rows={1} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="exampleForm.ControlTextarea2">
                                <Form.Label>Expense Description</Form.Label>
                                <Form.Control name="description" as="textarea" rows={4} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="exampleForm.ControlTextarea3">
                                <Form.Label>Cost</Form.Label>
                                <Form.Control name="cost" as="textarea" rows={1} />
                            </Form.Group>
                        </Form.Row>
                        <br></br>
                        
                        <h5>Choose Travelers to Assign</h5>

                        <Form.Row>
                            <br></br>
                            <div key="assignedTraveler">
                                <Form.Check
                                    custom
                                    type="checkbox"
                                    name="traveler"
                                    label={"Traveler 1"}
                                    id={"Traveler 1"}
                                />
                                <Form.Check
                                    custom
                                    type="checkbox"
                                    name="traveler"
                                    label={"Traveler 2"}
                                    id={"Traveler 2"}
                                />
                            </div>
                        </Form.Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.handleClose}>Close</Button>
                        <Button onClick={this.addExpense} variant="success" type="submit">Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }
}

export default AddExpense;

