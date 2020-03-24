import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './index.css';
import * as serviceWorker from './serviceWorker';
import { CartDetailsProvider } from "./context/index";
import AddressForm from './components/AddressForm';
import PaymentForm from './components/PaymentForm';
import ReviewForm from './components/ReviewForm';

import "./App.css";

const id = "6071f275-72c4-49a9-9be8-722b93275f6a";

ReactDOM.render(
  <CartDetailsProvider cartId={id}>
    <h1>Checkout</h1>
    <Router>
      <Route exact path="/" component={AddressForm} />
      <Route exact path="/payment" component={PaymentForm} />
      <Route exact path="/review" component={ReviewForm} />
    </Router>
  </CartDetailsProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
