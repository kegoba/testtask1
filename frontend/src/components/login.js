
import React, { Component } from "react";
import { Link } from "react-router-dom";
import {Alert} from "reactstrap"
import axios from "axios";

import { Navigate } from "react-router-dom";
const BASE_URL =  'http://localhost:5000/api/v1/'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      email: "",
      password: "",
      isLogin: false,
      error : false,
      message : "",
      success : null,
      info :  null
    };
  }

  onchangeEmail = (event) => {
    this.setState({email: event.target.value,});
  }
  onchangePassword= (event)=> {
    this.setState({ password: event.target.value,});
  }

  handleLogin = () => {
    const { email, password} = this.state
    if (email.length < 5 && password.length < 3){
      this.setState({error : true, message : "Please Enter A Valid Data"},()=>{
          window.setTimeout(()=>{
          this.setState({
          error : false
          })
        }, 3000)
      })
    } else {
    const postdata = {email: email, password: password, };
    axios.post( BASE_URL + "login", postdata)
        .then((resp) => {
          if (resp.status === 200){
            //store token to local storage
            const user =resp.data.access_token
            localStorage.setItem('user', user)
            this.setState({user : resp.data,
                success : 'login successful'
                })
            
        }
        else if ( resp.status === 300){
        this.setState({error: true, message: "InValid Data"}, () => {
            window.setTimeout(() => {
            this.setState({error: false})
          }, 3000)
        })} 
      })
      .catch( (err)=> {
        this.setState({ error: true, message: "Error While Trying To  Login"}, 
        () => {
          window.setTimeout(() => {
          this.setState({error: false})
        },3000)})
    
      });
    }
  };


  render() {
    let { success, info } = this.state;
    return (
      <div className=" container page-wraper mx-auto col-10 col-md-8 col-lg-6 ">
        
        <div className="login-form">
        {info && <p>{info}</p>}
        {success && (
          <Navigate to="/addtodo" replace={true} />
        )}
          <Alert isOpen={this.state.error} >{ this.state.message} </Alert>
          <div className="container ">
            <div className="row">
              <div className="col">
                <input
                
                  placeholder="E-mail"
                  type="text"
                  className="form-control text-center" 
                  onChange={this.onchangeEmail}
                  value={this.state.email}
                />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col">
                <input
                className="form-control text-center"
                  placeholder="Password"
                  type="password"
                  autoComplete="on"
                  onChange={this.onchangePassword}
                  value={this.state.password}
                />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col">
                <button
                  type="submit"
                  className="btn btn-primary btn-customized mt-4"
                  onClick={this.handleLogin}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col">
                <p className="registered">
                  Not registered? <Link to={"/signup"}> SignUp </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login