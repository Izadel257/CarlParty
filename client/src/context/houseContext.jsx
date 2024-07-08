import React from "react";
import { createContext } from "react";
import { useState } from "react";

export const HouseContext = createContext()

export const HouseProvider = ({children}) =>{
    const [throwing, setThrowing] = useState([]); 
    const handleThrowingClick = (houseName) =>{
        setThrowing (prevHouse => [...prevHouse, houseName])
    }
    return (
        <HouseContext.Provider value={{ throwing,handleThrowingClick }}>
          {children}
        </HouseContext.Provider>
      );
}
