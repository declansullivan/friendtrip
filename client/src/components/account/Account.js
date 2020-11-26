import React, { Component } from "react";
import { Container, Row, Col, Button, Card} from "react-bootstrap";

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // user = {} // Get user JSON
        }
    }

    render() {
        return (
            <div>
                <div className="accountInfo">
                <h2>Account Information</h2>
                <Card style={{ width: '48rem' }}>
                        <Card.Body>
                        <Card.Text>
                            <h3>Full Name - </h3>
                            <h5>Username - </h5>
                            <h5>Email - </h5>
                            You created your account on TIME.
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </div>

                <hr></hr>

                <h2>Trip Invitations</h2>

                <div className="tripInvitations">
                    <Card style={{ width: '64rem' }}>
                        <Card.Body>
                            <Container fluid>
                                <Row>
                                    <Col xs={2}><h5>Inviter</h5></Col>
                                    <Col xs={2}><h5>Trip Name</h5></Col>
                                    <Col xs={5}><h5>Description</h5></Col>
                                    <Col></Col>
                                </Row>

                                {/* Need to programmatically create rows. */}
                                <Row className="align-items-center">
                                    <Col xs={2}>Username</Col>
                                    <Col xs={2}>Trip Name</Col>
                                    <Col xs={5}>Trip Description</Col>
                                    <Col>
                                        <Button variant="success">Accept</Button>{' '}
                                        <Button variant="danger">Decline</Button>
                                    </Col>
                                </Row>
                            </Container>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        )
    }
}

export default Account;