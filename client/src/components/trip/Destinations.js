import React, { Component } from "react";
import { Button, Card, Col, Row, Container, Alert} from "react-bootstrap";

class Destinations extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card>
                <Card.Body>
                    <Container fluid>
                        <Row>
                            <Col xs={2}><h5>Destination</h5></Col>
                            <Col xs={2}><h5>Start Date</h5></Col>
                            <Col xs={2}><h5>End Date</h5></Col>
                            <Col><h5>Description</h5></Col>
                        </Row>

                        {/* Need to programmatically create rows. */}
                        <Alert className="tripThumbnail" variant="secondary">
                            <Row style={{color:"black"}} className="align-items-center">
                                <Col xs={2}>Destination Name</Col>
                                <Col xs={2}>start date</Col>
                                <Col xs={2}>end date</Col>
                                <Col>this is a great destination with good food and friends and just wanna see what happens with a long string</Col>
                            </Row>
                        </Alert>

                        <Row>
                            <Col>
                                <Button>Add Destination</Button>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
        )
    }
}

export default Destinations;

