import React, { Component } from "react";
import { Button, Modal, Form, Col } from "react-bootstrap";

class AddExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      render: false,
      travelers: [],
    };
  }

  addExpense = (event) => {
    event.preventDefault();
    const { name, description, cost, traveler } = event.target.elements;
    let assignedTravelers = [];
    let numOfTravelers = this.props.travelerIds.length;
    if(numOfTravelers === 1) {
      assignedTravelers.push(traveler.value);
    }
    else {
      for (let i = 0; i < this.props.travelerIds.length; i++) {
        if (traveler[i].checked) assignedTravelers.push(traveler[i].value);
      }
    }
    const data = {
      expenseName: name.value,
      description: description.value,
      cost: cost.value,
      travelerId: this.props.travelerId,
      tripId: this.props.tripId,
      assignedTravelers: assignedTravelers,
    };
    console.log(data);
    fetch("http://localhost:9000/expense/addExpense", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      this.props.refreshTrip(this.props.refreshExpense);
    });
  };


  // Gets Travelers on the Trip
  getTravelersJSON = () => {
    fetch("http://localhost:9000/trip/getTravelers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ travelerIds: this.props.travelerIds }),
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({ travelers: res.travelers, render: true });
      });
  };

  componentDidMount() {
    this.getTravelersJSON();
  }

  // Create Traveler Radio
  createTraveler = (traveler) => {
    const name = traveler.firstName + " " + traveler.lastName;
    return (
      <Form.Check
        custom
        type="checkbox"
        name="traveler"
        label={name}
        id={`#${traveler.id}`}
        key={traveler.id}
        value={traveler.id}
      />
    );
  };

  // Render Traveler(s) Radio
  renderTravelers = () => {
    if (!this.state.travelers || this.state.travelers.length === 0) return;
    var travelersJSX = [];
    for (const traveler of this.state.travelers) {
      travelersJSX.push(this.createTraveler(traveler));
    }
    return travelersJSX;
  };

  render() {
    if (!this.state.render) return <div></div>;
    return (
      <Modal
        show={this.props.show}
        dialogClassName="modal-60w"
        aria-labelledby="contained-modal-title-vcenter"
        onHide={this.props.handleClose}
        animation={false}
        centered
      >
        <Form onSubmit={this.addExpense} className="p-3">
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
                {this.renderTravelers()}
              </div>
            </Form.Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" type="submit">
              Save
            </Button>
            <Button onClick={this.props.handleClose}>Close</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

export default AddExpense;
