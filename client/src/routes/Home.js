import React, { Component } from "react";

import { Image, Container, Row, Button, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Navbar as ReactNavbar } from "react-bootstrap";
import { Nav as ReactNav } from "react-bootstrap";
import Navbar from '../components/Navbar.js';
import Account from "../components/account/Account";
import Friends from "../components/Friends";
import Trips from "../components/trip/Trips";
import Trip from "../components/trip/Trip";
import friendtripLogo from "../Media/friendtripLogo.svg";


class Home extends Component {
    constructor(props) {
        super(props);

        this.page = this.switchPage.bind(this);
        this.logout = this.logoutFunc.bind(this);
        this.state = {
            render: "trips",
        };
    }

    switchPage = event => {
        this.setState({ render: event });
    }

    logoutFunc = () => {
        fetch('http://localhost:9000/logout', {
            method: 'POST'
        }).then(res => res.json())
            .then(res => {
                if (res.status === 200) {
                    this.props.history.push('/');
                    localStorage.clear();
                } else {
                    alert("Logout failed.")
                }
            });
    }

    getUserId = () => {
        return localStorage.getItem("id");
    }

    renderContent() {
        switch (this.state.render) {
            case 'account':
                return (
                    <Account user={this.getUserId()}> </Account>
                )
            case 'trips':
                return (
                    <div>
                        <Trips></Trips>
                        <Trip></Trip>
                    </div>

                )
            case 'friends':
                return (
                    <Friends></Friends>
                )
            default:
            return (
                <div>
                    <Trips></Trips>
                    <Trip></Trip>
                </div>
            )
        }
    }

    render() {
        return (


            <div>
                <Container fluid className="homeContainer">
                    <Row>
                        <Col xs={12} className="align-items-center">
                            <ReactNavbar bg="white">
                                <ReactNavbar.Brand >
                                    <img
                                        src={friendtripLogo}
                                        width="50"
                                        height="50"
                                        className="d-inline-block align-center mr-2"
                                        alt="FriendTrip logo"
                                        id="friendtripLogo"
                                    />{' '}
                            FriendTrip
                            </ReactNavbar.Brand>
                                <Link to="/createTrip">
                                    <Button variant="primary" type="submit">
                                        Create Trip
                    </Button>{' '}
                                </Link>
                                <ReactNav className="ml-auto font-weight-bold">
                                    {this.getUserId()}
                                </ReactNav>
                            </ReactNavbar>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={2}>
                            <Navbar className="NavBar" page={this.switchPage} out={this.logoutFunc}></Navbar>
                        </Col>
                        <Col xs={10} className="mt-3">
                            {this.renderContent()}
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Home;