import React, { Component } from "react";
import { Card, Col, Row, Container, Alert} from "react-bootstrap";

class Expenses extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card>
                <Card.Body>
                    Expenses
                </Card.Body>
            </Card>
        )
    }
}

export default Expenses;

