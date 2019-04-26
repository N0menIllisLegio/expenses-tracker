import React from 'react'
import { Link } from 'react-router-dom'
import { Bell, Home, File, ShoppingCart, Users } from 'react-feather';
import logo from '../icons/icon1.svg';

import { OverlayTrigger, Popover } from "react-bootstrap";


function Navigation(WrappedComponent) {
  return class extends React.Component {
    render(){
      return (
        <div>
          <nav className="navbar navbar-expand-sm navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow justify-content-between">
            <div className="col-sm-3 col-md-2 mr-0 navbar-brand d-flex align-items-center">
              <img src={logo} alt="logo" width='32' height='32' className="ml-3"/>
              <span className="ml-4">Username</span>
            </div>
            <ul className="navbar-nav px-3 d-flex align-items-center">
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  <OverlayTrigger
                    trigger="click"
                    placement={'bottom'}
                    overlay={
                      <Popover id={`popover-positioned-bottom`}>
                        <strong>Holy guacamole!</strong> Check this info.
                      </Popover>
                    }>
                    <Bell/>
                  </OverlayTrigger>
                </Link>
              </li>

              <li className="nav-item text-nowrap">
                <Link className="nav-link" to="/login">Sign out</Link>
              </li>
            </ul>
          </nav>

          <div className="container-fluid">
            <div className="row">

              <nav className="col-md-2 d-none d-md-block bg-light sidebar mt-2">
                <div className="sidebar-sticky">
                  <ul className="nav flex-column">
                    <li className="nav-item">
                      <Link className="nav-link active" to="/dashboard">
                      <div className="d-flex align-items-center">
                        <Home size={15}/>
                        <span className="ml-2">Dashboard</span>
                      </div>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link active" to="/bills">
                      <div className="d-flex align-items-center">
                        <File size={15}/>
                        <span className="ml-2">Bills</span>
                      </div>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link active" to="/products">
                        <div className="d-flex align-items-center">
                          <ShoppingCart size={15}/>
                          <span className="ml-2">Products</span>
                        </div>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link active" to="/users">
                        <div className="d-flex align-items-center">
                          <Users size={15}/>
                          <span className="ml-2">Users</span>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>

              <main className="col-md-9 ml-sm-auto col-lg-10 px-4 pt-5 mt-2">
                <WrappedComponent />
              </main>

            </div>
          </div>
        </div>
      )
    }
  }
}

export default Navigation