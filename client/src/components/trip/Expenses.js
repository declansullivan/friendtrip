import React, { Component } from "react";
import { Card, Col, Row, Tab, ListGroup, Button } from "react-bootstrap";

import AddExpense from "./modals/AddExpense";
import "../../Stylesheets/Expenses.css";
class Expenses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddExpense: false
        }

        this.openAddExpenseModal = this.openAddExpenseModal.bind(this);
        this.closeAddExpenseModal = this.closeAddExpenseModal.bind(this);
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
            <AddExpense kind="Edit" show={this.state.showAddExpense} handleClose={this.closeAddExpenseModal}></AddExpense>

            <Card className="expenses-list">
            <Card.Header className="expenses-list-header"> <h5> Expenses </h5> </Card.Header>
                <Card.Body className="expenses-list-body">
                    <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                        <Row>
                            <Col sm={5}>
                            <ListGroup>
                                <ListGroup.Item action href="#link1">
                                Expense 1
                                </ListGroup.Item>
                            </ListGroup>
                            </Col>
                            <Col>
                            <Tab.Content>
                                <Tab.Pane eventKey="#link1">
                                    <h5>Expense name</h5>
                                    <h6>Remaining Balance: </h6>
                                    <h6>Travelers: </h6>
                                    Expense description
                                    <hr></hr>
                                    <Button onClick={this.openAddExpenseModal}>Edit</Button>
                                </Tab.Pane>
                            </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Card.Body>
            </Card>
            </div>
        )
    }
}

export default Expenses;

