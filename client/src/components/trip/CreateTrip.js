import React, { Component } from "react";
import { Form, Button, Col, Card, Alert } from "react-bootstrap";
import createTripImage from "../../Media/createTripImage.svg";
import { Link } from "react-router-dom";
import createTripIcon from "../../Media/createTripIcon.svg";
import "../../Stylesheets/CreateTrip.css";

class CreateTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      message: "",
      status: "",
    };
  }

  createTrip = (event) => {
    event.preventDefault();

    const { name, description } = event.target.elements;

    const travelerId = this.getUserId();
    const data = {
      travelerId: travelerId,
      travelerIds: [travelerId],
      tripLeaders: [travelerId],
      name: name.value,
      description: description.value,
    };

    name.value = "";
    description.value = "";

    fetch("http://localhost:9000/createTrip", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json()).then((res) => {
      if (res.status === 200) {
        this.addTravelerToTrip(travelerId, res.tripId);
        this.showAlert("Successfully created Trip!", "success");
      } else {
        this.showAlert("Failed to create Trip.", "danger");
      }
    });
  };

  addTravelerToTrip = (travelerId, tripId) => {
    const data = { travelerId, tripId };
    fetch("http://localhost:9000/trip/addTraveler", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      this.props.refreshTraveler();
    });
  };

  getUserId = () => {
    return localStorage.getItem("id");
  };

  showAlert = (message, status) => {
    this.setState({ message, status, visible: true }, () => {
      window.setTimeout(() => {
        this.setState({ visible: false });
      }, 2000);
    });
  };

  render() {
    return (
      <div className="w-100 h-100 ">
        <div className="createTrip-page-header">
          <img
            src={createTripIcon}
            width="40"
            height="40"
            className="d-inline-block align-top mr-2"
            alt="createTripIcon"
            id="createTripIcon"
          />
          <h1 className="d-inline-block">
            <strong> Create Trip</strong>
          </h1>
        </div>
        <hr></hr>

        <Card border="secondary" style={{ width: "100%" }}>
          <Card.Header className="createTrip-form-header">
            <h2> Create Trip Form </h2>
          </Card.Header>
          <Card.Body className="createTrip-form-body">
            <Form onSubmit={this.createTrip}>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridname">
                  <Form.Label>
                    <strong>Trip Name</strong>
                  </Form.Label>
                  <Form.Control
                    name="name"
                    type="name"
                    placeholder="Trip Name"
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridDescription">
                  <Form.Label>
                    <strong>Description</strong>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="description"
                    type="description"
                    placeholder="Trip Description"
                  />
                </Form.Group>
              </Form.Row>

              <div style={{ textAlign: "right" }}>
                <Link to="/home">
                  <Button variant="primary" type="submit">
                    Cancel
                  </Button>{" "}
                </Link>
                <Button variant="primary" type="submit">
                  Create Trip
                </Button>
              </div>
            </Form>
          </Card.Body>
          <Alert
            className="m-0"
            variant={this.state.status}
            show={this.state.visible}
            style={{ textAlign: "center" }}
          >
            {this.state.message}
          </Alert>
        </Card>
        <img
          src={createTripImage}
          width="40%"
          className="d-inline-block page-background-image mr-5"
          alt="navBarImage"
          id="navBarImage"
        />
      </div>
    );
  }
}

export default CreateTrip;
