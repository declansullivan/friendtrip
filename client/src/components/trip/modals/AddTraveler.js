import React, { Component } from "react";
import { Button, Modal, ListGroup } from "react-bootstrap";

class AddTraveler extends Component {
    constructor(props) {
        super(props);
    }

    addTraveler = (travlerId) => {

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
                <Modal.Body>
                    <h4>Click a Friend to add to them to the Trip</h4>
                    <ListGroup>
                        <ListGroup.Item action variant="info">
                            Traveler Name - Traveler Email
                        </ListGroup.Item>
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default AddTraveler;

