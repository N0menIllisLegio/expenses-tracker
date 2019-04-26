import React from 'react'
import logo from '../icons/icon1.svg';

class LogIn extends React.Component {
  render(){
    return(
      <div style={{height: '100vh', display: 'flex', justifyContent:'center', alignItems:'center', backgroundColor: '#f5f5f5'}}>
        <div className="container d-flex justify-content-center" >

          <form className="form-signin col-6 text-center">
            <img src={logo} alt="logo" width='128' height='128' className="mb-3"/>

            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

            <div className="row justify-content-center">
              <div className="col-lg-7">
                <div className="form-group">
                  <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required/>
                </div>
                <div className="form-group">
                  <input type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
                </div>
              </div>
            </div>

            <div className="btn-group">
              <button className="btn btn-primary" type="submit">Sign in</button>
              <button className="btn btn-primary" type="submit">Sign up</button>
            </div>

            <p className="mt-5 mb-3 text-muted">&copy; Dmitry Mukhliada</p>

          </form>
        </div>
      </div>
    )
  }
}

export default LogIn