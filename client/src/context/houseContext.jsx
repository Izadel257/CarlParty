import React from "react";
import { createContext } from "react";
import { useState, useEffect } from "react";
import axios from 'axios'


export const HouseContext = createContext()

const createHouse = async(houseName, createdAt) => {
  try {
    const res = await axios.post('http://localhost:3001/api/party/house', 
      {houseName: houseName, 
        createdAt: createdAt
      });

  } catch(error) {
    console.error(error)
  }
}



export const HouseProvider = ({children}) =>{
  const [update, setUpdate] = useState(false)
  const [throwing, setThrowing] = useState([]); 

  const updateThrowing = async () =>{
    try{  
      const res = await axios.get('http://localhost:3001/api/party/getall')
      if (res.status !== 200){
        throw new Error("Could not get houses with parties")
      }
      const data = res.data; 
      setThrowing(data)
      console.log("data expected", data)
    } catch(error){
      console.error("Error getting all the houses that have parties",error)
    }
  }

  
  useEffect (()=>{
    updateThrowing(); 
  }, [update])

  const handleThrowingClick =  (houseName, createdAt) =>{
    setUpdate(!update)
    createHouse(houseName, createdAt)
  }
  function updateInfo() {
    setUpdate(!update)
  }
  return (
      <HouseContext.Provider value={{ throwing,handleThrowingClick, updateInfo, }}>
        {children}
      </HouseContext.Provider>
    );
}
