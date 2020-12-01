import React, { Component } from "react";
import { Button, Modal, Form, Col } from "react-bootstrap";

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      render: false,
      travelers: [],
    };
  }

  editItem = (event) => {

  }

  addItem = (event) => {
    event.preventDefault();
    const {
      name,
      description,
      group,
      complete,
      traveler,
    } = event.target.elements;
    let assignedTraveler = !group.checked ? this.props.travelerId : traveler.value;
    const data = {
      id: this.defaultValue("id"),
      itemName: name.value,
      itemDescription: description.value,
      isPublic: group.checked,
      isComplete: complete.checked,
      assignedTraveler: assignedTraveler,
      travelerId: this.props.travelerId,
      tripId: this.props.tripId,
    };

    console.log(assignedTraveler);

    const addItemAPI = "http://localhost:9000/item/addItem";
    const editItemAPI = "http://localhost:9000/item/editItem";
    const fetchAPI = (this.props.kind === "Add") ? addItemAPI : editItemAPI;

    fetch(fetchAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      this.props.refreshTrip();
      this.props.handleClose();
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

  // Create Traveler Radio
  createTraveler = (traveler) => {
    const name = traveler.firstName + " " + traveler.lastName;
    const checked = traveler.id === this.defaultValue("assignee");
    return (
      <Form.Check
        custom
        type="radio"
        name="traveler"
        label={name}
        id={`#${traveler.id}`}
        key={traveler.id}
        value={traveler.id}
        defaultChecked={checked}
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

  defaultValue = (param) => {
    if (!this.props.item) return "";
    else return this.props.item[param];
  }

  componentDidMount() {
    this.getTravelersJSON();
  }

  render() {
    if (!this.state.render) return <div></div>;

    const isCheckedOff = this.defaultValue("isComplete");
    const isPublic = this.defaultValue("isPublic");

    return (
      <Modal
        show={this.props.show}
        dialogClassName="modal-60w"
        aria-labelledby="contained-modal-title-vcenter"
        onHide={this.props.handleClose}
        animation={false}
        centered
      >
        <Form onSubmit={this.addItem} className="p-3">
          <Modal.Body>
            <h4>{this.props.kind} Item</h4>
            <Form.Row className="m-0 p-0">
              <Form.Group
                as={Col}
                className="m-0 p-0"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Item Name</Form.Label>
                <Form.Control defaultValue={this.defaultValue("name")} name="name" as="textarea" rows={1} />
              </Form.Group>
            </Form.Row>
            <Form.Row className="m-0 p-0">
              <Form.Group
                as={Col}
                className="m-0 p-0"
                controlId="exampleForm.ControlTextarea2"
              >
                <Form.Label>Item Description</Form.Label>
                <Form.Control defaultValue={this.defaultValue("description")} name="description" as="textarea" rows={4} />
              </Form.Group>
            </Form.Row>
            <Form.Row className="m-0 p-0">
              <Form.Check
                custom
                type="checkbox"
                name="group"
                label="Make Item public?"
                id="group"
                defaultChecked={isPublic}
              />
            </Form.Row>
            <Form.Row className="m-0 p-0">
              <Form.Check
                custom
                type="checkbox"
                name="complete"
                label="Has this Item been gotten?"
                id="complete"
                defaultChecked={isCheckedOff}
              />
            </Form.Row>
            <br></br>

            <h5>Choose Traveler to Assign</h5>

            <Form.Row className="m-0 p-0">
              <br></br>
              <div key="assignedTraveler">
                {this.renderTravelers()}
              </div>
            </Form.Row>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.handleClose}>Close</Button>
            <Button variant="success" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

export default AddItem;
