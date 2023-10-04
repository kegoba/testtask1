import React, { Component } from "react"
import {  Link } from 'react-router-dom'
import { Navigate } from "react-router-dom";

class Menu extends Component { 
  constructor(props){
    super(props) 
    this.state= {
      is_login : null,

    }}


        componentDidMount() {
          const user = JSON.stringify(localStorage.getItem('user'))
          console.log("i am here", user)

        }

        handLogout = ()=>{
          localStorage.removeItem('user')
          this.setState({
            success : "logout successfully"
          })

        }
     
    render() {
      const {is_login, success, error} = this.state
        return (
          <div className="container text-left">
            
            <div className="menu">
              <nav className="navbar fixed-top menu navbar-expand-lg navbar-light ">
                <Link className="navbar-brand" to={"/"}> Home</Link>
                <button
                  type="button"
                  className="navbar-toggler"
                  data-toggle="collapse"
                  data-target="#dropDrown"
                >
                  <span className="navbar-toggler-icon"> </span>
                </button>
                <div className="collapse navbar-collapse" id="dropDrown">
                {is_login ?
            (   <ul className="navbar-nav ">
              <li className="nav-item text-left">
                      <Link to={"/displaytodo"} className="nav-link">
                        DisplayTodo
                      </Link>
                    </li>
                    <li className="nav-item text-left">
                      <Link to={"/login"} className="nav-link">
                        Login
                      </Link>
                    </li> 
                    </ul>):
                    ( <ul className="navbar-nav ">
                      <li className="nav-item text-left">
                  <Link to={"/displaytodo"} className="nav-link">
                        DisplayTodo
                      </Link>
                    </li>
                  
                  <li className="nav-item text-left">
                      <Link to={"/addtodo"} className="nav-link">
                        Addtodo
                      </Link>
                    </li>
                    <li className="nav-item text-left">
                      <Link onClick={this.handLogout} className="nav-link">
                        LogOut
                      </Link>
                    </li>
                    </ul>)}
                </div>
              </nav>
            </div>

          </div>
        );
    }
}

export default Menu;