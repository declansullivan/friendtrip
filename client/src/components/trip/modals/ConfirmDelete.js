import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";

class ConfirmDelete extends Component {
  constructor(props) {
    super(props);
  }

  deleteTrip = (event) => {
      event.preventDefault();
      const data = {
        tripId: this.props.tripId,
        travelerIds: this.props.travelerIds,
        itemIds: this.props.itemIds,
        expenseIds: this.props.expenseIds,
      };
      fetch("http://localhost:9000/trip/deleteTrip", {
          method: "DELETE",
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
          <h4>Are you sure you want to delete this Trip?</h4>
          <hr></hr>
            <p>
            Deleting the trip will delete all information associated with the
            Trip, including Items, Expenses, and Destinations.
            </p>
          <hr></hr>
          <Button className="float-right ml-1" variant="warning" onClick={this.props.handleClose}>Cancel</Button>
          <Button className="float-right" variant="danger" onClick={this.deleteTrip}>
            Delete Trip
          </Button>
        </Modal.Body>
      </Modal>
    );
  }
}

export default ConfirmDelete;
