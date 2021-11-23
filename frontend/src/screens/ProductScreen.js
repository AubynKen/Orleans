import React from "react";
import { useParams } from "react-router";
import products from "../products";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const product = products.find((el) => el._id === productId);
  if (typeof product === "undefined") {
    return <UndefinedProductScreen />;
  }
  return null; //TODO: finish the product page.
};

const UndefinedProductScreen = () => {
  return (
    <p style={{ fontSize: "3rem" }}>
      Oups, le produit que vous cherchez n’existe pas.
    </p>
  );
};

export default ProductScreen;
