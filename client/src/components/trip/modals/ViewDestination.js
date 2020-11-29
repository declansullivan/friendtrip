import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";

import AddDestination from "./AddDestination";

class ViewDestination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddDestination: false,
        }

        this.openAddDestinationModal = this.openAddDestinationModal.bind(this);
        this.closeAddDestinationModal = this.closeAddDestinationModal.bind(this);
    }

    closeAddDestinationModal = () => {
        this.setState({showAddDestination: false});
    }

    openAddDestinationModal = () => {
        this.props.handleClose();
        this.setState({showAddDestination: true});
    }

    render() {
        return (
            <div>
                <AddDestination kind="Edit" show={this.state.showAddDestination} handleClose={this.closeAddDestinationModal}>
                </AddDestination>

                <Modal
                    show={this.props.show}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    onHide={this.props.handleClose}
                    animation={false}
                    centered
                    >
                    <Modal.Body>
                        <h4>Destination Name</h4>
                        <hr></hr>
                        <h5>Destination description</h5>
                        Start Date to End Date
                        <br></br>
                        Address
                        <br></br>
                        Maybe put a Google Map thing here using address?
                        <hr></hr>
                        <h5>Useful Information</h5>
                        This is where scraped stuff would go



                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.handleClose}>Close</Button>
                        <Button onClick={this.openAddDestinationModal}>Edit</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default ViewDestination;

