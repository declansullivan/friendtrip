import React, { Component } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

import Travelers from "./Travelers";
import Notes from "./Notes";
import Destinations from "./Destinations";
import Items from "./Items";
import Expenses from "./Expenses";

import ConfirmDelete from "./modals/ConfirmDelete";
import ConfirmLeave from "./modals/ConfirmLeave";
import EditTrip from "./modals/EditTrip";
import AddItem from "./modals/AddItem";
import AddExpense from "./modals/AddExpense";

import Fade from "react-reveal/Fade";
import tripIcon from "../../Media/tripIcon.svg";
import "../../Stylesheets/Trip.css";

class Trip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      render: false,
      showDeleteTrip: false,
      showLeaveTrip: false,
      showEditTrip: false,
      showAddItem: false,
      tripData: {},
    };

    // Handle modal visibility
    this.openDeleteTripModal = this.openDeleteTripModal.bind(this);
    this.closeDeleteTripModal = this.closeDeleteTripModal.bind(this);

    this.closeLeaveTripModal = this.closeLeaveTripModal.bind(this);
    this.openLeaveTripModal = this.openLeaveTripModal.bind(this);

    this.openEditTripModal = this.openEditTripModal.bind(this);
    this.closeEditTripModal = this.closeEditTripModal.bind(this);

    this.openAddItemModal = this.openAddItemModal.bind(this);
    this.closeAddItemModal = this.closeAddItemModal.bind(this);

  }

  // Handle modal visibility
  closeDeleteTripModal = () => {
    this.setState({ showDeleteTrip: false });
  };

  openDeleteTripModal = () => {
    this.setState({ showDeleteTrip: true });
  };

  closeLeaveTripModal = () => {
    this.setState({ showLeaveTrip: false });
  };

  openLeaveTripModal = () => {
    this.setState({ showLeaveTrip: true });
  };

  closeEditTripModal = () => {
    this.setState({ showEditTrip: false });
  };

  openEditTripModal = () => {
    this.setState({ showEditTrip: true });
  };

  closeAddItemModal = () => {
    this.setState({ showAddItem: false });
  };

  openAddItemModal = () => {
    this.setState({ showAddItem: true });
  };

  // Retrieve all releveant data
  getTripJSON = (callback) => {
    fetch("http://localhost:9000/trip/getTrip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tripId: this.props.tripId }),
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({ tripData: res.trip, render: true });
        if(callback) callback();
      });
  };

  // Returns id of current user (Similar to Email, but without the dot)
  getUserId = () => {
    return localStorage.getItem("id");
  };

  // True if user is Trip Leader, Otherwise false.
  isTripLeader = () => {
    return this.state.tripData.tripLeaders.includes(this.getUserId());
  };

  isTripOwner = () => {
    return this.state.tripData.travelerId === this.props.traveler.id;
  }

  // Delete Trip Button [Only visible to Trip Leaders, includes Trip Owner]
  showDeleteTrip = () => {
    if (this.isTripLeader())
      return (
        <Button
          variant="danger"
          className="float-right"
          onClick={this.openDeleteTripModal}
        >
          Delete Trip
        </Button>
      );
  };

  // Leave Trip Button [Only visible to Travlers that are not the Trip Owner]
  showLeaveTrip = () => {
    if (!this.isTripOwner()) {
      return (
        <Button
          variant="warning"
          className="float-right ml-1"
          onClick={this.openLeaveTripModal}
        >
          Leave Trip
        </Button>
      );
    }
  };

  refreshTripJSON = (callback) => {
    this.getTripJSON(callback);
  };

  componentDidMount() {
    this.getTripJSON();
  }

  render() {
    if (!this.state.render) return <div></div>;
    if (!this.state.tripData.id) this.refreshTripJSON();
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
        <ConfirmDelete
          tripId={this.state.tripData.id}
          travelerIds={this.state.tripData.travelerIds}
          itemIds={this.state.tripData.itemIds}
          expenseIds={this.state.tripData.expenseIds}
          history={this.props.history}
          show={this.state.showDeleteTrip}
          refreshTrip={this.refreshTripJSON}
          redirectTrip={this.props.redirectTrip}
          handleClose={this.closeDeleteTripModal}
        ></ConfirmDelete>
        <ConfirmLeave
          tripId={this.state.tripData.id}
          travelerId={this.props.traveler.id}
          isTripLeader={this.isTripLeader}
          history={this.props.history}
          show={this.state.showLeaveTrip}
          refreshTrip={this.refreshTripJSON}
          redirectTrip={this.props.redirectTrip}
          handleClose={this.closeLeaveTripModal}
        ></ConfirmLeave>
        <EditTrip
          show={this.state.showEditTrip}
          handleClose={this.closeEditTripModal}
        ></EditTrip>

        <Card className="trip-list w-100">
          <Card.Header className="trip-list-header">
            <h2>{this.state.tripData.name}</h2>
          </Card.Header>
          <Card.Body className="p-4">
            <h5 className="pl-3">{this.state.tripData.description}</h5>
            <hr className="mr-3 ml-3"></hr>
            <Container fluid>
              <Row>
                <Col>
                  <Notes
                    id={this.state.tripData.id}
                    notes={this.state.tripData.itinerary}
                    refreshTrip={this.refreshTripJSON}
                  />
                </Col>
              </Row>
              <br></br>

              <Row>
                <Col>
                  <Destinations
                    destinationIds={this.state.tripData.destinationIds}
                    refreshTrip={this.refreshTripJSON}
                  />
                </Col>
              </Row>
              <br></br>

              <Row>
                <Col xs={8}>
                  <Items
                    travelerId={this.props.traveler.id}
                    travelerIds={this.state.tripData.travelerIds}
                    tripId={this.state.tripData.id}
                    itemIds={this.state.tripData.itemIds}
                    category="Group"
                    refreshTrip={this.refreshTripJSON}
                  />
                  <Items
                    travelerId={this.props.traveler.id}
                    travelerIds={this.state.tripData.travelerIds}
                    tripId={this.state.tripData.id}
                    itemIds={this.state.tripData.itemIds}
                    category="Personal"
                    refreshTrip={this.refreshTripJSON}
                  />
                  <Expenses
                    travelerId={this.props.traveler.id}
                    travelerIds={this.state.tripData.travelerIds}
                    tripId={this.state.tripData.id}
                    expenseIds={this.state.tripData.expenseIds}
                    refreshTrip={this.refreshTripJSON}
                  />
                </Col>
                <Col>
                  <Travelers
                    id={this.state.tripData.id}
                    travelerIds={this.state.tripData.travelerIds}
                    friendIds={this.props.traveler.friendIds}
                    isTripLeader={this.isTripLeader}
                  />
                </Col>
              </Row>

              <Row>
                <Col>
                  <Button onClick={this.openEditTripModal}>Edit Trip</Button>
                  {this.showLeaveTrip()}
                  {this.showDeleteTrip()}
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Trip;
