import React, { Component } from "react";
import { Button, Card} from "react-bootstrap";

class Notes extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card>
                <Card.Body>
                    <h5>Notes</h5>
                    <hr></hr>
                    This is where (editable) notes about the trip can go.
                    <br></br><br></br>
                    <Button>Edit</Button>
                </Card.Body>
            </Card>
        )
    }
}

export default Notes;

