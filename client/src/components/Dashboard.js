import React from 'react';
import Navigation from './Navigation'
import { Link } from 'react-router-dom'
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, Legend, ResponsiveContainer } from 'recharts'

import { Calendar } from 'react-feather';
import { Dropdown, ButtonGroup, Button } from "react-bootstrap";

const monthData = [
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

const data = [
  {
    name: 'Jan', Money: 4000, year: 2019
  },
  {
    name: 'Feb', Money: 3000, year: 2019
  },
  {
    name: 'March', Money: 2000, year: 2019
  },
  {
    name: 'April', Money: 2780, year: 2019
  },
  {
    name: 'May', Money: 1890, year: 2019
  },
  {
    name: 'June', Money: 2390, year: 2019
  },
  {
    name: 'July', Money: 3490, year: 2019
  },
  {
    name: 'Aug', Money: 2000, year: 2019
  },
  {
    name: 'Sep', Money: 2780, year: 2019
  },
  {
    name: 'Oct', Money: 1890, year: 2019
  },
  {
    name: 'Nov', Money: 2390, year: 2019
  },
  {
    name: 'Dec', Money: 3490, year: 2019
  },
];

class Dashboard extends React.Component {

  render() {
    return(
      <div>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2 ml-4">Dashboard</h1>
          <div className="btn-toolbar mb-2 mb-md-0 mr-4">
            <ButtonGroup>
              <Button variant="outline-secondary" className="btn btn-sm">Export</Button>
              <Dropdown as={ButtonGroup}>
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
            </ButtonGroup>
          </div>
        </div>

        <div style={{ width: '100%', height: '50vh' }}>
          <ResponsiveContainer>
            <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" dy={10} />
              <YAxis dx={-10}/>
              <Tooltip />
              <Line type="monotone" dataKey="Money" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-5">
        <h2 className="mb-3">Bills</h2>
        <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Header</th>
              <th>Header</th>
              <th>Header</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1,001</td>
              <td>Lorem</td>
              <td>ipsum</td>
              <td>dolor</td>
            </tr>
            <tr>
              <td>1,002</td>
              <td>amet</td>
              <td>consectetur</td>
              <td>adipiscing</td>
            </tr>
            <tr>
              <td>1,003</td>
              <td>Integer</td>
              <td>nec</td>
              <td>odio</td>
            </tr>
            <tr>
              <td>1,003</td>
              <td>libero</td>
              <td>Sed</td>
              <td>cursus</td>
            </tr>
            <tr>
              <td>1,004</td>
              <td>dapibus</td>
              <td>diam</td>
              <td>Sed</td>
            </tr>
            <tr>
              <td>1,005</td>
              <td>Nulla</td>
              <td>quis</td>
              <td>sem</td>
            </tr>
            <tr>
              <td>1,006</td>
              <td>nibh</td>
              <td>elementum</td>
              <td>imperdiet</td>
            </tr>
            <tr>
              <td>1,007</td>
              <td>sagittis</td>
              <td>ipsum</td>
              <td>Praesent</td>
            </tr>
            <tr>
              <td>1,008</td>
              <td>Fusce</td>
              <td>nec</td>
              <td>tellus</td>
            </tr>
            <tr>
              <td>1,009</td>
              <td>augue</td>
              <td>semper</td>
              <td>porta</td>
            </tr>
            <tr>
              <td>1,010</td>
              <td>massa</td>
              <td>Vestibulum</td>
              <td>lacinia</td>
            </tr>
            <tr>
              <td>1,011</td>
              <td>eget</td>
              <td>nulla</td>
              <td>Class</td>
            </tr>
            <tr>
              <td>1,012</td>
              <td>taciti</td>
              <td>sociosqu</td>
              <td>ad</td>
            </tr>
            <tr>
              <td>1,013</td>
              <td>torquent</td>
              <td>per</td>
              <td>conubia</td>
            </tr>
            <tr>
              <td>1,014</td>
              <td>per</td>
              <td>inceptos</td>
              <td>himenaeos</td>
            </tr>
            <tr>
              <td>1,015</td>
              <td>sodales</td>
              <td>ligula</td>
              <td>in</td>
            </tr>
          </tbody>
        </table>
        </div>
        </div>
      </div>
    )
  }
}

export default Navigation(Dashboard)