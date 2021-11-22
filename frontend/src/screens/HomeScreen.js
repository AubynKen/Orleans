import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import products from "../products";
import ProductCard from "../components/ProductCard";

export default class HomeScreen extends Component {
  render() {
    return (
      <>
        <h1 style={{ fontWeight: "200" }}>Nos derniers produits</h1>
        <Container>
          <Row>
            {products.map((el) => (
              <Col sm="12" md="6" lg="4" key={el._id}>
                <ProductCard product={el} />
              </Col>
            ))}
          </Row>
        </Container>
      </>
    );
  }
}
