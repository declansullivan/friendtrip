import React, { Component } from "react";
import { Card, Col, Row, Tab, ListGroup, Button } from "react-bootstrap";

import AddItem from "./modals/AddItem";
import "../../Stylesheets/Items.css";

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddItem: false,
      render: false,
      items: [],
      groupItems: [],
      personalItems: [],
    };

    this.openAddItemModal = this.openAddItemModal.bind(this);
    this.closeAddItemModal = this.closeAddItemModal.bind(this);
  }

  closeAddItemModal = () => {
    this.setState({ showAddItem: false });
  };

  openAddItemModal = () => {
    this.closeAddItemModal();
    this.setState({ showAddItem: true });
  };

  getItemsListJSON = () => {
    const data = {
      travelerId: this.props.travelerId,
      tripId: this.props.tripId,
      itemIds: this.props.itemIds,
    };
    fetch("http://localhost:9000/item/getItemsList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json()).then((res) => {
      this.setState({
        groupItems: res.groupItems,
        personalItems: res.personalItems,
        render: true,
      });
    });
  };

  componentDidMount() {
    this.getItemsListJSON();
  }

  createItemPane = (item) => {
    return(
      <Tab.Pane eventKey={`#${item.id}`}>
        <h5>{item.name}</h5>
        <h6>Assigned To: {item.assignee}</h6>
        <p>{item.description}</p>
        <hr></hr>
        <Button onClick={this.openAddItemModal}>Edit</Button>
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
      <ListGroup.Item action href={`#${item.id}`}>
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
          refreshItem={{}} // TODO
          handleClose={this.closeAddItemModal}
        ></AddItem>

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
