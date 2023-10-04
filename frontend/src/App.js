import React from 'react';
//import logo from './logo.svg';
import {  Routes, Route } from "react-router-dom";

import './App.css';
import Menu from "./components/menu"
import Addtodo from "./components/addtodo"
import DisplayTodo from "./components/displaytodo"
import Login from "./components/login"
import SignUp from "./components/signup"
import Update from "./components/update"



import Footer from "./components/footer"



function App() {
  return (
     <div className="app">
      <Menu className="menu" />
      <Routes>
        <Route path="/" element={<DisplayTodo/>}/>
        <Route path="/addtodo" element={<Addtodo/>}/>
        <Route path="/displaytodo" element={<DisplayTodo/>}/>
        <Route path="/displayone/:id" element={<Update/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
      </Routes>
       <Footer/>
    </div>
 
  );
}

export default App;