import React from 'react';
import Navigation from './Navigation'
import { Link } from 'react-router-dom'
import StackGrid from "react-stack-grid";
import { Calendar, PlusCircle } from 'react-feather';

class Products extends React.Component {

  render() {
    return(
      <div className="mb-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2 ml-4">Products</h1>
        </div>

        <div>
        <table class="table table-hover">
          <thead class="thead-light">
            <tr>
              <th scope="col">№</th>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    )
  }
}

export default Navigation(Products)