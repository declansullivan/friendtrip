import React, { Component } from "react";
import { Alert, Container, Row, ListGroup, Col, Button, Card} from "react-bootstrap";

import Travelers from "./Travelers";
import Notes from "./Notes";
import Destinations from "./Destinations";
import Items from "./Items";
import Expenses from "./Expenses";

import ConfirmDelete from "./modals/ConfirmDelete";
import EditTrip from "./modals/EditTrip";
import AddItem from "./modals/AddItem";
import AddExpense from "./modals/AddExpense";

class Trip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDeleteTrip: false,
            showEditTrip: false,
            showAddItem: false,
            showAddExpense: false
            // user = {} // Get user JSON
        }

        this.openDeleteTripModal = this.openDeleteTripModal.bind(this);
        this.closeDeleteTripModal = this.closeDeleteTripModal.bind(this);

        this.openEditTripModal = this.openEditTripModal.bind(this);
        this.closeEditTripModal = this.closeEditTripModal.bind(this);

        this.openAddItemModal = this.openAddItemModal.bind(this);
        this.closeAddItemModal = this.closeAddItemModal.bind(this);

        this.openAddExpenseModal = this.openAddExpenseModal.bind(this);
        this.closeAddExpenseModal = this.closeAddExpenseModal.bind(this);
    }

    closeDeleteTripModal = () => {
        this.setState({showDeleteTrip: false});
    }

    openDeleteTripModal = () => {
        this.setState({showDeleteTrip: true});
    }

    closeEditTripModal = () => {
        this.setState({showEditTrip: false});
    }

    openEditTripModal = () => {
        this.setState({showEditTrip: true});
    }

    closeAddItemModal = () => {
        this.setState({showAddItem: false});
    }

    openAddItemModal = () => {
        this.setState({showAddItem: true});
    }

    closeAddExpenseModal = () => {
        this.setState({showAddExpense: false});
    }

    openAddExpenseModal = () => {
        this.setState({showAddExpense: true});
    }

    render() {
        return (
            <div>
                <ConfirmDelete show={this.state.showDeleteTrip} handleClose={this.closeDeleteTripModal}></ConfirmDelete>
                <EditTrip show={this.state.showEditTrip} handleClose={this.closeEditTripModal}></EditTrip>
                <AddItem kind="Add" show={this.state.showAddItem} handleClose={this.closeAddItemModal}></AddItem>
                <AddExpense kind="Add" show={this.state.showAddExpense} handleClose={this.closeAddExpenseModal}></AddExpense>

                <Card bg="dark" style={{ width: '64rem' }}>
                    <Card.Body>
                        <h2 style={{color: "white"}}>Trip Name</h2>
                        <hr></hr>
                        <p style={{color: "white"}}>Trip Description</p>
                        <hr></hr>

                        <Container fluid>
                            <Row>
                                <Col>
                                    <Notes></Notes>
                                </Col>
                            </Row>
                            <br></br>

                            <Row>
                                <Col>
                                    <Destinations></Destinations>
                                </Col>
                            </Row>
                            <br></br>

                            <Row>
                                <Col xs={8}>
                                    <Items category="Group"></Items>
                                    <br></br>
                                    <Items category="Personal"></Items>
                                    <br></br>
                                    <Expenses></Expenses>

                                </Col>
                                <Col>
                                    <Travelers></Travelers>
                                </Col>
                            </Row>
                            <br></br>

                            <Row>
                                <Col>
                                    <Button onClick={this.openAddItemModal}>Add Item</Button>{' '}
                                    <Button onClick={this.openAddExpenseModal}>Add Expense</Button>{' '}
                                    <Button onClick={this.openEditTripModal}>Edit Trip</Button>
                                    <Button variant="danger" style={{float:"right"}} onClick={this.openDeleteTripModal}>Delete Trip</Button>
                                </Col>
                            </Row>
                        </Container>

                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default Trip;