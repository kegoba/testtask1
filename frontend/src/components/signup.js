import React, { Component } from "react";
import Axios from "axios";
import { Navigate } from "react-router-dom";
import {Alert} from "reactstrap"

const BASE_URL =  'http://localhost:5000/api/v1/'
class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      user : [],
      name: "",
      email: "",
      password: "",
      error : false,
      success : null,
    };
  }
  onchangeName = (e) => {
    this.setState({
      name: e.target.value,
    });
  }
  onchangeEmail =(e) => {
    this.setState({
      email: e.target.value,
    });
    console.log(this.state.email)
  }
  onchangePassword =(e) => {
    this.setState({
      password: e.target.value,
    });
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    const {name, email, password} = this.state
    if ((name.length >4) && (email.length >4 ) && (password.length>3)){
      const postdata = { name: name, email: email, password: password};
      Axios.post(BASE_URL+"signup", postdata)
        .then((resp) => {
            if (resp.status ===200){
                this.setState({
                    success: "login successful"
                })
            }
         // console.log("registration successful", resp.data)
        })
        .catch((err) => {
          console.log(err)
          this.setState({
            error : false
          })
        })
    } else{
      console.log("invalid data")
      this.setState({ error: true }, () => {
        window.setTimeout(()=>{
          this.setState({
            error : false
          })
        },4000)
       })
    }   
  };
  render() {
    let { success, error } = this.state;
    return (
      
        <div className="container page-wraper mx-auto col-10 col-md-8 col-lg-6 ">
        {error && <p>{error}</p>}
        {success && (
          <Navigate to="/login" replace={true} />
        )}
        <Alert isOpen={this.state.error}> Please Enter a Valid Data </Alert>
        <div className=" container login-form text-center">
          <div className="container">
            <div className="row">
              <div className="col">
                <input
                className="text-center form-control"
                  placeholder="Full Name"
                  type="text"
                  onChange={this.onchangeName}
                  value={this.state.name}
                />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col">
                <input
                  placeholder="E-mail"
                  type="text"
                  onChange={this.onchangeEmail}
                  value={this.state.email}
                  className="form-control text-center"
                />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col">
                <input
                  placeholder="Password"
                  type="password"
                  onChange={this.onchangePassword}
                  value={this.state.password}
                  className="form-control text-center"
                />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={this.handleSubmit}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;