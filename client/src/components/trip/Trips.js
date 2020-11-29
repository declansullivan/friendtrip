import React, { Component } from "react";
import { Container, Row, Col, Card, ListGroup, Button } from "react-bootstrap";
import tripPageImage from "../../Media/tripPageImage.svg";
import tripIcon from "../../Media/tripIcon.svg";
import "../../Stylesheets/Trips.css";

class Trips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
      owners: {},
    };
  }

  getTripsJSON = () => {
    fetch("http://localhost:9000/trip/getTrips", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tripIds: this.props.tripIds }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.trips);
        this.setState({ trips: res.trips });
        this.getOwnerNames();
      });
  };

  getOwnerIds = () => {
    var owners = [];
    for (const trip of this.state.trips) {
      owners.push(trip.travelerId);
    }
    return owners;
  };

  getOwnerNames = () => {
    fetch("http://localhost:9000/trip/getTravelers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ travelerIds: this.getOwnerIds() }),
    })
      .then((res) => res.json())
      .then((res) => {
        const owners = {};
        for (const traveler of res.travelers) {
          owners[traveler.id] = traveler.firstName + " " + traveler.lastName;
        }
        this.setState({ owners });
      });
  };

  createTrip(trip) {
    const ownerName = this.state.owners[trip.travelerId];
    return (
        <ListGroup.Item
          className="d-inline-block w-80"
          key={trip.id}
          action
          onClick={() => this.props.callback(trip.id)}
        >
          <Row
            style={{ color: "black" }}
            className="align-items-center text-center"
          >
            <Col xs={2}>{trip.name}</Col>
            <Col xs={2}>{ownerName}</Col>
            <Col xs={2}>{Object.keys(trip.travelerIds).length}</Col>
            <Col>{trip.description}</Col>
          </Row>
        </ListGroup.Item>
    );
  }

  renderTrips() {
    if (!this.state.trips) return;

    var tripsJSX = [];
    for (const trip of this.state.trips) {
      tripsJSX.push(this.createTrip(trip));
    }
    return tripsJSX;
  }

  componentDidMount() {
    this.getTripsJSON();
  }

  render() {
    return (
      <div className="w-100 h-100">
        <div className="trips-page-header">
          <img
            src={tripIcon}
            width="40"
            height="40"
            className="d-inline-block align-top mr-2"
            alt="tripIcon"
            id="tripIcon"
          />
          <h1 className="d-inline-block">
            <strong> Trips</strong>
          </h1>
        </div>

        <hr></hr>

        {/* TRIP INVITATIONS */}
        <Card className="trips-list" style={{ width: "100%" }}>
          <Card.Header className="trips-list-header">
            <h2> Trip Invitations </h2>
          </Card.Header>
          <Card.Body>
            <Container fluid>
              <Row className="m-0 text-center">
                <Col xs={2}>
                  <h5>Inviter</h5>
                </Col>
                <Col xs={2}>
                  <h5>Trip Name</h5>
                </Col>
                <Col xs={5}>
                  <h5>Description</h5>
                </Col>
                <Col></Col>
              </Row>

              {/* Need to programmatically create rows. */}
              <Row className="trips-invite m-0 text-center p-1">
                <Col xs={2}>Username</Col>
                <Col xs={2}>Trip Name</Col>
                <Col xs={5}>Trip Description</Col>
                <Col>
                  <Button variant="success">Accept</Button>{" "}
                  <Button className="ml-3" variant="danger">
                    Decline
                  </Button>
                </Col>
              </Row>

              {/* Need to programmatically create rows. */}
              <Row className="trips-invite m-0 text-center p-1">
                <Col xs={2}>Username</Col>
                <Col xs={2}>Trip Name</Col>
                <Col xs={5}>Trip Description</Col>
                <Col>
                  <Button variant="success">Accept</Button>{" "}
                  <Button className="ml-3" variant="danger">
                    Decline
                  </Button>
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>

        {/* VIEW MY TRIPS */}
        <Card className="trips-list mt-3" style={{ width: "100%" }}>
          <Card.Header className="trips-list-header">
            <h2> My Trips </h2>
          </Card.Header>
          <Card.Body>
            <Container fluid>
              <Row className="m-0 text-center">
                <Col xs={2}>
                  <h5>Trip Name</h5>
                </Col>
                <Col xs={2}>
                  <h5>Owner</h5>
                </Col>
                <Col xs={2}>
                  <h5>Members</h5>
                </Col>
                <Col>
                  <h5>Description</h5>
                </Col>
              </Row>
              {this.renderTrips()}
            </Container>
          </Card.Body>
        </Card>
        <img
          src={tripPageImage}
          width="40%"
          className="d-inline-block page-background-image"
          alt="tripPageImage"
          id="tripPageImage"
        />
      </div>
    );
  }
}

export default Trips;
