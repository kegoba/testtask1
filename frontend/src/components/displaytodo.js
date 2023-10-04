import React, {Component} from  "react";
//import { Link } from "react-dom";
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom'
import Loader from "./loader";
import { Navigate } from "react-router-dom";

import "axios";
import Axios from "axios";
const BASE_URL =  'http://localhost:5000/api/v1/'
class DisplayTodo extends Component{
    constructor(props){
    super(props) 
    this.state={
        result : [],
        qry : [],
        id :"",
        isLoading: true,
        success : null,
        error : null
    }
    };

    componentDidMount() {
        Axios.get(BASE_URL +'displayall')
            .then(response => {
                this.setState({ 
                    result: response.data.todo ,
                    isLoading: false,
                });

                return this.state.result
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    handleDelete(id) {
        Axios.delete(BASE_URL+"delete/" + id )
        .then((resp)=>{
            if(resp.status ===200){
              
              this.setState({
                success :"DELETED SUCCESSFULY "
              })
              alert("DELETED SUCCESSFULY")
        
        
            }else{
              alert("error occur")
            }
          })
          .catch((err)=>{
            this.setState({
              error : err,
            
            })
          })
    
    }
    
render(){
    const { isLoading ,success, error} = this.state;
    if (isLoading){
        return(
            <div className="loader">
            <Loader/>
            </div>
        )   
    }
    return (
        <div className="view">
            
            < table className="table table-responsive-sm ">
                <thead key="thead">
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Tittle</th>
                        <th scope="col">Description</th>
                        <th scope="col"> Edith</th>
                        <th scope="col" > Delete</th>
                    </tr>
                </thead>

                
                <tbody>
                    {this.state.result.map((qry, i) => 
                        <tr key={qry.id} obj={i}>
                             <td>{qry.id}  </td>
                             <td>{qry.tittle}</td>
                             <td>{qry.description}</td>
                            <td> <button > <Link to={"/displayone/" + qry.id} className="nav-link"> Edith </Link> </button> </td>
                            <td> <button onClick={this.handleDelete.bind(this, qry.id)} >  Delete  </button> </td>
                         </tr>
                    
                    )}  
                </tbody>
               
            </table>
            
        </div>
    );
}

}

export default DisplayTodo;