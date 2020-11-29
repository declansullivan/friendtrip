import React, { Component } from "react";
import { Card, Col, Row, Tab, ListGroup, Button } from "react-bootstrap";

import AddItem from "./modals/AddItem";
import "../../Stylesheets/Items.css";

class Items extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddItem: false,
        }

        this.openAddItemModal = this.openAddItemModal.bind(this);
        this.closeAddItemModal = this.closeAddItemModal.bind(this);
    }

    closeAddItemModal = () => {
        this.setState({showAddItem: false});
    }

    openAddItemModal = () => {
        this.closeAddItemModal();
        this.setState({showAddItem: true});
    }

    render() {
        return (
            <div>
            <AddItem kind="Edit" show={this.state.showAddItem} handleClose={this.closeAddItemModal}></AddItem>

            <Card className="item-list">
                <Card.Header className="item-list-header"> <h5>{this.props.category} List</h5> </Card.Header>
                <Card.Body className="item-list-body">
                    <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1" transition={false}>
                        <Row>
                            <Col sm={5}>
                            <ListGroup>
                                <ListGroup.Item action href="#link1">
                                Item 1
                                <span style={{float:"right"}}>✅</span>
                                </ListGroup.Item>

                                <ListGroup.Item action href="#link2">
                                Item 2
                                <span style={{float:"right"}}>❌</span>
                                </ListGroup.Item>
                            </ListGroup>
                            </Col>
                            <Col>
                            <Tab.Content>
                                <Tab.Pane eventKey="#link1">
                                    <h5>Item name</h5>
                                    <h6>Assigned To: Traveler</h6>
                                    Item description
                                    <hr></hr>
                                    <Button onClick={this.openAddItemModal}>Edit</Button>
                                </Tab.Pane>

                                <Tab.Pane eventKey="#link2">
                                    <h5>Item name</h5>
                                    <h6>Assigned To: Traveler</h6>
                                    Item description
                                    <hr></hr>
                                    <Button onClick={this.openAddItemModal}>Edit</Button>
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

export default Items;

