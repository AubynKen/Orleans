import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import { listProducts } from "../actions/productActions";
import axios from "axios";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const { products, error, loading } = useSelector(
    (state) => state.productList
  );

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h1 style={{ fontWeight: "200" }}>Nos derniers produits</h1>
      {loading ? (
        <h2>En train de charger...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <Container>
          <Row>
            {products.map((el) => (
              <Col sm="12" md="6" lg="4" key={el._id}>
                <ProductCard product={el} />
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
};

export default HomeScreen;
