import React, { Component } from "react";
import { Alert, Container, Row, Col, Button, Card} from "react-bootstrap";

class Trips extends Component {
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
                        <Container fluid>
                            <Row>
                                <Col xs={2}><h5>Trip Name</h5></Col>
                                <Col xs={2}><h5>Owner</h5></Col>
                                <Col xs={2}><h5>Members</h5></Col>
                                <Col><h5>Description</h5></Col>
                            </Row>

                            {/* Need to programmatically create rows. */}
                            <Alert className="tripThumbnail" variant="secondary">
                                <Row style={{color:"black"}} className="align-items-center">
                                    <Col xs={2}>Trip Name</Col>
                                    <Col xs={2}>Owner name</Col>
                                    <Col xs={2}>10</Col>
                                    <Col>Trip description</Col>
                                </Row>
                            </Alert>
                                
                        </Container>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default Trips;