import React, { Component} from "react"
import axios from "axios";
import { Navigate } from "react-router-dom";

const BASE_URL =  'http://localhost:5000/api/v1/'
class Addtodo extends Component{
    constructor(props){
        super(props)       
        this.state ={
            description : "",
            tittle : "",
            error : null,
            success : null
          
        }
    }
   onchangeTittle = (e)=>{
       // alert(e.target.value)
        this.setState({ tittle : e.target.value
    })
   

    }
    onchangeDescription=(e) => {
       // alert(e.target.value)
   
         this.setState({ description: e.target.value
    })
    }

handlePostContent = async (e) =>{
  e.preventDefault()
  let {description, tittle} = this.state
  if (description.length > 5 && tittle.length > 5){
      let postdata = {
        description :  description,
        tittle : tittle
      }
   console.log(postdata)
  await axios.post(BASE_URL+"create", postdata)
  .then((resp)=>{
    console.log(resp)
    if(resp.status ===200){
      console.log(resp.data)
      alert(resp.data.todo)
      this.setState({
        success : resp.data.todo,
        description : "",
        tittle : ""
      })
  


    }else{
      alert("record not save")
    }
  })
  .catch((err)=>{
    this.setState({
      error : err,
    
    })
  })

  }else{
    alert("Please Enter a Valid Data")
    this.setState({
     description: " ",
      tittle : " "
    })
  }

}
  
    render(){
      let { success, error } = this.state;

        return(

        <div className="container page-wraper">
         {error && <p>{error}</p>}
        {success && (
          <Navigate to="/displaytodo" replace={true} />
        )}
        <div className="row align-items-center todo" >
        <div className="mx-auto col-10 col-md-8 col-lg-6">
 
          <form className="form-example" action="" method="post">
            <h1 className="text-center"> Add Todo </h1>
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
                className="form-control password text-center"
                placeholder="Enter Content"
              />
            </div>
             
            <button type="submit" className="btn btn-primary btn-customized mt-4" onClick={this.handlePostContent}>
              Post
            </button>
          </form>
         
         
        </div>
      </div>


            </div>
        )
    }
}
export default Addtodo;