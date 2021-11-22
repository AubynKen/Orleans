import React, { Component } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Container expand="md">
          <Navbar.Brand as={Link} to="/">Orléans</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/cart">
                <i
                  className="fas fa-shopping-cart"
                  style={{ marginRight: "0.3rem" }}
                ></i>
                Panier
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                <i
                  className="far fa-user"
                  style={{ marginRight: "0.3rem" }}
                ></i>
                S’identifier
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
