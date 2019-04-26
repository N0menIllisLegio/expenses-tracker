import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Bills from './components/Bills';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import Users from './components/Users'
// import io from 'socket.io-client';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <Route path='/login' component={ LogIn }/>
          <Route path='/signup' component={ SignUp }/>
          <Route path='/dashboard' component={ Dashboard }/>
          <Route path='/bills' component={ Bills }/>
          <Route path='/products' component={ Products }/>
          <Route path='/users' component={ Users }/>
      </div>
    </BrowserRouter>
  );
}

export default App;

//  
// <Route exact path='/' render={(props) => <Notes {...props} socket={ this.state.socket } />}/>