import React from "react";
import { Card, Nav } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// converts a rating from 0 to 5 to an array of stars
const ratingToStar = (rating) => {
  const res = [];
  for (let i = 0; i < Math.floor(rating); i++) {
    res.push(<i key={i} className="fas fa-star"></i>);
  }
  const fractionalPart = rating - Math.floor(rating);
  if (fractionalPart >= 0.25 && fractionalPart < 0.75) {
    res.push(<i key={res.length + 1} className="fas fa-star-half-alt"></i>);
  }
  for (let i = 0; i < 5 - res.length; i++) {
    res.push(<i key={res.lenght + 1} className="far fa-star"></i>);
  }
  return res;
};

ratingToStar.propTypes = {
  rating: PropTypes.number.isRequired,
};

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
          <span style={{ color: "gold" }}>
            {ratingToStar(props.product.rating)}
          </span>
          /5 par {props.product.numReviews} utilisateurs.
        </Card.Text>
        <Card.Text as={"h3"}>Prix: {props.product.price}€</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
