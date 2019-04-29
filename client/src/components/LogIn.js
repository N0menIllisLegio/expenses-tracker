import React from 'react';
import Axios from 'axios';
import logo from '../icons/icon1.svg';

class LogIn extends React.Component {
  state = {
    email: '',
    password: '',

    invalidEmail: false,
    invalidPass: false
  }

  handlePasswordInput = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  handleEmailInput = (e) => {
    this.setState({
      email: e.target.value
    })
  }

  handleLogIn = (e) => {
    e.preventDefault();
    this.setState({
      invalidEmail: false,
      invalidPass: false
    });

    const email = this.state.email;
    const password = this.state.password;

    Axios.post(`http://${this.props.serverIP}/users/login`, { email: email, password: password })
      .then(response => { 
        localStorage.setItem('authToken', response.data.token);
        this.props.history.push('/'); 
      })
      .catch(error => {
        if (error.response.data.msg === 'Invalid email') {
          this.setState({
            invalidEmail: true
          })
        } else {
          if (error.response.data.msg === 'Invalid password') {
            this.setState({
              invalidPass: true
            })
          } else {
            console.error(error);
          }
        }
      });
  }

  handleSignUp = () => {
    this.props.history.push('/signup');
  }

  render(){
    const errorEmail = this.state.invalidEmail ? (
      <small id="emailHelp" className="form-text text-danger text-left ml-3">Ivalid Email!</small>
    ) : (<div></div>)
    const errorPass = this.state.invalidPass ? (
      <small id="passwordHelp" className={"form-text text-danger text-left ml-3"}>Ivalid Password!</small>
    ) : (<div></div>)

    return(
      <div style={{height: '100vh', display: 'flex', justifyContent:'center', alignItems:'center', backgroundColor: '#f5f5f5'}}>
        <div className="container d-flex justify-content-center" >

          <form className="form-signin col-6 text-center" onSubmit={ this.handleLogIn }>
            <img src={logo} alt="logo" width='128' height='128' className="mb-3"/>

            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

            <div className="row justify-content-center">
              <div className="col-lg-7">
                <div className="form-group">
                  <input type="email" id="inputEmail" className="form-control" placeholder="Email address" 
                    onChange={ this.handleEmailInput } value={ this.state.email } required/>
                  { errorEmail }
                </div>
                <div className="form-group">
                  <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                    onChange={ this.handlePasswordInput } value={ this.state.password } required/>
                  { errorPass }
                </div>
              </div>
            </div>

            <div className="btn-group">
              <button className="btn btn-primary" type="submit">Sign in</button>
              <button className="btn btn-primary" type="button" onClick={ this.handleSignUp }>Sign up</button>
            </div>

            <p className="mt-5 mb-3 text-muted">&copy; Dmitry Mukhliada</p>

          </form>
        </div>
      </div>
    )
  }
}

export default LogIn