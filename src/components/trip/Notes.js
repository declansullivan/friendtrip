import React, { Component } from "react";
import { Button, Card } from "react-bootstrap";

import EditNotes from "./modals/EditNotes";
import notesIcon from "../../Media/notesIcon.svg";

import "../../Stylesheets/Notes.css";
class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditNotes: false,
    };

    this.openEditNotesModal = this.openEditNotesModal.bind(this);
    this.closeEditNotesModal = this.closeEditNotesModal.bind(this);
  }

  closeEditNotesModal = () => {
    this.setState({ showEditNotes: false });
  };

  openEditNotesModal = () => {
    this.setState({ showEditNotes: true });
  };

  render() {
    return (
      <div>
        <EditNotes
          id={this.props.id}
          notes={this.props.notes}
          show={this.state.showEditNotes}
          handleClose={this.closeEditNotesModal}
          refreshTrip={this.props.refreshTrip}
        />

        <Card className="notes-list">
          <Card.Header className="notes-list-header p-1 pl-3">
          <img
            src={notesIcon}
            width="20"
            height="20"
            className="notes-list-icon d-inline-block align-top mr-2 "
            alt="notesIcon"
            id="notesIcon"
          />
            <strong>Notes</strong>
            <Button className="ml-auto d-inline-block" onClick={this.openEditNotesModal} variant="success">Edit Notes</Button>
          </Card.Header>
          <Card.Body className="notes-list-body">
            <div style={{whiteSpace: "pre-line"}}>{this.props.notes}</div>
            <br></br>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Notes;
