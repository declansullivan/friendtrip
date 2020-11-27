import React, { Component } from "react";

import { Container, Row, Col } from "react-bootstrap";
import { Navbar as ReactNavbar } from "react-bootstrap";
import { Nav as ReactNav } from "react-bootstrap";
import ScrollToTop from "../components/ScrollToTop";
import Navbar from "../components/Navbar.js";
import Account from "../components/account/Account";
import Friends from "../components/Friends";
import Trips from "../components/trip/Trips";
import Trip from "../components/trip/Trip";
import CreateTrip from "../components/CreateTrip";
import friendtripLogo from "../Media/friendtripLogo.svg";

class Home extends Component {
    constructor(props) {
        super(props);
        this.page = this.switchPage.bind(this);
        this.logout = this.logoutFunc.bind(this);
        this.state = {
            render: "",
            tripId: "",
            traveler: {}
        };
    }

    logoutFunc = () => {
        fetch('http://localhost:9000/logout', {
            method: 'POST'
        }).then(res => res.json()).then(res => {
            if (res.status === 200) {
                this.props.history.push('/');
                localStorage.clear();
            } else {
                alert("Logout failed.")
            }
        });
    }

    getTravelerJSON = () => {
        fetch("http://localhost:9000/account/getAccount", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: this.getUserId() }),
        }).then((res) => res.json()).then((res) => {
            this.setState({ traveler: res });
        });
    }

    switchPage = event => {
        this.setState({ render: event });
    }

    selectTrip = tripId => {
        this.setState({ tripId });
        this.setState({ render: 'trip' });
    }

    getUserId = () => {
        return localStorage.getItem("id");
    }

    renderContent() {
        switch (this.state.render) {
            case 'account':
                return (
                    <Account user={this.getUserId()}></Account>
                )
            case 'trips':
                return (
                    <Trips tripIds={this.state.traveler.tripIds} callback={this.selectTrip}></Trips>
                )
            case 'trip':
                return (
                    <Trip tripId={this.state.tripId} traveler={this.state.traveler} ></Trip>
                )
            case 'friends':
                return (
                    <Friends></Friends>
                )
            case 'createTrip':
                return (
                    <CreateTrip refreshTraveler={this.refreshTravelerJSON}></CreateTrip>
                )
            default:
            return (
                <h1>Home</h1>
            )
        }
    }

    refreshTravelerJSON = () => {
        this.getTravelerJSON();
    }
    
    componentDidMount() {
        this.getTravelerJSON();
    }

    render() {
        return (
            <div>
                <Container fluid className="homeContainer p-0 m-0">
                <Row className="m-0 p-0">
                    <Col xs={12} className="align-items-center p-0">
                        <ReactNavbar bg="white">
                            <ReactNavbar.Brand className="p-0">
                            <img
                                src={friendtripLogo}
                                width="50"
                                height="50"
                                className="d-inline-block align-center mr-2 p-0"
                                alt="FriendTrip logo"
                                id="friendtripLogo"
                            />{" "}
                            FriendTrip
                            </ReactNavbar.Brand>
                            <ReactNav className="ml-auto font-weight-bold">
                                {this.getUserId()}
                            </ReactNav>
                        </ReactNavbar>
                    </Col>
                </Row>
                <Row className="m-0 p-0">
                    <Col xs={2}>
                        <Navbar
                            className="NavBar"
                            page={this.switchPage}
                            out={this.logoutFunc}
                        ></Navbar>
                    </Col>
                    <Col xs={10} className="mt-3">
                        {this.renderContent()}
                    </Col>
                </Row>
                </Container>
                <ScrollToTop></ScrollToTop>
            </div>
        )
    }
}

export default Home;
