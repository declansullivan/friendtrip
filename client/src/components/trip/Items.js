import React, { Component } from "react";
import { Card, Col, Row, Container, Alert} from "react-bootstrap";

class Items extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card>
                <Card.Body>
                    {this.props.category} Items
                </Card.Body>
            </Card>
        )
    }
}

export default Items;

