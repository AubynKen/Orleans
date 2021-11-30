import React from "react";
import PropTypes from "prop-types";

const RatingToStars = (props) => {
  const rating = props.rating;
  const res = [];
  for (let i = 0; i < Math.floor(rating); i++) {
    res.push(<i key={i} className="fas fa-star"></i>);
  }
  const fractionalPart = rating - Math.floor(rating);
  if (fractionalPart >= 0.25 && fractionalPart < 0.75) {
    res.push(<i key={res.length + 1} className="fas fa-star-half-alt"></i>);
  }
  for (let i = 0; i < 5 - res.length; i++) {
    res.push(<i key={res.length + 1} className="far fa-star"></i>);
  }
  return <span style={{ color: "gold" }}>{res}</span>;
};

RatingToStars.propTypes = {
  rating: PropTypes.number,
};

export default RatingToStars;
