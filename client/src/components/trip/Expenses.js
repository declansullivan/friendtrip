import React, { Component } from "react";
import { Card, Col, Row, Tab, ListGroup, Button } from "react-bootstrap";

import AddExpense from "./modals/AddExpense";
import "../../Stylesheets/Expenses.css";
class Expenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      render: false,
      showAddExpense: false,
      expenses: [],
    };

    this.openAddExpenseModal = this.openAddExpenseModal.bind(this);
    this.closeAddExpenseModal = this.closeAddExpenseModal.bind(this);
  }

  closeAddExpenseModal = () => {
    this.setState({ showAddExpense: false });
  };

  openAddExpenseModal = () => {
    this.setState({ showAddExpense: true });
  };

  componentDidMount() {
    this.getExpenses();
  }

  getExpenses = () => {
    const data = {
      expenseIds: this.props.expenseIds,
    };
    fetch("http://localhost:9000/expense/getExpenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({ expenses: res.expenses, render: true });
      });
  };
  createExpenseListGroupItem = (expense) => {
    return (
      <ListGroup.Item action href={`#${expense.id}`}>
        {expense.name}
      </ListGroup.Item>
    );
  };
  createExpenseTabPane = (expense) => {
    let arr = [];
    for (let i = 0; i < Object.keys(expense.travelerIds).length; i++) {
      arr.push(expense.travelerIds[i]);
    }
    const travelerList = arr.map((traveler) => <li>{traveler} </li>);
    return (
      <Tab.Pane eventKey={`#${expense.id}`}>
        <h5>{expense.name}</h5>
        <h6>Remaining Balance: {expense.cost}</h6>
        <h6>Travelers: </h6>
        {travelerList}
        <h6>Description:</h6>
        <p>{expense.description}</p>
        <hr></hr>
        <Button className="float-right" onClick={this.openAddExpenseModal}>
          Edit
        </Button>
      </Tab.Pane>
    );
  };
  renderExpenseListGroupItem = () => {
    if (!this.state.expenses || this.state.expenses.length === 0) return;
    let expenseListGroupItemJSX = [];
    for (let expense of this.state.expenses) {
      expenseListGroupItemJSX.push(this.createExpenseListGroupItem(expense));
    }
    return expenseListGroupItemJSX;
  };
  renderExpenseTabPane = () => {
    if (!this.state.expenses || this.state.expenses.length === 0) return;
    let expenseTabPaneJSX = [];
    for (let expense of this.state.expenses) {
      expenseTabPaneJSX.push(this.createExpenseTabPane(expense));
    }
    return expenseTabPaneJSX;
  };
  renderExpenses = () => {
    if(!this.state.expenses || this.state.expenses.length === 0) return;
    return (
      <Row>
        <Col sm={5}>
          <ListGroup>{this.renderExpenseListGroupItem()}</ListGroup>
        </Col>
        <Col>
          <Tab.Content>{this.renderExpenseTabPane()}</Tab.Content>
        </Col>
      </Row>
    );
  };

  render() {
    if (!this.state.render) return <div></div>;
    return (
      <div>
        <AddExpense
          kind="Add"
          travelerId={this.props.travelerId}
          travelerIds={this.props.travelerIds}
          tripId={this.props.tripId}
          refreshTrip={this.props.refreshTrip}
          refreshExpense={this.getExpenses}
          show={this.state.showAddExpense}
          handleClose={this.closeAddExpenseModal}
        ></AddExpense>

        <Card className="expenses-list mb-3" >
          <Card.Header className="expenses-list-header">
            <h5 className="d-inline-block m-0"> Expenses </h5>
            <Button
              className="ml-auto d-inline-block"
              variant="success"
              onClick={this.openAddExpenseModal}
            >
              Add Expense
            </Button>
          </Card.Header>
          <Card.Body className="expenses-list-body">
            <Tab.Container
              id="list-group-tabs-example"
              defaultActiveKey="#link1"
            >
              {this.renderExpenses()}
            </Tab.Container>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Expenses;
