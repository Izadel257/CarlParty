import React from "react"
import { Navigate, Link} from 'react-router-dom';
import "./navigation.css"

function Navigation (){
    const leave = () => {
        // Navigate to the 'the leave page'
        <Navigate to="/leave" />;
    };
    return (
        <div id = "navigation">
            <div id = "logo">
                <button type="Submit">
                    <Link to = "/">
                    <img src= "" alt = "This is the app logo."></img>  
                    </Link>
                </button> 
            </div>
            
            <div id = "carlparty">
                <Link to = "/">
                    CarlParty
                </Link>
            </div>
            <div id = "leave">
                <button type="Submit">
                    <Link to = "/leave">
                    <p>Leave App</p> 
                    </Link>
                </button> 
            </div>
        </div>
    )
}

export default Navigation