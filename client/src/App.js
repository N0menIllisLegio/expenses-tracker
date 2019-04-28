import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Bills from './components/Bills';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import EditBill from './components/EditBill';

import { toast } from 'react-toastify';

class App extends React.Component {
  componentDidMount() {
    toast.configure();

    // localStorage.removeItem('authToken');
    // console.error(err);
    // window.location.replace("http://localhost:3000/login");
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">  
          <Route path='/login' component={ LogIn } />
          <Route path='/signup' component={ SignUp }/>

          <Route exact path='/' component={ Dashboard }/>
          <Route path='/bills' component={ Bills }/>
          <Route path='/products' component={ Products }/>
          <Route path='/editbill/:id' component={ EditBill }/>
          <Route path='/addbill/:id' component={ EditBill }/>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;

// <Route exact path='/' render={(props) => <Notes {...props} socket={ this.state.socket } />}/>