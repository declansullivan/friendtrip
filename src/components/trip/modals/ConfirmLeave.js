import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";

class ConfirmLeave extends Component {
  constructor(props) {
    super(props);
  }

  leaveTrip = (event) => {
      event.preventDefault();
      const data = {
        tripId: this.props.tripId,
        travelerId: this.props.travelerId,
        isTripLeader: this.props.isTripLeader(),
      };
      fetch("/trip/leaveTrip", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
      }).then((res) => {
          this.props.redirectTrip();
      });
  };

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
          <h4>Are you sure you want to leave this Trip?</h4>
          <hr></hr>
            <p>
            Leaving the trip will remove yourself from the information associated with the
            Trip, including Items, Expenses, and Destinations.
            </p>
          <hr></hr>
          <Button className="float-right ml-1" variant="warning" onClick={this.props.handleClose}>Cancel</Button>
          <Button className="float-right" variant="danger" onClick={this.leaveTrip}>
            Leave Trip
          </Button>
        </Modal.Body>
      </Modal>
    );
  }
}

export default ConfirmLeave;
