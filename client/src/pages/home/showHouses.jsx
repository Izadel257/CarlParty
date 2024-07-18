import React from "react";
import AllHouses from "../../assets/houses";
import { useState } from "react";
import { HouseContext } from "../../context/houseContext";
import { useContext } from "react";
import Datetime from 'react-datetime';
// import 'react-datetime/css/react-datetime.css';

function ShowHouses(){
    const [partyDate, setPartyDate] = useState('')
    const { handleThrowingClick } = useContext(HouseContext)
    const handleHouseClick = async(houseName) =>{
        return (
            setClickedHouse(houseName)
           )
    }
    const [clickedHouse, setClickedHouse] = useState(null);

    function HouseForm ({houseName}){
        return (
            <div>
                <form >
                    <label id = "date_party">Date</label>
                    <Datetime
                        value = {partyDate}
                        // onChange={(date) => setPartyDate(date)}
                        dateFormat="MM/DD/YYYY"
                        timeFormat="HH:mm"
                        closeOnSelect={false}
                        closeOnClickOutside={false}
                        className="datetime-wrapper"
                        clock={true}
                    />
                    <button type="submit" onClick={ async() => await handleThrowingClick (houseName, partyDate)}>go</button>
                </form>
                
            </div>
        )
    }

    return(
        <div>
        <h2>All the Houses</h2>
        <ul>
            {AllHouses.map((house, index) => (
            <button onClick={ async () => await handleHouseClick(house.name)}>
                <li key={index}>{house.name}</li>
            </button>
            ))}
            {clickedHouse && <HouseForm houseName= {clickedHouse} />}
        </ul>
        </div>
    )
}

export default ShowHouses; 