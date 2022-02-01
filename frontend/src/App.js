import React, { Component } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Container>
          <main className="py-4">
            <Routes>
              <Route exact path="/" element={<HomeScreen />} />
              <Route path="/product/:id" element={<ProductScreen />} />
              {/* <Route path="/cart" element={<CartScreen />} /> */}
              <Route path="/cart/:id" element={<CartScreen />} />
            </Routes>
          </main>
        </Container>
        <Footer />
      </Router>
    );
  }
}
