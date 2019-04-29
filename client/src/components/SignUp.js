import React from 'react';
import Axios from 'axios';
import { toast } from 'react-toastify';
import logo from '../icons/icon1.svg';
import 'react-toastify/dist/ReactToastify.css';

class SignUp extends React.Component {
  state ={
    username: '',
    email: '',
    password: '',
    repPass: '',

    passDontMatch: false,
    emailExists: false
  }

  handleUsernameInput = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  handleEmailInput = (e) => {
    this.setState({
      email: e.target.value
    })
  }

  handlePasswordInput = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  handleRepPassInput = (e) => {
    this.setState({
      repPass: e.target.value
    })
  }

  handleSignUp = (e) => {
    e.preventDefault();

    this.setState({
      passDontMatch: false,
      emailExists: false
    })

    const username = this.state.username;
    const email = this.state.email;
    const password = this.state.password;
    const repPass = this.state.repPass;

    if (repPass !== password) {
      this.setState({
        passDontMatch: true
      })
    } else {
      Axios.post(`http://${this.props.serverIP}/users/signup`, { username: username, email: email, password: password })
      .then(response => { 
        toast(<span>You are signed up!<br/>Redirecting back to LogIn...</span>, { 
          type: 'success', hideProgressBar: true, 
          position: 'bottom-right', autoClose: 3000,
          onClose: () => this.props.history.push('/login')
        });
      })
      .catch(error =>  {
        if (error.response.data.msg === 'Failed to create user') {
          this.setState({
            emailExists: true
          })
        } else {
          console.error(error);
        }
      });
    }
  }

  render() {
    const errorEmail = this.state.emailExists ? (
      <small id="emailHelp" className="form-text text-danger text-left ml-3">This email already exists!</small>
    ) : (<div></div>)
    const errorPass = this.state.passDontMatch ? (
      <small id="passwordHelp" className={"form-text text-danger text-left ml-3"}>Passwords don't match!</small>
    ) : (<div></div>)

    return(
      <div style={{height: '100vh', display: 'flex', justifyContent:'center', alignItems:'center', backgroundColor: '#f5f5f5'}}>
        <div className="container d-flex justify-content-center" >

          <form className="form-signin col-6 text-center" onSubmit={ this.handleSignUp }>
            <img src={logo} alt="logo" width='128' height='128' className="mb-3 pointer" onClick={ () => this.props.history.push('/login') } />
            <h1 className="h3 mb-3 font-weight-normal">Sign Up</h1>
            <div className="row justify-content-center">
              <div className="col-lg-7">
                <div className="form-group">
                  <input type="text" id="inputUsername" className="form-control" placeholder="Username" 
                    value={ this.state.username } onChange={ this.handleUsernameInput } required/>
                </div>
                <div className="form-group">
                  <input type="email" id="inputEmail" className="form-control" placeholder="Email address" 
                    value={ this.state.email } onChange={ this.handleEmailInput } required/>
                  { errorEmail }
                </div>
                <div className="form-group">
                  <input type="password" id="inputPassword" className="form-control" placeholder="Password" 
                    value={ this.state.password } onChange={ this.handlePasswordInput } required/>
                </div>
                <div className="form-group">
                  <input type="password" id="inputRePassword" className="form-control" placeholder="Repeat password" 
                    value={ this.state.repPass } onChange={ this.handleRepPassInput } required/>
                  { errorPass }
                </div>
              </div>
            </div>

              <button className="btn btn-primary mt-3" type="submit">Sign up</button>
              <p className="mt-5 mb-3 text-muted">&copy; Dmitry Mukhliada</p>
          </form>

        </div>
      </div>
    )
  }
}

export default SignUp