import React, { Component } from "react";
import { Alert, Container, Row, Col, Card } from "react-bootstrap";
import tripPageImage from "../../Media/tripPageImage.svg";
import tripIcon from "../../Media/tripIcon.svg";
import "./Trips.css";
class Trips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
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
        this.setState({ trips: res.trips });
      });
  };

  createTrip(trip) {
    return (
      <Alert
        onClick={() => this.props.callback(trip.id)}
        key={trip.id}
        className="tripThumbnail"
        variant="secondary"
      >
        <Row style={{ color: "black" }} className="align-items-center">
          <Col xs={2}>{trip.name}</Col>
          <Col xs={2}>Owner name</Col>
          <Col xs={2}>{Object.keys(trip.travelerIds).length}</Col>
          <Col>{trip.description}</Col>
        </Row>
      </Alert>
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
        <div className="trip-page-header">
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
        <Card style={{ width: "100%" }}>
          <Card.Header>
            {" "}
            <h2> My Trips </h2>{" "}
          </Card.Header>
          <Card.Body>
            <Container fluid>
              <Row>
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
