import "./party.css"
import React from "react"
import { useState } from "react";
import Icon from '@mdi/react';
import { mdiThumbUp } from '@mdi/js';
import { mdiThumbDown } from '@mdi/js';
import { mdilComment } from '@mdi/light-js';
import axios from 'axios';
import { Loader } from "@googlemaps/js-api-loader"
import AllHouses from "../../assets/houses";
import { HouseContext } from "../../context/houseContext";
import { useContext } from "react";

function Party(){ 
    // const throwing = ["makamba"]
    const {throwing } = useContext(HouseContext); 
    const getAddressByName = (name) => {
        const foundItem = AllHouses.find(item => item.name === name);
        return foundItem ? foundItem.address : 'Address not found';
      };
    const [showMap, setShowMap] = useState(false);
    const [coordinates, setCoordinates] = useState(null);
    const apiKey = "AIzaSyBoKhRlp8kvQB4ZOnOQxkMhDo3kJR-UEZg"

    // Allow the map to close on click
    const handleClose = async() => {
        if (showMap){
            setShowMap(false)
        }
    }

    // Access the location when it is clicked
    const handleLocationClick = async (locationName) => {
      try {
        const response = await axios.get(`http://localhost:3001/api/maps/location/${encodeURIComponent(locationName)}`);
        setCoordinates(response.data);
        console.log(locationName)
        setShowMap(true)
      } catch (error) {
        console.error('Error fetching from client side location:', error);
      }
    };

    // loader loads the map (from google documentation)
    const loader = new Loader({
        apiKey: apiKey,
        version: "weekly",
      });

    // set likes, dislikes and comments
    const [likes, setLikes] = useState(0); 
    const [dislikes, setDislikes] = useState(0); 
    const  [comments, setComments] = useState(0)
    
    // set the center for the location aka coordinates
    const center = coordinates

    // use the loader to access the map, show the map and add markers
    loader.load().then(async () => {
        const { Map } = await google.maps.importLibrary("maps");
        const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");
        const map = new Map(document.getElementById("map"), {
            center:center,
            zoom: 17,
            mapId: "map", 
        });
        new google.maps.marker.AdvancedMarkerElement({
            map,
            position: coordinates,
            title: 'Decide Later',
        });
      });
    
    //  display all the information to the end user
    return (
        <div>
            {throwing.map(houseName =>(
            <button key = {houseName.index} onClick={async () => await handleLocationClick(getAddressByName(houseName)+", Northfield, MN 55057")}>
            {houseName}
            </button>
            
            ))}
            
     
            {showMap && 
            <div id="map" style={{ width: '600px', height: '400px' }}></div>
            }
            <button onClick={() => setLikes(likes + 1)}>
                <Icon path={mdiThumbUp} size={1} /> {likes}</button>
            <button onClick={() => setDislikes(dislikes + 1)}><Icon path={mdiThumbDown} size={1} />{dislikes}</button>
            <button><Icon path={mdilComment} size={1} /> {comments}</button>
            <button onClick={handleClose}>X</button>
        </div>
    )
}

export default Party