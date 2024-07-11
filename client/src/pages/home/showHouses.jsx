import React from "react";
import AllHouses from "../../assets/houses";
import { useState } from "react";
import { HouseContext } from "../../context/houseContext";
import { useContext } from "react";

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
                    <input 
                        id= "partyDate" 
                        type="date" 
                        value={partyDate}
                        onChange={(e) => setPartyDate(e.target.value)}
                        required></input>
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