import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import RatingToStars from "./RatingToStars";



const ProductCard = (props) => {
  return (
    <Card style={{ borderRadius: "5px" }} className="my-2 p-2">
      <Card.Body className="p-2">
        <Link to={`/product/${props.product._id}`}>
          <Card.Img variant="top" src={props.product.image} />
        </Link>
        <Card.Title className="my-4">
          <Link to={`/product/${props.product._id}`}>
            <strong>{props.product.name}</strong>
          </Link>
        </Card.Title>
        <Card.Text className="my-4" style={{ color: "black" }}>
          <RatingToStars rating={props.product.rating}/>
          /5 par {props.product.numReviews} utilisateurs.
        </Card.Text>
        <Card.Text as={"h3"}>Prix: {props.product.price}€</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
