import React from 'react'
import { Link } from 'react-router-dom'
import { Home, File, ShoppingCart, LogOut } from 'react-feather';
import logo from '../icons/icon1.svg';

function Navigation(WrappedComponent) {
  return class extends React.Component {
    render(){
      return (
        <div>
          <nav className="navbar navbar-expand-xl navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow justify-content-between">
            <div className="col-md-2 mr-0 navbar-brand d-flex align-items-center">
              <Link to="/">
                <img src={logo} alt="logo" width='32' height='32' className="ml-0"/>
              </Link>
              <span className="ml-4">Expenses Tracker</span>
            </div>
            
            <ul className="navbar-nav d-flex flex-row px-3 justify-content-between align-items-center">
              <li className="nav-item px-3">
                <Link className="nav-link" to="/">
                <div className="d-flex flex-column align-items-center">
                  <Home size={20}/>
                  <span>Dashboard</span>
                </div>
                </Link>
              </li>
              <li className="nav-item px-3">
                <Link className="nav-link" to="/bills">
                <div className="d-flex flex-column align-items-center">
                  <File size={20}/>
                  <span>Bills</span>
                </div>
                </Link>
              </li>
              <li className="nav-item px-3">
                <Link className="nav-link" to="/products">
                  <div className="d-flex flex-column align-items-center">
                    <ShoppingCart size={20}/>
                    <span>Products</span>
                  </div>
                </Link>
              </li>
              <li className="nav-item text-nowrap px-3">
                <Link className="nav-link text-danger" to="/login" onClick={() => localStorage.removeItem('authToken')}>
                  <div className="d-flex flex-column align-items-center">
                    <LogOut size={20}/>
                    <span>Sign out</span>
                  </div>
                </Link>
              </li>
            </ul>
          </nav>


          <main className="px-5 my-5 pt-5 pt-md-3 pt-lg-3 pt-xl-3 row">
            <div className="pt-4 pt-md-0 pt-lg-0 pt-xl-0 col">
              <WrappedComponent {...this.props}/>
            </div>
          </main>
        </div>
      )
    }
  }
}

export default Navigation