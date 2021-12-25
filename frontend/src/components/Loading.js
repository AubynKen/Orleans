import React from "react";
import { Spinner } from "react-bootstrap";

const spinnerStyle = {
  display: "block",
  margin: "auto",
  width: "5vw",
  height: "5vw",
};

const Loading = () => {
  return (
    <Spinner animation="border" role="status" style={spinnerStyle}>
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

export default Loading;
