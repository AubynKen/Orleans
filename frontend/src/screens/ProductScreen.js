import React, { useEffect, useState } from "react";
import {
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
  Button,
  FormSelect,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";

import Loading from "../components/Loading";
import Message from "../components/Message";
import RatingToStars from "../components/RatingToStars";

const ProductScreen = ({}) => {
  const { id: productId } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const handleCountChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleAddToCart = () => {
    navigate(`/cart/${productId}?quantity=${quantity}`);
  };

  useEffect(() => {
    dispatch(listProductDetails(productId));
  }, [productId, dispatch]);

  // If empty json is fetched by axios
  // if (typeof product === "string") {
  //   return <UndefinedProductScreen />;
  // }

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
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
                  <RatingToStars rating={product.rating} /> par{" "}
                  {product.numReviews} utilisateurs
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
              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Quantité :</Col>
                    <Col>
                      <FormSelect value={quantity} onChange={handleCountChange}>
                        {[
                          ...Array(Math.min(12, product.countInStock)).keys(),
                        ].map((x) => (
                          <option value={x + 1}>{x + 1}</option>
                        ))}
                      </FormSelect>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroupItem>
                <div className="d-grid gap-2">
                  <Button
                    variant="dark"
                    className="btn btn-block"
                    type="button"
                    disabled={product.countInStock === 0}
                    onClick={handleAddToCart}
                  >
                    Ajouter au panier
                  </Button>
                </div>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

// const UndefinedProductScreen = () => {
//   return (
//     <p style={{ fontSize: "3rem" }}>
//       Oups, le produit que vous cherchez n’existe pas.
//     </p>
//   );
// };

export default ProductScreen;
