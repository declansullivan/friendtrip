import React, { Component } from "react";
import { ListGroup, Button, Card} from "react-bootstrap";

class Travelers extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card>
                <Card.Header>Travelers</Card.Header>
                <ListGroup variant="flush">
                    {/* Need to create rows programmatically */}
                    <ListGroup.Item><span class="close">x</span>Declan</ListGroup.Item>
                    <ListGroup.Item><span class="close">x</span>More Travelers</ListGroup.Item>
                    <Button variant="light">Add Traveler</Button>
                </ListGroup>
            </Card>
        )
    }
}

export default Travelers;

