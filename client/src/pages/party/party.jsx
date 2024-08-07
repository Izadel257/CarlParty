import "./party.css"
import React from "react"
import { useState } from "react";
import Icon from '@mdi/react';
import { mdiFormatLetterCase, mdiThumbUp } from '@mdi/js';
import { mdiThumbDown } from '@mdi/js';
import { mdilComment } from '@mdi/light-js';
import axios from 'axios';
import { Loader } from "@googlemaps/js-api-loader"
import AllHouses from "../../assets/houses";
import { HouseContext } from "../../context/houseContext";
import { useContext } from "react";
import Comments from "../comment/comment";
import { format, previousDay } from 'date-fns';

function Party(){ 
    const [visibleEvents, setVisibleEvents] = useState(5) 
    const { throwing, updateInfo, updateCommentCount, numComment } = useContext(HouseContext); 
    const [showComments, setShowComments] = useState(false)
    const getAddressByName = (name) => {
        const foundItem = AllHouses.find(item => item.name === name);
        return foundItem ? foundItem.address : 'Address not found';
      };
    const [showMap, setShowMap] = useState(false);
    const [currentHouse, setCurrentHouse] = useState("")
    const [curentHouseDate, setCurrentHouseDate] = useState("")
    const [houseId, setHouseId] = useState("")
    const [coordinates, setCoordinates] = useState(null);
    const apiKey = "AIzaSyBoKhRlp8kvQB4ZOnOQxkMhDo3kJR-UEZg"

    // Allow the map to close on click
    const handleClose = async() => {
      updateInfo()
      if (showMap){
          setShowMap(false)
      }
      setCurrentHouse("")
      setCurrentHouseDate("")
      setHouseId("")
    }
    
    // update a comment on click
    const handleCommentClick = async (comments) => {
      updateInfo()
      updateCommentCount(comments)
      setShowComments(!showComments)
    }
    // update likes on click
    const handleLikeClick = async() => {
      updateInfo()
      try{
          setLikes(likes + 1)
          const res = await axios.put("http://localhost:3001/api/party/update-likes",{
              houseId:houseId
          })
          
      } catch(error){
        console.error("unable to update the house like")
      }
    }
    // update dislikes on click
    const handleDisLikesClick = async() =>{
      updateInfo()
      try{
        setDislikes(dislikes + 1)
        const res = await axios.put("http://localhost:3001/api/party/update-dislikes",{
          houseId:houseId
      })
      } catch(error){
        console.log(error)
      }
    }
    // Access the location when it is clicked
    const handleLocationClick = async (house, locationName) => {
      updateInfo()
      try {
        const response = await axios.get(`http://localhost:3001/api/maps/location/${encodeURIComponent(locationName)}`);
        setCoordinates(response.data);
        setShowMap(true)
        setCurrentHouse(house)
        setCurrentHouseDate(house.createdAt)
        setHouseId(house.id)
        setLikes(house.likes)
        setDislikes(house.dislikes)
        setShowComments (false)
        setComments(house.comments.length)
        updateCommentCount(house.comments.length)
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
      const showMore = () => {
        setVisibleEvents(prevCount => prevCount + 5);
      };
      const showLess = () => {
        setVisibleEvents (prevCount => prevCount - 5)
      }
    //  display all the information to the end user
    return (
        <div> 
            {throwing.slice(0, visibleEvents).map(house =>(
              <div>
                <button key = {house.index} onClick={async () => await handleLocationClick(house, getAddressByName(house.houseName)+", Northfield, MN 55057")}>
                {house.houseName}
                </button>
                <p> on {format(new Date(house.createdAt), 'MMMM dd, yyyy HH:mm:ss')}</p>
              </div>
            ))}
            {visibleEvents < throwing.length && (
              <button onClick={showMore}>More</button>
            )}
            {visibleEvents > 5 && (
              <button onClick={showLess}>Less</button>
            )}
     
            {showMap && 
              <div>
                <div id="map" style={{ width: '600px', height: '400px' }}></div>
                
                <button onClick={async () =>  await handleLikeClick()}>
                    <Icon path={mdiThumbUp} size={1} /> {likes}</button>
                <button onClick={async() => await handleDisLikesClick()}><Icon path={mdiThumbDown} size={1} />{dislikes}</button>
                <button onClick={async () => await handleCommentClick (comments)}>
                  <Icon path={mdilComment} size={1} /> 
                  {numComment}
                </button>
                {showComments && <Comments house = {currentHouse} />}
                <button onClick={handleClose}>X</button>
              </div>
          }
        </div>
    )
}

export default Party