import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import axios from "axios";

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  fetchProducts = async () => {
    const { data } = await axios.get("/api/products");
    return data;
  };

  async componentDidMount() {
    const products = await this.fetchProducts();
    this.setState({ products: products });
  }

  render() {
    return (
      <>
        <h1 style={{ fontWeight: "200" }}>Nos derniers produits</h1>
        <Container>
          <Row>
            {this.state.products.map((el) => (
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
