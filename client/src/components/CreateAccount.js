import React, { Component } from "react";
import { Form, Button, Col, Card } from "react-bootstrap";
import { Link } from 'react-router-dom';

class CreateAccount extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            first: '',
            last: '',
            password: '',
        };
    }

    createAccount = event => {
        event.preventDefault();

        const { username, email, first, last, password } = event.target.elements;
        const data = {
            username: username.value,
            email: email.value,
            first: first.value,
            last: last.value,
            password: password.value
        }

        console.log(data);

        fetch('http://localhost:9000/signup', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(res => {
                if (res.code === "auth/email-already-in-use") {
                    alert("This email is already in use.");
                }
                if (res.code === "auth/weak-password") {
                    alert("Your password is too weak.");
                }
            });
    }

    render() {
        return (
            <div class="centerdiv">
                <Card border="secondary" style={{ "width": "48rem", "margin-left": "auto", "margin-right": "auto" }}>
                    <Card.Header>
                        <Card.Title style={{ "text-align": "center" }}>Create an Account</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={this.createAccount}>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control name="username" type="username" placeholder="Username" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control name="email" type="email" placeholder="Email" />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridFirst">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control name="first" type="first" placeholder="First name" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridLast">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control name="last" type="last" placeholder="Last name" />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control name="password" type="password" placeholder="Password" />
                                </Form.Group>
                            </Form.Row>

                            <div style={{ "text-align": "right" }}>
                                <Link to="/">
                                    <Button variant="primary" type="submit">
                                        Login
                                    </Button>{' '}
                                </Link>
                                <Button variant="primary" type="submit">Register</Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default CreateAccount;