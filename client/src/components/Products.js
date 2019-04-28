import React from 'react';
import Navigation from './Navigation'
import Axios from 'axios';

const comparers = {
  product: (a, b) => {
    let productA = a.name.toLowerCase(), productB = b.name.toLowerCase();
    if (productA < productB)
      return -1;
    if (productA > productB)
      return 1;
    return 0;
  },
  description: (a, b) => {
    let productA = a.description.toLowerCase(), productB = b.description.toLowerCase();
    if (productA < productB)
      return -1;
    if (productA > productB)
      return 1;
    return 0;
  },
  price: (a, b) => {
    return a.cost - b.cost;
  }
}

class Products extends React.Component {
  state = {
    products: null,
    sortedBy: 'id'
  }

  componentDidMount() {
    Axios.get('http://localhost:5000/api/products', { headers: { 'authorization-token': localStorage.getItem('authToken') }})
      .then(response => {
          this.setState({
            products: response.data
          })
        })
      .catch(error => {
        if (error.response.status === 401) {
          this.props.history.push('/login');
        } else {
          console.error(error);
        }
      })
  }

  fillTable = (products) => {
    let i = 0;
    const sort = this.state.sortedBy;

    const component = products.map(product => 
      (<tr key={ product._id }>
        <th scope="row" className={ sort === 'id' ? 'bg-light' : '' }>{ ++i }</th>
        <td className={ sort === 'product' ? 'bg-light' : '' }>{ product.name }</td>
        <td className={ sort === 'description' ? 'bg-light' : '' }>{ product.description }</td>
        <td className={ sort === 'price' ? 'bg-light' : '' }>{ product.cost }</td>
      </tr>)
    )
      
    return component
  }

  sortTable = (e) => {
    const sorted = this.state.products.sort(comparers[e.target.id]);

    this.setState({
      products: sorted,
      sortedBy: e.target.id
    })
  }

  render() {
    let table = null

    if (this.state.products === null) {
      table = (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>)
    } else {

      table = this.state.products.length > 0 ? (
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">№</th>
              <th scope="col" id="product" onClick={ this.sortTable } className="pointer">Product</th>
              <th scope="col" id="description" onClick={ this.sortTable } className="pointer">Description</th>
              <th scope="col" id="price" onClick={ this.sortTable } className="pointer">Price</th>
            </tr>
          </thead>
          <tbody>
            { this.fillTable(this.state.products) }
          </tbody>
        </table>
      ) : (
        <small className="text-muted mt-5 ml-5">There are no products to display!</small>
      )
    }

    return(
      <div>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2 ml-4">Products</h1>
        </div>
    
        <div>
          { table }
        </div>
      </div>
    )
  }
}

export default Navigation(Products)