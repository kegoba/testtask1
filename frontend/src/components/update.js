import React, { Component } from "react";
import { Link } from "react-dom";
import Axios from "axios";
import { Navigate } from "react-router-dom";

const BASE_URL =  'http://localhost:5000/api/v1/'
class Update extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tittle: "",
            description: "",
            id :"",
            error : null,
            success : null

        }
    }
     async componentDidMount (){
        const id = window.location.href.split('/')[4]
        await Axios.get(BASE_URL +`displayone/${id}`) 
        .then(response =>{
            console.log(response.data.todo)
        this.setState({
            id : id,
            tittle: response.data.todo.tittle,
            description: response.data.todo.description,
            
        })})
        .catch(function(error){
            this.setState({
                error : error
            })
        })
    }
    onchangeTittle = (event) =>{
        console.log(event.target.value)
        this.setState({
            tittle: event.target.value
        });
    }


    onchangeDescription= (event) =>{
        event.preventDefault();
        console.log(event.target.value)
        this.setState({
            description: event.target.value
        });
    }
    handleSubmit = (event) => {
        event.preventDefault();

        const postdata = {
            "tittle": this.state.tittle,
            "description": this.state.description
        }
        
        Axios.put(BASE_URL +`update/${this.state.id}`, postdata)
        .then((resp)=>{
            if(resp.status ===200){
              alert("updated successfuly")
              this.setState({
                success : "updated successfuly",
                description : "",
                tittle : ""
              })
              window.location.reload();
        
            }else{
              alert("record not save")
            }
          })
          .catch((err)=>{
            this.setState({
              error : err,
            
            })
          })

    }
    render() {
        let { success, error } = this.state;
        return (
            <div className="container page-wraper">
            {error && <p>{error}</p>}
           {success && (
             <Navigate to="/displaytodo" replace={true} />
           )}
           <div className="row align-items-center todo" >
           <div className="mx-auto col-10 col-md-8 col-lg-6">
    
             <form className="form-example" action="" method="post">
               <p className="text-center"> Update Todo </p>
               <div className="form-group">
               
                 <input
                 onChange={this.onchangeTittle}
                 value={this.state.tittle}
                   type="text"
                   className="form-control text-center"
                   placeholder="Enter Tittle"

                 />
               </div>
               <div className="form-group">
                 <textarea
                 onChange={this.onchangeDescription}
                 value={this.state.description}
                   type="text"
                   className="form-control text-center"
                   placeholder="Enter Content"
                 />
               </div>
                
               <button type="submit" className="btn btn-primary btn-customized mt-4" onClick={this.handlePostContent}>
                 Update
               </button>
             </form>
            
            
           </div>
         </div>
   
   
               </div>
        )
    }
}
export default Update;