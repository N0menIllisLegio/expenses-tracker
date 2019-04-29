import React from 'react';
import Navigation from './Navigation'
import { Link } from 'react-router-dom'
import StackGrid from "react-stack-grid";
import { Calendar, PlusCircle, Edit } from 'react-feather';
import { Dropdown } from "react-bootstrap";
import Axios from 'axios';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

class Bills extends React.Component {
  state = {
    displayedBills: null,
    bills: null
  }

  componentDidMount() {
    Axios.get(`http://${this.props.serverIP}/api/bills`, { headers: { 'authorization-token': localStorage.getItem('authToken') }})
      .then(response => {
          let bills = response.data.map(bill => {
            return {
              _id: bill._id,
              name: bill.name,
              description: bill.description,
              products: bill.products,
              date: new Date(bill.date)
            }
          });
          this.setState({
            displayedBills: bills,
            bills: [...bills]
          })
        })
      .catch(error => {
        console.log(error);
        if (error.response.status === 401) {
          this.props.history.push('/login');
        } else {
          console.error(error);
        }
      })
  }

  filterByYears = (e) => {
    const year = e.target.id;
    if (year === 'all') {
      this.setState({
        displayedBills: [...this.state.bills]
      })
    } else {
      this.setState({
        displayedBills: this.state.bills.filter(bill => bill.date.getFullYear().toString() === year)
      })
    }
  }

  cardComponent = (cardData) => {
    const { name, description, products } = cardData;
    const date = cardData.date.toLocaleDateString("en-EN", { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' });
    const productsComponent = products ? products.map(product => 
      <div className="row" key={ product._id }>
        <div className="col-6 d-flex justify-content-start">{ product.name }</div>
        <div className="col-6 d-flex justify-content-end"><em>{ product.cost }</em></div>
      </div>
    ) : (
      <small className="text-muted">Nothing to display!</small>
    )

    return (
      <div className="card bg-light shadow" style={{width: '18rem'}} key={ cardData._id }>
        <div className="card-header d-flex justify-content-between align-items-center">
          <span className="h4 mb-0">{ name }</span>
          <Link to={"/editbill/" + cardData._id}>
            <Edit size={20} className={'text-primary'}/>
          </Link>
        </div>
        <div className="card-body">

          <div className="border-bottom pb-2 mb-2">
            <p className="card-text">{ description }</p>
            <p className="card-text"><small className="text-muted">{ date }</small></p>
          </div>

          { productsComponent }
          
        </div>
      </div>
    )
  }

  addMonthHeaders = (bills) => {
    var component = null;

    for (let i = 0; i < 12; i++) {
      const currMonthBills = bills.filter(bill => bill.date.getMonth() === i);

      if (currMonthBills.length > 0) {
        component = [component, (
          <div className="mt-5" key={i}>
            <div className="border-bottom mb-4">
              <h4 className="mb-3 ml-5">{ months[i] }</h4>
            </div>
            <StackGrid columnWidth={300}>
              {currMonthBills.map(bill => (this.cardComponent(bill)))}
            </StackGrid>
          </div>)]
      }
    }
    
    return (
    <div>
      { component }
    </div>)
  }

  getYears = (bills) => {
    var years = bills.map(bill => bill.date.getFullYear() );
    var uniqueYears = [];
    years.forEach(year => { if (!uniqueYears.includes(year)){ uniqueYears.push(year) } });
    years = uniqueYears.map(year => (<Dropdown.Item onClick={ (e) => this.filterByYears(e) } id={year} key={year}>{year}</Dropdown.Item>))
    
    const dropdown = years.length > 1 ? (
      <Dropdown>
        <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic" className="btn-sm d-flex align-items-center">
          <Calendar/>
          <span className="ml-2">Years</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={ (e) => this.filterByYears(e) } id={'all'} key={'all'}>All</Dropdown.Item>
          { years } 
        </Dropdown.Menu>
      </Dropdown>
    ) : (<div></div>)
    
    return (dropdown)
  }

  render() {
    var billsComponent = null
    var dropdown = (<div></div>)

    if (this.state.displayedBills === null) {
      billsComponent = (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>)
    } else {
      dropdown = this.getYears(this.state.bills);

      billsComponent = this.state.displayedBills.length > 0 ? (
        <div>
          { this.addMonthHeaders(this.state.displayedBills) }
        </div>
      ) : (
        <small className="text-muted mt-5 ml-5">There are no bills to display!</small>
      )
    }

    return(
      <div>

        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2 ml-4">Bills</h1>
          <div className="btn-toolbar mb-2 mb-md-0 mr-4">
            { dropdown }
          </div>
        </div>

        <div> { billsComponent } </div>

        <div className="fixed-bottom d-flex justify-content-end mb-4 mr-4">
          <Link to="/addbill/-1" className="shadow rounded-circle bg-primary text-white">
            <PlusCircle size={45}/>
          </Link>
        </div>

      </div>
    )
  }
}

export default Navigation(Bills)