const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const API_KEY = "AIzaSyBoKhRlp8kvQB4ZOnOQxkMhDo3kJR-UEZg"
exports.getHouseLocation = async(req, res) =>{
    const location = req.params.location; 
    console.log("location", location)
    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
          params: {
            address: location,
            key: API_KEY,
          },
        });
        res.json(response.data.results[0].geometry.location);
    } catch(error){
        console.error('error getting location: ', error)
        res.status(500).json({error: "Failed to fetch the house location"}); 
    }
}