import React from 'react';
import { useState,useEffect,useContext,createContext } from 'react';

// Available rahega throughtOut the application
const AuthContext=createContext();


export const useAuth=()=>{
    return useContext(AuthContext);
}

export const AuthProvider=({children})=>{
    const [currentUser,setCurrentUser]=useState(null);
    useEffect(()=>{
        // check is user os logged In or Not
        const userId=localStorage.getItem('userId');
        if(userId){
            setCurrentUser(userId);
        }
    },[]);
    const value={
        currentUser,setCurrentUser
    }
    // to provide these value into login Page to set its ID
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
