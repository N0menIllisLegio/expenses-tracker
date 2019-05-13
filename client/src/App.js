import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Bills from './components/Bills';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import EditBill from './components/EditBill';

import { toast } from 'react-toastify';

const serverIP = 'IP:PORT';

class App extends React.Component {
  componentDidMount() {
    toast.configure();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">  
          <Route path='/login' render={(props) => <LogIn {...props} serverIP={ serverIP } />}/>
          <Route path='/signup' render={(props) => <SignUp {...props} serverIP={ serverIP } />}/>

          <Route exact path='/' render={(props) => <Dashboard {...props} serverIP={ serverIP } />}/>
          <Route path='/bills' render={(props) => <Bills {...props} serverIP={ serverIP } />}/>
          <Route path='/products' render={(props) => <Products {...props} serverIP={ serverIP } />}/>
          <Route path='/editbill/:id' render={(props) => <EditBill {...props} serverIP={ serverIP } />}/>
          <Route path='/addbill/:id' render={(props) => <EditBill {...props} serverIP={ serverIP } />}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;

// <Route exact path='/' render={(props) => <Notes {...props} socket={ this.state.socket } />}/>
