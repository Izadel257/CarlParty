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
  const [throwing, setThrowing] = useState([]); 

  const updateThrowing = async () =>{
    try{  
      const res = await axios.get('http://localhost:3001/api/party/getall')
      if (res.status !== 200){
        throw new Error("Could not get houses with parties")
      }
      const data = res.data; 
      setThrowing(data)
    } catch(error){
      console.error("Error getting all the houses that have parties",error)
    }
  }

  useEffect (()=>{
    updateThrowing(); 
    const interval = setInterval(() => {
      updateThrowing()
    }, 500000000000000);
    return() => clearInterval(interval)
  }, [])

    const handleThrowingClick =  (houseName, createdAt) =>{
        createHouse(houseName, createdAt)
    }
    return (
        <HouseContext.Provider value={{ throwing,handleThrowingClick }}>
          {children}
        </HouseContext.Provider>
      );
}
