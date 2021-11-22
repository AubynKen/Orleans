import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

export default class Footer extends Component {
  render() {
    return (<footer>
      <Container>
        <Row>
          <Col className="text-center">Copyright © Orleans 2021</Col>
        </Row>
      </Container>
      </footer>);
  }
}
