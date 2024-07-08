import "./home.css"
import React from "react"
import { useState } from "react";
import Party from "../party/party"
import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';
import ShowHouses from "./showHouses";

function Home(){
    const [showHouses, setShowHouses] = useState(false)
    const handleClick = () => {
        setShowHouses(!showHouses)
    }
    return ( 
        <div>
            <p id="happening">Throwing Tonight</p>
            <Party/>
            <button type="submit" id = "add_more" onClick={handleClick} ><Icon path={mdiPlus} size={1} /></button>
            {showHouses && <ShowHouses />}
            <button id = "chat">Join Live Chat</button>
        </div>
    )
}
export default Home