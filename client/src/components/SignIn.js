import React, { Component } from "react";
import { Form, Button, Col, Card } from "react-bootstrap";
import { Link } from 'react-router-dom';
import {
    BrowserRouter as Router, Route,
    Redirect, Switch
} from 'react-router-dom';

class SignIn extends Component {
    constructor(props) {
        super(props);
    }

    signIn = event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        const data = {
            email: email.value,
            password: password.value
        }

        fetch('http://localhost:9000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.code === "Success") {
                    alert("Success!");
                    this.props.history.push('/home');
                }
                else {
                    alert("Incorrect email or password.");
                }
            });
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
                                <Button variant="primary" type="submit">Login</Button>{' '}
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