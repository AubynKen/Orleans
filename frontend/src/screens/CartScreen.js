import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { addItem, removeItem } from "../actions/cartActions";
import { Row, Col, ListGroup, Image, Button, ListGroupItem, Form } from "react-bootstrap";
import Message from "../components/Message";

const CartScreen = () => {
  const [searchParams] = useSearchParams();
  const { id: productId } = useParams();
  const quantity = searchParams.get("quantity");
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  // add item to redux store
  useEffect(() => {
    dispatch(addItem(productId, quantity));
  }, [dispatch, quantity, productId]);

  return (
    <Row>
      <Col md={8}>
        {cartItems.length === 0 ? (
          <Message variant="warning">
            <h2>Votre panier est actuellement vide.</h2>
          </Message>
        ) : (
          <ListGroup>
            {cartItems.map((item) => (
              <ListGroupItem key={item.productId}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt="product" fluid rounded></Image>
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>€{item.price}</Col>
                  <Col md={2}>
                    <Form.Select
                      size="sm"
                      as="select"
                      value={item.qty}
                      onChange={(e) => dispatch(addItem(item.product, Number(e.target.value)))}
                    >
                      {[...Array(Math.max(12, item.countInStock)).keys()].map((number) => (
                        <option key={number + 1} value={number + 1}>
                          {number + 1}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => {
                        dispatch(removeItem(item.product));
                      }}
                    >
                      <i className="fas fa-lg fa-trash" style={{ fontSize: "1.6rem" }}></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>
    </Row>
  );
};

export default CartScreen;
