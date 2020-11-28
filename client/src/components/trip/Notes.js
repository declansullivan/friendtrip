import React, { Component } from "react";
import { Button, Card} from "react-bootstrap";

import EditNotes from "./modals/EditNotes";

class Notes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showEditNotes: false
        }

        this.openEditNotesModal = this.openEditNotesModal.bind(this);
        this.closeEditNotesModal = this.closeEditNotesModal.bind(this);
    }

    closeEditNotesModal = () => {
        this.setState({showEditNotes: false});
    }

    openEditNotesModal = () => {
        this.setState({showEditNotes: true});
    }

    render() {
        return (
            <div>
                <EditNotes show={this.state.showEditNotes} handleClose={this.closeEditNotesModal}></EditNotes>

                <Card>
                    <Card.Body>
                        <h5>Notes</h5>
                        <hr></hr>
                        {this.props.itinerary}
                        <br></br><br></br>
                        <Button onClick={this.openEditNotesModal}>Edit</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default Notes;

