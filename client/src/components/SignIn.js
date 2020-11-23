import React, { Component } from "react";
import { Form, Button, Col, Card } from "react-bootstrap";
import { Link } from 'react-router-dom';

class SignIn extends Component {
    constructor(props) {
        super(props);
    }

    signIn = event => {

    }

    signUp = event => {
    }

    render() {
        return (
            <div class="centerdiv">
                <Card border="secondary" style={{ "width": "24rem", "margin-left": "auto", "margin-right": "auto" }}>
                    <Card.Header>
                        <Card.Title style={{ "text-align": "center" }}>Welcome to FriendTrip!</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={this.signIn}>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridUsername">
                                <Form.Label>Email</Form.Label>
                                <Form.Control name="email" type="email" placeholder="Email" />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name="password" type="password" placeholder="Password" />
                                </Form.Group>
                            </Form.Row>

                            <div class="centerbuttons">
                                <Button variant="primary" type="submit">Sign In</Button>{' '}
                                <Link to="/signup">
                                    <Button variant="primary" onClick>
                                        Register
                                    </Button>
                                </Link>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default SignIn;