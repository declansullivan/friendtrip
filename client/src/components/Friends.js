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
                    <h2>Add Friend</h2>
                    <Form.Row>
                        <Col xs={5}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control name="email" type="email" placeholder="Enter friend's email" />
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