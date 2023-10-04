import React, { Component } from "react"
import {  Link } from 'react-router-dom'




class Menu extends Component {  
    render() {
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
                  <ul className="navbar-nav ">
                    <li className="nav-item text-left">
                      <Link to={"/addtodo"} className="nav-link">
                        Addtodo
                      </Link>
                    </li>
                    <li className="nav-item text-left">
                      <Link to={"/displaytodo"} className="nav-link">
                        DisplayTodo
                      </Link>
                    </li>
                    <li className="nav-item text-left">
                      <Link to={"/addemail"} className="nav-link">
                        AddEmail
                      </Link>
                    </li>
                     <li className="nav-item text-left">
                    </li>
                  
                  </ul>
                </div>
              </nav>
            </div>

          </div>
        );
    }
}

export default Menu;