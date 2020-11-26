import React, { Component } from "react";
import { Alert, Container, Row, ListGroup, Col, Button, Card} from "react-bootstrap";

import Travelers from "./Travelers";
import Notes from "./Notes";
import Destinations from "./Destinations";
import Items from "./Items";
import Expenses from "./Expenses";

class Trip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // user = {} // Get user JSON
        }
    }

    render() {
        return (
            <div>
                <Card style={{ width: '64rem' }}>
                    <Card.Body>
                        <h2>Trip Name</h2>
                        <hr></hr>
                        Trip Description
                        <hr></hr>

                        <Container fluid>
                            <Row>
                                <Col xs={4}>
                                    <Travelers></Travelers>
                                </Col>
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
                                <Col>
                                    <Items category="Group"></Items>
                                </Col>
                                <Col>
                                    <Items category="Personal"></Items>
                                </Col>
                                <Col>
                                    <Expenses></Expenses>
                                </Col>
                            </Row>
                            <br></br>
                            <Row>
                                <Col>
                                    <Button variant="danger" style={{float:"right"}}>Delete Trip</Button>
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