import React, { Component } from "react";
import { Form, Button, Col, Card } from "react-bootstrap";
import { Link } from 'react-router-dom';

class CreateTrip extends Component {
    constructor(props) {
        super(props);
    }

    createTrip = event => {
        event.preventDefault();

        const { name, description } = event.target.elements;
        const data = {
            travelerId: this.getUserId(),
            name: name.value,
            description: description.value,
        }

        fetch('http://localhost:9000/createTrip', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(res => {
                if (res.status === 200) {
                    this.props.history.push('/home');
                } else {
                    alert("Create Trip failed.")
                }
            });
    }

    getUserId = () => {
        return localStorage.getItem("id");
    }

    render() {
        return (
            <div className="centerdiv">
                <Card border="secondary" style={{ "width": "48rem", "marginLeft": "auto", "marginRight": "auto" }}>
                    <Card.Header>
                        <Card.Title style={{ "textAlign": "center" }}>Create Trip</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={this.createTrip}>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridname">
                                    <Form.Label>Trip Name</Form.Label>
                                    <Form.Control name="name" type="name" placeholder="Trip Name" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" rows={5} name="description" type="description" placeholder="Trip Description" />
                                </Form.Group>
                            </Form.Row>

                            <div style={{ "textAlign": "right" }}>
                                <Link to="/home">
                                    <Button variant="primary" type="submit">
                                        Cancel
                                    </Button>{' '}
                                </Link>
                                <Button variant="primary" type="submit">Create Trip</Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default CreateTrip;