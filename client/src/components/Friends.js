import React, { Component } from "react";
import { Container, Row, Col, Button, Card, Form} from "react-bootstrap";

class Friends extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Form className="align-items-center" style={{ width: '48rem' }}>
                    <h4>Add Friend</h4>
                    <Form.Row>
                        <Col xs={5}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control name="username" type="username" placeholder="Enter username" />
                            </Form.Group>
                        </Col>
                        <Col xs={2}>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Col>
                    </Form.Row>
                </Form>

                <br></br>

                <Card style={{ width: '48rem' }} variant="Light">
                    <Card.Body>
                    <Card.Title>Friend Name</Card.Title>
                    <Card.Text>
                        Some Friend Information... Emails etc.
                        Will need to programmatically create one of these for each friend.
                    </Card.Text>
                    <Button>Remove Friend</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default Friends;