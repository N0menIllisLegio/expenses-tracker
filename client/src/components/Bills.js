import React from 'react';
import Navigation from './Navigation'
import { Link } from 'react-router-dom'
import StackGrid from "react-stack-grid";
import { Calendar, PlusCircle } from 'react-feather';
import { Dropdown } from "react-bootstrap";


class Bills extends React.Component {

  cardComponent = () => {
    return(
      <div className="card bg-light shadow" style={{width: '18rem'}}>
        <div className="card-header h4">
          Title
        </div>
        <div className="card-body">
          <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed vero ducimus, soluta itaque, maxime dolores recusandae fugiat tenetur quam tempore et. Perspiciatis, earum quis! Harum, nisi ex. Suscipit, obcaecati iste.</p>
          <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

          <div className="row">
            <div className="col-6">Product 1</div>
            <div className="col-6"><em>Price 1</em></div>
          </div>

          <div className="row">
            <div className="col-6">Product 2</div>
            <div className="col-6"><em>Price 2</em></div>
          </div>

          <div className="row">
            <div className="col-6">Product 3</div>
            <div className="col-6"><em>Price 3</em></div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return(
      <div className="mb-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2 ml-4">Bills</h1>
          <div className="btn-toolbar mb-2 mb-md-0 mr-4">
            <Dropdown>
              <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic" className="btn-sm d-flex align-items-center">
                <Calendar/>
                <span className="ml-2">This year</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        <div>
          <StackGrid columnWidth={300}>
            {this.cardComponent()}
            {this.cardComponent()}
            {this.cardComponent()}
            {this.cardComponent()}
          </StackGrid>
        </div>
        <div className="fixed-bottom d-flex justify-content-end mb-4 mr-4"><Link to="#" className="shadow rounded-circle bg-primary text-white"><PlusCircle size={45}/></Link></div>
      </div>
    )
  }
}

export default Navigation(Bills)