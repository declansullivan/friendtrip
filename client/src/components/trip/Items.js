import React, { Component } from "react";
import { Card, Col, Row, Tab, ListGroup, Button } from "react-bootstrap";

import AddItem from "./modals/AddItem";
import "../../Stylesheets/Items.css";

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddItem: false,
      showEditItem: false,
      items: [],
      groupItems: [],
      personalItems: [],
      travelers: [],
      itemToEdit: null,
    };

    this.openAddItemModal = this.openAddItemModal.bind(this);
    this.closeAddItemModal = this.closeAddItemModal.bind(this);
    this.openEditItemModal = this.openEditItemModal.bind(this);
    this.closeEditItemModal = this.closeEditItemModal.bind(this);
  }

  closeAddItemModal = () => {
    this.setState({ showAddItem: false });
  };

  openAddItemModal = () => {
    this.setState({ showAddItem: true });
  };

  closeEditItemModal = () => {
    this.setState({ showEditItem: false, itemToEdit: null });
  }

  openEditItemModal = (item) => {
    this.setState({ showEditItem: true, itemToEdit: item });
  }

  getItemsListJSON = (itemIds) => {
    const data = {
      travelerId: this.props.travelerId,
      tripId: this.props.tripId,
      itemIds,
    };
    fetch("http://localhost:9000/item/getItemsList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json()).then((res) => {
      this.getTravelersJSON(res.groupItems, res.personalItems);
    });
  };

  getTravelersJSON = (groupItems, personalItems) => {
    fetch("http://localhost:9000/trip/getTravelers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ travelerIds: this.props.travelerIds }),
    }).then((res) => res.json()).then((res) => {
      var travelers = {}
      for (const traveler of res.travelers) {
        travelers[traveler.id] = traveler;
      }
      this.setState({ travelers, groupItems, personalItems });
    });
}

  deleteItem = (itemId, tripId) => {
    fetch("http://localhost:9000/item/deleteItem", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: itemId, tripId }),
    }).then((res) => {
      this.props.refreshTrip();
      this.getItemsListJSON();
    });
  }

  createItemPane = (item) => {
    let assignee;
    let name ;
    if(item.assignee) {
      assignee = this.state.travelers[item.assignee];
      name = assignee.firstName + " " + assignee.lastName;
    }
    else {
      name = "";
    }
    return(
      <Tab.Pane key={item.id} eventKey={`#${item.id}`}>
        <h5>{item.name}</h5>
        <h6>Assigned To: {name}</h6>
        <p>{item.description}</p>
        <hr></hr>
        <Button className="float-right ml-1" onClick={() => {this.deleteItem(item.id, this.props.tripId)}} variant="danger">
          Delete
        </Button>
        <Button className="float-right" onClick={() => {this.openEditItemModal(item)}}>Edit</Button>
      </Tab.Pane>
    );
  }

  renderItemsTabPane = () => {
    let itemsToRender = [];
    if(this.props.category === "Group")  {
      itemsToRender = this.state.groupItems;
    }
    else {
      itemsToRender = this.state.personalItems;
    }
    if (!itemsToRender || itemsToRender.length === 0) return;
    let itemListPaneJSX = [];
    for (let item of itemsToRender) {
      itemListPaneJSX.push(this.createItemPane(item));
    }
    return itemListPaneJSX;
  };

  createItemListGroupItem = (item) => {
    let completion = item.isComplete ? "✅" : "❌"
    return (
      <ListGroup.Item key={item.id} action href={`#${item.id}`}>
        {item.name}<span style={{ float: "right" }}>{completion}</span>
      </ListGroup.Item>
    );
  };

  renderItemsListGroupItem = () => {
    let itemsToRender = []
    if(this.props.category === "Group")  {
      itemsToRender = this.state.groupItems;
    }
    else {
      itemsToRender = this.state.personalItems;
    }
    if (!itemsToRender || itemsToRender.length === 0) return;
    let itemListGroupItemJSX = [];
    for (let item of itemsToRender) {
      itemListGroupItemJSX.push(this.createItemListGroupItem(item));
    }
    return itemListGroupItemJSX;
  };

  renderItems = () => {
      return (
        <Row>
          <Col sm={5}>
            <ListGroup>{this.renderItemsListGroupItem()}</ListGroup>
          </Col>
          <Col>
            <Tab.Content>{this.renderItemsTabPane()}</Tab.Content>
          </Col>
        </Row>
      );
  };

  refreshItems = () => {
    this.getItemsListJSON(this.props.itemIds);
  } 

  componentWillReceiveProps(nextProps) {
    this.getItemsListJSON(nextProps.itemIds);
  }

  componentDidMount() {
    this.getItemsListJSON(this.props.itemIds);
  }

  render() {
    return (
      <div>
        <AddItem
          kind="Add"
          travelerId={this.props.travelerId}
          travelerIds={this.props.travelerIds}
          tripId={this.props.tripId}
          show={this.state.showAddItem}
          refreshTrip={this.props.refreshTrip}
          handleClose={this.closeAddItemModal}
        />

      <AddItem
          kind="Edit"
          travelerId={this.props.travelerId}
          travelerIds={this.props.travelerIds}
          tripId={this.props.tripId}
          show={this.state.showEditItem}
          refreshTrip={this.props.refreshTrip}
          refreshItem={this.refreshItems}
          handleClose={this.closeEditItemModal}
          item={this.state.itemToEdit}
        />

        <Card className="item-list mb-3">
          <Card.Header className="item-list-header">
            <h5 className="d-inline-block m-0">{this.props.category} List</h5>
            <Button
              className="ml-auto d-inline-block"
              variant="success"
              onClick={this.openAddItemModal}
            >
              Add Item
            </Button>
          </Card.Header>
          <Card.Body className="item-list-body">
            <Tab.Container
              id="list-group-tabs-example"
              defaultActiveKey="#link1"
              transition={false}
            >
              {this.renderItems()}
            </Tab.Container>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Items;
