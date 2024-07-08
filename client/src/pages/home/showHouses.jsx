import React from "react";
import AllHouses from "../../assets/houses";
import { useState } from "react";
import { HouseContext } from "../../context/houseContext";
import { useContext } from "react";

function ShowHouses(){
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
                <form>
                    <p>Date</p>
                    <input type="text"></input>
                </form>
                <button onClick={ async() => await handleThrowingClick (houseName)}>go</button>
            </div>
        )
    }

    return(
        <div>
        <h2>All the Houses</h2>
        <ul>
            {AllHouses.map((house, index) => (
            <button onClick={ async () => await handleHouseClick(house.name)}>
                <li key={index} color="red">{house.name}</li>
            </button>
            ))}
            {clickedHouse && <HouseForm houseName= {clickedHouse} />}
        </ul>
        </div>
    )
}

export default ShowHouses; 