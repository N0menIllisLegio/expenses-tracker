import React from 'react';
import Navigation from './Navigation'
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import Axios from 'axios'
import { Calendar } from 'react-feather';
import { Dropdown, ButtonGroup, Button } from "react-bootstrap";
import html2canvas from 'html2canvas';

class Dashboard extends React.Component {
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
        console.log(error)
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

  getUniqueYears(years) {
    var uniqueYears = [];
    years.forEach(year => { if (!uniqueYears.includes(year)){ uniqueYears.push(year) } });
    return uniqueYears;
  }

  getYears = (bills) => {
    var years = bills.map(bill => bill.date.getFullYear() );
    var uniqueYears = this.getUniqueYears(years);
    years = uniqueYears.map(year => (<Dropdown.Item onClick={ (e) => this.filterByYears(e) } id={year} key={year}>{year}</Dropdown.Item>))

    const dropdown = years.length > 1 ? (
      <Dropdown as={ ButtonGroup }>
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
    
    return dropdown
  }

  export = () => {
    const input = document.getElementById('export');
    html2canvas(input, {scale: 1})
      .then((canvas) => {
        var a = document.createElement('a');
        a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
        a.download = 'Dashboard.jpg';
        a.click();
      });
  }

  getBillsPrice = (bill) => {
    var price = 0;

    bill.products.forEach(product => price += product.cost)

    return price
  }

  fillTable = (bills) => {
    var i = 0;
    const rows = bills.map(bill => {
      i++;
      const date = bill.date.toLocaleDateString("en-EN", { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' });
      var price = this.getBillsPrice(bill);
      
      return (
        <tr key={ bill._id }>
          <td className="dashboardCell">{ i }</td>
          <td className="dashboardCell">{ bill.name }</td>
          <td className="dashboardCell">{ price }</td>
          <td className="dashboardCell">{ bill.description }</td>
          <td>{ date }</td>
        </tr>
    )})

    return rows
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  fillChart = (bills) => {
    const chartData = [
      { name: 'Jan' },
      { name: 'Feb' },
      { name: 'March' },
      { name: 'April' },
      { name: 'May' },
      { name: 'June' },
      { name: 'July' },
      { name: 'Aug' },
      { name: 'Sep' },
      { name: 'Oct' },
      { name: 'Nov' },
      { name: 'Dec' },
    ];

    const years = bills.map(bill => bill.date.getFullYear() );
    const uniqueYears = this.getUniqueYears(years);

    uniqueYears.forEach(year => {
      chartData.forEach(data => data[year] = 0)
    });

    bills.forEach(bill => {
      chartData[bill.date.getMonth()][bill.date.getFullYear()] += this.getBillsPrice(bill)
    })

    const lines = uniqueYears.map(year => <Line type="monotone" dataKey={year} key={year} stroke={ this.getRandomColor() } />)

    return (
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" dy={10} />
        <YAxis dx={-10}/>
        <Tooltip />
        <Legend verticalAlign="top" height={36}/>
        { lines }
      </LineChart>
    )
  }

  render() {
    var content = null
    var dropdown = (<div></div>)

    if (this.state.displayedBills === null) {
      content = (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>)
    } else {
      dropdown = this.getYears(this.state.bills);
      const chart = this.fillChart(this.state.displayedBills);

      content = this.state.displayedBills.length > 0 ? (
        <div>
        <div style={{ width: '100%', height: '50vh' }}>
            <ResponsiveContainer>
              { chart } 
            </ResponsiveContainer>
          </div>
          <div className="mt-5">
            <h2 className="mb-3 ml-4">Bills</h2>
            <div className="table-responsive">
              <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th>№</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  { this.fillTable(this.state.displayedBills) }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-5"><small className="text-muted ml-5">There are no bills to display!</small></div>
      )
    }

    return(
      <div id="export">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2 ml-4">Dashboard</h1>
          <div className="btn-toolbar mb-2 mb-md-0 mr-4">
            <ButtonGroup>
              <Button variant="outline-secondary" className="btn btn-sm" onClick={this.export}>Export</Button>
              { dropdown }
            </ButtonGroup>
          </div>
        </div>
          { content }
      </div>
    )
  }
}

export default Navigation(Dashboard)