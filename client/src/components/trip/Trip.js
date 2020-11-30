import React, { Component } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

import Travelers from "./Travelers";
import Notes from "./Notes";
import Destinations from "./Destinations";
import Items from "./Items";
import Expenses from "./Expenses";

import ConfirmDelete from "./modals/ConfirmDelete";
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
      showEditTrip: false,
      showAddItem: false,
      showAddExpense: false,
      tripData: {},
    };

    // Handle modal visibility

    this.openDeleteTripModal = this.openDeleteTripModal.bind(this);
    this.closeDeleteTripModal = this.closeDeleteTripModal.bind(this);

    this.openEditTripModal = this.openEditTripModal.bind(this);
    this.closeEditTripModal = this.closeEditTripModal.bind(this);

    this.openAddItemModal = this.openAddItemModal.bind(this);
    this.closeAddItemModal = this.closeAddItemModal.bind(this);

    this.openAddExpenseModal = this.openAddExpenseModal.bind(this);
    this.closeAddExpenseModal = this.closeAddExpenseModal.bind(this);
  }

  // Handle modal visibility
  closeDeleteTripModal = () => {
    this.setState({ showDeleteTrip: false });
  };

  openDeleteTripModal = () => {
    this.setState({ showDeleteTrip: true });
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

  closeAddExpenseModal = () => {
    this.setState({ showAddExpense: false });
  };

  openAddExpenseModal = () => {
    this.setState({ showAddExpense: true });
  };

  // Retrieve all releveant data
  getTripJSON = () => {
    fetch("http://localhost:9000/trip/getTrip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tripId: this.props.tripId }),
    }).then((res) => res.json()).then((res) => {
      this.setState({ tripData: res.trip, render: true });
    });
  };

  getUserId = () => {
    return localStorage.getItem("id");
  };

  isTripLeader = () => {
    return this.state.tripData.tripLeaders.includes(this.getUserId())
  }

  showDeleteTrip = () => {
    if (this.isTripLeader())
      return (
        <Button
          variant="danger"
          style={{ float: "right" }}
          onClick={this.openDeleteTripModal}
        >
          Delete Trip
        </Button>
      )
  }

  refreshTripJSON = () => {
    this.getTripJSON();
  };

  componentDidMount() {
    this.getTripJSON();
  }

  render() {
    if (!this.state.render) return <div></div>;
    if (!this.state.tripData.id) this.refreshTripJSON();
    return (
      //   <Fade>
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
          history={this.props.history}
          show={this.state.showDeleteTrip}
          refreshTrip={this.refreshTripJSON}
          renderOnDeleteTrip={this.props.renderOnDeleteTrip}
          handleClose={this.closeDeleteTripModal}
        ></ConfirmDelete>
        <EditTrip
          show={this.state.showEditTrip}
          handleClose={this.closeEditTripModal}
        ></EditTrip>
        <AddItem
          kind="Add"
          show={this.state.showAddItem}
          handleClose={this.closeAddItemModal}
        ></AddItem>
        <AddExpense
          kind="Add"
          show={this.state.showAddExpense}
          handleClose={this.closeAddExpenseModal}
        ></AddExpense>

        <Card className="trip-list w-100">
          <Card.Header className="trip-list-header">
            <h2>{this.state.tripData.name}</h2>
          </Card.Header>
          <Card.Body className="p-4">
            <h5 className="pl-3">{this.state.tripData.description}</h5>
            <hr className="mr-3 ml-3"></hr>
            <Container fluid >
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
                    itemIds={this.state.tripData.itemIds}
                    category="Group"
                    refreshTrip={this.refreshTripJSON}
                  />
                  <br></br>
                  <Items
                    itemIds={this.state.tripData.itemIds}
                    category="Personal"
                    refreshTrip={this.refreshTripJSON}
                  />
                  <br></br>
                  <Expenses
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
              <br></br>

              <Row>
                <Col>
                  <Button onClick={this.openAddItemModal}>Add Item</Button>{" "}
                  <Button onClick={this.openAddExpenseModal}>
                    Add Expense
                  </Button>{" "}
                  <Button onClick={this.openEditTripModal}>Edit Trip</Button>
                  {this.showDeleteTrip()}
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
      </div>
      //   </Fade>
    );
  }
}

export default Trip;
