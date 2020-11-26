import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";

class ConfirmDelete extends Component {
    constructor(props) {
        super(props);
    }

    deleteTrip = () => {

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
                    <h4>Are you sure you want to delete this trip?</h4>
                    <p>
                        Deleting the trip will delete all information associated with the Trip,
                        including Items, Expenses, and Destinations.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.handleClose}>Cancel</Button>
                    <Button variant="danger" onClick={this.deleteTrip}>Delete Trip</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default ConfirmDelete;

