// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import React, { Component } from 'react'
import { Switch,  Route } from 'react-router-dom';
// import { Navbar } from 'reactstrap';
import Navbar from './components/Navbar'
import ProductList from './components/ProductList';
import Details from './components/Details'
import Cart from './components/Cart/Cart';
import Default from './components/Default';
import Modal from './components/Modal';

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Switch>
          <Route path='/' exact component={ProductList} />
          <Route path='/details' component={Details} />
          <Route path='/cart' component={Cart} />
          <Route  component={Default} />
        </Switch>
        
       <Modal />
      </React.Fragment>
    )
  }
}


