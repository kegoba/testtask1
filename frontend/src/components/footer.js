import React, {Component} from "react";
class Footer extends Component{
    render(){
        return(
            <div className="footer text-center">
                < div className="container">
                    <div className="row">
                        <div className="col">
                            <p> Office address </p>
                            <p>  121 borad street,</p>
                            <p>  Lagos Island  </p>
                            <p>    Nigeria </p>

                            </div>
                        <div className="col">
                                <p> Contact </p>
                                <p>  +2347038034761</p>
                                <p>  +2348130888740  </p>
                                <p> info@kentech.com</p>
                            </div>
                            
                            <div className="col">
                                <p> social media handle </p>
                                <p className="fa fa-facebook">  facebook</p>
                                <p className="fa fa-twitter">  twitter  </p>
                                <p className="fa fa-histagram"> histagram</p>
                            </div>
                   </div>
                </div>
            </div>
        );
    }
}



export default Footer;