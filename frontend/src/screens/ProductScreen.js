import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
  Button,
} from "react-bootstrap";
import { useParams } from "react-router-dom";

// import products from "../products";
import RatingToStars from "../components/RatingToStars";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${productId}`);
      setProduct(data);
    };
    fetchProduct();
  }, [productId]);

  // If empty json is fetched by axios
  if (typeof product === "string") {
    return <UndefinedProductScreen />;
  }
  
  return (
    <Row style={{ marginTop: "1.5rem" }}>
      <Col md={6} sm={12}>
        <Image src={product.image} fluid></Image>
      </Col>
      <Col md={3} sm={12}>
        <ListGroup variant="flush">
          <ListGroupItem>
            <h2 style={{ fontSize: "1.4rem" }}>{product.name}</h2>
          </ListGroupItem>
          <ListGroupItem>
            <p>
              <RatingToStars rating={product.rating} /> par {product.numReviews}{" "}
              utilisateurs
            </p>
          </ListGroupItem>
          <ListGroupItem>
            <p>Prix: €{product.price}</p>
          </ListGroupItem>
          <ListGroupItem>
            <p>{product.description}</p>
          </ListGroupItem>
        </ListGroup>
      </Col>
      <Col>
        <ListGroup rounded="true">
          <ListGroupItem>Prix: €{product.price}</ListGroupItem>
          <ListGroupItem>
            {product.countInStock > 0
              ? "En Stock"
              : "Actuellement Indisponible"}
          </ListGroupItem>
          <ListGroupItem>
            <div className="d-grid gap-2">
              <Button variant="dark" className="btn btn-block" type="button">
                Rajouter au panier
              </Button>
            </div>
          </ListGroupItem>
        </ListGroup>
      </Col>
    </Row>
  );
};

const UndefinedProductScreen = () => {
  return (
    <p style={{ fontSize: "3rem" }}>
      Oups, le produit que vous cherchez n’existe pas.
    </p>
  );
};

export default ProductScreen;
